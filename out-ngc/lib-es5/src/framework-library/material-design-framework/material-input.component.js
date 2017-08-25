import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialInputComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialInputComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    /**
     * @return {?}
     */
    MaterialInputComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialInputComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    MaterialInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-input-widget',
                    template: "\n    <md-input-container\n      [floatPlaceholder]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n      [style.margin-top]=\"'-2px'\"\n      [style.width]=\"'100%'\">\n      <input mdInput #inputControl\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n        [required]=\"options?.required\"\n        [style.width]=\"'100%'\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n      <span *ngIf=\"options?.fieldAddonLeft\"\n        md-prefix>{{options?.fieldAddonLeft}}</span>\n      <span *ngIf=\"options?.fieldAddonRight\"\n        md-suffix>{{options?.fieldAddonRight}}</span>\n      <md-hint *ngIf=\"options?.description && !options?.placeholder && formControl?.dirty\"\n        align=\"end\">{{options?.description}}</md-hint>\n    </md-input-container>",
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialInputComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialInputComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialInputComponent;
}());
export { MaterialInputComponent };
function MaterialInputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialInputComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialInputComponent.ctorParameters;
    /** @type {?} */
    MaterialInputComponent.propDecorators;
    /** @type {?} */
    MaterialInputComponent.prototype.formControl;
    /** @type {?} */
    MaterialInputComponent.prototype.controlName;
    /** @type {?} */
    MaterialInputComponent.prototype.controlValue;
    /** @type {?} */
    MaterialInputComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialInputComponent.prototype.boundControl;
    /** @type {?} */
    MaterialInputComponent.prototype.options;
    /** @type {?} */
    MaterialInputComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialInputComponent.prototype.formID;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.jsf;
}
//# sourceMappingURL=material-input.component.js.map