import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class SubmitComponent {
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
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
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
SubmitComponent.decorators = [
    { type: Component, args: [{
                selector: 'submit-widget',
                template: `
    <div
      [class]="options?.htmlClass">
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (click)="updateValue($event)">
    </div>`,
            },] },
];
/**
 * @nocollapse
 */
SubmitComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
SubmitComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function SubmitComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SubmitComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SubmitComponent.ctorParameters;
    /** @type {?} */
    SubmitComponent.propDecorators;
    /** @type {?} */
    SubmitComponent.prototype.formControl;
    /** @type {?} */
    SubmitComponent.prototype.controlName;
    /** @type {?} */
    SubmitComponent.prototype.controlValue;
    /** @type {?} */
    SubmitComponent.prototype.controlDisabled;
    /** @type {?} */
    SubmitComponent.prototype.boundControl;
    /** @type {?} */
    SubmitComponent.prototype.options;
    /** @type {?} */
    SubmitComponent.prototype.formID;
    /** @type {?} */
    SubmitComponent.prototype.layoutNode;
    /** @type {?} */
    SubmitComponent.prototype.layoutIndex;
    /** @type {?} */
    SubmitComponent.prototype.dataIndex;
    /** @type {?} */
    SubmitComponent.prototype.jsf;
}
//# sourceMappingURL=submit.component.js.map