import derivationManagers from './s-derivation-manager';
const derivationIDStore = {

}
var proxyID = 1;

const setProxyObserverable = function(obj){
    proxyID = ++proxyID;
    var proxy = new Proxy(obj,{
      get:function(obj,property){
        console.log('get value',obj,property);
        var _derivationID = derivationManagers.collect();
        if(_derivationID) {
          var storeKey;
          if(Array.isArray(obj)) {
            storeKey = proxyID;
          }else{
            storeKey = proxyID+property.toString();
          }
          derivationIDStore[storeKey] = _derivationID;
        }
        return obj[property];
      },
      set:function(obj,property,value){
        console.log('set value',obj,property,value);
        obj[property] = value;
        // length 变化的时候不触发变化
        if(Array.isArray(obj) && property == 'length') return true;
        var storeKey;
        if(Array.isArray(obj)) {
          storeKey = proxyID;
        }else{
          storeKey = proxyID+property.toString();
        }
        var derivationID = derivationIDStore[storeKey];
        derivationManagers.trigger(derivationID);
        return true;
      }
    });
    return proxy;
}
const setPropertyObserverable = function(target,property) {
  
}
const observerable = {
  create(target,obj) {
    for(var i in obj){
      if(obj.hasOwnProperty(i)){
        target[i] = setProxyObserverable(obj[i])
      }
    }
  }
}

export default observerable;
