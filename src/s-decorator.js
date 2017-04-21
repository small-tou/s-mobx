import Observable from './s-observable';
import Computed from './s-computed';

function observable(target, name, descriptor) {
    var v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if(typeof(v) === 'object') {
      createObservable(v);
    }
    var observable = new Observable(v);
    return {
      enumerable: true,
      configurable: true,
      get:function(){
        return observable.get();
      },
      set:function(v){
        // 重新赋值对象的时候，为其值也创建observable
        if(typeof(v) === 'object') {
          createObservable(v);
        }
        return observable.set(v);
      }
    };

};

function computed(target, name, descriptor){
  let getter = descriptor.get;
  // 如果值是对象，为其值也创建observable
  var computed = new Computed(target,getter);
  return {
    enumerable: true,
    configurable: true,
    get:function(){
      return computed.get();
    }
  };
}
export {
  observable,
  computed
}
