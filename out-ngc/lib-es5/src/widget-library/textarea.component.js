import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var TextareaComponent = (function () {
    /**
     * @param {?} jsf
     */
    function TextareaComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    TextareaComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TextareaComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    TextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'textarea-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <textarea\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\"></textarea>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    TextareaComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    TextareaComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return TextareaComponent;
}());
export { TextareaComponent };
function TextareaComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TextareaComponent.ctorParameters;
    /** @type {?} */
    TextareaComponent.propDecorators;
    /** @type {?} */
    TextareaComponent.prototype.formControl;
    /** @type {?} */
    TextareaComponent.prototype.controlName;
    /** @type {?} */
    TextareaComponent.prototype.controlValue;
    /** @type {?} */
    TextareaComponent.prototype.controlDisabled;
    /** @type {?} */
    TextareaComponent.prototype.boundControl;
    /** @type {?} */
    TextareaComponent.prototype.options;
    /** @type {?} */
    TextareaComponent.prototype.formID;
    /** @type {?} */
    TextareaComponent.prototype.layoutNode;
    /** @type {?} */
    TextareaComponent.prototype.layoutIndex;
    /** @type {?} */
    TextareaComponent.prototype.dataIndex;
    /** @type {?} */
    TextareaComponent.prototype.jsf;
}
//# sourceMappingURL=textarea.component.js.map