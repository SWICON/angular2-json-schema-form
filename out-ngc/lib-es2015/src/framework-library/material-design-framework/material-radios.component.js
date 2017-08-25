import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
export class MaterialRadiosComponent {
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
MaterialRadiosComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-radios-widget',
                template: `
    <div *ngIf="options?.title">
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
    </div>
    <md-radio-group
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [attr.readonly]="options?.readonly ? 'readonly' : null"
      [attr.required]="options?.required"
      [style.flex-direction]="flexDirection"
      [disabled]="controlDisabled"
      [name]="controlName"
      [value]="controlValue">
      <div *ngFor="let radioItem of radiosList">
        <md-radio-button
          [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
          [value]="radioItem?.value"
          (click)="updateValue(radioItem?.value)">
          <span [innerHTML]="radioItem?.name"></span>
        </md-radio-button>
      </div>
    </md-radio-group>`,
                styles: [`
    md-radio-group { display: inline-flex; }
    md-radio-button { margin: 0 5px; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MaterialRadiosComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialRadiosComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialRadiosComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialRadiosComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialRadiosComponent.ctorParameters;
    /** @type {?} */
    MaterialRadiosComponent.propDecorators;
    /** @type {?} */
    MaterialRadiosComponent.prototype.formControl;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlName;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlValue;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialRadiosComponent.prototype.boundControl;
    /** @type {?} */
    MaterialRadiosComponent.prototype.options;
    /** @type {?} */
    MaterialRadiosComponent.prototype.flexDirection;
    /** @type {?} */
    MaterialRadiosComponent.prototype.radiosList;
    /** @type {?} */
    MaterialRadiosComponent.prototype.formID;
    /** @type {?} */
    MaterialRadiosComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialRadiosComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialRadiosComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialRadiosComponent.prototype.jsf;
}
//# sourceMappingURL=material-radios.component.js.map