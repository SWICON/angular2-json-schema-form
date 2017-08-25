import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var AddReferenceComponent = (function () {
    /**
     * @param {?} jsf
     */
    function AddReferenceComponent(jsf) {
        this.jsf = jsf;
        this.showAddButton = true;
    }
    /**
     * @return {?}
     */
    AddReferenceComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.updateControl();
    };
    /**
     * @return {?}
     */
    AddReferenceComponent.prototype.ngDoCheck = function () {
        if (this.previousLayoutIndex !== this.layoutIndex ||
            this.previousDataIndex !== this.dataIndex) {
            this.updateControl();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AddReferenceComponent.prototype.addItem = function (event) {
        event.preventDefault();
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1] + 1;
        this.jsf.addItem(this);
        this.updateControl();
    };
    /**
     * @return {?}
     */
    AddReferenceComponent.prototype.updateControl = function () {
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1];
        this.previousLayoutIndex = this.layoutIndex;
        this.previousDataIndex = this.dataIndex;
        this.showAddButton = this.layoutNode.arrayItem &&
            this.itemCount < (this.options.maxItems || 1000000);
    };
    /**
     * @return {?}
     */
    AddReferenceComponent.prototype.setTitle = function () {
        var /** @type {?} */ parent = {
            dataIndex: this.dataIndex.slice(0, -1),
            layoutNode: this.jsf.getParentNode(this)
        };
        return this.jsf.setTitle(parent, this.layoutNode, this.itemCount);
    };
    AddReferenceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'add-reference-widget',
                    template: "\n    <button *ngIf=\"showAddButton\"\n      [class]=\"options?.fieldHtmlClass\"\n      [disabled]=\"options?.readonly\"\n      (click)=\"addItem($event)\">\n      <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n      <span *ngIf=\"options?.title\" [innerHTML]=\"setTitle()\"></span>\n    </button>",
                },] },
    ];
    /**
     * @nocollapse
     */
    AddReferenceComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    AddReferenceComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return AddReferenceComponent;
}());
export { AddReferenceComponent };
function AddReferenceComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AddReferenceComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AddReferenceComponent.ctorParameters;
    /** @type {?} */
    AddReferenceComponent.propDecorators;
    /** @type {?} */
    AddReferenceComponent.prototype.options;
    /** @type {?} */
    AddReferenceComponent.prototype.itemCount;
    /** @type {?} */
    AddReferenceComponent.prototype.showAddButton;
    /** @type {?} */
    AddReferenceComponent.prototype.previousLayoutIndex;
    /** @type {?} */
    AddReferenceComponent.prototype.previousDataIndex;
    /** @type {?} */
    AddReferenceComponent.prototype.formID;
    /** @type {?} */
    AddReferenceComponent.prototype.layoutNode;
    /** @type {?} */
    AddReferenceComponent.prototype.layoutIndex;
    /** @type {?} */
    AddReferenceComponent.prototype.dataIndex;
    /** @type {?} */
    AddReferenceComponent.prototype.jsf;
}
//# sourceMappingURL=add-reference.component.js.map