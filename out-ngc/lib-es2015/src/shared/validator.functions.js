import { toPromise } from 'rxjs/operator/toPromise';
/**
 * '_executeValidators' utility function

Validates a control against an array of validators, and returns
an array of the same length containing a combination of error messages
(from invalid validators) and null values (from valid validators)

\@param {AbstractControl} control - control to validate
\@param {IValidatorFn[]} validators - array of validators
\@return {any[]} - array of nulls and error message
 * @param {?} control
 * @param {?} validators
 * @param {?=} invert
 * @return {?}
 */
export function _executeValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_executeAsyncValidators' utility function

Validates a control against an array of async validators, and returns
an array of observabe results of the same length containing a combination of
error messages (from invalid validators) and null values (from valid ones)

\@param {AbstractControl} control - control to validate
\@param {AsyncIValidatorFn[]} validators - array of async validators
\@return {any[]} - array of observable nulls and error message
 * @param {?} control
 * @param {?} validators
 * @param {?=} invert
 * @return {?}
 */
export function _executeAsyncValidators(control, validators, invert = false) {
    return validators.map(v => v(control, invert));
}
/**
 * '_mergeObjects' utility function

Recursively Merges one or more objects into a single object with combined keys.
Automatically detects and ignores null and undefined inputs.
Also detects duplicated boolean 'not' keys and XORs their values.

\@param {PlainObject[]} object - one or more objects to merge
\@return {PlainObject} - merged object
 * @param {...?} object
 * @return {?}
 */
export function _mergeObjects(...object) {
    let /** @type {?} */ mergedObject = {};
    for (let /** @type {?} */ i = 0, /** @type {?} */ l = arguments.length; i < l; i++) {
        const /** @type {?} */ currentObject = arguments[i];
        if (isObject(currentObject)) {
            for (let /** @type {?} */ key of Object.keys(currentObject)) {
                const /** @type {?} */ currentValue = currentObject[key];
                const /** @type {?} */ mergedValue = mergedObject[key];
                if (isDefined(mergedValue)) {
                    if (key === 'not' &&
                        isBoolean(mergedValue, 'strict') &&
                        isBoolean(currentValue, 'strict')) {
                        mergedObject[key] = xor(mergedValue, currentValue);
                    }
                    else if (getType(mergedValue) === 'object' &&
                        getType(currentValue) === 'object') {
                        mergedObject[key] = _mergeObjects(mergedValue, currentValue);
                    }
                    else {
                        mergedObject[key] = currentValue;
                    }
                }
                else {
                    mergedObject[key] = currentValue;
                }
            }
        }
    }
    return mergedObject;
}
/**
 * '_mergeErrors' utility function

Merges an array of objects.
Used for combining the validator errors returned from 'executeValidators'

\@param {PlainObject[]} arrayOfErrors - array of objects
\@return {PlainObject} - merged object, or null if no usable input objectcs
 * @param {?} arrayOfErrors
 * @return {?}
 */
