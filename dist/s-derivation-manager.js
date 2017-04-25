"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nowDerivation = null;
var isCollecting = false;
var derivationManagers = {
  _derivations: {},
  _addNowDerivation: function _addNowDerivation(proxyID) {
    this._derivations[proxyID] = this._derivations[proxyID] || [];
    this._derivations[proxyID].push(nowDerivation);
  },
  trigger: function trigger(id) {
    var ds = this._derivations[id];
    if (ds) {
      ds.forEach(function (d) {
        d();
      });
    }
  },
  beginCollect: function beginCollect(derivation) {
    isCollecting = true;
    nowDerivation = derivation;
  },
  collect: function collect(proxyID) {
    if (isCollecting) {
      this._addNowDerivation(proxyID);
    }
    return false;
  },
  endCollect: function endCollect() {
    isCollecting = false;
  }
};

exports.default = derivationManagers;