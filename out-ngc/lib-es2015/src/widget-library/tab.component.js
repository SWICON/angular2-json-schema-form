import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class TabComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'tab-widget',
                template: `
    <div
      [class]="options?.htmlClass">
      <root-widget
        [formID]="formID"
        [layout]="layoutNode.items"
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"></root-widget>
    </div>`,
            },] },
];
/**
 * @nocollapse
 */
TabComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
TabComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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