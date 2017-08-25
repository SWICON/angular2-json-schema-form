import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var ButtonComponent = (function () {
    /**
     * @param {?} jsf
     */
    function ButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <button\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n        <span *ngIf=\"options?.icon || options?.title\"\n          [class]=\"options?.icon\"\n          [innerHTML]=\"options?.title\"></span>\n      </button>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    ButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    ButtonComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return ButtonComponent;
}());
export { ButtonComponent };
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