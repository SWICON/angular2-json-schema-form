import { Component, Input } from '@angular/core';
import { hasOwn } from './../shared/utility.functions';
var RootComponent = (function () {
    function RootComponent() {
        this.isFlexItem = false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    RootComponent.prototype.isDraggable = function (node) {
        return this.isOrderable !== false && node.type !== '$ref' &&
            node.arrayItem && (node.options || {}).arrayItemType === 'list';
        // && (this.layout[this.layout.length - 1].tupleItems || this.layout.length > 2);
    };
    /**
     * @param {?} node
     * @param {?} attribute
     * @return {?}
     */
    RootComponent.prototype.getFlexAttribute = function (node, attribute) {
        var /** @type {?} */ index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    };
    /**
     * @param {?} layoutItem
     * @return {?}
     */
    RootComponent.prototype.trackByItem = function (layoutItem) {
        return layoutItem && layoutItem._id;
    };
    /**
     * @param {?} layoutItem
     * @return {?}
     */
    RootComponent.prototype.isConditionallyShown = function (layoutItem) {
        var /** @type {?} */ result = true;
        if (this.data && hasOwn(layoutItem, 'condition')) {
            var /** @type {?} */ model = this.data;
            /* tslint:disable */
            eval('result = ' + layoutItem.condition);
            /* tslint:enable */
        }
        return result;
    };
    RootComponent.decorators = [
        { type: Component, args: [{
                    selector: 'root-widget',
                    template: "\n    <div *ngFor=\"let layoutItem of layout; let i = index\"\n      [orderable]=\"isDraggable(layoutItem)\"\n      [formID]=\"formID\"\n      [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n      [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n      [layoutNode]=\"layoutItem\"\n      [class.form-flex-item]=\"isFlexItem\"\n      [style.flex-grow]=\"getFlexAttribute(layoutItem, 'flex-grow')\"\n      [style.flex-shrink]=\"getFlexAttribute(layoutItem, 'flex-shrink')\"\n      [style.flex-basis]=\"getFlexAttribute(layoutItem, 'flex-basis')\"\n      [style.align-self]=\"(layoutItem.options || {})['align-self']\"\n      [style.order]=\"(layoutItem.options || {}).order\">\n\n      <select-framework-widget\n        *ngIf=\"isConditionallyShown(layoutItem)\"\n        [formID]=\"formID\"\n        [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"\n        [data]=\"data\"></select-framework-widget>\n\n    </div>",
                    styles: ["\n    [draggable=true] { cursor: move; }\n    [draggable=true]:hover {\n      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n      position: relative; z-index: 10;\n      margin-top: -4px;\n      margin-left: -4px;\n      margin-right: 2px;\n      margin-bottom: 2px;\n      border-top: 1px solid #eee;\n      border-left: 1px solid #eee;\n    }\n    [draggable=true].drag-target-top {\n      box-shadow: 0 -2px 0 #000;\n      position: relative; z-index: 20;\n    }\n    [draggable=true].drag-target-bottom {\n      box-shadow: 0 2px 0 #000;\n      position: relative; z-index: 20;\n    }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    RootComponent.ctorParameters = function () { return []; };
    RootComponent.propDecorators = {
        'formID': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'layout': [{ type: Input },],
        'isOrderable': [{ type: Input },],
        'isFlexItem': [{ type: Input },],
        'data': [{ type: Input },],
    };
    return RootComponent;
}());
export { RootComponent };
function RootComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RootComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RootComponent.ctorParameters;
    /** @type {?} */
    RootComponent.propDecorators;
    /** @type {?} */
    RootComponent.prototype.options;
    /** @type {?} */
    RootComponent.prototype.parentComponent;
    /** @type {?} */
    RootComponent.prototype.formID;
    /** @type {?} */
    RootComponent.prototype.dataIndex;
    /** @type {?} */
    RootComponent.prototype.layoutIndex;
    /** @type {?} */
    RootComponent.prototype.layout;
    /** @type {?} */
    RootComponent.prototype.isOrderable;
    /** @type {?} */
    RootComponent.prototype.isFlexItem;
    /** @type {?} */
    RootComponent.prototype.data;
}
//# sourceMappingURL=root.component.js.map