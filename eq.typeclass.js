"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function isEq(object) {
    return (typeof object === 'object' && 'eq' in object && 'neq' in object);
}
exports.isEq = isEq;
var EqField = (function () {
    function EqField(name) {
        this.name = name;
    }
    EqField.prototype.eq = function (a, b) {
        var vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null) ? null :
            (isEq(vals[0])) ? vals[0].eq(vals[1]) : (vals[0] === vals[1]);
    };
    EqField.prototype.neq = function (a, b) {
        var val = this.eq(a, b);
        return (val === null) ? null : !val;
    };
    EqField.prototype.value = function (object) {
        return object[this.name];
    };
    return EqField;
}());
exports.EqField = EqField;
var FuzzyEqField = (function (_super) {
    __extends(FuzzyEqField, _super);
    function FuzzyEqField() {
        _super.apply(this, arguments);
    }
    FuzzyEqField.prototype.eq = function (a, b) {
        var vals = [this.value(a), this.value(b)];
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
    };
    return FuzzyEqField;
}(EqField));
exports.FuzzyEqField = FuzzyEqField;
var EqConfig = (function () {
    function EqConfig() {
        this._fields = [];
    }
    Object.defineProperty(EqConfig.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (fields) {
            this._fields = fields;
        },
        enumerable: true,
        configurable: true
    });
    EqConfig.setCardinalityOfField = function (name, fields, newIndex) {
        if (newIndex === void 0) { newIndex = 0; }
        var oldKey = fields.findIndex(function (field) {
            return (field.name === name);
        });
        fields.splice(newIndex, 0, fields.splice(oldKey, 1)[0]);
    };
    return EqConfig;
}());
exports.EqConfig = EqConfig;
var Eq = (function () {
    function Eq() {
    }
    Eq._impl = function (method) {
        return function (a, config) {
            var res = null;
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (var _i = 0, _a = config.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                var val = field[method](this, a);
                if (val !== null) {
                    if (!val)
                        return false;
                    res = true;
                }
            }
            return res;
        };
    };
    Eq.implementFields = function (config, fields) {
        if (fields === void 0) { fields = []; }
        var _f = [];
        for (var i = 0, j = fields.length; i < j; i++) {
            if (fields[i] !== undefined) {
                _f.push(fields[i]);
            }
        }
        if (config) {
            config.fields = _f;
        }
    };
    Eq.field = function (props) {
        return function (target, propertyKey) {
            Eq._eq.fields.push(("fuzzy" in props && props.fuzzy) ? new FuzzyEqField(propertyKey) : new EqField(propertyKey));
        };
    };
    Eq.implement = function (props) {
        var _this = this;
        return function (target) {
            Eq.implementFields((props) ? props.config : null, Eq._eq.fields);
            Eq._eq.fields = [];
            target.prototype.eq = _this._impl("eq");
            target.prototype.neq = _this._impl("neq");
        };
    };
    Eq.eq = function (cs, ref, config) {
        return cs.filter(function (a) {
            return ref.eq(a, config);
        });
    };
    Eq.fuzzyEq = function (cs, ref, config) {
        return cs.filter(function (a) {
            return (ref.eq(a, config) !== false);
        });
    };
    Eq.neq = function (cs, ref, config) {
        return cs.filter(function (a) {
            return (ref.eq(a, config) === false);
        });
    };
    Eq._eq = { fields: [] };
    return Eq;
}());
exports.Eq = Eq;
var EqOr = (function () {
    function EqOr() {
    }
    EqOr.fuzzyEq = function (cs, refs, config) {
        return cs.filter(function (a) {
            return (refs.filter(function (ref) {
                return (ref.eq(a, config) !== false);
            }).length > 0);
        });
    };
    return EqOr;
}());
exports.EqOr = EqOr;
