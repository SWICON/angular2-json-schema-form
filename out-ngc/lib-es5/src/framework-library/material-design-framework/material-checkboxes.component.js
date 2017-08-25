import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
var MaterialCheckboxesComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialCheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
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
    Object.defineProperty(MaterialCheckboxesComponent.prototype, "allChecked", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkboxList.filter(function (t) { return t.checked; }).length === this.checkboxList.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialCheckboxesComponent.prototype, "someChecked", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ checkedItems = this.checkboxList.filter(function (t) { return t.checked; }).length;
            return checkedItems > 0 && checkedItems < this.checkboxList.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.updateValue = function (event) {
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.updateAllValues = function (event) {
        this.checkboxList.forEach(function (t) { return t.checked = event.checked; });
    };
    MaterialCheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-checkboxes-widget',
                    template: "\n    <md-checkbox type=\"checkbox\"\n      [color]=\"options?.color || 'primary'\"\n      [disabled]=\"controlDisabled || options?.readonly\"\n      [name]=\"options?.name\"\n      [checked]=\"allChecked\"\n      [indeterminate]=\"someChecked\"\n      (change)=\"updateAllValues($event)\">\n      <span class=\"checkbox-name\" [innerHTML]=\"options?.name\"></span>\n    </md-checkbox>\n    <label *ngIf=\"options?.title\"\n      [class]=\"options?.labelHtmlClass\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n    <ul class=\"checkbox-list\" [class.horizontal-list]=\"horizontalList\">\n      <li *ngFor=\"let checkboxItem of checkboxList\"\n        [class]=\"options?.htmlClass\">\n        <md-checkbox type=\"checkbox\"\n          [(ngModel)]=\"checkboxItem.checked\"\n          [color]=\"options?.color || 'primary'\"\n          [disabled]=\"controlDisabled || options?.readonly\"\n          [name]=\"checkboxItem?.name\"\n          (change)=\"updateValue($event)\">\n          <span class=\"checkbox-name\" [innerHTML]=\"checkboxItem?.name\"></span>\n        </md-checkbox>\n      </li>\n    </ul>",
                    styles: ["\n    .checkbox-list { list-style-type: none; }\n    .horizontal-list > li {\n      display: inline-block;\n      margin-right: 10px;\n      zoom: 1;\n    }\n    .checkbox-name { white-space: nowrap; }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialCheckboxesComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialCheckboxesComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialCheckboxesComponent;
}());
export { MaterialCheckboxesComponent };
function MaterialCheckboxesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialCheckboxesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialCheckboxesComponent.ctorParameters;
    /** @type {?} */
    MaterialCheckboxesComponent.propDecorators;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlName;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlValue;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.boundControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.options;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.horizontalList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formArray;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.checkboxList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formID;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.jsf;
}
//# sourceMappingURL=material-checkboxes.component.js.map