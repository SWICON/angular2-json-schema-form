import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class TabsComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    select(index) {
        if (this.layoutNode.items[index].type === '$ref') {
            this.itemCount = this.layoutNode.items.length;
            this.jsf.addItem({
                formID: this.formID,
                layoutNode: this.layoutNode.items[index],
                layoutIndex: this.layoutIndex.concat(index),
                dataIndex: this.dataIndex.concat(index)
            });
            this.updateControl();
        }
        ;
        this.selectedItem = index;
    }
    /**
     * @return {?}
     */
    updateControl() {
        const /** @type {?} */ lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000000)) {
            this.showAddTab = false;
        }
    }
    /**
     * @param {?=} item
     * @param {?=} index
     * @return {?}
     */
    setTitle(item = null, index = null) {
        return this.jsf.setTitle(this, item, index);
    }
}
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'tabs-widget',
                template: `
    <ul
      [class]="options?.labelHtmlClass">
      <li *ngFor="let item of layoutNode?.items; let i = index"
        [class]="options?.itemLabelHtmlClass + (selectedItem === i ?
          (' ' + options?.activeClass + ' ' + options?.style?.selected) :
          (' ' + options?.style?.unselected))"
        role="presentation"
        data-tabs>
        <a *ngIf="showAddTab || item.type !== '$ref'"
          [innerHTML]="setTitle(item, i)"
          (click)="select(i)"></a>
      </li>
    </ul>

    <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
      [class]="options?.htmlClass">

      <select-framework-widget *ngIf="selectedItem === i"
        [class]="options?.fieldHtmlClass + ' ' + options?.activeClass + ' ' + options?.style?.selected"
        [dataIndex]="layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"></select-framework-widget>

    </div>`,
                styles: [`a { cursor: pointer; }`],
            },] },
];
/**
 * @nocollapse
 */
TabsComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
TabsComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function TabsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TabsComponent.ctorParameters;
    /** @type {?} */
    TabsComponent.propDecorators;
    /** @type {?} */
    TabsComponent.prototype.options;
    /** @type {?} */
    TabsComponent.prototype.itemCount;
    /** @type {?} */
    TabsComponent.prototype.selectedItem;
    /** @type {?} */
    TabsComponent.prototype.showAddTab;
    /** @type {?} */
    TabsComponent.prototype.formID;
    /** @type {?} */
    TabsComponent.prototype.layoutNode;
    /** @type {?} */
    TabsComponent.prototype.layoutIndex;
    /** @type {?} */
    TabsComponent.prototype.dataIndex;
    /** @type {?} */
    TabsComponent.prototype.jsf;
}
//# sourceMappingURL=tabs.component.js.map