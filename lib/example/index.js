'use strict';

var _sObserverable = require('./../s-observerable.js');

var _sObserverable2 = _interopRequireDefault(_sObserverable);

var _sAutorun = require('./../s-autorun.js');

var _sAutorun2 = _interopRequireDefault(_sAutorun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var person = {
  name: '1',
  age: 10,
  childs: [1, 2],
  componey: {
    title: 'xx'
  }
};
person = _sObserverable2.default.create(person);

(0, _sAutorun2.default)(function () {
  // person.name
  person.componey.title;
  // person.childs
  // console.log(person)
});

// person.name = 'name'
// person.componey.title = 'title'
// person.childs.push(3)