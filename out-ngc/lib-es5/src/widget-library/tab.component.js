import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var TabComponent = (function () {
    /**
     * @param {?} jsf
     */
    function TabComponent(jsf) {
        this.jsf = jsf;
    }
    /**
     * @return {?}
     */
    TabComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tab-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass\">\n      <root-widget\n        [formID]=\"formID\"\n        [layout]=\"layoutNode.items\"\n        [dataIndex]=\"dataIndex\"\n        [layoutIndex]=\"layoutIndex\"></root-widget>\n    </div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    TabComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    TabComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return TabComponent;
}());
export { TabComponent };
function TabComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TabComponent.ctorParameters;
    /** @type {?} */
    TabComponent.propDecorators;
    /** @type {?} */
    TabComponent.prototype.options;
    /** @type {?} */
    TabComponent.prototype.formID;
    /** @type {?} */
    TabComponent.prototype.layoutNode;
    /** @type {?} */
    TabComponent.prototype.layoutIndex;
    /** @type {?} */
    TabComponent.prototype.dataIndex;
    /** @type {?} */
    TabComponent.prototype.jsf;
}
//# sourceMappingURL=tab.component.js.map