import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
export class SelectComponent {
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
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-widget',
                template: `
    <div
      [class]="options?.htmlClass">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <select
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        (input)="updateValue($event)">
        <option *ngFor="let selectItem of selectList"
           [value]="selectItem.value"
           [selected]="selectItem.value === controlValue">{{selectItem.name}}</option>
      </select>
    </div>`,
            },] },
];
/**
 * @nocollapse
 */
SelectComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
SelectComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SelectComponent.ctorParameters;
    /** @type {?} */
    SelectComponent.propDecorators;
    /** @type {?} */
    SelectComponent.prototype.formControl;
    /** @type {?} */
    SelectComponent.prototype.controlName;
    /** @type {?} */
    SelectComponent.prototype.controlValue;
    /** @type {?} */
    SelectComponent.prototype.controlDisabled;
    /** @type {?} */
    SelectComponent.prototype.boundControl;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.selectList;
    /** @type {?} */
    SelectComponent.prototype.formID;
    /** @type {?} */
    SelectComponent.prototype.layoutNode;
    /** @type {?} */
    SelectComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectComponent.prototype.dataIndex;
    /** @type {?} */
    SelectComponent.prototype.jsf;
}
//# sourceMappingURL=select.component.js.map