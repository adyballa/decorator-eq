"use strict";
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