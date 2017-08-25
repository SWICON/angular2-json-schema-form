import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialCheckboxComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialCheckboxComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    /**
     * @return {?}
     */
    MaterialCheckboxComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialCheckboxComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
    };
    Object.defineProperty(MaterialCheckboxComponent.prototype, "isChecked", {
        /**
         * @return {?}
         */
        get: function () {
            return this.jsf.getControlValue(this) === this.trueValue;
        },
        enumerable: true,
        configurable: true
    });
    MaterialCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-checkbox-widget',
                    template: "\n    <md-checkbox\n      align=\"left\"\n      [color]=\"options?.color || 'primary'\"\n      [disabled]=\"controlDisabled || options?.readonly\"\n      [id]=\"'control' + layoutNode?._id\"\n      [name]=\"controlName\"\n      [checked]=\"isChecked\"\n      (change)=\"updateValue($event)\">\n      <span *ngIf=\"options?.title\"\n        class=\"checkbox-name\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></span>\n    </md-checkbox>",
                    styles: [" .checkbox-name { white-space: nowrap; } "],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialCheckboxComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialCheckboxComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialCheckboxComponent;
}());
export { MaterialCheckboxComponent };
function MaterialCheckboxComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialCheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialCheckboxComponent.ctorParameters;
    /** @type {?} */
    MaterialCheckboxComponent.propDecorators;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.formControl;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.controlName;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.controlValue;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.boundControl;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.options;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.trueValue;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.falseValue;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.formID;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialCheckboxComponent.prototype.jsf;
}
//# sourceMappingURL=material-checkbox.component.js.map