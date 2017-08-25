import * as _ from 'lodash/index';
import { inArray, isArray, isEmpty, isNumber, isObject, isDefined, isString } from './validator.functions';
import { copy, forEach, hasOwn, toTitleCase } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { getFromSchema, getInputType, checkInlineType, isInputRequired, updateInputOptions } from './json-schema.functions';
import { buildFormGroupTemplate, getControl } from './form-group.functions';
/**
 * 'buildLayout' function

\@param {any} jsf
\@return {any[]}
 * @param {?} jsf
 * @param {?} widgetLibrary
 * @return {?}
 */
export function buildLayout(jsf, widgetLibrary) {
    var /** @type {?} */ hasSubmitButton = !JsonPointer.get(jsf, '/globalOptions/addSubmit');
    var /** @type {?} */ formLayout = mapLayout(jsf.layout, function (layoutItem, index, layoutPointer) {
        var /** @type {?} */ currentIndex = index;
        var /** @type {?} */ newNode = {};
        if (isObject(layoutItem)) {
            newNode = layoutItem;
        }
        else if (JsonPointer.isJsonPointer(layoutItem)) {
            newNode.dataPointer = layoutItem;
        }
        else if (isString(layoutItem)) {
            newNode.key = layoutItem;
        }
        else {
            console.error('buildLayout error: Form layout element not recognized:');
            console.error(layoutItem);
            return null;
        }
        Object.assign(newNode, {
            _id: _.uniqueId(),
            layoutPointer: layoutPointer.replace(/\/\d+/g, '/-'),
            options: {},
        });
        var /** @type {?} */ itemSchema = null;
        // If newNode does not have a dataPointer, try to find an equivalent
        if (!hasOwn(newNode, 'dataPointer')) {
            // If newNode has a key, change it to a dataPointer
            if (hasOwn(newNode, 'key')) {
                if (newNode.key === '*') {
                    newNode.dataPointer = newNode.key;
                }
                else if (JsonPointer.isJsonPointer(newNode.key)) {
                    newNode.dataPointer = JsonPointer.compile(newNode.key);
                }
                else {
                    newNode.dataPointer =
                        JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-');
                }
                delete newNode.key;
                // If newNode is an array, search for dataPointer in child nodes
            }
            else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
                var /** @type {?} */ findDataPointer_1 = function (items) {
                    if (items === null || typeof items !== 'object') {
                        return;
                    }
                    if (hasOwn(items, 'dataPointer')) {
                        return items.dataPointer;
                    }
                    if (isArray(items.items)) {
                        for (var _i = 0, _a = items.items; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (hasOwn(item, 'dataPointer') &&
                                item.dataPointer.indexOf('/-') !== -1) {
                                return item.dataPointer;
                            }
                            if (hasOwn(item, 'items')) {
                                var /** @type {?} */ searchItem = findDataPointer_1(item);
                                if (searchItem) {
                                    return searchItem;
                                }
                            }
                        }
                    }
                };
                var /** @type {?} */ childDataPointer = findDataPointer_1(newNode);
                if (childDataPointer) {
                    newNode.dataPointer =
                        childDataPointer.slice(0, childDataPointer.lastIndexOf('/-'));
                }
            }
        }
        if (hasOwn(newNode, 'dataPointer')) {
            if (newNode.dataPointer === '*') {
                return buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer.slice(0, -2));
            }
            newNode.dataPointer =
                JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap);
            var /** @type {?} */ LastKey = JsonPointer.toKey(newNode.dataPointer);
            if (isString(LastKey) && LastKey !== '-') {
                newNode.name = LastKey;
            }
            if (!jsf.dataMap.has(newNode.dataPointer)) {
                jsf.dataMap.set(newNode.dataPointer, new Map);
            }
            else if (jsf.dataMap.get(newNode.dataPointer).has('schemaPointer')) {
                itemSchema = JsonPointer.get(jsf.schema, jsf.dataMap.get(newNode.dataPointer).get('schemaPointer'));
            }
            else {
                itemSchema = getFromSchema(jsf.schema, newNode.dataPointer);
            }
            if (itemSchema) {
                if (!hasOwn(newNode, 'type')) {
                    newNode.type = getInputType(itemSchema, newNode);
                }
                else if (!widgetLibrary.hasWidget(newNode.type)) {
                    var /** @type {?} */ oldWidgetType = newNode.type;
                    newNode.type = getInputType(itemSchema, newNode);
                    console.error('error: widget type "' + oldWidgetType +
                        '" not found in library. Replacing with "' + newNode.type + '".');
                }
                else {
                    newNode.type = checkInlineType(newNode.type, itemSchema, newNode);
                }
                newNode.dataType = itemSchema.type;
                updateInputOptions(newNode, itemSchema, jsf);
                // Present checkboxes as single control, rather than array
                if (newNode.type === 'checkboxes' && hasOwn(itemSchema, 'items')) {
                    updateInputOptions(newNode, itemSchema.items, jsf);
                }
                else if (itemSchema.type === 'array' && hasOwn(itemSchema, 'items')) {
                    if (isArray(itemSchema.items)) {
                        newNode.tupleItems = itemSchema.items.length;
                        if (hasOwn(itemSchema, 'additionalItems')) {
                            newNode.listItems = hasOwn(itemSchema, 'maxItems') ?
                                itemSchema.maxItems - itemSchema.items.length : true;
                        }
                        else {
                            newNode.listItems = false;
                        }
                    }
                    else {
                        newNode.tupleItems = false;
                        newNode.listItems = itemSchema.maxItems || true;
                    }
                }
                if (!newNode.options.title && newNode.options.legend) {
                    newNode.options.title = newNode.options.legend;
                }
                else if (!newNode.options.title && !/^\d+$/.test(newNode.name)) {
                    newNode.options.title = toTitleCase(newNode.name.replace(/_/g, ' '));
                }
                if (isInputRequired(jsf.schema, newNode.dataPointer)) {
                    newNode.options.required = true;
                    jsf.fieldsRequired = true;
                }
            }
            else {
                // TODO: create item in FormGroup model from layout key (?)
                updateInputOptions(newNode, {}, jsf);
            }
            if (hasOwn(newNode.options, 'copyValueTo')) {
                if (typeof newNode.options.copyValueTo === 'string') {
                    newNode.options.copyValueTo = [newNode.options.copyValueTo];
                }
                if (isArray(newNode.options.copyValueTo)) {
                    newNode.options.copyValueTo = newNode.options.copyValueTo.map(function (item) {
                        return JsonPointer.isJsonPointer(item) ?
                            JsonPointer.compile(item) :
                            JsonPointer.compile(JsonPointer.parseObjectPath(item), '-');
                    });
                }
            }
            newNode.widget = widgetLibrary.getWidget(newNode.type);
            jsf.dataMap.get(newNode.dataPointer).set('inputType', newNode.type);
            jsf.dataMap.get(newNode.dataPointer).set('widget', newNode.widget);
            if (newNode.dataType === 'array' && hasOwn(newNode, 'items')) {
                if (newNode.options.required && !newNode.minItems) {
                    newNode.minItems = 1;
                }
                var /** @type {?} */ arrayPointer = newNode.dataPointer + '/-';
                if (!jsf.dataMap.has(arrayPointer)) {
                    jsf.dataMap.set(arrayPointer, new Map);
                }
                jsf.dataMap.get(arrayPointer).set('inputType', 'section');
                // Fix insufficiently nested array item groups
                if (newNode.items.length > 1) {
                    var /** @type {?} */ arrayItemGroup = [];
                    var /** @type {?} */ arrayItemGroupTemplate = [];
                    var /** @type {?} */ newIndex = 0;
                    for (var /** @type {?} */ i = newNode.items.length - 1, /** @type {?} */ l = 0; i >= l; i--) {
                        var /** @type {?} */ subItem = newNode.items[i];
                        if (hasOwn(subItem, 'dataPointer') &&
                            subItem.dataPointer.slice(0, arrayPointer.length) === arrayPointer) {
                            var /** @type {?} */ arrayItem = newNode.items.splice(i, 1)[0];
                            var /** @type {?} */ arrayItemTemplate = mapLayout([arrayItem], function (templateItem) {
                                templateItem.layoutPointer = templateItem.layoutPointer
                                    .replace(newNode.layoutPointer, newNode.layoutPointer + '/items/-');
                                return templateItem;
                            })[0];
                            arrayItemGroupTemplate.unshift(arrayItemTemplate);
                            arrayItem.dataPointer = newNode.dataPointer + '/-' +
                                arrayItem.dataPointer.slice(arrayPointer.length);
                            arrayItem.layoutPointer = newNode.layoutPointer + '/items/-/items/-';
                            arrayItemGroup.unshift(arrayItem);
                            newIndex++;
                        }
                        else {
                            subItem.arrayItem = true;
                            // TODO: Check schema to get arrayItemType and removable
                            subItem.arrayItemType = 'list';
                            subItem.removable = newNode.options.removable || !newNode.options.minItems;
                        }
                    }
                    if (arrayItemGroup.length) {
                        newNode.items.push({
                            arrayItem: true,
                            items: arrayItemGroup,
                            layoutPointer: newNode.layoutPointer + '/items/-',
                            options: {
                                arrayItemType: newNode.tupleItems > newNode.items.length ?
                                    'tuple' : 'list',
                                removable: newNode.options.removable !== false &&
                                    (newNode.options.minItems || 0) <= newNode.items.length,
                            },
                            dataPointer: newNode.dataPointer + '/-',
                            type: 'section',
                            widget: widgetLibrary.getWidget('section'),
                        });
                    }
                }
                else {
                    newNode.items[0].arrayItem = true;
                    if (!newNode.items[0].dataPointer) {
                        newNode.items[0].dataPointer =
                            JsonPointer.toGenericPointer(arrayPointer, jsf.arrayMap);
                    }
                    if (newNode.options.minItems) {
                        newNode.items[0].options.removable = false;
                    }
                    else if (!JsonPointer.has(newNode, '/items/0/options/removable')) {
                        newNode.items[0].options.removable = true;
                    }
                    newNode.items[0].options.arrayItemType =
                        newNode.tupleItems ? 'tuple' : 'list';
                }
                // TODO: check maxItems to verify adding new items is OK, and check
                // additionalItems for whether there is a different schema for new items
                if (newNode.options.addable !== false) {
                    jsf.layoutRefLibrary[arrayPointer] =
                        _.cloneDeep(newNode.items[newNode.items.length - 1]);
                    var /** @type {?} */ initialNodeData = JsonPointer.get(jsf.initialValues, newNode.dataPointer);
                    if (isArray(initialNodeData) &&
                        initialNodeData.length > newNode.items.length) {
                        for (var /** @type {?} */ i = newNode.items.length, /** @type {?} */ l = initialNodeData.length; i < l; i++) {
                            newNode.items
                                .push(_.cloneDeep(jsf.layoutRefLibrary[arrayPointer]));
                        }
                    }
                    var /** @type {?} */ buttonText = 'Add';
                    if (newNode.options.title) {
                        buttonText += ' ' + newNode.options.title;
                    }
                    else if (newNode.name && !/^\d+$/.test(newNode.name)) {
                        buttonText += ' ' + toTitleCase(newNode.name.replace(/_/g, ' '));
                        // If newNode doesn't have a title, look for title of parent array item
                    }
                    else {
                        var /** @type {?} */ parentSchema = getFromSchema(jsf.schema, newNode.dataPointer, true);
                        if (hasOwn(parentSchema, 'title')) {
                            buttonText += ' to ' + parentSchema.title;
                        }
                    }
                    var /** @type {?} */ dataPointer = JsonPointer.toGenericPointer(arrayPointer, jsf.arrayMap);
                    var /** @type {?} */ newNodeRef = {
                        arrayItem: true,
                        dataPointer: dataPointer,
                        layoutPointer: newNode.layoutPointer + '/items/-',
                        listItems: newNode.listItems,
                        options: {
                            arrayItemType: 'list',
                            removable: !!newNode.options.removable,
                            title: buttonText,
                        },
                        tupleItems: newNode.tupleItems,
                        type: '$ref',
                        widget: widgetLibrary.getWidget('$ref'),
                        $ref: dataPointer,
                    };
                    if (isDefined(newNode.options.maxItems)) {
                        newNodeRef.options.maxItems = newNode.options.maxItems;
                    }
                    if (isString(JsonPointer.get(newNode, '/style/add'))) {
                        newNodeRef.options.fieldStyle = newNode.style.add;
                        delete newNode.style.add;
                        if (isEmpty(newNode.style)) {
                            delete newNode.style;
                        }
                    }
                    newNode.items.push(newNodeRef);
                }
            }
            else {
                newNode.arrayItem = false;
            }
        }
        else if (hasOwn(newNode, 'type') || hasOwn(newNode, 'items')) {
            var /** @type {?} */ parentType = JsonPointer.get(jsf.layout, layoutPointer, 0, -2).type;
            if (!hasOwn(newNode, 'type')) {
                newNode.type =
                    inArray(parentType, ['tabs', 'tabarray']) ? 'tab' : 'array';
            }
            newNode.arrayItem = parentType === 'array';
            newNode.widget = widgetLibrary.getWidget(newNode.type);
            updateInputOptions(newNode, {}, jsf);
        }
        if (newNode.type === 'submit') {
            hasSubmitButton = true;
        }
        return newNode;
    });
    if (!hasSubmitButton) {
        formLayout.push({
            options: {
                title: 'Submit',
            },
            type: 'submit',
            widget: widgetLibrary.getWidget('submit'),
        });
    }
    return formLayout;
}
/**
 * 'buildLayoutFromSchema' function

\@param {any} jsf -
\@param {number = 0} layoutIndex -
\@param {string = ''} layoutPointer -
\@param {string = ''} schemaPointer -
\@param {string = ''} dataPointer -
\@param {boolean = false} arrayItem -
\@param {string = null} arrayItemType -
\@param {boolean = null} removable -
\@param {boolean = false} forRefLibrary -
\@return {any}
 * @param {?} jsf
 * @param {?} widgetLibrary
 * @param {?=} layoutPointer
 * @param {?=} schemaPointer
 * @param {?=} dataPointer
 * @param {?=} arrayItem
 * @param {?=} arrayItemType
 * @param {?=} removable
 * @param {?=} forRefLibrary
 * @return {?}
 */
