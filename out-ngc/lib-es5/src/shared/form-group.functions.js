import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash/index';
import { hasValue, inArray, isArray, isEmpty, isObject, isDefined, isPrimitive, toJavaScriptType, toSchemaType } from './validator.functions';
import { forEach, hasOwn } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { JsonValidators } from './json.validators';
import { getControlValidators, resolveRecursiveReferences } from './json-schema.functions';
/**
 * 'buildFormGroupTemplate' function

Builds a template for an Angular FormGroup from a JSON Schema.

TODO: add support for pattern properties
https://spacetelescope.github.io/understanding-json-schema/reference/object.html

\@param  {any} jsf -
\@param  {any = null} setValues -
\@param  {boolean = true} mapArrays -
\@param  {string = ''} schemaPointer -
\@param  {string = ''} dataPointer -
\@param  {any = ''} templatePointer -
\@return {any} -
 * @param {?} jsf
 * @param {?=} setValues
 * @param {?=} mapArrays
 * @param {?=} schemaPointer
 * @param {?=} dataPointer
 * @param {?=} templatePointer
 * @return {?}
 */
export function buildFormGroupTemplate(jsf, setValues, mapArrays, schemaPointer, dataPointer, templatePointer) {
    if (setValues === void 0) { setValues = null; }
    if (mapArrays === void 0) { mapArrays = true; }
    if (schemaPointer === void 0) { schemaPointer = ''; }
    if (dataPointer === void 0) { dataPointer = ''; }
    if (templatePointer === void 0) { templatePointer = ''; }
    var /** @type {?} */ schema = JsonPointer.get(jsf.schema, schemaPointer);
    var /** @type {?} */ useValues = jsf.globalOptions.setSchemaDefaults ?
        mergeValues(JsonPointer.get(schema, '/default'), setValues) : setValues;
    var /** @type {?} */ schemaType = JsonPointer.get(schema, '/type');
    var /** @type {?} */ controlType;
    if (schemaType === 'object' && hasOwn(schema, 'properties')) {
        controlType = 'FormGroup';
    }
    else if (schemaType === 'array' && hasOwn(schema, 'items')) {
        controlType = 'FormArray';
    }
    else if (!schemaType && hasOwn(schema, '$ref')) {
        controlType = '$ref';
    }
    else {
        controlType = 'FormControl';
    }
    if (dataPointer !== '' && !jsf.dataMap.has(dataPointer)) {
        jsf.dataMap.set(dataPointer, new Map);
        jsf.dataMap.get(dataPointer).set('schemaPointer', schemaPointer);
        jsf.dataMap.get(dataPointer).set('schemaType', schema.type);
        if (controlType) {
            jsf.dataMap.get(dataPointer).set('templatePointer', templatePointer);
            jsf.dataMap.get(dataPointer).set('templateType', controlType);
        }
        var /** @type {?} */ genericDataPointer = JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap);
        if (!jsf.dataMap.has(genericDataPointer)) {
            jsf.dataMap.set(genericDataPointer, new Map);
            jsf.dataMap.get(genericDataPointer).set('schemaPointer', schemaPointer);
            jsf.dataMap.get(genericDataPointer).set('schemaType', schema.type);
        }
    }
    var /** @type {?} */ controls;
    var /** @type {?} */ validators = getControlValidators(schema);
    switch (controlType) {
        case 'FormGroup':
            controls = {};
            if (jsf.globalOptions.setSchemaDefaults) {
                useValues = mergeValues(JsonPointer.get(schema, '/properties/default'), useValues);
            }
            var /** @type {?} */ propertyKeys = schema['ui:order'] ||
                schema.properties['ui:order'] ||
                Object.keys(schema.properties);
            for (var _i = 0, propertyKeys_1 = propertyKeys; _i < propertyKeys_1.length; _i++) {
                var key = propertyKeys_1[_i];
                controls[key] = buildFormGroupTemplate(jsf, JsonPointer.get(useValues, [/** @type {?} */ (key)]), mapArrays, schemaPointer + '/properties/' + key, dataPointer + '/' + key, templatePointer + '/controls/' + key);
            }
            jsf.globalOptions.fieldsRequired = setRequiredFields(schema, controls);
            return { controlType: controlType, controls: controls, validators: validators };
        case 'FormArray':
            var /** @type {?} */ minItems = schema.minItems || 0;
            var /** @type {?} */ maxItems = schema.maxItems || 1000000;
            if (isArray(schema.items)) {
                if (mapArrays && !jsf.arrayMap.get(dataPointer)) {
                    jsf.arrayMap.set(dataPointer, schema.items.length);
                }
                controls = [];
                for (var /** @type {?} */ i = 0, /** @type {?} */ l = schema.items.length; i < l; i++) {
                    if (i >= minItems &&
                        !JsonPointer.has(jsf.templateRefLibrary, [dataPointer + '/' + i])) {
                        jsf.templateRefLibrary[dataPointer + '/' + i] =
                            buildFormGroupTemplate(jsf, null, mapArrays, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i);
                    }
                    if (i < maxItems) {
                        var /** @type {?} */ useValue = isArray(useValues) ? useValues[i] : useValues;
                        controls.push(buildFormGroupTemplate(jsf, useValue, false, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i));
                    }
                }
                if (schema.items.length < maxItems &&
                    hasOwn(schema, 'additionalItems') && isObject(schema.additionalItems)) {
                    var /** @type {?} */ l = Math.max(schema.items.length + 1, isArray(useValues) ? useValues.length : 0);
                    for (var /** @type {?} */ i = schema.items.length; i < l; i++) {
                        var /** @type {?} */ useValue = isArray(useValues) ? useValues[i] : useValues;
                        controls.push(buildFormGroupTemplate(jsf, useValue, false, schemaPointer + '/additionalItems', dataPointer + '/' + i, templatePointer + '/controls/' + i));
                        if (isArray(useValues)) {
                            useValues = null;
                        }
                    }
                    if (!JsonPointer.has(jsf, ['templateRefLibrary', dataPointer + '/-'])) {
                        jsf.templateRefLibrary[dataPointer + '/-'] =
                            buildFormGroupTemplate(jsf, null, mapArrays, schemaPointer + '/additionalItems', dataPointer + '/-', templatePointer + '/controls/-');
                    }
                }
            }
            else {
                if (mapArrays && !jsf.arrayMap.get(dataPointer)) {
                    jsf.arrayMap.set(dataPointer, 0);
                }
                if (!JsonPointer.has(jsf.templateRefLibrary, [dataPointer + '/-'])) {
                    jsf.templateRefLibrary[dataPointer + '/-'] =
                        buildFormGroupTemplate(jsf, null, mapArrays, schemaPointer + '/items', dataPointer + '/-', templatePointer + '/controls/-');
                }
                controls = [];
                if (jsf.globalOptions.setSchemaDefaults) {
                    useValues = mergeValues(JsonPointer.get(schema, '/items/default'), useValues);
                }
                if (isArray(useValues) && useValues.length) {
                    for (var _a = 0, _b = Object.keys(useValues); _a < _b.length; _a++) {
                        var i = _b[_a];
                        controls.push(buildFormGroupTemplate(jsf, useValues[i], false, schemaPointer + '/items', dataPointer + '/' + i, templatePointer + '/controls/' + i));
                    }
                    useValues = null;
                }
            }
            var /** @type {?} */ initialItemCount = Math.max(minItems, JsonPointer.has(schema, '/items/$ref') ? 0 : 1);
            if (controls.length < initialItemCount) {
                for (var /** @type {?} */ i = controls.length, /** @type {?} */ l = initialItemCount; i < l; i++) {
                    controls.push(buildFormGroupTemplate(jsf, useValues, false, schemaPointer + '/items', dataPointer + '/' + i, templatePointer + '/controls/' + i));
                }
            }
            return { controlType: controlType, controls: controls, validators: validators };
        case 'FormControl':
            var /** @type {?} */ value = {
                value: isPrimitive(useValues) ? useValues : null,
                disabled: schema['disabled'] ||
                    JsonPointer.get(schema, '/x-schema-form/disabled') || false
            };
            return { controlType: controlType, value: value, validators: validators };
        case '$ref':
            var /** @type {?} */ schemaRef = JsonPointer.compile(schema.$ref);
            if (!hasOwn(jsf.templateRefLibrary, schemaRef)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.templateRefLibrary[schemaRef] = null;
                var /** @type {?} */ newTemplate = buildFormGroupTemplate(jsf, null, false, schemaRef);
                if (newTemplate) {
                    jsf.templateRefLibrary[schemaRef] = newTemplate;
                }
                else {
                    delete jsf.templateRefLibrary[schemaRef];
                }
            }
            return null;
        default:
            return null;
    }
}
/**
 * 'buildFormGroup' function

\@param {any} template -
\@return {AbstractControl}
 * @param {?} template
 * @return {?}
 */
