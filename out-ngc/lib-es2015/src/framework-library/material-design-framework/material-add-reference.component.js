import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialAddReferenceComponent {
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
MaterialAddReferenceComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-add-reference-widget',
                template: `
    <section [class]="options?.htmlClass" align="end">
      <button md-raised-button *ngIf="showAddButton"
        [color]="options?.color || 'accent'"
        [disabled]="options?.readonly"
        (click)="addItem($event)">
        <span *ngIf="options?.icon" [class]="options?.icon"></span>
        <span *ngIf="options?.title" [innerHTML]="setTitle()"></span>
      </button>
    </section>`,
            },] },
];
/**
 * @nocollapse
 */
MaterialAddReferenceComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialAddReferenceComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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