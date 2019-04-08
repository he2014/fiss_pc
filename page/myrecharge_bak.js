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
		Bussiness = Kit.use('Bussiness');
	require('js/reference/blockUI.js');
	require('css/component/dialog.css');
	require('js/reference/dialog.js');
	var Popup = require('component/popup');
	var UserTop=require('component/userTop');
	var CONST = {
		'DISPLAY_NONE': ' style="display:none;"'
	};

	var TEMPLATE = {
		'MAIN':'<div class="newAccountBox ">\
					<p ><span class="myLeft" data-i18n="MyRechange_My_Balance">{{MyRechange_My_Balance}}</span><span class="greenMoneyIco greenMoneyIcoPos"></span><em id="returnBalanceIcon"></em></p>\
					<div class="newAccountTab ">\
						<a href="/mystorerecord.shtml" class="btnDef" data-i18n="PersonCenter_StoreRecord">{{PersonCenter_StoreRecord}}</a>\
						<a href="/myrechargerecord.shtml" class="btnDef" data-i18n="PersonCenter_RechargeRecord">{{PersonCenter_RechargeRecord}}</a>\
						<a href="/myrecharge.shtml" class="btnDef btnDefCur" data-i18n="PersonCenter_Recharge">{{PersonCenter_Recharge}}</a>\
					</div>\
				</div>\
				<div id="status" class="charge_bcg2 clearfix">\
				    <p data-i18n="RechargeAccount">{{RechargeAccount}}<em data-role="accountCaption"></em></p>\
				    <div class="coun_list" data-role="countryZone" style="display:none;">\
				        <div class="country_banner readEnd clearfix" data-role="countryCaption" data-stat="countryCaption"></div>\
				        <div class="coy_list" data-role="countryPanel" style="display:none;">\
				            <div class="trg"></div>\
				            <ul data-role="countryTab" class="cty_list"></ul>\
				        </div>\
				    </div>\
				</div>\
				<div class="charge_content">\
				    <div id="page1" class="charge_page1" style="display:none;">\
				        <div class="choose_country"><p data-i18n="Recharge_ChooseCoutry">{{Recharge_ChooseCoutry}}</p><em data-role="caption"></em></div>\
				        <ul class="country_list" data-role="list"></ul>\
				        <div class="confirm_section">\
				            <div class="confirm_left clearfix" data-role="other" style="display:none;" data-i18n="Recharge_Others"><p>{{Recharge_Others}}</p></div>\
				            <div class="confirm_right clearfix" data-role="confirm" data-stat="Recharge_Confirm"><p data-i18n="Recharge_Confirm">{{Recharge_Confirm}}</p></div>\
				        </div>\
				    </div>\
				    <div id="page2" class="charge_page2" style="display:none;">\
			            <div class="recharge_section">\
			                <div class="select_platform">\
			                    <p data-i18n="Recharge_SelectPaymentPlatform">{{Recharge_SelectPaymentPlatform}}</p>\
			                    <span class="Recharge_Tips" ></span>\
			                    <ul data-role="platform" class="clearfix"></ul>\
			                </div>\
			                <div class="select_amount">\
			                    <p data-i18n="Recharge_SelectAmountRecharge">{{Recharge_SelectAmountRecharge}}</p>\
			                    <ul data-role="counter"></ul>\
			                </div>\
			            </div>\
			            <div class="dis_banner clearfix">\
			                    <ul class="dis_list">\
			                        <li class="border_right"><span data-i18n="Recharge_ChargeMoney">{{Recharge_ChargeMoney}}</span><em class="grn" data-role="rechareAmount"></em></li>\
			                        <li class="border_right"><span data-i18n="Recharge_ForYourSavings">{{Recharge_ForYourSavings}}</span><em class="grn" data-role="saveForYou"></em></li>\
			                        <li class="recharge_money"><span data-i18n="Recharge_BonusCoins">{{Recharge_BonusCoins}}</span><em data-role="give"></em></li>\
			                    </ul>\
			                    <div class="yel_banner">\
			                        <p class="total_title"><span data-i18n="Recharge_NeedToPay">{{Recharge_NeedToPay}}</span><span data-i18n="Recharge_GainedCoins">{{Recharge_GainedCoins}}</span></p>\
			                        <p class="right">\
										<b data-role="sign"></b><em data-role="fee"></em>\
										<span class="total_bottom" data-role="total"></span>\
									</p>\
			                    </div>\
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
			                <p class="bottom"><em>FB:</em>https://www.facebook.com/7nujoom.Customer.service/</p>\
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

	var Page = {
		'run': function() {
			alert(1111111);
			this.load();
			this.render();
			this.compose();
			this.bind();
			this.start();
		},

		'load': function() {

		},

		'render': function() {
			this.container = $('#container');
			this.container.i18nHTML(Header.html() + UserTop.html() + TEMPLATE.MAIN + Footer.html());
			this.countryZone = this.container.find('[data-role="countryZone"]');
			this.countryCaption = this.container.find('[data-role="countryCaption"]');
			this.countryPanel = this.container.find('[data-role="countryPanel"]');
			this.countryTab = this.container.find('[data-role="countryTab"]');
			//this.chargePage2=this.container.find('[class="charge_page2"]');
		},

		'compose': function() {
			I18N.init({
				'onLocalize': this.localize.bind(this)
			});
			login_util.setCallback(this.identifyFlow.bind(this));
			Header.init({
				'container': this.container
			});
			UserTop.init({'container':this.container,'cur':'menu_myWealth'});
		},

		'bind': function() {
			this.countryCaption.on('click', function() {
				this.countryPanel.toggle();
			}.bind(this));
			//this.chargePage2.on('click', function() {
			//	this.countryPanel.css('display','none');
			//}.bind(this));
		},

		'start': function() {
			this.promise = new Promise(this.identify.bind(this)) //move method identity to utility
				.then(this.identified.bind(this));
		},

		localize: function() {
			if (top_util) {
				top_util.reset_popup_message();
			}
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
			if (this.identity) {
				$('#returnBalanceIcon').html(this.identity['returnBalance'] +this.identity['balance'] );
				this.cache = {
					'channel': {},
					'money': {}
				};
				var promise = new Promise(function() {
					Bussiness.postData('user_getLastPayForBalanceDetail.fly', null, function(data) {
						this.rencent = data;
						promise.resolve(data);
					}.bind(this), function(data) {
						this.rencent = null;
						promise.resolve(data);
					}.bind(this));
				}.bind(this)).then(function() {
						Bussiness.getJSON('recharge/country.json', function(data) {
							this.cache['country'] = data;
							promise.resolve();
						}.bind(this));
					}.bind(this)).then(this.flow.bind(this));
			} else
				login_util.show_login_div();
		},

		'flow': function() {
			var template = TEMPLATE['countryTab_item']
			this.countryTab.html(
				this.cache['country'].map(function(item, index) {
					return stringFormat(template, item['country'], index, DOMAIN_CONFIG['IMAGE_DOMAIN'] + item['pic']);
				}).join(''));
			if (this.recent || true) {
				this.goPage1();
			} else {

			}
		},

		'goPage1': function() {
			var page1 = this.page1 = $('#page1'),
				caption = page1.find('[data-role="caption"]'),
				list = page1.find('[data-role="list"]'),
				countrys = this.cache['country'],
				template = TEMPLATE.page1country_item,
				current = null,
				selected = null,
				CLASS = 'active',
			/*other = page1.find('[data-role="other"]'),*/
				confirm = page1.find('[data-role="confirm"]');
			list.html(countrys.map(function(item, index) {
				return stringFormat(template, item['country'], index, DOMAIN_CONFIG['IMAGE_DOMAIN'] + item['pic']);
			}));
			var nextPage = function() {
				this.page1.hide();
				this.goPage2();
				this.countryCaption.html(
					/*this.country == 'ALL' ? '<p>ALL</p>' :*/
					stringFormat('<img src="{0}"><p>{1}</p>',
						DOMAIN_CONFIG['IMAGE_DOMAIN'] + this.cache['country'][this.countryIndex]['pic'],
						this.country));
				this.countryZone.show();
			}.bind(this);
			var select = function(code, index) {
				if (code == current)
					return;
				if (selected)
					selected.removeClass(CLASS);
				current = code;
				selected = list.find('[data-code="' + current + '"]').addClass(CLASS);
				caption.html(code);
				this.country = code;
				this.countryIndex = index;
			}.bind(this);
			select(countrys[0]['country'], 0);
			list.on('click', 'li', function(evt) {
				var element = $(evt.currentTarget),
					code = element.data('code');
				select(code, parseInt(element.data('index')));
			}.bind(this));
			/*other.on('click', function() {
			 this.country = 'ALL';
			 nextPage();
			 }.bind(this));*/
			confirm.on('click', function() {
				switch (this.country){
					case 'AE':
					case 'EG':
						$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
						break;
					default:
						$('.Recharge_Tips').html('');
				}
				nextPage();
			}.bind(this));
			this.page1.show();
		},

		'goPage2': function() {
			var page2 = this.page2 = $('#page2'),
				platform = page2.find('[data-role="platform"]'),
				counter = page2.find('[data-role="counter"]'),
				rechareAmount = page2.find('[data-role="rechareAmount"]'),
				saveForYou = page2.find('[data-role="saveForYou"]'),
				give = page2.find('[data-role="give"]'),
				sign = page2.find('[data-role="sign"]'),
				fee = page2.find('[data-role="fee"]'),
				total = page2.find('[data-role="total"]'),
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
					if (rechargetype == 'tpay' || rechargetype == 'fortumo' || rechargetype == 'paymentwall') {
						Bussiness.postData('user_newRechrgeCreate.fly', {
							'balanceId': this.money['balance_id'],
							'roomId': this.roomId || 0
						}, function(data) {
							if (data && data.code == 200) {
								//$.unblockUI();
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
				this.countryPanel.on('click', 'li', function(evt) {
					var element = $(evt.currentTarget);
					this.country = element.data('country');
					this.countryIndex = parseInt(element.data('index'));

					switch (this.country){
						case 'AE':
						case 'EG':
							$('.Recharge_Tips').attr('data-i18n','Recharge_SelectPaymentPlatform_Tips').html(i18nTranslate('Recharge_SelectPaymentPlatform_Tips'))
							break;
						default:
							$('.Recharge_Tips').html('');
					}

					this.countryCaption.html(
						this.country == 'ALL' ? '<p>ALL</p>' :
							stringFormat('<img src="{0}"><p>{1}</p>',
								DOMAIN_CONFIG['IMAGE_DOMAIN'] + this.cache['country'][this.countryIndex]['pic'],
								this.country));
					this.countryPanel.hide();
					flow();
					window.scrollTo(0,150);
				}.bind(this));
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
				showMoney();
			}.bind(this);

			var showMoney = function() {
				var promise = new Promise(
					function() {
						var money = this.cache['money'][this.country + '-' + this.rechargetype + '-' + this.sontype];
						if (money)
							promise.resolve(money);
						else
							Bussiness.getJSON('recharge/' + this.country + '/details/' + this.rechargetype + '_' + this.sontype + '.json', function(data) {
								this.cache['money'][this.country + '-' + this.rechargetype + '-' + this.sontype] = data;
								promise.resolve(data);
							}.bind(this));
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
			}.bind(this);

			var flow = function() {
				var promise = new Promise(
					function() {
						var channel = this.cache['channel'][this.country];
						if (channel)
							promise.resolve(channel);
						else
							Bussiness.getJSON('recharge/' + this.country + '/' + this.country + '.json', function(data) {
								this.cache['channel'][this.country] = data;
								promise.resolve(data);
							}.bind(this));
					}.bind(this))
					.then(function(channels) {
						this.platformSelected = -1;
						var gindex = 0,
							template = TEMPLATE['page2channel_item'],
							showChannel = function(key, data) {
								return data.map(function(item, index) {
									return stringFormat(template, gindex++, key, item['sp'], DOMAIN_CONFIG['IMAGE_DOMAIN'] + item['pic']);
								});
							};
						var html = [];
						for (var key in channels)
							html = html.concat(showChannel(key, channels[key]));
						platform.html(html.join(''));
						selectPlatform(0);
						page2.show();
						page2Bind();
						register(window);
					}.bind(this));
			}.bind(this);
			flow();
		}
	};

	I18N.init(null, true).localize(null, Page.run.bind(Page));
	fbq('track', 'InitiateCheckout');
});