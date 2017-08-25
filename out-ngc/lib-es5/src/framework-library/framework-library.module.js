import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '../widget-library/widget-library.module';
import { MaterialDesignFrameworkModule } from './material-design-framework/material-design-framework.module';
import { WidgetLibraryService } from '../widget-library/widget-library.service';
import { FrameworkLibraryService } from './framework-library.service';
import { FRAMEWORK_COMPONENTS } from './index';
var FrameworkLibraryModule = (function () {
    function FrameworkLibraryModule() {
    }
    FrameworkLibraryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, WidgetLibraryModule, MaterialDesignFrameworkModule],
                    declarations: FRAMEWORK_COMPONENTS.slice(),
                    exports: FRAMEWORK_COMPONENTS.concat([MaterialDesignFrameworkModule]),
                    entryComponents: FRAMEWORK_COMPONENTS.slice(),
                    providers: [WidgetLibraryService, FrameworkLibraryService]
                },] },
    ];
    /**
     * @nocollapse
     */
    FrameworkLibraryModule.ctorParameters = function () { return []; };
    return FrameworkLibraryModule;
}());
export { FrameworkLibraryModule };
function FrameworkLibraryModule_tsickle_Closure_declarations() {
    /** @type {?} */
    FrameworkLibraryModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FrameworkLibraryModule.ctorParameters;
}
//# sourceMappingURL=framework-library.module.js.map