export function buildLayoutFromSchema(jsf, widgetLibrary, layoutPointer, schemaPointer, dataPointer, arrayItem, arrayItemType, removable, forRefLibrary) {
    if (layoutPointer === void 0) { layoutPointer = ''; }
    if (schemaPointer === void 0) { schemaPointer = ''; }
    if (dataPointer === void 0) { dataPointer = ''; }
    if (arrayItem === void 0) { arrayItem = false; }
    if (arrayItemType === void 0) { arrayItemType = null; }
    if (removable === void 0) { removable = null; }
    if (forRefLibrary === void 0) { forRefLibrary = false; }
    var /** @type {?} */ schema = JsonPointer.get(jsf.schema, schemaPointer);
    if (!hasOwn(schema, 'type') && !hasOwn(schema, 'x-schema-form') &&
        !hasOwn(schema, '$ref')) {
        return null;
    }
    var /** @type {?} */ newNodeType = getInputType(schema);
    var /** @type {?} */ newNode = {
        _id: _.uniqueId(),
        arrayItem: arrayItem,
        dataPointer: JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap),
        dataType: schema.type || (hasOwn(schema, '$ref') ? '$ref' : null),
        layoutPointer: layoutPointer.replace(/\/\d+/g, '/-') || '/-',
        options: {},
        type: newNodeType,
        widget: widgetLibrary.getWidget(newNodeType),
    };
    var /** @type {?} */ lastDataKey = JsonPointer.toKey(newNode.dataPointer);
    if (lastDataKey !== '-') {
        newNode.name = lastDataKey;
    }
    if (newNode.arrayItem) {
        newNode.options.arrayItemType = arrayItemType;
        newNode.options.removable = removable;
    }
    if (dataPointer !== '') {
        if (!jsf.dataMap.has(newNode.dataPointer)) {
            jsf.dataMap.set(newNode.dataPointer, new Map);
        }
        jsf.dataMap.get(newNode.dataPointer).set('schemaPointer', schemaPointer);
        jsf.dataMap.get(newNode.dataPointer).set('inputType', newNode.type);
        jsf.dataMap.get(newNode.dataPointer).set('widget', newNode.widget);
    }
    updateInputOptions(newNode, schema, jsf);
    if (!newNode.options.title && newNode.options.legend) {
        newNode.options.title = newNode.options.legend;
    }
    else if (!newNode.options.title && newNode.name && !/^\d+$/.test(newNode.name)) {
        newNode.options.title = toTitleCase(newNode.name.replace(/_/g, ' '));
    }
    if (newNode.dataType === 'object') {
        var /** @type {?} */ newSection = [];
        var /** @type {?} */ propertyKeys = [];
        if (isObject(schema.properties)) {
            propertyKeys = schema['ui:order'] ||
                schema.properties['ui:order'] ||
                Object.keys(schema['properties']);
        }
        else if (hasOwn(schema, 'additionalProperties')) {
            return null;
            // TODO: Figure out what to do with additionalProperties
            // ... possibly provide a way to enter both key names and values?
        }
        for (var _i = 0, propertyKeys_1 = propertyKeys; _i < propertyKeys_1.length; _i++) {
            var key = propertyKeys_1[_i];
            if (hasOwn(schema.properties, key)) {
                var /** @type {?} */ newLayoutPointer = void 0;
                if (newNode.layoutPointer === '' && !forRefLibrary) {
                    newLayoutPointer = '/-';
                }
                else {
                    newLayoutPointer = newNode.layoutPointer + '/items/-';
                }
                var /** @type {?} */ innerItem = buildLayoutFromSchema(jsf, widgetLibrary, newLayoutPointer, schemaPointer + '/properties/' + key, dataPointer + '/' + key, false, null, null, forRefLibrary);
                if (innerItem) {
                    if (isInputRequired(schema, '/' + key)) {
                        innerItem.options.required = true;
                        jsf.fieldsRequired = true;
                    }
                    newSection.push(innerItem);
                }
            }
        }
        // if (dataPointer === '' && !forRefLibrary) {
        //   newNode = newSection;
        // } else {
        newNode.items = newSection;
        // }
    }
    else if (newNode.dataType === 'array') {
        newNode.items = [];
        var /** @type {?} */ templateArray = [];
        if (!forRefLibrary) {
            var /** @type {?} */ templateControl = getControl(jsf.formGroupTemplate, dataPointer);
            if (hasOwn(templateControl, 'controls')) {
                templateArray = templateControl['controls'];
            }
        }
        if (!newNode.minItems && isInputRequired(jsf.schema, schemaPointer)) {
            newNode.minItems = 1;
        }
        var /** @type {?} */ minItems_1 = newNode.minItems || 0;
        var /** @type {?} */ maxItems = newNode.maxItems || 1000000;
        if (isDefined(newNode.options.removable)) {
            removable = newNode.options.removable;
        }
        else if (!isDefined(removable)) {
            removable = true;
        }
        var /** @type {?} */ additionalItems = null;
        if (isArray(schema.items)) {
            newNode.tupleItems = schema.items.length;
            if (hasOwn(schema, 'additionalItems')) {
                newNode.listItems = hasOwn(schema, 'maxItems') ?
                    schema.maxItems - schema.items.length : true;
            }
            else {
                newNode.listItems = false;
            }
            newNode.items = _.filter(_.map(schema.items, function (item, i) {
                return buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer + '/items/-', schemaPointer + '/items/' + i, dataPointer + '/' + i, true, 'tuple', removable && i >= minItems_1, forRefLibrary);
            }));
            if (newNode.items.length < maxItems &&
                hasOwn(schema, 'additionalItems') && isObject(schema.additionalItems)) {
                if (newNode.items.length < templateArray.length) {
                    for (var /** @type {?} */ i = newNode.items.length, /** @type {?} */ l = templateArray.length; i < l; i++) {
                        newNode.items.push(buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer + '/items/-', schemaPointer + '/additionalItems', dataPointer + '/' + i, true, 'list', removable && i >= minItems_1, forRefLibrary));
                    }
                }
                else if (newNode.items.length > templateArray.length) {
                    for (var /** @type {?} */ i = templateArray.length, /** @type {?} */ l = newNode.items.length; i < l; i++) {
                        templateArray.push(buildFormGroupTemplate(jsf, null, false, schemaPointer + '/additionalItems', dataPointer + '/' + i, JsonPointer.toControlPointer(jsf.formGroupTemplate, dataPointer + '/' + i)));
                    }
                }
                if (newNode.items.length < maxItems && newNode.options.addable !== false &&
                    JsonPointer.get(newNode.items[newNode.items.length - 1], '/type') !== '$ref') {
                    additionalItems = buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer + '/items/-', schemaPointer + '/additionalItems', dataPointer + '/-', true, 'list', removable, forRefLibrary);
                }
            }
        }
        else {
            newNode.tupleItems = false;
            newNode.listItems = schema.maxItems || true;
            for (var /** @type {?} */ i = 0, /** @type {?} */ l = Math.max(templateArray.length, minItems_1, 1); i < l; i++) {
                newNode.items.push(buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer + '/items/-', schemaPointer + '/items', dataPointer + '/' + i, true, 'list', removable && i >= minItems_1, forRefLibrary));
            }
            if (newNode.items.length < maxItems && newNode.options.addable !== false &&
                JsonPointer.get(newNode.items[newNode.items.length - 1], '/type') !== '$ref') {
                additionalItems = buildLayoutFromSchema(jsf, widgetLibrary, newNode.layoutPointer + '/items/-', schemaPointer + '/items', dataPointer + '/-', true, 'list', removable, forRefLibrary);
            }
        }
        // If addable items, save to layoutRefLibrary, and add $ref item to layout
        if (additionalItems) {
            jsf.layoutRefLibrary[dataPointer + '/-'] = additionalItems;
            delete jsf.layoutRefLibrary[dataPointer + '/-']['key'];
            delete jsf.layoutRefLibrary[dataPointer + '/-']['name'];
            var /** @type {?} */ buttonText = 'Add ';
            if (additionalItems.options.title) {
                buttonText += additionalItems.options.title;
            }
            else if (schema.title) {
                buttonText += 'to ' + schema.title;
            }
            else {
                buttonText += 'to ' +
                    toTitleCase(JsonPointer.toKey(dataPointer).replace(/_/g, ' '));
            }
            var /** @type {?} */ newNodeRef = {
                arrayItem: true,
                dataPointer: dataPointer + '/-',
                layoutPointer: newNode.layoutPointer + '/items/-',
                listItems: newNode.listItems,
                options: {
                    arrayItemType: 'list',
                    removable: false,
                    title: buttonText,
                },
                tupleItems: newNode.tupleItems,
                type: '$ref',
                widget: widgetLibrary.getWidget('$ref'),
                $ref: dataPointer + '/-',
            };
            if (isDefined(newNode.options.maxItems)) {
                newNodeRef.options.maxItems = newNode.options.maxItems;
            }
            newNode.items.push(newNodeRef);
        }
        else if (JsonPointer.get(newNode.items[newNode.items.length - 1], '/type') === '$ref') {
            Object.assign(newNode.items[newNode.items.length - 1], {
                listItems: newNode.listItems,
                tupleItems: newNode.tupleItems,
            });
            if (isNumber(JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems)) {
                newNode.items[newNode.items.length - 1].options.maxItems =
                    JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems;
            }
        }
    }
    else if (newNode.dataType === '$ref') {
        var /** @type {?} */ schemaRef = JsonPointer.compile(schema.$ref);
        var /** @type {?} */ buttonText = 'Add';
        if (newNode.options.title) {
            buttonText += ' ' + newNode.options.title;
        }
        else if (newNode.name && !/^\d+$/.test(newNode.name)) {
            buttonText += ' ' + toTitleCase(newNode.name.replace(/_/g, ' '));
            // If newNode doesn't have a title, look for title of parent array item
        }
        else if (hasOwn(JsonPointer.get(jsf.schema, schemaPointer, 0, -1), 'title')) {
            buttonText += ' to ' +
                JsonPointer.get(jsf.schema, schemaPointer, 0, -1).title;
        }
        Object.assign(newNode, {
            recursiveReference: true,
            widget: widgetLibrary.getWidget('$ref'),
            $ref: schemaRef,
        });
        Object.assign(newNode.options, {
            removable: false,
            title: buttonText,
        });
        if (isNumber(JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems)) {
            newNode.options.maxItems =
                JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems;
        }
        // Build dataRecursiveRefMap
        var /** @type {?} */ genericDataPointer = JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap);
        // TODO: Replace the following by checking to see if the parent element is
        // an array, and only removing the index if allowed
        genericDataPointer = genericDataPointer.replace(/\/\d+$/, '/-');
        if (!forRefLibrary) {
            // Is schema $ref a subset of dataPointer?
            // If yes, map dataPointer and schema $ref as a recursive reference
            if (JsonPointer.isSubPointer(schemaRef, genericDataPointer)) {
                jsf.dataRecursiveRefMap.set(genericDataPointer, schemaRef);
                // If no, add a partial reference now, so a full reference can be added later
            }
            else {
                jsf.dataRecursiveRefMap.set(schemaRef, genericDataPointer);
            }
            // If partial reference already exists,
            // use current and previous dataPointers to create a full reference
        }
        else if (jsf.dataRecursiveRefMap.has(schemaRef) &&
            !jsf.dataRecursiveRefMap.has(jsf.dataRecursiveRefMap.get(schemaRef))) {
            if (genericDataPointer ===
                jsf.dataRecursiveRefMap.get(schemaRef).slice(-genericDataPointer.length)) {
                jsf.dataRecursiveRefMap.set(jsf.dataRecursiveRefMap.get(schemaRef), jsf.dataRecursiveRefMap.get(schemaRef).slice(0, -genericDataPointer.length));
            }
            else {
                jsf.dataRecursiveRefMap.set(jsf.dataRecursiveRefMap.get(schemaRef) + genericDataPointer, jsf.dataRecursiveRefMap.get(schemaRef));
            }
        }
        // Add layout template to layoutRefLibrary
        if (!hasOwn(jsf.layoutRefLibrary, schemaRef)) {
            // Set to null first to prevent recursive reference from causing endless loop
            jsf.layoutRefLibrary[schemaRef] = null;
            var /** @type {?} */ newLayout = buildLayoutFromSchema(jsf, widgetLibrary, '', schemaRef, '', newNode.arrayItem, newNode.arrayItemType, true, true);
            if (newLayout) {
                jsf.layoutRefLibrary[schemaRef] = newLayout;
            }
            else {
                delete jsf.layoutRefLibrary[schemaRef];
            }
        }
    }
    return newNode;
}
/**
 * 'mapLayout' function

Creates a new layout by running each element in an existing layout through
an iteratee. Recursively maps within array elements 'items' and 'tabs'.
The iteratee is invoked with four arguments: (value, index, layout, path)

THe returned layout may be longer (or shorter) then the source layout.

If an item from the source layout returns multiple items (as '*' usually will),
this function will keep all returned items in-line with the surrounding items.

If an item from the source layout causes an error and returns null, it is
simply skipped, and the function will still return all non-null items.

\@param {any[]} layout - the layout to map
\@param {(v: any, i?: number, l?: any, p?: string) => any}
  function - the funciton to invoke on each element
\@param {any = ''} layoutPointer - the layoutPointer to layout, inside rootLayout
\@param {any[] = layout} rootLayout - the root layout, which conatins layout
\@return {[type]}
 * @param {?} layout
 * @param {?} fn
 * @param {?=} layoutPointer
 * @param {?=} rootLayout
 * @return {?}
 */
