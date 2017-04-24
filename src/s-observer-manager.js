var nowObserver = null;
var nowTarget = null;
var observerStack = [];
var targetStack = [];
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
    console.log('begin collect',observer);
    isCollecting = true;
    observerStack.push(observer);
    targetStack.push(target);
    nowObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
    nowTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
  },
  collect(proxyID){
    if(nowObserver) {
      console.log('collecting',proxyID)
      this._addNowObserver(proxyID);
    }
    return false;
  },
  endCollect(){
    console.log('end collect');
    isCollecting = false;
    observerStack.pop();
    targetStack.pop();
    nowObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
    nowTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
  }
}

export default observerManagers;
