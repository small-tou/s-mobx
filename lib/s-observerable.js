'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sDerivationManager = require('./s-derivation-manager');

var _sDerivationManager2 = _interopRequireDefault(_sDerivationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var derivationIDStore = {};
var proxyID = 1;

var setObserverableIteration = function setObserverableIteration(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') {
    if (!Array.isArray(obj)) {
      // 纯对象
      for (var key in obj) {
        obj[key] = setObserverableIteration(obj[key]);
      }
    }
    proxyID = ++proxyID;
    console.log('create proxy', obj, proxyID);
    var proxy = new Proxy(obj, {
      get: function get(obj, property) {
        console.log('get value', obj, property);
        // var _derivationID = derivationManagers.collect();
        // if(_derivationID) {
        //   var storeKey;
        //   if(Array.isArray(obj)) {
        //     storeKey = proxyID;
        //   }else{
        //     storeKey = proxyID+property.toString();
        //   }
        //   derivationIDStore[storeKey] = _derivationID;
        // }
        return obj[property];
      },
      set: function set(obj, property, value) {
        console.log('set value', obj, property, value);
        obj[property] = value;
        // // length 变化的时候不触发变化
        // if(Array.isArray(obj) && property == 'length') return true;
        // var storeKey;
        // if(Array.isArray(obj)) {
        //   storeKey = proxyID;
        // }else{
        //   storeKey = proxyID+property.toString();
        // }
        // var derivationID = derivationIDStore[storeKey];
        // derivationManagers.trigger(derivationID);
        return true;
      }
    });
    return proxy;
  } else {
    return obj;
  }
};

var observerable = {
  create: function create(obj) {
    return setObserverableIteration(obj);
  }
};

exports.default = observerable;