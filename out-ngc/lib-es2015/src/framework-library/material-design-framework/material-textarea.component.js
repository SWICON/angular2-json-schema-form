import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialTextareaComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
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
MaterialTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-textarea-widget',
                template: `
    <md-input-container [style.width]="'100%'">
      <textarea mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [required]="options?.required"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.title"
        [readonly]="options?.readonly ? 'readonly' : null"
        [style.width]="'100%'"
        [value]="controlValue"
        (input)="updateValue($event)"></textarea>
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
      <md-hint *ngIf="!options?.description && options?.placeholder && !formControl?.dirty"
        align="end">{{options?.placeholder}}</md-hint>
    </md-input-container>`,
                styles: [`md-input-container { margin-top: 6px; }`],
            },] },
];
/**
 * @nocollapse
 */
MaterialTextareaComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialTextareaComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialTextareaComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialTextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialTextareaComponent.ctorParameters;
    /** @type {?} */
    MaterialTextareaComponent.propDecorators;
    /** @type {?} */
    MaterialTextareaComponent.prototype.formControl;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlName;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlValue;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialTextareaComponent.prototype.boundControl;
    /** @type {?} */
    MaterialTextareaComponent.prototype.options;
    /** @type {?} */
    MaterialTextareaComponent.prototype.formID;
    /** @type {?} */
    MaterialTextareaComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialTextareaComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialTextareaComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialTextareaComponent.prototype.jsf;
}
//# sourceMappingURL=material-textarea.component.js.map