import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialSliderComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialSliderComponent(jsf) {
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
    MaterialSliderComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialSliderComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.value);
    };
    MaterialSliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-slider-widget',
                    template: "\n      <md-slider #inputControl\n        [(ngModel)]=\"controlValue\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [max]=\"options?.maximum\"\n        [min]=\"options?.minimum\"\n        [step]=\"options?.multipleOf || options?.step || 'any'\"\n        [style.width]=\"'100%'\"\n        [thumb-label]=\"true\"\n        [value]=\"controlValue\"\n        (change)=\"updateValue($event)\"></md-slider>",
                    styles: ["md-input-container { margin-top: 6px; }"],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialSliderComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialSliderComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialSliderComponent;
}());
export { MaterialSliderComponent };
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