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
  function Computed(target, func) {
    _classCallCheck(this, Computed);

    this.value = null;
    this.func = null;
    this.target = null;
    this.obID = 0;
    this.hasBindAutoReCompute = false;

    this.cpID = 'cp-' + ++cpIDCounter;
    this.target = target;
    this.func = func;
  }
  /**
  * 当前计算的值，如果
  */


  _createClass(Computed, [{
    key: 'bindAutoReCompute',
    value: function bindAutoReCompute() {
      if (!this.hasBindAutoReCompute) {
        this.hasBindAutoReCompute = true;
        // 当计算get中引用的值变化的时候要触发 this.reCompute
        _sObserverManager2.default.beginCollect(this.reCompute, this);
        this.reCompute();
        _sObserverManager2.default.endCollect();
      }
    }
  }, {
    key: 'get',
    value: function get() {
      // 供外部收集当前对象依赖的时候使用
      this.bindAutoReCompute();
      _sObserverManager2.default.collect(this.cpID);
      return this.value;
    }
  }, {
    key: 'set',
    value: function set(value) {
      this.value = value;
    }

    /**
    * 依赖的属性发生变化的时候调用的函数
    */

  }, {
    key: 'reCompute',
    value: function reCompute() {
      this.value = this.func.call(this.target);
      // 触发外部依赖的observer
      _sObserverManager2.default.trigger(this.cpID);
    }
  }]);

  return Computed;
}();

exports.default = Computed;