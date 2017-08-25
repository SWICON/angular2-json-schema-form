import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { inArray } from '../shared/index';
var NumberComponent = (function () {
    /**
     * @param {?} jsf
     */
    function NumberComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    /**
     * @return {?}
     */
    NumberComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberComponent.prototype.validateInput = function (event) {
        var /** @type {?} */ val = event.target.value;
        if (/^Digit\d$/.test(event.code)) {
            return true;
        }
        if (/^Numpad\d$/.test(event.code)) {
            return true;
        }
        if (/^Arrow/.test(event.code)) {
            return true;
        }
        if (inArray(event.code, ['Backspace', 'Delete', 'Enter', 'Escape',
            'NumpadEnter', 'PrintScreen', 'Tab'])) {
            return true;
        }
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return true;
        }
        if (this.allowDecimal && event.key === '.' && val.indexOf('.') === -1) {
            return true;
        }
        if (this.allowExponents) {
            var /** @type {?} */ hasExponent = /e/i.test(val);
            if (/^e$/i.test(event.key) && !hasExponent && val) {
                return true;
            }
            if (event.key === '-') {
                var /** @type {?} */ minusCount = (val.match(/\-/g) || []).length;
                if ((this.allowNegative || hasExponent) && !minusCount) {
                    return true;
                }
                if (this.allowNegative && hasExponent && minusCount === 1) {
                    return true;
                }
            }
        }
        else if (this.allowNegative && event.key === '-' && val.indexOf('-') === -1) {
            return true;
        }
        // TODO: Display feedback for rejected keystroke,
        // and clear feedback on next valid keystroke
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberComponent.prototype.validateNumber = function (event) {
        // TODO: This only works for input type=text - make it work for type=number
        var /** @type {?} */ val = event.target.value;
        if (!isNaN(val) || val === '' || val === '.' || val === '-' || val === '-.' ||
            (val.length > 1 && val.slice(-1).toLowerCase() === 'e') ||
            (val.length > 2 && val.slice(-2).toLowerCase() === 'e-')) {
            this.lastValidNumber = val;
        }
        else {
            // TODO: Display feedback for rejected key
            this.jsf.getControl(this).setValue(this.lastValidNumber);
        }
    };
    NumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'number-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [title]=\"lastValidNumber\"\n        [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\"\n        (keydown)=\"validateInput($event)\"\n        (keyup)=\"validateNumber($event)\">\n        {{layoutNode?.type === 'range' ? controlValue : ''}}\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    NumberComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    NumberComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return NumberComponent;
}());
export { NumberComponent };
function NumberComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NumberComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NumberComponent.ctorParameters;
    /** @type {?} */
    NumberComponent.propDecorators;
    /** @type {?} */
    NumberComponent.prototype.formControl;
    /** @type {?} */
    NumberComponent.prototype.controlName;
    /** @type {?} */
    NumberComponent.prototype.controlValue;
    /** @type {?} */
    NumberComponent.prototype.controlDisabled;
    /** @type {?} */
    NumberComponent.prototype.boundControl;
    /** @type {?} */
    NumberComponent.prototype.options;
    /** @type {?} */
    NumberComponent.prototype.allowNegative;
    /** @type {?} */
    NumberComponent.prototype.allowDecimal;
    /** @type {?} */
    NumberComponent.prototype.allowExponents;
    /** @type {?} */
    NumberComponent.prototype.lastValidNumber;
    /** @type {?} */
    NumberComponent.prototype.formID;
    /** @type {?} */
    NumberComponent.prototype.layoutNode;
    /** @type {?} */
    NumberComponent.prototype.layoutIndex;
    /** @type {?} */
    NumberComponent.prototype.dataIndex;
    /** @type {?} */
    NumberComponent.prototype.jsf;
}
//# sourceMappingURL=number.component.js.map