wap站改造优化方案
=========

####使用说明

之前的老代码

```js

$('#content .login').on('click',function(){
  ///
});
$("img[data-original]").picLazyLoad();
banner();
youhui();
haodian();
$('#content .history .noinput').on('click',function(){
  ///
});

```

改造后的代码

```js
    var homeView = new view.extend([msgCode, utils, base], {
        el: '#content', //所有事件都是绑定到el上
        STATIC: { // 常量值
            size: 100,
            msgCode: msgCode
        },
        ELES: { // 元素对象
            oninput: '.history .noinput',
            login: '.login'
        },
        events: {
            '{oninput} click': 'open', //通过{}来标志是引用的ELES的值
            '.login click': 'login' //给元素绑定login方法
        },
        init: function(opts) {
            //初始化操作
            $("img[data-original]").picLazyLoad();
            banner();
            youhui();
            haodian();
        },
        close: function(e) { //所有方法都默认传过来e
            this.a = 2; // this指向实例化对象
        },
        login: function() {
            //使用模板
            this.TPL_dt_tpl //以TPL_开头的表示要访问模板里面的值
        },
        template: { // 模板
            dt_tpl: require('template/homeView/dt_tpl')
        }
    });
```

####优点好处
1.大家代码风格一致；不像东拼西凑的，各种dom操作；新人入手比较快

2.保存了最外层el的变量值，不会每次都去dom取；扩展了template，可以把拼接html的分离出来

3.记录了一些常用变量的值，有助于压缩代码

4.事件绑定都在一起，代码一目了然

5.所有的初始化都放到init方法中，便于查找

6.所有业务逻辑使用同一个基类，有助于扩展


