'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var obj = {
  name: '1',
  age: 10,
  childs: ['1', '2']
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
typeof proxy === 'undefined' ? 'undefined' : _typeof(proxy);
console.log(Array.isArray(proxy));