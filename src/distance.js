
var setValue = function(value, type) {
  var matches = (value + '').match(/([0-9.]*)_\$(.+)$/);
  if(matches) {
    // 如果传进来的已经是元数据
    var v;
    var server_distance = matches[1];
    var unit = matches[2];
    var real_km = 0;
    switch (unit) {
      case 'km':
        real_km = server_distance * 1;
        break;
      case 'wkm':
        real_km = server_distance * 10000;
        break;
      case 'm':
        real_km = server_distance / 1000;
        break;
      default:
        real_km = server_distance * 1;
        break;
    }
    switch(type) {
        case 'wkm':
            v = new Number(real_km / 10000);
            break;
        case 'km':
            v = new Number(real_km * 1);
            break;
        case 'm':
            v = new Number(real_km * 1000);
            break;
        default:
            v = new Number(real_km);
            break;
    }
    v.jsonValue = v + '_$' + type;
  } else {
    var v = new Number(value);
    v.jsonValue = v + '_$' + type;
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
