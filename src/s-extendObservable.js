import Observable from './s-observable';
/**
* 值类型 Observable
*/
var createObservableProperty = function createObservableProperty(target, property) {
  var observable = new Observable(target[property]);
  Object.defineProperty(target, property, {
    get: function get() {
      return observable.get();
    },
    set: function set(value) {
      return observable.set(value);
    }
  });

  if (typeof(target[property]) === 'object') {
    for (var i in target[property]) {
      if (target[property].hasOwnProperty(i)) {
        createObservableProperty(target[property], i);
      }
    }
  }
};
var extendObservable = function extendObservable(target, obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
      createObservableProperty(target, i);
    }
  }
};

var createObservable = function createObservable(target) {
  for (var i in target) {
    if (target.hasOwnProperty(i)) {
      createObservableProperty(target, i);
    }
  }
};
export {
  extendObservable,
  createObservable
}
