"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseModel = function () {
    function BaseModel() {
        _classCallCheck(this, BaseModel);
    }

    _createClass(BaseModel, [{
        key: "parseJSON",
        value: function parseJSON(json) {
            for (var i in this) {
                if (json[i] !== undefined) {
                    // 如果服务端没有标注元数据，但是前端还标注了单位，报错
                    if (!/_\$.+$/.test(json[i]) && this[i].jsonValue) {
                        throw new Error("should not decorator: " + i);
                    }
                    this[i] = json[i];
                }
            }
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
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
    }]);

    return BaseModel;
}();

exports.default = BaseModel;