export function buildFormGroup(template) {
    var /** @type {?} */ validatorFns = [];
    var /** @type {?} */ validatorFn = null;
    if (hasOwn(template, 'validators')) {
        forEach(template.validators, function (parameters, validator) {
            if (typeof JsonValidators[validator] === 'function') {
                validatorFns.push(JsonValidators[validator].apply(null, parameters));
            }
        });
        if (validatorFns.length &&
            inArray(template.controlType, ['FormGroup', 'FormArray'])) {
            validatorFn = validatorFns.length > 1 ?
                JsonValidators.compose(validatorFns) : validatorFns[0];
        }
    }
    if (hasOwn(template, 'controlType')) {
        switch (template.controlType) {
            case 'FormGroup':
                var /** @type {?} */ groupControls_1 = {};
                forEach(template.controls, function (controls, key) {
                    var /** @type {?} */ newControl = buildFormGroup(controls);
                    if (newControl) {
                        groupControls_1[key] = newControl;
                    }
                });
                return new FormGroup(groupControls_1, validatorFn);
            case 'FormArray':
                return new FormArray(_.filter(_.map(template.controls, function (controls) { return buildFormGroup(controls); })), validatorFn);
            case 'FormControl':
                return new FormControl(template.value, validatorFns);
        }
    }
    return null;
}
/**
 * 'mergeValues' function

\@param  {any[]} ...valuesToMerge - Multiple values to merge
\@return {any} - Merged values
 * @param {...?} valuesToMerge
 * @return {?}
 */
