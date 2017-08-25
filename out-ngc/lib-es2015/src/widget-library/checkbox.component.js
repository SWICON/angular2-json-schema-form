import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class CheckboxComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.jsf.getControlValue(this) === this.trueValue;
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'checkbox-widget',
                template: `
    <label
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.itemLabelHtmlClass">
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [checked]="isChecked ? 'checked' : null"
        [class]="options?.fieldHtmlClass + (isChecked ?
          (' ' + options?.activeClass + ' ' + options?.style?.selected) :
          (' ' + options?.style?.unselected))"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [value]="controlValue"
        type="checkbox"
        (change)="updateValue($event)">
      <span *ngIf="options?.title"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></span>
    </label>`,
            },] },
];
/**
 * @nocollapse
 */
CheckboxComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
CheckboxComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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