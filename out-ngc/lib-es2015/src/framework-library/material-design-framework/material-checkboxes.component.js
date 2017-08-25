import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
export class MaterialCheckboxesComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
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
     * @return {?}
     */
    get allChecked() {
        return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
    }
    /**
     * @return {?}
     */
    get someChecked() {
        const /** @type {?} */ checkedItems = this.checkboxList.filter(t => t.checked).length;
        return checkedItems > 0 && checkedItems < this.checkboxList.length;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateAllValues(event) {
        this.checkboxList.forEach(t => t.checked = event.checked);
    }
}
MaterialCheckboxesComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-checkboxes-widget',
                template: `
    <md-checkbox type="checkbox"
      [color]="options?.color || 'primary'"
      [disabled]="controlDisabled || options?.readonly"
      [name]="options?.name"
      [checked]="allChecked"
      [indeterminate]="someChecked"
      (change)="updateAllValues($event)">
      <span class="checkbox-name" [innerHTML]="options?.name"></span>
    </md-checkbox>
    <label *ngIf="options?.title"
      [class]="options?.labelHtmlClass"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>
    <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
      <li *ngFor="let checkboxItem of checkboxList"
        [class]="options?.htmlClass">
        <md-checkbox type="checkbox"
          [(ngModel)]="checkboxItem.checked"
          [color]="options?.color || 'primary'"
          [disabled]="controlDisabled || options?.readonly"
          [name]="checkboxItem?.name"
          (change)="updateValue($event)">
          <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
        </md-checkbox>
      </li>
    </ul>`,
                styles: [`
    .checkbox-list { list-style-type: none; }
    .horizontal-list > li {
      display: inline-block;
      margin-right: 10px;
      zoom: 1;
    }
    .checkbox-name { white-space: nowrap; }
  `],
            },] },
];
/**
 * @nocollapse
 */
MaterialCheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialCheckboxesComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialCheckboxesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialCheckboxesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialCheckboxesComponent.ctorParameters;
    /** @type {?} */
    MaterialCheckboxesComponent.propDecorators;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlName;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlValue;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.boundControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.options;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.horizontalList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formArray;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.checkboxList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formID;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.jsf;
}
//# sourceMappingURL=material-checkboxes.component.js.map