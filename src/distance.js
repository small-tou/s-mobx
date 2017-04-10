
var setValue = function(value, type) {
  if(/_\$km/.test(value)) {
    // 如果传进来的已经是元数据
    var v;
    switch(type) {
        case 'wkm':
            v = new Number(value.replace('_$km','') / 10000);
            break;
        case 'km':
            v = new Number(value.replace('_$km','') * 1);
            break;
        case 'm':
            v = new Number(value.replace('_$km','') * 1000);
            break;
        default:
            v = new Number(value.replace('_$km','') * 1);
            break;
    }
    v.jsonValue = value;
  } else {
    var v = new Number(value);
    switch(type) {
        case 'wkm':
            v.jsonValue = v * 10000 + '_$km';
            break;
        case 'km':
            v.jsonValue = v + '_$km';
            break;
        case 'm':
            v.jsonValue = v / 1000 + '_$km';
            break;
        default:
            v = v + '_$km';
            break;
    }
  }
    return v;
}

export default function distance(type) {
    return function (target, name, descriptor){
        var v = setValue((descriptor.initializer && descriptor.initializer.call(this))||0, type);
        return {
            enumerable: true,
            configurable: true,
            get:function() {
                return v;
            },
            set:function(c){
                v = setValue(c, type);
            }
        }
    }
};
