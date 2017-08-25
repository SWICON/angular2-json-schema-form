import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialInputComponent {
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
}
MaterialInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-input-widget',
                template: `
    <md-input-container
      [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
      [style.margin-top]="'-2px'"
      [style.width]="'100%'">
      <input mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)">
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
    </md-input-container>`,
            },] },
];
/**
 * @nocollapse
 */
MaterialInputComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialInputComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialInputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialInputComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialInputComponent.ctorParameters;
    /** @type {?} */
    MaterialInputComponent.propDecorators;
    /** @type {?} */
    MaterialInputComponent.prototype.formControl;
    /** @type {?} */
    MaterialInputComponent.prototype.controlName;
    /** @type {?} */
    MaterialInputComponent.prototype.controlValue;
    /** @type {?} */
    MaterialInputComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialInputComponent.prototype.boundControl;
    /** @type {?} */
    MaterialInputComponent.prototype.options;
    /** @type {?} */
    MaterialInputComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialInputComponent.prototype.formID;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.jsf;
}
//# sourceMappingURL=material-input.component.js.map