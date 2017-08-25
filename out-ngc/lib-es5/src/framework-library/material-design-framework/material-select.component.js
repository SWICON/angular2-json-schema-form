import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
var MaterialSelectComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialSelectComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
    }
    /**
     * @return {?}
     */
    MaterialSelectComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required);
        this.jsf.initializeControl(this);
    };
    /**
     * @return {?}
     */
    MaterialSelectComponent.prototype.updateValue = function () {
        this.jsf.updateValue(this, this.controlValue === '' ? null : this.controlValue);
    };
    MaterialSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-select-widget',
                    template: "\n    <section [style.width]=\"'100%'\" [class]=\"options?.htmlClass || null\">\n      <md-select #inputControl\n        [(ngModel)]=\"controlValue\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.name]=\"controlName\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [disabled]=\"controlDisabled\"\n        [floatPlaceholder]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n        [id]=\"'control' + layoutNode?._id\"\n        [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n        [required]=\"options?.required\"\n        [style.margin-top]=\"'.9em'\"\n        [style.width]=\"'100%'\"\n        (onClose)=\"updateValue()\">\n        <md-option *ngFor=\"let selectItem of selectList\"\n          [value]=\"selectItem.value\"\n          [attr.selected]=\"selectItem.value === controlValue\">{{selectItem.name}}</md-option>\n      </md-select>\n    </section>",
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialSelectComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialSelectComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialSelectComponent;
}());
export { MaterialSelectComponent };
function MaterialSelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialSelectComponent.ctorParameters;
    /** @type {?} */
    MaterialSelectComponent.propDecorators;
    /** @type {?} */
    MaterialSelectComponent.prototype.formControl;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlName;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlValue;
    /** @type {?} */
    MaterialSelectComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialSelectComponent.prototype.boundControl;
    /** @type {?} */
    MaterialSelectComponent.prototype.options;
    /** @type {?} */
    MaterialSelectComponent.prototype.selectList;
    /** @type {?} */
    MaterialSelectComponent.prototype.formID;
    /** @type {?} */
    MaterialSelectComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialSelectComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialSelectComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialSelectComponent.prototype.jsf;
}
//# sourceMappingURL=material-select.component.js.map