export function mergeValues() {
    var valuesToMerge = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        valuesToMerge[_i] = arguments[_i];
    }
    var /** @type {?} */ mergedValues = null;
    for (var /** @type {?} */ index = 0, /** @type {?} */ length_1 = arguments.length; index < length_1; index++) {
        var /** @type {?} */ currentValue = arguments[index];
        if (!isEmpty(currentValue)) {
            if (typeof currentValue === 'object' &&
                (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                if (isArray(currentValue)) {
                    mergedValues = [].concat(currentValue);
                }
                else if (isObject(currentValue)) {
                    mergedValues = Object.assign({}, currentValue);
                }
            }
            else if (typeof currentValue !== 'object') {
                mergedValues = currentValue;
            }
            else if (isObject(mergedValues) && isObject(currentValue)) {
                Object.assign(mergedValues, currentValue);
            }
            else if (isObject(mergedValues) && isArray(currentValue)) {
                var /** @type {?} */ newValues = [];
                for (var _a = 0, currentValue_1 = currentValue; _a < currentValue_1.length; _a++) {
                    var value = currentValue_1[_a];
                    newValues.push(mergeValues(mergedValues, value));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isObject(currentValue)) {
                var /** @type {?} */ newValues = [];
                for (var _b = 0, mergedValues_1 = mergedValues; _b < mergedValues_1.length; _b++) {
                    var value = mergedValues_1[_b];
                    newValues.push(mergeValues(value, currentValue));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isArray(currentValue)) {
                var /** @type {?} */ newValues = [];
                var /** @type {?} */ l = Math.max(mergedValues.length, currentValue.length);
                for (var /** @type {?} */ i = 0; i < l; i++) {
                    if (i < mergedValues.length && i < currentValue.length) {
                        newValues.push(mergeValues(mergedValues[i], currentValue[i]));
                    }
                    else if (i < mergedValues.length) {
                        newValues.push(mergedValues[i]);
                    }
                    else if (i < currentValue.length) {
                        newValues.push(currentValue[i]);
                    }
                }
                mergedValues = newValues;
            }
        }
    }
    return mergedValues;
}
/**
 * 'setRequiredFields' function

\@param {schema} schema - JSON Schema
\@param {object} formControlTemplate - Form Control Template object
\@return {boolean} - true if any fields have been set to required, false if not
 * @param {?} schema
 * @param {?} formControlTemplate
 * @return {?}
 */
export function setRequiredFields(schema, formControlTemplate) {
    var /** @type {?} */ fieldsRequired = false;
    if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
        fieldsRequired = true;
        var /** @type {?} */ requiredArray = isArray(schema.required) ? schema.required : [schema.required];
        requiredArray = forEach(requiredArray, function (key) { return JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []); });
    }
    return fieldsRequired;
    // TODO: Add support for patternProperties
    // https://spacetelescope.github.io/understanding-json-schema/reference/object.html
    //   #pattern-properties
}
/**
 * 'formatFormData' function

\@param {any} formData - Angular FormGroup data object
\@param  {Map<string, any>} dataMap -
\@param  {Map<string, string>} recursiveRefMap -
\@param  {Map<string, number>} arrayMap -
\@param {boolean = false} fixErrors - if TRUE, tries to fix data
\@return {any} - formatted data object
 * @param {?} formData
 * @param {?} dataMap
 * @param {?} recursiveRefMap
 * @param {?} arrayMap
 * @param {?=} returnEmptyFields
 * @param {?=} fixErrors
 * @return {?}
 */
