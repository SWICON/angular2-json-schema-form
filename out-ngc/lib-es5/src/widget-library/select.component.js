import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
var SelectComponent = (function () {
    /**
     * @param {?} jsf
     */
    function SelectComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
    }
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required);
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <select\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        (input)=\"updateValue($event)\">\n        <option *ngFor=\"let selectItem of selectList\"\n           [value]=\"selectItem.value\"\n           [selected]=\"selectItem.value === controlValue\">{{selectItem.name}}</option>\n      </select>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    SelectComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    SelectComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return SelectComponent;
}());
export { SelectComponent };
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SelectComponent.ctorParameters;
    /** @type {?} */
    SelectComponent.propDecorators;
    /** @type {?} */
    SelectComponent.prototype.formControl;
    /** @type {?} */
    SelectComponent.prototype.controlName;
    /** @type {?} */
    SelectComponent.prototype.controlValue;
    /** @type {?} */
    SelectComponent.prototype.controlDisabled;
    /** @type {?} */
    SelectComponent.prototype.boundControl;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.selectList;
    /** @type {?} */
    SelectComponent.prototype.formID;
    /** @type {?} */
    SelectComponent.prototype.layoutNode;
    /** @type {?} */
    SelectComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectComponent.prototype.dataIndex;
    /** @type {?} */
    SelectComponent.prototype.jsf;
}
//# sourceMappingURL=select.component.js.map