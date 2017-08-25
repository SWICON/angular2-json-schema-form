import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared/index';
var MaterialRadiosComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialRadiosComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.flexDirection = 'column';
        this.radiosList = [];
    }
    /**
     * @return {?}
     */
    MaterialRadiosComponent.prototype.ngOnInit = function () {
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
    MaterialRadiosComponent.prototype.updateValue = function (value) {
        this.jsf.updateValue(this, value);
    };
    MaterialRadiosComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-radios-widget',
                    template: "\n    <div *ngIf=\"options?.title\">\n      <label\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n    </div>\n    <md-radio-group\n      [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n      [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n      [attr.required]=\"options?.required\"\n      [style.flex-direction]=\"flexDirection\"\n      [disabled]=\"controlDisabled\"\n      [name]=\"controlName\"\n      [value]=\"controlValue\">\n      <div *ngFor=\"let radioItem of radiosList\">\n        <md-radio-button\n          [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n          [value]=\"radioItem?.value\"\n          (click)=\"updateValue(radioItem?.value)\">\n          <span [innerHTML]=\"radioItem?.name\"></span>\n        </md-radio-button>\n      </div>\n    </md-radio-group>",
                    styles: ["\n    md-radio-group { display: inline-flex; }\n    md-radio-button { margin: 0 5px; }\n  "]
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialRadiosComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialRadiosComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialRadiosComponent;
}());
export { MaterialRadiosComponent };
function MaterialRadiosComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialRadiosComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialRadiosComponent.ctorParameters;
    /** @type {?} */
    MaterialRadiosComponent.propDecorators;
    /** @type {?} */
    MaterialRadiosComponent.prototype.formControl;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlName;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlValue;
    /** @type {?} */
    MaterialRadiosComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialRadiosComponent.prototype.boundControl;
    /** @type {?} */
    MaterialRadiosComponent.prototype.options;
    /** @type {?} */
    MaterialRadiosComponent.prototype.flexDirection;
    /** @type {?} */
    MaterialRadiosComponent.prototype.radiosList;
    /** @type {?} */
    MaterialRadiosComponent.prototype.formID;
    /** @type {?} */
    MaterialRadiosComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialRadiosComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialRadiosComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialRadiosComponent.prototype.jsf;
}
//# sourceMappingURL=material-radios.component.js.map