import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
export class RadiosComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.layoutOrientation = 'vertical';
        this.radiosList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline' ||
            this.layoutNode.type === 'radiobuttons') {
            this.layoutOrientation = 'horizontal';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
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
RadiosComponent.decorators = [
    { type: Component, args: [{
                selector: 'radios-widget',
                template: `
    <label *ngIf="options?.title"
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.labelHtmlClass"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>
      <div [ngSwitch]="layoutOrientation">

        <!-- 'horizontal' = radios-inline or radiobuttons -->
        <div *ngSwitchCase="'horizontal'"
          [class]="options?.htmlClass">
          <label *ngFor="let radioItem of radiosList"
            [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
            [class]="options?.itemLabelHtmlClass +
              ((controlValue + '' === radioItem?.value + '') ?
              (' ' + options?.activeClass + ' ' + options?.style?.selected) :
              (' ' + options?.style?.unselected))">
            <input type="radio"
              [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
              [attr.readonly]="options?.readonly ? 'readonly' : null"
              [attr.required]="options?.required"
              [checked]="radioItem?.value === controlValue"
              [class]="options?.fieldHtmlClass"
              [disabled]="controlDisabled"
              [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [name]="controlName"
              [value]="radioItem?.value"
              (change)="updateValue($event)">
            <span [innerHTML]="radioItem?.name"></span>
          </label>
        </div>

        <!-- 'vertical' = regular radios -->
        <div *ngSwitchDefault>
          <div *ngFor="let radioItem of radiosList"
            [class]="options?.htmlClass">
            <label
              [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [class]="options?.itemLabelHtmlClass +
                ((controlValue + '' === radioItem?.value + '') ?
                (' ' + options?.activeClass + ' ' + options?.style?.selected) :
                (' ' + options?.style?.unselected))">
              <input type="radio"
                [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                [attr.readonly]="options?.readonly ? 'readonly' : null"
                [attr.required]="options?.required"
                [checked]="radioItem?.value === controlValue"
                [class]="options?.fieldHtmlClass"
                [disabled]="controlDisabled"
                [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
                [name]="controlName"
                [value]="radioItem?.value"
                (change)="updateValue($event)">
              <span [innerHTML]="radioItem?.name"></span>
            </label>
          </div>
        </div>

      </div>`,
            },] },
];
/**
 * @nocollapse
 */
RadiosComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
RadiosComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function RadiosComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RadiosComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RadiosComponent.ctorParameters;
    /** @type {?} */
    RadiosComponent.propDecorators;
    /** @type {?} */
    RadiosComponent.prototype.formControl;
    /** @type {?} */
    RadiosComponent.prototype.controlName;
    /** @type {?} */
    RadiosComponent.prototype.controlValue;
    /** @type {?} */
    RadiosComponent.prototype.controlDisabled;
    /** @type {?} */
    RadiosComponent.prototype.boundControl;
    /** @type {?} */
    RadiosComponent.prototype.options;
    /** @type {?} */
    RadiosComponent.prototype.layoutOrientation;
    /** @type {?} */
    RadiosComponent.prototype.radiosList;
    /** @type {?} */
    RadiosComponent.prototype.formID;
    /** @type {?} */
    RadiosComponent.prototype.layoutNode;
    /** @type {?} */
    RadiosComponent.prototype.layoutIndex;
    /** @type {?} */
    RadiosComponent.prototype.dataIndex;
    /** @type {?} */
    RadiosComponent.prototype.jsf;
}
//# sourceMappingURL=radios.component.js.map