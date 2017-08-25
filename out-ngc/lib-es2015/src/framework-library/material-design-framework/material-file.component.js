import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialFileComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-file-widget',
                template: ``,
            },] },
];
/**
 * @nocollapse
 */
MaterialFileComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialFileComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialFileComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialFileComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialFileComponent.ctorParameters;
    /** @type {?} */
    MaterialFileComponent.propDecorators;
    /** @type {?} */
    MaterialFileComponent.prototype.formControl;
    /** @type {?} */
    MaterialFileComponent.prototype.controlName;
    /** @type {?} */
    MaterialFileComponent.prototype.controlValue;
    /** @type {?} */
    MaterialFileComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialFileComponent.prototype.boundControl;
    /** @type {?} */
    MaterialFileComponent.prototype.options;
    /** @type {?} */
    MaterialFileComponent.prototype.formID;
    /** @type {?} */
    MaterialFileComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialFileComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialFileComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialFileComponent.prototype.jsf;
}
//# sourceMappingURL=material-file.component.js.map