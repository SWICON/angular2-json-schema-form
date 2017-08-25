import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var CheckboxComponent = (function () {
    /**
     * @param {?} jsf
     */
    function CheckboxComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.updateValue = function (event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    };
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        /**
         * @return {?}
         */
        get: function () {
            return this.jsf.getControlValue(this) === this.trueValue;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox-widget',
                    template: "\n    <label\n      [attr.for]=\"'control' + layoutNode?._id\"\n      [class]=\"options?.itemLabelHtmlClass\">\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [checked]=\"isChecked ? 'checked' : null\"\n        [class]=\"options?.fieldHtmlClass + (isChecked ?\n          (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n          (' ' + options?.style?.unselected))\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [value]=\"controlValue\"\n        type=\"checkbox\"\n        (change)=\"updateValue($event)\">\n      <span *ngIf=\"options?.title\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></span>\n    </label>",
                },] },
    ];
    /**
     * @nocollapse
     */
    CheckboxComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    CheckboxComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return CheckboxComponent;
}());
export { CheckboxComponent };
function CheckboxComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CheckboxComponent.ctorParameters;
    /** @type {?} */
    CheckboxComponent.propDecorators;
    /** @type {?} */
    CheckboxComponent.prototype.formControl;
    /** @type {?} */
    CheckboxComponent.prototype.controlName;
    /** @type {?} */
    CheckboxComponent.prototype.controlValue;
    /** @type {?} */
    CheckboxComponent.prototype.controlDisabled;
    /** @type {?} */
    CheckboxComponent.prototype.boundControl;
    /** @type {?} */
    CheckboxComponent.prototype.options;
    /** @type {?} */
    CheckboxComponent.prototype.trueValue;
    /** @type {?} */
    CheckboxComponent.prototype.falseValue;
    /** @type {?} */
    CheckboxComponent.prototype.formID;
    /** @type {?} */
    CheckboxComponent.prototype.layoutNode;
    /** @type {?} */
    CheckboxComponent.prototype.layoutIndex;
    /** @type {?} */
    CheckboxComponent.prototype.dataIndex;
    /** @type {?} */
    CheckboxComponent.prototype.jsf;
}
//# sourceMappingURL=checkbox.component.js.map