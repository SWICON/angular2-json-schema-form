import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class TemplateComponent {
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
        if (!this.newComponent && this.layoutNode.options.template) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.options.template));
        }
        if (this.newComponent) {
            for (let /** @type {?} */ input of ['formID', 'layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
TemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'template-widget',
                template: `<div #widgetContainer></div>`,
            },] },
];
/**
 * @nocollapse
 */
TemplateComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: JsonSchemaFormService, },
];
TemplateComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
    'widgetContainer': [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] },],
};
function TemplateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TemplateComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TemplateComponent.ctorParameters;
    /** @type {?} */
    TemplateComponent.propDecorators;
    /** @type {?} */
    TemplateComponent.prototype.newComponent;
    /** @type {?} */
    TemplateComponent.prototype.formID;
    /** @type {?} */
    TemplateComponent.prototype.layoutNode;
    /** @type {?} */
    TemplateComponent.prototype.layoutIndex;
    /** @type {?} */
    TemplateComponent.prototype.dataIndex;
    /** @type {?} */
    TemplateComponent.prototype.widgetContainer;
    /** @type {?} */
    TemplateComponent.prototype.componentFactory;
    /** @type {?} */
    TemplateComponent.prototype.jsf;
}
//# sourceMappingURL=template.component.js.map