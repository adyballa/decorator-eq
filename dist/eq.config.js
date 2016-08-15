"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eq_interface_1 = require("./eq.interface");
var EqField = (function () {
    function EqField(name) {
        this.name = name;
    }
    EqField.prototype.eq = function (a, b) {
        var vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null) ? null :
            (eq_interface_1.isEq(vals[0])) ? vals[0].eq(vals[1]) : (vals[0] === vals[1]);
    };
    EqField.prototype.neq = function (a, b) {
        var val = this.eq(a, b);
        return (val === null) ? null : !val;
    };
    EqField.prototype.value = function (object) {
        return object[this.name];
    };
    EqField.prototype.clone = function () {
        return new EqField(this.name);
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
    FuzzyEqField.prototype.clone = function () {
        return new FuzzyEqField(this.name);
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
    EqConfig.prototype.clone = function () {
        var res = new EqConfig();
        var f = [];
        this._fields.forEach(function (field) {
            f.push(field.clone());
        });
        res.fields = f;
        return res;
    };
    return EqConfig;
}());
exports.EqConfig = EqConfig;
//# sourceMappingURL=eq.config.js.map