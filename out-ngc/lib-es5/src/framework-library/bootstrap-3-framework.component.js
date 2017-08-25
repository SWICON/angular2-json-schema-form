import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash/index';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { addClasses, inArray, JsonPointer, toTitleCase } from '../shared/index';
/**
 * Bootstrap 3 framework for Angular JSON Schema Form.
 */
var Bootstrap3FrameworkComponent = (function () {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    function Bootstrap3FrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.controlInitialized = false;
        this.formControl = null;
        this.debugOutput = '';
        this.debug = '';
    }
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.ngOnInit = function () {
        this.initializeControl();
    };
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.ngOnChanges = function () {
        this.updateArrayItems();
        if (!this.controlInitialized) {
            this.initializeControl();
        }
    };
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.initializeControl = function () {
        var _this = this;
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = Object.assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.layoutPointer = this.jsf.getLayoutPointer(this);
            this.formControl = this.jsf.getControl(this);
            this.updateArrayItems();
            this.options.isInputWidget = inArray(this.layoutNode.type, [
                'button', 'checkbox', 'checkboxes-inline', 'checkboxes', 'color',
                'date', 'datetime-local', 'datetime', 'email', 'file', 'hidden',
                'image', 'integer', 'month', 'number', 'password', 'radio',
                'radiobuttons', 'radios-inline', 'radios', 'range', 'reset', 'search',
                'select', 'submit', 'tel', 'text', 'textarea', 'time', 'url', 'week'
            ]);
            this.options.title = this.setTitle();
            this.options.htmlClass =
                addClasses(this.options.htmlClass, 'schema-form-' + this.layoutNode.type);
            if (this.layoutNode.type === 'array') {
                this.options.htmlClass =
                    addClasses(this.options.htmlClass, 'list-group');
            }
            else if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
                this.options.htmlClass =
                    addClasses(this.options.htmlClass, 'list-group-item');
            }
            else {
                this.options.htmlClass =
                    addClasses(this.options.htmlClass, 'form-group');
            }
            this.widgetOptions.htmlClass = '';
            this.options.labelHtmlClass =
                addClasses(this.options.labelHtmlClass, 'control-label');
            this.widgetOptions.activeClass =
                addClasses(this.widgetOptions.activeClass, 'active');
            this.options.fieldAddonLeft =
                this.options.fieldAddonLeft || this.options.prepend;
            this.options.fieldAddonRight =
                this.options.fieldAddonRight || this.options.append;
            // Set miscelaneous styles and settings for each control type
            switch (this.layoutNode.type) {
                // Checkbox controls
                case 'checkbox':
                case 'checkboxes':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    break;
                case 'checkboxes-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'checkbox-inline');
                    break;
                // Radio controls
                case 'radio':
                case 'radios':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    break;
                case 'radios-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'radio-inline');
                    break;
                // Button sets - checkboxbuttons and radiobuttons
                case 'checkboxbuttons':
                case 'radiobuttons':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'btn-group');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'btn');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, this.options.style || 'btn-default');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'sr-only');
                    break;
                // Single button controls
                case 'button':
                case 'submit':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-info');
                    break;
                // Containers - arrays and fieldsets
                case 'array':
                case 'fieldset':
                case 'section':
                case 'conditional':
                case 'advancedfieldset':
                case 'authfieldset':
                case 'selectfieldset':
                case 'optionfieldset':
                    this.options.messageLocation = 'top';
                    if (this.options.title && this.options.required &&
                        this.options.title.indexOf('*') === -1) {
                        this.options.title += ' <strong class="text-danger">*</strong>';
                    }
                    break;
                case 'tabarray':
                case 'tabs':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'tab-content');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'tab-pane');
                    this.widgetOptions.labelHtmlClass = addClasses(this.widgetOptions.labelHtmlClass, 'nav nav-tabs');
                    break;
                // 'Add' buttons - references
                case '$ref':
                    this.widgetOptions.fieldHtmlClass =
                        addClasses(this.widgetOptions.fieldHtmlClass, 'btn pull-right');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-default');
                    this.options.icon = 'glyphicon glyphicon-plus';
                    break;
                // Default - including regular inputs
                default:
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'form-control');
            }
            if (this.formControl) {
                this.updateHelpBlock(this.formControl.status);
                this.formControl.statusChanges.subscribe(function (value) { return _this.updateHelpBlock(value); });
                if (this.options.debug) {
                    var /** @type {?} */ vars = [];
                    // vars.push(this.jsf.formGroup.value[this.options.name]);
                    // vars.push(this.jsf.formGroup.controls[this.options.name]['errors']);
                    this.debugOutput = _.map(vars, function (thisVar) { return JSON.stringify(thisVar, null, 2); }).join('\n');
                }
            }
            this.controlInitialized = true;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.updateHelpBlock = function (value) {
        var _this = this;
        this.options.helpBlock = this.options.description || this.options.help || false;
        if (this.options.enableErrorState && value === 'INVALID' && this.formControl.errors &&
            (this.formControl.dirty || this.options.feedbackOnRender)) {
            this.options.helpBlock = Object.keys(this.formControl.errors).map(function (error) { return [error, Object.keys(_this.formControl.errors[error]).map(function (errorParameter) { return errorParameter + ': ' +
                    _this.formControl.errors[error][errorParameter]; }).join(', ')].filter(function (e) { return e; }).join(' - '); }).join('<br>');
        }
    };
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.updateArrayItems = function () {
        if (this.layoutNode.arrayItem && this.options.removable &&
            this.dataIndex && this.dataIndex.length) {
            var /** @type {?} */ arrayIndex = this.dataIndex[this.dataIndex.length - 1];
            var /** @type {?} */ parentArray = JsonPointer.get(this.jsf.layout, this.layoutPointer, 0, -2);
            if (parentArray && parentArray.items && parentArray.items.length >= 2) {
                var /** @type {?} */ minItems = parentArray.minItems || 0;
                var /** @type {?} */ lastArrayItem = parentArray.items.length - 2;
                var /** @type {?} */ tupleItems = parentArray.tupleItems;
                if (arrayIndex >= minItems && this.options.type !== '$ref' &&
                    (arrayIndex >= tupleItems || arrayIndex === lastArrayItem)) {
                    this.options.removable = true;
                }
            }
        }
    };
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.setTitle = function () {
        switch (this.layoutNode.type) {
            case 'button':
            case 'checkbox':
            case 'help':
            case 'msg':
            case 'message':
            case 'submit':
            case 'tabarray':
            case '$ref':
                return null;
            case 'advancedfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Advanced options';
                return null;
            case 'authfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Authentication settings';
                return null;
            default:
                var /** @type {?} */ thisTitle = this.options.title || (isNaN(this.layoutNode.name) && this.layoutNode.name !== '-' ?
                    toTitleCase(this.layoutNode.name) : null);
                this.widgetOptions.title = null;
                if (!thisTitle) {
                    return null;
                }
                if (thisTitle.indexOf('{') === -1 || !this.formControl || !this.dataIndex) {
                    return thisTitle;
                }
                return this.jsf.parseText(thisTitle, this.jsf.getControlValue(this), this.jsf.getControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
        }
    };
    /**
     * @return {?}
     */
    Bootstrap3FrameworkComponent.prototype.removeItem = function () {
        this.jsf.removeItem(this);
    };
    Bootstrap3FrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bootstrap-3-framework',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\"\n      [class.has-feedback]=\"options?.feedback && options?.isInputWidget &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n      [class.has-error]=\"options?.enableErrorState && formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n      [class.has-success]=\"options?.enableSuccessState && !formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\">\n\n      <button *ngIf=\"layoutNode?.arrayItem && options?.removable\"\n        class=\"close pull-right\"\n        style=\"position: relative; z-index: 20;\"\n        type=\"button\"\n        (click)=\"removeItem()\">\n        <span aria-hidden=\"true\">&times;</span>\n        <span class=\"sr-only\">Close</span>\n      </button>\n      <div *ngIf=\"options?.messageLocation === 'top'\">\n          <p *ngIf=\"options?.helpBlock\"\n          class=\"help-block\"\n          [innerHTML]=\"options?.helpBlock\"></p>\n      </div>\n\n      <label *ngIf=\"options?.title && layoutNode?.type !== 'tab'\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [class.sr-only]=\"options?.notitle\"\n        [innerHTML]=\"options?.title\"></label>\n      <strong *ngIf=\"options?.title && !options?.notitle && options?.required\"\n        class=\"text-danger\">*</strong>\n      <p *ngIf=\"layoutNode?.type === 'submit' && jsf?.globalOptions?.fieldsRequired\">\n        <strong class=\"text-danger\">*</strong> = required fields\n      </p>\n      <div [class.input-group]=\"options?.fieldAddonLeft || options?.fieldAddonRight\">\n        <span *ngIf=\"options?.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          [innerHTML]=\"options?.fieldAddonLeft\"></span>\n\n        <select-widget-widget\n          [formID]=\"formID\"\n          [layoutNode]=\"widgetLayoutNode\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"></select-widget-widget>\n\n        <span *ngIf=\"options?.fieldAddonRight\"\n          class=\"input-group-addon\"\n          [innerHTML]=\"options?.fieldAddonRight\"></span>\n      </div>\n\n      <span *ngIf=\"options?.feedback && options?.isInputWidget &&\n          !options?.fieldAddonRight && !layoutNode.arrayItem &&\n          (formControl?.dirty || options?.feedbackOnRender)\"\n        [class.glyphicon-ok]=\"options?.enableSuccessState && !formControl?.errors\"\n        [class.glyphicon-remove]=\"options?.enableErrorState && formControl?.errors\"\n        aria-hidden=\"true\"\n        class=\"form-control-feedback glyphicon\"></span>\n      <div *ngIf=\"options?.messageLocation !== 'top'\">\n        <p *ngIf=\"options?.helpBlock\"\n          class=\"help-block\"\n          [innerHTML]=\"options?.helpBlock\"></p>\n      </div>\n    </div>\n\n    <div *ngIf=\"debug && debugOutput\">debug: <pre>{{debugOutput}}</pre></div>\n  ",
                    styles: ["\n    :host /deep/ .list-group-item .form-control-feedback { top: 40; }\n    :host /deep/ .checkbox,\n    :host /deep/ .radio { margin-top: 0; margin-bottom: 0; }\n    :host /deep/ .checkbox-inline,\n    :host /deep/ .checkbox-inline + .checkbox-inline,\n    :host /deep/ .checkbox-inline + .radio-inline,\n    :host /deep/ .radio-inline,\n    :host /deep/ .radio-inline + .radio-inline,\n    :host /deep/ .radio-inline + .checkbox-inline { margin-left: 0; margin-right: 10px; }\n    :host /deep/ .checkbox-inline:last-child,\n    :host /deep/ .radio-inline:last-child { margin-right: 0; }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    Bootstrap3FrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: JsonSchemaFormService, },
    ]; };
    Bootstrap3FrameworkComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return Bootstrap3FrameworkComponent;
}());
export { Bootstrap3FrameworkComponent };
function Bootstrap3FrameworkComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3FrameworkComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Bootstrap3FrameworkComponent.ctorParameters;
    /** @type {?} */
    Bootstrap3FrameworkComponent.propDecorators;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.controlInitialized;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.widgetOptions;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.layoutPointer;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.widgetLayoutNode;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.options;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.formControl;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.debugOutput;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.debug;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.formID;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.jsf;
}
//# sourceMappingURL=bootstrap-3-framework.component.js.map