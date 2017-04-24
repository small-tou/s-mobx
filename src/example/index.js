import {
  observable,
  autorun,
  computed,
  extendObservable
} from './../s-mobx.js';
import manager from './../s-derivation-manager';
class Person {
  @observable
  name = {
    key:{
      key:1
    }
  };
  title = 'xx';
  @computed get age() {
    return this.name.key.key;
  }

}
const person = new Person();


autorun(function(){
  console.log(person.age);
})
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
