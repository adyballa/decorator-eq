"use strict";
var eq_config_1 = require("./eq.config");
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
                var val = (method === "eq") ? field.eq(this, a) : field.neq(this, a);
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
            config.fields = config.fields.concat(_f);
        }
    };
    Eq.field = function (props) {
        return function (target, propertyKey) {
            Eq._eq.fields.push(("fuzzy" in props && props.fuzzy) ? new eq_config_1.FuzzyEqField(propertyKey) : new eq_config_1.EqField(propertyKey));
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
//# sourceMappingURL=eq.typeclass.js.map