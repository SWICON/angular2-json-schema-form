import { Injectable } from '@angular/core';
import { AddReferenceComponent } from './add-reference.component';
import { ButtonComponent } from './button.component';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxesComponent } from './checkboxes.component';
import { FileComponent } from './file.component';
import { InputComponent } from './input.component';
import { MessageComponent } from './message.component';
import { NoneComponent } from './none.component';
import { NumberComponent } from './number.component';
import { RadiosComponent } from './radios.component';
import { RootComponent } from './root.component';
import { SectionComponent } from './section.component';
import { SelectComponent } from './select.component';
import { SelectFrameworkComponent } from './select-framework.component';
import { SelectWidgetComponent } from './select-widget.component';
import { SubmitComponent } from './submit.component';
import { TabsComponent } from './tabs.component';
import { TemplateComponent } from './template.component';
import { TextareaComponent } from './textarea.component';
export class WidgetLibraryService {
    constructor() {
        this.defaultWidget = 'none';
        this.widgetLibrary = {
            // Angular JSON Schema Form administrative widgets
            'none': NoneComponent,
            'root': RootComponent,
            'select-framework': SelectFrameworkComponent,
            'select-widget': SelectWidgetComponent,
            '$ref': AddReferenceComponent,
            // Free-form text HTML 'input' form control widgets <input type="...">
            'email': 'text',
            'integer': 'number',
            'number': NumberComponent,
            'password': 'text',
            'search': 'text',
            'tel': 'text',
            'text': InputComponent,
            'url': 'text',
            // Controlled text HTML 'input' form control widgets <input type="...">
            'color': 'text',
            'date': 'text',
            'datetime': 'text',
            'datetime-local': 'text',
            'month': 'text',
            'range': 'number',
            'time': 'text',
            'week': 'text',
            // Non-text HTML 'input' form control widgets <input type="...">
            // 'button': <input type="button"> not used, use <button> instead
            'checkbox': CheckboxComponent,
            'file': FileComponent,
            'hidden': 'text',
            'image': 'text',
            'radio': 'radios',
            'reset': 'submit',
            'submit': SubmitComponent,
            // Other (non-'input') HTML form control widgets
            'button': ButtonComponent,
            'select': SelectComponent,
            // 'optgroup': TODO: automatically generated by select widgets (how?)
            // 'option': automatically generated by select widgets
            'textarea': TextareaComponent,
            // HTML form control widget sets
            'checkboxes': CheckboxesComponent,
            'checkboxes-inline': 'checkboxes',
            'checkboxbuttons': 'checkboxes',
            'radios': RadiosComponent,
            'radios-inline': 'radios',
            'radiobuttons': 'radios',
            // HTML Layout widgets
            // 'label': automatically added to data widgets
            // 'legend': automatically added to fieldsets
            'section': SectionComponent,
            'div': 'section',
            'fieldset': 'section',
            'flex': 'section',
            // Non-HTML layout widgets
            'array': 'section',
            'tabarray': 'tabs',
            'tab': 'section',
            'tabs': TabsComponent,
            'message': MessageComponent,
            'help': 'message',
            'msg': 'message',
            'html': 'message',
            'template': TemplateComponent,
            // Widgets included for compatibility with JSON Form API
            'advancedfieldset': 'section',
            'authfieldset': 'section',
            'optionfieldset': 'section',
            'selectfieldset': 'section',
            'conditional': 'section',
            'actions': 'section',
            'tagsinput': 'section',
            // See: http://ulion.github.io/jsonform/playground/?example=fields-checkboxbuttons
            // Widgets included for compatibility with React JSON Schema Form API
            'updown': 'number',
            'date-time': 'text',
            'alt-datetime': 'text',
            'alt-date': 'text',
            // Widgets included for compatibility with Angular Schema Form API
            'wizard': 'section',
        };
        this.registeredWidgets = {};
        this.frameworkWidgets = {};
        this.activeWidgets = {};
        this.setActiveWidgets();
    }
    /**
     * @return {?}
     */
    setActiveWidgets() {
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        for (let /** @type {?} */ widgetName of Object.keys(this.activeWidgets)) {
            let /** @type {?} */ widget = this.activeWidgets[widgetName];
            // Resolve aliases
            if (typeof widget === 'string') {
                let /** @type {?} */ usedAliases = [];
                while (typeof widget === 'string' && usedAliases.indexOf(widget) === -1) {
                    usedAliases.push(widget);
                    widget = this.activeWidgets[widget];
                }
                if (typeof widget !== 'string') {
                    this.activeWidgets[widgetName] = widget;
                }
            }
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setDefaultWidget(type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    }
    /**
     * @param {?} type
     * @param {?=} widgetSet
     * @return {?}
     */
    hasWidget(type, widgetSet = 'activeWidgets') {
        if (!type || typeof type !== 'string') {
            return false;
        }
        return this[widgetSet].hasOwnProperty(type);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasDefaultWidget(type) {
        return this.hasWidget(type, 'widgetLibrary');
    }
    /**
     * @param {?} type
     * @param {?} widget
     * @return {?}
     */
    registerWidget(type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        this.setActiveWidgets();
        return true;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    unRegisterWidget(type) {
        if (!type || typeof type !== 'string' ||
            !this.registeredWidgets.hasOwnProperty(type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        this.setActiveWidgets();
        return true;
    }
    /**
     * @param {?=} unRegisterFrameworkWidgets
     * @return {?}
     */
    unRegisterAllWidgets(unRegisterFrameworkWidgets = true) {
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        this.setActiveWidgets();
        return true;
    }
    /**
     * @param {?} widgets
     * @return {?}
     */
    registerFrameworkWidgets(widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            return false;
        }
        this.frameworkWidgets = widgets;
        this.setActiveWidgets();
        return true;
    }
    /**
     * @return {?}
     */
    unRegisterFrameworkWidgets() {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            this.setActiveWidgets();
        }
        return true;
    }
    /**
     * @param {?=} type
     * @param {?=} widgetSet
     * @return {?}
     */
    getWidget(type, widgetSet = 'activeWidgets') {
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    getAllWidgets() {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    }
}
WidgetLibraryService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WidgetLibraryService.ctorParameters = () => [];
function WidgetLibraryService_tsickle_Closure_declarations() {
    /** @type {?} */
    WidgetLibraryService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WidgetLibraryService.ctorParameters;
    /** @type {?} */
    WidgetLibraryService.prototype.defaultWidget;
    /** @type {?} */
    WidgetLibraryService.prototype.widgetLibrary;
    /** @type {?} */
    WidgetLibraryService.prototype.registeredWidgets;
    /** @type {?} */
    WidgetLibraryService.prototype.frameworkWidgets;
    /** @type {?} */
    WidgetLibraryService.prototype.activeWidgets;
}
//# sourceMappingURL=widget-library.service.js.map