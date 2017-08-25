import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialTabsComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialTabsComponent(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    /**
     * @return {?}
     */
    MaterialTabsComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MaterialTabsComponent.prototype.select = function (index) {
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
    MaterialTabsComponent.prototype.updateControl = function () {
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
    MaterialTabsComponent.prototype.setTitle = function (item, index) {
        if (item === void 0) { item = null; }
        if (index === void 0) { index = null; }
        return this.jsf.setTitle(this, item, index);
    };
    MaterialTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-tabs-widget',
                    template: "\n    <nav md-tab-nav-bar\n      [attr.aria-label]=\"options?.label || options?.title\"\n      [style.width]=\"'100%'\">\n        <a *ngFor=\"let item of layoutNode?.items; let i = index\"\n          md-tab-link\n          [active]=\"selectedItem === i\"\n          (click)=\"select(i)\">\n          <span *ngIf=\"showAddTab || item.type !== '$ref'\"\n            [innerHTML]=\"setTitle(item, i)\"></span>\n        </a>\n    </nav>\n\n    <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n      [class]=\"options?.htmlClass\">\n\n      <select-framework-widget *ngIf=\"selectedItem === i\"\n        [class]=\"options?.fieldHtmlClass + ' ' + options?.activeClass + ' ' + options?.style?.selected\"\n        [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: ["a { cursor: pointer; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialTabsComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialTabsComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialTabsComponent;
}());
export { MaterialTabsComponent };
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