let BaseModel = class BaseModel {

    parseJSON(json) {
        for (var i in json) {
            if (this[i] !== undefined) {
                this[i] = json[i];
            }
        }
    }

    toJSON() {
        var result = {};
        for (var i in this) {
            if (this[i] && this[i].jsonValue) {
                result[i] = this[i].jsonValue;
            } else {
                result[i] = this[i];
            }
        }
        return JSON.stringify(result);
    }
};


export default BaseModel;