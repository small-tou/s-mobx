var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { BaseModel, distance, price } from './../index';

let IndexItem = (_dec = price('wy'), _dec2 = distance('wkm'), (_class = class IndexItem extends BaseModel {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.icon = '', _initDefineProp(this, 'price', _descriptor, this), _initDefineProp(this, 'mileage', _descriptor2, this), _temp;
    }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'price', [_dec], {
    enumerable: true,
    initializer: function () {
        return 10;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'mileage', [_dec2], {
    enumerable: true,
    initializer: function () {
        return 10;
    }
})), _class));


var item = new IndexItem();

console.log(JSON.stringify(item));