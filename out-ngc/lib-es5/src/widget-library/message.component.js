import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var MessageComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MessageComponent(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    /**
     * @return {?}
     */
    MessageComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'message-widget',
                    template: "\n    <span *ngIf=\"message\"\n      [class]=\"options?.labelHtmlClass\"\n      [innerHTML]=\"message\"></span>",
                },] },
    ];
    /**
     * @nocollapse
     */
    MessageComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MessageComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MessageComponent;
}());
export { MessageComponent };
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