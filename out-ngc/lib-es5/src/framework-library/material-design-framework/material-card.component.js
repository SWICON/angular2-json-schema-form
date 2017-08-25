import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialCardComponent = (function () {
    /**
     * @param {?} jsf
     */
    function MaterialCardComponent(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    /**
     * @return {?}
     */
    MaterialCardComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.expanded = !this.options.expandable;
    };
    /**
     * @return {?}
     */
    MaterialCardComponent.prototype.expand = function () {
        if (this.options.expandable)
            this.expanded = !this.expanded;
    };
    MaterialCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-card-widget',
                    template: "\n    <md-card\n      [attr.disabled]=\"options?.readonly\"\n      [class]=\"options?.htmlClass\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\">\n      <md-card-header *ngIf=\"options?.title || options?.description\"\n        [class]=\"options?.labelHtmlClass\"\n        (click)=\"expand()\">\n        <md-card-title *ngIf=\"options?.title\"\n          [style.display]=\"options?.notitle ? 'none' : ''\"\n          [innerHTML]=\"options?.title\"></md-card-title>\n        <md-card-subtitle *ngIf=\"options?.description\">{{options?.description}}</md-card-subtitle>\n      </md-card-header>\n      <md-card-content>\n        <root-widget *ngIf=\"expanded\"\n          [formID]=\"formID\"\n          [layout]=\"layoutNode.items\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"\n          [isOrderable]=\"options?.orderable\"></root-widget>\n      </md-card-content>\n    </md-card>",
                    styles: ["\n    .expandable > legend:before { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before { content: '\u25BC'; padding-right: .2em; }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    MaterialCardComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    MaterialCardComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return MaterialCardComponent;
}());
export { MaterialCardComponent };
function MaterialCardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialCardComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialCardComponent.ctorParameters;
    /** @type {?} */
    MaterialCardComponent.propDecorators;
    /** @type {?} */
    MaterialCardComponent.prototype.options;
    /** @type {?} */
    MaterialCardComponent.prototype.expanded;
    /** @type {?} */
    MaterialCardComponent.prototype.formID;
    /** @type {?} */
    MaterialCardComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialCardComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialCardComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialCardComponent.prototype.jsf;
}
//# sourceMappingURL=material-card.component.js.map