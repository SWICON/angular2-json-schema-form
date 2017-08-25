import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { inArray } from '../../shared/index';
export class MaterialNumberComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
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
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer')
            this.allowDecimal = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    validateInput(event) {
        const /** @type {?} */ val = event.target.value;
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
            const /** @type {?} */ hasExponent = /e/i.test(val);
            if (/^e$/i.test(event.key) && !hasExponent && val)
                return true;
            if (event.key === '-') {
                const /** @type {?} */ minusCount = (val.match(/\-/g) || []).length;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    validateNumber(event) {
        // TODO: This only works for input type=text - make it work for type=number
        const /** @type {?} */ val = event.target.value;
        if (!isNaN(val) || val === '' || val === '.' || val === '-' || val === '-.' ||
            (val.length > 1 && val.slice(-1).toLowerCase() === 'e') ||
            (val.length > 2 && val.slice(-2).toLowerCase() === 'e-')) {
            this.lastValidNumber = val;
        }
        else {
            // TODO: Display feedback for rejected key
            this.jsf.getControl(this).setValue(this.lastValidNumber);
        }
    }
}
MaterialNumberComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-number-widget',
                template: `
    <md-input-container [style.width]="'100%'">
      <input mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.max]="options?.maximum"
        [attr.min]="options?.minimum"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.step]="options?.multipleOf || options?.step || 'any'"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="'number'"
        [value]="controlValue"
        (input)="updateValue($event)"
        (keydown)="validateInput($event)"
        (keyup)="validateNumber($event)">
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
      <md-hint *ngIf="!options?.description && options?.placeholder && !formControl?.dirty"
        align="end">{{options?.placeholder}}</md-hint>
      {{layoutNode?.type === 'range' ? controlValue : ''}}
    </md-input-container>`,
                styles: [`md-input-container { margin-top: 6px; }`],
            },] },
];
/**
 * @nocollapse
 */
MaterialNumberComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialNumberComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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