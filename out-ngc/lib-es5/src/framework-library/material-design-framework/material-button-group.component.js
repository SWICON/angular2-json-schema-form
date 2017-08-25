import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
var MaterialButtonGroupComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialButtonGroupComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.flexDirection = 'column';
        this.radiosList = [];
    }
    /**
     * @return {?}
     */
    MaterialButtonGroupComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline') {
            this.flexDirection = 'row';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MaterialButtonGroupComponent.prototype.updateValue = function (value) {
        this.jsf.updateValue(this, value);
    };
    MaterialButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-button-group-widget',
                    template: "\n    <div *ngIf=\"options?.title\">\n      <label\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n    </div>\n    <md-button-toggle-group\n      [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n      [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n      [attr.required]=\"options?.required\"\n      [disabled]=\"controlDisabled\"\n      [name]=\"controlName\"\n      [value]=\"controlValue\">\n      <div *ngFor=\"let radioItem of radiosList\">\n        <md-button-toggle\n          [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n          [value]=\"radioItem?.value\"\n          (click)=\"updateValue(radioItem?.value)\">\n          <span [innerHTML]=\"radioItem?.name\"></span>\n        </md-button-toggle>\n      </div>\n    </md-button-toggle-group>",
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialButtonGroupComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialButtonGroupComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialButtonGroupComponent;
}());
export { MaterialButtonGroupComponent };
function MaterialButtonGroupComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialButtonGroupComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialButtonGroupComponent.ctorParameters;
    /** @type {?} */
    MaterialButtonGroupComponent.propDecorators;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.formControl;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlName;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlValue;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.boundControl;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.options;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.flexDirection;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.radiosList;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.formID;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialButtonGroupComponent.prototype.jsf;
}
//# sourceMappingURL=material-button-group.component.js.map