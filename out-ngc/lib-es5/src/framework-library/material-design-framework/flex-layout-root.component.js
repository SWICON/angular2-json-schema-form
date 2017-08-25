import { Component, Input } from '@angular/core';
var FlexLayoutRootComponent = (function () {
    function FlexLayoutRootComponent() {
        this.isFlexItem = false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    FlexLayoutRootComponent.prototype.isDraggable = function (node) {
        return this.isOrderable !== false && node.type !== '$ref' &&
            node.arrayItem && (node.options || {}).arrayItemType === 'list';
        // && (this.layout[this.layout.length - 1].tupleItems || this.layout.length > 2);
    };
    /**
     * @param {?} node
     * @param {?} attribute
     * @return {?}
     */
    FlexLayoutRootComponent.prototype.getFlexAttribute = function (node, attribute) {
        var /** @type {?} */ index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    };
    /**
     * @param {?} layoutItem
     * @return {?}
     */
    FlexLayoutRootComponent.prototype.trackByItem = function (layoutItem) {
        return layoutItem && layoutItem._id;
    };
    FlexLayoutRootComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flex-layout-root-widget',
                    template: "\n    <div *ngFor=\"let layoutItem of layout; let i = index\"\n      [orderable]=\"isDraggable(layoutItem)\"\n      [formID]=\"formID\"\n      [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n      [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n      [layoutNode]=\"layoutItem\"\n      [class.form-flex-item]=\"isFlexItem\"\n      [style.flex-grow]=\"getFlexAttribute(layoutItem, 'flex-grow')\"\n      [style.flex-shrink]=\"getFlexAttribute(layoutItem, 'flex-shrink')\"\n      [style.flex-basis]=\"getFlexAttribute(layoutItem, 'flex-basis')\"\n      [style.align-self]=\"(layoutItem.options || {})['align-self']\"\n      [style.order]=\"(layoutItem.options || {}).order\"\n      [fxFlex]=\"(layoutItem.options || {}).fxFlex\"\n      [fxFlexOrder]=\"(layoutItem.options || {}).fxFlexOrder\"\n      [fxFlexOffset]=\"(layoutItem.options || {}).fxFlexOffset\"\n      [fxFlexAlign]=\"(layoutItem.options || {}).fxFlexAlign\">\n\n      <select-framework-widget\n        [formID]=\"formID\"\n        [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: ["\n    [draggable=true] { cursor: move; }\n    [draggable=true]:hover {\n      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n      position: relative; z-index: 10;\n      margin-top: -4px;\n      margin-left: -4px;\n      margin-right: 2px;\n      margin-bottom: 2px;\n      border-top: 1px solid #eee;\n      border-left: 1px solid #eee;\n    }\n    [draggable=true].drag-target-top {\n      box-shadow: 0 -2px 0 #000;\n      position: relative; z-index: 20;\n    }\n    [draggable=true].drag-target-bottom {\n      box-shadow: 0 2px 0 #000;\n      position: relative; z-index: 20;\n    }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    FlexLayoutRootComponent.ctorParameters = function () { return []; };
    FlexLayoutRootComponent.propDecorators = {
        'formID': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'layout': [{ type: Input },],
        'isOrderable': [{ type: Input },],
        'isFlexItem': [{ type: Input },],
    };
    return FlexLayoutRootComponent;
}());
export { FlexLayoutRootComponent };
function FlexLayoutRootComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FlexLayoutRootComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FlexLayoutRootComponent.ctorParameters;
    /** @type {?} */
    FlexLayoutRootComponent.propDecorators;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.options;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.formID;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.dataIndex;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.layoutIndex;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.layout;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.isOrderable;
    /** @type {?} */
    FlexLayoutRootComponent.prototype.isFlexItem;
}
//# sourceMappingURL=flex-layout-root.component.js.map