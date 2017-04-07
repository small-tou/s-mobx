
## 依赖

`@souche-f2e/decorator`

## 前提

babel需要配置以下插件才可使用。（react-native项目默认包含此配置）
```
"plugins": [
  "transform-decorators-legacy",
  "transform-class-properties"
]
```
项目需依赖：
```
"babel-plugin-transform-decorators-legacy": "*",
"babel-plugin-transform-class-properties": "*", // rn 不需要
"babel-preset-es2015": "*" // rn 不需要
```


## 示例

在一个前端的model中这样使用：

```
/
**
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
} from '@souche-f2e/decorator';

class IndexItem extends BaseModel{
    title = '';

    @price('wy')
    price = 10;

    @distance('wkm')
    mileage = 10;

}

export default  IndexItem;
```
