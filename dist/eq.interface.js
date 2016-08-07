"use strict";
function isEq(object) {
    return (typeof object === 'object' && 'eq' in object && 'neq' in object);
}
exports.isEq = isEq;
//# sourceMappingURL=eq.interface.js.map