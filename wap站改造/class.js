/*
 * fileoverview: OO
 */
define('class', function(require, exports, module) {
    function Class() {

    }
    Class.create = function(parent, properties) {
        if (!isFunction(parent)) {
            properties = parent;
            parent = null;
        }
        properties || (properties = {});
        parent || (parent = Class);

        function subClass() {
            parent.apply(this, arguments);
            if (this.constructor === subClass && this.init) { // 调用init
                this.init.apply(this, arguments);
            }
        }
        if (parent !== Class) {
            mix(subClass, parent);
        }
        subClass.extend = Class.extend;
        implement.call(this,properties);//继承properties方法
        return subClass;
    }
    Class.extend = function(properties) {
        properties || (properties = {});
        return Class.create(properties);
    }
    function implement(properties){
        var value;
        for(var key in properties){
            value = properties[key];
            if(Class.Mutators.hasOwnProperty[key]){ //如果修改了就按修改的处理
                Class.Mutators[key].call(this,value);
            }else{ //没修改直接继承吧
                this.prototype[key] = value;
            }
        }
    }
    Class.Mutators = { //修改器
        'Implements': function(items) {
            isArray(items) || items = [items];
            var proto = this.prototype,
                item;
            while (item = items.shift()) {
                mix(proto, item.prototype || item);
            }
        }
    }
    module.exports = Class;

    var isFunction = function(val) {
        return toString.call(val) === '[object Function]';
    }
    var isArray = function(items) {
        return toString.call(items) === '[object Array]';
    }
    var mix = function(sub, parent) {
        for (var key in parent) {
            // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
            if (parent.hasOwnProperty(key) && key !== 'prototype') {
                sub[key] = parent[key];
            }
        }
    }
});