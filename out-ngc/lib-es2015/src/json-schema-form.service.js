import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Ajv from 'ajv';
import * as _ from 'lodash/index';
import { convertJsonSchemaToDraft6 } from './shared/convert-json-schema.functions';
import { hasValue, isArray, isDefined, isObject, isString } from './shared/validator.functions';
import { hasOwn, parseText } from './shared/utility.functions';
import { JsonPointer } from './shared/jsonpointer.functions';
import { buildSchemaFromData, buildSchemaFromLayout, getSchemaReference } from './shared/json-schema.functions';
import { buildFormGroup, buildFormGroupTemplate, fixJsonFormOptions, formatFormData, getControl } from './shared/form-group.functions';
import { buildLayout } from './shared/layout.functions';
export class JsonSchemaFormService {
    constructor() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.ajvOptions = { allErrors: true, unknownFormats: 'ignore' };
        this.ajv = new Ajv(this.ajvOptions); // AJV: Another JSON Schema Validator
        this.validateFormData = null; // Compiled AJV function to validate active form's schema
        this.initialValues = {}; // The initial data model (e.g. previously submitted data)
        this.schema = {}; // The internal JSON Schema
        this.layout = []; // The internal Form layout
        this.formGroupTemplate = {}; // The template used to create formGroup
        this.formGroup = null; // The Angular formGroup, which powers the reactive form
        this.framework = null; // The active framework component
        this.data = {}; // Form data, formatted with correct data types
        this.validData = null; // Valid form data (or null)
        this.isValid = null; // Is current form data valid?
        this.validationErrors = null; // Any validation errors for current data
        this.formValueSubscription = null; // Subscription to formGroup.valueChanges observable (for un- and re-subscribing)
        this.dataChanges = new Subject(); // Form data observable
        this.isValidChanges = new Subject(); // isValid observable
        this.validationErrorChanges = new Subject(); // validationErrors observable
        this.arrayMap = new Map(); // Maps arrays in data object and number of tuple values
        this.dataMap = new Map(); // Maps paths in data model to schema and formGroup paths
        this.dataRecursiveRefMap = new Map(); // Maps recursive reference points in data model
        this.schemaRecursiveRefMap = new Map(); // Maps recursive reference points in schema
        this.layoutRefLibrary = {}; // Library of layout nodes for adding to form
        this.schemaRefLibrary = {}; // Library of schemas for resolving schema $refs
        this.templateRefLibrary = {}; // Library of formGroup templates for adding to form
        // Default global form options
        this.globalOptionDefaults = {
            addSubmit: 'auto',
            // for addSubmit: true = always, false = never,
            // 'auto' = only if layout is undefined (form is built from schema alone)
            debug: false,
            fieldsRequired: false,
            framework: 'material-design',
            widgets: {},
            loadExternalAssets: false,
            pristine: { errors: true, success: true },
            supressPropertyTitles: false,
            setSchemaDefaults: true,
            validateOnRender: false,
            formDefaults: {
                addable: true,
                orderable: true,
                removable: true,
                allowExponents: false,
                enableErrorState: true,
                // disableErrorState: false, // Don't apply 'has-error' class when field fails validation?
                enableSuccessState: true,
                // disableSuccessState: false, // Don't apply 'has-success' class when field validates?
                feedback: false,
                feedbackOnRender: false,
                notitle: false,
                readonly: false,
                returnEmptyFields: true,
            },
        };
        this.globalOptions = _.cloneDeep(this.globalOptionDefaults);
    }
    /**
     * @return {?}
     */
    getData() { return this.data; }
    /**
     * @return {?}
     */
    getSchema() { return this.schema; }
    /**
     * @return {?}
     */
    getLayout() { return this.layout; }
    /**
     * @return {?}
     */
    resetAllValues() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.validateFormData = null;
        this.initialValues = {};
        this.schema = {};
        this.layout = [];
        this.formGroupTemplate = {};
        this.formGroup = null;
        this.framework = null;
        this.data = {};
        this.validData = null;
        this.isValid = null;
        this.validationErrors = null;
        this.arrayMap = new Map();
        this.dataMap = new Map();
        this.dataRecursiveRefMap = new Map();
        this.schemaRecursiveRefMap = new Map();
        this.layoutRefLibrary = {};
        this.schemaRefLibrary = {};
        this.templateRefLibrary = {};
        this.globalOptions = _.cloneDeep(this.globalOptionDefaults);
    }
    /**
     * @return {?}
     */
    convertJsonSchemaToDraft6() {
        this.schema = convertJsonSchemaToDraft6(this.schema);
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    fixJsonFormOptions(layout) {
        return fixJsonFormOptions(layout);
    }
    /**
     * @param {?=} setValues
     * @return {?}
     */
    buildFormGroupTemplate(setValues = true) {
        this.formGroupTemplate =
            buildFormGroupTemplate(this, this.initialValues, setValues);
    }
    /**
     * @param {?} newValue
     * @param {?=} updateSubscriptions
     * @return {?}
     */
    validateData(newValue, updateSubscriptions = true) {
        // Format raw form data to correct data types
        this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.globalOptions.returnEmptyFields);
        this.isValid = this.validateFormData(this.data);
        this.validData = this.isValid ? this.data : null;
        this.validationErrors = this.validateFormData.errors;
        if (updateSubscriptions) {
            if (this.dataChanges.observers.length) {
                this.dataChanges.next(this.data);
            }
            if (this.isValidChanges.observers.length) {
                this.isValidChanges.next(this.isValid);
            }
            if (this.validationErrorChanges.observers.length) {
                this.validationErrorChanges.next(this.validationErrors);
            }
        }
    }
    /**
     * @return {?}
     */
    buildFormGroup() {
        this.formGroup = (buildFormGroup(this.formGroupTemplate));
        if (this.formGroup) {
            this.compileAjvSchema();
            this.validateData(this.formGroup.value, false);
            // Set up observables to emit data and validation info when form data changes
            if (this.formValueSubscription) {
                this.formValueSubscription.unsubscribe();
            }
            this.formValueSubscription = this.formGroup.valueChanges.subscribe(formValue => this.validateData(formValue));
        }
    }
    /**
     * @param {?} widgetLibrary
     * @return {?}
     */
    buildLayout(widgetLibrary) {
        this.layout = buildLayout(this, widgetLibrary);
    }
    /**
     * @param {?} newOptions
     * @return {?}
     */
    setOptions(newOptions) {
        if (typeof newOptions === 'object') {
            Object.assign(this.globalOptions, newOptions);
        }
        if (hasOwn(this.globalOptions.formDefaults, 'disableErrorState')) {
            this.globalOptions.formDefaults.enableErrorState =
                !this.globalOptions.formDefaults.disableErrorState;
            delete this.globalOptions.formDefaults.disableErrorState;
        }
        if (hasOwn(this.globalOptions.formDefaults, 'disableSuccessState')) {
            this.globalOptions.formDefaults.enableSuccessState =
                !this.globalOptions.formDefaults.disableSuccessState;
            delete this.globalOptions.formDefaults.disableSuccessState;
        }
    }
    /**
     * @return {?}
     */
    compileAjvSchema() {
        if (!this.validateFormData) {
            // if 'ui:order' exists in properties, move it to root before compiling with ajv
            if (Array.isArray(this.schema.properties['ui:order'])) {
                this.schema['ui:order'] = this.schema.properties['ui:order'];
                delete this.schema.properties['ui:order'];
            }
            this.validateFormData = this.ajv.compile(this.schema);
        }
    }
    /**
     * @return {?}
     */
    resolveSchemaRefLinks() {
        // Search schema for $ref links
        JsonPointer.forEachDeep(this.schema, (value, pointer) => {
            if (hasOwn(value, '$ref') && isString(value['$ref'])) {
                const /** @type {?} */ newReference = JsonPointer.compile(value['$ref']);
                const /** @type {?} */ isRecursive = JsonPointer.isSubPointer(newReference, pointer);
                // Save new target schemas in schemaRefLibrary
                if (hasValue(newReference) && !hasOwn(this.schemaRefLibrary, newReference)) {
                    this.schemaRefLibrary[newReference] = getSchemaReference(this.schema, newReference, this.schemaRefLibrary);
                }
                // Save link in schemaRecursiveRefMap
                if (!this.schemaRecursiveRefMap.has(pointer)) {
                    this.schemaRecursiveRefMap.set(pointer, newReference);
                }
                // If a $ref link is not recursive,
                // remove link and replace with copy of target schema
                if (!isRecursive) {
                    delete value['$ref'];
                    const /** @type {?} */ targetSchema = Object.assign(_.cloneDeep(this.schemaRefLibrary[newReference]), value);
                    this.schema = JsonPointer.set(this.schema, pointer, targetSchema);
                    // Save partial link in schemaRecursiveRefMap,
                    // so it can be matched later if it is recursive
                    this.schemaRecursiveRefMap.set(newReference, pointer);
                }
                else {
                    // If a matching partial link exists, complete it
                    const /** @type {?} */ mappedReference = this.schemaRecursiveRefMap.get(newReference);
                    if (this.schemaRecursiveRefMap.has(newReference) &&
                        JsonPointer.isSubPointer(mappedReference, newReference)) {
                        this.schemaRecursiveRefMap.set(newReference, mappedReference);
                    }
                }
            }
        }, true);
        // Add redirects for links to shared schemas (such as definitions)
        let /** @type {?} */ addRedirects = new Map();
        this.schemaRecursiveRefMap.forEach((toRef1, fromRef1) => this.schemaRecursiveRefMap.forEach((toRef2, fromRef2) => {
            if (fromRef1 !== fromRef2 && fromRef1 !== toRef2 &&
                JsonPointer.isSubPointer(toRef2, fromRef1)) {
                const /** @type {?} */ newRef = fromRef2 + fromRef1.slice(toRef2.length);
                if (!this.schemaRecursiveRefMap.has(newRef)) {
                    addRedirects.set(newRef, toRef1);
                }
            }
        }));
        addRedirects.forEach((toRef, fromRef) => this.schemaRecursiveRefMap.set(fromRef, toRef));
        // Fix recursive references pointing to shared schemas
        this.schemaRecursiveRefMap.forEach((toRef1, fromRef1) => this.schemaRecursiveRefMap.forEach((toRef2, fromRef2) => {
            if (fromRef1 !== fromRef2 && toRef1 === toRef2 &&
                JsonPointer.isSubPointer(fromRef1, fromRef2)) {
                this.schemaRecursiveRefMap.set(fromRef2, fromRef1);
            }
        }));
        // Remove unmatched (non-recursive) partial links
        this.schemaRecursiveRefMap.forEach((toRef, fromRef) => {
            if (!JsonPointer.isSubPointer(toRef, fromRef) &&
                !hasOwn(this.schemaRefLibrary, toRef)) {
                this.schemaRecursiveRefMap.delete(fromRef);
            }
        });
        // // TODO: Create dataRecursiveRefMap from schemaRecursiveRefMap
        // this.schemaRecursiveRefMap.forEach((toRef, fromRef) => {
        //   this.dataRecursiveRefMap.set(
        //     JsonPointer.toDataPointer(fromRef, this.schema),
        //     JsonPointer.toDataPointer(toRef, this.schema)
        //   );
        // });
    }
    /**
     * @param {?=} data
     * @param {?=} requireAllFields
     * @return {?}
     */
    buildSchemaFromData(data, requireAllFields = false) {
        if (data) {
            return buildSchemaFromData(data, requireAllFields);
        }
        this.schema = buildSchemaFromData(this.initialValues, requireAllFields);
    }
    /**
     * @param {?=} layout
     * @return {?}
     */
    buildSchemaFromLayout(layout) {
        if (layout) {
            return buildSchemaFromLayout(layout);
        }
        this.schema = buildSchemaFromLayout(this.layout);
    }
    /**
     * @param {?=} newTpldata
     * @return {?}
     */
    setTpldata(newTpldata = {}) {
        this.tpldata = newTpldata;
    }
    /**
     * @param {?=} text
     * @param {?=} value
     * @param {?=} values
     * @param {?=} key
     * @return {?}
     */
    parseText(text = '', value = {}, values = {}, key = null) {
        return parseText(text, value, values, key, this.tpldata);
    }
    /**
     * @param {?=} parentCtx
     * @param {?=} childNode
     * @param {?=} index
     * @return {?}
     */
    setTitle(parentCtx = {}, childNode = null, index = null) {
        const /** @type {?} */ parentNode = parentCtx.layoutNode;
        let /** @type {?} */ text;
        let /** @type {?} */ childValue;
        let /** @type {?} */ parentValues = this.getControlValue(parentCtx);
        const /** @type {?} */ isArrayItem = parentNode.type.slice(-5) === 'array' && isArray(parentValues);
        if (isArrayItem && childNode.type !== '$ref') {
            text = JsonPointer.getFirst([
                [childNode, '/options/legend'],
                [childNode, '/options/title'],
                [childNode, '/title'],
                [parentNode, '/options/title'],
                [parentNode, '/options/legend'],
                [parentNode, '/title'],
            ]);
        }
        else {
            text = JsonPointer.getFirst([
                [childNode, '/title'],
                [childNode, '/options/title'],
                [childNode, '/options/legend'],
                [parentNode, '/title'],
                [parentNode, '/options/title'],
                [parentNode, '/options/legend']
            ]);
            if (childNode.type === '$ref') {
                text = '+ ' + text;
            }
        }
        if (!text) {
            return text;
        }
        childValue = isArrayItem ? parentValues[index] : parentValues;
        return this.parseText(text, childValue, parentValues, index);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    initializeControl(ctx) {
        ctx.formControl = this.getControl(ctx);
        ctx.boundControl = !!ctx.formControl;
        if (ctx.boundControl) {
            ctx.controlName = this.getControlName(ctx);
            ctx.controlValue = ctx.formControl.value;
            ctx.formControl.valueChanges.subscribe(v => ctx.controlValue = v);
            ctx.controlDisabled = ctx.formControl.disabled;
            // TODO: subscribe to status changes
            // TODO: emit / display error messages
            // ctx.formControl.statusChanges.subscribe(v => ...);
        }
        else {
            ctx.controlName = ctx.layoutNode.name;
            ctx.controlValue = ctx.layoutNode.value;
            const /** @type {?} */ dataPointer = this.getDataPointer(ctx);
            if (dataPointer) {
                console.error('warning: control "' + dataPointer +
                    '" is not bound to the Angular FormGroup.');
            }
        }
        return ctx.boundControl;
    }
    /**
     * @param {?} ctx
     * @param {?} value
     * @return {?}
     */
    updateValue(ctx, value) {
        // Set value of current control
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
        // Set values of any related controls in copyValueTo array
        if (isArray(ctx.options.copyValueTo)) {
            for (let /** @type {?} */ item of ctx.options.copyValueTo) {
                let /** @type {?} */ targetControl = getControl(this.formGroup, item);
                if (isObject(targetControl) && typeof targetControl.setValue === 'function') {
                    targetControl.setValue(value);
                    targetControl.markAsDirty();
                }
            }
        }
    }
    /**
     * @param {?} ctx
     * @param {?} checkboxList
     * @return {?}
     */
    updateArrayCheckboxList(ctx, checkboxList) {
        let /** @type {?} */ formArray = (this.getControl(ctx));
        // Remove all existing items
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
        // Re-add an item for each checked box
        for (let /** @type {?} */ checkboxItem of checkboxList) {
            if (checkboxItem.checked) {
                let /** @type {?} */ newFormControl = buildFormGroup(JsonPointer.get(this.templateRefLibrary, [ctx.layoutNode.dataPointer + '/-']));
                newFormControl.setValue(checkboxItem.value);
                formArray.push(newFormControl);
            }
        }
        formArray.markAsDirty();
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getControl(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx));
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getControlValue(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        const /** @type {?} */ control = getControl(this.formGroup, this.getDataPointer(ctx));
        return control ? control.value : null;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getControlGroup(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer) {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx), true);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getControlName(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer || !ctx.dataIndex) {
            return null;
        }
        return JsonPointer.toKey(this.getDataPointer(ctx));
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getLayoutArray(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -1);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getParentNode(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -2);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getDataPointer(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer || !ctx.dataIndex) {
            return null;
        }
        return JsonPointer.toIndexedPointer(ctx.layoutNode.dataPointer, ctx.dataIndex, this.arrayMap);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getLayoutPointer(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.layoutPointer || !ctx.layoutIndex) {
            return null;
        }
        return JsonPointer.toIndexedPointer(ctx.layoutNode.layoutPointer, ctx.layoutIndex);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    isControlBound(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer || !ctx.dataIndex) {
            return false;
        }
        const /** @type {?} */ controlGroup = this.getControlGroup(ctx);
        const /** @type {?} */ name = this.getControlName(ctx);
        return controlGroup ? controlGroup.controls.hasOwnProperty(name) : false;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    addItem(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.$ref || !ctx.dataIndex ||
            !ctx.layoutNode.layoutPointer || !ctx.layoutIndex) {
            return false;
        }
        // Create a new Angular form control from a template in templateRefLibrary
        const /** @type {?} */ newFormGroup = buildFormGroup(JsonPointer.get(this.templateRefLibrary, [ctx.layoutNode.$ref]));
        // Add the new form control to the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            ((this.getControlGroup(ctx)))
                .push(newFormGroup);
        }
        else {
            ((this.getControlGroup(ctx)))
                .addControl(this.getControlName(ctx), newFormGroup);
        }
        // Copy a new layoutNode from layoutRefLibrary
        const /** @type {?} */ newLayoutNode = _.cloneDeep(JsonPointer.get(this.layoutRefLibrary, [ctx.layoutNode.$ref]));
        JsonPointer.forEachDeep(newLayoutNode, (value, pointer) => {
            // Reset all _id's in newLayoutNode to unique values
            if (hasOwn(value, '_id')) {
                value._id = _.uniqueId();
            }
            // If adding a recursive item, prefix current dataPointer
            // and layoutPointer to all pointers in new layoutNode
            if (!ctx.layoutNode.arrayItem || ctx.layoutNode.recursiveReference) {
                if (hasOwn(value, 'dataPointer')) {
                    value.dataPointer = ctx.layoutNode.dataPointer + value.dataPointer;
                }
                if (hasOwn(value, 'layoutPointer')) {
                    value.layoutPointer =
                        ctx.layoutNode.layoutPointer.slice(0, -2) + value.layoutPointer;
                }
            }
        });
        // Add the new layoutNode to the layout
        JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
        return true;
    }
    /**
     * @param {?} ctx
     * @param {?} oldIndex
     * @param {?} newIndex
     * @return {?}
     */
    moveArrayItem(ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer || !ctx.dataIndex ||
            !ctx.layoutNode.layoutPointer || !ctx.layoutIndex ||
            !isDefined(oldIndex) || !isDefined(newIndex)) {
            return false;
        }
        // Move item in the formArray
        let /** @type {?} */ formArray = (this.getControlGroup(ctx));
        formArray.controls.splice(newIndex, 0, // add to new index
        formArray.controls.splice(oldIndex, 1)[0] // remove from old index
        );
        formArray.updateValueAndValidity();
        ((formArray))._onCollectionChange();
        // Move layout item
        let /** @type {?} */ layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    removeItem(ctx) {
        if (!ctx.layoutNode || !ctx.layoutNode.dataPointer || !ctx.dataIndex ||
            !ctx.layoutNode.layoutPointer || !ctx.layoutIndex) {
            return false;
        }
        // Remove the Angular form control from the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            ((this.getControlGroup(ctx)))
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else {
            ((this.getControlGroup(ctx)))
                .removeControl(this.getControlName(ctx));
        }
        // Remove layoutNode from layout
        let /** @type {?} */ layoutPointer = this.getLayoutPointer(ctx);
        JsonPointer.remove(this.layout, layoutPointer);
        return true;
    }
}
JsonSchemaFormService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
JsonSchemaFormService.ctorParameters = () => [];
function JsonSchemaFormService_tsickle_Closure_declarations() {
    /** @type {?} */
    JsonSchemaFormService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JsonSchemaFormService.ctorParameters;
    /** @type {?} */
    JsonSchemaFormService.prototype.JsonFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.ReactJsonSchemaFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.AngularSchemaFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.tpldata;
    /** @type {?} */
    JsonSchemaFormService.prototype.ajvOptions;
    /** @type {?} */
    JsonSchemaFormService.prototype.ajv;
    /** @type {?} */
    JsonSchemaFormService.prototype.validateFormData;
    /** @type {?} */
    JsonSchemaFormService.prototype.initialValues;
    /** @type {?} */
    JsonSchemaFormService.prototype.schema;
    /** @type {?} */
    JsonSchemaFormService.prototype.layout;
    /** @type {?} */
    JsonSchemaFormService.prototype.formGroupTemplate;
    /** @type {?} */
    JsonSchemaFormService.prototype.formGroup;
    /** @type {?} */
    JsonSchemaFormService.prototype.framework;
    /** @type {?} */
    JsonSchemaFormService.prototype.data;
    /** @type {?} */
    JsonSchemaFormService.prototype.validData;
    /** @type {?} */
    JsonSchemaFormService.prototype.isValid;
    /** @type {?} */
    JsonSchemaFormService.prototype.validationErrors;
    /** @type {?} */
    JsonSchemaFormService.prototype.formValueSubscription;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.isValidChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.validationErrorChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.arrayMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataRecursiveRefMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.schemaRecursiveRefMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.layoutRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.schemaRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.templateRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.globalOptionDefaults;
    /** @type {?} */
    JsonSchemaFormService.prototype.globalOptions;
}
//# sourceMappingURL=json-schema-form.service.js.map