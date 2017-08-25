import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SelectFrameworkComponent = (function () {
    /**
     * @param {?} componentFactory
     * @param {?} jsf
     */
    function SelectFrameworkComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.updateComponent = function () {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            for (var _i = 0, _a = ['formID', 'layoutNode', 'layoutIndex', 'dataIndex', 'data']; _i < _a.length; _i++) {
                var input = _a[_i];
                this.newComponent.instance[input] = this[input];
            }
        }
    };
    SelectFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-framework-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    SelectFrameworkComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: JsonSchemaFormService, },
    ]; };
    SelectFrameworkComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'data': [{ type: Input },],
        'widgetContainer': [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] },],
    };
    return SelectFrameworkComponent;
}());
export { SelectFrameworkComponent };
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