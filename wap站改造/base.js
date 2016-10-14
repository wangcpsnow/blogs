/*
 * fileoverview: 基类,继承其他扩展的基础类
 */
define('base', function(require, exports, module) {
    var Class = require('class'),
        Events = require('events');

    module.exports = Class.create({
        Implements: [Events],
        init: function() {

        }
    });
});