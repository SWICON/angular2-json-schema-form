import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash/index';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { toTitleCase } from '../../shared/index';
var MaterialDesignFrameworkComponent = (function () {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    function MaterialDesignFrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.controlInitialized = false;
        this.formControl = null;
    }
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.ngOnInit = function () {
        this.initializeControl();
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.ngOnChanges = function () {
        if (!this.controlInitialized)
            this.initializeControl();
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.initializeControl = function () {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = Object.assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.layoutPointer = this.jsf.getLayoutPointer(this);
            this.formControl = this.jsf.getControl(this);
            this.options.title = this.setTitle();
            if (this.options.minimum && this.options.maximum) {
                this.layoutNode.type = 'range';
            }
            // Set control type and associated settings
            switch (this.layoutNode.type) {
                case 'text':
                case 'email':
                case 'integer':
                case 'url':
                case 'datetime':
                case 'time':
                case 'number':
                case 'search':
                case 'date-time':
                case 'week':
                case 'updown':
                case 'tel':
                case 'alt-datetime':
                case 'month':
                case 'password':
                case 'datetime-local':
                    this.controlType = 'input';
                    if (this.layoutNode.type === 'integer') {
                        this.inputType = 'number';
                    }
                    else {
                        this.layoutNode.type =
                            this.layoutNode.type === 'updown' ? 'number' :
                                this.layoutNode.type === 'alt-date' ? 'date' :
                                    this.layoutNode.type === 'datetime' ? 'datetime-local' :
                                        this.layoutNode.type === 'date-time' ? 'datetime-local' :
                                            this.layoutNode.type === 'alt-datetime' ? 'datetime-local' :
                                                this.layoutNode.type;
                        this.inputType = this.layoutNode.type;
                    }
                    break;
                case 'date':
                case 'alt-date':
                    this.controlType = 'date';
                    if (this.layoutNode.type === 'alt-date') {
                        this.layoutNode.type = 'date';
                    }
                    break;
                case 'hidden':
                case 'color':
                case 'image':
                    this.controlType = 'none'; // TODO: add apropriate widgets for hidden, color, and image
                    break;
                case 'range':
                    this.controlType = 'slider';
                    break;
                case 'textarea':
                    this.controlType = 'textarea';
                    break;
                case 'file':
                    this.controlType = 'file';
                    break;
                case 'select':
                    this.controlType = 'select';
                    break;
                case 'checkbox':
                    this.controlType = 'checkbox';
                    break;
                case 'checkboxes':
                case 'checkboxes-inline':
                case 'checkboxbuttons':
                    this.controlType = 'checkboxes';
                    break;
                case 'radio':
                case 'radios':
                case 'radios-inline':
                    this.controlType = 'radios';
                    break;
                case 'radiobuttons':
                    this.controlType = 'buttonGroup';
                    // TODO: update buttonGroup to also handle checkboxbuttons
                    break;
                case 'reset':
                case 'submit':
                case 'button':
                    this.controlType = 'button';
                    break;
                case 'fieldset':
                case 'conditional':
                case 'actions':
                case 'array':
                case 'authfieldset':
                case 'optionfieldset':
                case 'tab':
                case 'selectfieldset':
                case 'advancedfieldset':
                case 'section':
                case 'wizard':
                    this.controlType = 'section';
                    break;
                case 'tabs':
                case 'tabarray':
                    this.controlType = 'tabs';
                    break;
                case 'help':
                case 'message':
                case 'msg':
                case 'html':
                    this.controlType = 'message';
                    break;
                case 'template':
                    this.controlType = 'template';
                    break;
                default:
                    this.controlType = this.layoutNode.type;
            }
            this.controlInitialized = true;
        }
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.setTitle = function () {
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
                if (!thisTitle)
                    return null;
                if (thisTitle.indexOf('{') === -1 || !this.formControl || !this.dataIndex) {
                    return thisTitle;
                }
                return this.jsf.parseText(thisTitle, this.jsf.getControlValue(this), this.jsf.getControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
        }
    };
    MaterialDesignFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-design-framework',
                    template: "\n    <select-widget-widget\n      [formID]=\"formID\"\n      [layoutNode]=\"layoutNode\"\n      [dataIndex]=\"dataIndex\"\n      [layoutIndex]=\"layoutIndex\"></select-widget-widget>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialDesignFrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: JsonSchemaFormService, },
    ]; };
    MaterialDesignFrameworkComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialDesignFrameworkComponent;
}());
export { MaterialDesignFrameworkComponent };
function MaterialDesignFrameworkComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialDesignFrameworkComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialDesignFrameworkComponent.ctorParameters;
    /** @type {?} */
    MaterialDesignFrameworkComponent.propDecorators;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.controlInitialized;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.controlType;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.inputType;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.options;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.widgetLayoutNode;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.widgetOptions;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.layoutPointer;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.formControl;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.formID;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.jsf;
}
//# sourceMappingURL=material-design-framework.component.js.map