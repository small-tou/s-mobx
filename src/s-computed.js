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
  constructor(target,func){
    this.cpID = 'cp-'+(++cpIDCounter);
    this.target = target;
    this.func = func;
    observerManagers.beginCollect(this.reCompute,this);
    this.reCompute();
    observerManagers.endCollect();
  }

  get() {
    observerManagers.collect(this.cpID);
    return this.value;
  }

  /**
  * 依赖的属性发生变化的时候调用的函数
  */
  reCompute(){
    this.value = this.func.call(this.target);
    observerManagers.trigger(this.cpID);
  }
}

export default Computed;
