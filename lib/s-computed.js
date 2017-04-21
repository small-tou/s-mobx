'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sObserverManager = require('./s-observer-manager');

var _sObserverManager2 = _interopRequireDefault(_sObserverManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cpIDCounter = 1;

var Computed = function () {
  /**
  * 当前计算的值，如果
  */
  function Computed(target, func) {
    _classCallCheck(this, Computed);

    this.value = null;
    this.func = null;
    this.target = null;
    this.obID = 0;

    this.cpID = 'cp-' + ++cpIDCounter;
    this.target = target;
    this.func = func;
    _sObserverManager2.default.beginCollect(this.reCompute, this);
    this.reCompute();
    _sObserverManager2.default.endCollect();
  }

  _createClass(Computed, [{
    key: 'get',
    value: function get() {
      _sObserverManager2.default.collect(this.cpID);
      return this.value;
    }

    /**
    * 依赖的属性发生变化的时候调用的函数
    */

  }, {
    key: 'reCompute',
    value: function reCompute() {
      this.value = this.func.call(this.target);
      _sObserverManager2.default.trigger(this.cpID);
    }
  }]);

  return Computed;
}();

exports.default = Computed;