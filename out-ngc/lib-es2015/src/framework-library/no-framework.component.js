import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class NoFrameworkComponent {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnChanges() { }
}
NoFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'none-framework',
                template: `
    <select-widget-widget
      [formID]="formID"
      [layoutNode]="layoutNode"
      [dataIndex]="dataIndex"
      [layoutIndex]="layoutIndex"
      [data]="data"></select-widget-widget>`,
            },] },
];
/**
 * @nocollapse
 */
NoFrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: JsonSchemaFormService, },
];
NoFrameworkComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
    'data': [{ type: Input },],
};
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