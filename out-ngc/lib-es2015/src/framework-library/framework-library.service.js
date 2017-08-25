import { Inject, Injectable } from '@angular/core';
import { WidgetLibraryService } from '../widget-library/widget-library.service';
// No framework - unmodified HTML controls, with styles from layout only
import { NoFrameworkComponent } from './no-framework.component';
// Material Design Framework
// https://github.com/angular/material2
import { FlexLayoutRootComponent } from './material-design-framework/flex-layout-root.component';
import { FlexLayoutSectionComponent } from './material-design-framework/flex-layout-section.component';
import { MaterialAddReferenceComponent } from './material-design-framework/material-add-reference.component';
import { MaterialButtonComponent } from './material-design-framework/material-button.component';
import { MaterialButtonGroupComponent } from './material-design-framework/material-button-group.component';
import { MaterialCardComponent } from './material-design-framework/material-card.component';
import { MaterialCheckboxComponent } from './material-design-framework/material-checkbox.component';
import { MaterialCheckboxesComponent } from './material-design-framework/material-checkboxes.component';
import { MaterialDatepickerComponent } from './material-design-framework/material-datepicker.component';
import { MaterialFileComponent } from './material-design-framework/material-file.component';
import { MaterialInputComponent } from './material-design-framework/material-input.component';
import { MaterialNumberComponent } from './material-design-framework/material-number.component';
import { MaterialRadiosComponent } from './material-design-framework/material-radios.component';
import { MaterialSelectComponent } from './material-design-framework/material-select.component';
import { MaterialSliderComponent } from './material-design-framework/material-slider.component';
import { MaterialTabsComponent } from './material-design-framework/material-tabs.component';
import { MaterialTextareaComponent } from './material-design-framework/material-textarea.component';
import { MaterialDesignFrameworkComponent } from './material-design-framework/material-design-framework.component';
// Bootstrap 3 Framework
// https://github.com/valor-software/ng2-bootstrap
import { Bootstrap3FrameworkComponent } from './bootstrap-3-framework.component';
export class FrameworkLibraryService {
    /**
     * @param {?} widgetLibrary
     */
    constructor(widgetLibrary) {
        this.widgetLibrary = widgetLibrary;
        this.activeFramework = null;
        this.loadExternalAssets = false;
        this.defaultFramework = 'material-design';
        this.frameworkLibrary = {
            'no-framework': { framework: NoFrameworkComponent },
            'material-design': {
                framework: MaterialDesignFrameworkComponent,
                widgets: {
                    'root': FlexLayoutRootComponent,
                    'section': FlexLayoutSectionComponent,
                    '$ref': MaterialAddReferenceComponent,
                    'number': MaterialNumberComponent,
                    'slider': MaterialSliderComponent,
                    'text': MaterialInputComponent,
                    'date': MaterialDatepickerComponent,
                    'file': MaterialFileComponent,
                    'checkbox': MaterialCheckboxComponent,
                    'button': MaterialButtonComponent,
                    'buttonGroup': MaterialButtonGroupComponent,
                    'select': MaterialSelectComponent,
                    'textarea': MaterialTextareaComponent,
                    'checkboxes': MaterialCheckboxesComponent,
                    'radios': MaterialRadiosComponent,
                    'card': MaterialCardComponent,
                    'tabs': MaterialTabsComponent,
                    'alt-date': 'date',
                    'range': 'slider',
                    'submit': 'button',
                    'radiobuttons': 'buttonGroup',
                    'color': 'none',
                    'hidden': 'none',
                    'image': 'none',
                },
                stylesheets: [
                    '//fonts.googleapis.com/icon?family=Material+Icons',
                    '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
                ],
            },
            'bootstrap-3': {
                framework: Bootstrap3FrameworkComponent,
                stylesheets: [
                    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
                ],
                scripts: [
                    // '//code.jquery.com/jquery-2.1.1.min.js',
                    '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
                    // '//code.jquery.com/ui/1.12.1/jquery-ui.min.js',
                    '//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
                    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                ],
            }
        };
    }
    /**
     * @param {?} framework
     * @return {?}
     */
    registerFrameworkWidgets(framework) {
        if (framework.hasOwnProperty('widgets')) {
            this.widgetLibrary.registerFrameworkWidgets(framework.widgets);
            return true;
        }
        this.widgetLibrary.unRegisterFrameworkWidgets();
        return false;
    }
    /**
     * @param {?=} loadExternalAssets
     * @return {?}
     */
    setLoadExternalAssets(loadExternalAssets = true) {
        this.loadExternalAssets = !!loadExternalAssets;
    }
    /**
     * @param {?=} framework
     * @param {?=} loadExternalAssets
     * @return {?}
     */
    setFramework(framework, loadExternalAssets = this.loadExternalAssets) {
        if (!framework)
            return false;
        let /** @type {?} */ validNewFramework = false;
        if (!framework || framework === 'default') {
            this.activeFramework = this.frameworkLibrary[this.defaultFramework];
            validNewFramework = true;
        }
        else if (typeof framework === 'string' && this.hasFramework(framework)) {
            this.activeFramework = this.frameworkLibrary[framework];
            validNewFramework = true;
        }
        else if (typeof framework === 'object' && framework.hasOwnProperty('framework')) {
            this.activeFramework = framework;
            validNewFramework = true;
        }
        if (validNewFramework) {
            this.registerFrameworkWidgets(this.activeFramework);
        }
        return validNewFramework;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasFramework(type) {
        if (!type || typeof type !== 'string')
            return false;
        return this.frameworkLibrary.hasOwnProperty(type);
    }
    /**
     * @return {?}
     */
    getFramework() {
        if (!this.activeFramework)
            this.setFramework('default', true);
        return this.activeFramework.framework;
    }
    /**
     * @return {?}
     */
    getFrameworkWidgets() {
        return this.activeFramework.widgets || {};
    }
    /**
     * @param {?=} load
     * @return {?}
     */
    getFrameworkStylesheets(load = this.loadExternalAssets) {
        return load ? this.activeFramework.stylesheets || [] : [];
    }
    /**
     * @param {?=} load
     * @return {?}
     */
    getFrameworkScripts(load = this.loadExternalAssets) {
        return load ? this.activeFramework.scripts || [] : [];
    }
}
FrameworkLibraryService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FrameworkLibraryService.ctorParameters = () => [
    { type: WidgetLibraryService, decorators: [{ type: Inject, args: [WidgetLibraryService,] },] },
];
function FrameworkLibraryService_tsickle_Closure_declarations() {
    /** @type {?} */
    FrameworkLibraryService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FrameworkLibraryService.ctorParameters;
    /** @type {?} */
    FrameworkLibraryService.prototype.activeFramework;
    /** @type {?} */
    FrameworkLibraryService.prototype.stylesheets;
    /** @type {?} */
    FrameworkLibraryService.prototype.scripts;
    /** @type {?} */
    FrameworkLibraryService.prototype.loadExternalAssets;
    /** @type {?} */
    FrameworkLibraryService.prototype.defaultFramework;
    /** @type {?} */
    FrameworkLibraryService.prototype.frameworkLibrary;
    /** @type {?} */
    FrameworkLibraryService.prototype.widgetLibrary;
}
//# sourceMappingURL=framework-library.service.js.map