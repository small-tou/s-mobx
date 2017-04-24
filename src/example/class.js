

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


var decorator = function(target,name,descriptor) {
  console.log('enter decorator',target);
  return descriptor;
}
var decorator_get = function(target,name,descriptor) {
  console.log('enter decorator_get',target);
  var get = descriptor.get;
  // return descriptor;
  return {
    enumerable:true,
    configurable:true,
    get:function(){
      console.log('get ',this);
      return get.call(this);
    }
  }
}
class Person {
  @decorator
  name = 'name1';
  title = 'title1';

  @decorator_get
  get age() {
    console.log('get age',this);
  }
}

var person = new Person();
console.log(person.age);
