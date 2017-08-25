import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class HiddenComponent {
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
        this.jsf.initializeControl(this);
    }
}
HiddenComponent.decorators = [
    { type: Component, args: [{
                selector: 'hidden-widget',
                template: `
    <input
      [disabled]="controlDisabled"
      [name]="controlName"
      [id]="'control' + layoutNode?._id"
      type="hidden"
      [value]="controlValue">`,
            },] },
];
/**
 * @nocollapse
 */
HiddenComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
HiddenComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function HiddenComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HiddenComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HiddenComponent.ctorParameters;
    /** @type {?} */
    HiddenComponent.propDecorators;
    /** @type {?} */
    HiddenComponent.prototype.formControl;
    /** @type {?} */
    HiddenComponent.prototype.controlName;
    /** @type {?} */
    HiddenComponent.prototype.controlValue;
    /** @type {?} */
    HiddenComponent.prototype.controlDisabled;
    /** @type {?} */
    HiddenComponent.prototype.boundControl;
    /** @type {?} */
    HiddenComponent.prototype.formID;
    /** @type {?} */
    HiddenComponent.prototype.layoutNode;
    /** @type {?} */
    HiddenComponent.prototype.layoutIndex;
    /** @type {?} */
    HiddenComponent.prototype.dataIndex;
    /** @type {?} */
    HiddenComponent.prototype.jsf;
}
//# sourceMappingURL=hidden.component.js.map