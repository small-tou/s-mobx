import observerManagers from './s-observer-manager';

var cpIDCounter = 1;
class Computed {
  /**
  * 当前计算的值，如果
  */
  value = null;
  func = null;
  target = null;
  obID = 0;
  hasBindAutoReCompute = false;
  constructor(target,func){
    this.cpID = 'cp-'+(++cpIDCounter);
    this.target = target;
    this.func = func;

  }
  bindAutoReCompute() {
    if(!this.hasBindAutoReCompute){
      this.hasBindAutoReCompute = true;
      // 当计算get中引用的值变化的时候要触发 this.reCompute
      observerManagers.beginCollect(this.reCompute,this);
      this.reCompute();
      observerManagers.endCollect();
    }
  }
  get() {
    // 供外部收集当前对象依赖的时候使用
    this.bindAutoReCompute();
    observerManagers.collect(this.cpID);
    return this.value;
  }

  set(value) {
    this.value = value;
  }

  /**
  * 依赖的属性发生变化的时候调用的函数
  */
  reCompute(){
    this.value = this.func.call(this.target);
    // 触发外部依赖的observer
    observerManagers.trigger(this.cpID);
  }
}

export default Computed;
