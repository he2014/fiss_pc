define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'Main':'<div class="wrap">\
                        <div class="withdrawals">\
                            <div class="money_top">\
                                <span class="back_up">\
                                    <a href="javascript:;" ></a>\
                                </span>\
                                <span class="cash_user">Para çek</span>\
                                <a href="javascript:;" class="page_record">Kayıt</a>\
                            </div>\
                            <div class="money_info">\
                                <div class="user_money_info">\
                                    <div class="earn_money">\
                                        <span class="all_money">Çekilebilir gelir (Dolar)</span>\
                                        <div class="total_money">\
                                            <span class="money_ico">$</span>\
                                            <span class="monery_num">{0}</span>\
                                        </div>\
                                    </div>\
                                    <div class="can_received">\
                                        <span>Çekilmemiş gelir (Dolar) </span>\
                                        <span class="can_taked">${1}</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="gapy_info">\
                                <div class="user_gapy_info">\
                                    <div class="Gapy">\
                                        <span>Gpay Hesabı</span>\
                                        <input type="text" readonly value="{2}" />\
                                        <a class="edit_gpay" href="javascript:;"><span>İptal</span></a>\
                                    </div>\
                                    <div class="captcha">\
                                        <input id="enter_cap" type="text" placeholder="Doğrulama Kodu" />\
                                        <a class="captcha_btn" href="javascript:;"><span>Gönder</span></a>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="btn_send">\
                                <a class="sub_btn" href="javascript:;"><span>Para çek</span></a>\
                            </div>\
                        </div>\
                        <div class="record">\
                            <div class="record_top">\
                                <span class="page_back_money">\
                                    <a href="javascript:;"></a>\
                                </span>\
                                <span>Para çekme geçmişi</span>\
                            </div>\
                            <div class="record_lists">\
                                {3}\
                            </div>\
                        </div>\
                        <div class="block_tips_gapy">\
                            <div class="check_Gapy">\
                                <span class="tips_top"></span>\
                            <span class="edit_gapy">\
                                <input type="text" placeholder="Doğrulama Kodu" autofocus />\
                            </span>\
                            <span class="tips_contents">\
                                Gpay hesabınızı değiştirmek istediğinizden emin misiniz? Bu değişiklik gelirinizi çekmenizde etkili olacaktır, lütfen dikkatli olun!\
                            </span>\
                                <div class="check_btns">\
                                <span class="edit_cancle">\
                                    <a href="javascript:;"><span>İptal</span></a>\
                                </span>\
                                <span class="edit_ok">\
                                    <a href="javascript:;"><span>İptal</span></a>\
                                </span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="block_tips_money">\
                            <div class="check_money">\
                                <span class="tips_top"></span>\
                            <span class="out_money_tip">\
                                （x月23日-x月23日） arasındaki gelirinizi çekmek isteediğinizden emin misiniz?\
                            </span>\
                                <div class="check_btns">\
                                <span class="money_cancle">\
                                    <a href="javascript:;"><span>İptal</span></a>\
                                </span>\
                                <span class="money_ok">\
                                    <a href="javascript:;"><span>İptal</span></a>\
                                </span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="error_tips">\
                            <span class="error_tips_cont"></span>\
                        </div>\
                    </div>',
            'Payitem':'<div class="detail">\
                            <div class="record_detail">\
                                <span class="record_data">\
                                    <span class="data_month">06-21</span>\
                                    <span class="data_day">18:34</span>\
                                </span>\
                                <span class="record_money">-99$</span>\
                                <span class="record_money_state false_state">\
                                    <a href="javascript:;" class="state">Tamamlandı</a>\
                                </span>\
                            </div>\
                            <div class="false_tips">\
                                <span>Your order is still in processing. If you already payed successfully, please wait patiently, maybe beucause of network or another reasons could be delayed. Have any questions, please contact customer service.\
                    +20 01009222031</span>\
                            </div>\
                        </div>'

        };

    var Page= {
        'run': function () {
            this.load();
        },
        'load': function () {
            this.loginKey = Utility.URL.queryString('login_key');


            var promise = new Promise(function(){


                var sUrl='exchange/v3/exchangePhoneInit';
                Bussiness.getData(sUrl,function(data){
                    this.page1Data=data;
                    promise.resolve();
                }.bind(this),null,'isV3');



            }.bind(this)).then(function(){


                var sUrl='exchange/v3/getExchangeRecord';
                Bussiness.getData(sUrl,function(data){
                    this.page2Data=data;
                    promise.resolve();
                }.bind(this),null,'isV3');


            }.bind(this)).then(this.render.bind(this));




        },
        'render': function () {
            this.container = $('#container');

            console.log(11111);
            console.log(this.page1Data);
            console.log(11111);


            console.log(22222);
            console.log(this.page2Data);
            console.log(22222);




            this.renderPage1();
            this.renderPage2();
            this.bind();
            //this.sMain =stringFormat(TEMPLATE.Main, this.BannerInfo,this.bHost,this.HostInfo,this.bMore,this.bJoin);
            this.container.html( TEMPLATE.Main );

        },
        'bind': function () {
            var tr=true,
                edit=true,
                get_gapy= 1,
                setTime=function(){
                    $(".error_tips").show();
                    setTimeout(function(){
                        $(".error_tips").hide();
                        $(".error_tips").removeClass("success_tips")
                    },1000)
                },
                height=$(".container").height(),
                height1=$(".record_top").height(),
                margin=$(".record_lists").css("margin-top");

            //记录页滑出
            $(".page_record").bind("click",function(){
                $(".record").animate({"left":0},600);
            });
            //记录页滑回
            $(".page_back_money").bind("click",function(){
                $(".record").animate({"left":750},600);
            });
            //记录详情展开和收起
            $(".false_state a.state").bind("click",function(){
                if(tr){
                    $(this).parents(".record_detail").next(".false_tips").show("slow");
                    $(this).addClass("state_fals");
                    tr=false
                }else{
                    $(this).parents(".record_detail").next(".false_tips").hide("hide");
                    $(this).removeClass("state_fals");
                    tr=true;
                }
            });
            //编辑Gpay
            $(".edit_gpay").bind("click",function(){
                $(".block_tips_gapy").show();
                $(".edit_gapy").show();
                $(".tips_contents").hide();
            });
            //编辑Gpay-确定按钮
            $(".edit_ok").bind("click",function(){
                if(edit){
                    $(".edit_gapy").hide();
                    $(".tips_contents").show();
                    $(".edit_cancle").bind("click",function(){
                        $(".block_tips_gapy").hide();
                        $(".check_Gapy .edit_gapy>input").val("");
                        edit=true;
                    });
                    edit=false;
                }else{
                    var val=$(".edit_gapy input").val();
                    if(!$.trim(val)=='')
                        $(".Gapy input").val($.trim(val));
                    else{
                        $(".error_tips span").html("Lütfen doğru Gpay hesabı girin");
                        setTime();
                        console.log("Gapy不正确")
                    }
                    $(".block_tips_gapy").hide();
                    $(".edit_cancle").bind("click",function(){
                        $(".block_tips_gapy").hide();
                        edit=true;
                    });
                    edit=true;
                }
            });
            //编辑Gpay-取消按钮
            $(".edit_cancle").bind("click",function(){
                $(this).parents(".block_tips_gapy").hide();
                $(".check_Gapy .edit_gapy>input").val("");
            });
            //获取验证码
            $(".captcha_btn").bind("click",function(){
                if(get_gapy==1){
                    get_gapy=2;
                    var that=this;
                    $(this).addClass("refuse_btn");
                    var time=180;
                    $(this).children().html(time+"s");
                    console.log("获取验证码");
                    var setInter=setInterval(function(){
                        time--;
                        $(that).children().html(time+"s");
                        if(time<=0){
                            $(that).removeClass("refuse_btn");
                            $(that).children().html("Gönder");
                            get_gapy=1;
                            clearInterval(setInter);
                        }
                    },1000)
                }
            });
            //提现按钮
            $(".sub_btn").bind("click",function(){
                var earn=$(".can_taked").text();
                earn=earn=='' || earn=="0" || earn=="$0" ? false : earn;
                if(!earn){
                    $(".error_tips span").html("Şu an çekebileceğiniz geliriniz yok!");
                    setTime();
                }else
                    $(".block_tips_money").show();
            });
            //提现按钮-确定按钮
            $(".money_ok").bind("click",function(){
                $(".block_tips_money").hide();
                $(".error_tips").addClass("success_tips");
                $(".success_tips span").html("Para çekme talebi alınmıştır. 2-3 iş günü içerisinde işleminizi kontrol edin.");
                setTime();
                console.log("确定提现操作")
            });
            //提现按钮-取消按钮
            $(".money_cancle").bind("click",function(){
                $(".block_tips_money").hide();
            });
            //6个月没有记录
            margin=parseInt(margin);
            $(".record_lists").css("height",(height-height1-margin));
            if($(".record_lists>div").length==0){
                $(".record_lists").append("<span class='no_record_list'>Son 6 aya ait geçmiş bulunmuyor</span>")
            }

        },
        'renderPage1':function(){

        },
        'renderPage2':function(){

        }
    }
    Page.run();
});