export function mapLayout(layout, fn, layoutPointer, rootLayout) {
    if (layoutPointer === void 0) { layoutPointer = ''; }
    if (rootLayout === void 0) { rootLayout = layout; }
    var /** @type {?} */ indexPad = 0;
    var /** @type {?} */ newLayout = [];
    forEach(layout, function (item, index) {
        var /** @type {?} */ realIndex = +index + indexPad;
        var /** @type {?} */ newLayoutPointer = layoutPointer + '/' + realIndex;
        var /** @type {?} */ newNode = copy(item);
        var /** @type {?} */ itemsArray = [];
        if (isObject(item)) {
            if (hasOwn(item, 'tabs')) {
                item.items = item.tabs;
                delete item.tabs;
            }
            if (hasOwn(item, 'items')) {
                itemsArray = isArray(item.items) ? item.items : [item.items];
            }
        }
        if (itemsArray.length) {
            newNode.items = mapLayout(itemsArray, fn, newLayoutPointer + '/items', rootLayout);
        }
        newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout);
        if (!isDefined(newNode)) {
            indexPad--;
        }
        else {
            if (isArray(newNode)) {
                indexPad += newNode.length - 1;
            }
            newLayout = newLayout.concat(newNode);
        }
    });
    return newLayout;
}
;
/**
 * 'buildTitleMap' function

\@param {any} titleMap -
\@param {any} enumList -
\@param {boolean = false} fieldRequired -
\@return {{name: string, value: any}[]}
 * @param {?} titleMap
 * @param {?} enumList
 * @param {?=} fieldRequired
 * @return {?}
 */
