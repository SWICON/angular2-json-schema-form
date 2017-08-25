import { Component, Input } from '@angular/core';
export class FlexLayoutRootComponent {
    constructor() {
        this.isFlexItem = false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isDraggable(node) {
        return this.isOrderable !== false && node.type !== '$ref' &&
            node.arrayItem && (node.options || {}).arrayItemType === 'list';
        // && (this.layout[this.layout.length - 1].tupleItems || this.layout.length > 2);
    }
    /**
     * @param {?} node
     * @param {?} attribute
     * @return {?}
     */
    getFlexAttribute(node, attribute) {
        const /** @type {?} */ index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    /**
     * @param {?} layoutItem
     * @return {?}
     */
    trackByItem(layoutItem) {
        return layoutItem && layoutItem._id;
    }
}
FlexLayoutRootComponent.decorators = [
    { type: Component, args: [{
                selector: 'flex-layout-root-widget',
                template: `
    <div *ngFor="let layoutItem of layout; let i = index"
      [orderable]="isDraggable(layoutItem)"
      [formID]="formID"
      [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
      [layoutIndex]="(layoutIndex || []).concat(i)"
      [layoutNode]="layoutItem"
      [class.form-flex-item]="isFlexItem"
      [style.flex-grow]="getFlexAttribute(layoutItem, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutItem, 'flex-shrink')"
      [style.flex-basis]="getFlexAttribute(layoutItem, 'flex-basis')"
      [style.align-self]="(layoutItem.options || {})['align-self']"
      [style.order]="(layoutItem.options || {}).order"
      [fxFlex]="(layoutItem.options || {}).fxFlex"
      [fxFlexOrder]="(layoutItem.options || {}).fxFlexOrder"
      [fxFlexOffset]="(layoutItem.options || {}).fxFlexOffset"
      [fxFlexAlign]="(layoutItem.options || {}).fxFlexAlign">

      <select-framework-widget
        [formID]="formID"
        [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"></select-framework-widget>

    </div>`,
                styles: [`
    [draggable=true] { cursor: move; }
    [draggable=true]:hover {
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      position: relative; z-index: 10;
      margin-top: -4px;
      margin-left: -4px;
      margin-right: 2px;
      margin-bottom: 2px;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
    }
    [draggable=true].drag-target-top {
      box-shadow: 0 -2px 0 #000;
      position: relative; z-index: 20;
    }
    [draggable=true].drag-target-bottom {
      box-shadow: 0 2px 0 #000;
      position: relative; z-index: 20;
    }
  `],
            },] },
];
/**
 * @nocollapse
 */
FlexLayoutRootComponent.ctorParameters = () => [];
FlexLayoutRootComponent.propDecorators = {
    'formID': [{ type: Input },],
    'dataIndex': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'layout': [{ type: Input },],
    'isOrderable': [{ type: Input },],
    'isFlexItem': [{ type: Input },],
};
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