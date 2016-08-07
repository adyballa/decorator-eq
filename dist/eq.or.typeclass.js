"use strict";
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
    EqOr.eq = function (cs, refs, config) {
        return cs.filter(function (a) {
            return (refs.filter(function (ref) {
                return (ref.eq(a, config) === true);
            }).length > 0);
        });
    };
    return EqOr;
}());
exports.EqOr = EqOr;
//# sourceMappingURL=eq.or.typeclass.js.map