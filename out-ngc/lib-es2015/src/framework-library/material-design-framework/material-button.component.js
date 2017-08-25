import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialButtonComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
MaterialButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-button-widget',
                template: `
    <div class="button-row" [class]="options?.htmlClass">
      <button md-raised-button
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [color]="options?.color || 'primary'"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (click)="updateValue($event)">
        <md-icon *ngIf="options?.icon" class="md-24">{{options?.icon}}</md-icon>
        <span *ngIf="options?.title" [innerHTML]="options?.title"></span>
      </button>
    </div>`,
                styles: [`button { margin-top: 10px; }`],
            },] },
];
/**
 * @nocollapse
 */
MaterialButtonComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialButtonComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialButtonComponent.ctorParameters;
    /** @type {?} */
    MaterialButtonComponent.propDecorators;
    /** @type {?} */
    MaterialButtonComponent.prototype.formControl;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlName;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlValue;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialButtonComponent.prototype.boundControl;
    /** @type {?} */
    MaterialButtonComponent.prototype.options;
    /** @type {?} */
    MaterialButtonComponent.prototype.formID;
    /** @type {?} */
    MaterialButtonComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialButtonComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialButtonComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialButtonComponent.prototype.jsf;
}
//# sourceMappingURL=material-button.component.js.map