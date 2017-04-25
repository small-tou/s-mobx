'use strict';

var obj = {
  name: '1',
  age: 10,
  childs: ['1', '2', '3']
};

var proxy = new Proxy(obj.childs, {
  get: function get(obj, property) {
    console.log('get proxy', obj, property);
    return obj[property];
  },
  set: function set(obj, property, value) {
    console.log('set proxy', obj, property, value);
    obj[property] = value;
    return true;
  }
});
//
// obj.childs = proxy;
//
// var objProxy = new Proxy(obj,{
//   get:function(obj,property){
//     console.log('!!!get proxy',obj,property);
//     return obj[property];
//   },
//   set:function(obj,property,value){
//     console.log('!!!set proxy',obj,property,value);
//     obj[property] = value;
//     return true;
//   }
// })

// console.log(objProxy.childs[0]);
// console.log(proxy)
proxy.splice(0, 1);