import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash/index';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormService } from './json-schema-form.service';
import { hasValue, isArray, isEmpty, isObject } from './shared/validator.functions';
import { hasOwn } from './shared/utility.functions';
import { JsonPointer } from './shared/jsonpointer.functions';
/**
 * \@module 'JsonSchemaFormComponent' - Angular JSON Schema Form
 */
var JsonSchemaFormComponent = (function () {
    /**
     * @param {?} frameworkLibrary
     * @param {?} widgetLibrary
     * @param {?} jsf
     * @param {?} sanitizer
     */
    function JsonSchemaFormComponent(frameworkLibrary, widgetLibrary, jsf, sanitizer) {
        this.frameworkLibrary = frameworkLibrary;
        this.widgetLibrary = widgetLibrary;
        this.jsf = jsf;
        this.sanitizer = sanitizer;
        this.formValueSubscription = null;
        // Outputs
        this.onChanges = new EventEmitter(); // Live unvalidated internal form data
        this.onSubmit = new EventEmitter(); // Complete validated form data
        this.isValid = new EventEmitter(); // Is current data valid?
        this.validationErrors = new EventEmitter(); // Validation errors (if any)
        this.formSchema = new EventEmitter(); // Final schema used to create form
        this.formLayout = new EventEmitter();
        this.jsfObject = jsf;
    }
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.ngOnInit = function () { };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.ngOnChanges = function () {
        this.initializeForm();
    };
    Object.defineProperty(JsonSchemaFormComponent.prototype, "stylesheets", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return this.frameworkLibrary.getFrameworkStylesheets()
                .map(function (stylesheet) { return load(stylesheet); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonSchemaFormComponent.prototype, "scripts", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return this.frameworkLibrary.getFrameworkStylesheets()
                .map(function (script) { return load(script); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 'initializeForm' function
    
    - Update 'schema', 'layout', and 'initialValues', from inputs.
    
    - Create 'dataMap' to map the data to the schema and template.
    
    - Create 'schemaRefLibrary' to resolve schema $ref links.
    
    - Create 'layoutRefLibrary' to use when dynamically adding
      form components to arrays and recursive $ref points.
    
    - Create 'formGroupTemplate', then from it 'formGroup',
      the Angular formGroup used to control the reactive form.
    
    \@return {void}
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeForm = function () {
        var _this = this;
        if (this.schema || this.layout || this.data ||
            this.form || this.JSONSchema || this.UISchema) {
            // Reset all form values to defaults
            this.jsf.resetAllValues();
            // Initialize 'options' (global form options) and set framework
            // Combine available inputs:
            // 1. options - recommended
            // 2. form.options - Single input style
            this.jsf.setOptions({ debug: !!this.debug });
            var /** @type {?} */ loadExternalAssets = this.loadExternalAssets || false;
            var /** @type {?} */ framework = this.framework || 'default';
            if (isObject(this.options)) {
                this.jsf.setOptions(this.options);
                loadExternalAssets = this.options.loadExternalAssets || loadExternalAssets;
                framework = this.options.framework || framework;
            }
            if (isObject(this.form) && isObject(this.form.options)) {
                this.jsf.setOptions(this.form.options);
                loadExternalAssets = this.form.options.loadExternalAssets || loadExternalAssets;
                framework = this.form.options.framework || framework;
            }
            if (isObject(this.widgets)) {
                this.jsf.setOptions({ widgets: this.widgets });
            }
            this.frameworkLibrary.setLoadExternalAssets(loadExternalAssets);
            this.frameworkLibrary.setFramework(framework);
            this.jsf.framework = this.frameworkLibrary.getFramework();
            if (isObject(this.jsf.globalOptions.widgets)) {
                for (var _i = 0, _a = Object.keys(this.jsf.globalOptions.widgets); _i < _a.length; _i++) {
                    var widget = _a[_i];
                    this.widgetLibrary.registerWidget(widget, this.jsf.globalOptions.widgets[widget]);
                }
            }
            if (isObject(this.form) && isObject(this.form.tpldata)) {
                this.jsf.setTpldata(this.form.tpldata);
            }
            // Initialize 'schema'
            // Use first available input:
            // 1. schema - recommended / Angular Schema Form style
            // 2. form.schema - Single input / JSON Form style
            // 3. JSONSchema - React JSON Schema Form style
            // 4. form.JSONSchema - For testing single input React JSON Schema Forms
            // 5. form - For testing single schema-only inputs
            // TODO: 6. (none) no schema - construct form entirely from layout instead
            if (isObject(this.schema)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.schema = _.cloneDeep(this.schema);
            }
            else if (hasOwn(this.form, 'schema') && isObject(this.form.schema)) {
                this.jsf.schema = _.cloneDeep(this.form.schema);
            }
            else if (isObject(this.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = _.cloneDeep(this.JSONSchema);
            }
            else if (hasOwn(this.form, 'JSONSchema') && isObject(this.form.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = _.cloneDeep(this.form.JSONSchema);
            }
            else if (hasOwn(this.form, 'properties') && isObject(this.form.properties)) {
                this.jsf.schema = _.cloneDeep(this.form);
            }
            if (!isEmpty(this.jsf.schema)) {
                // Allow for JSON schema shorthand (JSON Form style)
                if (!hasOwn(this.jsf.schema, 'type') &&
                    hasOwn(this.jsf.schema, 'properties') &&
                    isObject(this.jsf.schema.properties)) {
                    this.jsf.schema.type = 'object';
                }
                else if (!hasOwn(this.jsf.schema, 'type') ||
                    this.jsf.schema.type !== 'object' ||
                    !hasOwn(this.jsf.schema, 'properties')) {
                    this.jsf.JsonFormCompatibility = true;
                    this.jsf.schema = { 'type': 'object', 'properties': this.jsf.schema };
                }
                // Convert JSON Schemas version 3 (JSON Form style)
                // or version 4 (Angular Schema Form style) to version 6
                this.jsf.convertJsonSchemaToDraft6();
                // Initialize ajv and compile schema
                this.jsf.compileAjvSchema();
                // Resolve all schema $ref links
                this.jsf.resolveSchemaRefLinks();
            }
            // Initialize 'layout'
            // Use first available array input:
            // 1. layout - recommended
            // 2. form - Angular Schema Form style
            // 3. form.form - JSON Form style
            // 4. form.layout - Single input style
            // 5. (none) no input - use default layout instead
            if (isArray(this.layout)) {
                this.jsf.layout = _.cloneDeep(this.layout);
            }
            else if (isArray(this.form)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.layout = _.cloneDeep(this.form);
            }
            else if (this.form && isArray(this.form.form)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.layout =
                    this.jsf.fixJsonFormOptions(_.cloneDeep(this.form.form));
            }
            else if (this.form && isArray(this.form.layout)) {
                this.jsf.layout = _.cloneDeep(this.form.layout);
            }
            else {
                this.jsf.layout =
                    this.jsf.globalOptions.addSubmit === false ?
                        ['*'] :
                        ['*', { type: 'submit', title: 'Submit' }];
            }
            // Import alternate layout formats 'UISchema' or 'customFormItems'
            // used for React JSON Schema Form and JSON Form API compatibility
            // Use first available input:
            // 1. UISchema - React JSON Schema Form style
            // 2. form.UISchema - For testing single input React JSON Schema Forms
            // 2. form.customFormItems - JSON Form style
            // 3. (none) no input - don't import
            var /** @type {?} */ alternateLayout = null;
            if (isObject(this.UISchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = _.cloneDeep(this.UISchema);
            }
            else if (hasOwn(this.form, 'UISchema')) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = _.cloneDeep(this.form.UISchema);
            }
            else if (hasOwn(this.form, 'customFormItems')) {
                this.jsf.JsonFormCompatibility = true;
                alternateLayout =
                    this.jsf.fixJsonFormOptions(_.cloneDeep(this.form.customFormItems));
            }
            // if alternate layout found, copy options into schema
            if (alternateLayout) {
                JsonPointer.forEachDeep(alternateLayout, function (value, pointer) {
                    var /** @type {?} */ schemaPointer = pointer.replace(/\//g, '/properties/')
                        .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                        .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                    if (hasValue(value) && hasValue(pointer)) {
                        var /** @type {?} */ groupPointer = JsonPointer.parse(schemaPointer).slice(0, -2);
                        var /** @type {?} */ key = JsonPointer.toKey(schemaPointer);
                        var /** @type {?} */ itemPointer = void 0;
                        // If 'ui:order' object found, copy into schema root
                        if (key === 'ui:order') {
                            itemPointer = schemaPointer;
                            // Copy other alternate layout options to schema 'x-schema-form',
                            // (like Angular Schema Form options) and remove any 'ui:' prefixes
                        }
                        else {
                            itemPointer = groupPointer.concat(['x-schema-form',
                                key.slice(0, 3) === 'ui:' ? key.slice(3) : key
                            ]);
                        }
                        if (JsonPointer.has(_this.jsf.schema, groupPointer) &&
                            !JsonPointer.has(_this.jsf.schema, itemPointer)) {
                            JsonPointer.set(_this.jsf.schema, itemPointer, value);
                        }
                    }
                });
            }
            // Initialize 'initialValues'
            // Use first available input:
            // 1. data - recommended
            // 2. model - Angular Schema Form style
            // 3. form.value - JSON Form style
            // 4. form.data - Single input style
            // 5. formData - React JSON Schema Form style
            // 6. form.formData - For easier testing of React JSON Schema Forms
            // 7. (none) no data - initialize data from schema and layout defaults only
            if (isObject(this.data)) {
                this.jsf.initialValues = _.cloneDeep(this.data);
            }
            else if (isObject(this.model)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.initialValues = _.cloneDeep(this.model);
            }
            else if (isObject(this.form) && isObject(this.form.value)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.initialValues = _.cloneDeep(this.form.value);
            }
            else if (isObject(this.form) && isObject(this.form.data)) {
                this.jsf.initialValues = _.cloneDeep(this.form.data);
            }
            else if (isObject(this.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.initialValues = _.cloneDeep(this.formData);
            }
            else if (hasOwn(this.form, 'formData') && isObject(this.form.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.initialValues = _.cloneDeep(this.form.formData);
            }
            if (isEmpty(this.jsf.schema)) {
                // TODO: If layout, but no schema, build schema from layout
                if (this.jsf.layout.indexOf('*') === -1) {
                    this.jsf.buildSchemaFromLayout();
                    // If no schema and no layout, build schema from data
                }
                else if (!isEmpty(this.jsf.initialValues)) {
                    this.jsf.buildSchemaFromData();
                }
            }
            if (!isEmpty(this.jsf.schema)) {
                // If not already initialized, initialize ajv and compile schema
                this.jsf.compileAjvSchema();
                // Build the Angular FormGroup template from the schema
                this.jsf.buildFormGroupTemplate();
                // Update all layout elements, add values, widgets, and validators,
                // replace any '*' with a layout built from all schema elements,
                // and update the FormGroup template with any new validators
                this.jsf.buildLayout(this.widgetLibrary);
                // Build the real Angular FormGroup from the FormGroup template
                this.jsf.buildFormGroup();
            }
            if (this.jsf.formGroup) {
                // // Calculate references to other fields
                // if (!isEmpty(this.jsf.formGroup.value)) {
                //   forEach(this.jsf.formGroup.value, (value, key, object, rootObject) => {
                //     if (typeof value === 'string') {
                //       object[key] = this.jsf.parseText(value, value, rootObject, key);
                //     }
                //   }, 'top-down');
                // }
                // // TODO: Figure out how to display calculated values without changing object data
                // // See http://ulion.github.io/jsonform/playground/?example=templating-values
                // TODO: (re-)render the form
                // Subscribe to form changes to output live data, validation, and errors
                this.jsf.dataChanges.subscribe(function (data) { return _this.onChanges.emit(data); });
                this.jsf.isValidChanges.subscribe(function (isValid) { return _this.isValid.emit(isValid); });
                this.jsf.validationErrorChanges.subscribe(function (errors) { return _this.validationErrors.emit(errors); });
                // Output final schema, final layout, and initial data
                this.formSchema.emit(this.jsf.schema);
                this.formLayout.emit(this.jsf.layout);
                this.onChanges.emit(this.jsf.data);
                // If 'validateOnRender' = true, output initial validation and any errors
                if (JsonPointer.get(this.jsf, '/globalOptions/validateOnRender')) {
                    this.isValid.emit(this.jsf.isValid);
                    this.validationErrors.emit(this.jsf.validationErrors);
                }
                // Uncomment individual lines to output debugging information to console:
                // (These always work.)
                // console.log('loading form...');
                // console.log(this.jsf.schema);
                // console.log(this.jsf.layout);
                // console.log(this.options);
                // console.log(this.jsf.initialValues);
                // console.log(this.jsf.formGroup.value);
                // console.log(this.jsf.formGroupTemplate);
                // console.log(this.jsf.formGroup);
                // console.log(this.jsf.schemaRefLibrary);
                // console.log(this.jsf.layoutRefLibrary);
                // console.log(this.jsf.templateRefLibrary);
                // console.log(this.jsf.dataMap);
                // console.log(this.jsf.arrayMap);
                // console.log(this.jsf.schemaRecursiveRefMap);
                // console.log(this.jsf.dataRecursiveRefMap);
            }
            else {
                // TODO: Display error message
            }
        }
    };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.ngDoCheck = function () {
        if (this.debug || this.jsf.globalOptions.debug) {
            var /** @type {?} */ vars = [];
            // vars.push(this.jsf.schema);
            // vars.push(this.jsf.layout);
            // vars.push(this.jsf.initialValues);
            // vars.push(this.jsf.formGroup.value);
            // vars.push(this.jsf.formGroupTemplate);
            // vars.push(this.jsf.formGroup);
            // vars.push(this.jsf.schemaRefLibrary);
            // vars.push(this.jsf.layoutRefLibrary);
            // vars.push(this.jsf.templateRefLibrary);
            // vars.push(this.jsf.dataMap);
            // vars.push(this.jsf.arrayMap);
            // vars.push(this.jsf.schemaRecursiveRefMap);
            // vars.push(this.jsf.dataRecursiveRefMap);
            this.debugOutput = vars.map(function (v) { return JSON.stringify(v, null, 2); }).join('\n');
        }
    };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.submitForm = function () {
        this.onSubmit.emit(this.jsf.validData);
    };
    JsonSchemaFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'json-schema-form',
                    template: "\n    <div *ngFor=\"let stylesheet of stylesheets\">\n      <link rel=\"stylesheet\" [href]=\"stylesheet\">\n    </div>\n    <div *ngFor=\"let script of scripts\">\n      <script type=\"text/javascript\" [src]=\"script\"></script>\n    </div>\n    <form class=\"json-schema-form\" (ngSubmit)=\"submitForm()\">\n      <root-widget [formID]=\"formID\" [layout]=\"jsfObject.layout\" [data]=\"jsfObject.data\"></root-widget>\n    </form>\n    <div *ngIf=\"debug || jsfObject.globalOptions.debug\">\n      Debug output: <pre>{{debugOutput}}</pre>\n    </div>",
                    providers: [JsonSchemaFormService],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /**
     * @nocollapse
     */
    JsonSchemaFormComponent.ctorParameters = function () { return [
        { type: FrameworkLibraryService, },
        { type: WidgetLibraryService, },
        { type: JsonSchemaFormService, },
        { type: DomSanitizer, },
    ]; };
    JsonSchemaFormComponent.propDecorators = {
        'schema': [{ type: Input },],
        'layout': [{ type: Input },],
        'data': [{ type: Input },],
        'options': [{ type: Input },],
        'framework': [{ type: Input },],
        'widgets': [{ type: Input },],
        'form': [{ type: Input },],
        'model': [{ type: Input },],
        'JSONSchema': [{ type: Input },],
        'UISchema': [{ type: Input },],
        'formData': [{ type: Input },],
        'loadExternalAssets': [{ type: Input },],
        'debug': [{ type: Input },],
        'onChanges': [{ type: Output },],
        'onSubmit': [{ type: Output },],
        'isValid': [{ type: Output },],
        'validationErrors': [{ type: Output },],
        'formSchema': [{ type: Output },],
        'formLayout': [{ type: Output },],
    };
    return JsonSchemaFormComponent;
}());
export { JsonSchemaFormComponent };
function JsonSchemaFormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    JsonSchemaFormComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JsonSchemaFormComponent.ctorParameters;
    /** @type {?} */
    JsonSchemaFormComponent.propDecorators;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formID;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.debugOutput;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formValueSubscription;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.jsfObject;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.schema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.layout;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.data;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.options;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.framework;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.widgets;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.form;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.model;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.JSONSchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.UISchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formData;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.loadExternalAssets;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.debug;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onChanges;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onSubmit;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.isValid;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.validationErrors;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formSchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formLayout;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.frameworkLibrary;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.widgetLibrary;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.jsf;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.sanitizer;
}
//# sourceMappingURL=json-schema-form.component.js.map