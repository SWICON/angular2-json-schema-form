import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialCheckboxComponent {
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
            this.controlValue = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.jsf.getControlValue(this) === this.trueValue;
    }
}
MaterialCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-checkbox-widget',
                template: `
    <md-checkbox
      align="left"
      [color]="options?.color || 'primary'"
      [disabled]="controlDisabled || options?.readonly"
      [id]="'control' + layoutNode?._id"
      [name]="controlName"
      [checked]="isChecked"
      (change)="updateValue($event)">
      <span *ngIf="options?.title"
        class="checkbox-name"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></span>
    </md-checkbox>`,
                styles: [` .checkbox-name { white-space: nowrap; } `],
            },] },
];
/**
 * @nocollapse
 */
MaterialCheckboxComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialCheckboxComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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