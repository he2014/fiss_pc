define(function(require) {
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility = require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP = Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body = Kit.use('Body'),
        Header = Body.Header,
        Footer = Body.Footer,
        Lazyload = Kit.use('Lazyload'),
        Trigger = Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var UserTop = require('component/userTop');
    require('wheel/My97DatePicker/skin/WdatePicker.css');
    require('wheel/My97DatePicker/WdatePicker.js');

    var IMAGE_DOMAIN = DOMAIN_CONFIG['IMAGE_DOMAIN'],
        fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg',
        isV3 = true;

    var TEMPLATE = {
        'MAIN': '<div class="content clearfix">\
            <h2 data-i18n="Exchange_Account_Detail">{{Exchange_Account_Detail}}</h2>\
            <div class="account clearfix">\
                <div class="exchange readStart">\
                    <div class="coin">\
                        <span data-i18n="Exchange_Withdraw_Amount_Of_Coins">{{Exchange_Withdraw_Amount_Of_Coins}}</span>\
                        <span id="exchangeCoin" class="currency icon_coin"></span>\
                        <span data-i18n="Exchange_Coins">{{Exchange_Coins}}</span>\
                        <span class="exchange_rule readEnd">\
                            <span class="btn_rule" data-i18n="Exchange_Exchange_Rules">{{Exchange_Exchange_Rules}}</span>\
                            <span class="info_rule" data-i18n="Exchange_All_Coins_Equal">{{Exchange_All_Coins_Equal}}</span>\
                        </span>\
                    </div>\
                    <div class="hr"></div>\
                    <div class="money">\
                        <span data-i18n="Exchange_Withdraw_Exchangeable_Money">{{Exchange_Withdraw_Exchangeable_Money}}</span>\
                        <span id="exchangeMoney" class="currency"></span>\
                        <span class="dollar" data-i18n="Exchange_Dollar">{{Exchange_Dollar}}</span>\
                    </div>\
                    <p class="term" data-i18n="Exchange_Minimum_Withdrawal">{{Exchange_Minimum_Withdrawal}}</p>\
                    <a id="withdraw" style="display:none;" class="withdraw unclick" data-i18n="Exchange_Withdraw_Money">{{Exchange_Withdraw_Money}}</a>\
                </div>\
                <div class="bonus readEnd">\
                    <div class="money">\
                        <span data-i18n="Exchange_This_Month_Bonus">{{Exchange_This_Month_Bonus}}</span>\
                        <span id="bonusTotal" class="currency"></span>\
                        <span class="dollar" data-i18n="Exchange_Dollar">{{Exchange_Dollar}}</span>\
                        <span class="bonus_faq">\
                            <span class="icon_faq"></span>\
                            <span class="info_faq total_tips" data-i18n="Exchange_Total_Coin_Tips">{{Exchange_Total_Coin_Tips}}</span>\
                        </span>\
                    </div>\
                    <div class="hr"></div>\
                    <ul class="bonus_ul">\
                        <li>\
                            <div class="money clearfix">\
                                <span data-i18n="Exchange_Gift_Bonus_Colon">{{Exchange_Gift_Bonus_Colon}} </span>\
                                <span class="currency" id="giftBonusCurrency"></span>\
                                <span class="dollar">$</span>\
                                <span class="end currency">(<span id="giftBonusCoin" class="icon_coin"></span>)</span>\
                                <span class="bonus_faq">\
                                    <span class="icon_faq"></span>\
                                    <span class="info_faq" data-i18n="Exchange_Info_Faq">{{Exchange_Info_Faq}}</span>\
                                </span>\
                            </div>\
                            <div class="gift_bonus_datail">\
                                <div class="schedule clearfix">\
                                    <div id="bonusStart" class="start currency readStart icon_coin"></div>\
                                    <div class="process readStart">\
                                        <div id="bonusCurrent" class="current"></div>\
                                    </div>\
                                    <div id="bonusEnd" class="end currency readStart icon_coin"></div>\
                                </div>\
                                <p class="tip" data-i18n="Exchange_To_Get_Salary">{{Exchange_To_Get_Salary}}</p>\
                                <p id="term" class="term" data-i18n="Exchange_Total_Broadcasting_Time">{{Exchange_Total_Broadcasting_Time}}</p>\
                            </div>\
                        </li>\
                        <li>\
                            <div class="money clearfix">\
                                <span data-i18n="Exchange_Event_Bonus_Colon">{{Exchange_Event_Bonus_Colon}} </span>\
                                <span id="eventBonusCurrency" class="currency"></span>\
                                <span class="dollar">$</span>\
                                <span class="end currency">(<span id="eventBonusCoin" class="icon_coin"></span>)</span>\
                            </div>\
                        </li>\
                        <li style="display:none;">\
                             <div class="money clearfix">\
                                <span data-i18n="Exchange_Watcher_Bonus_Colon">{{Exchange_Watcher_Bonus_Colon}} </span>\
                                <span id="watcherBonusCurrency" class="currency"></span>\
                                <span class="dollar">$</span>\
                                <span class="end currency">(<span class="icon_coin" id="watcherBonusCoin"></span>)</span>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
            <div class="detail clearfix">\
                <form>\
                    <div class="scope clearfix">\
                        <h3 class="readStart" data-i18n="Exchange_Scope">{{Exchange_Scope}}</h3>\
                        <input class="readStart" type="radio" name="scope" id="today" value="today" checked><label class="readStart" for="today" data-i18n="Exchange_Today">{{Exchange_Today}}</label>\
                        <input class="readStart" type="radio" name="scope" id="range" value="range"><label class="readStart" for="range" data-i18n="Exchange_Choose_Time">{{Exchange_Choose_Time}}</label>\
                        <input id="startDate" class="date readStart" type="text" name="date-start" data-i18n="Exchange_Year_Month_Day" placeholder="{{Exchange_Year_Month_Day}}">\
                        <span class="readStart">&nbsp;—&nbsp;</span>\
                        <input id="endDate" class="date readStart" type="text" name="date-end" data-i18n="Exchange_Year_Month_Day" placeholder="{{Exchange_Year_Month_Day}}">\
                        <input class="readStart" id="query" type="button" name="query" data-i18n="Exchange_Query" value="{{Exchange_Query}}">\
                    </div>\
                    <div class="type clearfix">\
                        <h3 class="readStart" data-i18n="Exchange_Query_Type">{{Exchange_Query_Type}}</h3>\
                        <input class="readStart" type="radio" name="type" id="gift" value="gift" checked><label class="readStart" for="gift" data-i18n="Exchange_Gift_Details">{{Exchange_Gift_Details}}</label>\
                        <input class="readStart" type="radio" name="type" id="bonus" value="bonus"><label class="readStart" for="bonus" data-i18n="Exchange_Bonus_Details">{{Exchange_Bonus_Details}}</label>\
                        <input class="readStart" type="radio" name="type" id="withdraw" value="withdraw"><label class="readStart" for="withdraw" data-i18n="Exchange_Withdraw_Details">{{Exchange_Withdraw_Details}}</label>\
                    </div>\
                </form>\
                <div id="table1" class="gift_detail hidden">\
                    <div class="table_nav">\
                            <!--<span class="readStart">\
                                Today <strong></strong>\
                            </span>-->\
                            <span class="readEnd">\
                                <span data-i18n="Exchange_Coin_Income">{{Exchange_Coin_Income}}</span><span id="ext" class="coin_income"></span>\
                            </span>\
                    </div>\
                    <table>\
                        <tr>\
                            <th data-i18n="Exchange_Time">{{Exchange_Time}}</th>\
                            <th data-i18n="Exchange_Type">{{Exchange_Type}}</th>\
                            <th data-i18n="Exchange_Who">{{Exchange_Who}}</th>\
                            <th data-i18n="Exchange_Coin">{{Exchange_Coin}}</th>\
                        </tr>\
                        <tbody id="tbody1"></tbody>\
                    </table>\
                </div>\
                <div id="table2" class="recharge_detail hidden">\
                    <table>\
                        <tr>\
                            <th data-i18n="Exchange_Order_Number">{{Exchange_Order_Number}}</th>\
                            <th data-i18n="Exchange_Date">Date</th>\
                            <th class="font12" data-i18n="Exchange_Amount_Of_Exchange_Coins">{{Exchange_Amount_Of_Exchange_Coins}}</th>\
                            <th data-i18n="Exchange_Actual_Income">{{Exchange_Actual_Income}}</th>\
                            <th data-i18n="Exchange_Payment_Type">{{Exchange_Payment_Type}}</th>\
                            <th data-i18n="Exchange_Order_Number">{{Exchange_Bank_Swift_Number}}</th>\
                        </tr>\
                        <tbody id="tbody2">\
                        </tbody>\
                    </table>\
                </div>\
                <div id="table3" class="gift_detail hidden">\
                    <div class="table_nav">\
                            <!--<span class="readStart">\
                                Today <strong></strong>\
                            </span>-->\
                            <span class="readEnd">\
                                <span data-i18n="Exchange_Coin_Income">{{Exchange_Coin_Income}}</span><span id="ext2" class="coin_income"></span>\
                            </span>\
                    </div>\
                    <table>\
                        <tr>\
                            <th data-i18n="Exchange_Time">{{Exchange_Time}}</th>\
                            <th data-i18n="Exchange_Type2">{{Exchange_Type2}}</th>\
                            <th data-i18n="Exchange_Bonus">{{Exchange_Bonus}}</th>\
                            <th data-i18n="Exchange_Coin">{{Exchange_Coin}}</th>\
                        </tr>\
                        <tbody id="tbody3"></tbody>\
                    </table>\
                </div>\
                <div id="pager" class="nav_block"></div>\
                <div style="color:red;text-align:center;background:#ccc;" id="noData"></div>\
            </div>\
        </div>',

        'Pop1': '<div class="popup">\
                    <div class="wrap">\
                    <h2 data-i18n="Exchange_Withdraw_Money">{{Exchange_Withdraw_Money}}</h2>\
                    <div class="withdraw_way" data-i18n="Exchange_Withdraw_Way">\
                        <p style="height:60px;"><b data-i18n="Exchange_Withdraw_Way">{{Exchange_Withdraw_Way}} </b><span>{0}</span></p>\
                        <p style="font-size:14px;line-height:16px;" data-i18n="Exchange_Confirm_Account_Information">{{Exchange_Confirm_Account_Information}}</p>\
                    </div>\
                    <div id="popContent">\
                        <p class="withdraw_max" data-i18n="Exchange_Withdraw_Maximum">{{Exchange_Withdraw_Maximum}}</p>\
                        <p class="withdraw_min" data-i18n="Exchange_Minimum_Withdrawal">{{Exchange_Minimum_Withdrawal}}</p>\
                        <p class="withdraw_money clearfix">\
                            <span id="getMoney" class="btn readStart" data-i18n="Exchange_Withdraw_Money">{{Exchange_Withdraw_Money}}</span>\
                            <input id="expectMoney" class="money_num readStart alignEnd" type="text" name="money">\
                            <span class="mark readStart" data-i18n="Exchange_Dollar">{{Exchange_Dollar}}</span>\
                        </p>\
                        <!--<div class="withdraw_consumed clearfix">\
                            <p data-i18n="Exchange_Consumed_Coins">{{Exchange_Consumed_Coins}}</p>\
                            <p data-i18n="Exchange_Surplus_Coins">{{Exchange_Surplus_Coins}}</p>\
                        </div>-->\
                        <p class="withdraw_request" data-i18n="Exchange_Submit_Withdraw_Request">{{Exchange_Submit_Withdraw_Request}}</p>\
                    </div>\
                    <span id="closePop" class="btn_close"></span>\
                </div>\
                <div class="bg"></div>\
                </div>',

        'Pop2': '<p class="withdraw_congrat">\
                    <strong data-i18n="Exchange_Withdrawed_Succesfully">{{Exchange_Withdrawed_Succesfully}}</strong>\
                    <span data-i18n="Exchange_Confirm_Withdraw_Request">{{Exchange_Confirm_Withdraw_Request}}</span></p>',

        'PopAccount':'<div class="popup" id="popAccount">\
                            <div class="wrap" style="width:570px;">\
                                <h2 data-i18n="Exchange_Withdraw_Money">{{Exchange_Withdraw_Money}}</h2>\
                                <p class="account_title" data-i18n="Exchange_Fill_Account_Infomation">{{Exchange_Fill_Account_Infomation}}</p>\
                                <div class="account_info">\
                                    <p><span class="req">*</span><span data-i18n="Exchange_Bank_Name">{{Exchange_Bank_Name}}</span><input class="readEnd" name="bank_name"/></p>\
                                    <p><span class="req">*</span><span data-i18n="Exchange_Bank_Account_Name">{{Exchange_Bank_Account_Name}}</span><input class="readEnd" name="bank_account_name"/></p>\
                                    <p><span class="req">*</span><span data-i18n="Exchange_Bank_Account">{{Exchange_Bank_Account}}</span><input class="readEnd" name="bank_account"/></p>\
                                    <p><span class="req">*</span><span data-i18n="Exchange_Bank_Address">{{Exchange_Bank_Address}}</span><input class="readEnd" name="bank_address"/></p>\
                                    <p><span class="req">*</span><span data-i18n="Exchange_Contact_Phone">{{Exchange_Contact_Phone}}</span><input class="readEnd" name="contact_phone"/></p>\
                                    <p class="swiftcode"><span data-i18n="Exchange_SwiftCode">&nbsp;&nbsp;{{Exchange_SwiftCode}}</span>\
                                        <span class="bonus_faq readEnd">\
                                            <span class="icon_faq"></span><span class="info_faq" data-i18n="Exchange_SwiftCode_Hover_Tip">{{Exchange_SwiftCode_Hover_Tip}}</span>\
                                    </span>\
                                    <input class="readEnd" name="swiftcode" class=""/></p>\
                                </div>\
                                <div class="mid_warn" id="errorTip"></div>\
                                <div class="btn_ok withdraw unclick" id="account_ok" data-i18n="Recharge_Confirm">{{Recharge_Confirm}}</div>\
                                <span class="btn_close"></span>\
                            </div>\
                            <div class="bg"></div>\
                        </div>',

        'ImageTemplate': '<img src="{0}" />',

        'GiftRow': '<tr>\
                        <td>\
                            <p>{0}</p>\
                        </td>\
                        <td>\
                            <strong>{1}</strong>x{2}</td>\
                        <td>{3}</td>\
                        <td>\
                            <span>+<span>{4}</span>&nbsp;<span class="coin"></span></span>\
                        </td>\
                    </tr>',

        'SalaryRow': '<tr>\
                        <td>{0}</td>\
                        <td>{1}</td>\
                        <td><span class="coin">{2}</span></td>\
                        <td>{3}</td>\
                        <td class="red hidden">{4}</td>\
                        <td class="red">{5}</td>\
                        <td class="red">{6}</td>\
                    </tr>',

        'WithdrawRow': '<tr>\
                        <td>\
                            <p>{0}</p>\
                        </td>\
                        <td>{1}</td>\
                        <td>{2}</td>\
                        <td>\
                            <span>+<span>{3}</span>&nbsp;<span class="coin"></span></span>\
                        </td>\
                    </tr>',
        'Account_Detail_Tips':'<div class="Account_Detail_Tips">' +
                                    '<span data-i18n="Account_Detail_Tips">{{Account_Detail_Tips}}</span>\
                               </div>'
    };

    var BonusConfig = [{
        'target': 50000,
        'prize': 200
    }, {
        'target': 150000,
        'prize': 300
    }, {
        'target': 250000,
        'prize': 400
    }, {
        'target': 400000,
        'prize': 600
    }];

    var withdrawConfig = {
        '1': {'en':'Paypal Account','ar':'حساب paypal'},
        '2': {'en':'Bank Account','ar':'حساب بنكي'},
        '3': {'en':'Talent Agency','ar':'الشركة الوسيطة'}
    };


    var exchangeType = {
        '1': {'en':'Earned','ar':'التحويل اليدوي'},
        '2': {'en':'Bonus','ar':'التحول التلقائي'}
    };

    var exchangeStatus = {
        0: {'en':'In processing...','ar':'جاري المعالجة ...'},
        1: {'en':'In processing...','ar':'جاري المعالجة ...'},
        2: {'en':'Already got the money','ar':'تم التحويل'},
        3: {'en':'Failed!','ar':'فشل في عملية التحويل'}
    };


    var Page = {
        run: function() {
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load: function() {
            this.cache = {};
        },
        render: function() {
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + UserTop.html() + TEMPLATE.Account_Detail_Tips + Footer.html());
            this.vipContainer = this.container.find('[data-role="vipContainer"]');

            this.giftTable = $('#table1');
            this.salaryTable = $('#table2');
            this.withdrawTable = $('#table3');
            this.giftBody = $('#tbody1');
            this.salaryBody = $('#tbody2');
            this.withdrawBody = $('#tbody3');

            this.pager = $('#pager');
        },
        compose: function() {
            login_util.setCallback(this.identifyFlow.bind(this));
            I18N.init({
                'onLocalize': this.localize.bind(this)
            });
            Header.init({
                'container': this.container
            });
            UserTop.init({
                'container': this.container,
                'cur': 'menu_myWealth'
            });
        },
        bind: function() {
            this.pager.on('click', '[data-role]', this.changePage.bind(this));
            var getWdatePickerLanguage = function() {
                var language = I18N.language;
                if (language.toLowerCase() == 'zh')
                    return 'zh-cn';
                return language;
            };

            $('#startDate').click(function(evt) {
                WdatePicker({
                    dateFmt: 'yyyy-MM-dd',
                    lang: getWdatePickerLanguage()
                });
                //WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'etime\')}',lang:this.getWdatePickerLanguage()});
            }.bind(this));
            $('#endDate').click(function(evt) {
                WdatePicker({
                    dateFmt: 'yyyy-MM-dd',
                    lang: getWdatePickerLanguage()
                });
                //WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'stime\')}',maxDate:'%y-%M-%d',lang:this.getWdatePickerLanguage()});
            }.bind(this))
        },
        start: function() {
            this.identifyFlow();
        },

        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)) //move method identity to utility
                .then(this.identified.bind(this));
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
                        this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
                    else
                        this.promise.resolve();
                }.bind(this), function() {
                    this.promise.resolve();
                }.bind(this));
            }
        },

        'identified': function() {
            Header.identified(this.identity);
            UserTop.identifyFlow();
            var promise = new Promise(function() {
                Bussiness.getData('service/exchange/v3/exchangeInit',function(data){
                    if(data.code == 0) this.exchange_data = data['dataInfo'];
                    promise.resolve(data);
                }.bind(this),null,isV3);
                //Bussiness.postData('user_exchange.fly', null, function(data) {
                //    if(data.code == 0) this.exchange_data = data['dataInfo'];
                //    promise.resolve(data);
                //}.bind(this), function() {
                //    promise.resolve();
                //});
            }.bind(this)).then(this.renderAccount.bind(this));

            $('#query').bind('click', this.query.bind(this));

            if (this.identity) {

            }
            //else
                //login_util.show_login_div();
        },

        'renderAccount': function(data) {
            if (data.code != 0)
                return;
            this.account = data = data['dataInfo'];
            var expectMoney = data['exchangeMaxmoney'] = Math.floor(data['exchangeMaxmoney'] / 10000) * 100;
            this.renderAccountDOM(data);
            //(this.withdrawDom = $('#withdraw')).bind('click', this.accountTest.bind(this));
        },

        'renderAccountDOM':function(data){
            (this.exchangeCoinDom = $('#exchangeCoin')).html(data['totalBalance']);
            (this.exchangeMoneyDom = $('#exchangeMoney')).html(data['exchangeMaxmoney']);
            (this.bonusTotalDom = $('#bonusTotal')).html((data['activityRewardMoney']+data['incomeRewardMoney']+data['populRewardMoney']) / 100);
            $('#giftBonusCurrency').html(data['incomeRewardMoney']/100);
            $('#giftBonusCoin').html(data['incomeRewardBalance']);
            $('#eventBonusCurrency').html(data['activityRewardMoney']/100);
            $('#eventBonusCoin').html(data['activityRewardBalance']);
            $('#watcherBonusCurrency').html(data['populRewardMoney']/100);
            $('#watcherBonusCoin').html(data['populRewardBalance']);

            //var index = data['balanceStatus'],
            //    start = 0,
            //    limit = BonusConfig.length - 1,
            //    config, end = (config = BonusConfig[index = (index > limit ? limit : index)])['target'];
            //if (index > 0)
            //    start = BonusConfig[index - 1]['target'];
            //var rate = (data['curBalance'] - start) / (end - start);
            //if (rate > 1)
            //    rate = 1;
            //$('#bonusCurrent').css('width', rate * 100 + '%');

            var start = data['balanceFloor'],end = data['balanceUpper'],rate = (data['incomeRewardBalance']-start) /(end-start);
            $('#bonusCurrent').css('width',rate * 100 + '%');

            (this.bonusStartDom = $('#bonusStart')).html(start);
            (this.bonusEndDom = $('#bonusEnd')).html(end);
            var delta = end - data['incomeRewardBalance'],nPunishTime=data['punishTime']/60,nDelTime=(data['onlineTime']-data['punishTime']-data['onlineTimeFloor'])/60;
            if (delta < 0)
                delta = 0;
            (this.haveCoinDom = $('#haveCoin')).html(delta);
            (this.haveBonusDom = $('#haveBonus')).html('$'+(end/1225).toFixed(0));
            (this.toLiveDom=$('.toliveTime')).html(nDelTime>0? '0' :nDelTime);
            (this.punishTimeDom = $('.punishTime')).html(nPunishTime);

            if( data['incomeRewardMoney'] > 0)
                $('#term').removeClass('selected').addClass('selected');
        },

        accountTest:function(){
            if(!this.accountFlag){
                Bussiness.getData('service/exchange/v3/getBankInfo',function(data){
                    this.accountFlag = true;
                    if(1==data.code){
                        this.popAccount = $(I18N.evaluate(TEMPLATE.PopAccount)).appendTo(this.container);
                        $('#account_ok').click(this.createAccount.bind(this));
                        this.popAccount.find(':input').bind('input',this.checkValid.bind(this));
                        this.popAccount.find('.btn_close').click(function(){this.popAccount.remove();}.bind(this));
                    }else if(0==data.code){
                        var dataInfo = data['dataInfo'];
                        this.account['bankName']=dataInfo['bankName'];
                        this.account['bankAccountName']=dataInfo['bankAccountName'];
                        this.account['accountId']=dataInfo['accountId'];
                        this.account['bankAddress']=dataInfo['bankAddress'];
                        this.account['ContactPhone']=dataInfo['bankAddress'];
                        this.account['swiftCode']=dataInfo['swiftCode'];
                        this.exchangeAction();
                    }
                }.bind(this),null,isV3);
            }else{
                this.exchangeAction();
            }
        },
        checkValid:function(){
            var errorDOM = this.popAccount.find('#errorTip');
            var bank_name=  $.trim(this.popAccount.find('[name="bank_name"]').val()),
                bank_account_name=  $.trim(this.popAccount.find('[name="bank_account_name"]').val()),
                bank_account=$.trim(this.popAccount.find('[name="bank_account"]').val()),
                bank_address = $.trim(this.popAccount.find('[name="bank_address"]').val()),
                contact_phone = $.trim(this.popAccount.find('[name="contact_phone"]').val());
            if(bank_name && bank_account_name && bank_account && bank_address && contact_phone){
                $('#account_ok').removeClass('unclick');
                errorDOM.html('');
            }
        },
        createAccount:function(){
            var errorDOM = this.popAccount.find('#errorTip');
            var bank_name= this.account['bankName'] = $.trim(this.popAccount.find('[name="bank_name"]').val()),
                bank_account_name= this.account['bankAccountName']= $.trim(this.popAccount.find('[name="bank_account_name"]').val()),
                bank_account= this.account['accountId']=$.trim(this.popAccount.find('[name="bank_account"]').val()),
                bank_address = this.account['bankAddress']= $.trim(this.popAccount.find('[name="bank_address"]').val()),
                contact_phone = this.account['ContactPhone'] = $.trim(this.popAccount.find('[name="contact_phone"]').val()),
                swiftcode=this.account['swiftCode']= $.trim(this.popAccount.find('[name="swiftcode"]').val());
            if(!bank_name){
                errorDOM.html('bank_name can not be empty');
                return;
            }
            if(!bank_account_name){
                errorDOM.html('bank_account_name can not be empty');
                return;
            }
            if(!bank_account){
                errorDOM.html('bank_account can not be empty');
                return;
            }
            if(!bank_address){
                errorDOM.html('bank_address can not be empty');
                return;
            }
            if(!contact_phone){
                errorDOM.html('contact_phone can not be empty');
                return;
            }

            //this.exchangeAction();
            //var params = 'bankName='+bank_name+'&bankAccountName='+bank_account_name+'&accountId='+bank_account+'&bankAddress='+
             //   bank_address+'&ContactPhone='+contact_phone+'&swiftCode='+swiftcode;
            Bussiness.postData('service/exchange/v3/upBankInfo',{
                bankName:bank_name,
                bankAccountName:bank_account_name,
                accountId:bank_account,
                bankAddress:bank_address,
                ContactPhone:contact_phone,
                swiftCode:swiftcode
            },function(data){
                    if(data.code==0){
                        this.exchangeAction();
                    }
                }.bind(this))
        },

        'exchangeAction': function() {
            if (this.exchangeLock)
                return;
            var exchangeMaxmoney = this.account['exchangeMaxmoney'];
            if (exchangeMaxmoney < 200)
                return;
            this.popAccount && this.popAccount.remove();
            this.step1();
        },

        'step1': function() {
            var expectMoney = this.account['exchangeMaxmoney'],
                expectMoneyDOM;
            this.pop1 = $(stringFormat(I18N.evaluate(TEMPLATE.Pop1),
                withdrawConfig[this.account['accountType']][I18N.language] + ' ' + this.account['accountId'],
                expectMoney)).appendTo(this.container);

            (expectMoneyDOM = $('#expectMoney')).val(expectMoney);
            this.getMoneyDOM = $('#getMoney').bind('click', function() {
                var money = parseInt(expectMoneyDOM.val());
                if (isNaN(money))
                    return;
                money = Math.floor(money / 100) * 100
                if (money < 200 || money > expectMoney)
                    return;
                expectMoneyDOM.val(money);
                Bussiness.postData('service/exchange/v3/createExchange', {
                    'emy': money * 100
                }, this.step2.bind(this, money));
                this.getMoneyDOM.unbind('click');
            }.bind(this));
            $('#closePop').bind('click', function() {
                this.pop1.remove();
                this.exchangeLock = false;
            }.bind(this));
        },

        'step2': function(money, data) {
            if (data['code'] == 0) {
                $('#popContent').html(stringFormat(I18N.evaluate(TEMPLATE.Pop2), money));
                data = data['dataInfo'];
                this.account['totalBalance'] = data['totalBalance'];
                var expectMoney = this.account['exchangeMaxmoney'] = Math.floor(data['exchangeMaxmoney'] / 10000) * 100;
                this.exchangeCoinDom.html(data['totalBalance']);
                this.exchangeMoneyDom.html(expectMoney);
            }
        },

        'query': function() {

            this.queryType = $('[name="type"]:checked').val();
            this.queryScop = $('[name="scope"]:checked').val();
            this.params = {
                'pageSize': 10,
                'pageNo': 1
            };
            if (this.queryScop == 'range') {
                var temp = $('#startDate').val();
                if (temp)
                    this.params['startTime'] = temp;
                temp = $('#endDate').val();
                if (temp)
                    this.params['endTime'] = temp;
            }
            this.fetch();
        },

        'fetch': function(pageIndex) {
            if (pageIndex)
                this.params['pageNo'] = pageIndex;
            var sUrl="";

            function toQueryString(){
                var sQueryString="?";
                for(var index in this.params){
                    sQueryString+=index+"="+this.params[index]+'&';
                }
                sQueryString=sQueryString.substr(0,sQueryString.length-1);
                return sQueryString;
            }

            switch(this.queryType){
                case 'gift':
                    sUrl='service/exchange/v3/getGiftRecord'+toQueryString.bind(this)();
                    break;
                case 'withdraw':
                    sUrl='service/exchange/v3/getExchangeRecord'+toQueryString.bind(this)();;
                    break;
                case 'bonus':
                    sUrl='service/exchange/v3/getReward'+toQueryString.bind(this)();;
                    break;
            }

            var promise = new Promise(function() {
                Bussiness.getData(sUrl,function(data){
                    promise.resolve(data);
                }.bind(this),null,'isV3');
            }.bind(this)).then(this.renderTable.bind(this, this.queryType));

        },

        'renderTable': function(type, data) {
            if(data['dataInfo']['total']==0){
                this.giftTable.safeHide();
                this.salaryTable.safeHide();
                this.withdrawTable.safeHide();
                this.pager.html(STRING_EMPTY);
                switch (type){
                    case 'gift':
                        $('#noData').html(i18nTranslate('Exchange_No_GiftData'));
                        break;
                    case 'bonus':
                        $('#noData').html(i18nTranslate('Exchange_No_BonusData'));
                        break;
                    case 'withdraw':
                        $('#noData').html(i18nTranslate('Exchange_No_WithdrawData'));
                        break;
                }
                return ;
            }

            function drawImag(src) {
                return stringFormat(TEMPLATE.ImageTemplate, DOMAIN_CONFIG['IMAGE_DOMAIN'] + src);
            }

            var renderPager = function(data) {
                var current = data['page'],
                    pageCount = data['pageCount'];
                if(pageCount == 0)
                    return;
                var html = [];
                if (current > 1)
                    html.push('<a href="javascript:;" data-role="previous" data-i18n="Exchange_Back">{{Exchange_Back}}</a>');
                html.push(stringFormat('<span><span>{0}</span>/<span>{1}</span></span>', current, pageCount));
                if (current < pageCount)
                    html.push(' <a href="javascript:;"  data-role="next" data-i18n="Exchange_Next">{{Exchange_Next}}</a>');
                this.pager.i18nHTML(html.join(STRING_EMPTY));
            }.bind(this);

            data = data['dataInfo'];
            var list = data['list'];
            this.pager.html(STRING_EMPTY);
            switch (type) {
                case 'gift':
                    $('#noData').html('');
                    this.salaryTable.safeHide();
                    this.withdrawTable.safeHide();
                    this.giftBody.html(STRING_EMPTY);

                    $('#ext').html(data['ext']['total']);
                    this.giftBody.html($.map(list, function(item) {
                        return stringFormat(TEMPLATE.GiftRow,
                            Utility.DateTime.fulltime(new Date(item['recordDate'])),
                            drawImag(item['specialPic']),
                            item['num'],
                            item['nickName'],
                            item['balance']);
                    }).join(''));
                    this.giftTable.safeShow();
                    break;
                case 'withdraw':
                    $('#noData').html('');
                    this.giftTable.safeHide();
                    this.withdrawTable.safeHide();
                    this.salaryBody.html(STRING_EMPTY);

                    this.salaryBody.html($.map(list, function(item) {
                        return stringFormat(TEMPLATE.SalaryRow,
                            item['exchangeOrder'],
                            Utility.DateTime.fulltime(new Date(item['beginTime'])),
                            item['balanceAmount'],
                            item['money'] / 100,
                            'todo',
                            withdrawConfig[item['accountType']]?withdrawConfig[item['accountType']][I18N.language]:STRING_EMPTY,
                            item['orderId'] || STRING_EMPTY);
                    }).join(''));
                    this.salaryTable.safeShow();
                    break;
                case 'bonus':
                    $('#noData').html('');
                    this.giftTable.safeHide();
                    this.salaryTable.safeHide();
                    this.withdrawBody.html(STRING_EMPTY);

                    $('#ext2').html(data['ext']['total']);
                    this.withdrawBody.html($.map(list, function(item) {
                        var sType='';
                        switch (item.rewardType){
                            case 1:
                                sType=i18nTranslate('Exchange_Gift_Bonus');
                                break;
                            case 2:
                                sType=i18nTranslate('Exchange_Watcher_Bonus');
                                break;
                            case 3:
                                sType=i18nTranslate('Exchange_Event_Bonus');
                                break;
                        }
                        return stringFormat(TEMPLATE.WithdrawRow,
                            Utility.DateTime.fulltime(new Date(item['recordTime'])),
                            sType,
                            item['rewardBalance'],
                            item['rewardMoney']);
                    }).join(''));
                    this.withdrawTable.safeShow();
                    break;
            }
            renderPager(data);
        },

        changePage: function(evt) {
            var target = $(evt.target),
                action = target.attr('data-role'),
                pageNO = this.params['pageNo'];
            switch (action) {
                case 'next':
                    pageNO++;
                    break;
                case 'previous':
                    pageNO--
                    break;
            }
            //this.params['pageNo'] =  pageNO;
            this.fetch(pageNO);
        },

        localize:function(){
            this.exchange_data && this.renderAccountDOM(this.exchange_data);
        }
    }

    I18N.init(null, true).localize(null, Page.run.bind(Page), true)
});