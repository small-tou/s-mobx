'use strict';

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

var _index = require('./../index');

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var IndexItem = (_dec = (0, _index.price)('wy'), _dec2 = (0, _index.distance)('wkm'), (_class = function (_BaseModel) {
    _inherits(IndexItem, _BaseModel);

    function IndexItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, IndexItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndexItem.__proto__ || Object.getPrototypeOf(IndexItem)).call.apply(_ref, [this].concat(args))), _this), _this.icon = '', _initDefineProp(_this, 'price', _descriptor, _this), _initDefineProp(_this, 'mileage', _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    return IndexItem;
}(_index.BaseModel), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'price', [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return 10;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'mileage', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return 10;
    }
})), _class));


var item = new IndexItem();

console.log(JSON.stringify(item));