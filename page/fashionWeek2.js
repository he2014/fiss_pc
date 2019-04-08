define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':'<div>\
                        <img src="/resource/static/image/fashionWeek2/fashion_011.jpg" alt=""/>\
                    </div>\
                    <h2 class="description">شاهد آخر التصاميم الجذابة للملابس من Jollychic ...<br />\
        تناسق وأناقة تناسب كل الأذواق ، وأيضاً أثاث منزلي راقي وأجهزة كهربائية فائقة الدقة وبحر من مستحضرات التجميل ، كل هذا تحت سقف واحد ! <br/>ملاحظة :  هناك خصومات تصل إلى 70% ، فقط قم بالضغط هنا لمشاهدة المزيد.</h2>\
                    \
                    <a href="http://ol.j.bz/e62jz7Am7e" class="btnA"></a>\
                    <div class="fashion_1">\
                        <span class="btn" data-roomId="526"></span>\
                    </div>\
                    <div class="fashion_2">\
                        <span class="btn pos1"  data-roomId="398"></span>\
                    </div>\
                    <div class="fashion_3">\
                        <span class="btn pos2" data-roomId="429"></span>\
                    </div>\
                    <div class="fashion_4">\
                        <span class="btn pos3" data-roomId="664"></span>\
                    </div>\
                    <div class="fashion_5">\
                        <span class="btn pos4" data-roomId="2146"></span>\
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
            this.loginKey = Utility.URL.queryString('login_key');
            this.localJson={'526':true,'398':true,'429':true,'664':true,'3202809':true};
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
                        //console.log(data);
                        if(data['dataInfo']['tag']==1){
                            data['dataInfo']['data']['list'].forEach(function(value,index,array){
                                if(that['localJson'][value['ri']]!==undefined){
                                    that.newMatch.push(value['ri']);
                                }
                            });
                        }
                        //console.log(that.newMatch);

                        $('.btn').each(function(i){
                           if($.inArray(parseInt($(this).attr('data-roomId')), that.newMatch) != -1){
                               $(this).addClass('btned');
                           }
                        });
                    }
                }.bind(this),null,'isV3');
            }
        },
        'toFollow':function(){
            var that=this;
            $(".btn").bind("click",function(){
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
                                $(_this).addClass("btned");
                                $(_this).unbind();
                                //console.log(data);
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
    };

    Page.run();
});

