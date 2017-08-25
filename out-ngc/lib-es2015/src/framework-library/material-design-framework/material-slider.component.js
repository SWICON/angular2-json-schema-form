import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialSliderComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
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
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-slider-widget',
                template: `
      <md-slider #inputControl
        [(ngModel)]="controlValue"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [min]="options?.minimum"
        [step]="options?.multipleOf || options?.step || 'any'"
        [style.width]="'100%'"
        [thumb-label]="true"
        [value]="controlValue"
        (change)="updateValue($event)"></md-slider>`,
                styles: [`md-input-container { margin-top: 6px; }`],
            },] },
];
/**
 * @nocollapse
 */
MaterialSliderComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialSliderComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
function MaterialSliderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialSliderComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialSliderComponent.ctorParameters;
    /** @type {?} */
    MaterialSliderComponent.propDecorators;
    /** @type {?} */
    MaterialSliderComponent.prototype.formControl;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlName;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlValue;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialSliderComponent.prototype.boundControl;
    /** @type {?} */
    MaterialSliderComponent.prototype.options;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowNegative;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowDecimal;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowExponents;
    /** @type {?} */
    MaterialSliderComponent.prototype.lastValidNumber;
    /** @type {?} */
    MaterialSliderComponent.prototype.formID;
    /** @type {?} */
    MaterialSliderComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialSliderComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialSliderComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialSliderComponent.prototype.jsf;
}
//# sourceMappingURL=material-slider.component.js.map