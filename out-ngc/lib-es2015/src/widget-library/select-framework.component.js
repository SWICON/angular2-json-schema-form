import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class SelectFrameworkComponent {
    /**
     * @param {?} componentFactory
     * @param {?} jsf
     */
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateComponent();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.updateComponent();
    }
    /**
     * @return {?}
     */
    updateComponent() {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            for (let /** @type {?} */ input of ['formID', 'layoutNode', 'layoutIndex', 'dataIndex', 'data']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
SelectFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-framework-widget',
                template: `<div #widgetContainer></div>`,
            },] },
];
/**
 * @nocollapse
 */
SelectFrameworkComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: JsonSchemaFormService, },
];
SelectFrameworkComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
    'data': [{ type: Input },],
    'widgetContainer': [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] },],
};
function SelectFrameworkComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectFrameworkComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SelectFrameworkComponent.ctorParameters;
    /** @type {?} */
    SelectFrameworkComponent.propDecorators;
    /** @type {?} */
    SelectFrameworkComponent.prototype.newComponent;
    /** @type {?} */
    SelectFrameworkComponent.prototype.formID;
    /** @type {?} */
    SelectFrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    SelectFrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectFrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    SelectFrameworkComponent.prototype.data;
    /** @type {?} */
    SelectFrameworkComponent.prototype.widgetContainer;
    /** @type {?} */
    SelectFrameworkComponent.prototype.componentFactory;
    /** @type {?} */
    SelectFrameworkComponent.prototype.jsf;
}
//# sourceMappingURL=select-framework.component.js.map