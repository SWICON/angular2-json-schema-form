import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
export class CheckboxesComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.boundControl = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            const /** @type {?} */ formArray = this.jsf.getControl(this);
            for (let /** @type {?} */ checkboxItem of this.checkboxList) {
                checkboxItem.checked = formArray.value.indexOf(checkboxItem.value) !== -1;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        for (let /** @type {?} */ checkboxItem of this.checkboxList) {
            if (event.target.value === checkboxItem.value) {
                checkboxItem.checked = event.target.checked;
            }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
}
CheckboxesComponent.decorators = [
    { type: Component, args: [{
                selector: 'checkboxes-widget',
                template: `
    <label *ngIf="options?.title"
      [class]="options?.labelHtmlClass"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>

    <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->
    <div *ngIf="layoutOrientation === 'horizontal'" [class]="options?.htmlClass">
      <label *ngFor="let checkboxItem of checkboxList"
        [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
        [class]="options?.itemLabelHtmlClass + (checkboxItem.checked ?
          (' ' + options?.activeClass + ' ' + options?.style?.selected) :
          (' ' + options?.style?.unselected))">
        <input type="checkbox"
          [attr.required]="options?.required"
          [checked]="checkboxItem.checked"
          [class]="options?.fieldHtmlClass"
          [disabled]="controlDisabled"
          [id]="'control' + layoutNode?._id + '/' + checkboxItem.value"
          [name]="formControlName"
          [readonly]="options?.readonly ? 'readonly' : null"
          [value]="checkboxItem.value"
          (change)="updateValue($event)">
        <span [innerHTML]="checkboxItem.name"></span>
      </label>
    </div>

    <!-- 'vertical' = regular checkboxes -->
    <div *ngIf="layoutOrientation === 'vertical'">
      <div *ngFor="let checkboxItem of checkboxList" [class]="options?.htmlClass">
        <label
          [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
          [class]="options?.itemLabelHtmlClass + (checkboxItem.checked ?
            (' ' + options?.activeClass + ' ' + options?.style?.selected) :
            (' ' + options?.style?.unselected))">
          <input type="checkbox"
            [attr.required]="options?.required"
            [checked]="checkboxItem.checked"
            [class]="options?.fieldHtmlClass"
            [disabled]="controlDisabled"
            [id]="options?.name + '/' + checkboxItem.value"
            [name]="options?.name"
            [readonly]="options?.readonly ? 'readonly' : null"
            [value]="checkboxItem.value"
            (change)="updateValue($event)">
          <span [innerHTML]="checkboxItem?.name"></span>
        </label>
      </div>
    </div>`,
            },] },
];
/**
 * @nocollapse
 */
CheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
CheckboxesComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function CheckboxesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CheckboxesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CheckboxesComponent.ctorParameters;
    /** @type {?} */
    CheckboxesComponent.propDecorators;
    /** @type {?} */
    CheckboxesComponent.prototype.formControl;
    /** @type {?} */
    CheckboxesComponent.prototype.controlName;
    /** @type {?} */
    CheckboxesComponent.prototype.controlValue;
    /** @type {?} */
    CheckboxesComponent.prototype.boundControl;
    /** @type {?} */
    CheckboxesComponent.prototype.options;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutOrientation;
    /** @type {?} */
    CheckboxesComponent.prototype.formArray;
    /** @type {?} */
    CheckboxesComponent.prototype.checkboxList;
    /** @type {?} */
    CheckboxesComponent.prototype.formID;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutNode;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutIndex;
    /** @type {?} */
    CheckboxesComponent.prototype.dataIndex;
    /** @type {?} */
    CheckboxesComponent.prototype.jsf;
}
//# sourceMappingURL=checkboxes.component.js.map