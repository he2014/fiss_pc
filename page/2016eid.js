define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':' <div class="wrap wrap_ar">\
                        <div id="pg-top">\
                            <h2></h2>\
                            <div class="details">\
                            <h6>قواعد النشاط</h6>\
                                <span>تم إضافة هدية التمرة وهدية طبق التمر كهديتين أساسيتين لنشاط شهر رمضان. (مع العلم أن 1 طبق تمر= 1000 تمرة ) </span>\
                                <span> كل ما تهدي أي تمرة 30% من سعرها بيروح للجمعيات الخيرية.</span>\
                                <span>كل ما تهدي  طبق تمر الأستوديو حيمطر  100 تمرة. والمتواجدين في الأستوديو بيقدروا يجمعوه عن طريق الضغط علي التمر. </span>\
                                <span>جميع أستوديوهات 7 نجوم حتمطر اَلاف التمور يومياً  بمناسبة شهر رمضان ، فقط أدخل وأجمع التمور بالضغط عليها .</span>\
                                <span>كل التمور اللي بتجمعها بيكونوا عندك في صندوق الهدايا .</span>\
                                <h6>المكافأة</h6>\
                                <span>إهداء التمور للمضيفين سيدعمهم لدخول قائمة المنافسة ، مع العلم أن أكثر 20 مضيف سيحصلوا علي التمور سيكونوا سفراء للخير وسيذهبوا مع الإدارة لتقديم التبرعات .</span>\
                                <span>أكثر 50 مستخدم يهدي تمور خلال فترة المسابقة سيحصل علي وسام الهلال في نهاية الشهر وسيحتفظ به لمدة 30 يوما .</span>\
                                <h6>فترة النشاط</h6>\
                                <span> من 1 يونيو إلي 7 يوليو منتصف الليل</span>\
                            </div>\
                            {0}\
                        </div>\
                        <div id="pg-middle">\
                            <h2>القوائم </h2>\
                            <span class="host_send">\
                                {1}\
                            </span>\
                            <span class="user_send">\
                                {2}\
                            </span>\
                            <div class="pg_center_btn">\
                                <span class="btn_left"><img src="/resource/static/image/2016eid/pg2-btn-left.png" alt=""/></span>\
                                <span class="btn_right img_filter"><img src="/resource/static/image/2016eid/pg2-btn-r.png" alt=""/></span>\
                            </div>\
                            <div class="pg_center_btn_user">\
                                <span class="btn_left_user"><img src="/resource/static/image/2016eid/pg2-btn-left.png" alt=""/></span>\
                                <span class="btn_right_user img_filter"><img src="/resource/static/image/2016eid/pg2-btn-r.png" alt=""/></span>\
                            </div>\
                            <div class="all_lists">\
                                <div class="pg-middle-top"><span class="user_list"><strong>قائمة المستخدمين</strong></span><span class="host_list"><strong>قائمة المضيفين</strong></span>\
                                </div>\
                                <ul id="HostLists">\
                                    {3}\
                                </ul>\
                                <ul id="UserLists">\
                                    {4}\
                                </ul>\
                            </div>\
                            <img class="pg2-up" src="/resource/static/image/2016eid/pg2-up.png" alt=""/>\
                        </div>\
                        <div id="pg-bottom">\
                            <img class="pg3-down" src="/resource/static/image/2016eid/pg3-down.png" alt=""/>\
                            <h2>تهاني رمضان</h2>\
                            <div class="video">\
                                <div class="video_pop">\
                                    <div class="video_box">\
                                        <iframe width="100%" height="408" src="https://www.youtube.com/embed/oFyxJnWtAAY" frameborder="0" allowfullscreen></iframe>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
            'Screen1':'<div class="pgTop_footer">\
                            <span class="pgt_tips">إجمالي التبرعات </span>\
                            <span class="allReceived">\
                                <img src="/resource/static/image/2016eid/all-receive.png" alt=""/>\
                                <span>{0}</span>\
                            </span>\
                            <div class="selfSend {1}">\
                                {2}\
                            </div>\
                            <img class="pg1-up" src="/resource/static/image/2016eid/pg1-up.png" alt=""/>\
                        </div>',
            'UserDiv':'<div class="Ranking">\
                            <span class="userId">{0}</span>\
                            <img class="userIcon" src="{1}" alt="" />\
                            <div class="userDetals">\
                                <span class="Name">{2}</span>\
                                {3}\
                            </div>\
                        </div>',
            'HostDiv':'<a class="Ranking" data-surfing="{0}">\
                            <span class="userId">{1}</span>\
                            <img class="userIcon" src="{2}" alt="" />\
                            <div class="userDetals">\
                                <span class="Name">{3}</span>\
                                {4}\
                            </div>\
                       </a>'
        };

    var Page={
        'run':function(){
            this.load();
            this.render();
        },
        'load':function(){
            var loginKey = Utility.URL.queryString('login_key');
            var sUrl='service/activity/v3/10?loginKey='+loginKey+'&activityType=0&roomId=0';
            this.sLoginKey=loginKey;
            Bussiness.getData(sUrl,function(data){
                if(data['code']==0){
                    this.oInfo=data['dataInfo'];
                    this.renderScreen1();
                    this.renderTabTitle();
                    this.renderRank();
                    this.showH5();
                    this.start();
                    this.toLive();
                    this.polling();
                }
            }.bind(this),null,'isV3');
        },
        'render':function(){
            this.container = $('#container');
        },
        'renderScreen1':function(){
            var sInfo='';
            if(this.sLoginKey){
                if(this.oInfo['user_gift']){
                    sInfo=' <span>نسبة تبرعك </span>\
                            <img src="/resource/static/image/2016eid/self-send.png" alt=""/>\
                            <span class="self_sends">'+(this.oInfo['user_gift']/10)+'</span>';
                    this.sScreen1=stringFormat(TEMPLATE.Screen1,this.oInfo['eid_gift'],'',sInfo);
                }else{
                    this.sScreen1=stringFormat(TEMPLATE.Screen1,this.oInfo['eid_gift'],'','لسه ماتبرعت ياشيخ ؟!');
                }
            }else{
                this.sScreen1=stringFormat(TEMPLATE.Screen1,this.oInfo['eid_gift'],'box_vh',this.oInfo['user_gift']);
            }
        },
        'renderTabTitle':function(){
            var sInfoUserSend="";
            var sInfohostReceive="";
            if(this.sLoginKey){
                if(this.oInfo['user_rank_num']>0){
                    sInfoUserSend='أنت الاَن في المركز: '+this.oInfo['user_rank_num'];
                }else{
                    sInfoUserSend='<span>ناقصك</span>\
                    <span>'+this.oInfo['user_disparity']+'</span>\
                    <img src="/resource/static/image/2016eid/self-send.png" alt=""/>\
                    <span>تمرة وتدخل القائمة </span>';
                }
                if(this.oInfo['room_rank_num']>0){
                    sInfohostReceive=this.oInfo['room_nickName']+' في المركز '+this.oInfo['room_rank_num'];
                }else if(this.oInfo['room_disparity']>0){
                    sInfohostReceive='<span>باقي</span>'+
                    '<span> '+this.oInfo['room_disparity']+'</span>'+
                    '<img src="/resource/static/image/2016eid/self-send.png" alt=""/> '+
                    '<span>تمرة  لدخول</span> '+this.oInfo['room_nickName']+' <span>القائمة</span>';
                }else{
                    sInfohostReceive='';
                }
            }else{
                sInfoUserSend='';
                sInfohostReceive='';
            }

            this.sInfoUserSend=sInfoUserSend;
            this.sInfohostReceive=sInfohostReceive;
        },
        'renderRank':function(){
            var iLeftUserNum=0;
            var iLeftHostNum=0;
            var iTempObj={};
            var aHostRank=this.oInfo['room_rank'];
            var aUserRank=this.oInfo['user_rank'];


            //console.log('用户个数：'+aUserRank.length);
            if(aUserRank.length<50){
                iLeftUserNum=50-aUserRank.length;
                for(var i=0;i<iLeftUserNum;i++){
                    aUserRank.push(iTempObj)
                }
               // console.log('还差'+iLeftUserNum+'个用户');
            }

            //console.log('主播个数：'+aHostRank.length);
            if(aHostRank.length<20){
                iLeftHostNum=20-aHostRank.length;
                for(var k=0;k<iLeftHostNum;k++){
                    aHostRank.push(iTempObj)
                }
                //console.log('还差'+iLeftHostNum+'个主播');
            }

            //主播排行
            this.sHostLi='<li class="HostLists">';
            aHostRank.forEach(function (item, index, array) {
                if(index && index%10==0){
                    this.sHostLi+='</li><li class="HostLists">';
                }
                this.sHostLi+=(function(item,sTplHostDiv){
                    var sSurfing=item['surfing']?item['surfing']:'';
                    var iRank=index+1;
                    var sImgSrc=item['headPic']?DOMAIN_CONFIG['IMAGE_DOMAIN']+item['headPic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123';
                    var sUserName=item['nickName']?item['nickName']:'';
                    var iNumber=item['number']?'<span class="Gold">'+item['number']+'</span>':'';

                    return stringFormat(sTplHostDiv,sSurfing,iRank,sImgSrc,sUserName,iNumber);
                })(item,TEMPLATE.HostDiv)

            }.bind(this));
            this.sHostLi+='</li>';
            //用户排行
            this.sUserLi='<li class="UserLists">';
            aUserRank.forEach(function (item, index, array) {
                if(index && index%10==0){
                    this.sUserLi+='</li><li class="UserLists">';
                }
                this.sUserLi+=(function(item,sTplHostDiv){
                    var iRank=index+1;
                    var sImgSrc=item['headPic']?DOMAIN_CONFIG['IMAGE_DOMAIN']+item['headPic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123';
                    var sUserName=item['nickName']?item['nickName']:'';
                    var iNumber=item['number']?'<span class="Gold">'+item['number']+'</span>':'';
                    return stringFormat(sTplHostDiv,iRank,sImgSrc,sUserName,iNumber);
                })(item,TEMPLATE.UserDiv)

            }.bind(this));
            this.sUserLi+='</li>';
        },
        'showH5':function(){
            this.container.html(stringFormat(TEMPLATE.Main,this.sScreen1,this.sInfohostReceive,this.sInfoUserSend,this.sHostLi,this.sUserLi));
        },
        'start': function() {
            this.touchPrevent();
            this.switchRank();
            this.screenSwipeUpDown();
            this.hostRankLandR();
            this.userRankLandR();
        },
        'toLive':function(){
            var aHost=$('.HostLists .Ranking');
            aHost.click(function(){
                var sSurfing=$(this).attr('data-surfing');
                var sMakeLink= Bridge.link.logic('live',{'surfing':sSurfing});
                Bridge.callNative(sMakeLink);
            });
        },
        'polling':function(){
            this.i=0;
            window.setInterval(this.pollHandle.bind(this),10000);
        },
        'pollHandle':function(){
            var loginKey = this.sLoginKey;
            var sUrl='service/activity/v3/10?loginKey='+loginKey+'&activityType=0&roomId=0';
            Bussiness.getData(sUrl,function(data){
                if(data['code']==0){
                    this.oInfo=data['dataInfo'];
                    this.pollScreen1();
                    this.pollRankTitle();
                    this.pollRank();
                    this.renderTop3();
                    this.pollRenderRank(this.rankUserNum,this.rankHostNum);
                    this.toLive();
                    this.hostRankLandR(this.rankHostNum);
                    this.userRankLandR(this.rankUserNum);
                }
            }.bind(this),null,'isV3');
            //console.log('polling '+(++this.i)+' times！');
        },
        'pollScreen1':function(){
            var sInfo='';
            var oSelfSend=$('.selfSend');
            var oSpanTotal=$('#pg-top .allReceived span');

            oSpanTotal.html(this.oInfo['eid_gift']);

            if(this.oInfo['user_gift']){
                sInfo=' <span>نسبة تبرعك</span>\
                        <img src="/resource/static/image/2016eid/self-send.png" alt=""/>\
                        <span class="self_sends">'+(this.oInfo['user_gift']/10)+'</span>';
                oSelfSend.html(sInfo);
            }else{
                oSelfSend.html('لسه ماتبرعت ياشيخ ؟!');
            }
        },
        'pollRankTitle':function(){
            var oHost_send=$('.host_send');
            var oUser_send=$('.user_send');
            var sInfoUserSend="";
            var sInfohostReceive="";

            if(this.sLoginKey){
                if(this.oInfo['user_rank_num']>0){
                    sInfoUserSend='أنت الاَن في المركز: '+this.oInfo['user_rank_num'];
                }else{
                    sInfoUserSend='<span>ناقصك</span>\
                    <span>'+this.oInfo['user_disparity']+'</span>\
                    <img src="/resource/static/image/2016eid/self-send.png" alt=""/>\
                    <span> تمرة وتدخل القائمة </span>';
                }

                if(this.oInfo['room_rank_num']>0){
                    sInfohostReceive=this.oInfo['room_nickName']+' في المركز'+this.oInfo['room_rank_num'];
                }else if(this.oInfo['room_disparity']>0){
                    sInfohostReceive='<span>باقي</span>'+
                    '<span> '+this.oInfo['room_disparity']+'</span>'+
                    '<img src="/resource/static/image/2016eid/self-send.png" alt=""/> '+
                    '<span>تمرة  لدخول</span> '+this.oInfo['room_nickName']+' <span>القائمة</span>';
                }else{
                    sInfohostReceive='';
                }
            }else{
                sInfoUserSend='';
                sInfohostReceive='';
            }
            oHost_send.html(sInfohostReceive);
            oUser_send.html(sInfoUserSend);
        },
        'pollRank':function(){
            var oHostUl=$('#HostLists');
            var oUserUl=$('#UserLists');
            this.renderRank();
            oHostUl.html(this.sHostLi);
            oUserUl.html(this.sUserLi);
        },
        'renderTop3':function(){
            for(var i=0;i<3;i++){
                $("#HostLists .Ranking").eq(i).children()[0].setAttribute("class","userId userIds");
                $("#UserLists .Ranking").eq(i).children()[0].setAttribute("class","userId userIds");
            }

            $("#HostLists .Ranking").eq(0).children()[1].setAttribute("class","userIcon userIcon1");
            $("#HostLists .Ranking").eq(1).children()[1].setAttribute("class","userIcon userIcon2");
            $("#HostLists .Ranking").eq(2).children()[1].setAttribute("class","userIcon userIcon3");
            $("#UserLists .Ranking").eq(0).children()[1].setAttribute("class","userIcon userIcon1");
            $("#UserLists .Ranking").eq(1).children()[1].setAttribute("class","userIcon userIcon2");
            $("#UserLists .Ranking").eq(2).children()[1].setAttribute("class","userIcon userIcon3");
        },
        'pollRenderRank':function(numX,numY){
            var UserWidth=$(".UserLists").css("width");
            var UserLength=$("#UserLists .UserLists").length;
            var HostWidth=$(".HostLists").css("width");
            var HostLength=$("#HostLists .HostLists").length;
            UserWidth=parseInt(UserWidth);
            var iUserLimit=numX?numX:1;
            var iHostLimit=numY?numY:1;

            var x1=1;
            var x2=1;
            while(x1<UserLength){
                $("#UserLists>.UserLists").eq(x1).css({"right":UserWidth});
                x1++;
            };
            while(x2<iUserLimit){
                $("#UserLists>.UserLists").eq(x2).css({"right":0});
                x2++;
            };

            var y1=1;
            var y2=1;
            while(y1<HostLength){
                $("#HostLists .HostLists").eq(y1).css({"right":HostWidth});
                y1++;
            };
            while(y2<iHostLimit){
                $("#HostLists .HostLists").eq(y2).css({"right":0});
                y2++;
            };
        },
        'touchPrevent':function(){
            document.addEventListener("touchmove",function(event){
                event.preventDefault();
            });
        },
        'switchRank':function(){
            var _this=this;
            var UserWidth=$(".UserLists").css("width");
            var UserLength=$("#UserLists .UserLists").length;
            var HostWidth=$(".HostLists").css("width");
            var HostLength=$("#HostLists .HostLists").length;

            UserWidth=parseInt(UserWidth);
            if(HostLength==1){
                $(".btn_left").addClass("img_filter");
            }
            if(UserLength==1){
                $(".btn_right_user").addClass("img_filter");
            }
            var x=1
            while(x<UserLength){
                $("#UserLists .UserLists").eq(x).css({"right":UserWidth});
                x++;
            };
            var y=1;
            while(y<HostLength){
                $("#HostLists .HostLists").eq(y).css({"right":HostWidth});
                y++;
            };
            $(".host_list").on("click",function(){
                $(".host_list").css("backgroundColor","#2B5590");
                $(".user_list").css("backgroundColor","#3F6BA7");
                $("#HostLists").css("display","block");
                $("#UserLists").css("display","none");
                $(".pg_center_btn").css("display","block");
                $(".pg_center_btn_user").css("display","none");
                $('.user_send').css("display","none");
                $('.host_send').css("display","block");
            });
            $(".user_list").on("click",function(){
                $(".user_list").css("backgroundColor","#2B5590");
                $(".host_list").css("backgroundColor","#3F6BA7");
                $("#UserLists").css("display","block");
                $("#HostLists").css("display","none");
                $(".pg_center_btn_user").css("display","block");
                $(".pg_center_btn").css("display","none");
                $('.user_send').css("display","block");
                $('.host_send').css("display","none");
            })
        },
        'screenSwipeUpDown':function(){
            var height1=$("#pg-top").css("height");
            height1=parseInt(height1);
            window['nimeiH']=height1;
            $("#pg-top").on("swipeUp",function(){

                $("#pg-top").css('z-index','1');
                $("#pg-middle").css('z-index','2');
                $("#pg-middle").animate({top:0},350);
                setTimeout("$('#pg-top').css('top',-window['nimeiH'])",450);
                for(var i=0;i<3;i++){
                    $("#HostLists .Ranking").eq(i).children()[0].setAttribute("class","userId userIds");
                    $("#UserLists .Ranking").eq(i).children()[0].setAttribute("class","userId userIds");
                }
                $("#HostLists .Ranking").eq(0).children()[1].setAttribute("class","userIcon userIcon1");
                $("#HostLists .Ranking").eq(1).children()[1].setAttribute("class","userIcon userIcon2");
                $("#HostLists .Ranking").eq(2).children()[1].setAttribute("class","userIcon userIcon3");
                $("#UserLists .Ranking").eq(0).children()[1].setAttribute("class","userIcon userIcon1");
                $("#UserLists .Ranking").eq(1).children()[1].setAttribute("class","userIcon userIcon2");
                $("#UserLists .Ranking").eq(2).children()[1].setAttribute("class","userIcon userIcon3");

            });
            $("#pg-middle").on("swipeUp",function(){
                $("#pg-bottom").css('z-index','2');
                $("#pg-middle").css('z-index','1');
                $("#pg-bottom").animate({"top":0},350);
                setTimeout("$('#pg-middle').css('top',-window['nimeiH'])",450);
            });
            $("#pg-bottom").on("swipeDown",function(){
                $("#pg-bottom").css('z-index','1');
                $("#pg-middle").css('z-index','2');
                $("#pg-middle").animate({"top":0},350);
                setTimeout("$('#pg-bottom').css('top',window['nimeiH'])",450);
            });
            $("#pg-middle").on("swipeDown",function(){
                $("#pg-top").css('z-index','2');
                $("#pg-middle").css('z-index','1');
                $("#pg-top").animate({"top":0},350);
                setTimeout("$('#pg-middle').css('top',window['nimeiH'])",450);
            });
        },
        'hostRankLandR':function(num){
            var _this=this;
            var l=num?num:1;
            _this.rankHostNum=l;
            //console.log('主播排行榜默认'+_this.rankHostNum);
            $("#HostLists").on("swipeRight",function(){
                var HostLength=$("#HostLists .HostLists").length;
                if(l<HostLength){
                    $(".btn_right").removeClass("img_filter");
                    $("#HostLists>.HostLists").eq(l).animate({"right":0},600);
                    l++;
                }
                if(l==HostLength){
                    $(".btn_left").addClass("img_filter");
                }
                _this.rankHostNum=l;
                //console.log('主播排行榜当前>'+_this.rankHostNum);
            });
            $(".btn_left").on("click",function(){
                var HostLength=$("#HostLists .HostLists").length;
                if(l<HostLength){
                    $(".btn_right").removeClass("img_filter");
                    $("#HostLists>.HostLists").eq(l).animate({"right":0},600);
                    l++;
                }
                if(l==HostLength){
                    $(".btn_left").addClass("img_filter");
                }
                _this.rankHostNum=l;
               // console.log('主播排行榜当前>'+_this.rankHostNum);
            })
            $("#HostLists").on("swipeLeft",function(){
                var HostWidth=$(".HostLists").css("width");
                if(l>1){
                    $(".btn_left").removeClass("img_filter");
                    $("#HostLists>.HostLists").eq(l-1).animate({"right":HostWidth},600);
                    l--;
                }
                if(l==1){
                    $(".btn_right").addClass("img_filter");
                }
                _this.rankHostNum=l;
                //console.log('<主播排行榜当前'+_this.rankHostNum);
            });
            $(".btn_right").on("click",function(){
                var HostWidth=$(".HostLists").css("width");
                if(l>1){
                    $(".btn_left").removeClass("img_filter");
                    $("#HostLists>.HostLists").eq(l-1).animate({"right":HostWidth},600);
                    l--;
                }
                if(l==1){
                    $(".btn_right").addClass("img_filter");
                }
                _this.rankHostNum=l;
                //console.log('<主播排行榜当前'+_this.rankHostNum);
            })
        },
        'userRankLandR':function(num){
            var _this=this;
            var j=num?num:1;
            _this.rankUserNum=j;
            //console.log('用户排行榜默认'+_this.rankUserNum);
            $("#UserLists").on("swipeRight",function(){
                var UserLength=$("#UserLists .UserLists").length;
                if(j<UserLength){
                    $(".btn_right_user").removeClass("img_filter");
                    $("#UserLists>.UserLists").eq(j).animate({"right":0},600);
                    j++;
                }
                if(j==UserLength){
                    $(".btn_left_user").addClass("img_filter");
                }
                _this.rankUserNum=j;
               // console.log('用户排行榜当前>'+_this.rankUserNum);
            });
            $(".btn_left_user").on("click",function(){
                var UserLength=$("#UserLists .UserLists").length;
                if(j<UserLength){
                    $(".btn_right_user").removeClass("img_filter");
                    $("#UserLists>.UserLists").eq(j).animate({"right":0},600);
                    j++;
                }
                if(j==UserLength){
                    $(".btn_left_user").addClass("img_filter");
                }
                _this.rankUserNum=j;
                //console.log('用户排行榜当前>'+_this.rankUserNum);
            })
            $("#UserLists").on("swipeLeft",function(){
                var UserWidth=$(".UserLists").css("width");
                if(j>1){
                    $(".btn_left_user").removeClass("img_filter");
                    $("#UserLists>.UserLists").eq(j-1).animate({"right":UserWidth},600);
                    j--;
                }
                if(j==1){
                    $(".btn_right_user").addClass("img_filter");
                }
                _this.rankUserNum=j;
                //console.log('<用户排行榜当前'+_this.rankUserNum);
            });
            $(".btn_right_user").on("click",function(){
                var UserWidth=$(".UserLists").css("width");
                if(j>1){
                    $(".btn_left_user").removeClass("img_filter");
                    $("#UserLists>.UserLists").eq(j-1).animate({"right":UserWidth},600);
                    j--;
                }
                if(j==1){
                    $(".btn_right_user").addClass("img_filter");
                }
                _this.rankUserNum=j;
                //console.log('<用户排行榜当前'+_this.rankUserNum);
            })
        }
    };

    Page.run();
});

