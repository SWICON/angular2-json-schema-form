import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialCardComponent {
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
        this.options = this.layoutNode.options || {};
        this.expanded = !this.options.expandable;
    }
    /**
     * @return {?}
     */
    expand() {
        if (this.options.expandable)
            this.expanded = !this.expanded;
    }
}
MaterialCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-card-widget',
                template: `
    <md-card
      [attr.disabled]="options?.readonly"
      [class]="options?.htmlClass"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <md-card-header *ngIf="options?.title || options?.description"
        [class]="options?.labelHtmlClass"
        (click)="expand()">
        <md-card-title *ngIf="options?.title"
          [style.display]="options?.notitle ? 'none' : ''"
          [innerHTML]="options?.title"></md-card-title>
        <md-card-subtitle *ngIf="options?.description">{{options?.description}}</md-card-subtitle>
      </md-card-header>
      <md-card-content>
        <root-widget *ngIf="expanded"
          [formID]="formID"
          [layout]="layoutNode.items"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"
          [isOrderable]="options?.orderable"></root-widget>
      </md-card-content>
    </md-card>`,
                styles: [`
    .expandable > legend:before { content: '▶'; padding-right: .3em; }
    .expanded > legend:before { content: '▼'; padding-right: .2em; }
  `],
            },] },
];
/**
 * @nocollapse
 */
MaterialCardComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialCardComponent.propDecorators = {
    'formID': [{ type: Input },],
    'layoutNode': [{ type: Input },],
    'layoutIndex': [{ type: Input },],
    'dataIndex': [{ type: Input },],
};
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