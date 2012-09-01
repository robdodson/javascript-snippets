var sp; // The specHelper module

sp = (function (window) {
    var op = Object.prototype,
        ap = Array.prototype;

        return {
            toString: op.toString,
            hasOwn: op.hasOwnProperty,
            slice: ap.slice,
            splice: ap.splice,
            isNumber: function(it) {
                return this.toString.call(it) === '[object Number]';
            },
            isString: function(it) {
                return this.toString.call(it) === '[object String]';
            },
            isObject: function(it) {
                return this.toString.call(it) === '[object Object]';
            },
            isFunction: function(it) {
                return this.toString.call(it) === '[object Function]';
            },
            isArray: function(it) {
                return this.toString.call(it) === '[object Array]';
            }
        };
}(this));