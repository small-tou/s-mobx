
## 依赖

`@souche-f2e/decorator_unit`

## 前提

babel需要配置以下插件才可使用。（react-native项目默认包含此配置）
```javascript
"plugins": [
  "transform-decorators-legacy",
  "transform-class-properties"
]
```
项目需依赖：
```javascript
"babel-plugin-transform-decorators-legacy": "*",
"babel-plugin-transform-class-properties": "*", // rn 不需要
"babel-preset-es2015": "*" // rn 不需要
```


## 示例

此库解决的问题见文档：http://fedoc.sqaproxy.souche.com/common/yuanshuju.html

在一个前端的 Model 中这样使用：

```javascript
/**
* 注意两点：一个是需要继承自 BaseModel 二是标注属性的单位
* 此处标记会让 Model 初始化时把元数据转换成对应的单位
* 序列化的时候会从标注的单位转换成元数据
* 元数据的定义：价格到元，里程到里，时间到unix秒时间（待定）
* 价格的枚举 wy（万元） y（元） f（分）
* 里程的枚举 wkm（万公里）km（公里）m（米）
* 时间的格式未定
*/
import {
    BaseModel,
    distance,
    price
} from '@souche-f2e/decorator_unit';

class IndexModel extends BaseModel{
    title = '';

    @price('wy')
    price = 10;

    @distance('wkm')
    mileage = 10;

}

export default  IndexModel;
```

```javascript
const model = new IndexModel();
console.log(JSON.stringify(model));
// 输出 {"title":"","price":"1000000_$y","mileage":"100000_$km"}
```

可以直接从 json 数据映射成 Model：

```javascript
var model = new IndexModel();
model.parseJSON({
    title: '检测中心',
    price: '100000_$y',
    distance: '100000_$km'
});
console.log(model.price) // 10
console.log(model.distance) // 10
model.price = 20;
console.log(model.price) // 20
JSON.stringify(model)
// 输出 {"title":"","price":"200000_$y","mileage":"100000_$km"}
```

## 注意

后端如果没有标注一个字段是元数据（带有特殊后缀）此时在前端 Model 里标注单位，parseJSON的时候会报错。
