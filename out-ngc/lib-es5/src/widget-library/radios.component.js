import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
var RadiosComponent = (function () {
    /**
     * @param {?} jsf
     */
    function RadiosComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.layoutOrientation = 'vertical';
        this.radiosList = [];
    }
    /**
     * @return {?}
     */
    RadiosComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline' ||
            this.layoutNode.type === 'radiobuttons') {
            this.layoutOrientation = 'horizontal';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    RadiosComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    RadiosComponent.decorators = [
        { type: Component, args: [{
                    selector: 'radios-widget',
                    template: "\n    <label *ngIf=\"options?.title\"\n      [attr.for]=\"'control' + layoutNode?._id\"\n      [class]=\"options?.labelHtmlClass\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n      <div [ngSwitch]=\"layoutOrientation\">\n\n        <!-- 'horizontal' = radios-inline or radiobuttons -->\n        <div *ngSwitchCase=\"'horizontal'\"\n          [class]=\"options?.htmlClass\">\n          <label *ngFor=\"let radioItem of radiosList\"\n            [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n            [class]=\"options?.itemLabelHtmlClass +\n              ((controlValue + '' === radioItem?.value + '') ?\n              (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n              (' ' + options?.style?.unselected))\">\n            <input type=\"radio\"\n              [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n              [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n              [attr.required]=\"options?.required\"\n              [checked]=\"radioItem?.value === controlValue\"\n              [class]=\"options?.fieldHtmlClass\"\n              [disabled]=\"controlDisabled\"\n              [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n              [name]=\"controlName\"\n              [value]=\"radioItem?.value\"\n              (change)=\"updateValue($event)\">\n            <span [innerHTML]=\"radioItem?.name\"></span>\n          </label>\n        </div>\n\n        <!-- 'vertical' = regular radios -->\n        <div *ngSwitchDefault>\n          <div *ngFor=\"let radioItem of radiosList\"\n            [class]=\"options?.htmlClass\">\n            <label\n              [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n              [class]=\"options?.itemLabelHtmlClass +\n                ((controlValue + '' === radioItem?.value + '') ?\n                (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n                (' ' + options?.style?.unselected))\">\n              <input type=\"radio\"\n                [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                [attr.required]=\"options?.required\"\n                [checked]=\"radioItem?.value === controlValue\"\n                [class]=\"options?.fieldHtmlClass\"\n                [disabled]=\"controlDisabled\"\n                [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n                [name]=\"controlName\"\n                [value]=\"radioItem?.value\"\n                (change)=\"updateValue($event)\">\n              <span [innerHTML]=\"radioItem?.name\"></span>\n            </label>\n          </div>\n        </div>\n\n      </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    RadiosComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    RadiosComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return RadiosComponent;
}());
export { RadiosComponent };
function RadiosComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RadiosComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RadiosComponent.ctorParameters;
    /** @type {?} */
    RadiosComponent.propDecorators;
    /** @type {?} */
    RadiosComponent.prototype.formControl;
    /** @type {?} */
    RadiosComponent.prototype.controlName;
    /** @type {?} */
    RadiosComponent.prototype.controlValue;
    /** @type {?} */
    RadiosComponent.prototype.controlDisabled;
    /** @type {?} */
    RadiosComponent.prototype.boundControl;
    /** @type {?} */
    RadiosComponent.prototype.options;
    /** @type {?} */
    RadiosComponent.prototype.layoutOrientation;
    /** @type {?} */
    RadiosComponent.prototype.radiosList;
    /** @type {?} */
    RadiosComponent.prototype.formID;
    /** @type {?} */
    RadiosComponent.prototype.layoutNode;
    /** @type {?} */
    RadiosComponent.prototype.layoutIndex;
    /** @type {?} */
    RadiosComponent.prototype.dataIndex;
    /** @type {?} */
    RadiosComponent.prototype.jsf;
}
//# sourceMappingURL=radios.component.js.map