'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

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

// var Person = function(){
//   this.title = 'xx';
// }
//
// Person.prototype.name = 'name1';
// Person.prototype.getName = function(){
//   console.log(this)
// }
//
// var person = new Person();
// person.getName()


var decorator = function decorator(target, name, descriptor) {
  console.log('enter decorator', target);
  return descriptor;
};
var decorator_get = function decorator_get(target, name, descriptor) {
  console.log('enter decorator_get', target);
  var _get = descriptor.get;
  // return descriptor;
  return {
    enumerable: true,
    configurable: true,
    get: function get() {
      console.log('get ', this);
      return _get.call(this);
    }
  };
};
var Person = (_class = function () {
  function Person() {
    _classCallCheck(this, Person);

    _initDefineProp(this, 'name', _descriptor, this);

    this.title = 'title1';
  }

  _createClass(Person, [{
    key: 'age',
    get: function get() {
      console.log('get age', this);
    }
  }]);

  return Person;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'name', [decorator], {
  enumerable: true,
  initializer: function initializer() {
    return 'name1';
  }
}), _applyDecoratedDescriptor(_class.prototype, 'age', [decorator_get], Object.getOwnPropertyDescriptor(_class.prototype, 'age'), _class.prototype)), _class);


var person = new Person();
console.log(person.age);