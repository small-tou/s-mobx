'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = price;
var setValue = function setValue(value, type) {
    var matches = (value + '').match(/([0-9.]*)_\$(.+)$/);
    if (matches) {
        // 如果传进来的已经是元数据
        var v;
        var server_price = matches[1];
        var unit = matches[2];
        var real_yuan = 0;
        switch (unit) {
            case 'y':
                real_yuan = server_price * 1;
                break;
            case 'wy':
                real_yuan = server_price * 10000;
                break;
            case 'f':
                real_yuan = server_price / 10;
                break;
            default:
                real_yuan = server_price * 1;
                break;
        }
        switch (type) {
            case 'wy':
                v = new Number(real_yuan / 10000);
                break;
            case 'y':
                v = new Number(real_yuan * 1);
                break;
            case 'f':
                v = new Number(real_yuan * 10);
                break;
            default:
                v = new Number(real_yuan);
                break;
        }
        v.jsonValue = v + ('_$' + type);
    } else {
        var v = new Number(value);
        v.jsonValue = v + ('_$' + type);
    }

    return v;
};

function price(type) {
    type = type || 'y';
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