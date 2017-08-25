import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var NoFrameworkComponent = (function () {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    function NoFrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
    }
    /**
     * @return {?}
     */
    NoFrameworkComponent.prototype.ngOnInit = function () { };
    /**
     * @return {?}
     */
    NoFrameworkComponent.prototype.ngOnChanges = function () { };
    NoFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'none-framework',
                    template: "\n    <select-widget-widget\n      [formID]=\"formID\"\n      [layoutNode]=\"layoutNode\"\n      [dataIndex]=\"dataIndex\"\n      [layoutIndex]=\"layoutIndex\"\n      [data]=\"data\"></select-widget-widget>",
                },] },
    ];
    /**
     * @nocollapse
     */
    NoFrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: JsonSchemaFormService, },
    ]; };
    NoFrameworkComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'data': [{ type: Input },],
    };
    return NoFrameworkComponent;
}());
export { NoFrameworkComponent };
function NoFrameworkComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NoFrameworkComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NoFrameworkComponent.ctorParameters;
    /** @type {?} */
    NoFrameworkComponent.propDecorators;
    /** @type {?} */
    NoFrameworkComponent.prototype.formID;
    /** @type {?} */
    NoFrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    NoFrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    NoFrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    NoFrameworkComponent.prototype.data;
    /** @type {?} */
    NoFrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    NoFrameworkComponent.prototype.jsf;
}
//# sourceMappingURL=no-framework.component.js.map