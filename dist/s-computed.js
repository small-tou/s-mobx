'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sDependenceManager = require('./s-dependence-manager');

var _sDependenceManager2 = _interopRequireDefault(_sDependenceManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cpIDCounter = 1;

var Computed = function () {
  /**
   * 全局唯一的id
   * @type {number}
   */

  /**
   * 包装的方法本体
   */
  function Computed(target, getter) {
    _classCallCheck(this, Computed);

    this.value = null;
    this.getter = null;
    this.target = null;
    this.obID = 0;
    this.hasBindAutoReCompute = false;

    this.cpID = 'cp-' + ++cpIDCounter;
    this.target = target;
    this.getter = getter;
  }

  /**
   * 依赖的属性发生变化的时候调用的函数
   */

  /**
   * 是否绑定过recompute依赖，只需要绑定一次
   * @type {boolean}
   */

  /**
   * 包装的方法的实例
   * @type {null}
   */

  /**
  * 当前计算的值，如果
  */


  _createClass(Computed, [{
    key: '_reCompute',
    value: function _reCompute() {
      this.value = this.getter.call(this.target);
      // 触发外部依赖的observer
      _sDependenceManager2.default.trigger(this.cpID);
    }

    /**
     * 绑定recompute 和 内部涉及到的观察值的关系
     * @private
     */

  }, {
    key: '_bindAutoReCompute',
    value: function _bindAutoReCompute() {
      if (!this.hasBindAutoReCompute) {
        this.hasBindAutoReCompute = true;
        // 当计算get中引用的值变化的时候要触发 this.reCompute
        _sDependenceManager2.default.beginCollect(this._reCompute, this);
        this._reCompute();
        _sDependenceManager2.default.endCollect();
      }
    }

    /**
     * 供外部收集当前对象依赖的时候使用
     * @returns {*}
     */

  }, {
    key: 'get',
    value: function get() {
      this._bindAutoReCompute();
      _sDependenceManager2.default.collect(this.cpID);
      return this.value;
    }
  }]);

  return Computed;
}();

exports.default = Computed;