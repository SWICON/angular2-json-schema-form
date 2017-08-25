import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class AddReferenceComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.showAddButton = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.updateControl();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.previousLayoutIndex !== this.layoutIndex ||
            this.previousDataIndex !== this.dataIndex) {
            this.updateControl();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addItem(event) {
        event.preventDefault();
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1] + 1;
        this.jsf.addItem(this);
        this.updateControl();
    }
    /**
     * @return {?}
     */
    updateControl() {
        this.itemCount = this.layoutIndex[this.layoutIndex.length - 1];
        this.previousLayoutIndex = this.layoutIndex;
        this.previousDataIndex = this.dataIndex;
        this.showAddButton = this.layoutNode.arrayItem &&
            this.itemCount < (this.options.maxItems || 1000000);
    }
    /**
     * @return {?}
     */
    setTitle() {
        const /** @type {?} */ parent = {
            dataIndex: this.dataIndex.slice(0, -1),
            layoutNode: this.jsf.getParentNode(this)
        };
        return this.jsf.setTitle(parent, this.layoutNode, this.itemCount);
    }
}
AddReferenceComponent.decorators = [
    { type: Component, args: [{
                selector: 'add-reference-widget',
                template: `
    <button *ngIf="showAddButton"
      [class]="options?.fieldHtmlClass"
      [disabled]="options?.readonly"
      (click)="addItem($event)">
      <span *ngIf="options?.icon" [class]="options?.icon"></span>
      <span *ngIf="options?.title" [innerHTML]="setTitle()"></span>
    </button>`,
            },] },
];
/**
 * @nocollapse
 */
AddReferenceComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
AddReferenceComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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