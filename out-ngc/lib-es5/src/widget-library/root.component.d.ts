import { JsonSchemaFormComponent } from '../json-schema-form.component';
export declare class RootComponent {
    options: any;
    parentComponent: JsonSchemaFormComponent;
    formID: number;
    dataIndex: number[];
    layoutIndex: number[];
    layout: any[];
    isOrderable: boolean;
    isFlexItem: boolean;
    data: any;
    isDraggable(node: any): boolean;
    getFlexAttribute(node: any, attribute: string): any;
    trackByItem(layoutItem: any): any;
    isConditionallyShown(layoutItem: any): boolean;
}
