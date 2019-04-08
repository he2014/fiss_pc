define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];




    var TEMPLATE={
            'Main':'<div class="userInfo">\
                        <div class="Detail">\
                            <span class="User_Topic">اليوتيوبر مستر شنب  وتحديات على كيف كيفك</span>\
                            <span class="Show_Time">كل جمعة الساعة ٨:٠٠ ليلاً بتوقيت مكة المكرمة</span>\
                        </div>\
                        <span class="User_Ico"><img src="/resource/static/image/2016UserFollowed/host_ico.png" alt="" surfingid="630896"/></span>\
                        <span class="Follow {0}"><a href="javascript:;"></a></span>\
                    </div>\
                    <div class="videos">\
                        <div class="video_box">\
                            <iframe width="100%" height="423" src="https://player.vimeo.com/video/198318173" frameborder="0" allowfullscreen></iframe>\
                        </div>\
                        <span class="Video_Name">تابعوني ! الفله و الوناسة عندي </span>\
                    </div>'

        };

    var Page= {
        'run': function () {
            this.load();
        },
        'load': function () {
            this.loginKey = Utility.URL.queryString('login_key');

            if(this.loginKey){
                var sUrl='service/room/v3/user/fav/check/188?loginKey='+this.loginKey;
                Bussiness.getData(sUrl,function(data){
                        if(data['code']==0){
                            if(data['dataInfo']){
                                this.sFollow='Followed';
                                this.render();
                            }else{
                                this.sFollow='';
                                this.render();
                            }
                            //console.log(data);
                        }else{
                            this.sFollow='';
                            this.render();
                            //console.log(data);
                        }
                }.bind(this),null,'isV3');

            }else{
                this.sFollow='';
                this.render();
            }

        },
        'render': function () {
            this.container = $('#container');
            this.sMain =stringFormat(TEMPLATE.Main, this.sFollow);
            this.container.html( this.sMain );
            this.bind();
            this.toFollow();
            this.toLive();

        },
        'compose': function () {

        },
        'bind': function () {

            var height=$(".userInfo").height();
            $(".User_Ico").css({height:height})

        },
        'toFollow':function(){

            var that=this;
            $(".Follow a").bind("click",function(){
                var _this=this;
                that.toFocus=function toFocus(loginKey){
                    if(loginKey){
                        that.loginKey=loginKey;
                    }
                    var sUrl='service/room/v3/user/fav/adds';

                    if(that.loginKey){
                        Bussiness.postData(sUrl,{'loginKey':that.loginKey,'ids':188}, function(data){
                            if(data['code']==0){
                                $(".Follow").addClass("Followed");
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
        },
        'toLive':function(){
            var that=this;
            $('.User_Ico > img').click(function(){
                var sSurfing=$(this).attr('surfingid');
                var sMakeLink= Bridge.link.logic('live',{'surfing':sSurfing});
                Bridge.callNative(sMakeLink);
            });
        }

    }
    Page.run();
});

