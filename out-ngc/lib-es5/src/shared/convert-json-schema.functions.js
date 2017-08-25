/**
 * 'convertJsonSchemaToDraft6' function

Converts JSON Schema version 3 or 4 to JSON Schema version 6

Partially based on geraintluff's JSON Schema 3 to 4 compatibility function
https://github.com/geraintluff/json-schema-compatibility
Also uses suggestions from AJV's JSON Schema 4 to 6 migration guide
https://github.com/epoberezkin/ajv/releases/tag/5.0.0

\@param {object} originalSchema - JSON schema (version 3 or 4)
\@return {object} - JSON schema (version 6)
 * @param {?} schema
 * @return {?}
 */
export function convertJsonSchemaToDraft6(schema) {
    var /** @type {?} */ convertTypes = function (types, replace) {
        if (replace === void 0) { replace = false; }
        var /** @type {?} */ newTypes = [];
        for (var _i = 0, _a = Array.isArray(types) ? types : [types]; _i < _a.length; _i++) {
            var type = _a[_i];
            if (typeof type === 'object') {
                newTypes.push(type);
                replace = true;
            }
            else {
                newTypes.push({ 'type': type });
            }
        }
        return replace && newTypes;
    };
    if (typeof schema !== 'object') {
        return schema;
    }
    var /** @type {?} */ newSchema = Array.isArray(schema) ? [].concat(schema) : Object.assign({}, schema);
    // convert multiple types to anyOf
    if (newSchema.type) {
        if (typeof newSchema.type !== 'string') {
            var /** @type {?} */ anyOf = convertTypes(newSchema.type);
            if (anyOf) {
                newSchema.anyOf = anyOf;
                delete newSchema.type;
            }
        }
        else if (newSchema.type === 'any') {
            delete newSchema.type;
        }
    }
    // convert extends to allOf
    if (newSchema.extends) {
        newSchema.allOf = Array.isArray(newSchema.extends) ?
            newSchema.extends : [newSchema.extends];
        delete newSchema.extends;
    }
    // convert disallow to not
    if (newSchema.disallow) {
        newSchema.not = (typeof newSchema.disallow === 'string') ?
            { 'type': newSchema.disallow } :
            { 'anyOf': convertTypes(newSchema.disallow, true) };
        delete newSchema.disallow;
    }
    // move required from individual items to required array
    if (newSchema.properties) {
        var /** @type {?} */ requiredArray = Array.isArray(newSchema.required) ? newSchema.required : [];
        for (var _i = 0, _a = Object.keys(newSchema.properties); _i < _a.length; _i++) {
            var key = _a[_i];
            if (typeof newSchema.properties[key].required === 'boolean') {
                if (newSchema.properties[key].required) {
                    requiredArray.push(key);
                }
                delete newSchema.properties[key].required;
            }
        }
        if (requiredArray.length) {
            newSchema.required = requiredArray;
        }
    }
    // convert dependencies to arrays
    if (newSchema.dependencies) {
        for (var _b = 0, _c = Object.keys(newSchema.dependencies); _b < _c.length; _b++) {
            var key = _c[_b];
            if (typeof newSchema.dependencies[key] === 'string') {
                newSchema.dependencies[key] = [newSchema.dependencies[key]];
            }
        }
    }
    // delete boolean required key
    if (typeof newSchema.required === 'boolean') {
        delete newSchema.required;
    }
    // convert divisibleBy to multipleOf
    if (newSchema.divisibleBy) {
        newSchema.multipleOf = newSchema.divisibleBy;
        delete newSchema.divisibleBy;
    }
    // fix boolean exclusiveMinimum
    if (newSchema.minimum && newSchema.exclusiveMinimum === true) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
    }
    else if (typeof newSchema.exclusiveMinimum !== 'number') {
        delete newSchema.exclusiveMinimum;
    }
    // fix boolean exclusiveMaximum
    if (newSchema.maximum && newSchema.exclusiveMaximum === true) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
    }
    else if (typeof newSchema.exclusiveMaximum !== 'number') {
        delete newSchema.exclusiveMaximum;
    }
    // update or delete $schema identifier
    if (newSchema.$schema === 'http://json-schema.org/draft-03/schema#' ||
        newSchema.$schema === 'http://json-schema.org/draft-04/schema#') {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
    }
    else if (newSchema.$schema) {
        delete newSchema.$schema;
    }
    // convert id to $id
    if (newSchema.id) {
        newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06';
        delete newSchema.id;
    }
    // convert sub schemas
    for (var _d = 0, _e = Object.keys(newSchema); _d < _e.length; _d++) {
        var key = _e[_d];
        if (['properties', 'patternProperties', 'dependencies'].indexOf(key) > -1) {
            for (var _f = 0, _g = Object.keys(newSchema[key]); _f < _g.length; _f++) {
                var subKey = _g[_f];
                newSchema[key][subKey] = convertJsonSchemaToDraft6(newSchema[key][subKey]);
            }
        }
        else if (key !== 'enum') {
            if (Array.isArray(newSchema[key])) {
                for (var _h = 0, _j = newSchema[key]; _h < _j.length; _h++) {
                    var subSchema = _j[_h];
                    subSchema = convertJsonSchemaToDraft6(subSchema);
                }
            }
            else if (typeof newSchema[key] === 'object') {
                newSchema[key] = convertJsonSchemaToDraft6(newSchema[key]);
            }
        }
    }
    return newSchema;
}
//# sourceMappingURL=convert-json-schema.functions.js.map