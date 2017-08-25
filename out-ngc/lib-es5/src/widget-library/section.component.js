import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SectionComponent = (function () {
    /**
     * @param {?} jsf
     */
    function SectionComponent(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    /**
     * @return {?}
     */
    SectionComponent.prototype.ngOnInit = function () {
        switch (this.layoutNode.type) {
            case 'fieldset':
            case 'array':
            case 'tab':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            default:// 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
                this.containerType = 'div';
                break;
        }
        this.options = this.layoutNode.options || {};
        this.expanded = !this.options.expandable;
    };
    /**
     * @return {?}
     */
    SectionComponent.prototype.legendDisplay = function () {
        return this.options.notitle || !this.options.title ? 'none' : '';
    };
    /**
     * @return {?}
     */
    SectionComponent.prototype.expand = function () {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    };
    /**
     * @param {?} attribute
     * @return {?}
     */
    SectionComponent.prototype.getFlexAttribute = function (attribute) {
        var /** @type {?} */ flexActive = this.layoutNode.type === 'flex' ||
            !!this.options.displayFlex ||
            this.options.display === 'flex';
        if (attribute !== 'flex' && !flexActive) {
            return null;
        }
        switch (attribute) {
            case 'is-flex':
                return flexActive;
            case 'display':
                return flexActive ? 'flex' : 'initial';
            case 'flex-direction':
            case 'flex-wrap':
                var /** @type {?} */ index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['row', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    };
    SectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'section-widget',
                    template: "\n    <div *ngIf=\"containerType === 'div'\"\n      [class]=\"options?.htmlClass\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\">\n      <label *ngIf=\"options?.title\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"\n        (click)=\"expand()\"></label>\n\n        <root-widget *ngIf=\"expanded\"\n          [formID]=\"formID\"\n          [layout]=\"layoutNode.items\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"\n          [isOrderable]=\"options?.orderable\"\n          [isFlexItem]=\"getFlexAttribute('is-flex')\"\n          [data]=\"data\"\n          [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n          [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n          [style.display]=\"getFlexAttribute('display')\"\n          [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n          [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n          [style.justify-content]=\"getFlexAttribute('justify-content')\"\n          [style.align-items]=\"getFlexAttribute('align-items')\"\n          [style.align-content]=\"getFlexAttribute('align-content')\"></root-widget>\n\n    </div>\n\n    <fieldset *ngIf=\"containerType === 'fieldset'\"\n      [class]=\"options?.htmlClass\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\"\n      [disabled]=\"options?.readonly\">\n      <legend\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"legendDisplay()\"\n        [innerHTML]=\"options?.title\"\n        (click)=\"expand()\"></legend>\n\n        <root-widget *ngIf=\"expanded\"\n          [formID]=\"formID\"\n          [layout]=\"layoutNode.items\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"\n          [isOrderable]=\"options?.orderable\"\n          [isFlexItem]=\"getFlexAttribute('is-flex')\"\n          [data]=\"data\"\n          [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n          [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n          [style.display]=\"getFlexAttribute('display')\"\n          [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n          [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n          [style.justify-content]=\"getFlexAttribute('justify-content')\"\n          [style.align-items]=\"getFlexAttribute('align-items')\"\n          [style.align-content]=\"getFlexAttribute('align-content')\"></root-widget>\n\n    </fieldset>",
                    styles: ["\n    .expandable > legend:before { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before { content: '\u25BC'; padding-right: .2em; }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    SectionComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService, },
    ]; };
    SectionComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'data': [{ type: Input },],
    };
    return SectionComponent;
}());
export { SectionComponent };
function SectionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SectionComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SectionComponent.ctorParameters;
    /** @type {?} */
    SectionComponent.propDecorators;
    /** @type {?} */
    SectionComponent.prototype.options;
    /** @type {?} */
    SectionComponent.prototype.expanded;
    /** @type {?} */
    SectionComponent.prototype.containerType;
    /** @type {?} */
    SectionComponent.prototype.formID;
    /** @type {?} */
    SectionComponent.prototype.layoutNode;
    /** @type {?} */
    SectionComponent.prototype.layoutIndex;
    /** @type {?} */
    SectionComponent.prototype.dataIndex;
    /** @type {?} */
    SectionComponent.prototype.data;
    /** @type {?} */
    SectionComponent.prototype.jsf;
}
//# sourceMappingURL=section.component.js.map