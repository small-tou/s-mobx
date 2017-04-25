'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createObservable = exports.extendObservable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sObservable = require('./s-observable');

var _sObservable2 = _interopRequireDefault(_sObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* 值类型 Observable
*/
var createObservableProperty = function createObservableProperty(target, property) {
    var observable = new _sObservable2.default(target[property]);
    Object.defineProperty(target, property, {
        get: function get() {
            return observable.get();
        },
        set: function set(value) {
            return observable.set(value);
        }
    });
    //递归包装 observable
    if (_typeof(target[property]) === 'object') {
        for (var i in target[property]) {
            if (target[property].hasOwnProperty(i)) {
                createObservableProperty(target[property], i);
            }
        }
    }
};
var extendObservable = function extendObservable(target, obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = obj[i];
            createObservableProperty(target, i);
        }
    }
};

var createObservable = function createObservable(target) {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            createObservableProperty(target, i);
        }
    }
};
exports.extendObservable = extendObservable;
exports.createObservable = createObservable;