"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nowObserver = null;
var nowTarget = null;
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
    isCollecting = true;
    nowObserver = observer;
    nowTarget = target || null;
  },
  collect: function collect(proxyID) {
    if (isCollecting) {
      this._addNowObserver(proxyID);
    }
    return false;
  },
  endCollect: function endCollect() {
    isCollecting = false;
  }
};

exports.default = observerManagers;