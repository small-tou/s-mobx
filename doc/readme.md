# 前言

mobx 是一个非常简单的状态管理库，具有相当大的自由度，并且使用非常简单，本文通过自己实现一个 mini 版的 mobx 来探究一下类似的 FRP 模式在 js 中的实现。

本文主要讲述了如何自己实现一个 mobx，主要是其核心几个 api 的实现。目的不是要重新造一个轮子，只是通过造轮子的过程，了解 mobx 的核心原理，以及一些具体实现的时候需要趟的坑，从而对RFP之类的编程范式有更深入的了解。

所以，不要将此项目应用于项目中，除非你真的想节省那一点点带宽（打包后 6K，GZip后 2.3K），用此项目了解 mobx 的原理即可。

另外，s-mobx 的实现和 mobx 的实现细节可能并不一致。

# 关于 s-mobx

github: https://github.com/xinyu198736/s-mobx

npm: `npm install s-mobx --save`


# 核心组成

s-mobx 最最核心是两个功能。

1. Observable 。用来包装一个属性为 被观察者
2. autorun 。用来包装一个方法为 观察者

整个 s-mobx 就是围绕这两个功能做包装。

# 依赖收集

autorun 是个神奇的函数，被他包装过的方法，就会变为观察者函数，并且这里有一个很重要的特性，这个函数只会观察自己依赖到的设为 observable 的值。

例如

```
autorun(function(){
    console.log(person.name);
});

```
假设person对象身上有很多个属性是 observable 的，修改这些属性值的时候不会触发 autorun 包装过的函数，只有修改 name 属性的时候才会触发。

这里的原理就是依赖收集

### 那如何实现依赖收集呢？

这时候需要引申出一个很简单的管理类，在 s-mobx 中，我们叫做 dependenceManager，这个工具类中管理了一个依赖的 map，结构是一个全局唯一的 ID 和 对应的监听的函数的数组。

这个全局唯一的 ID 实际上代表的就是各个被设置为 observable 的属性值，是 Observable 类的一个属性 obID。

当一个被 observable 包装的属性值发生 set 行为的时候，就会触发 dependenceManager.trigger(obID); 从而触发遍历对应的监听函数列表，并且执行，这就是 autorun 的基本原理。

### 那这个依赖的map 是如何收集上来的呢？

其实也很简单，也是 dependenceManager 的操作，在执行 autorun(handler) 的时候会执行以下的代码（实际上也就这三句代码）：

```
dependenceManager.beginCollect(handler);
handler();
dependenceManager.endCollect();
```
这里 dependenceManager 标记现在开始收集依赖，然后执行 handler 函数，执行结束之后，标记当前收集结束。这里的收集操作可以嵌套。具体实现见 dependenceManager。

### 在执行 handler 函数的时候，怎么知道他依赖了什么 observable 属性值的？

这个是通过 observable 的 get 动作来实现的，每个被 observable 过的值在 get 的时候都会判断当前是否正在收集依赖，如果是的话，就会把这个值 和 当前正在收集依赖的 handler 关联起来存储在 dependenceManager 中。


这就是整个 s-mobx 核心的原理。

其他的代码大部分只是在实现如何包装 observable。

# Observable

包装对象值的 Observable ，核心原理是 Object.defineProperty ，给被包装的属性套上 get 和 set 的钩子，在 get 中响应依赖收集，在 set 中触发监听函数。

数组的包装稍微麻烦，在 s-mobx 中使用 Proxy 来包装，但是兼容性不是很好，在 mobx 中，作者自己模拟了一个数组对象的操作，然后包装在原生数组上。

另外对于 Object 对象，为其进行了递归包装，每一级 Object 都绑定了一个 observable。

具体的代码见 s-observable (维护 Observable)，s-extendObservable（包装到具体对象属性上）

# Computed

Computed 是一种特殊的类型，他即是观察者，也是被观察者，然后它最大的特性是，他的计算不是每次调用的时候发生的，而是在每次依赖的值发生改变的时候计算的，调用只是简单的返回了最后一次的计算结果。

这样理解就明白了，其实在扮演观察者的时候， Computed 只是 autorun 的一个变种。

Computed 中有一个方法，叫做 _reComputed，当被 computed 包装的方法中依赖的 observable 值发生变化的时候，就会触发 _reComputed 方法重新计算 Computed 的值。这里的具体实现，其实就是把 _reComputed 当做 autorun 的handler 来处理，执行了一次依赖收集。

另外 Computed 还有一个特性就是可以被别人依赖，所以它也暴露了一个 get 的钩子，在钩子里的操作和 observable 中的 get 钩子做了同样的处理。

所以，当用 @computed 包装一个 class 的方法的时候，将其放入 autorun 中会执行两次依赖收集，一次是收集 computed 对其他 observable 的依赖，另一次是收集 handler 对当前属性方法的依赖。这里 dependenceManager 提供了一种机制，可以嵌套收集依赖，采用了类似堆栈的机制。

# observer

在 mobx-react 中，可以使用 @observer 对 react 对象进行包装，使其 render 方法成为一个观察者。

在 s-mobx 中直接集成这个功能，实现的代码：

```
var ReactMixin = {
    componentWillMount: function() {
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    }
};
function observer(target) {
    const targetCWM = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function() {
        targetCWM && targetCWM.call(this);
        ReactMixin.componentWillMount.call(this);
    };
}
```

这里给 react 组件的 prototype 做了一次 mixin，为其加入了一个 autorun，autorun的作用就是绑定组件 render 方法和其依赖的值的观察关系。当依赖的值发生变化的时候会触发 autorun 的参数 handler，handler中会强制执行 render() 方法和 forceUpdate()

这里每次都强制重新渲染，没有做很好的优化，在mobx中有个方法：isObjectShallowModified 来判断是否需要强制重新渲染，可以考虑直接引入进来。

# decorator

mobx 的最大特色就是简单的注解使用方式，也就是 @observable @observer @computed 这些 decorator。

decorator 的实现其实很简单，不过有些坑需要规避，例如 在 decorator 中出现的target，是class 的prototype，而不是class的实例。但是在 return 出来的 descriptor 中，set 和 get 钩子中的this，则是 class 的实例。在实现一些复杂逻辑的时候要注意一下这个点。

具体的代码可以看 s-decorator

```
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
            if(typeof (v) === 'object') {
                createObservable(v);
            }
            return observable.set(v);
        }
    };

};
```

# 小结

至此，一个简化版的 mobx 基本就完成了，mobx 中常用的功能基本都做了实现。原理的话其实也很简单，希望以后有人问起来，大家能够说清楚 mobx 中的一些模式和实现，这就够了。
