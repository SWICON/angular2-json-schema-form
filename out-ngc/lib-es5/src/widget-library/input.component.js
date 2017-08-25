import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var InputComponent = (function () {
    /**
     * @param {?} jsf
     */
    function InputComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    /**
     * @return {?}
     */
    InputComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    InputComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    InputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'input-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input #inputControl\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n        <datalist *ngIf=\"options?.typeahead?.source\"\n          [id]=\"'control' + layoutNode?._id + 'Autocomplete'\">\n          <option *ngFor=\"let word of options?.typeahead?.source\"\n            [value]=\"word\">\n        </datalist>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    InputComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    InputComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return InputComponent;
}());
export { InputComponent };
function InputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    InputComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    InputComponent.ctorParameters;
    /** @type {?} */
    InputComponent.propDecorators;
    /** @type {?} */
    InputComponent.prototype.formControl;
    /** @type {?} */
    InputComponent.prototype.controlName;
    /** @type {?} */
    InputComponent.prototype.controlValue;
    /** @type {?} */
    InputComponent.prototype.controlDisabled;
    /** @type {?} */
    InputComponent.prototype.boundControl;
    /** @type {?} */
    InputComponent.prototype.options;
    /** @type {?} */
    InputComponent.prototype.autoCompleteList;
    /** @type {?} */
    InputComponent.prototype.formID;
    /** @type {?} */
    InputComponent.prototype.layoutNode;
    /** @type {?} */
    InputComponent.prototype.layoutIndex;
    /** @type {?} */
    InputComponent.prototype.dataIndex;
    /** @type {?} */
    InputComponent.prototype.jsf;
}
//# sourceMappingURL=input.component.js.map