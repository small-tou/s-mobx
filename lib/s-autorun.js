'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sDerivationManager = require('./s-derivation-manager');

var _sDerivationManager2 = _interopRequireDefault(_sDerivationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 1;
var autorun = function autorun(handler) {
  _sDerivationManager2.default.beginCollect(handler);
  console.log('begin collect');
  handler();
  console.log('end collect');
  _sDerivationManager2.default.endCollect();
};

exports.default = autorun;