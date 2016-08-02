"use strict";
function isEq(object) {
    return (typeof object === 'object' && 'eq' in object && 'neq' in object);
}
exports.isEq = isEq;
class EqField {
    constructor(name) {
        this.name = name;
    }
    eq(a, b) {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null) ? null :
            (isEq(vals[0])) ? vals[0].eq(vals[1]) : (vals[0] === vals[1]);
    }
    neq(a, b) {
        let val = this.eq(a, b);
        return (val === null) ? null : !val;
    }
    value(object) {
        return object[this.name];
    }
}
exports.EqField = EqField;
class FuzzyEqField extends EqField {
    eq(a, b) {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null) {
            return null;
        }
        else {
            if (isEq(vals[0])) {
                return vals[0].eq(vals[1]);
            }
            else {
                if (vals[0] === vals[1]) {
                    return true;
                }
                else {
                    return ((typeof vals[0] === "string") && (vals[1].indexOf(vals[0]) > -1)) ? null : false;
                }
            }
        }
    }
}
exports.FuzzyEqField = FuzzyEqField;
class EqConfig {
    constructor() {
        this._fields = [];
    }
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
    }
    static setCardinalityOfField(name, fields, newIndex = 0) {
        let oldKey = fields.findIndex((field) => {
            return (field.name === name);
        });
        fields.splice(newIndex, 0, fields.splice(oldKey, 1)[0]);
    }
}
exports.EqConfig = EqConfig;
class Eq {
    static _impl(method) {
        return function (a, config) {
            let res = null;
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (let field of config.fields) {
                let val = (method === "eq") ? field.eq(this, a) : field.neq(this, a);
                if (val !== null) {
                    if (!val)
                        return false;
                    res = true;
                }
            }
            return res;
        };
    }
    static implementFields(config, fields = []) {
        let _f = [];
        for (let i = 0, j = fields.length; i < j; i++) {
            if (fields[i] !== undefined) {
                _f.push(fields[i]);
            }
        }
        if (config) {
            config.fields = _f;
        }
    }
    static field(props) {
        return function (target, propertyKey) {
            Eq._eq.fields.push(("fuzzy" in props && props.fuzzy) ? new FuzzyEqField(propertyKey) : new EqField(propertyKey));
        };
    }
    static implement(props) {
        return (target) => {
            Eq.implementFields((props) ? props.config : null, Eq._eq.fields);
            Eq._eq.fields = [];
            target.prototype.eq = this._impl("eq");
            target.prototype.neq = this._impl("neq");
        };
    }
    static eq(cs, ref, config) {
        return cs.filter((a) => {
            return ref.eq(a, config);
        });
    }
    static fuzzyEq(cs, ref, config) {
        return cs.filter((a) => {
            return (ref.eq(a, config) !== false);
        });
    }
    static neq(cs, ref, config) {
        return cs.filter((a) => {
            return (ref.eq(a, config) === false);
        });
    }
}
Eq._eq = { fields: [] };
exports.Eq = Eq;
class EqOr {
    static fuzzyEq(cs, refs, config) {
        return cs.filter((a) => {
            return (refs.filter((ref) => {
                return (ref.eq(a, config) !== false);
            }).length > 0);
        });
    }
}
exports.EqOr = EqOr;
//# sourceMappingURL=eq.typeclass.js.map