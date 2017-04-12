'use strict';

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

var _index = require('./../index.js');

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

var should = require('should');
var IndexItem = (_dec = (0, _index.price)('wy'), _dec2 = (0, _index.distance)('wkm'), (_class = function (_BaseModel) {
    _inherits(IndexItem, _BaseModel);

    function IndexItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, IndexItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndexItem.__proto__ || Object.getPrototypeOf(IndexItem)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, 'price', _descriptor, _this), _initDefineProp(_this, 'mileage', _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
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


describe('decorator', function () {
    it('检查parseJSON后的price和mileage', function (done) {
        var model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        console.log(model.price);
        console.log(model.mileage);
        model.price.should.equal(10);
        model.mileage.should.equal(10);
        done();
    });
    it('检查序列化后的值', function (done) {
        var model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        JSON.stringify(model).should.equal('"{\\"price\\":\\"10_$wy\\",\\"mileage\\":\\"10_$wkm\\"}"');
        done();
    });
    it('检查parseJSON后的price和mileage', function (done) {
        var _dec3, _dec4, _desc2, _value2, _class3, _descriptor3, _descriptor4;

        var IndexItem = (_dec3 = (0, _index.price)('y'), _dec4 = (0, _index.distance)('km'), (_class3 = function (_BaseModel2) {
            _inherits(IndexItem, _BaseModel2);

            function IndexItem() {
                var _ref2;

                var _temp2, _this2, _ret2;

                _classCallCheck(this, IndexItem);

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = IndexItem.__proto__ || Object.getPrototypeOf(IndexItem)).call.apply(_ref2, [this].concat(args))), _this2), _initDefineProp(_this2, 'price', _descriptor3, _this2), _initDefineProp(_this2, 'mileage', _descriptor4, _this2), _temp2), _possibleConstructorReturn(_this2, _ret2);
            }

            return IndexItem;
        }(_index.BaseModel), (_descriptor3 = _applyDecoratedDescriptor(_class3.prototype, 'price', [_dec3], {
            enumerable: true,
            initializer: function initializer() {
                return 10;
            }
        }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'mileage', [_dec4], {
            enumerable: true,
            initializer: function initializer() {
                return 10;
            }
        })), _class3));

        var model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        console.log(model.price);
        console.log(model.mileage);
        model.price.should.equal(100000);
        model.mileage.should.equal(100000);
        done();
    });
    it('检查parseJSON后的price和mileage', function (done) {
        var _dec5, _dec6, _desc3, _value3, _class5, _descriptor5, _descriptor6;

        var IndexItem = (_dec5 = (0, _index.price)('f'), _dec6 = (0, _index.distance)('wkm'), (_class5 = function (_BaseModel3) {
            _inherits(IndexItem, _BaseModel3);

            function IndexItem() {
                var _ref3;

                var _temp3, _this3, _ret3;

                _classCallCheck(this, IndexItem);

                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = IndexItem.__proto__ || Object.getPrototypeOf(IndexItem)).call.apply(_ref3, [this].concat(args))), _this3), _initDefineProp(_this3, 'price', _descriptor5, _this3), _initDefineProp(_this3, 'mileage', _descriptor6, _this3), _temp3), _possibleConstructorReturn(_this3, _ret3);
            }

            return IndexItem;
        }(_index.BaseModel), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, 'price', [_dec5], {
            enumerable: true,
            initializer: function initializer() {
                return 10;
            }
        }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, 'mileage', [_dec6], {
            enumerable: true,
            initializer: function initializer() {
                return 10;
            }
        })), _class5));

        var model = new IndexItem();
        model.parseJSON({
            price: '10_$wy',
            mileage: '10000_$km'
        });
        console.log(model.price);
        console.log(model.mileage);
        model.price.should.equal(1000000);
        model.mileage.should.equal(1);
        done();
    });
});