var setValue = function(value, type) {
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
