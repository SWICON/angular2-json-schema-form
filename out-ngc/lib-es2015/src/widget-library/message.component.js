import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class MessageComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-widget',
                template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass"
      [innerHTML]="message"></span>`,
            },] },
];
/**
 * @nocollapse
 */
MessageComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MessageComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MessageComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MessageComponent.ctorParameters;
    /** @type {?} */
    MessageComponent.propDecorators;
    /** @type {?} */
    MessageComponent.prototype.options;
    /** @type {?} */
    MessageComponent.prototype.message;
    /** @type {?} */
    MessageComponent.prototype.formID;
    /** @type {?} */
    MessageComponent.prototype.layoutNode;
    /** @type {?} */
    MessageComponent.prototype.layoutIndex;
    /** @type {?} */
    MessageComponent.prototype.dataIndex;
    /** @type {?} */
    MessageComponent.prototype.jsf;
}
//# sourceMappingURL=message.component.js.map