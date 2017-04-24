
## 依赖

目前兼容的mobx用法：

* @observable
* @observer
* extendObservable
* createObservable
* autorun

## 标注 observable 以及 autorun 的用法
```javascript
import {
  observable,
  autorun,
  computed
} from 's-mobx';
class Person {
  @observable
  name = {
    key:{
      key:1
    }
  };
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

```
## 给React组件设置 observer

```javascript
import {
  observer,
} from 's-mobx';

import React, {Component} from 'react';

import SettingStore from './../../stores/setting';

@observer
class Index extends Component {
    constructor() {
        this.store = new SettingStore();
    }

    render() {
        return (
            <IndexView store={this.store} />
        );
    }
}

export default Index;

```
