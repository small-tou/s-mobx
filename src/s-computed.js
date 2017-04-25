import dependenceManager from './s-dependence-manager';

var cpIDCounter = 1;
class Computed {
  /**
  * 当前计算的值，如果
  */
    value = null;
    /**
     * 包装的方法本体
     */
    getter = null;
    /**
     * 包装的方法的实例
     * @type {null}
     */
    target = null;
    /**
     * 全局唯一的id
     * @type {number}
     */
    obID = 0;
    /**
     * 是否绑定过recompute依赖，只需要绑定一次
     * @type {boolean}
     */
    hasBindAutoReCompute = false;
    constructor(target, getter) {
        this.cpID = 'cp-' + (++cpIDCounter);
        this.target = target;
        this.getter = getter;
    }

    /**
     * 依赖的属性发生变化的时候调用的函数
     */
    _reCompute() {
        this.value = this.getter.call(this.target);
        // 触发外部依赖的observer
        dependenceManager.trigger(this.cpID);
    }

    /**
     * 绑定recompute 和 内部涉及到的观察值的关系
     * @private
     */
    _bindAutoReCompute() {
        if(!this.hasBindAutoReCompute) {
            this.hasBindAutoReCompute = true;
      // 当计算get中引用的值变化的时候要触发 this.reCompute
            dependenceManager.beginCollect(this._reCompute, this);
            this._reCompute();
            dependenceManager.endCollect();
        }
    }

    /**
     * 供外部收集当前对象依赖的时候使用
     * @returns {*}
     */
    get() {
        this._bindAutoReCompute();
        dependenceManager.collect(this.cpID);
        return this.value;
    }

}

export default Computed;
