define(function(require){
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'],
        Flash = Utility['Flash'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        _nav=Body.nav,
        _task=Body.TASKS,
        Footer=Body.Footer,
        Lazyload=Kit.use('Lazyload'),
        Trigger=Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup');

    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'],fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg';
    require('js/reference/blockUI.js');
    require('js/reference/onreg.draggable.min.js');
    require('js/reference/upfile.js');
    require('js/reference/ajaxfileupload.js');
    require('js/reference/jquery.mousewheel.js');
    require('js/reference/perfect-scrollbar.js');
    require('js/reference/perfect-scrollbar.css');
    require('js/reference/dialogV3.js');
    require('cssComponent/dialog.css');
    require('wheel/date.js');//load_date_js();
    require('wheel/My97DatePicker/skin/WdatePicker.css');
    require('wheel/My97DatePicker/WdatePicker.js');
    require('cssComponent/page.css');
    var language_NUM={
            'ar':2,
            'en':1,
            'tr':3,
            'es':4,
            'pt':5,
            'pl':6,
            'in':7
        },shopType_Num  = {'ALL':4,'VIP':1,'MOUNT':2,'ITEM':3},
        specialType_Num={'Store_VIP':1,'Store_SVIP':2,'Store_Mount':3,'Store_Gift':4,'Store_Flower':5,'Store_Exp':6,'Store_Badge':7,'Store_libao':8},
        type_NUM={'1':'Store_VIP','2':'Store_SVIP','3':'Store_NavMount','4':'Store_NavItem','5':'Store_NavItem','6':'Store_NavItem','7':'Store_NavItem','8':'Store_NavItem'},

        special_NUM={'MOUNT':3};//调 shop_list_by_special 表取座驾，约定参数
    flash_Num ={'1':'moto','3':'camel','4':'mini','5':'lamborghini','157':'clap','158':'xiaolong','159':'yaoming','160':'woman'};


    var TEMPLATE={
        'MAIN':'<div class="main ">\
        		<div class="top">\
        			<a class="Myprofile" data-i18n="UserTop_MyProfile" data-stat="UserTop_MyProfile">{{UserTop_MyProfile}}</a>\
        			<a class="Myaccount" data-i18n="UserTop_MyAccount" data-stat="UserTop_MyAccount">{{UserTop_MyAccount}}</a>\
        			<div style="height:2px;">\
        			<div class="bottom_prev"></div>\
        			<div class="bottom_line"></div>\
        			</div>\
        		</div>\
        		<div class="my_pro">\
        		<div class="myinfo ">\
                    <div class="userInfoBox" style="display:none;" id="loadedBox">\
                        <div class="usePic pr readStart">\
                            <a href="javascript:;" class="picMaskA">\
                            <img src="" alt=""  id="loadedUserPic" class="control_c_user_info_face"/>\
                            <input type="file"  class="file_btn" name="file" id="file1" onchange="ajaxFileUpload(0,\'file1\',0)"  accept="image/*"/>\
                            </a>\
                            <a href="javascript:;" class="btnDef selectPicBtn" data-i18n="MyProfile_SelectAPic">{{MyProfile_SelectAPic}}</a>\
                            <input type="file" class="file_btn1" name="file" id="file2" onchange="ajaxFileUpload(0,\'file2\',0)"  accept="image/*"/>\
                        </div>\
                        <div class="userInfo readStart">\
                            <table>\
                                <tr>\
                                    <td class="greenFont alignStart w110px" data-i18n="MyProfile_Nickname">{{MyProfile_Nickname}}</td>\
                                    <td class="blackFont alignStart w225px" id="loadedName"></td>\
                                </tr>\
                                <tr>\
                                    <td class="greenFont alignStart" data-i18n="MyProfile_Gender">{{MyProfile_Gender}}</td>\
                                    <td class="blackFont alignStart" id="loadedGender"></td>\
                                </tr>\
                                <tr>\
                                    <td class="greenFont alignStart" data-i18n="MyProfile_Birthday">{{MyProfile_Birthday}}</td>\
                                    <td class="blackFont alignStart" id="loadedBirthday"></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td class="alignStart"><a href="javascript:;" id="editBtn" class="btnDef editBtn" data-i18n="MyProfile_Edit">{{MyProfile_Edit}}</a></td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                    <div class="userInfoBox clearfix" id="modifyBox">\
                        <div class="usePic pr readStart">\
                            <span id="userID" style="display:block;font-size:14px;" class="greenFont"></span>\
                            <a href="javascript:;" class="picMaskA">\
                            <img src="" alt=""  id="modifyUserPic" class="control_c_user_info_face"/>\
                            <input type="file"  class="file_btn" name="file" id="file3" onchange="ajaxFileUpload(0,\'file3\',0)"  accept="image/*"/>\
                            </a>\
                            <a href="javascript:;" class="btnDef selectPicBtn"></a>\
                            <input type="file" class="file_btn1" name="file" id="file4" onchange="ajaxFileUpload(0,\'file4\',0)"  accept="image/*"/>\
                        </div>\
                        <div class="userInfo readStart">\
                            <table>\
                                <tr>\
                                    <td class="greenFont alignStart w110px" data-i18n="MyProfile_Nickname" style="margin-top:0px;">{{MyProfile_Nickname}}</td>\
                                    <td class="blackFont alignStart w225px" id="loadedName">\
                                        <input type="text"  class="nameInput" id="edit_nickname" maxlength="25" value=""/>\
                                    </td>\
                                    <td class="alignStart" style="height:24px;">\
                                    <p class="errorShow"><span id="info_error"></span></p>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="greenFont alignStart" data-i18n="MyProfile_Gender">{{MyProfile_Gender}}</td>\
                                    <td class="blackFont alignStart" id="loadedGender">\
                                    <div id="malelabel" data-i18n="MyProfile_Male">{{MyProfile_Male}}</div><input type="radio" name="user_sex" id="male"  class="sele_sex" value="1"/>\
                                    <div id="femalelabel" data-i18n="MyProfile_Female">{{MyProfile_Female}}</div><input type="radio" name="user_sex" id="female"  class="sele_sex" value="2"/>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="greenFont alignStart" data-i18n="MyProfile_Birthday">{{MyProfile_Birthday}}</td>\
                                    <td class="blackFont alignStart" id="loadedBirthday">\
                                        <div class="other_h user_info_nobtm other_dis_p clearfix" id="edit_user_birthday_calendar">\
                                            <span class="input_w72">\
                                                <input type="text" readonly="readonly" class="txt_login" id="edit_birthday_year"/>\
                                                <div class="num_tab contentHolder" id="edit_birthday_year_content" style="display:none">\
                                                    <div class="num_tab_list sbox_out" id="table_year" style="display:block;">\
                                                    </div>\
                                                </div>\
                                            </span>\
                                            <span class="datefont">/</span>\
                                            <span class="input_w72 marg_width">\
                                                <input type="text"  readonly="readonly" class="txt_login" id="edit_birthday_month"/>\
                                                <div class="num_tab contentHolder" id="edit_birthday_month_content" style="display:none">\
                                                    <div class="num_tab_list sbox_out" style="display:block;">\
                                                    </div>\
                                                </div>\
                                            </span>\
                                            <span class="datefont">/</span>\
                                            <span class="input_w72 marg_width">\
                                                <input type="text"  readonly="readonly" class="txt_login" id="edit_birthday_day"/>\
                                                <div class="num_tab contentHolder" id="edit_birthday_day_content" style="display:none">\
                                                    <div class="num_tab_list sbox_out" style="display:block;">\
                                                    </div>\
                                                </div>\
                                            </span>\
                                        </div>\
                                    </td>\
                                </tr>\
                                <tr style="display:none;">\
                                    <td></td>\
                                    <td class="alignStart">\
                                        <a href="javascript:;" class="btnDef saveBtn mr5px" data-i18n="MyProfile_Save">{{MyProfile_Save}}</a>\
                                        <a href="javascript:;" class="btnDef cancelBtn" data-i18n="MyProfile_Cancel">{{MyProfile_Cancel}}</a>\
                                    </td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                    <div class="changePwd">\
                        <h2 id="changeBtn" data-i18n="MyProfile_ChangePassword">{{MyProfile_ChangePassword}}</h2>\
                        <table>\
                            <tr>\
                                <td class="alignStart w215px"><input type="password" class="pwdInput" name="oldpwd" id="oldpwd" autocomplete="off" data-i18n="MyProfile_OldPwd"  placeholder="{{MyProfile_OldPwd}}" maxlength="20" /><lable for="oldpwd" class="eye"></lable></td>\
                            </tr>\
                            <tr>\
                               <td class="alignStart" ><input type="password" class="pwdInput" id="newpwd1" name="newpwd1" autocomplete="off" data-i18n="MyProfile_NewPwd" placeholder="{{MyProfile_NewPwd}}" maxlength="20" /><lable for="newpwd1" class="eye"></lable></td>\
                            </tr>\
                            <tr>\
                                <td class="alignStart" ><input type="password" class="pwdInput" id="newpwd2" name="newpwd2" autocomplete="off" data-i18n="MyProfile_NewPwdAgain" placeholder="{{MyProfile_NewPwdAgain}}" maxlength="20" /><lable for="newpwd2" class="eye"></lable></td>\
                            </tr>\
                    <tr class="errortd">\
                        <td class="alignStart errortd"><span id="info_error2" class="errorShow"></span></td>\
                    </tr>\
                        </table>\
                                <div class="alignStart" ><a href="javascript:;" id="saveBtn" class="btnDef saveBtn mr5px" data-i18n="MyProfile_Save">{{MyProfile_Save}}</a></div>\
                    </div>\
                    </div>\
                    <div class="mystore">\
                        <div class="mystore_left" style="width:490px;float:left;font-size: 14px;color:#0bc2c6;">\
                            <h2 data-i18n="MyRewards_rewards" data-stat="MyRewards_rewards" data-i18n="UserTop_MyCar" data-stat="UserTop_MyCar">{{MyRewards_rewards}}</h2>\
                            <div class="mystore_badges" style="">\
                            </div>\
                            <h2 data-i18n="MyVip_vip" data-stat="MyVip_vip" class="vip_title">{{MyVip_vip}}</h2>\
                            <div data-role="vipContainer" class="myvip clearfix"></div>\
                            <div data-i18n="MyVip_vip_ex" data-stat="MyVip_vip_ex" class="vip_ex">{{MyVip_vip_ex}}</div>\
                            <div data-i18n="MyVip_svip_ex" data-stat="MyVip_svip_ex" class="svip_ex">{{MyVip_svip_ex}}</div>\
                        </div>\
                        <div class="mystore_right" style="width:490px;float:right;">\
                            <h2 class="car_title" data-i18n="UserTop_MyCar" data-stat="UserTop_MyCar">{{UserTop_MyCar}}</h2>\
                            <div data-role="TEMPLATE.MYCARS" class="mycar clearfix">{0}\
                        </div>\
                    </div>\
                    </div>\
                    </div>\
                <div class="my_acc" style="display:none;">\
        		<div class="newAccountBox">\
					<div class="newAccountTab">\
						<a href="javascript:;" class="btnDef btnDefCur" data-i18n="GiftsSend_Nav">{{GiftsSend_Nav}}</a>\
						<a href="javascript:;" class="btnDef" data-i18n="PersonCenter_RechargeRecord">{{PersonCenter_RechargeRecord}}</a>\
						<a href="javascript:;" class="btnDef" data-i18n="GiftsReceived_Nav">{{GiftsReceived_Nav}}</a>\
						<a href="javascript:;" class="btnDef" data-i18n="ShowTime_Nav">{{ShowTime_Nav}}</a>\
					</div>\
				</div>\
				<div class="chz_date">\
                        <label data-i18n="GiftsSend_From" class="readStart">{{GiftsSend_From}}</label>\
                        <input type="text"  class="Wdate readStart"  id="stime" data-stat="GiftsSend_From" readonly="readonly"/>\
                        <label data-i18n="GiftsSend_To" class="readStart">{{GiftsSend_To}}</label>\
                            <input type="text"  class="Wdate readStart"  id="etime" data-stat="GiftsSend_To" readonly="readonly"/>\
                        <input type="button" data-i18n="GiftsSend_Query" data-stat="GiftsSend_Query" id="checkG" class="btnDef btnDefOther readStart" value="{{GiftsSend_Query}}"/>\
                    <div id="showTotal"  class="readStart showTotal" style="display:none;">\
                        <span data-i18n="MyShowTime_Total">{{MyShowTime_Total}}</span>\
                        <span id="totalTime">0</span>\
                        <span data-i18n="MyShowTime_Minute">{{MyShowTime_Minute}}</span>\
                    </div>\
                    <div id="balanceTotal"  class="readStart balanceTotal" style="display:none;">\
                        <span class="icon" data-i18n="GiftsReceived_Cost2">{{GiftsReceived_Cost2}}</span>\
                        <span id="totalBalance">0</span>\
                        <span id="totalfansTotal">0</span>\
                    </div>\
                    </div>\
                <div class="new_user_con">\
                    <div class="cons_tab">\
                        <div class="tab_title" id="tab_title">\
                            <ol class="fir_tr">\
                                <li class="con_width1" data-i18n="GiftsSend_SendTime">{{GiftsSend_SendTime}}</li>\
                                <li class="con_width2" data-i18n="GiftsSend_Cost">{{GiftsSend_Cost}}</li>\
                                <li class="con_width3" data-i18n="GiftsSend_Quantity">{{GiftsSend_Quantity}}</li>\
                                <li class="con_width4" data-i18n="GiftsSend_Price">{{GiftsSend_Price}}</li>\
                                <li class="con_width5" data-i18n="GiftsSend_Gift">{{GiftsSend_Gift}}</li>\
                                <li class="con_width6" style="display:none;border-right:none;" data-i18n="GiftsSend_Recipient">{{GiftsSend_Recipient}}</li>\
                            </ol>\
                        </div>\
                        <div class="tab_pay showinfo"></div>\
                    </div>\
                    <div id="pagenation" class="page"></div>\
                	</div>\
                	<div class="new_user_con" style="display:none;">\
                    <div class="cons_tab">\
                        <div class="tab_title" id="tab_title">\
                            <ol class="fir_tr">\
                                <li class="con_width1" data-i18n="RechargeRecord_Num">{{RechargeRecord_Num}}</li>\
                                <li class="con_width2" data-i18n="RechargeRecord_Time">{{RechargeRecord_Time}}</li>\
                                <li class="con_width3" data-i18n="RechargeRecord_Type">{{RechargeRecord_Type}}</li>\
                                <li class="con_width4" data-i18n="RechargeRecord_Amount">{{RechargeRecord_Amount}}</li>\
                                <li class="con_width5" data-i18n="RechargeRecord_Award">{{RechargeRecord_Award}}</li>\
                                <li class="con_width6" style="border-right:none;" data-i18n="RechargeRecord_Purchase">{{RechargeRecord_Purchase}}</li>\
                            </ol>\
                        </div>\
                        <div class="tab_pay showinfo"></div>\
                    </div>\
                    <div id="pagenation" class="page"></div>\
                </div>\
                <div class="new_user_con" style="display:none;">\
                    <div class="cons_tab">\
                        <div class="tab_title" id="tab_title">\
                            <ol class="fir_tr">\
                                <li class="reg_width1" data-i18n="GiftsReceived_Time">{{GiftsReceived_Time}}</li>\
                                <li class="reg_width3" data-i18n="GiftsReceived_Cost">{{GiftsReceived_Cost}}</li>\
                                <li class="reg_width4" data-i18n="GiftsReceived_Quantity">{{GiftsReceived_Quantity}}</li>\
                                <li class="reg_width5" data-i18n="GiftsReceived_Price">{{GiftsReceived_Price}}</li>\
                                <li class="reg_width6" data-i18n="GiftsReceived_Gift">{{GiftsReceived_Gift}}</li>\
                                <li class="reg_width7" style="border-right:none;" data-i18n="GiftsReceived_Sender">{{GiftsReceived_Sender}}</li>\
                            </ol>\
                        </div>\
                        <div class="tab_pay showinfo"></div>\
                    </div>\
                    <div id="pagenation" class="page"></div>\
                </div>\
                <div class="new_user_con" style="display:none;">\
                    <div class="cons_tab">\
                        <div class="tab_title" id="tab_title">\
                            <ol class="fir_tr">\
                                <li class="con_width1" data-i18n="ShowTime_Num">{{ShowTime_Num}}</li>\
                                <li class="con_width2" data-i18n="ShowTime_Start">{{ShowTime_Start}}</li>\
                                <li class="con_width3" data-i18n="ShowTime_End">{{ShowTime_End}}</li>\
                                <li class="con_width4" data-i18n="ShowTime_Duration">{{ShowTime_Duration}}</li>\
                                <li class="con_width5" style="border-right:none;" data-i18n="ShowTime_DD">{{ShowTime_DD}}</li>\
                            </ol>\
                        </div>\
                        <div class="tab_pay showinfo"></div>\
                    </div>\
                    <div id="pagenation" class="page"></div>\
                </div>\
                </div>\
                    <div data-role ="ce_nav"></div>\
                    <div class="hidden" id="task_tan"></div>\
					<div class="task_con" data-role ="task"></div>\
                </div>',
        'NO_VIP':'<div class="no_vip">\
                        <div class="vip_wrap clearfix">\
                            <div class="vip_block">\
                                <div data-role="vip" class="vip_top">\
                                    <p class="vip_icon"><img src="/resource/static/image/store/Vip_icon.png"></p>\
                                     <div data-role="vipUl"></div>\
                                    <a class="btn_buy_vip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                                </div>\
                            </div>\
                            <div class="svip_block">\
                                <div data-role="svip" class="svip_top">\
                                    <p class="vip_icon"><img src="/resource/static/image/store/Svip_icon.png"></p>\
                                    <div data-role="svipUl">\
                                    </div>\
                                    <a class="btn_buy_svip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                                </div>\
                              </div>\
                        </div>\
                </div>',
        'IS_VIP':'<div class="is_svip clearfix">\
                        <div data-role="vip" class="is_vip_block">\
                        </div>\
                        <div data-role="svip" class="is_svip_block" style="display:none;">\
                        </div>\
                    </div>',
        'VIP_BLOCK':'	 <div class="is_vip_top">\
                                <p class="is_vip_icon"><img src="/resource/static/image/store/Vip_icon.png"></p>\
                                <p class="period vipText" id="vipText" data-role="vip_end"><span data-i18n="MyVip_stop">{{MyVip_stop}}</span><strong>{1}</strong></p>\
                                    <a class="btn_buy_vip" href="javascript:;" data-i18n="MyVip_buy" data-stat="MyVip_buy">{{MyVip_buy}}</a>\
                                     <div data-role="vipUl"></div>\
                            </div>',
        'SVIP_BLOCK':'<div class="is_svip_top">\
                                <p class="is_vip_icon"><img src="/resource/static/image/store/Svip_icon.png"></p>\
                                <p class="period vipText" id="svipText"><span data-i18n="MyVip_stop">{{MyVip_stop}}</span><strong>{0}</strong></p>\
                                <div data-role="svipUl"></div>\
                                <a class="btn_buy_svip" href="javascript:;" data-i18n="MyVip_buy" data-stat="MyVip_buy">{{MyVip_buy}}</a>\
                            </div>',
        'VIP_ITEM':'<p data-select="vip-{3}-{2}" class="vip_price {4}" data-stat="vip-{2}">{0} <span data-i18n="Store_Days">{{Store_Days}}</span><span class="price">{1}</span><span class="price_new">{2}</span></p>\
        <a data-role="vipBuy" class="btn_renew" href="javascript:;" data-i18n="MyVip_buy" data-stat="MyVip_buy">{{MyVip_buy}}</a>',
        'SVIP_ITEM':'<p data-select="svip-{3}-{2}" class="svip_price {4}" data-stat="svip-{2}">{0} <span data-i18n="Store_Days">{{Store_Days}}</span><span class="price">{1}</span><span class="price_new">{2}</span></p>\
                                    <a data-role="svipBuy" class="btn_renew btnBuy" href="javascript:;" data-i18n="MyVip_buy" data-stat="MyVip_buy">{{MyVip_buy}}</a>',
        'PRIVILEGE_ITEM':'<tr>\
                                <th class="alignEnd"><img src="{0}"></th>\
                                <td class="alignStart">\
                                    <h3>{1}</h3>\
                                    <p>{2}</p>\
                                </td>\
                            </tr>',
        'POP':'<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption">{{Store_TitleChooseAmount}}</h2>\
                        <div id="popContent">\
                        <div data-role="content" class="content">\
                            <h2>{{Store_ChooseQuantityTobuy}}</h2>\
                            <div class="sel">\
                                <div class="sel_num">\
                                    <span data-role="minus" class="minus" >-</span>\
                                    <span class="num"><input data-role="num" type="text" value="1"></span>\
                                    <span data-role="plus" class="plus" >+</span>\
                                </div>\
                                <div class="spent_block" >\
                                    <h3>{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-stat="Store_Pop_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-stat="Store_Pop_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>',
        'MYCARS':'<div class="car_product clearfix" style="display:none;">\
                        <ul class="clearfix" data-role="mycarsUl"></ul>\
                    </div>',
        'MYCARS_ITEM':'<li>\
                            <div class="car_product_top">\
                                {0}\
                                <a class="btn_enable" href="javascript:;" data-change="{1}" {2} data-stat="btn_enable"></a>\
                            </div>\
                        </li>'

    };

    var Page=window.Page= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){
            window['ajaxFileUpload']=ajaxFileUpload;
            this.cache={};
            this.myVipData = [];
            this.isVIP=false;
            this.isSVIP=false;
        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.container.find('[data-role="TEMPLATE.MYCARS"]').i18nHTML(TEMPLATE.MYCARS);
            this.vipContainer = this.container.find('[data-role="vipContainer"]');
            this.container.find('[data-role="task"]').i18nHTML(_task.html());
            this.wrapper = this.container.find('.mycar');
            this.recommendData = {};
        },
        compose:function(){
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
            _nav.init({
                'container': this.container
            });
            _task.init({
                'container': this.container
            });
        },

        bind: function() {
            var pageindex=0;
//      	分页事件
            $(".newAccountTab").children().click(function(){
                $(this).addClass("btnDefCur").siblings("a").removeClass("btnDefCur");
                var contentarr=$(".new_user_con");
                contentarr.eq($(this).index()).show().siblings("div").filter(".new_user_con").hide();
                pageindex=$(this).index();
                if(pageindex==3){
                    $("#showTotal").show();
                }else{
                    $("#showTotal").hide();
                }
                if(pageindex==2){
                    $("#balanceTotal").show();
                }else{
                    $("#balanceTotal").hide();
                }

            })
//      	Query按钮
            $('#checkG').click(function(){
//          	console.log(pageindex)
                if(pageindex==0){
                    this.getGoodLists(1);
                }else if(pageindex==1){
                    this.load_my_recharge(1);
                }else if(pageindex==2){
                    this.getReceiveGifts(1);
                }else if(pageindex==3){
                    this.load_living_times(1);
                }
            }.bind(this));
            $('#stime').click(function(evt){
                WdatePicker({dateFmt:'yyyy-MM-dd',lang:this.getWdatePickerLanguage()});
            }.bind(this));
            $('#etime').click(function(evt){
                WdatePicker({dateFmt:'yyyy-MM-dd',lang:this.getWdatePickerLanguage()});
            }.bind(this));
        },
        start:function(){
            this.identifyFlow();
            this.setNowTime();
        },

        //myaccount加入部分
        setNowTime:function()
        {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var nowValue = year + "-" + month + "-" + day;
            $("#stime").val(nowValue);
            $("#etime").val(nowValue);
        },
        len:function(s) {
            var l = 0;
            var a = s.split("");
            for ( var i = 0; i < a.length; i++) {
                if (a[i].charCodeAt(0) < 299) {
                    l++;
                } else
                    l += 2;
            }
            return l;
        },
        getWdatePickerLanguage:function(){
            var language = I18N.language;
            if (language.toLowerCase() == 'zh') {
                return 'zh-cn';
            }
            if (language == 'ar') {
                return 'ar';
            }
            return "en";
        },
        //直播记录show time
        load_living_times:function(page)
        {
            var pagesize = 10;
            var stime = $('#stime').val();
            var etime = $('#etime').val();
            if(this.len(stime) < 1 || this.len(etime) < 1){
                $.tip_simple_alert(i18nTranslate('ShowTime_PleaseSelectQueryTime'));
                return;
            }
            if(!this.checkTimeSpanMonth(stime,etime,6)){
                return;
            }
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            Bussiness.postData('service/room/v3/host/live/time',{pageNo:page,pageSize:pagesize,startTime:stime,endTime:etime},function(data){
                console.log(data)
                $.unblockUI();
                var html_str="";
                if(data.code == 0){
                    if(data.dataInfo.total > 0){
                        var pageCount = data.dataInfo.pageCount;
                        var page = data.dataInfo.page;
                        var counta = data.dataInfo.ext.total;
                        var ddStart = i18nTranslate('ShowTime_DeductedTimeL');
                        var ddEnd = i18nTranslate('ShowTime_DeductedTimeR');
                        var startTime = i18nTranslate('ShowTime_No');
                        var endTime = i18nTranslate('ShowTime_No');

                        $.each(data.dataInfo.list,function(idx,obj){
                            var sTempDD="";
                            if(obj.punishTime>0){
                                sTempDD=ddStart+parseInt(obj.punishTime/60)+ddEnd;
                            }else{
                                sTempDD='-';
                            }

                            if(this.startTime != null) startTime =formatDate(new Date(obj.startTime),"yyyy-MM-dd HH:mm:ss");
                            if(this.endTime != null) endTime =formatDate(new Date(obj.endTime),"yyyy-MM-dd HH:mm:ss");

                            html_str += '<ul'+(idx%2!=0?' class="on"':'')+'>';
                            html_str += '<li class="con_width1">'+(idx+1)+'</li>';
                            html_str += '<li class="con_width2">'+startTime+'</li>';
                            html_str += '<li class="con_width3">'+endTime+'</li>';
                            html_str += '<li class="con_width4">'+obj.liveTime+'</li>';
                            html_str += '<li class="con_width5">'+sTempDD+'</li>';
                            html_str += '</ul>';
                        });
                        // 分页
                        this.page_html('pagenation',page,pageCount,'Page.load_living_times');
                        $('#totalTime').text(counta)
                    }
                    else{
                        $("#pagenation").html("");
                    }
                    if($.trim(html_str) == ''){
                        html_str = '<span class="readStart mt10px" data-i18n="ShowTime_NoLiveRecord">'+i18nTranslate('ShowTime_NoLiveRecord')+'</span>';
                    }
                }else if(data.code == 99) {
                    html_str = '<span class="readStart mt10px" data-i18n="ShowTime_Timeout">'+i18nTranslate('ShowTime_Timeout')+'</span>';
                    $("#pagenation").html("");
                    login_util.show_login_div();
                }else
                {
                    html_str = '<span class="readStart mt10px" data-i18n="ShowTime_Failed">'+i18nTranslate('ShowTime_Failed')+'</span>';
                    $("#pagenation").html("");
                }
                if(html_str!='' && html_str.substr(0,31)=='<span class="readStart mt10px">')
                {
                    $("#tab_title").hide();
                }
                else
                {
                    $("#tab_title").show();
                }
                $(".showinfo").eq(3).html(html_str);
            }.bind(this));

        },
//      得到收礼记录gifts received
        getReceiveGifts:function(page)
        {
            var pagesize = 10;
            var stime = $('#stime').val();
            var etime = $('#etime').val();
            if(this.len(stime) < 1 || this.len(etime) < 1){
                $.tip_simple_alert(i18nTranslate('GiftsReceived_PleaseSelectQueryTime'));
                return;
            }
            if(!this.checkTimeSpanMonth(stime,etime,6)){
                return;
            }
            var balance_type = -1;
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            var sUrl='service/goods/v3/g/r?'+'no='+page+'&size='+pagesize+"&start="+stime+'&end='+etime;
            Bussiness.getData(sUrl,function(data){
                console.log("goods----------------");
                console.log(data);
                $.unblockUI();
                var html_str="";
                if(data.code == 0){
                    $("#totalBalance").html(data.dataInfo.ext.total);
                    $("#totalfansTotal").html(data.dataInfo.ext.fansTotal);
                    if(data.dataInfo.total > 0){
                        var pageCount = data.dataInfo.pageCount;
                        var page = data.dataInfo.page;
                        var counta = data.dataInfo.ext.total,diamond=data.dataInfo.ext.fansTotal;
                        var all_received='<span class="">'+counta+'<span class="coins_icon1"></span></span><span class="">'+diamond+'<span class="diamond_icon1"></span></span>';
                        $.each(data.dataInfo.list,function(idx,obj){
                            var datetime = i18nTranslate('GiftsReceived_No');
                            if(obj.t != null) datetime = formatDate(new Date(obj.t),"yyyy-MM-dd HH:mm:ss");
                            var nickname = obj.n == null ? i18nTranslate('GiftsReceived_No'): obj.n;
                            html_str += '<ul'+(idx%2!=0?' class="on"':'')+'>';
                            html_str += '<li class="con_width1">'+datetime+'</li>';
                            html_str += '<li class="con_width2">'+obj.nm*obj.pr+'<span class="'+(obj.pt==0?'coins_icon':'diamond_icon')+'"></span></li>';
                            html_str += '<li class="con_width3">'+obj.nm+'</li>';
                            html_str += '<li class="con_width4">'+obj.pr+'<span class="'+(obj.pt==0?'coins_icon':'diamond_icon')+'"></span></li>';
                            html_str += '<li class="con_width5">'+'<img style="height:40px;" src="/resource/'+obj.p+'" title="'+obj.p+'"/>'+'</li>';
                            html_str += '<li class="con_width6">'+nickname+'</li>';
                            html_str += '</ul>';
                        });
                        // 分页
                        this.page_html('pagenation',page,pageCount,'Page.getReceiveGifts');
                        $("#cost_total").html(stringFormat(i18nTranslate('GiftsReceived_CostAll'),all_received));
                    }
                    else{
                        $("#pagenation").html("");
                    }
                    if($.trim(html_str) == ''){
                        html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_NoFlowersRecord">'+i18nTranslate('GiftsReceived_NoFlowersRecord')+'</span>';
                    }
                }else if(data.code == 99) {
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_TimeoutPleaseLoginAgain">'+i18nTranslate('GiftsReceived_TimeoutPleaseLoginAgain')+'</span>';
                    $("#pagenation").html("");
                    login_util.show_login_div();
                }else
                {
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_FailedToRetrieveGiftRecord">'+i18nTranslate('GiftsReceived_FailedToRetrieveGiftRecord')+'</span>';
                    $("#pagenation").html("");
                }
                if(html_str!='' && html_str.substr(0,31)=='<span class="readStart mt10px">')
                {
                    $("#tab_title").hide();
                }
                else
                {
                    $("#tab_title").show();
                }
                $(".showinfo").eq(2).html(html_str);
            }.bind(this),null,'isV3');

        },
        //充值记录recharge record
        load_my_recharge:function(page)
        {
            var pagesize = 10;
            var stime = $('#stime').val();
            var etime = $('#etime').val();
            if(this.len(stime) < 1 || this.len(etime) < 1){
                $.tip_simple_alert(i18nTranslate('RechargeRecord_PleaseSelectQueryTime'));
                return;
            }
            if(!this.checkTimeSpanMonth(stime,etime,6)){
                return;
            }
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            var rUrl='service/cost/v3/recharge?'+'no='+page+'&size='+pagesize+"&start="+stime+'&end='+etime;
            Bussiness.getData(rUrl,function(data){
              console.log(data);
                $.unblockUI();
                var html_str="";
                if(data.code == 0){
                    if(data.dataInfo.total > 0){
                        var pageCount = data.dataInfo.pageCount;
                        var page = data.dataInfo.page;
                        $.each(data.dataInfo.list,function(idx,obj){
                            if(obj.rs==1){
                                var datetime = i18nTranslate('RechargeRecord_No');
                                if(obj.tm != null) datetime = formatDate(new Date(obj.tm),"yyyy-MM-dd HH:mm:ss");
                                html_str += '<ul'+(idx%2!=0?' class="on"':'')+'>';
                                html_str += '<li class="con_width1">'+obj.no+'</li>';
                                html_str += '<li class="con_width2">'+datetime+'</li>';
                                html_str += '<li class="con_width3">'+obj.type+'</li>';
                                html_str += '<li class="con_width4">'+obj.b/100+'</li>';
                                html_str += '<li class="con_width5">'+obj.rb+'</li>';

                                html_str += '<li class="con_width6">'+obj.b+'</li>';
                                html_str += '</ul>';
                            }

                        });
                        // 分页
                        this.page_html('pagenation',page,pageCount,'Page.load_my_recharge');
                    }else{
                        $("#pagenation").html("");
                    }
                    if($.trim(html_str) == ''){
                        html_str = '<span class="readStart mt10px" data-i18n="RechargeRecord_NoRechargeRecord">'+i18nTranslate('RechargeRecord_NoRechargeRecord')+'</span>';

                        $("#pagenation").html("");
                    }
                }else if(data.code == 99) {
                    user_util.user_out('login_util', 'user_out');
                    html_str = '<span class="readStart mt10px" data-i18n="RechargeRecord_Timeout">'+i18nTranslate('RechargeRecord_Timeout')+'</span>';
                    $("#pagenation").html("");
                    login_util.show_login_div();
                }else
                {
                    html_str = '<span class="readStart mt10px" data-i18n="RechargeRecord_FailedRetrieve">'+i18nTranslate('RechargeRecord_FailedRetrieve')+'</span>';
                    $("#pagenation").html("");
                }
                if(html_str!='' && html_str.substr(0,31)=='<span class="readStart mt10px">')
                {
                    $("#tab_title").hide();
                }
                else
                {
                    $("#tab_title").show();
                }
                $(".showinfo").eq(1).html(html_str);
            }.bind(this),null,true);

        },
//      总消费记录gifts send
        getGoodLists:function(page)
        {
            var pagesize = 10;
            var stime = $('#stime').val();
            var etime = $('#etime').val();
            if(this.len(stime) < 1 || this.len(etime) < 1){
                $.tip_simple_alert(i18nTranslate('GiftsSend_PleaseSelectQueryTime'));
                return;
            }
            if(!this.checkTimeSpanMonth(stime,etime,6)){
                return;
            }
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            var sUrl = 'service/cost/v3?start='+stime+'&end='+etime+'&no='+ page + '&size='+pagesize;
            Bussiness.getData(sUrl,function(data){
//          	console.log(data);
                $.unblockUI();
                var html_str="";
                if(data.code == 0){			//  code不为0,登陆信息错误
                    if(data.dataInfo.total > 0){    //等于0,No gift record
                        var pageCount = data.dataInfo.pageCount;
                        var page = data.dataInfo.page;
                        var counta = data.dataInfo.counta;
                        var countb = data.dataInfo.countb;
//                      遍历gift信息
                        $.each(data.dataInfo.list,function(idx,obj){
                            var sendTime = i18nTranslate('GiftsSend_No');
                            if(obj.tm != null) sendTime = formatDate(new Date(obj.tm),"yyyy-MM-dd HH:mm:ss");
                            var nickname = obj.n == null ? i18nTranslate('Flowers_No') : obj.n;
                            html_str += '<ul'+(idx%2!=0?' class="on"':'')+'>';
                            html_str += '<li class="con_width1">'+sendTime+'</li>';
                            html_str += '<li class="con_width2">'+ (obj.bal)+'</li>';//cost
                            html_str += '<li class="con_width3">'+obj.num+'</li>';
                            html_str += '<li class="con_width4">'+ (obj.ct==1?'0':obj.pi)+'</li>';//Price
                            //html_str += '<li class="con_width4">0</li>';
                            html_str += '<li class="con_width5">'+'<img style="height:40px;" src="/resource/'+obj.img+'"/>'+'</li>';
                            // html_str += '<li class="con_width6">'+nickname+'</li>';
                            html_str += '</ul>';
                        });
                        // 分页
                        this.page_html('pagenation',page,pageCount,'Page.getGoodLists');
                    }
                    else{
                        $("#pagenation").html("");
                    }
                    if($.trim(html_str) == ''){
                        html_str = '<span class="readStart mt10px" data-i18n="GiftsSend_NoGiftRecord">'+i18nTranslate('GiftsSend_NoGiftRecord')+'</span>';
                    }
                }else if(data.code == 99) {
                    user_util.user_out('login_util', 'user_out');
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsSend_TimeoutPleaseLoginAgain">'+i18nTranslate('GiftsSend_TimeoutPleaseLoginAgain')+'</span>';
                    $("#pagenation").html("");
                    login_util.show_login_div();
                }else
                {
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_FailedToRetrieveGiftRecord">'+i18nTranslate('GiftsReceived_FailedToRetrieveGiftRecord')+'</span>';
                    $("#pagenation").html("");
                }
                if(html_str!='' && html_str.substr(0,31)=='<span class="readStart mt10px">')
                {
                    $("#tab_title").hide();
                }
                else
                {
                    $("#tab_title").show();
                }
                $(".showinfo").eq(0).html(html_str);
            }.bind(this),null,'isV3');

        },
//      分页函数
        page_html:function(pagenation,page,pageCount,method){
//      	console.log(page)
            var html_str='<div class="digg">';
            if(page == 1){
                html_str+='<span class="span_1 disabled"></span>';
                html_str+='<span class="span_3 disabled"></span>';
            }else{
                html_str+='<span class="span_1" onclick="'+method+'(1)"></span>';
                html_str+='<span class="span_3" onclick="'+method+'('+(page-1)+')"></span>';
            }
            var start_page = 0,end_page = 0;
            if(pageCount > 10){
                start_page =  Math.max(page-3,1);
                if(start_page < 3){
                    end_page = 7;
                }else if(page + 6 >pageCount){
                    end_page = pageCount;
                }else{
                    end_page = Math.min(page+3,pageCount);
                }
            }else{
                start_page =  1;
                end_page = pageCount;
            }
            if(pageCount > 10 && end_page + 3 > pageCount){
                start_page = pageCount - 6;
                html_str+='<a href="javascript:void(0)" onclick="'+method+'(1)">1</a>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'(2)">2</a>';
                html_str+='<b>&hellip;</b>';
            }

            for(var i= start_page;i<=end_page;i++){
                if(page == i){
                    html_str+='<span class="current">'+i+'</span>';
                }else{
                    html_str+='<a href="javascript:void(0)" onclick="'+method+'('+i+')">'+i+'</a>';
                }
            }

            if(end_page + 2 < pageCount){
                html_str+='<b>&hellip;</b>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'('+(pageCount-1)+')">'+(pageCount-1)+'</a>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'('+pageCount+')">'+pageCount+'</a>';
            }

            if(page == pageCount){
                html_str+='<span class="span_4 disabled"></span>';
                html_str+='<span class="span_2 disabled"></span>';
            }else{
                html_str+='<span class="span_4" onclick="'+method+'('+(page+1)+')"></span>';
                html_str+='<span class="span_2" onclick="'+method+'('+pageCount+')"></span>';
            }
            html_str+='</div>';
            $("#"+pagenation).html(html_str);
            $("#"+pagenation).show();
        },
        checkTimeSpanMonth:function(start, end, max_month) {
            var startdate = new Date(start);
            var enddate = new Date(end);
            if (max_month > 0) {
                var now = new Date();
                var m1 = parseInt(now.getFullYear()) * 12 + parseInt(now.getMonth());
                var m2 = parseInt(startdate.getFullYear()) * 12 + parseInt(startdate.getMonth());
                var m3 = parseInt(enddate.getFullYear()) * 12 + parseInt(enddate.getMonth());
                if (m1 - m2 > max_month||m3 - m2 > max_month) {
                    $.tip_simple_alert(stringFormat(i18nTranslate('BuyHistory_AtMostRecordCanBeRetrieved'),max_month));
                    return false;
                }
            }
            return true;
        },
//		VIP加入部分
        startPromise:function(){
            var promise = new Promise(function(){
                if(this.myVipData === false || this.myVipData['vip'] ||this.myVipData['svip'] ) return true;
                Bussiness.getData("service/user/v3/property?vip",function(data){
                    console.log(data)
//              	判断是否有VIP
                    if(data.code==0 && data.dataInfo.vip.length>0){
                        $.each(data.dataInfo.vip,function(i,item){
                            if(item.vipType==1){
                                this.myVipData['vip'] = item;	//1 :vip 2:svip
                                this.isVIP = true;
                            }else if(item.vipType==2){
                                this.myVipData['svip'] = item;
                                this.isSVIP = true;
                            }
                        }.bind(this));
//                      console.log(data.dataInfo);
//                      让另一个VIP出现
                        if(data.dataInfo.vip.length==1&&data.dataInfo.vip[0].vipType==1){
                            this.myVipData['svip']=data.dataInfo.vip[0];
                        }else if(data.dataInfo.vip.length==1&&data.dataInfo.vip[0].vipType==2){
                            this.myVipData['vip']=data.dataInfo.vip[0];

                        }
                    }else{
                        this.myVipData = false;
                    }
                    promise.resolve();
                }.bind(this),null,true);
            }.bind(this)).then(function(){
                    if(!this.isVIP && !this.isSVIP){
                        this.vipContainer.i18nHTML(TEMPLATE.NO_VIP);
                        this.promiseNoVIP();
                    }else{
                        this.vipContainer.i18nHTML(TEMPLATE.IS_VIP);
                        this.promiseIsVIP();
                    }
                    promise.resolve();
                }.bind(this));

//     座驾加入开始
            var promisecar = new Promise(function(){
                //得到所有座驾列表
                Bussiness.getData('data/static/v4/?car',function(data){
                    if(data.code==0){
                        var myCars = data.dataInfo.car.d;
                        var carShow ={},k=1;
                        for(var i=0; i<myCars.length;i++){
                            carShow[myCars[i].id]= myCars[i];
                        };
                        this.mountResource = carShow;
                        promisecar.resolve();
                    };
                }.bind(this),null,true);
            }.bind(this)).then(function(){
                    //获取拥有car
                    if(this.mycar){
                        promisecar.resolve(this.mycar);
                        return true;
                    }else{
                        Bussiness.getData('service/user/v3/property?car',function(data){
                            if(data.code==0 && data.dataInfo.car){
                                promisecar.resolve(this.mycar = data.dataInfo.car);
                            }
                        }.bind(this),null,true);
                    }
                }.bind(this)).then(function(data){
                    var Json = [],oJson = this.mountResource;
                    data&&data.forEach(function(obj,index){
                        oJson[obj.cid]["endDate"] = obj['expire'];
                        oJson[obj.cid]["used"] = obj['used']
                        Json.push(oJson[obj.cid])
                    })
                        this.renderMyCar(Json);
                        promisecar.resolve();

                }.bind(this))
                .then(function(){
                    this.bindEventscar(this.wrapper);
                }.bind(this));
        },

        promiseNoVIP:function(){
            var promise = new Promise(function(){
                if(this.cache['vipLists']){
                    this.renderVIP(this.cache['vipLists']);
                    return true;
                }
                var shopUrl = "service/shop/v3/list/1?shopTypeId=1&lg="+language_NUM[I18N.language]+"&no=0&size=10";
                Bussiness.getData(shopUrl,function(data){
                    if(data.code==0 && data.dataInfo){
                        this.renderVIP(this.cache['vipLists'] = this.formatVIPData(data.dataInfo.list));
                    }
                    promise.resolve();
                }.bind(this),null,true);
            }.bind(this)).then(function(data){
                    this.renderPrivilege();
                    promise.resolve();
                }.bind(this));
        },
        promiseIsVIP:function(){
            var promise = new Promise(function(){
                var $myvipBlock = this.vipContainer.find('[data-role="vip"]');
                var $mySvipBlock = this.vipContainer.find('[data-role="svip"]');
//              console.log(Object.keys(this.myVipData))
                if(Object.keys(this.myVipData).length==2 ){
                    $myvipBlock.i18nHTML(stringFormat(TEMPLATE.VIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.showtime((new Date(this.myVipData['vip'].expireTime))),i18nTranslate('MyVip_EndTime'),i18nTranslate('MyVip_startTime'),'MyVip_EndTime','MyVip_startTime'));
                    $mySvipBlock.i18nHTML(stringFormat(TEMPLATE.SVIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.countdownTime(this.myVipData['svip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),'MyVip_CountDown'));
                    $mySvipBlock.show();
                }else{
                    this.myVipData['vip'] && $myvipBlock.i18nHTML(stringFormat(TEMPLATE.VIP_BLOCK,DateTime.showtime((new Date(this.myVipData['vip'].expireTime))),DateTime.countdownTime(this.myVipData['vip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),i18nTranslate('MyVip_EndTime'),'MyVip_CountDown','MyVip_EndTime'));
                    this.myVipData['svip'] && $mySvipBlock.i18nHTML(stringFormat(TEMPLATE.SVIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.countdownTime(this.myVipData['svip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),'MyVip_CountDown'));
                    $mySvipBlock.removeClass().addClass('is_vip_block').show();
                }
                promise.resolve();
            }.bind(this)).then(function(){
                    if(this.cache['vipLists']){
                        this.renderVIP(this.cache['vipLists']);
                        return true;
                    }
                    var shopUrl = "service/shop/v3/list/1?shopTypeId=1&lg="+language_NUM[I18N.language]+"&no=0&size=10";
                    Bussiness.getData(shopUrl,function(data){
                        if(data.code==0 && data.dataInfo){
                            this.renderVIP(this.cache['vipLists'] = this.formatVIPData(data.dataInfo.list));
                        }
                        promise.resolve();
                    }.bind(this),null,true);
                }.bind(this)).then(function(){

                }.bind(this));
        },
        renderVIP:function(data){
            if(!data) return;
            var vip = $('[data-role="vip"]'),
                svip = $('[data-role="svip"]'),
                vipUl = vip.find('[data-role="vipUl"]'),
                svipUl = svip.find('[data-role="svipUl"]'),
                vipBtn = $('[data-role="vipBuy"]'),
                svipBtn = $('[data-role="svipBuy"]'),vIndex=false,sIndex=false;
            data[1] && vipUl.i18nHTML(data[1]['current'].map(function(item,i){
                if(!vIndex){
                    vipBtn.data({'id':item.id ,'price':item.current,'sname':'vip'});
                }
                return stringFormat(TEMPLATE.VIP_ITEM,item.expire,item.original==0?'':item.original,item.current,item.id, !vIndex ? (vIndex=true)&& ' active':'');
            }.bind(this)).join(''));

            data[2] && svipUl.i18nHTML(data[2]['current'].map(function(item,i){
                if(!sIndex){
                    svipBtn.data({'id':item.id ,'price':item.current,'sname':'svip'});
                }
                return stringFormat(TEMPLATE.SVIP_ITEM,item.expire,item.original==0?'':item.original,item.current,item.id,  !sIndex ? (sIndex=true)&& ' active':'');
            }.bind(this)).join(''));
            this.bindEvents(this.vipContainer);
        },
        renderPrivilege:function(){
            var language = I18N.language;
            this.cache['vip'] && $('[data-role="vip-privilege"]').html(this.cache['vip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
            this.cache['svip'] && $('[data-role="svip-privilege"]').html(this.cache['svip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
        },
        formatVIPData:function(data){
            if(!data) return;
            var result = {};
            data.forEach(function(item,index){
                result[item['type']] = result[item['type']] || {};
                result[item['type']]['name']= item['name'];
                result[item['type']]['pic'] = item['pic'];
                result[item['type']]['current'] = result[item['type']]['current'] ||[];
                result[item['type']]['current'][index]=item['price'];
                result[item['type']]['current'][index]['expire']=item['expire'];
                result[item['type']]['current'][index]['id']=item['id'];
            });
            return result;
        },
        bindEvents:function(oParent){
//      	console.log(this.isSVIP)
//      	console.log(this.isVIP)
            if(!this.isVIP&&!this.isSVIP){
                $(".vip_block").find("img").css("opacity","0.3");
                $(".svip_block").find("img").css("opacity","0.3");
                $(".vip_block").find($(".vip_icon")).after($("<p class='vipText period' id='vipText'></p>"));
                $(".svip_block").find($(".vip_icon")).after($("<p class='vipText period' id='svipText'></p>"));
            }
            if(!this.isVIP){
                $("#vipText").html("<span data-i18n='MyVip_notvip' data-stat='MyVip_notvip'>"+i18nTranslate('MyVip_notvip')+"</span>");
                $(".is_vip_block").find("img").css("opacity","0.3");
            }
            if(!this.isSVIP){
                $("#svipText").html("<span data-i18n='MyVip_notsvip' data-stat='MyVip_notsvip'>"+i18nTranslate('MyVip_notsvip')+"</span>");
                $(".is_svip_block").find("img").css("opacity","0.3");
            }
            $(".vip_price").parent("div").wrap($("<div class='vip_father'></div>"));
            $(".vip_price").parent("div").addClass("dialog_vip");
            $(".vip_price").siblings("a").slice(0,-1).remove();

            $(".svip_price").parent("div").wrap($("<div class='svip_father'></div>"));
            $(".svip_price").parent("div").addClass("dialog_vip");
            $(".svip_price").siblings("a").slice(0,-1).remove();
//      	创建H2和取消键
            $(".vip_father").children("div").prepend("<h2 class='caption' data-i18n='Store_Notice' data-stat='Store_Notice'>"+i18nTranslate('Store_Notice')+"</h2>");
            $(".svip_father").children("div").prepend("<h2 class='caption' data-i18n='Store_Notice' data-stat='Store_Notice'>"+i18nTranslate('Store_Notice')+"</h2>");
            $(".vip_father").children("div").append("<a data-i18n='Store_Cancel' data-stat='Store_Cancel' class='cancels'>"+i18nTranslate("Store_Cancel")+"</a>");
            $(".svip_father").children("div").append("<a data-i18n='Store_Cancel' data-stat='Store_Cancel' class='cancels'>"+i18nTranslate("Store_Cancel")+"</a>");
//      	取消键点击
            $(".cancels").bind('click',function(){
                $(".vip_father").hide();
                $(".svip_father").hide();
            })
            $
            $(".btn_buy_vip").click(function(){
                $(".vip_father").find("p").removeClass('active');
                $(this).siblings("div").show();
            });
            $(".btn_buy_svip").click(function(){
                $(".svip_father").find("p").removeClass('active');
                $(this).siblings("div").show();
            });
            $(".is_vip_top p").mouseenter(function(){
                vipTime = setTimeout(function(){
                    $(".vip_ex").show();
                },1000);
            });
            $(".is_vip_top p").mouseleave(function(){
                clearTimeout(vipTime);
                $(".vip_ex").hide();
            });
            $(".is_svip_top p").mouseenter(function(){
                svipTime  = setTimeout(function(){
                    $(".svip_ex").show();
                },1000);
            })
            $(".is_svip_top p").mouseleave(function(){
                clearTimeout(svipTime);
                $(".svip_ex").hide();
            })
            $(".vip_top p").mouseenter(function(){
                vipTime = setTimeout(function(){
                    $(".vip_ex").show();
                },1000);
            })
            $(".vip_top p").mouseleave(function(){
                clearTimeout(vipTime);
                $(".vip_ex").hide();
            })
            $(".svip_top p").mouseenter(function(){
                svipTime = setTimeout(function(){
                    $(".svip_ex").show();
                },1000);
            })
            $(".svip_top p").mouseleave(function(){
                clearTimeout(svipTime);
                $(".svip_ex").hide();
            })
            var m=0;
            $(".vip_price").click(function(){
                m+=1;
                console.log(m);
            })
            $(".svip_price").click(function(){
                m+=1;
                console.log(m);
            })
            $(".btn_renew").click(function(){
                $(".vip_father").hide();
                $(".svip_father").hide();
            })
            oParent && oParent.unbind('click').click(function(evt){
                var target = $(evt.target),flag,sel,id,price,name;
                if(target.data('role')=='vipBuy' || target.data('role')=='svipBuy'){
//              console.log($(target).data())
                    id = $(target).data('id');
                    price = $(target).data('price');
                    name = $(target).data('sname');
                    this.purchase(id,1,price,name);
                }
                if(sel = (target.data('select') || target.parent().data('select'))){
                    var tar = evt.target.nodeName.toLowerCase()=='p' ? target : target.parent();
                    tar.addClass('active');
                    tar.siblings().removeClass('active');
                    sel =sel.split('-'),flag = sel[0]+'Buy',id = sel[1],price = sel[2];
                    $('[data-role="'+flag+'"]').data('id',id);
                    $('[data-role="'+flag+'"]').data('price',price);
                    $('[data-role="'+flag+'"]').data('sname',sel[0]);//vip or svip
                }
            }.bind(this));
        },
//		购买,触发pop弹窗
        purchase:function(id,num,price,name){
            this.popPurchase(id,num,price,name);
        },
//		购买弹窗
        popPurchase:function(id,num,price,name){
            if (!user_util.user_info) {
                user_util.is_login(true);
            }else{
                var tpl= '<p>'+i18nTranslate('Store_ConfirmThePayments')+'</p>';
                Popup.show({
                    'template':TEMPLATE.POP,
                    'caption':i18nTranslate('Store_Notice'),
                    'content':stringFormat(tpl,price),
                    'buttons':'<a data-role="confirm-ok" class="ok">'+i18nTranslate('Store_OK')+'</a><a data-role="close" class="cancel">'+i18nTranslate('Store_Cancel')+'</a>'
                });

                Popup.button.click(function(evt){
                    var target = $(evt.target),role = target.data('role');
                    if(!role) return;
                    switch(role){
                        case 'confirm-ok':
                            target.addClass("cancel_ok");
                            target.removeClass("ok");
                            this.requestPurchase(id,num,name);
                            return;
                        case 'close':
                            Popup.close();
                            return;
                        case 'recharge':
                            setTimeout(window.location.reload(),1000);
                            return ;
                        case 'back':
                            Popup.back();
                            return;
                    }
                }.bind(this));
            }
        },
//		购买
        requestPurchase:function(id,num,name){
            Bussiness.postData('service/shop/v3/'+id,{
                'shopId':id,
                'num':num
            },function(data){
                console.log(data);
                switch(data.code){
                    case 0:
                        var tpl = ((name == 'vip' && this.isVIP) || (name == 'svip' &&this.isSVIP))? i18nTranslate('Store_CongratulationBuyForRenew') :i18nTranslate('Store_CongratulationToBeVIP');
                        var handler = function(){window.location.reload()};
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleSuccess'),
                            'content':stringFormat(tpl,i18nTranslate('Store_'+name.toUpperCase()))+ '.<br/>'+i18nTranslate('Store_ValidUntil')+DateTime.showtime(new Date(data.dataInfo.expire))+'<br/>'+i18nTranslate('Store_CongratulationGotPrivileges'),
                            'buttons':'<a data-role="close" class="ok">'+i18nTranslate('Store_OK')+'</a>',
                            'closeHandler':handler
                        });
                        console.log('购买成功');
//                      购买成功后重新储存一遍cookie
                        var users = JSON.parse(Cookie.get(Cookie.key['user_info']));
                        console.log(users.userAttr[3])
                        if(users.userAttr[3]!=2){
                            if(stringFormat(i18nTranslate('Store_'+name.toUpperCase()))=="VIP"){
                                users.userAttr[3]=1;
                            }else if(stringFormat(i18nTranslate('Store_'+name.toUpperCase()))=="SVIP"){
                                users.userAttr[3]=2;
                            }
                        }
                        user_info = users;
                        cookie_util.add_or_update_cookie(cookie_util.base_attr.user_info, JSON.stringify(user_info), 10 * 24 * 60 * 60 * 1000);
                        return;
                    case 35:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_BalanceNotEnough'),
                            'buttons':'<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge" data-stat="Store_Pop_BtnRecharge">'+i18nTranslate('Store_Charge')+'</a><a data-role="close" class="cancel" data-stat="Store_Pop_BtnCancel">'+i18nTranslate('Store_Cancel')+'</a>'
                        });
                        console.log('余额不足');
                        return;
                    default:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_FailToBuy'),
                            'buttons':'<a data-role="close" class="ok">'+i18nTranslate('Store_OK')+'</a>'
                        });
                        console.log('购买失败');
                        return;
                }
            }.bind(this))
//          让ok按钮恢复颜色
            $(".ok").removeClass("cancel_ok");
            $(".ok").addClass("ok");
        },
//     VIP加入结束
//     座驾加入开始
        formatMyCarData:function(data){

        },
//      渲染数据
        renderMyCar:function(data){
            if(data && data.length>0){
                var imgTpl='<img class="car_product_img" src="{0}" alt="" />';
                this.wrapper.find('[data-role="mycarsUl"]').html(data.map(function(item,i){
                        if(item.used) {isDriving = i;}
                        return stringFormat(TEMPLATE.MYCARS_ITEM,
                            item.p? stringFormat(imgTpl,IMAGE_DOMAIN + item.p):'',
                            item.used ? 'cancel'+item.id :item.id ,// item.carId,  item.info.id
                            item.used ?DISPLAY_NONE:''
                          //  typeof(item.info[I18N.language].isRenew)!='undefined'?DISPLAY_NONE:''
                        )}
                )).parent().show();
            }
//      		遍历标签biaoqian
            $(".car_product_top").mouseenter(function(){
                var carthis=$(this);
                cartimetag=setTimeout(function(){
                    var carindex=carthis.parent("li").index();
                    var carex="<div class='car_ex'><p class='car_product_name'></p><p class='car_validity'></p></div>";
                    carthis.append(carex);
                    $(".car_product_name").html(data[carindex].lg[I18N.language]?data[carindex].lg[I18N.language]:data[carindex].n);
                    $(".car_validity").html(i18nTranslate('Mycar_PeriodOfValidity')+ DateTime.showtime((new Date(data[carindex].endDate))));
                },1000);
            })
            $(".car_product_top").mouseleave(function(){
                clearTimeout(cartimetag);
                $(this).children($(".car_ex").remove())
            })
        },
        //      绑定事件
        bindEventscar:function(oParent){
            if($(".Myprofile").css("color")=="rgb(0, 197, 200)"){
                $(".bottom_prev").width(0);
                $(".bottom_line").width($(".Myprofile").width());
            }else{
                var pwidth=$(".Myprofile").width()+38;
                $(".bottom_prev").width(pwidth);
                $(".bottom_line").width($(".Myaccount").width());
            }
            $(".Myprofile").click(function(){
                $(".Myaccount").css("color", "#71787a");
                $(this).css("color", "#00c5c8");
                $(".my_acc").hide();
                $(".my_pro").show();
                $(".bottom_prev").stop().animate({"width":"0px"},300);
                $(".bottom_line").stop().animate({"width":$(".Myprofile").width()},300);
            })
            $(".Myaccount").click(function(){
                $(".Myprofile").css("color", "#71787a");
                $(this).css("color", "#00c5c8");
                $(".my_pro").hide();
                $(".my_acc").show();
                $(".bottom_prev").stop().animate({"width":$(".Myprofile").width()+38},300);
                $(".bottom_line").stop().animate({"width":$(".Myaccount").width()},300);
            })
            $(".btn_enable").each(function(index){
                if($(this).attr("style")=="display:none;"){
                    $(this).parent("div").append($("<img src='/resource/static/image/store/rightbg.png' class='rightbg'>"));
                    $(this).parent("div").addClass("btnright");
                }
            })

            oParent && oParent.unbind('click').click(function(evt){
                var target = $(evt.target),pId,previewID;
                if((pId = target.data('change'))!== undefined){
                    if(isNaN(pId)){
                        Bussiness.postData('service/room/v3/user/car/del',{},function(res){
                            if(res.code ==0){
                                $(evt.target).hide().parent("div").addClass("btnright").append($(".rightbg")).parent("li").siblings("li").children("div").removeClass("btnright").children("a").show();
                            }
                        });
                    }else{
                        Bussiness.postData('service/room/v3/user/car/'+pId,{cid:pId},function(res){
                            if(res.code==0){
                                $(evt.target).hide().parent("div").addClass("btnright").append($(".rightbg")).parent("li").siblings("li").children("div").removeClass("btnright").children("a").show();
                            }
                        });
                    }
                }
            }.bind(this));
        },
//		座驾加入结束
        renderPrivilege:function(){
            var language = I18N.language;
            this.cache['vip'] && $('[data-role="vip-privilege"]').html(this.cache['vip'].map(function(item){

                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
            this.cache['svip'] && $('[data-role="svip-privilege"]').html(this.cache['svip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
        },

        localize: function() {
            this.startPromise();
        },

        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)) //move method identity to utility
                .then(this.identified.bind(this));
        },
        'message':function(){
            Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
                if(data.code==0){
                    this.messages_length = data['dataInfo']['list'].length;
                }
                this.promise.resolve();
            }.bind(this),null,true);
        },
        'identify': function() {
            this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            if (user)
                return this.identity = JSON.parse(user);
            // else {
            //     var userName = Cookie.get(Cookie.key['login_name']);
            //     console.log(userName);
            //     if (!userName)
            //         return 'anonymous';
            //     Bussiness.postData('user_init_user_info.fly', {
            //         'loginName': userName
            //     }, function(data) {
            //         //console.log(data);
            //         if (data && data.code == 0)
            //             this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
            //         else
                        this.promise.resolve();
            //     }.bind(this), function() {
            //         this.promise.resolve();
            //     }.bind(this));
            // }
        },

        'identified': function() {
            var _this=this;
            Header.identified(this.identity);
            _nav.identified(this.identity,this.messages_length);
            _task.identified(this.identity);
            var sign = this.sign = require('component/sign');
            sign.start();
            if(this.identity){
//          	console.log(this.identity.userType)
                if(this.identity.userType==0){
                    $(".newAccountTab").children("a").slice(2).hide();
                }
                I18N.init({
                    'onLocalize': this.localize.bind(this)
                });
                this.initCalendar();
                this.getSelfInfo();
                this.startPromise();

                //点击别的地方 生日插件隐藏
                $(document).click(function(){
                    if(!_this.spanHover){
                        _this.hideCalendarContent();
                    }
                });
            }else{
                login_util.show_login_div();
                $("div.new_user_host").html('<span class="sorry" data-i18n="Login_Out_Conts">'+i18nTranslate('Login_Out_Conts')+'</span>');
            }
        },
//      得到信息
        'getSelfInfo':function() {
            var _this=this;
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            Bussiness.getData('service/user/v3/property?user&badge',function(data){
                console.log(data)
                $.unblockUI();
//              console.log("得到信息")
//              console.log(data.dataInfo.birthday,data.dataInfo.sex)
                if(data.code == 0){
                    var data = data.dataInfo;
                    if(data){
                        var sImgSrc=data['user']['pic']?DOMAIN_CONFIG['IMAGE_DOMAIN']+data['user']['pic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                        $("#loadedUserPic").attr("src", sImgSrc);
                        $("#modifyUserPic").attr("src", sImgSrc);
                        this.setUserInfo(data.user.nk,data.user.sex,data.user.birthday,data.user.uid,data);
                    }
                }else {
                    user_util.user_out('login_util', 'user_out');
                    $("#loadedBox").html(i18nTranslate('MyProfile_FailedLoad'));
                }
            }.bind(this),null,true);
        },
//      放置用户信息
        'setUserInfo':function(nickName,sex,birthday,userId,data){
            var disnickName = (!nickName || $.trim(nickName)=='') ? i18nTranslate('MyProfile_No') : $.trim(nickName);
            var disbirthday = (!birthday || $.trim(birthday)=='') ? i18nTranslate('MyProfile_No') : $.trim(birthday);
//			放置用户姓名信息
            $('#edit_nickname').val(disnickName);
            if(nickName && $.trim(nickName)!=''){
                $('#edit_nickname').attr("data-name",$.trim(nickName));
                $("#loadedName").attr("data-name",$.trim(nickName));
            }else{
                $('#edit_nickname').attr("data-name",'');
                $("#loaded").attr("data-name",'');
            }
//		放置用户生日信息
            $('#loadedBirthday').text(disbirthday);
            if(birthday && $.trim(birthday)!=''){
                $('#loadedBirthday').attr("data-birthday",$.trim(birthday));
            }else{
                $('#loadedBirthday').attr("data-birthday",'');
            }
            var year=disbirthday.substring(0,4);
            var month=disbirthday.substring(5,7);
            var day=disbirthday.substring(8);
//          console.log(birthday)
            $("#edit_birthday_year").val(year);
            $("#edit_birthday_month").val(month);
            $("#edit_birthday_day").val(day);
//		放置用户性别信息
            if(sex == 1) {
                $("#male").prop("checked",true);
                $("#malelabel").css({"background":"#2E383B","color":"#f7f7f7"});
            }else {
                $("#female").prop("checked",true);
                $("#femalelabel").css({"background":"#2E383B","color":"#f7f7f7"});
                sex = 2;
            }
            $('#loadedGender').attr("data-sex",sex);
            //用户ID信息
            userId && $('#userID').html('ID:'+userId);
            //用户勋章信息
            var promise = new Promise(function(){
                _nav.getBadges(promise);
            }.bind(this)).then(function(badge){
                    var badgeHTML = _nav.genBadge(badge,data),mybadgeDIV=$('.mystore_badges');
                    if(!badgeHTML){
                        mybadgeDIV.i18nHTML('<p data-i18n="MyRewards_rewards_empty">{{MyRewards_rewards_empty}}</p>');
                    }else{
                        data && mybadgeDIV.html(badgeHTML).append('<div class="selfBadgeNotic hidden"></div>');
                        //徽章
                        $('.mystore_badges img').unbind('mouseenter').mouseenter(function(){
                            var index=$(this).index(),id = $(this).data('id'),lang = Cookie.get(Cookie.key['locale']),temp = badge[id]['lg'][lang];
                            timer= setTimeout(function(){
                                $('.selfBadgeNotic').html(stringFormat('<h2>{0}</h2><span>{1}</span>',temp['n'],temp["t"])).addClass('self_badge_'+index).removeClass('hidden');
                            },1000)
                        }).mouseleave(function(){
                            var index = $(this).index();
                            $('.selfBadgeNotic').removeClass('self_badge_'+index).addClass('hidden');
                            clearTimeout(timer);
                        });
                    }
                });
        },
        'showErrorInfo':function(msg,dataI18n){
            $("#info_error").attr('data-i18n',dataI18n).text(msg);
        },
        'showErrorInfo2':function(msg,dataI18n){
            $("#info_error2").attr('data-i18n',dataI18n).text(msg);
        },
        'hideErrorInfo':function(){
            $(".errorShow").slideUp();
        },
        'initCalendar':function(){
            var _this=this;
            _this.spanHover=false;

            $('#edit_user_birthday_calendar input').val('');
            $('#edit_user_birthday_calendar input').bind('click',function(){
                _this.hideCalendarContent();
                $(this).parent("span").addClass("blackbg").siblings("span").removeClass("blackbg");
                $(this).next('div').show();

            })
            $('#edit_user_birthday_calendar').hover(
                function(){
                    _this.spanHover=true;
                },function(){
                    _this.spanHover=false;
                }
            );

//			用户名键盘事件
            $('#edit_nickname').bind('keyup',function(){
                var username = $.trim($("#edit_nickname").val());
                if(!username || username==''||!_this.checkName(username)||_this.getByteLength(username,2,25)){
                    $(this).parent("td").removeClass("nametrue");
                    $(this).parent("td").addClass("namefalse");
                }else{
                    $(this).parent("td").removeClass("namefalse");
                    $(this).parent("td").addClass("nametrue");
                }
            })
//          性别按钮
            $('#malelabel').bind('click',function(){
                $("#male").prop("checked",true);
                $(this).css({"background":"#2E383B","color":"#f7f7f7"});
                $("#femalelabel").css({"background":"#232d30","color":"#959899"});
            });
            $('#femalelabel').bind('click',function(){
                $("#female").prop("checked",true);
                $(this).css({"background":"#2E383B","color":"#f7f7f7"});
                $("#malelabel").css({"background":"#232d30","color":"#959899"});
            });
//          更改密码是否显示
            var hasPwd=0;
            $("#changeBtn").bind('click',function(){
                $(this).siblings("table").toggle(600);
                if(hasPwd==0){
                    hasPwd=1;
                }else{
                    hasPwd=0;
                }

            });
//			眼睛
            $(".pwdInput").bind('keydown',function(){
                $(this).siblings().css("display","inline-block");
            })
            $(".pwdInput").bind('blur',function(){
                var _this=$(this).siblings();
                setTimeout(function(){
                    _this.hide();
                },1000);
            })
            $(".eye").bind('click',function(){
                $(this).siblings("input").focus();
                if($(this).siblings("input").attr("type")=="password"){
                    $(this).siblings("input").attr("type","text");
                    $(this).addClass("eyes");
                }else{
                    $(this).siblings("input").attr("type","password");
                    $(this).removeClass("eyes");
                }
                console.log($(this).siblings("input").attr("type"));
            })

//           save按钮
            $('#saveBtn').click(function(){
                _this.modify();
                if(hasPwd==1){
                    _this.modifyPWD();
                }
            });
            //年显示
            $('#year').bind('click',function(){
                if(_this.spanHover){
                    _this.hideCalendarContent();
                    $('#edit_birthday_year_content').show();
                }else{
                    _this.hideCalendarContent();
                }
            });
            //月显示
            $('#month').click(function(){
                _this.hideCalendarContent();
                $('#edit_birthday_month_content').show();
            });
            //日显示
            $('#day').click(function(){
                _this.hideCalendarContent();
                $('#edit_birthday_day_content').show();
            });
//          遍历年月日选择框数
            var dDate = new Date();
            var dCurYear = dDate.getFullYear();
            var strYear = "";
            for (var i = dCurYear; i > dCurYear - 100; i--) {
                strYear = '<a href="javascript:void(0);"   value="'+i+'">'+i+'</a>';
                $('#edit_birthday_year_content div').append(strYear);
            }

            $('#edit_birthday_year_content').perfectScrollbar();
            var strMonth = "";
            for(var i=1;i<13;i++) {
                var value = (i<10?'0'+i:i+"");
                strMonth = '<a href="javascript:void(0);" value="'+value+'">'+value+'</a>';
                $('#edit_birthday_month_content div').append(strMonth);
            }

            $('#edit_birthday_month_content').perfectScrollbar();
            var strDay = "";
            for(var i=1;i<32;i++) {
                var value = (i<10?'0'+i:i+"");
                strDay = '<a href="javascript:void(0);" value="'+value+'">'+value+'</a>';
                $('#edit_birthday_day_content div').append(strDay);
            }
            $('#edit_birthday_day_content').perfectScrollbar();
            //动态绑定年的点击事件
            $("#edit_birthday_year_content div").delegate("a","click",function(){
                var year = $(this).attr("value");
                $('#edit_birthday_year_content div a').removeClass();
                $(this).addClass("alt");
                $(this).siblings("a").addClass("aopa6");
                $('#edit_birthday_year').val(year);
                _this.hideCalendarContent();
            });
            $("#edit_birthday_year_content div").delegate("a","mouseenter",function(){
                $(this).siblings("a").addClass("aopa6");
            });
            //动态绑定月的点击事件
            $("#edit_birthday_month_content div").delegate("a","click",function(){
                var month = $(this).attr("value");
                $('#edit_birthday_month_content div a').removeClass();
                $(this).addClass("alt");
                $(this).siblings("a").addClass("aopa6");
                $('#edit_birthday_month').val(month);
                _this.hideCalendarContent();
//              _this.initDay();
            });
            $("#edit_birthday_month_content div").delegate("a","mouseenter",function(){
                $(this).siblings("a").addClass("aopa6");
            });
            //动态绑定日的点击事件
            $("#edit_birthday_day_content div").delegate("a","click",function(){
                var day = $(this).attr("value");
                $('#edit_birthday_day_content div a').removeClass();
                $(this).addClass("alt");
                $(this).siblings("a").addClass("aopa6");
                $('#edit_birthday_day').val(day);
                _this.hideCalendarContent();
            });
            $("#edit_birthday_day_content div").delegate("a","mouseenter",function(){
                $(this).siblings("a").addClass("aopa6");
            });
        },
//      隐藏日期框
        'hideCalendarContent':function(){
            $('#edit_birthday_year_content').hide();
            $('#edit_birthday_month_content').hide();
            $('#edit_birthday_day_content').hide();
        },
//      初始化日期
        'TGetDaysInMonth':function (iYear, iMonth) {
            var dPrevDate = new Date(iYear, iMonth, 0);
            return dPrevDate.getDate();
        },
//      点击后失去焦点
        'blurInput':function(){
            this.hideCalendarContent();
        },
//      放置用户信息
        'setEditUserInfo':function(nickName,sex,birthday){
            var _this=this;
            $('#edit_nickname').val(nickName);
            $("#edit_nickname").blur(function(){
                _this.checkNickname(true);
            });


            $("input:radio[name=user_sex]").removeAttr("checked");
            if(sex == 1)
            {
                $("input:radio[name=user_sex][value='1']").prop("checked",'true');
            }else {
                $("input:radio[name=user_sex][value='2']").prop("checked",'true');
            }
            if($.trim(birthday)!='')
            {
                var days = birthday.split('-');
                this.setCalendar(days[0],days[1],days[2]);
            }
        },
        'setCalendar':function (year,month,day){
            this.hideCalendarContent();
            this.setYear(year);
            this.setMonth(month);
            this.setDay(day);
        },
        'setYear':function(year){
            if(year&& $.trim(year)!=''){
                $('#edit_birthday_year_content div a[value='+year+']').addClass("alt");
                $('#edit_birthday_year').val(year);
            }
        },
        'setMonth':function (month) {
            if(month && $.trim(month)!='')
            {
                $('#edit_birthday_month_content div a[value='+$.trim(month)+']').addClass("alt");
                $('#edit_birthday_month').val(month);
            }
        },
        'setDay':function (day){
            this.initDay();
            if(day && $.trim(day)!='')
            {
                $('#edit_birthday_day_content div a[value='+$.trim(day)+']').addClass("alt");
                $('#edit_birthday_day').val(day);
            }
        },
//      检查用户名
        'checkNickname':function(isAsync) {
            var _this=this;
            var nickname_ok=false;
            var username = $.trim($("#edit_nickname").val());
            var loadedname=$("#loadedName").attr("data-name");

            if(username!= loadedname){					//如果输入用户名不等于原本的用户名
                if(!username || username==''){						//用户名为空
                    this.showErrorInfo(i18nTranslate('MyProfile_EnterNickname'),'MyProfile_EnterNickname');
                    nickname_ok = false;

                }else if (!this.checkName(username)) {				//正则验证用户名
                    this.showErrorInfo(stringFormat(i18nTranslate('MyProfile_NotAllowed'),username),'MyProfile_NotAllowed');
                    nickname_ok = false;
                }else if (this.getByteLength(username,2,25)) {		//验证用户名长度
                    this.showErrorInfo(i18nTranslate('MyProfile_NicknameLenLimited'),'MyProfile_NicknameLenLimited');
                    nickname_ok = false;
                }else{   											//以上错误不成立,提交
                    $.ajax({
                        url :"/service/user/v3/nick/valid",
                        type : "get",
                        async: isAsync,
                        data : {
                            nick: username
                        },
                        dataType : "json",
                        success : function(data) {
                            if (data.code != 0){
                                if(data.code == 601){
                                    _this.showErrorInfo(stringFormat(i18nTranslate('MyProfile_NotAllowed'),username),'MyProfile_NotAllowed');
                                }else{
                                    _this.showErrorInfo(i18nTranslate('MyProfile_NicknameIn'),'MyProfile_NicknameIn');
                                }
                                nickname_ok = false;
                            }else{
                                nickname_ok = true;
                                _this.hideErrorInfo();
                            }
                        }
                    });
                }
            } else {
                nickname_ok = true;
            }
            return nickname_ok;

        },
        'getByteLength':function (str, minLength, maxLength) {
            var iLength = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    iLength += 2;
                } else {
                    iLength += 1;
                }
            }
            return iLength<minLength || iLength>maxLength;
        },
        'checkName':function(username) {
            //var key1 = ["anchor","official","admin","seven najm","seven nujoom","najm","7najm","server","system","admin","fuck","shit","7nujoom","nujoom",".","http://", "@","'",'"',"\\","/","av","jb", "sb","jj", "&", "%","系统","运营","管理员","消息","中奖","客服","公告","我操","我日你妈", "脱", "拖", "托", "操你妈","你好难看呀", "我想操你", "我想干你", "你中奖了", "几吧", "煞笔","baobei","就约我吧", "我草", "叼", "卧槽", "色情", "情色", "a片", "毛片", "女优","妓女","鸭子","游客"];
            var key1 = [];
            for (var i = 0; i < key1.length; i++) {
                var str1 = key1[i];

                if (username.indexOf(str1) >= 0)
                    return false;
            }
            //var key2 = [ [ "系", "统" ], [ "客", "服" ], [ "公", "告" ], [ "中", "奖" ], [ "官", "方" ], [ "消", "息" ], [ "运", "营" ], [ "巡", "管" ] ];
            var key2 = [];
            for (var j = 0; j < key2.length; j++) {
                var str2 = key2[j];
                for (var k = 0; k < str2.length; k++) {
                    if (username.indexOf(str2[k]) >= 0) {
                        if (k == str2.length - 1)
                            return false;
                    } else
                        break;
                }
            }
            return true;
        },
//  提交用户名函数
        'modify':function(){
            if(this.checkNickname(false)){
                var nickname = $("#edit_nickname").val().replace(/(^\s*)|(\s*$)/g, "");
                var birthday = '';
                if($('#edit_birthday_year').val()!=''&& $('#edit_birthday_month').val() !=''&& $('#edit_birthday_day').val()!='') {
                    birthday = $('#edit_birthday_year').val().replace(/(^\s*)|(\s*$)/g, "")+"-"+$('#edit_birthday_month').val().replace(/(^\s*)|(\s*$)/g, "")+"-"+$('#edit_birthday_day').val().replace(/(^\s*)|(\s*$)/g, "");
                }
                var sex=$('input:radio[name=user_sex]:checked').val();
                this.modifyUserInfo(nickname, birthday,  sex);
                $("#loadedName").removeClass("nametrue");
                return;
            }else{
                //showErrorTip(get_language_desc('2307'));
            }
        },

        'modifyUserInfo':function(nickname, birthday, sex){
            Bussiness.postData('service/user/v3/update',{'nick' : nickname,'birthday' : birthday,'sex':sex},function(updata){
                $.unblockUI();
                if(updata.code == 0){
                    window['user_util']['update_user_info_attr'](nickname,sex,birthday);
                    this.setUserInfo(nickname,sex,birthday);
                    $(".user_info .user_name").text(nickname);
                    $('.self_exp label[name=nick_name]').text(nickname);
                    $('.detail_top_info .detail_top_name').text(nickname);
                    $(".cancelBtn").click();
                    window.location.reload();
                }else if(updata.code == 601){
                    this.showErrorInfo(stringFormat(i18nTranslate('MyProfile_NotAllowed'),nickname),'MyProfile_NotAllowed');
                }else {
                    this.showErrorInfo(i18nTranslate('MyProfile_FailedSave'),'MyProfile_FailedSave');
                }
            }.bind(this));

        },
        'setErrorInput':function(inputId){
            $('#oldpwd').removeClass('txt_login_on');
            $('#newpwd1').removeClass('txt_login_on');
            $('#newpwd2').removeClass('txt_login_on');
            $("#"+inputId).removeClass("txt_login2");
            $("#"+inputId).removeClass("txt_login5");
            $("#"+inputId).addClass("txt_login_on");
        },
        'setLoadingInput':function(inputId){
            $("#"+inputId).removeClass("txt_login_on");
            $("#"+inputId).removeClass("txt_login5");
            $("#"+inputId).addClass("txt_login2");
        },
        'checkPwd':function(pwd){
            var reg = /^[\w@$]{6,20}$/;
            return reg.test(pwd);
        },
//      验证密码
        'modifyPWD':function(){
            var oldPwd = $.trim($("#oldpwd").val());
            var newPwd = $.trim($("#newpwd1").val());
            var renewPwd = $.trim($("#newpwd2").val());

            if (oldPwd.length == 0)
            {
                this.showErrorInfo2(i18nTranslate('MyProfile_EnterPwd'),'MyProfile_EnterPwd');
                this.setErrorInput("oldpwd");
                return;
            }
            if (newPwd.length == 0)
            {
                this.showErrorInfo2(i18nTranslate('MyProfile_EnterPwd'),'MyProfile_EnterPwd');
                this.setErrorInput("newpwd1");
                return;
            }
            if (renewPwd.length == 0)
            {
                this.showErrorInfo2(i18nTranslate('MyProfile_EnterPwd'),'MyProfile_EnterPwd');
                this.setErrorInput("newpwd2");
                return;
            }
            if (!this.checkPwd(newPwd)) {
                this.setErrorInput("newpwd1");
                this.showErrorInfo2(i18nTranslate('MyProfile_PwdRules'),'MyProfile_PwdRules');
                return;
            }
            if (newPwd != renewPwd) {
                this.showErrorInfo2(i18nTranslate('MyProfile_PwdNoMatch'),'MyProfile_PwdNoMatch');
                this.setErrorInput("newpwd2");
                $('#newpwd1').val('');
                $('#newpwd2').val('');
                return;
            }
            this.hideErrorInfo();
           var userIds = $("#userID").html().split(":")[1];
            Bussiness.postData('service/user/v3/update/password',{'uid':userIds,'pwd':newPwd,'o_pwd':oldPwd},function(data){
                console.log(data)
                if(data.code == 0) {
                    $("#oldpwd").val('');
                    $("#newpwd1").val('');
                    $("#newpwd2").val('');
                    this.setLoadingInput("oldpwd");
                    this.setLoadingInput("newpwd1");
                    this.setLoadingInput("newpwd2");
                    $.tip_simple_alert(i18nTranslate('MyProfile_PwdSuccess'));
                    $("#changeBtn").siblings("table").toggle(600);
                    hasPwd=0;
                }else if(data.code == 8) {
                    this.setErrorInput("oldpwd");
                    this.showErrorInfo(i18nTranslate('MyProfile_PwdIncorrect'),'MyProfile_PwdIncorrect');
                }else{
                    this.showErrorInfo(i18nTranslate('MyProfile_PwdUpdateFailed'),'MyProfile_PwdUpdateFailed');
                }
            }.bind(this));
        }
    };
    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});