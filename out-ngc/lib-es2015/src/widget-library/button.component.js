import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class ButtonComponent {
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
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'button-widget',
                template: `
    <div
      [class]="options?.htmlClass">
      <button
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [class]="options?.fieldHtmlClass"
        [disabled]="controlDisabled"
        [name]="controlName"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (click)="updateValue($event)">
        <span *ngIf="options?.icon || options?.title"
          [class]="options?.icon"
          [innerHTML]="options?.title"></span>
      </button>
    </div>`,
            },] },
];
/**
 * @nocollapse
 */
ButtonComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
ButtonComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function ButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ButtonComponent.ctorParameters;
    /** @type {?} */
    ButtonComponent.propDecorators;
    /** @type {?} */
    ButtonComponent.prototype.formControl;
    /** @type {?} */
    ButtonComponent.prototype.controlName;
    /** @type {?} */
    ButtonComponent.prototype.controlValue;
    /** @type {?} */
    ButtonComponent.prototype.controlDisabled;
    /** @type {?} */
    ButtonComponent.prototype.boundControl;
    /** @type {?} */
    ButtonComponent.prototype.options;
    /** @type {?} */
    ButtonComponent.prototype.formID;
    /** @type {?} */
    ButtonComponent.prototype.layoutNode;
    /** @type {?} */
    ButtonComponent.prototype.layoutIndex;
    /** @type {?} */
    ButtonComponent.prototype.dataIndex;
    /** @type {?} */
    ButtonComponent.prototype.jsf;
}
//# sourceMappingURL=button.component.js.map