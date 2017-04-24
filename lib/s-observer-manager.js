'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nowObserver = null;
var nowTarget = null;
var observerStack = [];
var targetStack = [];
var isCollecting = false;
var observerManagers = {
  _observers: {},
  _addNowObserver: function _addNowObserver(proxyID) {
    this._observers[proxyID] = this._observers[proxyID] || {};
    this._observers[proxyID].target = nowTarget;
    this._observers[proxyID].watchers = this._observers[proxyID].watchers || [];
    this._observers[proxyID].watchers.push(nowObserver);
  },
  trigger: function trigger(id) {
    var _this = this;

    var ds = this._observers[id];
    if (ds && ds.watchers) {
      ds.watchers.forEach(function (d) {
        d.call(ds.target || _this);
      });
    }
  },
  beginCollect: function beginCollect(observer, target) {
    console.log('begin collect', observer);
    isCollecting = true;
    observerStack.push(observer);
    targetStack.push(target);
    nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
    nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
  },
  collect: function collect(proxyID) {
    if (nowObserver) {
      console.log('collecting', proxyID);
      this._addNowObserver(proxyID);
    }
    return false;
  },
  endCollect: function endCollect() {
    console.log('end collect');
    isCollecting = false;
    observerStack.pop();
    targetStack.pop();
    nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
    nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
  }
};

exports.default = observerManagers;