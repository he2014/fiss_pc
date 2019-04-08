define(function(require) {
	var STRING_EMPTY = '',
		Utility = require(JS_UTILITY),
		Cookie = Utility['Cookie'],
		OOP = Utility['OOP'],
		Promise = Utility['Promise'],
		stringFormat = Utility['String']['stringFormat'];
	var Kit = require(useJSComponent('kit')),
		I18N = Kit.use('I18N'),
		Body = Kit.use('Body'),
		Header = Body.Header,
		Footer = Body.Footer,
		_nav = Body.nav,
		_task =Body.TASKS,
		Bussiness = Kit.use('Bussiness');
	require('js/reference/blockUI.js');
	require('css/component/dialog.css');
	require('js/reference/dialog.js');
	var Popup = require('component/popup');
	//var UserTop=require('component/userTop');
	var CONST = {
		'DISPLAY_NONE': ' style="display:none;"'
	};


	var TEMPLATE = {
		'MAIN':'<div class = content_warp>\
		<div class="newAccountBox clearfix">\
					<p class="readEnd" style="padding-top:30px"><span class="myLeft" data-i18n="MyRechange_My_Balance">{{MyRechange_My_Balance}}</span><span class="greenMoneyIco greenMoneyIcoPos"></span><em id="returnBalanceIcon"></em></p>\
				</div>\
				\
				<div class="charge_content">\
					 <span class="sorry_reSign hidden" data-i18n="Login_Out_Conts">{{Login_Out_Conts}}</span>\
				    <div id="page1" class="charge_page1" style="display:none;">\
				        <div class="choose_country"><p data-i18n="Recharge_ChooseCoutry">{{Recharge_ChooseCoutry}}</p><img id="smallImg" src="" /><em data-role="caption"></em><span id="dropDownBar"></span></div>\
				        <ul class="country_list" data-role="list"></ul>\
				        \
				    </div>\
				    <div id="page2" class="charge_page2" style="display:none;">\
			            <div class="recharge_section">\
			                <div class="select_platform">\
			                    <p data-i18n="Recharge_SelectPaymentPlatform">{{Recharge_SelectPaymentPlatform}}</p><em data-role="platformChoose"></em>\
			                    <span class="Recharge_Tips" ></span>\
			                    <ul data-role="platform" class="clearfix"></ul>\
			                </div>\
			                <div class="select_amount">\
			                    <p class="gaga" data-i18n="Recharge_SelectAmountRecharge">{{Recharge_SelectAmountRecharge}}</p><p class="gaga"><span data-role="amountChoose"></span></p>\
			                    <ul data-role="counter"></ul>\
			                </div>\
			            </div>\
			            <div class="dis_banner clearfix">\
			                    <ul class="dis_list">\
			                        <li class="border_right"><span data-i18n="Recharge_ChargeMoney">{{Recharge_ChargeMoney}}</span><em class="grn" data-role="rechareAmount"></em></li>\
			                        <li class="border_right"><span data-i18n="Recharge_ForYourSavings">{{Recharge_ForYourSavings}}</span><em class="grn" data-role="saveForYou"></em></li>\
			                        <li class="recharge_money"><span data-i18n="Recharge_BonusCoins">{{Recharge_BonusCoins}}</span><em data-role="give"></em></li>\
			                    </ul>\
			                   \
			            </div>\
			            <form id="payForm" method="post" action="">\
			            	<input type="hidden" id="balanceId" name="balanceId" value="" />\
			            	<input type="hidden" id="roomId" name="roomId" value="" />\
			            </form>\
			            <div class="confirm_banner" data-role="confirmPayment" data-stat="confirmPayment">\
			                <p data-i18n="Recharge_ConfirmOrder">{{Recharge_ConfirmOrder}}</p>\
			            </div>\
			            <div class="confirm_mes">\
			                <p class="top" data-i18n="Recharge_ChargeSafely">{{Recharge_ChargeSafely}}</p>\
			                <p class="bottom"><em>FB:</em>https://www.facebook.com/7nujoom.Customer.service</p>\
			            </div>\
			        </div>\
				</div>\
				<div class="sysmesg_box clearfix" style="display: none">\
					<div class="sysmesg_box_txt">\
						<img src="/resource/systemRes/imgNew/hall_img/sysmesg_box_cls_03.png" width="11.5" height="11.5" class="sysmesg_box_cls">\
						<p class="sysmesg_box_nomtxt">Recharge during Eid 100$ Can participate in the IPhone6 Recharge during Eid 100$ Can participate in the IPhone6 Recharge during...</p>\
						<a href="#" class="sysmesg_box_hrf" style="display:none" target="_blank" data-i18n="Index_Learn_More">{{Index_Learn_More}}</a>\
						<div class="sysmesg_triangle"></div>\
					</div>\
					<div class="sysmesg_box_img"></div>\
				</div>\
				<div data-role ="ce_nav"></div>\
				<div class="hidden" id="task_tan"></div>\
				<div class="task_con" data-role ="task"></div>\
				</div>',

		'countryTab_item': '<li class="cty_ban" data-country="{0}" data-stat="Recharge{0}" data-index="{1}"><img src="{2}" /><p class="cty_txt readEnd">{0}</p></li>',

		'page1country_item': '<li class="readStart" data-code="{0}" data-stat="Recharge_Country{0}" data-index="{1}"><a class="country_img" href="javascript:;" ><img src="{2}" /></a><p>{0}</p></li>',

		'page2channel_item': '<li class="readStart" data-index="{0}" data-rechargeType="{1}" data-sonType="{2}">\
	                            <div class="plat_sec">\
	                                <div class="yello_border"><div class="chs_div"><img src="/resource/static/image/recharge/platform_confirm.png" class="chose_platform"></div></div>\
	                                <img src="{3}" class="platform" data-stat="RechargePlatform" />\
	                            </div>\
	                        </li>',
		'page2money_item': '<li class="readStart" data-bid="{0}" data-index="{1}">\
	                            <div class="yel_border">\
	                                <div class="recharge_confirm"></div>\
	                            </div>\
	                            <div class="select_sec" data-stat="Recharge{2}{3}">\
	                                <div></div>\
	                                <p class="top_amount">{2}{3}</p>\
	                                <p class="bottom_amount"><span>{4}</span></p>\
	                            </div>\
	                            <p class="free_chag"{5}>+<em>{6}</em></p>\
	                        </li>',
		'pop': '<div class="popup">\
					<div class="wrap clearfix" style="top:100px;">\
						<p class="recharge_icon"></p>\
						<p class="recharge_hit" data-i18n="Pop_RechargeNotCloseWindow">{{Pop_RechargeNotCloseWindow}}</p>\
						<div class="recharge_info">\
							<p class="alignStart smsInfo" data-role="content"></p>\
							<p class="alignStart noticeInfo" data-i18n="Pop_RechargeNotice">{{Pop_RechargeNotice}}</p>\
						</div>\
						<div class="recharge_button" data-role="button">\
							<a class="completed readStart" href="javascript:;" data-role="ok" data-i18n="Pop_RechargeBtnCompleted">{{Pop_RechargeBtnCompleted}}</a>\
							<a class="close readEnd" href="javascript:;" data-role="close" data-i18n="Pop_RechargeBtnClose">{{Pop_RechargeBtnClose}}</a>\
						</div>\
					</div>\
					<div class="popBg"></div>\
				</div>'
	};

	var Page =window.Page= {
		'run': function() {
			this.load();
			this.render();
		//	UserTop.Login_Btn();
			this.compose();
			this.bind();
			this.start();
		},

		'load': function() {
			this.cache = {
					'channel': {},
					'money': {}
				};
		},

		'render': function() {
			this.container = $('#container');
			this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
			this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
			this.container.find('[data-role="task"]').i18nHTML(_task.html());
		},

		'compose': function() {
//			I18N.init({
//				'onLocalize': UserTop.Login_Btn.bind(this)
//			});
 			
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
			//UserTop.init({'container':this.container,'cur':'menu_myWealth'});
		},

		'bind': function() {
		},

		'start': function() {
			this.identifyFlow()
//			this.promise = new Promise(this.identify.bind(this)) //move method identity to utility
//				.then(this.identified.bind(this));
		},
		 'message':function(){
        	Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
        			if(data.code==0){
        				 this.messages_length = data['dataInfo']['list'].length;
        			}
                  this.promise.resolve();
			}.bind(this),null,true);
        },
		localize: function() {
			if (top_util) {
				top_util.reset_popup_message();
			}
		},

		'identifyFlow': function() {
			this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)) //move method identity to utility
				.then(this.identified.bind(this));
		},

		'identify': function() {
			this.identity = null;
			var user = Cookie.get(Cookie.key['user_info']);
			if (user)
				return this.identity = JSON.parse(user);
			// else {
			// 	var userName = Cookie.get(Cookie.key['login_name']);
			// 	if (!userName)
			// 		return 'anonymous';
			// 	Bussiness.postData('user_init_user_info.fly', {
			// 		'loginName': userName
			// 	}, function(data) {
			// 		if (data && data.code == 0)
			// 			this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
			// 		else
			// 			this.promise.resolve();
			// 	}.bind(this), function() {
					this.promise.resolve();
			// 	}.bind(this));
			// }
		},

		'identified': function() {
			Header.identified(this.identity);
			//UserTop.identifyFlow();
			_nav.identified(this.identity,this.messages_length);
			_task.identified(this.identity);
			if(this.identity==null){
				$("span.sorry_reSign").removeClass("hidden")
			}
			if (this.identity) {
				setTimeout(function(){
					this.identify();
					$('#returnBalanceIcon').html(this.identity['returnBalance'] +this.identity['balance'] );
				}.bind(this),500);
				var promise = new Promise(function() {
					Bussiness.postData('user_getLastPayForBalanceDetail.fly', null, function(data) {
						this.rencent = data;
						promise.resolve(data);
					}.bind(this), function(data) {
						this.rencent = null;
						promise.resolve(data);
					}.bind(this));
				}.bind(this)).then(function() {
						Bussiness.getData('data/static/v4/?recharge',function(data){
							var countrys = data.dataInfo.recharge.d;
							var countrs = [];
							var changes = [];
							countrys.map(function(val,key){
								countrs[key] ={
									country:val.cc,
									countryId:val.cid,
									pic:val.cp
								};
								changes[key] = {val:val.cts,cc:val.cc};
							});
							this.cache['changes'] = changes;
							this.cache['country'] = countrs;
							promise.resolve();
						}.bind(this),null,true);
						//Bussiness.getJSON('recharge/country.json', function(data) {
						//	console.log(data)
						//	this.cache['country'] = data;
						//	promise.resolve();
						//}.bind(this));

					}.bind(this)).then(this.flow.bind(this));
			}
			
			//else
			//
				//UserTop.Login_Tips_Before();
			//	login_util.show_login_div();
		},

		'flow': function() {
			if (this.recent || true) {
				this.goPage1();
			} else {

			}
		},

		'goPage1': function() {
			var page1 = this.page1 = $('#page1'),
				caption = page1.find('[data-role="caption"]'),
				list = page1.find('[data-role="list"]'),
				smallImg=page1.find('#smallImg'),
				countrys = this.cache['country'],
				template = TEMPLATE.page1country_item,
				current = null,
				selected = null,
				imgSrc='',
				CLASS = 'active',
				confirm = page1.find('[data-role="confirm"]');
			list.html(countrys.map(function(item, index) {
				return stringFormat(template, item['country'], index, DOMAIN_CONFIG['IMAGE_DOMAIN'] + item['pic']);
			}));
			var nextPage = function() {
				this.goPage2();
			}.bind(this);
			var select = function(code, index) {
				if (code == current)
					return;
				if (selected)
					selected.removeClass(CLASS);
				current = code;
				selected = list.find('[data-code="' + current + '"]').addClass(CLASS);
				imgSrc=selected.find('img').attr('src');
				smallImg.attr('src',imgSrc);
				caption.html(code);
				this.country = code;
				this.countryIndex = index;
			}.bind(this);

			select(countrys[0]['country'], 0);
			window['selectFn']=select;
			this.page1.show();
			nextPage();
		},

		'goPage2': function() {
			var page2 = this.page2 = $('#page2'),
				page1= this.page1 = $('#page1'),s
				dropDown=this.page1.find("#dropDownBar"),
				platform = page2.find('[data-role="platform"]'),
				platformChoose= page2.find('[data-role="platformChoose"]'),
				counter = page2.find('[data-role="counter"]'),
				rechareAmount = page2.find('[data-role="rechareAmount"]'),
				amountChoose=page2.find('[data-role="amountChoose"]'),
				saveForYou = page2.find('[data-role="saveForYou"]'),
				give = page2.find('[data-role="give"]'),
				sign = page2.find('[data-role="sign"]'),
				fee = page2.find('[data-role="fee"]'),
				total = page2.find('[data-role="total"]'),
				list = page1.find('[data-role="list"]'),
				confirmPayment = page2.find('[data-role="confirmPayment"]');
			var CLASS = 'active';

			var blockUI = function() {
				$.blockUI({
					message: "<img style='width:23px;height:23px' src='" + DOMAIN_CONFIG['SYSRES_DOMAIN'] + "img/loading.gif'/>",
					css: {
						left: ($(window).width() - 30) / 2 + 'px',
						top: ($(window).height()) / 2 + 'px'
					}
				});
			};

			var page2Bind = function() {
				platform.on('click', 'li', function(evt) {
					var element = $(evt.currentTarget);
					selectPlatform(parseInt(element.data('index')));
					switch (this.country){
						case 'AE':
							switch (this.rechargetype){
								case 'Tpay':
									$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
									break;
								default:
									$('.Recharge_Tips').html("");
							}
							break;
						case 'EG':
							switch (this.rechargetype){
								case 'Tpay':
									$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
									break;
								default:
									$('.Recharge_Tips').html("");
							}
							break;
					}

				}.bind(this));

				counter.on('click', 'li', function(evt) {
					var element = $(evt.currentTarget);
					selectMoney(parseInt(element.data('index')));
				}.bind(this));

				confirmPayment.on('click', function() {
					var rechargetype = this.rechargetype.toLowerCase();
					if (rechargetype == 'fortumo' || rechargetype == 'tpay' || rechargetype == 'paymentwall') {
						Bussiness.postData('user_newRechrgeCreate.fly', {
							'balanceId': this.money['balance_id'],
							'roomId': this.roomId || 0
						}, function(data) {
							if (data && data.code == 200) {
								//$.unblockUI();
								console.log(data.url);
								$.iframe(data.url, 600, 487);
								//fbq('track', 'AddPaymentInfo');//订单生成
								/*var btn = $("#tpayBTN").attr('href', data.url);
								 btn.trigger('click');*/
							} else {
								window['payFail'](data.code);
							}
						}.bind(this), function(data) {

						}.bind(this));
						//blockUI();
					} else if (rechargetype == 'paybyme') {
						Bussiness.postData('user_newRechrgeCreate.fly', {
							'balanceId': this.money['balance_id'],
							'roomId': this.roomId || 0
						}, function(data) {
								console.log(data.url);
							if (!data && (data.code.toLowerCase() != 'ok'))
								return;
							fbq('track', 'AddPaymentInfo');//订单生成
							Popup.show({
								'template': TEMPLATE.pop,
								'content': stringFormat(i18nTranslate('Pop_RechargeSMS'), this.money['balance'], data['rechargeId'], data['shortCode']),
								'isBind': true,
								'okHandler': function() {
									Bussiness.postData('user_newRechargeSubmit.fly', {
										tradeNo:  data['rechargeNo']
									}, function(data) {
										//data = {"amount":0.4,"balance":150,"code":"OK","currency":"BHD","payid":"abc124","returnBalance":0,"trad_no":"deb30466-9e30-4337-9f79-fcf7471cd3b0"};
										if (!data && (data.code.toLowerCase() != 'ok'))
										{
											location.href = '/user/rechargeCallback.shtml?code=1';
											return;
										}
										fbq('track', 'AddPaymentInfo');//订单成功
										location.href = '/user/rechargeCallback.shtml?code=0&trad_no='+ data['trad_no'] + '&amount=' + data['amount'] + '&balance=' + data['balance'] + '&returnBalance=' + data['returnBalance']+'&currency='+data['currency'];

									}.bind(this));
								},
								'closeHanlder': null //todo : close
							});
						}.bind(this), function(data) {

						}.bind(this));
					} else {
						var form = $('#payForm');
						form.attr('action', DOMAIN_CONFIG['SITE_DOMAIN'] + 'user_newRechrgeCreate.fly');
						$('#balanceId').val(this.money['balance_id']);
						$('#roomId').val(this.roomId || 0);
						form.submit();
						fbq('track', 'AddPaymentInfo');//订单生成
						blockUI();
					}
				}.bind(this));

				list.on('click', 'li', function(evt) {
					var element = $(evt.currentTarget),
						code = element.data('code');
					window['selectFn'](code, parseInt(element.data('index')));
					list.slideUp();
					flow();
				}.bind(this));

				dropDown.click(function(){
					list.slideDown();
				});

			}.bind(this);

			var register = function(host) {
				window['sysResource'] = DOMAIN_CONFIG['SYSRES_DOMAIN'];

				var tradeNO0 = null;

				function opentip() {
					$.iframe(DOMAIN_CONFIG['SITE_DOMAIN'] + 'user/payTip.shtml?d=' + (new Date()).getTime(), 495, 218);
				}

				function click_remove() {
					window.parent.$.iframe('close');
				}

				function submitOrder() {
					blockUI();
					Bussiness.postData('user_newRechargeSubmit.fly', {
						tradeNo: tradeNo
					}, function(data) {
						if (data.ok)
							location.href = 'recharge.shtml';
						else
							payFail(data.code)
						$.unblockUI();
					}.bind(this), function() {
						$.unblockUI();
					}.bind(this));
				}

				host['setTradeNo'] = function(trade) {
					$.unblockUI();
					tradeNo = trade;
					opentip();
				};

				host['setPayStatus'] = function(isFinish) {
					click_remove();
					if (!isFinish) {
						isFinish = 1;
					}
					submitOrder(isFinish);
				};

				host['payFail'] = function(error) {
					$.unblockUI();
					if (error == '102') {
						showLoginBox();
					} else {
						//$.tip_simple_alert('test');
					}
				};
			}.bind(this);

			var selectPlatform = function(index) {
				if (index == this.platformSelected)
					return;
				if (this.platformSelected > -1)
					platform.find('[data-index="' + this.platformSelected + '"]').removeClass(CLASS);
				this.platformSelected = index;
				var temp = platform.find('[data-index="' + this.platformSelected + '"]').addClass(CLASS);
				this.rechargetype = temp.data('rechargetype');
				this.sontype = temp.data('sontype');
				platformChoose.html(this.sontype);

				switch (this.country){
					case 'AE':
						switch (this.rechargetype){
							case 'Tpay':
								$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
								break;
							default:
								$('.Recharge_Tips').html("");
						}
						break;
					case 'EG':
						switch (this.rechargetype){
							case 'Tpay':
								$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
								break;
							default:
								$('.Recharge_Tips').html("");
						}
						break;
				}

				showMoney();
			}.bind(this);

			var showMoney = function() {
				var promise = new Promise(
					function() {
						var money = this.cache['money'][this.country + '-' + this.rechargetype + '-' + this.sontype];
						if (money) {
							promise.resolve(money);
						}else{
							var moneys =this.cache['changes'];
							for(var i in moneys){
								if(this.country == moneys[i].cc){
									var list_m = moneys[i].val;
									break;
								};

							};
							for(var k in list_m){
								if(this.rechargetype==list_m[k].tp && this.sontype==list_m[k].ts){
									var mons = { s:list_m[k].ti,
										sp:list_m[k].ts,
										provider:list_m[k].tp
									};
									break;
								};
							};
							var monkey = {},mondata =mons.s ;
							for(var j in mondata){
								monkey[mondata[j]['n']]=[];
								monkey[mondata[j]['n']][0] ={
									balance:mondata[j].b,
									balance_id: mondata[j].id,
									currency:mondata[j].c,
									money:mondata[j].m/100,
									provider:mons.provider,
									return_balance:mondata[j].rb,
									sp:mons.sp
								}
							}
							this.cache['money'][this.country + '-' + this.rechargetype + '-' + this.sontype] = monkey;
							promise.resolve(monkey);
							//Bussiness.getJSON('recharge/' + this.country + '/details/' + this.rechargetype + '_' + this.sontype + '.json', function(data) {
							//	console.log(data)
							//	this.cache['money'][this.country + '-' + this.rechargetype + '-' + this.sontype] = data;
							//	promise.resolve(data);
							//}.bind(this));
						}

					}.bind(this)).then(function(data) {
						var html = [],
							index = 0,
							temp,
							persist = this.moneyPersist = [],
							template = TEMPLATE['page2money_item'];
						for (var key in data) {
							persist.push(temp = data[key][0]);
							html.push(stringFormat(template, temp['balance_id'], index++,
								temp['currency'] == 'USD' ? '$' : temp['currency'], temp['money'],
								temp['balance'], (temp = temp['return_balance']) ? STRING_EMPTY : CONST.DISPLAY_NONE, temp));
						}
						counter.html(html.join(''));
						this.moneySelected = -1;
						selectMoney(0);
					}.bind(this));
			}.bind(this);

			var selectMoney = function(index) {
				if (index == this.moneySelected)
					return;
				if (this.moneySelected > -1)
					counter.find('[data-index="' + this.moneySelected + '"]').removeClass(CLASS);
				this.moneySelected = index;
				var temp = counter.find('[data-index="' + this.moneySelected + '"]').addClass(CLASS);
				temp = this.money = this.moneyPersist[index];
				var signal = temp['currency'];
				if (signal == 'USD') signal = '$';
				rechareAmount.html(signal + temp['money']);
				saveForYou.html(0);
				give.html(temp['return_balance'] > 0 ? '+' + temp['return_balance'] : 0);
				sign.html(signal);
				fee.html(temp['money']);
				total.html(temp['balance'] + temp['return_balance']);

				//sign.html(signal);
				//fee.html(temp['money']);
				//total.html(temp['balance'] + temp['return_balance']);

				amountChoose.html('<em>'+signal+'</em>'+'<em>'+temp['money']+'</em> '+' <em class="total_bottom"> ('+(temp['balance'] + temp['return_balance'])+'</em><em>)</em>');
			}.bind(this);

			var flow = function() {
				var promise = new Promise(
					function() {
						var channel = this.cache['channel'][this.country];
						if (channel) {
							promise.resolve(channel);
						}else{
							var chans = this.cache['changes'];
							//console.log(chans)
							for(var i in chans){
								if(this.country == chans[i].cc){
									var oList_s = chans[i].val;
									break;
								};
							};
							this.cache['channel'][this.country] = oList_s;
							promise.resolve(oList_s);
							//Bussiness.getJSON('recharge/' + this.country + '/' + this.country + '.json', function(data) {
							//	//console.log(data)
							//	this.cache['channel'][this.country] = data;
							//	promise.resolve(data);
							//}.bind(this));
						}

					}.bind(this))
					.then(function(channels) {
						this.platformSelected = -1;
						var gindex = 0,
							template = TEMPLATE['page2channel_item'],
							showChannel = function(key, data) {
								//console.log(key)
								return stringFormat(template, gindex++, key, data['ts'], DOMAIN_CONFIG['IMAGE_DOMAIN'] + data['pic']);
							};
							//showChannel = function(key, data) {
							//	return data.map(function(item, index) {
							//		return stringFormat(template, gindex++, key, item['sp'], DOMAIN_CONFIG['IMAGE_DOMAIN'] + item['pic']);
							//	});
							//};
						var html = [];
						for (var key in channels)
							//html = html.concat(showChannel(key, channels[key]));
						     html = html.concat(showChannel(channels[key].tp, channels[key]));

						platform.html(html.join(''));
						selectPlatform(0);


					}.bind(this));
			}.bind(this);

			page2Bind();
			page2.show();
			register(window);
			flow();
		}
	};

	I18N.init(null, true).localize(null, Page.run.bind(Page));
	fbq('track', 'InitiateCheckout');
});