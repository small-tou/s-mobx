import Observable from './s-observable';
import Computed from './s-computed';
import autorun from './s-autorun';
import {createObservable} from './s-extendObservable';

function observable(target, name, descriptor) {
    var v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if(typeof(v) === 'object') {
      createObservable(v);
    }
    var observable = new Observable(v);
    return {
      enumerable:true,
      configurable:true,
      get : function(){
        return observable.get();
      },
      set : function(v){
        // 重新赋值对象的时候，为其值也创建observable
        if(typeof(v) === 'object') {
          createObservable(v);
        }
        return observable.set(v);
      }
    };;

};

function computed(target, name, descriptor){
  const getter = descriptor.get;
  // 如果值是对象，为其值也创建observable
  var computed = new Computed(target,getter);

  return {
    enumerable:true,
    configurable:true,
    get : function(){
      computed.target = this;
      return computed.get();
    }
  };
}
var ReactMixin = {
  componentWillMount:function(){
    autorun(()=>{
      this.render();
      this.forceUpdate();
    })
  }
}
function observer(target) {
  const targetCWM = target.prototype.componentWillMount
  target.prototype.componentWillMount = function(){
    targetCWM&&targetCWM.call(this);
    ReactMixin.componentWillMount.call(this);
  }
}
export {
  observable,
  computed,
  observer
}
