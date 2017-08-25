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
export function buildFormGroupTemplate(jsf, setValues = null, mapArrays = true, schemaPointer = '', dataPointer = '', templatePointer = '') {
    const /** @type {?} */ schema = JsonPointer.get(jsf.schema, schemaPointer);
    let /** @type {?} */ useValues = jsf.globalOptions.setSchemaDefaults ?
        mergeValues(JsonPointer.get(schema, '/default'), setValues) : setValues;
    const /** @type {?} */ schemaType = JsonPointer.get(schema, '/type');
    let /** @type {?} */ controlType;
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
        const /** @type {?} */ genericDataPointer = JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap);
        if (!jsf.dataMap.has(genericDataPointer)) {
            jsf.dataMap.set(genericDataPointer, new Map);
            jsf.dataMap.get(genericDataPointer).set('schemaPointer', schemaPointer);
            jsf.dataMap.get(genericDataPointer).set('schemaType', schema.type);
        }
    }
    let /** @type {?} */ controls;
    let /** @type {?} */ validators = getControlValidators(schema);
    switch (controlType) {
        case 'FormGroup':
            controls = {};
            if (jsf.globalOptions.setSchemaDefaults) {
                useValues = mergeValues(JsonPointer.get(schema, '/properties/default'), useValues);
            }
            let /** @type {?} */ propertyKeys = schema['ui:order'] ||
                schema.properties['ui:order'] ||
                Object.keys(schema.properties);
            for (let /** @type {?} */ key of propertyKeys) {
                controls[key] = buildFormGroupTemplate(jsf, JsonPointer.get(useValues, [/** @type {?} */ (key)]), mapArrays, schemaPointer + '/properties/' + key, dataPointer + '/' + key, templatePointer + '/controls/' + key);
            }
            jsf.globalOptions.fieldsRequired = setRequiredFields(schema, controls);
            return { controlType, controls, validators };
        case 'FormArray':
            const /** @type {?} */ minItems = schema.minItems || 0;
            const /** @type {?} */ maxItems = schema.maxItems || 1000000;
            if (isArray(schema.items)) {
                if (mapArrays && !jsf.arrayMap.get(dataPointer)) {
                    jsf.arrayMap.set(dataPointer, schema.items.length);
                }
                controls = [];
                for (let /** @type {?} */ i = 0, /** @type {?} */ l = schema.items.length; i < l; i++) {
                    if (i >= minItems &&
                        !JsonPointer.has(jsf.templateRefLibrary, [dataPointer + '/' + i])) {
                        jsf.templateRefLibrary[dataPointer + '/' + i] =
                            buildFormGroupTemplate(jsf, null, mapArrays, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i);
                    }
                    if (i < maxItems) {
                        const /** @type {?} */ useValue = isArray(useValues) ? useValues[i] : useValues;
                        controls.push(buildFormGroupTemplate(jsf, useValue, false, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i));
                    }
                }
                if (schema.items.length < maxItems &&
                    hasOwn(schema, 'additionalItems') && isObject(schema.additionalItems)) {
                    const /** @type {?} */ l = Math.max(schema.items.length + 1, isArray(useValues) ? useValues.length : 0);
                    for (let /** @type {?} */ i = schema.items.length; i < l; i++) {
                        const /** @type {?} */ useValue = isArray(useValues) ? useValues[i] : useValues;
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
                    for (let /** @type {?} */ i of Object.keys(useValues)) {
                        controls.push(buildFormGroupTemplate(jsf, useValues[i], false, schemaPointer + '/items', dataPointer + '/' + i, templatePointer + '/controls/' + i));
                    }
                    useValues = null;
                }
            }
            let /** @type {?} */ initialItemCount = Math.max(minItems, JsonPointer.has(schema, '/items/$ref') ? 0 : 1);
            if (controls.length < initialItemCount) {
                for (let /** @type {?} */ i = controls.length, /** @type {?} */ l = initialItemCount; i < l; i++) {
                    controls.push(buildFormGroupTemplate(jsf, useValues, false, schemaPointer + '/items', dataPointer + '/' + i, templatePointer + '/controls/' + i));
                }
            }
            return { controlType, controls, validators };
        case 'FormControl':
            let /** @type {?} */ value = {
                value: isPrimitive(useValues) ? useValues : null,
                disabled: schema['disabled'] ||
                    JsonPointer.get(schema, '/x-schema-form/disabled') || false
            };
            return { controlType, value, validators };
        case '$ref':
            const /** @type {?} */ schemaRef = JsonPointer.compile(schema.$ref);
            if (!hasOwn(jsf.templateRefLibrary, schemaRef)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.templateRefLibrary[schemaRef] = null;
                const /** @type {?} */ newTemplate = buildFormGroupTemplate(jsf, null, false, schemaRef);
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
    let /** @type {?} */ validatorFns = [];
    let /** @type {?} */ validatorFn = null;
    if (hasOwn(template, 'validators')) {
        forEach(template.validators, (parameters, validator) => {
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
                let /** @type {?} */ groupControls = {};
                forEach(template.controls, (controls, key) => {
                    let /** @type {?} */ newControl = buildFormGroup(controls);
                    if (newControl) {
                        groupControls[key] = newControl;
                    }
                });
                return new FormGroup(groupControls, validatorFn);
            case 'FormArray':
                return new FormArray(_.filter(_.map(template.controls, controls => buildFormGroup(controls))), validatorFn);
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
export function mergeValues(...valuesToMerge) {
    let /** @type {?} */ mergedValues = null;
    for (let /** @type {?} */ index = 0, /** @type {?} */ length = arguments.length; index < length; index++) {
        const /** @type {?} */ currentValue = arguments[index];
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
                let /** @type {?} */ newValues = [];
                for (let /** @type {?} */ value of currentValue) {
                    newValues.push(mergeValues(mergedValues, value));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isObject(currentValue)) {
                let /** @type {?} */ newValues = [];
                for (let /** @type {?} */ value of mergedValues) {
                    newValues.push(mergeValues(value, currentValue));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isArray(currentValue)) {
                let /** @type {?} */ newValues = [];
                const /** @type {?} */ l = Math.max(mergedValues.length, currentValue.length);
                for (let /** @type {?} */ i = 0; i < l; i++) {
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
    let /** @type {?} */ fieldsRequired = false;
    if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
        fieldsRequired = true;
        let /** @type {?} */ requiredArray = isArray(schema.required) ? schema.required : [schema.required];
        requiredArray = forEach(requiredArray, key => JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []));
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
export function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields = false, fixErrors = false) {
    let /** @type {?} */ formattedData = {};
    JsonPointer.forEachDeep(formData, (value, dataPointer) => {
        if (typeof value !== 'object' || (value === null && returnEmptyFields)) {
            let /** @type {?} */ genericPointer = JsonPointer.has(dataMap, [dataPointer, 'schemaType']) ?
                dataPointer :
                resolveRecursiveReferences(dataPointer, recursiveRefMap, arrayMap);
            if (JsonPointer.has(dataMap, [genericPointer, 'schemaType'])) {
                const /** @type {?} */ schemaType = dataMap.get(genericPointer).get('schemaType');
                if (schemaType === 'null') {
                    JsonPointer.set(formattedData, dataPointer, null);
                }
                else if ((hasValue(value) || returnEmptyFields) &&
                    inArray(schemaType, ['string', 'integer', 'number', 'boolean'])) {
                    const /** @type {?} */ newValue = (fixErrors || (value === null && returnEmptyFields)) ?
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
export function getControl(formGroup, dataPointer, returnGroup = false) {
    const /** @type {?} */ dataPointerArray = JsonPointer.parse(dataPointer);
    let /** @type {?} */ subGroup = formGroup;
    if (dataPointerArray !== null) {
        let /** @type {?} */ l = dataPointerArray.length - (returnGroup ? 1 : 0);
        for (let /** @type {?} */ i = 0; i < l; ++i) {
            let /** @type {?} */ key = dataPointerArray[i];
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
        forEach(layout, (value, key) => {
            if (isObject(value) && hasOwn(value, 'options') && isObject(value.options)) {
                value.titleMap = value.options;
                delete value.options;
            }
        }, 'top-down');
    }
    return layout;
}
//# sourceMappingURL=form-group.functions.js.map