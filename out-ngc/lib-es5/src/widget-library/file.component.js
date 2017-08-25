import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var FileComponent = (function () {
    /**
     * @param {?} jsf
     */
    function FileComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    FileComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-widget',
                    template: "",
                },] },
    ];
    /**
     * @nocollapse
     */
    FileComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    FileComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return FileComponent;
}());
export { FileComponent };
function FileComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FileComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FileComponent.ctorParameters;
    /** @type {?} */
    FileComponent.propDecorators;
    /** @type {?} */
    FileComponent.prototype.formControl;
    /** @type {?} */
    FileComponent.prototype.controlName;
    /** @type {?} */
    FileComponent.prototype.controlValue;
    /** @type {?} */
    FileComponent.prototype.controlDisabled;
    /** @type {?} */
    FileComponent.prototype.boundControl;
    /** @type {?} */
    FileComponent.prototype.options;
    /** @type {?} */
    FileComponent.prototype.formID;
    /** @type {?} */
    FileComponent.prototype.layoutNode;
    /** @type {?} */
    FileComponent.prototype.layoutIndex;
    /** @type {?} */
    FileComponent.prototype.dataIndex;
    /** @type {?} */
    FileComponent.prototype.jsf;
}
//# sourceMappingURL=file.component.js.map