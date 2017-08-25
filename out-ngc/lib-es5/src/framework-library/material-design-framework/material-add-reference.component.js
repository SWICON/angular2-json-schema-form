import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialAddReferenceComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialAddReferenceComponent(jsf) {
        this.jsf = jsf;
        this.showAddButton = true;
    }
    /**
     * @return {?}
     */
    MaterialAddReferenceComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.updateControl();
    };
    /**
     * @return {?}
     */
    MaterialAddReferenceComponent.prototype.ngDoCheck = function () {
        if (this.previousLayoutIndex !== this.layoutIndex ||
            this.previousDataIndex !== this.dataIndex) {
            this.updateControl();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialAddReferenceComponent.prototype.addItem = function (event) {
        event.preventDefault();
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1] + 1;
        this.jsf.addItem(this);
        this.updateControl();
    };
    /**
     * @return {?}
     */
    MaterialAddReferenceComponent.prototype.updateControl = function () {
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1];
        this.previousLayoutIndex = this.layoutIndex;
        this.previousDataIndex = this.dataIndex;
        this.showAddButton = this.layoutNode.arrayItem &&
            this.itemCount < (this.options.maxItems || 1000000);
    };
    /**
     * @return {?}
     */
    MaterialAddReferenceComponent.prototype.setTitle = function () {
        var /** @type {?} */ parent = {
            dataIndex: this.dataIndex.slice(0, -1),
            layoutNode: this.jsf.getParentNode(this)
        };
        return this.jsf.setTitle(parent, this.layoutNode, this.itemCount);
    };
    MaterialAddReferenceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-add-reference-widget',
                    template: "\n    <section [class]=\"options?.htmlClass\" align=\"end\">\n      <button md-raised-button *ngIf=\"showAddButton\"\n        [color]=\"options?.color || 'accent'\"\n        [disabled]=\"options?.readonly\"\n        (click)=\"addItem($event)\">\n        <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n        <span *ngIf=\"options?.title\" [innerHTML]=\"setTitle()\"></span>\n      </button>\n    </section>",
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialAddReferenceComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialAddReferenceComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialAddReferenceComponent;
}());
export { MaterialAddReferenceComponent };
function MaterialAddReferenceComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialAddReferenceComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialAddReferenceComponent.ctorParameters;
    /** @type {?} */
    MaterialAddReferenceComponent.propDecorators;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.options;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.itemCount;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.showAddButton;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.previousLayoutIndex;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.previousDataIndex;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.formID;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialAddReferenceComponent.prototype.jsf;
}
//# sourceMappingURL=material-add-reference.component.js.map