export function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields, fixErrors) {
    if (returnEmptyFields === void 0) { returnEmptyFields = false; }
    if (fixErrors === void 0) { fixErrors = false; }
    var /** @type {?} */ formattedData = {};
    JsonPointer.forEachDeep(formData, function (value, dataPointer) {
        if (typeof value !== 'object' || (value === null && returnEmptyFields)) {
            var /** @type {?} */ genericPointer = JsonPointer.has(dataMap, [dataPointer, 'schemaType']) ?
                dataPointer :
                resolveRecursiveReferences(dataPointer, recursiveRefMap, arrayMap);
            if (JsonPointer.has(dataMap, [genericPointer, 'schemaType'])) {
                var /** @type {?} */ schemaType = dataMap.get(genericPointer).get('schemaType');
                if (schemaType === 'null') {
                    JsonPointer.set(formattedData, dataPointer, null);
                }
                else if ((hasValue(value) || returnEmptyFields) &&
                    inArray(schemaType, ['string', 'integer', 'number', 'boolean'])) {
                    var /** @type {?} */ newValue = (fixErrors || (value === null && returnEmptyFields)) ?
                        toSchemaType(value, schemaType) :
                        toJavaScriptType(value, schemaType);
                    if (isDefined(newValue) || returnEmptyFields) {
                        JsonPointer.set(formattedData, dataPointer, newValue);
                    }
                }
            }
            else {
                console.error('formatFormData error: Schema type not found for form value at ' +
                    genericPointer);
                console.error(formData);
                console.error(dataMap);
                console.error(recursiveRefMap);
                console.error(arrayMap);
            }
        }
    });
    return formattedData;
}
/**
 * 'getControl' function

Uses a JSON Pointer for a data object to retrieve a control from
an Angular formGroup or formGroup template. (Note: though a formGroup
template is much simpler, its basic structure is idential to a formGroup).

If the optional third parameter 'returnGroup' is set to TRUE, the group
containing the control is returned, rather than the control itself.

\@param {FormGroup} formGroup - Angular FormGroup to get value from
\@param {Pointer} dataPointer - JSON Pointer (string or array)
\@param {boolean = false} returnGroup - If true, return group containing control
\@return {group} - Located value (or true or false, if returnError = true)
 * @param {?} formGroup
 * @param {?} dataPointer
 * @param {?=} returnGroup
 * @return {?}
 */
export function getControl(formGroup, dataPointer, returnGroup) {
    if (returnGroup === void 0) { returnGroup = false; }
    var /** @type {?} */ dataPointerArray = JsonPointer.parse(dataPointer);
    var /** @type {?} */ subGroup = formGroup;
    if (dataPointerArray !== null) {
        var /** @type {?} */ l = dataPointerArray.length - (returnGroup ? 1 : 0);
        for (var /** @type {?} */ i = 0; i < l; ++i) {
            var /** @type {?} */ key = dataPointerArray[i];
            if (subGroup.hasOwnProperty('controls')) {
                subGroup = subGroup.controls;
            }
            if (isArray(subGroup) && (key === '-')) {
                subGroup = subGroup[subGroup.length - 1];
            }
            else if (subGroup.hasOwnProperty(key)) {
                subGroup = subGroup[key];
            }
            else {
                console.error('getControl error: Unable to find "' + key +
                    '" item in FormGroup.');
                console.error(dataPointer);
                console.error(formGroup);
                return;
            }
        }
        return subGroup;
    }
    console.error('getControl error: Invalid JSON Pointer: ' + dataPointer);
}
/**
 * 'fixJsonFormOptions' function

Rename JSON Form-style 'options' lists to
Angular Schema Form-style 'titleMap' lists.

\@param  {any} formObject
\@return {any}
 * @param {?} layout
 * @return {?}
 */
export function fixJsonFormOptions(layout) {
    if (isObject(layout) || isArray(layout)) {
        forEach(layout, function (value, key) {
            if (isObject(value) && hasOwn(value, 'options') && isObject(value.options)) {
                value.titleMap = value.options;
                delete value.options;
            }
        }, 'top-down');
    }
    return layout;
}
//# sourceMappingURL=form-group.functions.js.map