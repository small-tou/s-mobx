var setValue = function(value, type) {

    if(/_\$y/.test(value)) {
      // 如果传进来的已经是元数据
      var v;
      switch(type) {
          case 'wy':
              v = new Number(value.replace('_$y','') / 10000);
              break;
          case 'y':
              v = new Number(value.replace('_$y','') * 1);
              break;
          case 'f':
              v = new Number(value.replace('_$y','') * 10000);
              break;
          default:
              v = new Number(value.replace('_$y','') * 1);
              break;
      }
      v.jsonValue = value;
    } else {
      var v = new Number(value);
      switch(type) {
          case 'wy':
              v.jsonValue = v * 10000 + '_$y';
              break;
          case 'y':
              v.jsonValue = v + '_$y';
              break;
          case 'f':
              v.jsonValue = v / 10000 + '_$y';
              break;
          default:
              v = v + '_$y';
              break;
      }
    }

    return v;
}

export default function price(type) {
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
