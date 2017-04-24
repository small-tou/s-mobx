'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observer = exports.computed = exports.observable = exports.autorun = undefined;

var _sAutorun = require('./s-autorun');

var _sAutorun2 = _interopRequireDefault(_sAutorun);

var _sDecorator = require('./s-decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.autorun = _sAutorun2.default;
exports.observable = _sDecorator.observable;
exports.computed = _sDecorator.computed;
exports.observer = _sDecorator.observer;