export function _mergeErrors(arrayOfErrors) {
    let /** @type {?} */ mergedErrors = _mergeObjects.apply(null, arrayOfErrors);
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
/**
 * 'isDefined' utility function

Checks if a variable contains a value of any type.
Returns true even for otherwise 'falsey' values of 0, '', and false.

\@param {any} object - the value to check
\@return {boolean} - false if undefined or null, otherwise true
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * 'hasValue' utility function

Checks if a variable contains a value.
Returs false for null, undefined, or a zero-length strng, '',
otherwise returns true.
(Stricter than 'isDefined' because it also returns false for '',
though it stil returns true for otherwise 'falsey' values 0 and false.)

\@param {any} object - the value to check
\@return {boolean} - false if undefined, null, or '', otherwise true
 * @param {?} value
 * @return {?}
 */
export function hasValue(value) {
    return value !== undefined && value !== null && value !== '';
}
/**
 * 'isEmpty' utility function

Similar to !hasValue, but also returns true for empty arrays and objects.

\@param {any} object - the value to check
\@return {boolean} - false if undefined, null, or '', otherwise true
 * @param {?} value
 * @return {?}
 */
export function isEmpty(value) {
    if (isArray(value)) {
        return !value.length;
    }
    if (isObject(value)) {
        return !Object.keys(value).length;
    }
    return value === undefined || value === null || value === '';
}
/**
 * 'isString' utility function

Checks if a value is a string.

\@param {any} object - the value to check
\@return {boolean} - true if string, false if not
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * 'isNumber' utility function

Checks if a value is a regular number or a numeric string.

\@param {any} object - the value to check
\@param {any = false} strict - if truthy, also checks JavaScript tyoe
\@return {boolean} - true if number, false if not
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function isNumber(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0;
}
/**
 * 'isInteger' utility function

Checks if a value is an integer.

\@param {any} object - the value to check
\@param {any = false} strict - if truthy, also checks JavaScript tyoe
\@return {boolean} - true if number, false if not
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function isInteger(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0 && value % 1 === 0;
}
/**
 * 'isBoolean' utility function

Checks if a value is a boolean.

\@param {any} object - the value to check
\@param {any = null} option - if 'strict', also checks JavaScript type
                             if TRUE or FALSE, checks only for that value
\@return {boolean} - true if boolean, false if not
 * @param {?} value
 * @param {?=} option
 * @return {?}
 */
export function isBoolean(value, option = null) {
    if (option === 'strict') {
        return value === true || value === false;
    }
    if (option === true) {
        return value === true || value === 1 || value === 'true' || value === '1';
    }
    if (option === false) {
        return value === false || value === 0 || value === 'false' || value === '0';
    }
    return value === true || value === 1 || value === 'true' || value === '1' ||
        value === false || value === 0 || value === 'false' || value === '0';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isFunction(item) {
    return typeof item === 'function';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isObject(item) {
    return item !== null && typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Object]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isArray(item) {
    return Array.isArray(item) ||
        Object.prototype.toString.call(item) === '[object Array]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isMap(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Map]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isSet(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Set]';
}
/**
 * 'getType' function

Detects the JSON Schema Type of a value.
By default, detects numbers and integers even if formatted as strings.
(So all integers are also numbers, and any number may also be a string.)
However, it only detects true boolean values (to detect boolean values
in non-boolean formats, use isBoolean() instead).

If passed a second optional parameter of 'strict', it will only detect
numbers and integers if they are JavaScript numbers.

Examples:
getType('10.5') = 'number'
getType(10.5) = 'number'
getType('10') = 'integer'
getType(10) = 'integer'
getType('true') = 'string'
getType(true) = 'boolean'
getType(null) = 'null'
getType({ }) = 'object'
getType([]) = 'array'

getType('10.5', 'strict') = 'string'
getType(10.5, 'strict') = 'number'
getType('10', 'strict') = 'string'
getType(10, 'strict') = 'integer'
getType('true', 'strict') = 'string'
getType(true, 'strict') = 'boolean'

\@param {any} value - value to check
\@param {any = false} strict - if truthy, also checks JavaScript tyoe
\@return {boolean}
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function getType(value, strict = false) {
    if (!isDefined(value)) {
        return 'null';
    }
    if (isArray(value)) {
        return 'array';
    }
    if (isObject(value)) {
        return 'object';
    }
    if (isBoolean(value, 'strict')) {
        return 'boolean';
    }
    if (isInteger(value, strict)) {
        return 'integer';
    }
    if (isNumber(value, strict)) {
        return 'number';
    }
    if (isString(value)) {
        return 'string';
    }
    return null;
}
/**
 * 'isType' function

Checks wether an input (probably string) value contains data of
a specified JSON Schema type

\@param {PrimitiveValue} value - value to check
\@param {SchemaPrimitiveType} type - type to check
\@return {boolean}
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
export function isType(value, type) {
    switch (type) {
        case 'string':
            return isString(value);
        case 'number':
            return isNumber(value);
        case 'integer':
            return isInteger(value);
        case 'boolean':
            return isBoolean(value);
        case 'null':
            return !hasValue(value);
        default:
            console.error('isType error: "' + type + '" is not a recognized type.');
            return null;
    }
}
/**
 * 'isPrimitive' function

Checks wether an input value is a JavaScript primitive type:
string, number, boolean, or null.

\@param {any} value - value to check
\@return {boolean}
 * @param {?} value
 * @return {?}
 */
export function isPrimitive(value) {
    return (isString(value) || isNumber(value) ||
        isBoolean(value, 'strict') || value === null);
}
/**
 * 'toJavaScriptType' function

Converts an input (probably string) value to a JavaScript primitive type -
'string', 'number', 'boolean', or 'null' - before storing in a JSON object.

Does not coerce values (other than null), and only converts the types
of values that would otherwise be valid.

If the optional third parameter 'strictIntegers' is TRUE, and the
JSON Schema type 'integer' is specified, it also verifies the input value
is an integer and, if it is, returns it as a JaveScript number.
If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
exactly the same as 'number', and allows decimals.

Examples:
toJavaScriptType('10', 'number') = 10
toJavaScriptType('10', 'integer') = 10
toJavaScriptType('10.5', 'number') = 10.5
toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
toJavaScriptType(10.5, 'integer') = null // 10.5 is still not an integer

\@param {PrimitiveValue} value - value to convert
\@param {SchemaPrimitiveType | SchemaPrimitiveType[]} types - types to convert to
\@param {boolean = false} strictIntegers - if FALSE, treat integers as numbers
\@return {boolean}
 * @param {?} value
 * @param {?} types
 * @param {?=} strictIntegers
 * @return {?}
 */
export function toJavaScriptType(value, types, strictIntegers = true) {
    if (!isDefined(value)) {
        return null;
    }
    if (isString(types)) {
        types = [types];
    }
    if (strictIntegers && inArray('integer', types)) {
        if (isInteger(value, 'strict')) {
            return value;
        }
        if (isInteger(value)) {
            return parseInt(value, 10);
        }
    }
    if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
        if (isNumber(value, 'strict')) {
            return value;
        }
        if (isNumber(value)) {
            return parseFloat(value);
        }
    }
    if (inArray('string', types)) {
        if (isString(value)) {
            return value;
        }
    }
    if (inArray('boolean', types)) {
        if (isBoolean(value, true)) {
            return true;
        }
        if (isBoolean(value, false)) {
            return false;
        }
    }
    return null;
}
/**
 * 'toSchemaType' function

Converts an input (probably string) value to the "best" JavaScript
equivalent available from an allowed list of JSON Schema types, which may
contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
If necssary, it does progressively agressive type coersion.
It will not return null unless null is in the list of allowed types.

Number conversion examples:
toSchemaType('10', ['number','integer','string']) = 10 // integer
toSchemaType('10', ['number','string']) = 10 // number
toSchemaType('10', ['string']) = '10' // string
toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
toSchemaType('10.5', ['integer','string']) = '10.5' // string
toSchemaType('10.5', ['integer']) = 10 // integer
toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
toSchemaType(10.5, ['null','boolean']) = true // boolean

String conversion examples:
toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
toSchemaType('1.5x', ['boolean']) = true // boolean
toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
toSchemaType('xyz', ['number','integer','null']) = null // null
toSchemaType('xyz', ['number','integer']) = 0 // number

Boolean conversion examples:
toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
toSchemaType('1', ['number','string','boolean']) = 1 // number
toSchemaType('1', ['string','boolean']) = '1' // string
toSchemaType('1', ['boolean']) = true // boolean
toSchemaType('true', ['number','string','boolean']) = 'true' // string
toSchemaType('true', ['boolean']) = true // boolean
toSchemaType('true', ['number']) = 0 // number
toSchemaType(true, ['number','string','boolean']) = true // boolean
toSchemaType(true, ['number','string']) = 'true' // string
toSchemaType(true, ['number']) = 1 // number

\@param {PrimitiveValue} value - value to convert
\@param {SchemaPrimitiveType[]} types - allowed types to convert to
\@return {boolean}
 * @param {?} value
 * @param {?} types
 * @return {?}
 */
export function toSchemaType(value, types) {
    if (!isArray(/** @type {?} */ (types))) {
        types = ([types]);
    }
    if (((types)).indexOf('null') !== -1 && !hasValue(value)) {
        return null;
    }
    if (((types)).indexOf('boolean') !== -1 && !isBoolean(value, 'strict')) {
        return value;
    }
    if (((types)).indexOf('integer') !== -1) {
        let /** @type {?} */ testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if (((types)).indexOf('number') !== -1) {
        let /** @type {?} */ testValue = toJavaScriptType(value, 'number');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((isString(value) || isNumber(value, 'strict')) &&
        ((types)).indexOf('string') !== -1) {
        return toJavaScriptType(value, 'string');
    }
    if (((types)).indexOf('boolean') !== -1 && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (((types)).indexOf('string') !== -1) {
        if (value === null) {
            return '';
        }
        let /** @type {?} */ testValue = toJavaScriptType(value, 'string');
        if (testValue !== null) {
            return testValue;
        }
    }
    if ((((types)).indexOf('number') !== -1 ||
        ((types)).indexOf('integer') !== -1)) {
        if (value === true) {
            return 1;
        } // Convert boolean & null to number
        if (value === false || value === null || value === '') {
            return 0;
        }
    }
    if (((types)).indexOf('number') !== -1) {
        let /** @type {?} */ testValue = parseFloat(/** @type {?} */ (value));
        if (!!testValue) {
            return testValue;
        }
    }
    if (((types)).indexOf('integer') !== -1) {
        let /** @type {?} */ testValue = parseInt(/** @type {?} */ (value), 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (((types)).indexOf('boolean') !== -1) {
        return !!value;
    }
    if ((((types)).indexOf('number') !== -1 ||
        ((types)).indexOf('integer') !== -1) && ((types)).indexOf('null') === -1) {
        return 0; // If null not allowed, return 0 for non-convertable values
    }
}
/**
 * 'isPromise' function

\@param {object} object
\@return {object}
 * @param {?} object
 * @return {?}
 */
export function isPromise(object) {
    return !!object && typeof object.then === 'function';
}
/**
 * '_convertToPromise' function

\@param {object} object
\@return {Promise<any>}
 * @param {?} object
 * @return {?}
 */
export function _convertToPromise(object) {
    return isPromise(object) ? object : toPromise.call(object);
}
/**
 * 'inArray' function

Searches an array for an item, or one of a list of items, and returns true
as soon as a match is found, or false if no match.

If the optional third parameter allIn is set to TRUE, and the item to find
is an array, then the function returns true only if all elements from item
are found in the list, and false if any element is not found. If the item to
find is not an array, setting allIn to TRUE has no effect.

\@param {any|any[]} item - the item to search for
\@param {any[]} array - the array to search
\@param {boolean = false} allIn - if TRUE, all items must be in array
\@return {boolean} - true if item(s) in array, false otherwise
 * @param {?} item
 * @param {?} array
 * @param {?=} allIn
 * @return {?}
 */
export function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    if (isArray(item)) {
        for (let /** @type {?} */ subItem of item) {
            if (xor(array.indexOf(subItem) !== -1, allIn)) {
                return !allIn;
            }
        }
        return allIn;
    }
    else {
        return array.indexOf(item) !== -1;
    }
}
/**
 * 'xor' utility function - exclusive or

Returns true if exactly one of two values is truthy.

\@param {any} value1 - first value to check
\@param {any} value2 - second value to check
\@return {boolean} - true if exactly one input value is truthy, false if not
 * @param {?} value1
 * @param {?} value2
 * @return {?}
 */
export function xor(value1, value2) {
    return (!!value1 && !value2) || (!value1 && !!value2);
}
//# sourceMappingURL=validator.functions.js.map