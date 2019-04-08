define(function(require,exports,module){
    require('cssPage/userTop.css');
    var Kit = require(useJSComponent('kit')),
        Body=Kit.use('Body'),
        Header=Body.Header,
       
        Footer=Body.Footer,
        Bussiness = Kit.use('Bussiness');
    var Utility =require(JS_UTILITY),
        Promise = Utility['Promise'],
        Cookie = Utility['Cookie'],
        stringFormat = Utility['String']['stringFormat'];
    var TEMPLATE = {
//      'MAIN' : '<div class="user_wrap clearfix">\
//                  <div class="user_box">\
//                      <div class="self_wrap">\
//                          <div class="self_info">\
//                              <div class="self_photo">\
//                                  <img name="user_head" id="userCenter_top_img" src="/resource/systemRes/img/default/nophoto.jpg" alt="">\
//                              </div>\
//                              <div class="self_data clearfix">\
//                                  <div class="self_exp clearfix">\
//                                      <p class="nick_id">ID:<label id="nick_id">0</label></p>\
//                                      <p class="nick_info">\
//                                          <label name="nick_name"></label>\
//                                          <label id="nick_sex"></label>\
//                                          <label class="user_badge"></label>\
//                                      </p>\
//                                      <p class="nick_introduce"><label id="nick_introduce"></label></p>\
//                                      <p class="contr_p2 clearfix">\
//                                          <a href="/level.shtml" data-stat="LevelPage_Link"><img name="level_img" src="" alt=""></a>\
//                                          <span id="userCenter_exp_persent">\
//                                              <i name="level_persent"><font size="0">0%</font></i>\
//                                          </span>\
//                                      </p>\
//                                      <p class="lev_hover" style="display:none;">\
//                                          <span class="lev_arrow"></span>\
//                                          <b data-i18n="Header_NextLevel">{{Header_NextLevel}}</b><strong>:</strong><a name="next_exp">0</a><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt="">\
//                                      </p>\
//                                  </div>\
//                              <div class="self_coin clearfix">\
//                              <div class="user_xiub_num">\
//                                  <a target="_blank" href="/myrecharge.shtml" data-i18n="Header_Recharge" data-stat="Header_Recharge">{{Header_Recharge}}</a>\
//                                  <p><label name="user_balance">0</label></p>\
//                              </div>\
//                              <div class="change_pwd"><a href="/user/password" data-i18n="Header_ChangePassword" data-stat="Header_ChangePassword">{{Header_ChangePassword}}</a></div>\
//                              </div>\
//                          </div>\
//                      </div>\
//                  </div>\
//                  <div class="user_sel">\
//                  <ul class="user_type">\
//                      <li class="menu_myfavorite"><a id="menu_myfavorite" href="/myFavorite.shtml" data-i18n="UserTop_MyFollowed" data-stat="UserTop_MyFollowed">{{UserTop_MyFollowed}}</a></li>\
//                      <li class="menu_myinfo"><a id="menu_myinfo" href="/myinfo.shtml" data-i18n="UserTop_MyProfile" data-stat="UserTop_MyProfile">{{UserTop_MyProfile}}</a></li>\
//                      <li class="menu_myWealth" data-show="sub_myWealth">\
//                          <a id="menu_myWealth" href="javascript:;" data-i18n="UserTop_MyAccount" data-stat="UserTop_MyAccount">{{UserTop_MyAccount}}</a>\
//                          <span class="arrow_up" style="display:none;"></span>\
//                          <ul class="sub_menu sub_myWealth" id="sub_myWealth" style="display:none;">\
//                              <li><a id="myrechargerecord" href="/myrechargerecord.shtml" data-i18n="UserTop_RechargeRecord" data-stat="UserTop_RechargeRecord">{{UserTop_RechargeRecord}}</a></li>\
//                              <li><a id="myrecharge" href="/myrecharge.shtml" data-i18n="UserTop_Recharge" data-stat="UserTop_Recharge">{{UserTop_Recharge}}</a></li>\
//                              <li><a id="mystorerecord" href="/mystorerecord.shtml" data-i18n="UserTop_BuyRecord" data-stat="UserTop_BuyRecord">{{UserTop_BuyRecord}}</a></li>\
//                              <li id="host_exchange" class="host_exchange hidden" data-role="host_exchange"><a href="/exchange.shtml" data-i18n="Exchange_Account_Detail" data-stat="Exchange_Account_Detail">{{Exchange_Account_Detail}}</a></li>\
//                          </ul>\
//                      </li>\
//                      <li class="menu_sysmessage"><a id="menu_sysmessage" href="/mymessage.shtml" data-i18n="UserTop_Notifications" data-stat="UserTop_Notifications">{{UserTop_Notifications}}</a></li>\
//                      <li class="menu_gift" data_show="sub_menu_dir_gift" >\
//                          <a id="menu_gift" data-show="mySend" href="/mygiftssend.shtml" data-i18n="UserTop_GiftsBox">{{UserTop_GiftsBox}}</a>\
//                          <span class="arrow_up" style="display:none;"></span>\
//                          <ul class="sub_menu sub_giftsBox" id="sub_giftsBox" style="display: none;">\
//                              <li class="hidden"><a id="myflowers" href="/myflowers.shtml" data-i18n="UserTop_Flowers">{{UserTop_Flowers}}</a></li>\
//                              <li><a id="mygiftsreceived" href="/mygiftsreceived.shtml" data-i18n="UserTop_GiftsReceived">{{UserTop_GiftsReceived}}</a></li>\
//                              <li><a id="mygiftssend" href="/mygiftssend.shtml" data-i18n="UserTop_GiftsSend">{{UserTop_GiftsSend}}</a></li>\
//                          </ul>\
//                          \
//                      </li>\
//                      <li class="menu_proxymanager" show_menu="sub_menu_dir_proxymanager" style="display:none"><label data-i18n="UserTop_TheManager">{{UserTop_TheManager}}</label><em style="display:none"></em></li>\
//                      <li class="menu_vip"><a id="menu_vip" href="/myvip.shtml" data-i18n="UserTop_MemberVIP" data-stat="UserTop_MemberVIP">{{UserTop_MemberVIP}}</a></li>\
//                      <li class="menu_car"><a id="menu_car" href="/mycar.shtml" data-i18n="UserTop_MyCar" data-stat="UserTop_MyCar">{{UserTop_MyCar}}</a></li>\
//                      <li class="menu_dir_mylivingon hidden"><a id="menu_dir_mylivingon" href="/myshowtime.shtml" data-i18n="UserTop_ShowTime" data-stat="UserTop_ShowTime">{{UserTop_ShowTime}}</a></li>\
//                  </ul>\
//              </div>\
//          </div>\
//      </div>',
//      'Badge':'<img src="{0}" alt="{1}">',
//      'Login_Before_Cont':'<div class="Login_Out_div">\
//                              <div class="block_tips_cont">\
//                                  <span class="btn_login" data-i18n="Login_Out_Conts">{{Login_Out_Conts}}</span>\
//                              </div>\
//                          </div>'
    };
    var userTop =function() {
        return {
            init:function(option){
                this.load(option);
                this.render();
                this.compose();
                this.bind();
                this.start();
                this.identifyFlow();
            },
            load:function(option){
                $.extend(this,option);
            },
            render:function(){
                this.container = this.container || $('#container');
                this.container.find('.'+this.cur).addClass('current');//highlight
            },
            compose:function(){

            },
            bind:function(){
                this.container.find('[data-show="sub_myWealth"]').hover(function(){
                    $(this).find('#sub_myWealth').show();
                    $(this).find('.arrow_up').show();
                },function(){
                    $('#sub_myWealth').hide();
                    $(this).find('.arrow_up').hide();
                });
                this.container.find('#userCenter_exp_persent').hover(function(){
                    $('.self_data .lev_hover').show();
                },function(){
                    $('.self_data .lev_hover').hide();
                });
            },
            start:function(){

            },
            html:function(){
                return TEMPLATE.MAIN;
            },
            identifyFlow:function(){
                this.promise = new Promise(this.identify.bind(this)).then(this.identified.bind(this));
                    //.then(this.UserInfoList.bind(this)).then(this.userLevelsData.bind(this));
            },
            identify:function() {
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
                            this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
                        else
                            this.promise.resolve();
                    }.bind(this), function() {
                        this.promise.resolve();
                    }.bind(this));
                }
            },
            identified:function(){
                //console.log(this.identity);
               // Header.identified(this.identity);
                if(this.identity&&this.identity['surfing']&&this.identity['userType']==1){
                    this.container.find('[data-role="host_exchange"]').removeClass('hidden');
                    this.container.find('.menu_dir_mylivingon').removeClass('hidden');
                    this.container.find('[data-show="mySend"]').attr('href','javascript:;');
                    this.container.find('[data_show="sub_menu_dir_gift"]').hover(function(){
                        $(this).find('#sub_giftsBox').show();
                        $(this).find('.arrow_up').show();
                    },function(){
                        $('#sub_giftsBox').hide();
                        $(this).find('.arrow_up').hide();
                    });
                }

                if(this.identity) {
                    this.badge();
                    if (this.identity['surfing']) {
                        var url = 'service/room/v3/info/' + this.identity['surfing'];
                        Bussiness.getData(url, function (info) {
                            this.info = info;
                            var ratr = this.info["dataInfo"];
                            var code = this.info["code"];
                            if (code == 0 && ratr['ratr']) {
                                if (ratr['ratr']["2"] == '' || ratr['ratr']["2"] == undefined) {
                                    $("#nick_introduce").html('');
                                } else {
                                    $("#nick_introduce").html(ratr['ratr']["2"]);
                                }
                            }
                            this.promise.resolve();
                        }.bind(this), '', 'v3');
                    }
                    var vipIcons = this.identity['userAttr'][3] > 0 ? (this.identity['userAttr'][3] > 1 ? '<span class="SvipFlag"></span>' : '<span class="VipFlag"></span>') : '';
                    $(".self_photo").append(vipIcons);
                    $("#nick_id").html(this.identity["userId"]);
                    $('[name="nick_name"]').html(this.identity['nickName']);
                    if (this.identity["sex"] == "1") {
                        $("#nick_sex").html("<img src='resource/static/image/sex_male.png' alt=" + this.identity['nickName'] + ">")
                    } else if (this.identity["sex"] == "2" || this.identity["sex"] == "0") {
                        $("#nick_sex").html("<img src='resource/static/image/sex_female.png' alt=" + this.identity['nickName'] + ">")
                    }
                    //用户经验值（当前经验、距离下一级经验）
                    if(this.identity['userType']==0){
                        this.level = this.identity['richLevel'];
                        this.next_level = this.identity['richLevel'] + 1;
                        this.level_score = this.identity['richScore'];
                    }else if(this.identity['userType']==1&&this.identity['hostInfo']){
                        this.level = this.identity['hostInfo']['hostLevel'];
                        this.next_level = this.identity['hostInfo']['hostLevel'] + 1;
                        this.level_score = this.identity['hostInfo']['hostScore'];
                    }
                    this.level_obj_score = null;
                    this.next_level_obj_score = null;
                    this.level_obj_hp = '';
                    this.hostInf = this.identity['hostInfo'];
                }else{
                    Bussiness.getJSON('level/rich_level_data.json', function (data) {
                        var userPic= data[1]['pic'];
                        $("[name='level_img']").attr("src", "resource/"+userPic);
                    }.bind(this));
                }
            },
            'UserInfoList':function(){
                if (!this.hostInf) {
                    Bussiness.getJSON('level/rich_level_data.json', function (data) {
                        this.level_obj_score = data[this.level]['score'];
                        this.level_obj_hp = data[this.level]['pic'];
                        this.next_level_obj_score = data[this.next_level]['score'];
                        //this.userLevelsData();
                        this.promise.resolve();
                    }.bind(this));
                }else if(this.hostInf) {
                    Bussiness.getJSON('level/host_level_data.json', function (data) {
                        this.level_obj_score = data[this.level]['score'];
                        this.level_obj_hp = data[this.level]['pic'];
                        this.next_level_obj_score = data[this.next_level]['score'];
                        //this.userLevelsData();
                        this.promise.resolve();
                    }.bind(this));
                }
            },
            'userLevelsData':function(){
                var exp = 100;
                if (this.level) {
                    if (this.next_level) {
                        exp = (((this.level_score - this.level_obj_score) / (this.next_level_obj_score - this.level_obj_score)) * 100).toFixed(0);
                    }
                    $("[name='level_img']").attr("src", "resource/"+this.level_obj_hp);
                }
                exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
                $("[name='level_persent']").css({width : (exp < 15 ? (exp < 1? 0:15) : exp) + '%'});
                $("[name='level_persent'] font").text(exp + '%');
                var score = 0;
                if (this.next_level_obj_score) {
                    score = this.next_level_obj_score - this.level_score;
                }
                $("[name='next_exp']").text(score > 0 ? score : (score < 0 ? 0 : score));
                $(".contr_set_info dd .lev_hover a").text(score > 0 ? score : (score < 0 ? 0 : score));
                $("#control_box_nick_name_edit span").hover(function(){
                    $('.control_box .lev_hover').show();
                },function(){
                    $('.control_box .lev_hover').hide();
                });
            },
            'badge':function(){
                Bussiness.getData('data/mobile/v3/?badge=&requestType=1',function(data){
                    if(data.code == 0){
                        var badge = data.dataInfo.badge.d;
                        var badged=this.identity["badgeType"];
                        var imgs='';
                        var length=badged.length;
                        if(length>0){
                            for(var i=0;i<length;i++){
                                if(badge[badged[i]]){
                                    var src="/resource/"+badge[badged[i]]["p"];
                                    var alt=badge[badged[i]]["name"];
                                    imgs+="<img src="+src+" alt="+alt+">"
                                }
                            }
                            $("label.user_badge").html(imgs);
                        }
                    }
                }.bind(this),null,true);
            },
            'Login_Btn':function(){
                $(".btn_login a").bind("click",function(){
                    login_util.show_login_div();
                });
            },
            'Login_Tips_Before':function(){
                this.container.i18nHTML(Header.html() + TEMPLATE.MAIN  + TEMPLATE.Login_Before_Cont + Footer.html());
                window.Page.compose();
                this.Login_Btn();
            },
            'Login_Tips_After':function(){
                window.Page.render();
                window.Page.bind();
                if(window.Page.setNowTime){
                    window.Page.setNowTime();
                }
                window.Page.compose();
            }
        }
    }();
    module.exports = userTop;
});