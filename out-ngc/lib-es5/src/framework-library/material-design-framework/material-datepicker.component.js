import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialDatepickerComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialDatepickerComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    /**
     * @return {?}
     */
    MaterialDatepickerComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialDatepickerComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialDatepickerComponent.prototype.updateSelectedDate = function (event) {
        this.controlValue = [
            event.getMonth() + 1,
            event.getDate(),
            event.getFullYear()
        ].join('-');
        this.jsf.updateValue(this, this.controlValue);
    };
    MaterialDatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-datepicker-widget',
                    template: "\n    <md-input-container [style.width]=\"'100%'\">\n      <input mdInput #inputControl\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [max]=\"options?.maximum\"\n        [mdDatepicker]=\"picker\"\n        [min]=\"options?.minimum\"\n        [name]=\"controlName\"\n        [placeholder]=\"options?.title\"\n        [required]=\"options?.required\"\n        [style.width]=\"'100%'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n      <span *ngIf=\"options?.fieldAddonLeft\"\n        md-prefix>{{options?.fieldAddonLeft}}</span>\n      <span *ngIf=\"options?.fieldAddonRight\"\n        md-suffix>{{options?.fieldAddonRight}}</span>\n      <md-hint *ngIf=\"options?.description && !options?.placeholder && formControl?.dirty\"\n        align=\"end\">{{options?.description}}</md-hint>\n      <md-hint *ngIf=\"!options?.description && options?.placeholder && !formControl?.dirty\"\n        align=\"end\">{{options?.placeholder}}</md-hint>\n      <button mdSuffix [mdDatepickerToggle]=\"picker\"></button>\n    </md-input-container>\n    <md-datepicker #picker\n      (selectedChanged)=\"updateSelectedDate($event)\"></md-datepicker>",
                    styles: ["md-input-container { margin-top: 6px; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialDatepickerComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialDatepickerComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialDatepickerComponent;
}());
export { MaterialDatepickerComponent };
function MaterialDatepickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialDatepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialDatepickerComponent.ctorParameters;
    /** @type {?} */
    MaterialDatepickerComponent.propDecorators;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.formControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlName;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlValue;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.boundControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.options;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.formID;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.jsf;
}
//# sourceMappingURL=material-datepicker.component.js.map