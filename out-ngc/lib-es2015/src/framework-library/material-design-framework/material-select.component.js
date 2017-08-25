import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
export class MaterialSelectComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required);
        this.jsf.initializeControl(this);
    }
    /**
     * @return {?}
     */
    updateValue() {
        this.jsf.updateValue(this, this.controlValue === '' ? null : this.controlValue);
    }
}
MaterialSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-select-widget',
                template: `
    <section [style.width]="'100%'" [class]="options?.htmlClass || null">
      <md-select #inputControl
        [(ngModel)]="controlValue"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.name]="controlName"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
        [id]="'control' + layoutNode?._id"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.margin-top]="'.9em'"
        [style.width]="'100%'"
        (onClose)="updateValue()">
        <md-option *ngFor="let selectItem of selectList"
          [value]="selectItem.value"
          [attr.selected]="selectItem.value === controlValue">{{selectItem.name}}</md-option>
      </md-select>
    </section>`,
            },] },
];
/**
 * @nocollapse
 */
MaterialSelectComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialSelectComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialSelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialSelectComponent.ctorParameters;
    /** @type {?} */
    MaterialSelectComponent.propDecorators;
    /** @type {?} */
    MaterialSelectComponent.prototype.formControl;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlName;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlValue;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialSelectComponent.prototype.boundControl;
    /** @type {?} */
    MaterialSelectComponent.prototype.options;
    /** @type {?} */
    MaterialSelectComponent.prototype.selectList;
    /** @type {?} */
    MaterialSelectComponent.prototype.formID;
    /** @type {?} */
    MaterialSelectComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialSelectComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialSelectComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialSelectComponent.prototype.jsf;
}
//# sourceMappingURL=material-select.component.js.map