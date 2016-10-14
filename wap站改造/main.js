/*
 * usage:
 * new GomeBone.View.extend({
 *     el: $el,
 *     init: function(){},
 *     methods: {
 *         "click .ok": click_ok,
 *         "mouseover a.info": mouseover_info
 *     },
 *     click_ok: function(){},
 *     mouseover_info: function(){}
 * });
 * 
 **/

(function(win, doc, $) {
    var slice = Array.prototype.slice;

    var GomeBone = {};

    var View = GomeBone.View = function(options) {
        this._init(options);
        this.initialize.apply(this, arguments);
    }

    View.prototype = {
        constructor: View,
        initialize: function() {

        },
        _init: function(options) {
            this._ensureElement(options);
            this._bindEvents();
        },
        _ensureElement: function(options) {
            extend(this, options);
        },
        _bindEvents: function() {
            var self = this;
            if (self.el) {
                var $el = $(self.el),
                    methods = self.methods || {};
                for (var key in methods) {
                    var func = methods[key],
                        arr = key.split(" "),
                        method_name = arr.splice(0, 1)[0],
                        els = arr.join(" ");
                    $el.on(method_name, els, self[func]); //绑定事件 
                }
            } else {}
        }
    };

    function extend(target) {
        var sources = slice.call(arguments, 1);
        sources.map(function(source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        });

    }

    window.GomeBone = GomeBone;
})(window, document, $);