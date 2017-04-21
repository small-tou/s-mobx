import observerManagers from './s-observer-manager';

var obIDCounter = 1;
class Observable {
  obID = 0;
  value = null;
  constructor(v) {
    this.obID = 'ob-'+(++obIDCounter);
    if(Array.isArray(v)){
      this._wrapArrayProxy(v);
    }else{
      this.value = v;
    }
  }
  get() {
    observerManagers.collect(this.obID);
    return this.value;
  }
  set(v){
    if(Array.isArray(v)){
      this._wrapArrayProxy(v);
    }else{
      this.value = v;
    }
    observerManagers.trigger(this.obID);
  }
  trigger(){
    observerManagers.trigger(this.obID);
  }
  /**
  * 对数组包装Proxy拦截数组操作的动作
  */
  _wrapArrayProxy(v){
    this.value = new Proxy(v,{
      set:(obj,key,value)=>{
        obj[key] = value;
        if(key != 'length'){
          this.trigger()
        }
        return true;
      }
    });
  }
}

export default Observable;
