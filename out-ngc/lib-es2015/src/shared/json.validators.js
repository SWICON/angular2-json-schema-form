import { _convertToPromise, _executeValidators, _executeAsyncValidators, _mergeObjects, _mergeErrors, isEmpty, isDefined, hasValue, isString, isNumber, isBoolean, isArray, getType, isType, toJavaScriptType, xor } from './validator.functions';
import { forEachCopy } from './utility.functions';
/**
 * 'JsonValidators' class

Provides an extended set of validators to be used by form controls,
compatible with standard JSON Schema validation options.
http://json-schema.org/latest/json-schema-validation.html

Note: This library is designed as a drop-in replacement for the Angular
Validators library, and except for one small breaking change to the 'pattern'
validator (described below) it can even be imported as a substitute, like so:

  import { JsonValidators as Validators } from 'json-validators';

and it should work with existing code as a complete replacement.

The one exception is the 'pattern' validator, which has been changed to
matche partial values by default (the standard 'pattern' validator wrapped
all patterns in '^' and '$', forcing them to always match an entire value).
However, the old behavior can be restored by simply adding '^' and '$'
around your patterns, or by passing an optional second parameter of TRUE.
This change is to make the 'pattern' validator match the behavior of a
JSON Schema pattern, which allows partial matches, rather than the behavior
of an HTML input control pattern, which does not.

This library replaces Angular's 4 validators and 1 validator combination
function with the following 16 validators and 4 transformation functions:

Validators:
For all formControls:     required (*), type, enum
For text formControls:    minLength (*), maxLength (*), pattern (*), format
For numeric formControls: minimum, maximum, multipleOf
For formGroup objects:    minProperties, maxProperties, dependencies
For formArray arrays:     minItems, maxItems, uniqueItems
(Validators originally included with Angular are maked with (*).)

NOTE: The dependencies validator is not complete.
NOTE: The enum validator does not yet work with objects.

Validator transformation functions:
  composeAnyOf, composeOneOf, composeAllOf, composeNot
(Angular's original combination funciton, 'compose', is also included for
backward compatibility, though it is effectively equivalent to composeAllOf,
though with a more generic error message.)

All validators have also been extended to accept an optional second argument
which, if passed a TRUE value, causes the validator to perform the opposite
of its original finction. (This is used internally to enable 'not' and
'composeOneOf' to function and return useful error messages.)

The 'required' validator has also been overloaded so that if called with
a boolean parameter (or no parameters) it returns the original validator
function (rather than executing it). However, if it is called with an
AbstractControl parameter (as was previously required), it behaves
exactly as before.

This enables all validators (including 'required') to be constructed in
exactly the same way, so they can be automatically applied using the
equivalent key names and values taken directly from a JSON Schema.

This source code is partially derived from Angular,
which is Copyright (c) 2014-2016 Google, Inc.
Use of this source code is therefore governed by the same MIT-style license
that can be found in the LICENSE file at https://angular.io/license
 */
