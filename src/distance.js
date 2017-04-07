
var setValue = function(value, type) {
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