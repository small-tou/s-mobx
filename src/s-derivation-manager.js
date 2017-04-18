var nowDerivation = null;
var nowDerivationID = 1;
var isCollecting = false;
const derivationManagers = {
  _derivations:{},
  _addNowDerivation() {
    this._derivations[nowDerivationID] = this._derivations[nowDerivationID]||[];
    this._derivations[nowDerivationID].push(nowDerivation);
    return nowDerivationID;
  },
  trigger(id) {
    var ds = this._derivations[id];
    if(ds) {
      ds.forEach(function(d){
        d();
      })
    }
  },
  beginCollect(derivation) {
    isCollecting = true;
    nowDerivation = derivation;
    nowDerivationID = ++nowDerivationID;
  },
  collect(){
    if(isCollecting) {
      this._addNowDerivation();
      return nowDerivationID;
    }
  },
  endCollect(){
    isCollecting = false;
  }
}

export default derivationManagers;