export class JsonValidators {
    /**
     * @param {?=} input
     * @return {?}
     */
    static required(input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:// Return required function (do not execute it yet)
                return (control, invert = false) => {
                    if (invert) {
                        return null;
                    } // if not required, always return valid
                    return hasValue(control.value) ? null : { 'required': true };
                };
            case false:// Do nothing
                return (control) => null;
            default:// Execute required function
                return hasValue(((input)).value) ?
                    null : { 'required': true };
        }
    }
    ;
    /**
     * 'type' validator
    
    Requires a control to only accept values of a specified type,
    or one of an array of types.
    
    Note: SchemaPrimitiveType = 'string'|'number'|'integer'|'boolean'|'null'
    
    \@param {SchemaPrimitiveType | SchemaPrimitiveType[]} type - type(s) to accept
    \@return {IValidatorFn}
     * @param {?} type
     * @return {?}
     */
    static type(type) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualValue = control.value;
            let /** @type {?} */ typeArray = isArray(type) ? (type) : [/** @type {?} */ (type)];
            let /** @type {?} */ isValid = false;
            for (let /** @type {?} */ typeValue of typeArray) {
                if (isType(actualValue, typeValue) === true) {
                    isValid = true;
                    break;
                }
            }
            return xor(isValid, invert) ?
                null : { 'type': { type, actualValue } };
        };
    }
    /**
     * 'enum' validator
    
    Requires a control to have a value from an enumerated list of values.
    
    Converts types as needed to allow string inputs to still correctly
    match number, boolean, and null enum values.
    (toJavaScriptType() can be used later to convert these string values.)
    
    TODO: modify to work with objects
    
    \@param {any[]} enumList - array of acceptable values
    \@return {IValidatorFn}
     * @param {?} enumList
     * @return {?}
     */
    static enum(enumList) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ isValid = true;
            let /** @type {?} */ actualValues = (isArray(control.value)) ?
                control.value : [control.value];
            for (let /** @type {?} */ i1 = 0, /** @type {?} */ l1 = actualValues.length; i1 < l1; i1++) {
                let /** @type {?} */ actualValue = actualValues[i1];
                let /** @type {?} */ itemIsValid = false;
                for (let /** @type {?} */ i2 = 0, /** @type {?} */ l2 = enumList.length; i2 < l2; i2++) {
                    let /** @type {?} */ enumValue = enumList[i2];
                    if (actualValue === enumValue) {
                        itemIsValid = true;
                        break;
                    }
                    else if (isNumber(enumValue) && +actualValue === +enumValue) {
                        itemIsValid = true;
                        break;
                    }
                    else if (isBoolean(enumValue, 'strict') &&
                        toJavaScriptType(actualValue, 'boolean') === enumValue) {
                        itemIsValid = true;
                        break;
                    }
                    else if (enumValue === null && !hasValue(actualValue)) {
                        itemIsValid = true;
                        break;
                    }
                }
                if (!itemIsValid) {
                    isValid = false;
                    break;
                }
            }
            return xor(isValid, invert) ?
                null : { 'enum': { 'enum': enumList, 'actualValue': control.value } };
        };
    }
    /**
     * 'minLength' validator
    
    Requires a control's text value to be greater than a specified length.
    
    \@param {number} requiredLength - minimum allowed string length
    \@param {boolean = false} invert - instead return error object only if valid
    \@return {IValidatorFn}
     * @param {?} requiredLength
     * @return {?}
     */
    static minLength(requiredLength) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualLength = isString(control.value) ? control.value.length : 0;
            let /** @type {?} */ isValid = actualLength >= requiredLength;
            return xor(isValid, invert) ?
                null :
                { 'minlength': { requiredLength, actualLength } };
        };
    }
    ;
    /**
     * 'maxLength' validator
    
    Requires a control's text value to be less than a specified length.
    
    \@param {number} requiredLength - maximum allowed string length
    \@param {boolean = false} invert - instead return error object only if valid
    \@return {IValidatorFn}
     * @param {?} requiredLength
     * @return {?}
     */
    static maxLength(requiredLength) {
        return (control, invert = false) => {
            let /** @type {?} */ actualLength = isString(control.value) ? control.value.length : 0;
            let /** @type {?} */ isValid = actualLength <= requiredLength;
            return xor(isValid, invert) ?
                null :
                { 'maxlength': { requiredLength, actualLength } };
        };
    }
    ;
    /**
     * 'pattern' validator
    
    Note: NOT the same as Angular's default pattern validator.
    Requires a control's value to match a specified regular expression pattern.
    
    This validator changes the behavior of default pattern validator
    by replacing RegExp(`^${pattern}$`) with RegExp(`${pattern}`),
    which allows for partial matches.
    
    To return to the default funcitonality, and match the entire string,
    pass TRUE as the optional second parameter.
    
    \@param {string} pattern - regular expression pattern
    \@param {boolean = false} wholeString - match whole value string?
    \@return {IValidatorFn}
     * @param {?} pattern
     * @param {?=} wholeString
     * @return {?}
     */
    static pattern(pattern, wholeString = false) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualValue = control.value;
            let /** @type {?} */ requiredPattern = (wholeString) ? `^${pattern}$` : pattern;
            let /** @type {?} */ regex = new RegExp(requiredPattern);
            let /** @type {?} */ isValid = isString(actualValue) ? regex.test(actualValue) : false;
            return xor(isValid, invert) ?
                null : { 'pattern': { requiredPattern, actualValue } };
        };
    }
    /**
     * 'format' validator
    
    Requires a control to have a value of a certain format.
    
    This validator currently checks the following formsts:
    'date-time'|'email'|'hostname'|'ipv4'|'ipv6'|'uri'
    
    TODO: add 'regex' and 'color' formats
    
    \@param {'date-time'|'email'|'hostname'|'ipv4'|'ipv6'|'uri'} format - format to check
    \@return {IValidatorFn}
     * @param {?} format
     * @return {?}
     */
    static format(format) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ isValid;
            let /** @type {?} */ actualValue = control.value;
            if (!isString(actualValue)) {
                isValid = false;
            }
            else {
                switch (format) {
                    case 'date-time':
                        isValid = !!actualValue.match(/^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/);
                        break;
                    case 'email':
                        let /** @type {?} */ parts = actualValue.split('@');
                        isValid =
                            !!parts && parts.length === 2 &&
                                !!parts[0].match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")$/)
                                &&
                                    !!parts[1].match(/(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?/);
                        break;
                    case 'hostname':
                        isValid = !!actualValue.match(/(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?/);
                        break;
                    case 'ipv4':
                        isValid = !!actualValue.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
                        break;
                    case 'ipv6':
                        isValid = !!actualValue.match(/(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))/);
                        break;
                    case 'uri':
                    case 'url':
                        isValid = !!actualValue.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/);
                        break;
                    case 'color':
                        isValid = !!actualValue.match(/^#[A-Fa-f0-9]{6}$/);
                        break;
                    default:
                        console.error(`format validator error: "${format}" is not a recognized format.`);
                        isValid = true;
                }
            }
            return xor(isValid, invert) ?
                null : { 'format': { format, actualValue } };
        };
    }
    /**
     * 'minimum' validator
    
    Requires a control to have a numeric value not greater than
    a specified minimum amount.
    
    The optional second parameter indicates whether the valid range excludes
    the minimum value. It defaults to false, and includes the minimum.
    
    \@param {number} minimum - minimum allowed value
    \@param {boolean = false} exclusiveMinimum - include minimum value itself?
    \@return {IValidatorFn}
     * @param {?} minimum
     * @param {?=} exclusiveMinimum
     * @return {?}
     */
    static minimum(minimum, exclusiveMinimum = false) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualValue = control.value;
            let /** @type {?} */ isValid = isNumber(actualValue) &&
                exclusiveMinimum ? actualValue > minimum : actualValue >= minimum;
            return xor(isValid, invert) ?
                null : { 'minimum': { minimum, exclusiveMinimum, actualValue } };
        };
    }
    /**
     * 'maximum' validator
    
    Requires a control to have a numeric value not less than
    a specified maximum amount.
    
    The optional second parameter indicates whether the valid range excludes
    the maximum value. It defaults to false, and includes the maximum.
    
    \@param {number} maximum - maximum allowed value
    \@param {boolean = false} exclusiveMaximum - include maximum value itself?
    \@return {IValidatorFn}
     * @param {?} maximum
     * @param {?=} exclusiveMaximum
     * @return {?}
     */
    static maximum(maximum, exclusiveMaximum = false) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualValue = control.value;
            let /** @type {?} */ isValid = isNumber(actualValue) &&
                exclusiveMaximum ? actualValue < maximum : actualValue <= maximum;
            return xor(isValid, invert) ?
                null : { 'maximum': { maximum, exclusiveMaximum, actualValue } };
        };
    }
    /**
     * 'multipleOf' validator
    
    Requires a control to have a numeric value that is a multiple
    of a specified number.
    
    \@param {number} multipleOf - number value must be a multiple of
    \@return {IValidatorFn}
     * @param {?} multipleOf
     * @return {?}
     */
    static multipleOf(multipleOf) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualValue = control.value;
            let /** @type {?} */ isValid = isNumber(actualValue) && actualValue % multipleOf === 0;
            return xor(isValid, invert) ?
                null : { 'multipleOf': { multipleOf, actualValue } };
        };
    }
    /**
     * 'minProperties' validator
    
    Requires a form group to have a minimum number of properties (i.e. have
    values entered in a minimum number of controls within the group).
    
    \@param {number} minProperties - minimum number of properties allowed
    \@return {IValidatorFn}
     * @param {?} minProperties
     * @return {?}
     */
    static minProperties(minProperties) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualProperties = Object.keys(control.value).length || 0;
            let /** @type {?} */ isValid = actualProperties >= minProperties;
            return xor(isValid, invert) ?
                null : { 'minProperties': { minProperties, actualProperties } };
        };
    }
    /**
     * 'maxProperties' validator
    
    Requires a form group to have a maximum number of properties (i.e. have
    values entered in a maximum number of controls within the group).
    
    Note: Has no effect if the form group does not contain more than the
    maximum number of controls.
    
    \@param {number} maxProperties - maximum number of properties allowed
    \@return {IValidatorFn}
     * @param {?} maxProperties
     * @return {?}
     */
    static maxProperties(maxProperties) {
        return (control, invert = false) => {
            let /** @type {?} */ actualProperties = Object.keys(control.value).length || 0;
            let /** @type {?} */ isValid = actualProperties <= maxProperties;
            return xor(isValid, invert) ?
                null : { 'maxProperties': { maxProperties, actualProperties } };
        };
    }
    /**
     * 'dependencies' validator
    
    Requires the controls in a form group to meet additional validation
    criteria, depending on the values of other controls in the group.
    
    Examples:
    https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies
    
    \@param {any} dependencies - required dependencies
    \@return {IValidatorFn}
     * @param {?} dependencies
     * @return {?}
     */
    static dependencies(dependencies) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
                return null;
            }
            let /** @type {?} */ allErrors = _mergeObjects(forEachCopy(dependencies, (value, requiringField) => {
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                let /** @type {?} */ requiringFieldErrors = {};
                let /** @type {?} */ requiredFields;
                let /** @type {?} */ properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField]['required'] || [];
                    properties = dependencies[requiringField]['properties'] || {};
                }
                // Validate property dependencies
                for (let /** @type {?} */ requiredField of requiredFields) {
                    if (xor(!hasValue(control.value[requiredField]), invert)) {
                        requiringFieldErrors[requiredField] = { 'required': true };
                    }
                }
                // Validate schema dependencies
                requiringFieldErrors = _mergeObjects(requiringFieldErrors, forEachCopy(properties, (requirements, requiredField) => {
                    let /** @type {?} */ requiredFieldErrors = _mergeObjects(forEachCopy(requirements, (requirement, parameter) => {
                        let /** @type {?} */ validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            let /** @type {?} */ exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : { [requiredField]: requiredFieldErrors };
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : { [requiringField]: requiringFieldErrors };
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    }
    /**
     * 'minItems' validator
    
    Requires a form array to have a minimum number of values.
    
    \@param {number} minItems - minimum number of items allowed
    \@return {IValidatorFn}
     * @param {?} minItems
     * @return {?}
     */
    static minItems(minItems) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ actualItems = isArray(control.value) ? control.value.length : 0;
            let /** @type {?} */ isValid = actualItems >= minItems;
            return xor(isValid, invert) ?
                null : { 'minItems': { minItems, actualItems } };
        };
    }
    /**
     * 'maxItems' validator
    
    Requires a form array to have a maximum number of values.
    
    \@param {number} maxItems - maximum number of items allowed
    \@return {IValidatorFn}
     * @param {?} maxItems
     * @return {?}
     */
    static maxItems(maxItems) {
        return (control, invert = false) => {
            let /** @type {?} */ actualItems = isArray(control.value) ? control.value.length : 0;
            let /** @type {?} */ isValid = actualItems <= maxItems;
            return xor(isValid, invert) ?
                null : { 'maxItems': { maxItems, actualItems } };
        };
    }
    /**
     * 'uniqueItems' validator
    
    Requires values in a form array to be unique.
    
    \@param {boolean = true} unique? - true to validate, false to disable
    \@return {IValidatorFn}
     * @param {?=} unique
     * @return {?}
     */
    static uniqueItems(unique = true) {
        return (control, invert = false) => {
            if (!unique) {
                return null;
            }
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ sorted = control.value.slice().sort();
            let /** @type {?} */ duplicateItems = [];
            for (let /** @type {?} */ i = 1, /** @type {?} */ l = sorted.length; i < l; i++) {
                if (sorted[i - 1] === sorted[i] &&
                    duplicateItems.indexOf(sorted[i]) !== -1) {
                    duplicateItems.push(sorted[i]);
                }
            }
            let /** @type {?} */ isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { 'uniqueItems': { duplicateItems } };
        };
    }
    /**
     * No-op validator. Included for backward compatibility.
     * @param {?} c
     * @return {?}
     */
    static nullValidator(c) { return null; }
    /**
     * 'composeAnyOf' validator combination function
    
    Accepts an array of validators and returns a single validator that
    evaluates to valid if any one or more of the submitted validators are
    valid. If every validator is invalid, it returns combined errors from
    all validators.
    
    \@param {IValidatorFn[]} validators - array of validators to combine
    \@return {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    static composeAnyOf(validators) {
        if (!validators) {
            return null;
        }
        let /** @type {?} */ presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            let /** @type {?} */ arrayOfErrors = _executeValidators(control, presentValidators, invert).filter(isDefined);
            let /** @type {?} */ isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : _mergeObjects.apply(arrayOfErrors.concat({ 'anyOf': !invert }));
        };
    }
    /**
     * 'composeOneOf' validator combination function
    
    Accepts an array of validators and returns a single validator that
    evaluates to valid only if exactly one of the submitted validators
    is valid. Otherwise returns combined information from all validators,
    both valid and invalid.
    
    \@param {IValidatorFn[]} validators - array of validators to combine
    \@return {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    static composeOneOf(validators) {
        if (!validators) {
            return null;
        }
        let /** @type {?} */ presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            let /** @type {?} */ arrayOfErrors = _executeValidators(control, presentValidators);
            let /** @type {?} */ validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            let /** @type {?} */ isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            let /** @type {?} */ arrayOfValids = _executeValidators(control, presentValidators, invert);
            return _mergeObjects.apply(arrayOfErrors.concat(arrayOfValids).concat({ 'oneOf': !invert }));
        };
    }
    /**
     * 'composeAllOf' validator combination function
    
    Accepts an array of validators and returns a single validator that
    evaluates to valid only if all the submitted validators are individually
    valid. Otherwise it returns combined errors from all invalid validators.
    
    \@param {IValidatorFn[]} validators - array of validators to combine
    \@return {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    static composeAllOf(validators) {
        if (!validators) {
            return null;
        }
        let /** @type {?} */ presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            let /** @type {?} */ combinedErrors = _mergeErrors(_executeValidators(control, presentValidators, invert));
            let /** @type {?} */ isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(combinedErrors, { 'allOf': !invert });
        };
    }
    /**
     * 'composeNot' validator inversion function
    
    Accepts a single validator function and inverts its result.
    Returns valid if the submitted validator is invalid, and
    returns invalid if the submitted validator is valid.
    (Note: this function can itself be inverted
    - e.g. composeNot(composeNot(validator)) -
    but this can be confusing and is therefore not recommended.)
    
    \@param {IValidatorFn[]} validators - validator(s) to invert
    \@return {IValidatorFn} - new validator function that returns opposite result
     * @param {?} validator
     * @return {?}
     */
    static composeNot(validator) {
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let /** @type {?} */ error = validator(control, !invert);
            let /** @type {?} */ isValid = error === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(error, { 'not': !invert });
        };
    }
    /**
     * 'compose' validator combination function
    
    \@param {IValidatorFn[]} validators - array of validators to combine
    \@return {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    static compose(validators) {
        if (!validators) {
            return null;
        }
        let /** @type {?} */ presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => _mergeErrors(_executeValidators(control, presentValidators, invert));
    }
    ;
    /**
     * 'composeAsync' async validator combination function
    
    \@param {AsyncIValidatorFn[]} async validators - array of async validators
    \@return {AsyncIValidatorFn} - single combined async validator function
     * @param {?} validators
     * @return {?}
     */
    static composeAsync(validators) {
        if (!validators) {
            return null;
        }
        let /** @type {?} */ presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => Promise.all(_executeAsyncValidators(control, presentValidators).map(_convertToPromise)).then(_mergeErrors);
    }
}
//# sourceMappingURL=json.validators.js.map