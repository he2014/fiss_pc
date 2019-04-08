define(function(require){
    require('js/reference/jquery.js');
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':'<div class="wrap">\
                        <div class="block_tips2 hidden">\
                            <div class="info_tips">\
                                <span class="tips_detail"></span>\
                            </div>\
                        </div>\
                        <div class="block_tips hidden">\
                            <div class="Tickets">\
                                <span class="Tickets_Cont">هل تريد استخدام<image src="/resource/static/image/2016Sweepstakes/tickets_img.png">للمشاركة في السحب ؟</span>\
                                <div class="Tickets_Btns">\
                                    <span class="cancle_btn">\
                                        <a href="javascript:;">إلغاء</a>\
                                    </span>\
                                    <span class="ok_btn">\
                                        <a href="javascript:;">استمرار</a>\
                                    </span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="sweep_success_block hidden">\
                            <div class="Sweep_Result_Success">\
                                <span class="Sweep_Success_Cont"></span>\
                                <div class="Sweep_Success_Btns">\
                                    <span class="ok_btn">\
                                        <a href="javascript:;">استمر بالسحب </a>\
                                    </span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="sweep_false_block hidden">\
                            <div class="Sweep_Result_False">\
                                <span class="Sweep_False_Cont">للأسف لم يحالفك الحظ ! حاول مرة أخرى</span>\
                                <div class="Sweep_False_Btns">\
                                    <span class="ok_btn">\
                                        <a href="javascript:;">استمر بالسحب </a>\
                                    </span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="Page_Top">\
                            <span class="Page_Top_Details">\
                                <span>شاهد بث مقدمي قناة روتانا </span>\
                                <span>على تطبيق 7 نجوم وشارك بالسحب  !</span>\
                            </span>\
                        </div>\
                        <div class="Page_Tips">\
                            <span class="Page_Tips1">أخبار سارة : الآن وعلى قناة روتانا خليجية شاهد مضيفي برنامج 7 نجوم في برنامج "ساعة شباب" ، قم بمتابعة البث على التطبيق .</span>\
                            <span class="Page_Tips2"> بنفس الوقت سيكون مقدمي برنامج "ساعة شباب" ضيوف على برنامج 7 نجوم ، دردش معهم وتعرف على قصص نجاحهم . </span>\
                        </div>\
                        <div class="User_Lists">\
                            <h1 class="User_List_Tips">جدول مواعيد البث المباشر على تطبيق 7 نجوم :</h1>\
                             <div class="User_List">\
                                <div class="Host_List">\
                                    <span class="List_Detail">الخميس 08/12/2016</span>\
                                    <div class="Lists">\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 17:00-16:00</span>\
                                            <div class="Host host1">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon2.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused1"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 22:00-21:00</span>\
                                            <div class="Host host2">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon1.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused2"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="Host_List">\
                                    <span class="List_Detail">الخميس 08/12/2016</span>\
                                    <div class="Lists">\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 17:00-16:00</span>\
                                            <div class="Host host3">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon4.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused3"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 22:00-21:00</span>\
                                            <div class="Host host4">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon3.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused4"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="Host_List">\
                                    <span class="List_Detail">الخميس 08/12/2016</span>\
                                    <div class="Lists">\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 17:00-16:00</span>\
                                            <div class="Host host5">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon5.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused5"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 22:00-21:00</span>\
                                            <div class="Host host6">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon6.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused6"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="Host_List">\
                                    <span class="List_Detail">الخميس 08/12/2016</span>\
                                    <div class="Lists">\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 17:00-16:00</span>\
                                            <div class="Host host7">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon7.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused7"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                        <div class="Hosts_Pk">\
                                            <span class="Pk_Time">(KSA) 22:00-21:00</span>\
                                            <div class="Host host8">\
                                                <img class="Host_Icon" src="/resource/static/image/2016Sweepstakes/Host_Icon8.png" alt=""/>\
                                                <span class="Followed" data-roomId="83" id="focused8"><a href="javascript:;"></a></span>\
                                                <span class="Host_Bottom"></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                             </div>\
                             <div class="List_Content">\
                                <h1 class="List_Content_Title">مسابقة السحب</h1>\
                                <span class="Content_Detail">الآن احصل على آيفون 7 والعديد من الجوائز القيمة عبر تطبيق 7 نجوم !<br />\
        فقط قم بالتقاط  بطاقة السحب من استوديو مقدمي برنامج ساعة شباب الذين تستضيفهم 7 نجوم لعمل البث المباشر .<br />\
            ملاحظة : اجمع أكثر عدد ممكن من البطائق لتزداد عدد فرص الاشتراك فى السحب على الجوائز القيمة . </span>\
                             </div>\
                        </div>\
                        <div class="SweepStakes">\
                            <span class="Sweep_Times">{0}</span>\
                            <div class="SweepStake_Cycles">\
                                <div class="Cycle_Area">\
                                    <div class="Cycle_Cont">\
                                        <img class="Cycle_Img" src="/resource/static/image/2016Sweepstakes/cycle_img.png" alt=""/>\
                                        <a class="Cycle_Pointer " href="javascript:;">\
                                            <img class="Cycle_Pointer_Img" src="/resource/static/image/2016Sweepstakes/cycle_pointer.png" alt=""/>\
                                        </a>\
                                        <a class="Cycle_Pointer2 hidden" href="javascript:;">\
                                            <img class="" src="/resource/static/image/2016Sweepstakes/cycle_pointer.png" alt=""/>\
                                        </a>\
                                    </div>\
                                    <div class="Cycle_Gift_Area">\
                                        <ul class="Cycle_Gift_Areas clearfix">\
                                            {1}\
                                        </ul>\
                                    </div>\
                                </div>\
                                {2}\
                            </div>\
                        </div>\
                    </div>',
            'OthersRecord':'<li class="User_Gift_Info">{0}</li>',
            'MyRecord':'<div class="All_Gifts_Lists {0}">\
                              <h1 class="All_Gifts_Lists_Tips">سجل جوائز السحب </h1>\
                              {1}\
                          </div>',
            'MyRecordItme':'<div class="Gifts_N">\
                                   <div class="Gifts_Time">\
                                       <span class="Time_Day">{0}</span>\
                                       <span class="Time_Hour">{1}</span>\
                                   </div>\
                                   <span class="Icon_Img">{2}</span>\
                              </div>'
        };

    var Page={
        'run':function(){
            this.load();
        },
        'load':function(loginKey){
            if(loginKey){
                this.loginKey=loginKey;
            }else{
                this.loginKey = Utility.URL.queryString('login_key') ;
            }

            var that=this;
            this.OthersRecord_info='';
            this.MyRecord_info='';


            this.presents=[
                {'gift':'iPhone7','name':'number1special2type3','degreen':22.5,'gift_result':'مبروك ! حصلت على موبايل آيفون 7 <br /> من فضلك راسلنا عبر خدمة المعلاء .','gift_result2':'موبايل آيفون 7'},
                {'gift':'100TelephoneCard','name':'number1special1type3','degreen':67.5,'gift_result':'مبروك ! حصلت على كرت شحن <br /> بـ 100 دولار ، راسلنا عبر خدمة المعلاء .','gift_result2':'كرت شحن بـ 100 دولار'},
                {'gift':'NoGift','name':'403','degreen':112.5,'gift_result':'谢谢参与','gift_result2':''},
                {'gift':'5Diamond','name':'number5special0type12','degreen':157.5,'gift_result':'مبروك ! حصلت على 5 جواهر .','gift_result2':'5 جواهر '},
                {'gift':'Skate','name':'number1special7type11','degreen':202.5,'gift_result':'مبروك ! حصلت على مركبة <br /> يمكنك استخدامها لمدة 7 أيام .','gift_result2':'مركبة لمدة 7 أيام'},
                {'gift':'5000Gold','name':'number5000special0type2','degreen':247.5,'gift_result':'مبروك ! حصلت على 5000 عملة <br /> اذهب إلى "رصيدي" للمشاهدة .','gift_result2':'5000 عملة'},
                {'gift':'NoGift','name':'403','degreen':292.5,'gift_result':'谢谢参与','gift_result2':''},
                {'gift':'VIP','name':'number1special1type9','degreen':337.5,'gift_result':'مبروك ! حصلت على عضوية vip <br /> يمكنك استخدامها لمدة 7 أيام .','gift_result2':'عضوية vip لمدة 7 أيام'}];

            if(this.loginKey){
                var promise = new Promise(function(){
                    //礼物数
                    var sUrl='service/user/v3/property?gift&bl&luck&loginKey='+this.loginKey
                    Bussiness.getData(sUrl,function(data){
                        if(data['code']==0){
                            if(data['dataInfo']['gift'].length>0){
                                data['dataInfo']['gift'].forEach(function(value,index,array){
                                    if(value['gid'] =='250'){
                                        that.Sweep_num=value['num'];
                                    }
                                });
                            }
                        }
                        that.Sweep_num=that.Sweep_num?that.Sweep_num:0;
                        promise.resolve();
                    }.bind(this),null,'isV3');
                }.bind(this)).then(function(){
                        //自己的中奖纪录
                        var sUrl='service/luck/v3/luck/myrecord/wl?loginKey='+this.loginKey
                        Bussiness.getData(sUrl,function(data){
                            if(data['code']==0){
                                if(data['dataInfo']['award'].length>0){
                                    this.MyRecordData=data['dataInfo']['award'];
                                }
                            }
                            this.MyRecordData=this.MyRecordData?this.MyRecordData:0;
                            promise.resolve();
                        }.bind(this),null,'isV3');
                    }.bind(this)).then(function(){
                        //别人的的中奖纪录
                        var sUrl='service/luck/v3/luck/record/wl?loginKey='+this.loginKey
                        Bussiness.getData(sUrl,function(data){
                            if(data['code']==0){
                                if(data['dataInfo']['award'].length>0){
                                    this.OthersRecordData=data['dataInfo']['award'];
                                }
                            }
                            this.OthersRecordData=this.OthersRecordData?this.OthersRecordData:0;
                            promise.resolve();
                        }.bind(this),null,'isV3');
                    }.bind(this)).then(this.mainFun.bind(this));
            }else{
                var promise2 = new Promise(function(){
                    //别人的的中奖纪录
                    var sUrl='service/luck/v3/luck/record/wl?loginKey='+this.loginKey
                    Bussiness.getData(sUrl,function(data){
                        if(data['code']==0){
                            if(data['dataInfo']['award'].length>0){
                                this.OthersRecordData=data['dataInfo']['award'];
                            }
                        }
                        this.OthersRecordData=this.OthersRecordData?this.OthersRecordData:0;
                        promise2.resolve();
                    }.bind(this),null,'isV3');
                }.bind(this)).then(this.mainFun2.bind(this));
            }

        },
        'render':function(){
            this.container = $('#container');
            this.sMain =stringFormat(TEMPLATE.Main, this.Sweep_info,this.OthersRecord_info,this.sMyRecord);
            this.container.html( this.sMain );

            if(this.loginKey){
                if(this.Sweep_num==0){
                    $('.Cycle_Pointer2').removeClass('hidden');
                    $('.Cycle_Pointer').addClass('hidden');
                }
            }

        },
        'bind':function(){
            var that=this;
            //storage
            window['MylocalStore']={
                'Set_Stroge':function(name,value){
                    localStorage.setItem(name,value);
                },
                'Get_Stroge':function(name){
                    return localStorage.getItem(name);
                }
            };
            //无缝滚动
            var Ul_Html=$(".Cycle_Gift_Areas").html();
            $(".Cycle_Gift_Areas").html(Ul_Html+Ul_Html);
            var leng=$('.Cycle_Gift_Areas>li').length,width=$('.User_Gift_Info').width();
            $('.Cycle_Gift_Areas').width(width*leng+"px");
            var Num=0;

            function Cycles(){
                if(Num==leng/2){
                    Num=1;
                    jQuery('.Cycle_Gift_Areas').css({'left':'0px'});
                }else{
                    Num++;
                };
                jQuery('.Cycle_Gift_Areas').animate({'left':-width*Num+'px'},1200);
            }

            setInterval(Cycles,2600);

            //装盘抽奖

            var chang=true,
                rotate_angle= 0,
                imgSrc='/resource/static/image/2016Sweepstakes/',
                j=1;
            var SweepStake={
                'Cycle_Sweep':function(data){
                    var value=data;
                    var result_index;
                    for(var i in that.presents){
                        if (that.presents[i].name==value){
                            result_index = i;
                        }
                    }
                    var rand_circle = Math.ceil(Math.random() * 2) + 1;
                    rotate_angle =  rotate_angle - rotate_angle % 360 + rand_circle * 360 + that.presents[result_index]['degreen'];
                    $(".Cycle_Pointer_Img").css({
                        '-webkit-transform':'rotate('+rotate_angle+'deg)',
                        '-webkit-transform':'rotate('+rotate_angle+'deg)',
                        '-webkit-transition':'-webkit-transform linear 0.8s',
                        'transition':'transform linear 0.8s'
                    });
                    chang=!chang;
                    setTimeout(function(){
                        that.Sweep_num--;
                        chang=!chang;
                        if(data==403){
                            $('.sweep_false_block').removeClass('hidden');
                            $('.sweep_false_block .ok_btn a').click(function(){
                                $('.sweep_false_block').addClass('hidden');
                            });

                            $('.Sweep_Times').html( 'تبقى لديك  '+that.Sweep_num+'  بطاقة سحب للمشاركة في السحب');

                        }else{
                            var res='<img src="'+imgSrc+that.presents[result_index]['gift']+'.png " />'+that.presents[result_index]['gift_result']+'<span class="See_History_Tips"> اذهب إلى "سجل جوائز السحب" لمشاهدة جائزتك </span>';
                            var oDate=new Date();
                            var fdate=(oDate.getMonth()+1)+'.'+oDate.getDate();
                            var ftime=oDate.getHours()+':'+oDate.getMinutes();

                            $('.Sweep_Times').html( 'تبقى لديك  '+that.Sweep_num+'  بطاقة سحب للمشاركة في السحب');
                            $('.Sweep_Success_Cont').html(res);
                            $('.sweep_success_block').removeClass('hidden');
                            $('.sweep_success_block .ok_btn a').click(function(){
                                $('.sweep_success_block').addClass('hidden');
                            });

                            if($('.Gifts_N').length>=1){
                                var sAfter='<div class="Gifts_N"><div class="Gifts_Time"><span class="Time_Day">'+fdate+'</span><span class="Time_Hour">'+ftime+'</span></div><span class="Icon_Img">'+that.presents[result_index]['gift_result']+'</span></div>';
                                jQuery(sAfter).insertAfter(jQuery('.All_Gifts_Lists_Tips'));
                            }else{
                                var sFirst='<h1 class="All_Gifts_Lists_Tips">سجل الجوائز الحاصل عليها </h1><div class="Gifts_N"><div class="Gifts_Time"><span class="Time_Day">'+fdate+'</span><span class="Time_Hour">'+ftime+'</span></div><span class="Icon_Img">'+that.presents[result_index]['gift_result']+'</span></div>';
                                $('.All_Gifts_Lists').html(sFirst);
                                $('.All_Gifts_Lists').removeClass('hidden');
                            }

                        }

                        if(that.Sweep_num==0){
                            $('.Cycle_Pointer2').removeClass('hidden');
                            $('.Cycle_Pointer').addClass('hidden');
                        }

                    },1800);
                }
            };

            $(".Cycle_Pointer").bind('click',function(){
                if(that.loginKey){
                    $('.block_tips').removeClass('hidden');
                }else{
                    that.toLoginSweep();
                }


            });
            //点击抽奖
            $('.Tickets_Btns .ok_btn').bind('click',function(){

                var sUrl='service/luck/v3/luck/wl';
                Bussiness.postData(sUrl,{'loginKey':that.loginKey}, function(data){
                    if(data['code']==0){
                        var nameKey='number'+data['dataInfo']['awardBeans'][0]['number']+'special'+data['dataInfo']['awardBeans'][0]['special']+'type'+data['dataInfo']['awardBeans'][0]['type'];
                    }else if(data['code']==403){
                        nameKey=403;
                    }else{
                        $('.block_tips').addClass('hidden');
                        that.tipsShow(3000,'الرجاء الإنتظار ، وإعادة المحاولة مرة أخرى ');
                    }

                    if(chang){
                        SweepStake.Cycle_Sweep(nameKey);//调用转盘
                        $('.block_tips').addClass('hidden')
                    }
                }.bind(that),function(){
                    $('.block_tips').addClass('hidden');
                    that.tipsShow(3000,'الرجاء الإنتظار ، وإعادة المحاولة مرة أخرى ');
                });

            });


            $('.Tickets_Btns .cancle_btn').bind('click',function(){
                $('.block_tips').addClass('hidden')
            });
            $('.Sweep_False_Btns .ok_btn').bind('click',function(){
                $('.sweep_false_block').addClass('hidden')
            });
        },
        'compose':function(){
            //关注初始化
            $('#'+window['MylocalStore']['Get_Stroge']('focused1')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused2')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused3')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused4')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused5')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused6')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused7')).addClass('Folllowed_After');
            $('#'+window['MylocalStore']['Get_Stroge']('focused8')).addClass('Folllowed_After');
        },
        'toFollow':function(){
            var that=this;
            $(".Followed").bind("click",function(){
                var _this=this;
                that.toFocus=function(loginKey){
                    if(loginKey){
                        that.loginKey=loginKey;
                    }
                    var sUrl='service/room/v3/user/fav/adds';
                    if(that.loginKey){
                        Bussiness.postData(sUrl,{'loginKey':that.loginKey,'ids':83}, function(data){
                            if(data['code']==0){
                                $(_this).addClass('Folllowed_After');
                                //alert($(_this).html());
                                window['MylocalStore']['Set_Stroge']($(_this).attr('id'),$(_this).attr('id'));
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

                var promise3 = new Promise(function(){
                        that.toFocus(login_key);
                        promise3.resolve();
                    }).then(that.load(login_key));


            });
            Bridge.callNative(sMakeLink);
        },
        'toPageData':function(){

            //临时数据
            var aOtherR=[];
            var aMyR=[];

            //抽奖信息模板
            if(this.loginKey){
                if(this.Sweep_num){
                    this.Sweep_info=' تبقى لديك  '+this.Sweep_num+'  بطاقة سحب للمشاركة في السحب';
                }else{
                    this.Sweep_info='<span>تم استهلاك كل بطاقاتك !</span><span>تابع مواعيد البث أعلى الصفحة</span><span> واحصل على بطاقات السحب .</span>';
                }
            }else{
                this.Sweep_info='';
            }


            //别人中奖纪录信息模板
            if(this.OthersRecordData){
                aOtherR=this.OthersRecordData.map(function(data,index){
                    var oJosn={};
                    oJosn.nikeName=data['nickName'];
                    oJosn.name='number'+data['number']+'special'+data['special']+'type'+data['type'];
                    return oJosn;
                });
                for(var i=0;i<this.presents.length;i++){
                    for(var j=0;j<aOtherR.length;j++){
                        if(this.presents[i]['name'] == aOtherR[j]['name']){
                            this.OthersRecord_info+='<li class="User_Gift_Info">'+'حصل '+aOtherR[j]['nikeName']+' في السحب على جائزة '+ this.presents[i]['gift_result2']+'</li>';
                        }
                    }
                }
            }else{
                this.OthersRecord_info+='<li class="User_Gift_Info">--转盘抽奖，赶快行动吧--</li>';
            }

            //自己的中奖信息模板
            if(this.MyRecordData){
                aMyR=this.MyRecordData.map(function(data,index){
                    var oJosn={};
                    var oDate=new Date(data['createTime']);
                    oJosn.date=(oDate.getMonth()+1)+'.'+oDate.getDate();
                    oJosn.time=oDate.getHours()+':'+oDate.getMinutes();
                    oJosn.name='number'+data['number']+'special'+data['special']+'type'+data['type'];
                    return oJosn;
                });
                for(var i=0;i<aMyR.length;i++){
                    for(var j=0;j<this.presents.length;j++){
                        if(aMyR[i]['name'] == this.presents[j]['name']){
                            this.MyRecord_info+='<div class="Gifts_N"><div class="Gifts_Time"><span class="Time_Day">'+aMyR[i]['date']+'</span><span class="Time_Hour">'+aMyR[i]['time']+'</span></div><span class="Icon_Img">'+this.presents[j]['gift_result2']+'</span></div>';
                        }
                    }
                }
                this.sMyRecord=stringFormat(TEMPLATE.MyRecord,'', this.MyRecord_info);
            }else{
                this.sMyRecord=stringFormat(TEMPLATE.MyRecord,'hidden','');
            }

        },
        'mainFun':function(){
            this.toPageData();
            this.render();
            this.bind();
            this.compose();
            this.toFollow();
        },
        'mainFun2':function(){
            this.toPageData();
            this.render();
            this.bind();
            this.compose();
            this.toFollow();
        },
        'toLoginSweep':function(){
            var that=this;
            var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
                    that.load(login_key);
            });
            Bridge.callNative(sMakeLink);
        },
        'toShowWin':function(){
            $('.block_tips').removeClass('hidden');
        },
        'tipsShow':function(iTtime,sInfo){
            $('.block_tips2').find('.tips_detail').text(sInfo);
            $('.block_tips2 ').removeClass('hidden');

            setTimeout(function(){
                $('.block_tips2').find('.tips_detail').text('')
                $('.block_tips2').addClass('hidden');
            },iTtime)

        }
    };

    Page.run();
});

