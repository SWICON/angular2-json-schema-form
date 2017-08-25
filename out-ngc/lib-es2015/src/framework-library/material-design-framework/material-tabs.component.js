import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialTabsComponent {
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
MaterialTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-tabs-widget',
                template: `
    <nav md-tab-nav-bar
      [attr.aria-label]="options?.label || options?.title"
      [style.width]="'100%'">
        <a *ngFor="let item of layoutNode?.items; let i = index"
          md-tab-link
          [active]="selectedItem === i"
          (click)="select(i)">
          <span *ngIf="showAddTab || item.type !== '$ref'"
            [innerHTML]="setTitle(item, i)"></span>
        </a>
    </nav>

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
MaterialTabsComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialTabsComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialTabsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialTabsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialTabsComponent.ctorParameters;
    /** @type {?} */
    MaterialTabsComponent.propDecorators;
    /** @type {?} */
    MaterialTabsComponent.prototype.options;
    /** @type {?} */
    MaterialTabsComponent.prototype.itemCount;
    /** @type {?} */
    MaterialTabsComponent.prototype.selectedItem;
    /** @type {?} */
    MaterialTabsComponent.prototype.showAddTab;
    /** @type {?} */
    MaterialTabsComponent.prototype.formID;
    /** @type {?} */
    MaterialTabsComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialTabsComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialTabsComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialTabsComponent.prototype.jsf;
}
//# sourceMappingURL=material-tabs.component.js.map