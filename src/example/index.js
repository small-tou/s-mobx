import observerable from './../s-observerable.js';
import autorun from './../s-autorun.js';

var person = {
  name:'1',
  age:10,
  componey:{
    title:'xx'
  }
}
person = observerable.create(person,{
  childs:[1,2]
});

autorun(function(){
  // person.name
  // person.componey.title
  // person.childs
  console.log(person)
})

// person.name = 'name'
// person.componey.title = 'title'
person.childs.push(3)
