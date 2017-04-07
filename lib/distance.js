'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distance;

var setValue = function setValue(value, type) {
    var v = new Number(value);

    switch (type) {
        case 'wkm':
            v.jsonValue = v * 10000 + '_$km';
            break;
        case 'km':
            v.jsonValue = v + '_$km';
            break;
        case 'm':
            v.jsonValue = v / 1000 + '_$km';
            break;
        default:
            v = v + '_$km';
            break;
    }
    return v;
};

function distance(type) {
    return function (target, name, descriptor) {
        var v = setValue(descriptor.initializer && descriptor.initializer.call(this) || 0, type);
        return {
            enumerable: true,
            configurable: true,
            get: function get() {
                return v;
            },
            set: function set(c) {
                v = setValue(c, type);
            }
        };
    };
};