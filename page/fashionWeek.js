define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':'<div id="headTopic">\
                        <img src="/resource/static/image/fashionWeek/haha_01.jpg" />\
                    </div>\
                    <h2 class="subTopic">بحر من الأزياء التي تناسب جميع الأذواق من موقع Jolly Chic المتميز . فقط قم بالضغط على الرابط </h2>\
                    <a class="toWhere" href="http://ol.j.bz/e62jz7Am7e">www.jollychic.com    ، وابحِرْ معنا !</a>\
                    <div class="fashion1">\
                        <span class="focusOn" data-roomId="548"></span>\
                    </div>\
                    <div class="fashion2">\
                        <span class="focusOn focusPos2" data-roomId="662"></span>\
                    </div>\
                    <div class="fashion3">\
                        <span class="focusOn focusPos3" data-roomId="83"></span>\
                    </div>\
                    <div class="fashion4">\
                        <span class="focusOn focusPos4" data-roomId="183"></span>\
                    </div>'
        };

    var Page={
        'run':function(){
            this.load();
            this.render();
            this.compose();
            this.toFollow();
        },
        'load':function(){
            this.loginKey = Utility.URL.queryString('login_key') ;
            this.localJson={'548':true,'662':true,'83':true,'183':true};
            this.newMatch=[];
            console.log(this.loginKey);
        },
        'render':function(){
            this.container = $('#container');
            this.container.html(TEMPLATE.Main);
        },
        'compose':function(){
            var that=this;
            if(this.loginKey){
                var sUrl='service/room/v3/user/fav/get?loginKey='+this.loginKey;
                Bussiness.getData(sUrl,function(data){
                    if(data['code']==0){
                        console.log(data);
                        if(data['dataInfo']['tag']==1){
                            data['dataInfo']['data']['list'].forEach(function(value,index,array){
                                if(that['localJson'][value['ri']]!==undefined){
                                    that.newMatch.push(value['ri']);
                                }
                            });
                        }
                        console.log(that.newMatch);

                        $('.focusOn').each(function(i){
                           if($.inArray(parseInt($(this).attr('data-roomId')), that.newMatch) != -1){
                               $(this).addClass('focusOned');
                           }
                        });
                    }
                }.bind(this),null,'isV3');
            }
        },
        'toFollow':function(){
            var that=this;
            $(".focusOn").bind("click",function(){
                var _this=this;
                var roomId=$(_this).attr('data-roomId');
                that.toFocus=function toFocus(loginKey){
                    if(loginKey){
                        that.loginKey=loginKey;
                    }
                    var sUrl='service/room/v3/user/fav/adds';

                    if(that.loginKey){
                        Bussiness.postData(sUrl,{'loginKey':that.loginKey,'ids':roomId}, function(data){
                            if(data['code']==0){
                                $(_this).addClass("focusOned");
                                $(_this).unbind();
                                console.log(data);
                            }else{
                                //console.log(data);
                            }
                        }.bind(that), null);
                    }else{
                        that.toLoginFollow();
                    }
                };
                that.toFocus();
            });
        },
        'toLoginFollow':function(){
            var that=this;
            var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
                that.toFocus(login_key);
            });
            Bridge.callNative(sMakeLink);
        }
        //'toFollow':function(){
        //    var that=this;
        //    $(".Follow a").bind("click",function(){
        //        var _this=this;
        //        that.toFocus=function toFocus(loginKey){
        //            if(loginKey){
        //                that.loginKey=loginKey;
        //            }
        //            var sUrl='service/room/v3/user/fav/adds';
        //
        //            if(that.loginKey){
        //                Bussiness.postData(sUrl,{'loginKey':that.loginKey,'ids':188}, function(data){
        //                    if(data['code']==0){
        //                        $(".Follow").addClass("Followed");
        //                        $(_this).unbind();
        //                        //console.log(data);
        //                    }else{
        //                        //console.log(data);
        //                    }
        //                }.bind(that), null);
        //            }else{
        //                that.toLoginFollow();
        //            }
        //        };
        //        that.toFocus();
        //    });
        //},
        //'toLoginFollow':function(){
        //    var that=this;
        //    var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
        //        that.toFocus(login_key);
        //    });
        //    Bridge.callNative(sMakeLink);
        //}
    };

    Page.run();
});

