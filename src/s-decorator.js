import Observable from './s-observable';
import Computed from './s-computed';
import autorun from './s-autorun';
import {createObservable} from './s-extendObservable';

/**
 * 包装 observable 属性
 * @param target
 * @param name
 * @param descriptor
 * @returns {{enumerable: boolean, configurable: boolean, get: get, set: set}}
 */
function observable(target, name, descriptor) {
    var v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if(typeof (v) === 'object') {
        createObservable(v);
    }
    var observable = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function() {
            return observable.get();
        },
        set: function(v) {
            // 重新赋值对象的时候，为其值也创建observable
            if(typeof (v) === 'object') {
                createObservable(v);
            }
            return observable.set(v);
        }
    };

};

/**
 * 包装 computed get 方法
 * @param target
 * @param name
 * @param descriptor
 * @returns {{enumerable: boolean, configurable: boolean, get: get}}
 */
function computed(target, name, descriptor) {
    const getter = descriptor.get;
  // 如果值是对象，为其值也创建observable
    var computed = new Computed(target, getter);

    return {
        enumerable: true,
        configurable: true,
        get: function() {
            computed.target = this;
            return computed.get();
        }
    };
}
/**
 * 用来实现 React 组件 mixin
 * @type {{componentWillMount: ReactMixin.componentWillMount}}
 */
var ReactMixin = {
    componentWillMount: function() {
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    }
};
/**
 * 包装 react 组件
 * @param target
 */
function observer(target) {
    const targetCWM = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function() {
        targetCWM && targetCWM.call(this);
        ReactMixin.componentWillMount.call(this);
    };
}
export {
  observable,
  computed,
  observer
};
