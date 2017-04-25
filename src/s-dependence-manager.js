var nowObserver = null;
var nowTarget = null;
var observerStack = [];
var targetStack = [];
var isCollecting = false;
const dependenceManager = {
    /**
     * 存储所有observable和handler的映射关系
     */
    _store: {},
    /**
     * 填一个当前栈中的依赖到 store 中
     * @param obID
     * @private
     */
    _addNowObserver(obID) {
        this._store[obID] = this._store[obID] || {};
        this._store[obID].target = nowTarget;
        this._store[obID].watchers = this._store[obID].watchers || [];
        this._store[obID].watchers.push(nowObserver);
    },
    /**
     * 触发某个obID的依赖函数
     * @param id
     */
    trigger(id) {
        var ds = this._store[id];
        if(ds && ds.watchers) {
            ds.watchers.forEach((d) => {
                d.call(ds.target || this);
            });
        }
    },
    /**
     * 开始收集依赖
     * @param observer
     * @param target
     */
    beginCollect(observer, target) {
        isCollecting = true;
        observerStack.push(observer);
        targetStack.push(target);
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    },
    /**
     * 收集依赖
     * @param obID
     * @returns {boolean}
     */
    collect(obID) {
        if(nowObserver) {
            this._addNowObserver(obID);
        }
        return false;
    },
    /**
     * 结束手机依赖
     */
    endCollect() {
        isCollecting = false;
        observerStack.pop();
        targetStack.pop();
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    }
};

export default dependenceManager;
