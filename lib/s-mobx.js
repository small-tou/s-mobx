'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendObservable = exports.computed = exports.observable = exports.autorun = undefined;

var _sAutorun = require('./s-autorun');

var _sAutorun2 = _interopRequireDefault(_sAutorun);

var _sDecorator = require('./s-decorator');

var _sExtendObservable = require('./s-extendObservable.js');

var _sExtendObservable2 = _interopRequireDefault(_sExtendObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.autorun = _sAutorun2.default;
exports.observable = _sDecorator.observable;
exports.computed = _sDecorator.computed;
exports.extendObservable = _sExtendObservable2.default;