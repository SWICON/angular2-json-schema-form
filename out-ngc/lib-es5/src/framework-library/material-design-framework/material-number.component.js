import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { inArray } from '../../shared/index';
var MaterialNumberComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialNumberComponent(jsf) {
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
    MaterialNumberComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer')
            this.allowDecimal = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialNumberComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialNumberComponent.prototype.validateInput = function (event) {
        var /** @type {?} */ val = event.target.value;
        if (/^Digit\d$/.test(event.code))
            return true;
        if (/^Numpad\d$/.test(event.code))
            return true;
        if (/^Arrow/.test(event.code))
            return true;
        if (inArray(event.code, ['Backspace', 'Delete', 'Enter', 'Escape',
            'NumpadEnter', 'PrintScreen', 'Tab']))
            return true;
        if (event.ctrlKey || event.altKey || event.metaKey)
            return true;
        if (this.allowDecimal && event.key === '.' &&
            val.indexOf('.') === -1)
            return true;
        if (this.allowExponents) {
            var /** @type {?} */ hasExponent = /e/i.test(val);
            if (/^e$/i.test(event.key) && !hasExponent && val)
                return true;
            if (event.key === '-') {
                var /** @type {?} */ minusCount = (val.match(/\-/g) || []).length;
                if ((this.allowNegative || hasExponent) && !minusCount)
                    return true;
                if (this.allowNegative && hasExponent && minusCount === 1)
                    return true;
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
    MaterialNumberComponent.prototype.validateNumber = function (event) {
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
    MaterialNumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-number-widget',
                    template: "\n    <md-input-container [style.width]=\"'100%'\">\n      <input mdInput #inputControl\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [placeholder]=\"options?.title\"\n        [required]=\"options?.required\"\n        [style.width]=\"'100%'\"\n        [type]=\"'number'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\"\n        (keydown)=\"validateInput($event)\"\n        (keyup)=\"validateNumber($event)\">\n      <span *ngIf=\"options?.fieldAddonLeft\"\n        md-prefix>{{options?.fieldAddonLeft}}</span>\n      <span *ngIf=\"options?.fieldAddonRight\"\n        md-suffix>{{options?.fieldAddonRight}}</span>\n      <md-hint *ngIf=\"options?.description && !options?.placeholder && formControl?.dirty\"\n        align=\"end\">{{options?.description}}</md-hint>\n      <md-hint *ngIf=\"!options?.description && options?.placeholder && !formControl?.dirty\"\n        align=\"end\">{{options?.placeholder}}</md-hint>\n      {{layoutNode?.type === 'range' ? controlValue : ''}}\n    </md-input-container>",
                    styles: ["md-input-container { margin-top: 6px; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialNumberComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialNumberComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialNumberComponent;
}());
export { MaterialNumberComponent };
function MaterialNumberComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialNumberComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialNumberComponent.ctorParameters;
    /** @type {?} */
    MaterialNumberComponent.propDecorators;
    /** @type {?} */
    MaterialNumberComponent.prototype.formControl;
    /** @type {?} */
    MaterialNumberComponent.prototype.controlName;
    /** @type {?} */
    MaterialNumberComponent.prototype.controlValue;
    /** @type {?} */
    MaterialNumberComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialNumberComponent.prototype.boundControl;
    /** @type {?} */
    MaterialNumberComponent.prototype.options;
    /** @type {?} */
    MaterialNumberComponent.prototype.allowNegative;
    /** @type {?} */
    MaterialNumberComponent.prototype.allowDecimal;
    /** @type {?} */
    MaterialNumberComponent.prototype.allowExponents;
    /** @type {?} */
    MaterialNumberComponent.prototype.lastValidNumber;
    /** @type {?} */
    MaterialNumberComponent.prototype.formID;
    /** @type {?} */
    MaterialNumberComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialNumberComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialNumberComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialNumberComponent.prototype.jsf;
}
//# sourceMappingURL=material-number.component.js.map