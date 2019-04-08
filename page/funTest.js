define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var DateTime = Utility['DateTime'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            Main:'<div id="btn1" style="padding:15px 20px;border:1px solid #ddd;border-radius: 5px;font-size:34px;cursor: pointer;height:50px;line-height:50px;text-align: center;background:pink; ">H5唤醒直播间测试</div>'
        };

    var Page={
        run:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.container = $('#container');
            this.container.html( TEMPLATE.Main );
        },
        bind:function(){
            var surfing = Utility.URL.queryString('surfing');
            $(document).ready(function(){
                var sMakeLink= Bridge.link.logic('live',{'surfing':surfing});
                Bridge.callNative(sMakeLink);
            });
        }
    };

    Page.run();
});

