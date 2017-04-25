'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observer = exports.computed = exports.observable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sObservable = require('./s-observable');

var _sObservable2 = _interopRequireDefault(_sObservable);

var _sComputed = require('./s-computed');

var _sComputed2 = _interopRequireDefault(_sComputed);

var _sAutorun = require('./s-autorun');

var _sAutorun2 = _interopRequireDefault(_sAutorun);

var _sExtendObservable = require('./s-extendObservable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 包装 observable 属性
 * @param target
 * @param name
 * @param descriptor
 * @returns {{enumerable: boolean, configurable: boolean, get: get, set: set}}
 */
function observable(target, name, descriptor) {
    var v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
        (0, _sExtendObservable.createObservable)(v);
    }
    var observable = new _sObservable2.default(v);
    return {
        enumerable: true,
        configurable: true,
        get: function get() {
            return observable.get();
        },
        set: function set(v) {
            // 重新赋值对象的时候，为其值也创建observable
            if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
                (0, _sExtendObservable.createObservable)(v);
            }
            return observable.set(v);
        }
    };
};

/**
 * 包装 computed get 方法
 * @param target
 * @param name
 * @param descriptor
 * @returns {{enumerable: boolean, configurable: boolean, get: get}}
 */
function computed(target, name, descriptor) {
    var getter = descriptor.get;
    // 如果值是对象，为其值也创建observable
    var computed = new _sComputed2.default(target, getter);

    return {
        enumerable: true,
        configurable: true,
        get: function get() {
            computed.target = this;
            return computed.get();
        }
    };
}
/**
 * 用来实现 React 组件 mixin
 * @type {{componentWillMount: ReactMixin.componentWillMount}}
 */
var ReactMixin = {
    componentWillMount: function componentWillMount() {
        var _this = this;

        (0, _sAutorun2.default)(function () {
            _this.render();
            _this.forceUpdate();
        });
    }
};
/**
 * 包装 react 组件
 * @param target
 */
function observer(target) {
    var targetCWM = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function () {
        targetCWM && targetCWM.call(this);
        ReactMixin.componentWillMount.call(this);
    };
}
exports.observable = observable;
exports.computed = computed;
exports.observer = observer;