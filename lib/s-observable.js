'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sDependenceManager = require('./s-dependence-manager');

var _sDependenceManager2 = _interopRequireDefault(_sDependenceManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var obIDCounter = 1;

var Observable = function () {
    /**
     * 全局唯一 id
     * @type {number}
     */
    function Observable(v) {
        _classCallCheck(this, Observable);

        this.obID = 0;
        this.value = null;

        this.obID = 'ob-' + ++obIDCounter;
        if (Array.isArray(v)) {
            this._wrapArrayProxy(v);
        } else {
            this.value = v;
        }
    }
    /**
     * 真实值
     * @type {null}
     */


    _createClass(Observable, [{
        key: 'get',
        value: function get() {
            _sDependenceManager2.default.collect(this.obID);
            return this.value;
        }
    }, {
        key: 'set',
        value: function set(v) {
            if (Array.isArray(v)) {
                this._wrapArrayProxy(v);
            } else {
                this.value = v;
            }
            _sDependenceManager2.default.trigger(this.obID);
        }

        /**
         * 手动触发依赖
         */

    }, {
        key: 'trigger',
        value: function trigger() {
            _sDependenceManager2.default.trigger(this.obID);
        }
        /**
        * 对数组包装Proxy拦截数组操作的动作
        */

    }, {
        key: '_wrapArrayProxy',
        value: function _wrapArrayProxy(v) {
            var _this = this;

            this.value = new Proxy(v, {
                set: function set(obj, key, value) {
                    obj[key] = value;
                    if (key != 'length') {
                        _this.trigger();
                    }
                    return true;
                }
            });
        }
    }]);

    return Observable;
}();

exports.default = Observable;