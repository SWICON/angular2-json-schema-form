import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared/index';
var CheckboxesComponent = (function () {
    /**
     * @param {?} jsf
     */
    function CheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.boundControl = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    CheckboxesComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            var /** @type {?} */ formArray = this.jsf.getControl(this);
            for (var _i = 0, _a = this.checkboxList; _i < _a.length; _i++) {
                var checkboxItem = _a[_i];
                checkboxItem.checked = formArray.value.indexOf(checkboxItem.value) !== -1;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxesComponent.prototype.updateValue = function (event) {
        for (var _i = 0, _a = this.checkboxList; _i < _a.length; _i++) {
            var checkboxItem = _a[_i];
            if (event.target.value === checkboxItem.value) {
                checkboxItem.checked = event.target.checked;
            }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    };
    CheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkboxes-widget',
                    template: "\n    <label *ngIf=\"options?.title\"\n      [class]=\"options?.labelHtmlClass\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n\n    <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->\n    <div *ngIf=\"layoutOrientation === 'horizontal'\" [class]=\"options?.htmlClass\">\n      <label *ngFor=\"let checkboxItem of checkboxList\"\n        [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n        [class]=\"options?.itemLabelHtmlClass + (checkboxItem.checked ?\n          (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n          (' ' + options?.style?.unselected))\">\n        <input type=\"checkbox\"\n          [attr.required]=\"options?.required\"\n          [checked]=\"checkboxItem.checked\"\n          [class]=\"options?.fieldHtmlClass\"\n          [disabled]=\"controlDisabled\"\n          [id]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [name]=\"formControlName\"\n          [readonly]=\"options?.readonly ? 'readonly' : null\"\n          [value]=\"checkboxItem.value\"\n          (change)=\"updateValue($event)\">\n        <span [innerHTML]=\"checkboxItem.name\"></span>\n      </label>\n    </div>\n\n    <!-- 'vertical' = regular checkboxes -->\n    <div *ngIf=\"layoutOrientation === 'vertical'\">\n      <div *ngFor=\"let checkboxItem of checkboxList\" [class]=\"options?.htmlClass\">\n        <label\n          [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [class]=\"options?.itemLabelHtmlClass + (checkboxItem.checked ?\n            (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n            (' ' + options?.style?.unselected))\">\n          <input type=\"checkbox\"\n            [attr.required]=\"options?.required\"\n            [checked]=\"checkboxItem.checked\"\n            [class]=\"options?.fieldHtmlClass\"\n            [disabled]=\"controlDisabled\"\n            [id]=\"options?.name + '/' + checkboxItem.value\"\n            [name]=\"options?.name\"\n            [readonly]=\"options?.readonly ? 'readonly' : null\"\n            [value]=\"checkboxItem.value\"\n            (change)=\"updateValue($event)\">\n          <span [innerHTML]=\"checkboxItem?.name\"></span>\n        </label>\n      </div>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    CheckboxesComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    CheckboxesComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return CheckboxesComponent;
}());
export { CheckboxesComponent };
function CheckboxesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CheckboxesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CheckboxesComponent.ctorParameters;
    /** @type {?} */
    CheckboxesComponent.propDecorators;
    /** @type {?} */
    CheckboxesComponent.prototype.formControl;
    /** @type {?} */
    CheckboxesComponent.prototype.controlName;
    /** @type {?} */
    CheckboxesComponent.prototype.controlValue;
    /** @type {?} */
    CheckboxesComponent.prototype.boundControl;
    /** @type {?} */
    CheckboxesComponent.prototype.options;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutOrientation;
    /** @type {?} */
    CheckboxesComponent.prototype.formArray;
    /** @type {?} */
    CheckboxesComponent.prototype.checkboxList;
    /** @type {?} */
    CheckboxesComponent.prototype.formID;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutNode;
    /** @type {?} */
    CheckboxesComponent.prototype.layoutIndex;
    /** @type {?} */
    CheckboxesComponent.prototype.dataIndex;
    /** @type {?} */
    CheckboxesComponent.prototype.jsf;
}
//# sourceMappingURL=checkboxes.component.js.map