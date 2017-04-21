var nowObserver = null;
var nowTarget = null;
var isCollecting = false;
const observerManagers = {
  _observers:{},
  _addNowObserver(proxyID) {
    this._observers[proxyID] = this._observers[proxyID]||{};
    this._observers[proxyID].target = nowTarget;
    this._observers[proxyID].watchers = this._observers[proxyID].watchers || [];
    this._observers[proxyID].watchers.push(nowObserver);
  },
  trigger(id) {
    var ds = this._observers[id];
    if(ds && ds.watchers) {
      ds.watchers.forEach((d) =>{
        d.call(ds.target||this);
      })
    }
  },
  beginCollect(observer,target) {
    isCollecting = true;
    nowObserver = observer;
    nowTarget = target||null;
  },
  collect(proxyID){
    if(isCollecting) {
      this._addNowObserver(proxyID);
    }
    return false;
  },
  endCollect(){
    isCollecting = false;
  }
}

export default observerManagers;
