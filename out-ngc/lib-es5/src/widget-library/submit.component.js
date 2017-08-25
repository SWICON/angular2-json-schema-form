import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SubmitComponent = (function () {
    /**
     * @param {?} jsf
     */
    function SubmitComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    SubmitComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SubmitComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    SubmitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'submit-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    SubmitComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    SubmitComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return SubmitComponent;
}());
export { SubmitComponent };
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