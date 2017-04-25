import dependenceManager from './s-dependence-manager';

var obIDCounter = 1;
class Observable {
    /**
     * 全局唯一 id
     * @type {number}
     */
    obID = 0;
    /**
     * 真实值
     * @type {null}
     */
    value = null;
    constructor(v) {
        this.obID = 'ob-' + (++obIDCounter);
        if(Array.isArray(v)) {
            this._wrapArrayProxy(v);
        } else {
            this.value = v;
        }
    }

    get() {
        dependenceManager.collect(this.obID);
        return this.value;
    }

    set(v) {
        if(Array.isArray(v)) {
            this._wrapArrayProxy(v);
        } else {
            this.value = v;
        }
        dependenceManager.trigger(this.obID);
    }

    /**
     * 手动触发依赖
     */
    trigger() {
        dependenceManager.trigger(this.obID);
    }
  /**
  * 对数组包装Proxy拦截数组操作的动作
  */
    _wrapArrayProxy(v) {
        this.value = new Proxy(v, {
            set: (obj, key, value) => {
                obj[key] = value;
                if(key != 'length') {
                    this.trigger();
                }
                return true;
            }
        });
    }
}

export default Observable;
