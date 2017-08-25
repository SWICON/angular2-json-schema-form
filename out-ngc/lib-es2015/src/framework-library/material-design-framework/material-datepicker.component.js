import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialDatepickerComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
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
    updateSelectedDate(event) {
        this.controlValue = [
            event.getMonth() + 1,
            event.getDate(),
            event.getFullYear()
        ].join('-');
        this.jsf.updateValue(this, this.controlValue);
    }
}
MaterialDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-datepicker-widget',
                template: `
    <md-input-container [style.width]="'100%'">
      <input mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [mdDatepicker]="picker"
        [min]="options?.minimum"
        [name]="controlName"
        [placeholder]="options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [value]="controlValue"
        (input)="updateValue($event)">
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
      <md-hint *ngIf="!options?.description && options?.placeholder && !formControl?.dirty"
        align="end">{{options?.placeholder}}</md-hint>
      <button mdSuffix [mdDatepickerToggle]="picker"></button>
    </md-input-container>
    <md-datepicker #picker
      (selectedChanged)="updateSelectedDate($event)"></md-datepicker>`,
                styles: [`md-input-container { margin-top: 6px; }`],
            },] },
];
/**
 * @nocollapse
 */
MaterialDatepickerComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialDatepickerComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialDatepickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialDatepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialDatepickerComponent.ctorParameters;
    /** @type {?} */
    MaterialDatepickerComponent.propDecorators;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.formControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlName;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlValue;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.boundControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.options;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.formID;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.jsf;
}
//# sourceMappingURL=material-datepicker.component.js.map