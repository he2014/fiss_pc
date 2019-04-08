define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':'<div class="wrap">\
                        <div class="userInfo">\
                            <span class="host_info">\
                                <img class="" src="/resource/static/image/2016UserFollowed_1/host_icon.png" alt=""/>\
                                <span class="User_Title">مسلسل "ساعتين إلا نص"</span>\
                            </span>\
                            <span class="follow_detail">\
                                <span class="follow_info">أبشر بآيفون 7 في ساعتين إلا نص !</span>\
                            </span>\
                            <span class="Show_Time">الأربعاء الساعة 21:00  بتوقيت مكة</span>\
                            <span class="Follow"><a href="javascript:;"></a></span>\
                        </div>\
                        <div class="videos">\
                            <div class="video_box">\
                                <iframe width="100%" height="408" src="https://www.youtube.com/embed/4yc5DsHsDWE?ecver=1" frameborder="0" allowfullscreen></iframe>\
                            </div>\
                        <span class="Video_Detail" id="Video_Other">مسابقااااات مع</span>\
                        <span class="Video_Detail" > مسلسل ساعتين إلا نص ، كونوا في الموعد</span>\
                        </div>\
                    </div>'

        };

    var Page= {
        'run': function () {
            this.load();
        },
        'load': function () {
            this.loginKey = Utility.URL.queryString('login_key');
            if(this.loginKey){
                var sUrl='service/room/v3/user/fav/check/3191?loginKey='+this.loginKey;
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
                        Bussiness.postData(sUrl,{'loginKey':that.loginKey,'ids':3191}, function(data){
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
            $('.host_info > img').click(function(){
                var sSurfing=$(this).attr('surfingid');
                var sMakeLink= Bridge.link.logic('live',{'surfing':sSurfing});
                Bridge.callNative(sMakeLink);
            });
        }

    }
    Page.run();
});

