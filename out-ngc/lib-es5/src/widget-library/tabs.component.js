import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var TabsComponent = (function () {
    /**
     * @param {?} jsf
     */
    function TabsComponent(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    /**
     * @return {?}
     */
    TabsComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TabsComponent.prototype.select = function (index) {
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
    };
    /**
     * @return {?}
     */
    TabsComponent.prototype.updateControl = function () {
        var /** @type {?} */ lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000000)) {
            this.showAddTab = false;
        }
    };
    /**
     * @param {?=} item
     * @param {?=} index
     * @return {?}
     */
    TabsComponent.prototype.setTitle = function (item, index) {
        if (item === void 0) { item = null; }
        if (index === void 0) { index = null; }
        return this.jsf.setTitle(this, item, index);
    };
    TabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tabs-widget',
                    template: "\n    <ul\n      [class]=\"options?.labelHtmlClass\">\n      <li *ngFor=\"let item of layoutNode?.items; let i = index\"\n        [class]=\"options?.itemLabelHtmlClass + (selectedItem === i ?\n          (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n          (' ' + options?.style?.unselected))\"\n        role=\"presentation\"\n        data-tabs>\n        <a *ngIf=\"showAddTab || item.type !== '$ref'\"\n          [innerHTML]=\"setTitle(item, i)\"\n          (click)=\"select(i)\"></a>\n      </li>\n    </ul>\n\n    <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n      [class]=\"options?.htmlClass\">\n\n      <select-framework-widget *ngIf=\"selectedItem === i\"\n        [class]=\"options?.fieldHtmlClass + ' ' + options?.activeClass + ' ' + options?.style?.selected\"\n        [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: ["a { cursor: pointer; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    TabsComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    TabsComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return TabsComponent;
}());
export { TabsComponent };
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