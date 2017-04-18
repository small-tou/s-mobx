"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nowDerivation = null;
var nowDerivationID = 1;
var isCollecting = false;
var derivationManagers = {
  _derivations: {},
  _addNowDerivation: function _addNowDerivation() {
    this._derivations[nowDerivationID] = this._derivations[nowDerivationID] || [];
    this._derivations[nowDerivationID].push(nowDerivation);
    return nowDerivationID;
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
    nowDerivationID = ++nowDerivationID;
  },
  collect: function collect() {
    if (isCollecting) {
      this._addNowDerivation();
      return nowDerivationID;
    }
  },
  endCollect: function endCollect() {
    isCollecting = false;
  }
};

exports.default = derivationManagers;