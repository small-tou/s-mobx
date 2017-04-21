'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computed = exports.observable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sObservable = require('./s-observable');

var _sObservable2 = _interopRequireDefault(_sObservable);

var _sComputed = require('./s-computed');

var _sComputed2 = _interopRequireDefault(_sComputed);

var _sExtendObservable = require('./s-extendObservable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function computed(target, name, descriptor) {
  var getter = descriptor.get;
  // 如果值是对象，为其值也创建observable
  var computed = new _sComputed2.default(target, getter);
  return {
    enumerable: true,
    configurable: true,
    get: function get() {
      return computed.get();
    }
  };
}
exports.observable = observable;
exports.computed = computed;