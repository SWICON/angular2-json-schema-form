import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class SectionComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    legendDisplay() {
        return this.options.notitle || !this.options.title ? 'none' : '';
    }
    /**
     * @return {?}
     */
    expand() {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    }
    /**
     * @param {?} attribute
     * @return {?}
     */
    getFlexAttribute(attribute) {
        const /** @type {?} */ flexActive = this.layoutNode.type === 'flex' ||
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
                const /** @type {?} */ index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['row', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    }
}
SectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'section-widget',
                template: `
    <div *ngIf="containerType === 'div'"
      [class]="options?.htmlClass"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <label *ngIf="options?.title"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
        (click)="expand()"></label>

        <root-widget *ngIf="expanded"
          [formID]="formID"
          [layout]="layoutNode.items"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"
          [isOrderable]="options?.orderable"
          [isFlexItem]="getFlexAttribute('is-flex')"
          [data]="data"
          [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
          [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
          [style.display]="getFlexAttribute('display')"
          [style.flex-direction]="getFlexAttribute('flex-direction')"
          [style.flex-wrap]="getFlexAttribute('flex-wrap')"
          [style.justify-content]="getFlexAttribute('justify-content')"
          [style.align-items]="getFlexAttribute('align-items')"
          [style.align-content]="getFlexAttribute('align-content')"></root-widget>

    </div>

    <fieldset *ngIf="containerType === 'fieldset'"
      [class]="options?.htmlClass"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded"
      [disabled]="options?.readonly">
      <legend
        [class]="options?.labelHtmlClass"
        [style.display]="legendDisplay()"
        [innerHTML]="options?.title"
        (click)="expand()"></legend>

        <root-widget *ngIf="expanded"
          [formID]="formID"
          [layout]="layoutNode.items"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"
          [isOrderable]="options?.orderable"
          [isFlexItem]="getFlexAttribute('is-flex')"
          [data]="data"
          [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
          [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
          [style.display]="getFlexAttribute('display')"
          [style.flex-direction]="getFlexAttribute('flex-direction')"
          [style.flex-wrap]="getFlexAttribute('flex-wrap')"
          [style.justify-content]="getFlexAttribute('justify-content')"
          [style.align-items]="getFlexAttribute('align-items')"
          [style.align-content]="getFlexAttribute('align-content')"></root-widget>

    </fieldset>`,
                styles: [`
    .expandable > legend:before { content: '▶'; padding-right: .3em; }
    .expanded > legend:before { content: '▼'; padding-right: .2em; }
  `],
            },] },
];
/**
 * @nocollapse
 */
SectionComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
SectionComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
    'data': [{ type: Input },],
};
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