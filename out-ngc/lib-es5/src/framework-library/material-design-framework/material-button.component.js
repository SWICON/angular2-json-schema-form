import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialButtonComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    MaterialButtonComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    MaterialButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-button-widget',
                    template: "\n    <div class=\"button-row\" [class]=\"options?.htmlClass\">\n      <button md-raised-button\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [color]=\"options?.color || 'primary'\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n        <md-icon *ngIf=\"options?.icon\" class=\"md-24\">{{options?.icon}}</md-icon>\n        <span *ngIf=\"options?.title\" [innerHTML]=\"options?.title\"></span>\n      </button>\n    </div>",
                    styles: ["button { margin-top: 10px; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialButtonComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialButtonComponent;
}());
export { MaterialButtonComponent };
function MaterialButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialButtonComponent.ctorParameters;
    /** @type {?} */
    MaterialButtonComponent.propDecorators;
    /** @type {?} */
    MaterialButtonComponent.prototype.formControl;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlName;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlValue;
    /** @type {?} */
    MaterialButtonComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialButtonComponent.prototype.boundControl;
    /** @type {?} */
    MaterialButtonComponent.prototype.options;
    /** @type {?} */
    MaterialButtonComponent.prototype.formID;
    /** @type {?} */
    MaterialButtonComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialButtonComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialButtonComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialButtonComponent.prototype.jsf;
}
//# sourceMappingURL=material-button.component.js.map