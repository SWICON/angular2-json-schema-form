import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderableDirective } from './orderable.directive';
import { WidgetLibraryService } from './widget-library.service';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { BASIC_WIDGETS } from './index';
var WidgetLibraryModule = (function () {
    function WidgetLibraryModule() {
    }
    WidgetLibraryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule],
                    declarations: BASIC_WIDGETS.concat([OrderableDirective]),
                    exports: BASIC_WIDGETS.concat([OrderableDirective]),
                    entryComponents: BASIC_WIDGETS.slice(),
                    providers: [JsonSchemaFormService, WidgetLibraryService]
                },] },
    ];
    /**
     * @nocollapse
     */
    WidgetLibraryModule.ctorParameters = function () { return []; };
    return WidgetLibraryModule;
}());
export { WidgetLibraryModule };
function WidgetLibraryModule_tsickle_Closure_declarations() {
    /** @type {?} */
    WidgetLibraryModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WidgetLibraryModule.ctorParameters;
}
//# sourceMappingURL=widget-library.module.js.map