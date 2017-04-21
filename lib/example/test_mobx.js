'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = require('mobx');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Person = (_class = function () {
  function Person() {
    _classCallCheck(this, Person);

    _initDefineProp(this, 'name', _descriptor, this);
  }

  _createClass(Person, [{
    key: 'age',
    get: function get() {
      return this.name.key.key;
    }
  }]);

  return Person;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'name', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      key: {
        key: 1
      }
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'age', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'age'), _class.prototype)), _class);

var person = new Person();

(0, _mobx.autorun)(function () {
  console.log(person.age);
});
person.name.key.key = 3;
person.name.key.key = 4;

// var person = {
//   name:'1',
//   age:10,
//   componey:{
//     title:'xx'
//   }
// }
// extendObservable(person,{
//   childs:[1,2],
//   name:'a'
// });
//
// autorun(function(){
//   console.log(person.name);
//   // person.componey.title
//   // person.childs
//   console.log(person.childs)
// })
// person.name = 'name'
// // person.componey.title = 'title'
// person.childs.push(3)
// person.childs.push(5)