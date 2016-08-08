"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eq_interface_1 = require("./eq.interface");
var eq_config_1 = require("./eq.config");
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
            if (eq_interface_1.isEq(vals[0])) {
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
}(eq_config_1.EqField));
exports.FuzzyEqField = FuzzyEqField;
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
            config.fields = _f;
        }
    };
    Eq.field = function (props) {
        return function (target, propertyKey) {
            Eq._eq.fields.push(("fuzzy" in props && props.fuzzy) ? new FuzzyEqField(propertyKey) : new eq_config_1.EqField(propertyKey));
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