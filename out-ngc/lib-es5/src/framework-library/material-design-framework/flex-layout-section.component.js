import { Component, Input } from '@angular/core';
var FlexLayoutSectionComponent = (function () {
    function FlexLayoutSectionComponent() {
        this.expanded = true;
    }
    /**
     * @return {?}
     */
    FlexLayoutSectionComponent.prototype.ngOnInit = function () {
        console.log(this.layoutNode.type);
        switch (this.layoutNode.type) {
            case 'fieldset':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            default:// 'div', 'section', 'flex', 'array', 'tab', 'conditional', 'actions', 'tagsinput'
                this.containerType = 'div';
                break;
        }
        this.options = this.layoutNode.options || {};
        this.expanded = !this.options.expandable;
    };
    /**
     * @return {?}
     */
    FlexLayoutSectionComponent.prototype.legendDisplay = function () {
        return this.options.notitle || !this.options.title ? 'none' : '';
    };
    /**
     * @return {?}
     */
    FlexLayoutSectionComponent.prototype.expand = function () {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    };
    /**
     * @param {?} attribute
     * @return {?}
     */
    FlexLayoutSectionComponent.prototype.getFlexAttribute = function (attribute) {
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
    FlexLayoutSectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flex-layout-section-widget',
                    template: "\n    <div *ngIf=\"containerType === 'div'\"\n      [class]=\"options?.htmlClass\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\">\n      <label *ngIf=\"options?.title\"\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"\n        (click)=\"expand()\"></label>\n\n        <flex-layout-root-widget\n          *ngIf=\"expanded\"\n          [formID]=\"formID\"\n          [layout]=\"layoutNode.items\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"\n          [isOrderable]=\"options?.orderable\"\n          [isFlexItem]=\"getFlexAttribute('is-flex')\"\n          [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n          [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n          [style.display]=\"getFlexAttribute('display')\"\n          [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n          [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n          [style.justify-content]=\"getFlexAttribute('justify-content')\"\n          [style.align-items]=\"getFlexAttribute('align-items')\"\n          [style.align-content]=\"getFlexAttribute('align-content')\"\n          [fxLayout]=\"options.fxLayout\"\n          [fxLayoutWrap]=\"options.fxLayoutWrap\"\n          [fxLayoutGap]=\"options.fxLayoutGap\"\n          [fxLayoutAlign]=\"options.fxLayoutAlign\"\n          [attr.fxFlexFill]=\"options.fxLayoutAlign\"></flex-layout-root-widget>\n\n    </div>\n\n    <fieldset *ngIf=\"containerType === 'fieldset'\"\n      [class]=\"options?.htmlClass\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\"\n      [disabled]=\"options?.readonly\">\n      <legend\n        [class]=\"options?.labelHtmlClass\"\n        [style.display]=\"legendDisplay()\"\n        [innerHTML]=\"options?.title\"\n        (click)=\"expand()\"></legend>\n\n        <flex-layout-root-widget\n          *ngIf=\"expanded\"\n          [formID]=\"formID\"\n          [layout]=\"layoutNode.items\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"\n          [isOrderable]=\"options?.orderable\"\n          [isFlexItem]=\"getFlexAttribute('is-flex')\"\n          [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n          [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n          [style.display]=\"getFlexAttribute('display')\"\n          [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n          [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n          [style.justify-content]=\"getFlexAttribute('justify-content')\"\n          [style.align-items]=\"getFlexAttribute('align-items')\"\n          [style.align-content]=\"getFlexAttribute('align-content')\"\n          [fxLayout]=\"options.fxLayout\"\n          [fxLayoutWrap]=\"options.fxLayoutWrap\"\n          [fxLayoutGap]=\"options.fxLayoutGap\"\n          [fxLayoutAlign]=\"options.fxLayoutAlign\"\n          [attr.fxFlexFill]=\"options.fxLayoutAlign\"></flex-layout-root-widget>\n\n    </fieldset>",
                    styles: ["\n    .expandable > legend:before { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before { content: '\u25BC'; padding-right: .2em; }\n  "],
                },] },
    ];
    /**
     * @nocollapse
     */
    FlexLayoutSectionComponent.ctorParameters = function () { return []; };
    FlexLayoutSectionComponent.propDecorators = {
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
    };
    return FlexLayoutSectionComponent;
}());
export { FlexLayoutSectionComponent };
function FlexLayoutSectionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FlexLayoutSectionComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FlexLayoutSectionComponent.ctorParameters;
    /** @type {?} */
    FlexLayoutSectionComponent.propDecorators;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.options;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.expanded;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.containerType;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.formID;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.layoutNode;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.layoutIndex;
    /** @type {?} */
    FlexLayoutSectionComponent.prototype.dataIndex;
}
//# sourceMappingURL=flex-layout-section.component.js.map