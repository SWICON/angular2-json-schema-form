import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialTextareaComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialTextareaComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    MaterialTextareaComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialTextareaComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    MaterialTextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-textarea-widget',
                    template: "\n    <md-input-container [style.width]=\"'100%'\">\n      <textarea mdInput #inputControl\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [required]=\"options?.required\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [placeholder]=\"options?.title\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [style.width]=\"'100%'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\"></textarea>\n      <span *ngIf=\"options?.fieldAddonLeft\"\n        md-prefix>{{options?.fieldAddonLeft}}</span>\n      <span *ngIf=\"options?.fieldAddonRight\"\n        md-suffix>{{options?.fieldAddonRight}}</span>\n      <md-hint *ngIf=\"options?.description && !options?.placeholder && formControl?.dirty\"\n        align=\"end\">{{options?.description}}</md-hint>\n      <md-hint *ngIf=\"!options?.description && options?.placeholder && !formControl?.dirty\"\n        align=\"end\">{{options?.placeholder}}</md-hint>\n    </md-input-container>",
                    styles: ["md-input-container { margin-top: 6px; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialTextareaComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialTextareaComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialTextareaComponent;
}());
export { MaterialTextareaComponent };
function MaterialTextareaComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialTextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialTextareaComponent.ctorParameters;
    /** @type {?} */
    MaterialTextareaComponent.propDecorators;
    /** @type {?} */
    MaterialTextareaComponent.prototype.formControl;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlName;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlValue;
    /** @type {?} */
    MaterialTextareaComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialTextareaComponent.prototype.boundControl;
    /** @type {?} */
    MaterialTextareaComponent.prototype.options;
    /** @type {?} */
    MaterialTextareaComponent.prototype.formID;
    /** @type {?} */
    MaterialTextareaComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialTextareaComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialTextareaComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialTextareaComponent.prototype.jsf;
}
//# sourceMappingURL=material-textarea.component.js.map