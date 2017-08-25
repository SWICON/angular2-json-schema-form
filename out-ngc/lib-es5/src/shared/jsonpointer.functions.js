import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap } from './validator.functions';
import { hasOwn, copy } from './utility.functions';
var JsonPointer = (function () {
    function JsonPointer() {
    }
    /**
     * 'get' function
    
    Uses a JSON Pointer to retrieve a value from an object
    
    \@param {object} object - Object to get value from
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@param {number = 0} startSlice - Zero-based index of first Pointer key to use
    \@param {number} endSlice - Zero-based index of last Pointer key to use
    \@param {boolean = false} getBoolean - Return only true or false?
    \@param {boolean = true} errors - Show error if not found?
    \@return {object} - Located value (or true or false if getBoolean = true)
     * @param {?} object
     * @param {?} pointer
     * @param {?=} startSlice
     * @param {?=} endSlice
     * @param {?=} getBoolean
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.get = function (object, pointer, startSlice, endSlice, getBoolean, errors) {
        if (startSlice === void 0) { startSlice = 0; }
        if (endSlice === void 0) { endSlice = null; }
        if (getBoolean === void 0) { getBoolean = false; }
        if (errors === void 0) { errors = false; }
        if (object === null) {
            return getBoolean ? false : undefined;
        }
        var /** @type {?} */ keyArray = this.parse(pointer);
        if (typeof object === 'object' && keyArray !== null) {
            var /** @type {?} */ subObject = object;
            if (startSlice >= keyArray.length || endSlice <= -keyArray.length) {
                return object;
            }
            if (startSlice <= -keyArray.length) {
                startSlice = 0;
            }
            if (!isDefined(endSlice) || endSlice >= keyArray.length) {
                endSlice = keyArray.length;
            }
            keyArray = keyArray.slice(startSlice, endSlice);
            for (var _i = 0, keyArray_1 = keyArray; _i < keyArray_1.length; _i++) {
                var key = keyArray_1[_i];
                if (key === '-' && isArray(subObject) && subObject.length) {
                    key = subObject.length - 1;
                }
                if (typeof subObject === 'object' && subObject !== null &&
                    hasOwn(subObject, key)) {
                    subObject = subObject[key];
                }
                else if (isMap(subObject) && subObject.has(key)) {
                    subObject = subObject.get(key);
                }
                else {
                    if (errors) {
                        console.error('get error: "' + key + '" key not found in object.');
                        console.error(pointer);
                        console.error(object);
                    }
                    return getBoolean ? false : undefined;
                }
            }
            return getBoolean ? true : subObject;
        }
        if (errors && keyArray === null) {
            console.error('get error: Invalid JSON Pointer: ' + pointer);
        }
        if (errors && typeof object !== 'object') {
            console.error('get error: Invalid object:=');
            console.error(object);
        }
        return getBoolean ? false : undefined;
    };
    /**
     * 'getFirst' function
    
    Takes an array of JSON Pointers and objects, and returns the value
    from the first pointer to find a value in its object.
    
    \@param {[object, pointer][]} items - array of objects and pointers to check
    \@param {any} defaultValue - Optional value to return if nothing found
    \@return {any} - first set value
     * @param {?} items
     * @param {?=} defaultValue
     * @return {?}
     */
    JsonPointer.getFirst = function (items, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (isEmpty(items)) {
            return;
        }
        if (isArray(items)) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (isEmpty(item)) {
                    continue;
                }
                if (isArray(item) && item.length >= 2) {
                    if (isEmpty(item[0]) || isEmpty(item[1])) {
                        continue;
                    }
                    var /** @type {?} */ value = this.get(item[0], item[1]);
                    if (value) {
                        return value;
                    }
                    continue;
                }
                console.error('getFirst error: Input not in correct format.\n' +
                    'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
                return;
            }
            return defaultValue;
        }
        if (isMap(items)) {
            for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                var _b = items_2[_a], object = _b[0], pointer = _b[1];
                if (object === null || !this.isJsonPointer(pointer)) {
                    continue;
                }
                var /** @type {?} */ value = this.get(object, pointer);
                if (value) {
                    return value;
                }
            }
            return defaultValue;
        }
        console.error('getFirst error: Input not in correct format.\n' +
            'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
    };
    /**
     * 'set' function
    
    Uses a JSON Pointer to set a value on an object
    
    If the optional fourth parameter is TRUE and the inner-most container
    is an array, the function will insert the value as a new item at the
    specified location in the array, rather than overwriting the existing value
    
    \@param {object} object - The object to set value in
    \@param {Pointer} pointer - The JSON Pointer (string or array)
    \@param {any} value - The value to set
    \@return {object} - The original object, modified with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    JsonPointer.set = function (object, pointer, value, insert) {
        if (insert === void 0) { insert = false; }
        var /** @type {?} */ keyArray = this.parse(pointer);
        if (keyArray !== null) {
            var /** @type {?} */ subObject = object;
            for (var /** @type {?} */ i = 0, /** @type {?} */ l = keyArray.length - 1; i < l; ++i) {
                var /** @type {?} */ key = keyArray[i];
                if (key === '-' && isArray(subObject)) {
                    key = subObject.length;
                }
                if (isMap(subObject) && subObject.has(key)) {
                    subObject = subObject.get(key);
                }
                else {
                    if (!hasOwn(subObject, key)) {
                        subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                    }
                    subObject = subObject[key];
                }
            }
            var /** @type {?} */ lastKey = keyArray[keyArray.length - 1];
            if (isArray(subObject) && lastKey === '-') {
                subObject.push(value);
            }
            else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                subObject.splice(lastKey, 0, value);
            }
            else if (isMap(subObject)) {
                subObject.set(lastKey, value);
            }
            else {
                subObject[lastKey] = value;
            }
            return object;
        }
        console.error('set error: Invalid JSON Pointer: ' + pointer);
    };
    /**
     * 'setCopy' function
    
    Copies an object and uses a JSON Pointer to set a value on the copy.
    
    If the optional fourth parameter is TRUE and the inner-most container
    is an array, the function will insert the value as a new item at the
    specified location in the array, rather than overwriting the existing value.
    
    \@param {object} object - The object to copy and set value in
    \@param {Pointer} pointer - The JSON Pointer (string or array)
    \@param {any} value - The value to set
    \@return {object} - The new object with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    JsonPointer.setCopy = function (object, pointer, value, insert) {
        if (insert === void 0) { insert = false; }
        var /** @type {?} */ keyArray = this.parse(pointer);
        if (keyArray !== null) {
            var /** @type {?} */ newObject = copy(object);
            var /** @type {?} */ subObject = newObject;
            for (var /** @type {?} */ i = 0, /** @type {?} */ l = keyArray.length - 1; i < l; ++i) {
                var /** @type {?} */ key = keyArray[i];
                if (key === '-' && isArray(subObject)) {
                    key = subObject.length;
                }
                if (isMap(subObject) && subObject.has(key)) {
                    subObject.set(key, copy(subObject.get(key)));
                    subObject = subObject.get(key);
                }
                else {
                    if (!hasOwn(subObject, key)) {
                        subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                    }
                    subObject[key] = copy(subObject[key]);
                    subObject = subObject[key];
                }
            }
            var /** @type {?} */ lastKey = keyArray[keyArray.length - 1];
            if (isArray(subObject) && lastKey === '-') {
                subObject.push(value);
            }
            else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                subObject.splice(lastKey, 0, value);
            }
            else if (isMap(subObject)) {
                subObject.set(lastKey, value);
            }
            else {
                subObject[lastKey] = value;
            }
            return newObject;
        }
        console.error('setCopy error: Invalid JSON Pointer: ' + pointer);
    };
    /**
     * 'insert' function
    
    Calls 'set' with insert = TRUE
    
    \@param {object} object - object to insert value in
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@param {any} value - value to insert
    \@return {object}
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    JsonPointer.insert = function (object, pointer, value) {
        this.set(object, pointer, value, true);
    };
    /**
     * 'insertCopy' function
    
    Calls 'setCopy' with insert = TRUE
    
    \@param {object} object - object to insert value in
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@param {any} value - value to insert
    \@return {object}
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    JsonPointer.insertCopy = function (object, pointer, value) {
        this.setCopy(object, pointer, value, true);
    };
    /**
     * 'remove' function
    
    Uses a JSON Pointer to remove a key and its attribute from an object
    
    \@param {object} object - object to delete attribute from
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@return {object}
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.remove = function (object, pointer) {
        var /** @type {?} */ keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            var /** @type {?} */ lastKey = keyArray.pop();
            var /** @type {?} */ parentObject = this.get(object, keyArray);
            if (isArray(parentObject)) {
                if (lastKey === '-') {
                    lastKey = parentObject.length - 1;
                }
                parentObject.splice(lastKey, 1);
            }
            else if (isObject(parentObject)) {
                delete parentObject[lastKey];
            }
            return object;
        }
        console.error('remove error: Invalid JSON Pointer: ' + pointer);
    };
    /**
     * 'has' function
    
    Tests if an object has a value at the location specified by a JSON Pointer
    
    \@param {object} object - object to chek for value
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@return {boolean}
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.has = function (object, pointer) {
        return this.get(object, pointer, 0, null, true);
    };
    /**
     * 'dict' function
    
    Returns a (pointer -> value) dictionary for an object
    
    \@param {Object} object - The object to create a dictionary from
    \@return {Object} - The resulting dictionary object
     * @param {?} object
     * @return {?}
     */
    JsonPointer.dict = function (object) {
        var /** @type {?} */ results = {};
        this.forEachDeep(object, function (value, pointer) {
            if (typeof value !== 'object') {
                results[pointer] = value;
            }
        });
        return results;
    };
    /**
     * 'forEachDeep' function
    
    Iterates over own enumerable properties of an object or items in an array
    and invokes an iteratee function for each key/value or index/value pair.
    By default, iterates over items within objects and arrays after calling
    the iteratee function on the containing object or array itself.
    
    The iteratee is invoked with three arguments: (value, pointer, rootObject),
    where pointer is a JSON pointer indicating the location of the current
    value within the root object, and rootObject is the root object initially
    submitted to th function.
    
    If a third optional parameter 'bottomUp' is set to TRUE, the iterator
    function will be called on sub-objects and arrays after being
    called on their contents, rather than before, which is the default.
    
    This function can also optionally be called directly on a sub-object by
    including optional 4th and 5th parameterss to specify the initial
    root object and pointer.
    
    \@param {object} object - the initial object or array
    \@param {(v: any, k?: string, o?: any, p?: any) => any} function - iteratee function
    \@param {boolean = false} bottomUp - optional, set to TRUE to reverse direction
    \@param {object = object} rootObject - optional, root object or array
    \@param {string = ''} pointer - optional, JSON Pointer to object within rootObject
     * @param {?} object
     * @param {?} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    JsonPointer.forEachDeep = function (object, fn, bottomUp, pointer, rootObject) {
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn === 'function') {
            if (!bottomUp) {
                fn(object, pointer, rootObject);
            }
            if (isObject(object) || isArray(object)) {
                for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var /** @type {?} */ newPointer = pointer + '/' + this.escape(key);
                    this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
                }
            }
            if (bottomUp) {
                fn(object, pointer, rootObject);
            }
        }
        else {
            console.error('forEachDeep error: Iterator must be a function.');
        }
    };
    /**
     * 'forEachDeepCopy' function
    
    Similar to forEachDeep, but returns a copy of the original object, with
    the same keys and indexes, but with values replaced with the result of
    the iteratee function.
    
    \@param {object} object - the initial object or array
    \@param {(v: any, k?: string, o?: any, p?: any) => any} function - iteratee function
    \@param {boolean = false} bottomUp - optional, set to TRUE to reverse direction
    \@param {object = object} rootObject - optional, root object or array
    \@param {string = ''} pointer - optional, JSON Pointer to object within rootObject
     * @param {?} object
     * @param {?} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    JsonPointer.forEachDeepCopy = function (object, fn, bottomUp, pointer, rootObject) {
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn === 'function') {
            if (isObject(object) || isArray(object)) {
                var /** @type {?} */ newObject = Object.assign(isArray(object) ? [] : {}, object);
                if (!bottomUp) {
                    fn(newObject, pointer, rootObject);
                }
                for (var _i = 0, _a = Object.keys(newObject); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var /** @type {?} */ newPointer = pointer + '/' + this.escape(key);
                    newObject[key] = this.forEachDeepCopy(object[key], fn, bottomUp, newPointer, rootObject);
                }
                if (bottomUp) {
                    fn(newObject, pointer, rootObject);
                }
            }
            else {
                return fn(object, pointer, rootObject);
            }
        }
        console.error('forEachDeep error: Iterator must be a function.');
    };
    /**
     * 'escape' function
    
    Escapes a string reference key
    
    \@param {string} key - string key to escape
    \@return {string} - escaped key
     * @param {?} key
     * @return {?}
     */
    JsonPointer.escape = function (key) {
        return key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
    };
    /**
     * 'unescape' function
    Unescapes a string reference key
    
    \@param {string} key - string key to unescape
    \@return {string} - unescaped key
     * @param {?} key
     * @return {?}
     */
    JsonPointer.unescape = function (key) {
        return key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
    };
    /**
     * 'parse' function
    
    Converts a string JSON Pointer into a array of keys
    (if input is already an an array of keys, it is returned unchanged)
    
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@return {string[]} - JSON Pointer array of keys
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.parse = function (pointer) {
        if (isArray(pointer)) {
            return (pointer);
        }
        if (typeof pointer === 'string') {
            if (((pointer))[0] === '#') {
                pointer = pointer.slice(1);
            }
            if ((pointer) === '') {
                return [];
            }
            if (((pointer))[0] !== '/') {
                console.error('parse error: Invalid JSON Pointer, does not start with "/": ' +
                    pointer);
                return;
            }
            return ((pointer)).slice(1).split('/').map(this.unescape);
        }
        console.error('parse error: Invalid JSON Pointer, not a string or array:');
        console.error(pointer);
    };
    /**
     * 'compile' function
    
    Converts an array of keys into a JSON Pointer string
    (if input is already a string, it is normalized and returned)
    
    The optional second parameter is a default which will replace any empty keys.
    
    \@param {Pointer} keyArray - JSON Pointer (string or array)
    \@returns {string} - JSON Pointer string
     * @param {?} keyArray
     * @param {?=} defaultValue
     * @return {?}
     */
    JsonPointer.compile = function (keyArray, defaultValue) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = ''; }
        if (isArray(keyArray)) {
            if (((keyArray)).length === 0) {
                return '';
            }
            return '/' + ((keyArray)).map(function (key) { return key === '' ? defaultValue : _this.escape(key); }).join('/');
        }
        if (typeof keyArray === 'string') {
            if (keyArray[0] === '#') {
                keyArray = keyArray.slice(1);
            }
            if (keyArray.length && keyArray[0] !== '/') {
                console.error('compile error: Invalid JSON Pointer, does not start with "/": ' +
                    keyArray);
                return;
            }
            return keyArray;
        }
        console.error('compile error: Invalid JSON Pointer, not a string or array:');
        console.error(keyArray);
    };
    /**
     * 'toKey' function
    
    Extracts name of the final key from a JSON Pointer.
    
    \@param {Pointer} pointer - JSON Pointer (string or array)
    \@returns {string} - the extracted key
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.toKey = function (pointer) {
        var /** @type {?} */ keyArray = this.parse(pointer);
        if (keyArray === null) {
            return null;
        }
        if (!keyArray.length) {
            return '';
        }
        return keyArray[keyArray.length - 1];
    };
    /**
     * 'isJsonPointer' function
    
    Checks a string value to determine if it is a valid JSON Pointer.
    This function only checks for valid JSON Pointer strings, not arrays.
    (Any array of string values is assumed to be a potentially valid JSON Pointer.)
    
    \@param {any} value - value to check
    \@returns {boolean} - true if value is a valid JSON Pointer, otherwise false
     * @param {?} value
     * @return {?}
     */
    JsonPointer.isJsonPointer = function (value) {
        if (typeof value === 'string') {
            if (value === '') {
                return true;
            }
            if (value[0] === '#') {
                value = value.slice(1);
            }
            if (value[0] === '/') {
                return true;
            }
        }
        return false;
    };
    /**
     * 'isSubPointer' function
    
    Checks whether one JSON Pointer is a subset of another.
    
    \@param {Pointer} shortPointer - potential subset JSON Pointer
    \@param {Pointer} longPointer - potential superset JSON Pointer
    \@return {boolean} - true if shortPointer is a subset of longPointer, false if not
     * @param {?} shortPointer
     * @param {?} longPointer
     * @return {?}
     */
    JsonPointer.isSubPointer = function (shortPointer, longPointer) {
        if (isArray(shortPointer)) {
            shortPointer = this.compile(shortPointer);
        }
        if (isArray(longPointer)) {
            longPointer = this.compile(longPointer);
        }
        if (typeof shortPointer !== 'string' || typeof longPointer !== 'string') {
            console.error('isSubPointer error: Invalid JSON Pointer, not a string or array:');
            if (typeof shortPointer !== 'string') {
                console.error(shortPointer);
            }
            if (typeof longPointer !== 'string') {
                console.error(longPointer);
            }
            return;
        }
        return shortPointer === longPointer.slice(0, shortPointer.length);
    };
    /**
     * 'toIndexedPointer' function
    
    Merges an array of numeric indexes and a generic pointer to create an
    indexed pointer for a specific item.
    
    For example, merging the generic pointer '/foo/-/bar/-/baz' and
    the array [4, 2] would result in the indexed pointer '/foo/4/bar/2/baz'
    
    \@function
    \@param {string | string[]} genericPointer - The generic pointer
    \@param {number[]} indexArray - The array of numeric indexes
    \@param {Map<string, number>} arrayMap - An optional array map
    \@return {string} - The merged pointer with indexes
     * @param {?} genericPointer
     * @param {?} indexArray
     * @param {?=} arrayMap
     * @return {?}
     */
    JsonPointer.toIndexedPointer = function (genericPointer, indexArray, arrayMap) {
        if (arrayMap === void 0) { arrayMap = null; }
        if (genericPointer[0] === '#') {
            genericPointer = genericPointer.slice(1);
        }
        if (this.isJsonPointer(genericPointer) && isArray(indexArray)) {
            if (isMap(arrayMap)) {
                var /** @type {?} */ arrayIndex_1 = 0;
                return genericPointer.replace(/\/\-(?=\/|$)/g, function (key, stringIndex) {
                    var /** @type {?} */ subPointer = genericPointer.slice(0, stringIndex);
                    if (arrayMap.has(subPointer)) {
                        return '/' + indexArray[arrayIndex_1++];
                    }
                });
            }
            else {
                var /** @type {?} */ indexedPointer = genericPointer;
                for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                    var pointerIndex = indexArray_1[_i];
                    indexedPointer = indexedPointer.replace('/-', '/' + pointerIndex);
                }
                return indexedPointer;
            }
        }
        console.error('toIndexedPointer error: genericPointer must be ' +
            'a JSON Pointer and indexArray must be an array.');
        console.error(genericPointer);
        console.error(indexArray);
    };
    ;
    /**
     * 'toGenericPointer' function
    
    Compares an indexed pointer to an array map and removes list array
    indexes (but leaves tuple arrray indexes and all object keys, including
    numeric keys) to create a generic pointer.
    
    For example, using the indexed pointer '/foo/1/bar/2/baz/3' and
    the arrayMap [['/foo', 0], ['/foo/-/bar', 3], ['/foo/-/bar/2/baz', 0]]
    would result in the generic pointer '/foo/-/bar/2/baz/-'
    Using the indexed pointer '/foo/1/bar/4/baz/3' and the same arrayMap
    would result in the generic pointer '/foo/-/bar/-/baz/-'
    
    The structure of the arrayMap is: [['path to array', number of tuple items]...]
    
    \@function
    \@param {Pointer} indexedPointer - The indexed pointer (array or string)
    \@param {Map<string, number>} arrayMap - The optional array map (for preserving tuple indexes)
    \@return {string} - The generic pointer with indexes removed
     * @param {?} indexedPointer
     * @param {?=} arrayMap
     * @return {?}
     */
    JsonPointer.toGenericPointer = function (indexedPointer, arrayMap) {
        if (arrayMap === void 0) { arrayMap = new Map(); }
        if (this.isJsonPointer(indexedPointer) && isMap(arrayMap)) {
            var /** @type {?} */ pointerArray = this.parse(indexedPointer);
            for (var /** @type {?} */ i = 1, /** @type {?} */ l = pointerArray.length; i < l; i++) {
                var /** @type {?} */ subPointer = this.compile(pointerArray.slice(0, i));
                if (arrayMap.has(subPointer) && arrayMap.get(subPointer) <= +pointerArray[i]) {
                    pointerArray[i] = '-';
                }
            }
            return this.compile(pointerArray);
        }
        console.error('toGenericPointer error: ' +
            'indexedPointer must be a JSON Pointer and arrayMap must be a Map.');
        console.error(indexedPointer);
        console.error(arrayMap);
    };
    ;
    /**
     * 'toControlPointer' function
    
    Accepts a JSON Pointer for a data object and returns a JSON Pointer for the
    matching control in an Angular FormGroup.
    
    \@param {FormGroup} formGroup - Angular FormGroup to get value from
    \@param {Pointer} dataPointer - JSON Pointer (string or array) to a data object
    \@return {Pointer} - JSON Pointer (string) to the formGroup object
     * @param {?} formGroup
     * @param {?} dataPointer
     * @return {?}
     */
    JsonPointer.toControlPointer = function (formGroup, dataPointer) {
        var /** @type {?} */ dataPointerArray = this.parse(dataPointer);
        var /** @type {?} */ controlPointerArray = [];
        var /** @type {?} */ subGroup = formGroup;
        if (dataPointerArray !== null) {
            for (var _i = 0, dataPointerArray_1 = dataPointerArray; _i < dataPointerArray_1.length; _i++) {
                var key = dataPointerArray_1[_i];
                if (subGroup.hasOwnProperty('controls')) {
                    controlPointerArray.push('controls');
                    subGroup = subGroup.controls;
                }
                if (isArray(subGroup) && (key === '-')) {
                    controlPointerArray.push((subGroup.length - 1).toString());
                    subGroup = subGroup[subGroup.length - 1];
                }
                else if (subGroup.hasOwnProperty(key)) {
                    controlPointerArray.push(key);
                    subGroup = subGroup[key];
                }
                else {
                    console.error('toControlPointer error: Unable to find "' + key +
                        '" item in FormGroup.');
                    console.error(dataPointer);
                    console.error(formGroup);
                    return;
                }
            }
            return this.compile(controlPointerArray);
        }
        console.error('getControl error: Invalid JSON Pointer: ' + dataPointer);
    };
    /**
     * 'parseObjectPath' function
    
    Parses a JavaScript object path into an array of keys, which
    can then be passed to compile() to convert into a string JSON Pointer.
    
    Based on mike-marcacci's objectpath parse function:
    https://github.com/mike-marcacci/objectpath
    
    \@param {string} path - The object path to parse
    \@return {string[]} - The resulting array of keys
     * @param {?} path
     * @return {?}
     */
    JsonPointer.parseObjectPath = function (path) {
        if (isArray(path)) {
            return (path);
        }
        if (typeof path === 'string') {
            var /** @type {?} */ index = 0;
            var /** @type {?} */ parts = [];
            while (index < path.length) {
                var /** @type {?} */ nextDot = path.indexOf('.', index);
                var /** @type {?} */ nextOB = path.indexOf('[', index); // next open bracket
                if (nextDot === -1 && nextOB === -1) {
                    parts.push(path.slice(index));
                    index = path.length;
                }
                else if (nextDot !== -1 && (nextDot < nextOB || nextOB === -1)) {
                    parts.push(path.slice(index, nextDot));
                    index = nextDot + 1;
                }
                else {
                    if (nextOB > index) {
                        parts.push(path.slice(index, nextOB));
                        index = nextOB;
                    }
                    var /** @type {?} */ quote = path.charAt(nextOB + 1);
                    if (quote === '"' || quote === "'") {
                        var /** @type {?} */ nextCB = path.indexOf(quote + ']', nextOB); // next close bracket
                        while (nextCB !== -1 && path.charAt(nextCB - 1) === '\\') {
                            nextCB = path.indexOf(quote + ']', nextCB + 2);
                        }
                        if (nextCB === -1) {
                            nextCB = path.length;
                        }
                        parts.push(path.slice(index + 2, nextCB)
                            .replace(new RegExp('\\' + quote, 'g'), quote));
                        index = nextCB + 2;
                    }
                    else {
                        var /** @type {?} */ nextCB = path.indexOf(']', nextOB); // next close bracket
                        if (nextCB === -1) {
                            nextCB = path.length;
                        }
                        parts.push(path.slice(index + 1, nextCB));
                        index = nextCB + 1;
                    }
                    if (path.charAt(index) === '.') {
                        index++;
                    }
                }
            }
            return parts;
        }
        console.error('parseObjectPath error: Input object path must be a string.');
    };
    JsonPointer.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    JsonPointer.ctorParameters = function () { return []; };
    return JsonPointer;
}());
export { JsonPointer };
function JsonPointer_tsickle_Closure_declarations() {
    /** @type {?} */
    JsonPointer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JsonPointer.ctorParameters;
}
//# sourceMappingURL=jsonpointer.functions.js.map