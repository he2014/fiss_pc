define(function(require){
    var Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'];
    Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        Bridge=Utility['Bridge'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        Footer=Body.Footer;
    Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),
        UserTop=require('component/userTop');
    var TEMPLATE={
        'MAIN':'<div class="level_con">\
                    <div class="lev_banner">\
                        <div class="lev_main">\
                            <h2 data-i18n="My_Level">{{My_Level}}</h2>\
                            <div class="high_exp">\
                                <h3 data-i18n="Level_Height">{{Level_Height}}</h3>\
                                <p data-i18n="Level_Height_Tips">{{Level_Height_Tips}}</p>\
                            </div>\
                            <div class="lev_signin">\
                                <p data-i18n="Level_Sign_tips">{{Level_Sign_tips}}</p>\
                                <a href="javascript:void(0);" name="login_buttom" data-i18n="Level_Sign_In">{{Level_Sign_In}}</a>\
                            </div>\
                            <div class="lev_pro">\
                                <div class="lev_pro_top">\
                                    <a class="lev_pro_photo" href="/myinfo.shtml" target="_blank">\
                                        <img name="user_head" src="/resource/systemRes/imgNew/top_img/contr_info_head.png" onerror="this.src=\'/resource/systemRes/img/default/nophoto.jpg\'" alt="user_photo">\
                                    </a>\
                                    <div class="lev_pro_info">\
                                        <h4 name="nick_name"></h4>\
                                        <div class="lev_pro_exp">\
                                            <span class="lev_pro_icon">\
                                                <img name="level_img" src="/resource/systemRes/img/default/level1_01.png" onerror="this.src=\'/resource/systemRes/img/default/level1_01.png\'" alt="level_img" />\
                                            </span>\
                                            <div class="lev_pro_per">\
                                                <span class="exp_per"><i name="level_persent"><font class="exp_per_num" size="0">0%</font></i></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <p class="lev_pro_text">\
                                    <b data-i18n="Level_To_Next_Level">{{Level_To_Next_Level}}</b>\
                                    <strong>:</strong>\
                                    <a name="next_exp">0</a>\
                                    <img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt="" />\
                                </p>\
                            </div>\
                            <div class="lev_line">\
                                <img class="user_exp_circle" src="/resource/systemRes/imgNew/level_img/user_exp_point.png" alt="point" />\
                            </div>\
                            <ul class="exp_num">\
                                <li class="exp_lev0">0</li>\
                                <li class="exp_lev10">39</li>\
                                <li class="exp_lev20">369</li>\
                                <li class="exp_lev30">1493</li>\
                                <li class="exp_lev40">4116</li>\
                                <li class="exp_lev50">9158</li>\
                            </ul>\
                            <ul class="lev_num">\
                                <li class="first">LV1</li>\
                                <li>LV10</li>\
                                <li>LV20</li>\
                                <li>LV30</li>\
                                <li>LV40</li>\
                                <li>LV50</li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="lev_icon">\
                        <div class="lev_icon_tab">\
                            <div class="lev_icon_select">\
                                <ul id="select_list">\
                                    <li class="li_tab_on"><span data-i18n="Level_Heigher_Ranking">{{Level_Heigher_Ranking}}</span></li>\
                                    <li><span data-i18n="Level_Privilege">{{Level_Privilege}}</span></li>\
                                    <li style="display:none;"><span data-i18n="Level_More_Flower">{{Level_More_Flower}}</span></li>\
                                    <li style="display:none;"><span data-i18n="Level_Flower_Shortly">{{Level_Flower_Shortly}}</span></li>\
                                    <li><span data-i18n="Level_Free_Gift">{{Level_Free_Gift}}</span></li>\
                                    <li><span data-i18n="Level_Stay_Tuned">{{Level_Stay_Tuned}}</span></li>\
                                </ul>\
                            </div>\
                            <div class="lev_icon_con">\
                                <ul id="con_list">\
                                    <li>\
                                        <div class="levlf_1">\
                                            <p data-i18n="Height_Level_Detail">{{Height_Level_Detail}}</p>\
                                            <div class="lf_img1">\
                                                <span data-i18n="Height_Level_Detail">{{Height_Level_Detail}}</span>\
                                            </div>\
                                        </div>\
                                        <div class="levrg_1"><img src="/resource/systemRes/imgNew/level_img/rg_1_03.png" alt=""></div>\
                                    </li>\
                                    <li>\
                                        <div class="levlf_1">\
                                            <div class="lf_img2"></div>\
                                        </div>\
                                        <div class="levrg_1"><img src="/resource/systemRes/imgNew/level_img/rg_2_03.png" alt=""></div>\
                                    </li>\
                                    <li>\
                                        <div class="levlf_1">\
                                            <div class="lf_img3">\
                                                <span data-i18n="Height_Level_Cont">{{Height_Level_Cont}}</span>\
                                            </div>\
                                        </div>\
                                        <div class="levrg_1"><img src="/resource/systemRes/imgNew/level_img/rg_3_03.png" alt=""></div>\
                                    </li>\
                                    <li>\
                                        <div class="levlf_1">\
                                            <div class="lf_img4">\
                                                <span data-i18n="Flower_Shortly_Free">{{Flower_Shortly_Free}}</span>\
                                            </div>\
                                        </div>\
                                        <div class="levrg_1"><img src="/resource/systemRes/imgNew/level_img/rg_4_03.png" alt=""></div>\
                                    </li>\
                                    <li>\
                                        <div class="levlf_1">\
                                            <p data-i18n="Free_Gift_Free">{{Free_Gift_Free}}</p>\
                                            <div class="lf_img5"></div>\
                                        </div>\
                                        <div class="levrg_1"><img src="/resource/systemRes/imgNew/level_img/rg_5_03.png" alt=""></div>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="lev_sel">\
                        <div class="lev_instruct" style="display:block">\
                            <h3 data-i18n="Person_Level_Detail">{{Person_Level_Detail}}</h3>\
                            <ul class="lev_word">\
                                <li data-i18n="Person_Level_Detail_Cont">{{Person_Level_Detail_Cont}}</li>\
                                <li data-i18n="Level_Total">{{Level_Total}}</li>\
                            </ul>\
                            <i data-i18n="Level_Stage_Badge">{{Level_Stage_Badge}}</i>\
                            <div class="lev_tab">\
                                <ol>\
                                    <li class="lev_w1" data-i18n="Level_People_Level">{{Level_People_Level}}</li>\
                                    <li class="lev_w1" data-i18n="Level_Experience">{{Level_Experience}}</li>\
                                    <li class="lev_w1 no_rb" data-i18n="Level_Badges">{{Level_Badges}}</li>\
                                </ol>\
                                <ul>\
                                    <li class="lev_w1">1～9</li>\
                                    <li class="lev_w1"><b>39</b><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt=""></li>\
                                    <li class="lev_w1 no_rb"><img src="/resource/systemRes/imgNew/level_img/user1_10.png" alt=""></li>\
                                </ul>\
                                <ul class="lev_on">\
                                    <li class="lev_w1">10～19</li>\
                                    <li class="lev_w1"><b>369</b><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt=""></li>\
                                    <li class="lev_w1 no_rb"><img src="/resource/systemRes/imgNew/level_img/user2_20.png" alt=""></li>\
                                </ul>\
                                <ul>\
                                    <li class="lev_w1">20～29</li>\
                                    <li class="lev_w1"><b>1493</b><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt=""></li>\
                                    <li class="lev_w1 no_rb"><img src="/resource/systemRes/imgNew/level_img/user3_30.png" alt=""></li>\
                                </ul>\
                                <ul class="lev_on">\
                                    <li class="lev_w1">30～39</li>\
                                    <li class="lev_w1"><b>4116</b><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt=""></li>\
                                    <li class="lev_w1 no_rb"><img src="/resource/systemRes/imgNew/level_img/user4_40.png" alt=""></li>\
                                </ul>\
                                <ul>\
                                    <li class="lev_w1">40～49</li>\
                                    <li class="lev_w1"><b>9158</b><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt=""></li>\
                                    <li class="lev_w1 no_rb"><img src="/resource/systemRes/imgNew/level_img/user5_50.png" alt=""></li>\
                                </ul>\
                            </div>\
                            <h3 class="" data-i18n="Level_Obtain_Experience">{{Level_Obtain_Experience}}</h3>\
                            <ul class="lev_word">\
                                <li data-i18n="Level_New_Registration">{{Level_New_Registration}}\
                                    <span class="mar_top28" data-i18n="Level_Mission1">{{Level_Mission1}}</span>\
                                    <span data-i18n="Level_Mission2">{{Level_Mission2}}</span>\
                                    <span style="display:none;" data-i18n="Level_Mission3">{{Level_Mission3}}</span>\
                                    <span data-i18n="Level_Mission4">{{Level_Mission4}}</span>\
                                    <p class="mar_top28" data-i18n="Level_Note_Allowed">{{Level_Note_Allowed}}</p>\
                                </li>\
                                <li data-i18n="Level_Keep_Login">{{Level_Keep_Login}}</li>\
                                <li style="display:none;" data-i18n="Level_Sending_Flower">{{Level_Sending_Flower}}</li>\
                                <li data-i18n="Level_Sending_Flower_Num">{{Level_Sending_Flower_Num}}</li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>'
    };

    var Page =window['Page']= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
            this.identifyFlow();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
        },
        compose:function(){
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
        },
        bind:function(){

        },
        start:function(){

        },
        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.identified.bind(this));
        },
        'identify': function() {
            this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            if (user)
                return this.identity = JSON.parse(user);
            else {
                var userName = Cookie.get(Cookie.key['login_name']);
                if (!userName)
                    return 'anonymous';
                Bussiness.postData('user_init_user_info.fly', {
                    'loginName': userName
                }, function(data) {
                    if (data && data.code == 0)
                        this.promise.resolve(this.identity = data);
                    else
                        this.promise.resolve();
                }.bind(this), function() {
                    this.promise.resolve();
                }.bind(this));
            }
        },
        'identified': function() {
            Header.identified(this.identity);
            $("[name='login_buttom']").unbind("click").click(function(){login_util.show_login_div();});
            var act_level_info = new function(){
                this.reset_self_level_info=function(){
                    if(!user_util.user_info){
                        $(".lev_signin").show();
                        $(".lev_pro").hide();
                        $(".user_exp_circle").hide();
                        return;
                    }
                    top_util.show_user_detail();
                    $(".lev_signin").hide();
                    $(".lev_pro").show();
                    $(".user_exp_circle").show();
                };
            };

            $(function(){
                act_level_info.reset_self_level_info();
                $("#select_list li").unbind("click").click(function(){
                    var idx = $(this).index();
                    if( idx == 5){
                        return;
                    }
                    $("#select_list li").removeClass('li_tab_on');
                    $(this).addClass('li_tab_on');
                    $("#con_list li").hide().eq(idx).show();
                });
                $('table tr:odd').css({'background':'#f8fcff'});
                $('table tr:even').css({'background':'#f1faff'});
            });
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});