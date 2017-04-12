 class BaseModel {

    parseJSON(json) {
        for(var i in this){
            if(json[i] !== undefined) {
                // 如果服务端没有标注元数据，但是前端还标注了单位，报错
                if((!/_\$.+$/.test(json[i])) && this[i].jsonValue) {
                  throw new Error(`should not decorator: ${i}`)
                }
                this[i] = json[i];
            }
        }
    }

    toJSON() {
        var result = {};
        for(var i in this){
            if(this[i] && this[i].jsonValue) {
                result[i] = this[i].jsonValue;
            } else {
                result[i] = this[i]
            }
        }
        return JSON.stringify(result);

    }
 }

 export default  BaseModel;
