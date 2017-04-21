'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sObserverManager = require('./s-observer-manager');

var _sObserverManager2 = _interopRequireDefault(_sObserverManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autorun = function autorun(handler) {
  _sObserverManager2.default.beginCollect(handler);
  handler();
  _sObserverManager2.default.endCollect();
};

exports.default = autorun;