export function buildTitleMap(titleMap, enumList, fieldRequired) {
    if (fieldRequired === void 0) { fieldRequired = true; }
    var /** @type {?} */ newTitleMap = [];
    var /** @type {?} */ hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                for (var _i = 0, _a = Object.keys(titleMap); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (isObject(titleMap[i])) {
                        var /** @type {?} */ value = titleMap[i].value;
                        if (enumList.indexOf(value) !== -1) {
                            var /** @type {?} */ name_1 = titleMap[i].name;
                            newTitleMap.push({ name: name_1, value: value });
                            if (!value) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else if (isString(titleMap[i])) {
                        if (i < enumList.length) {
                            var /** @type {?} */ name_2 = titleMap[i];
                            var /** @type {?} */ value = enumList[i];
                            newTitleMap.push({ name: name_2, value: value });
                            if (!value) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap.filter(function (i) { return !i.value; }).length;
                }
            }
        }
        else if (enumList) {
            for (var _b = 0, _c = Object.keys(enumList); _b < _c.length; _b++) {
                var i = _c[_b];
                var /** @type {?} */ value = enumList[i];
                if (hasOwn(titleMap, value)) {
                    var /** @type {?} */ name_3 = titleMap[value];
                    newTitleMap.push({ name: name_3, value: value });
                    if (!value) {
                        hasEmptyValue = true;
                    }
                }
            }
        }
        else {
            for (var _d = 0, _e = Object.keys(titleMap); _d < _e.length; _d++) {
                var value = _e[_d];
                var /** @type {?} */ name_4 = titleMap[value];
                newTitleMap.push({ name: name_4, value: value });
                if (!value) {
                    hasEmptyValue = true;
                }
            }
        }
    }
    else if (enumList) {
        for (var _f = 0, _g = Object.keys(enumList); _f < _g.length; _f++) {
            var i = _g[_f];
            var /** @type {?} */ name_5 = enumList[i];
            var /** @type {?} */ value = enumList[i];
            newTitleMap.push({ name: name_5, value: value });
            if (!value) {
                hasEmptyValue = true;
            }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '', value: '' });
    }
    return newTitleMap;
}
//# sourceMappingURL=layout.functions.js.map