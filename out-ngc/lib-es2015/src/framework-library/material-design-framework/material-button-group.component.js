import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
export class MaterialButtonGroupComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.flexDirection = 'column';
        this.radiosList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline') {
            this.flexDirection = 'row';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.jsf.updateValue(this, value);
    }
}
MaterialButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-button-group-widget',
                template: `
    <div *ngIf="options?.title">
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
    </div>
    <md-button-toggle-group
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.required]="options?.required"
      [disabled]="controlDisabled"
      [name]="controlName"
      [value]="controlValue">
      <div *ngFor="let radioItem of radiosList">
        <md-button-toggle
          [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
          [value]="radioItem?.value"
          (click)="updateValue(radioItem?.value)">
          <span [innerHTML]="radioItem?.name"></span>
        </md-button-toggle>
      </div>
    </md-button-toggle-group>`,
            },] },
];
/**
 * @nocollapse
 */
MaterialButtonGroupComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialButtonGroupComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialButtonGroupComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialButtonGroupComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialButtonGroupComponent.ctorParameters;
    /** @type {?} */
    MaterialButtonGroupComponent.propDecorators;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.formControl;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlName;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlValue;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.boundControl;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.options;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.flexDirection;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.radiosList;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.formID;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.jsf;
}
//# sourceMappingURL=material-button-group.component.js.map