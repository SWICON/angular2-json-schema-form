import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { JsonPointer } from '../shared/jsonpointer.functions';
/**
 * OrderableDirective

Enables array elements to be reordered by dragging and dropping.

Only works for arrays that have at least two elements.

Also detects arrays-within-arrays, and correctly moves either
the child array element or the parent array element,
depending on the drop targert.
 */
var OrderableDirective = (function () {
    /**
     * @param {?} elementRef
     * @param {?} jsf
     */
    function OrderableDirective(elementRef, jsf) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.listen = false;
        this.overParentElement = false;
        this.overChildElement = false;
    }
    /**
     * @return {?}
     */
    OrderableDirective.prototype.ngOnInit = function () {
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayPointer = JsonPointer.compile(JsonPointer.parse(this.jsf.getLayoutPointer(this)).slice(0, -1));
            this.listen = true;
        }
    };
    /**
     * Listeners for movable element being dragged:
    
    dragstart: add 'dragging' class to element, set effectAllowed = 'move'
    dragover: set dropEffect = 'move'
    dragend: remove 'dragging' class from element
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDragStart = function (event) {
        if (this.listen) {
            this.element.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            // Hack to bypass stupid HTML drag-and-drop dataTransfer protection
            // so drag source info will be available on dragenter
            sessionStorage.setItem(this.arrayPointer, this.dataIndex[this.dataIndex.length - 1] + '');
            event.dataTransfer.setData('text/plain', this.dataIndex[this.dataIndex.length - 1] + this.arrayPointer);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDragOver = function (event) {
        if (event.preventDefault)
            event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDragEnd = function (event) {
        event.preventDefault();
        if (this.listen) {
            this.element.classList.remove('dragging');
        }
    };
    /**
     * Listeners for stationary items being dragged over:
    
    dragenter: add 'drag-target-...' classes to element
    dragleave: remove 'drag-target-...' classes from element
    drop: remove 'drag-target-...' classes from element, move dropped array item
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDragEnter = function (event) {
        // Part 1 of a hack, inspired by Dragster, to simulate mouseover and mouseout
        // behavior while dragging items - http://bensmithett.github.io/dragster/
        if (this.overParentElement) {
            return this.overChildElement = true;
        }
        else {
            this.overParentElement = true;
        }
        if (this.listen) {
            var /** @type {?} */ sourceArrayIndex = sessionStorage.getItem(this.arrayPointer);
            if (sourceArrayIndex !== null) {
                if (this.dataIndex[this.dataIndex.length - 1] < +sourceArrayIndex) {
                    this.element.classList.add('drag-target-top');
                }
                else if (this.dataIndex[this.dataIndex.length - 1] > +sourceArrayIndex) {
                    this.element.classList.add('drag-target-bottom');
                }
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDragLeave = function (event) {
        // Part 2 of the Dragster hack
        if (this.overChildElement) {
            this.overChildElement = false;
        }
        else if (this.overParentElement) {
            this.overParentElement = false;
        }
        if (!this.overParentElement && !this.overChildElement && this.listen) {
            this.element.classList.remove('drag-target-top');
            this.element.classList.remove('drag-target-bottom');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OrderableDirective.prototype.onDrop = function (event) {
        if (this.listen) {
            this.element.classList.remove('drag-target-top');
            this.element.classList.remove('drag-target-bottom');
            // Confirm that drop target is another item in the same array as source item
            var /** @type {?} */ sourceArrayIndex = +sessionStorage.getItem(this.arrayPointer);
            if (sourceArrayIndex !== this.dataIndex[this.dataIndex.length - 1]) {
                // Move array item
                this.jsf.moveArrayItem(this, sourceArrayIndex, this.dataIndex[this.dataIndex.length - 1]);
            }
            sessionStorage.removeItem(this.arrayPointer);
        }
        return false;
    };
    OrderableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[orderable]',
                },] },
    ];
    /**
     * @nocollapse
     */
    OrderableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: JsonSchemaFormService, },
    ]; };
    OrderableDirective.propDecorators = {
        'orderable': [{ type: Input },],
        'formID': [{ type: Input },],
        'layoutNode': [{ type: Input },],
        'layoutIndex': [{ type: Input },],
        'dataIndex': [{ type: Input },],
        'onDragStart': [{ type: HostListener, args: ['dragstart', ['$event'],] },],
        'onDragOver': [{ type: HostListener, args: ['dragover', ['$event'],] },],
        'onDragEnd': [{ type: HostListener, args: ['dragend', ['$event'],] },],
        'onDragEnter': [{ type: HostListener, args: ['dragenter', ['$event'],] },],
        'onDragLeave': [{ type: HostListener, args: ['dragleave', ['$event'],] },],
        'onDrop': [{ type: HostListener, args: ['drop', ['$event'],] },],
    };
    return OrderableDirective;
}());
export { OrderableDirective };
function OrderableDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    OrderableDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OrderableDirective.ctorParameters;
    /** @type {?} */
    OrderableDirective.propDecorators;
    /** @type {?} */
    OrderableDirective.prototype.arrayPointer;
    /** @type {?} */
    OrderableDirective.prototype.listen;
    /** @type {?} */
    OrderableDirective.prototype.element;
    /** @type {?} */
    OrderableDirective.prototype.overParentElement;
    /** @type {?} */
    OrderableDirective.prototype.overChildElement;
    /** @type {?} */
    OrderableDirective.prototype.orderable;
    /** @type {?} */
    OrderableDirective.prototype.formID;
    /** @type {?} */
    OrderableDirective.prototype.layoutNode;
    /** @type {?} */
    OrderableDirective.prototype.layoutIndex;
    /** @type {?} */
    OrderableDirective.prototype.dataIndex;
    /** @type {?} */
    OrderableDirective.prototype.elementRef;
    /** @type {?} */
    OrderableDirective.prototype.jsf;
}
//# sourceMappingURL=orderable.directive.js.map