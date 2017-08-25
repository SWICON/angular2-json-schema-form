import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SelectWidgetComponent = (function () {
    /**
     * @param {?} componentFactory
     * @param {?} jsf
     */
    function SelectWidgetComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    /**
     * @return {?}
     */
    SelectWidgetComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectWidgetComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectWidgetComponent.prototype.updateComponent = function () {
        if (!this.newComponent && this.layoutNode.widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
        }
        if (this.newComponent) {
            for (var _i = 0, _a = ['formID', 'layoutNode', 'layoutIndex', 'dataIndex', 'data']; _i < _a.length; _i++) {
                var input = _a[_i];
                this.newComponent.instance[input] = this[input];
            }
        }
    };
    SelectWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /**
     * @nocollapse
     */
    SelectWidgetComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: JsonSchemaFormService, },
    ]; };
    SelectWidgetComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'data': [{ type: Input },],
        'widgetContainer': [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] },],
    };
    return SelectWidgetComponent;
}());
export { SelectWidgetComponent };
function SelectWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectWidgetComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SelectWidgetComponent.ctorParameters;
    /** @type {?} */
    SelectWidgetComponent.propDecorators;
    /** @type {?} */
    SelectWidgetComponent.prototype.newComponent;
    /** @type {?} */
    SelectWidgetComponent.prototype.formID;
    /** @type {?} */
    SelectWidgetComponent.prototype.layoutNode;
    /** @type {?} */
    SelectWidgetComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectWidgetComponent.prototype.dataIndex;
    /** @type {?} */
    SelectWidgetComponent.prototype.data;
    /** @type {?} */
    SelectWidgetComponent.prototype.widgetContainer;
    /** @type {?} */
    SelectWidgetComponent.prototype.componentFactory;
    /** @type {?} */
    SelectWidgetComponent.prototype.jsf;
}
//# sourceMappingURL=select-widget.component.js.map