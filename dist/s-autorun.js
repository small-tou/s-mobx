'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sDependenceManager = require('./s-dependence-manager');

var _sDependenceManager2 = _interopRequireDefault(_sDependenceManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autorun = function autorun(handler) {
    //收集依赖
    _sDependenceManager2.default.beginCollect(handler);
    handler();
    _sDependenceManager2.default.endCollect();
};

exports.default = autorun;