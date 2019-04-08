define(function(require) {
	var STRING_EMPTY = '',
		DISPLAY_NONE = ' style="display:none;"',
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
		Trigger = Kit.use('Trigger'),
		Bussiness = Kit.use('Bussiness');
	var TEMPLATE = {
		'MAIN': '<div id="stage" class="top">\
					<div class="home" style="width:{0};">\
						<div class="view">\
							<a class="btn_gift" href="javascript:;" data-command="gift"><span>صندوق الهدايا</span></a>\
							<a class="btn_medal" href="javascript:;" data-command="medal"><span>وسام تسجيل الوصول </span></a>\
							<a class="btn_rank" href="javascript:;" data-command="rank"><span>قائمة النجوم الأسبوعية </span></a>\
							<a class="btn_video" href="javascript:;" data-command="video"><span>تهاني المضيفين</span></a>\
							<a class="btn_lottery" href="javascript:;" data-command="lottery"><span>السحب</span></a>\
						</div>\
					</div>\
				</div>\
				<a id="gohome" class="back_btn" style="display:none;">رجوع</a>',

		'POP': '<div class="pop" style="display:none;">\
					<div class="wrap clearfix">\
						<h2 data-role="caption">التنبيهات</h2>\
						<div class="content" data-role="content"></div>\
						<a href="javascript:;" data-role="ok">تأكيد</a>\
					</div>\
					<div class="bg"></div>\
				</div>',

		'VIEW': '<div class="{0}" style="width:{1};left:{2};top:0;display:none;">\
					<div class="view" data-role="content"></div>\
				</div>',

		'LOTTERY': '<div class="lottery_main">\
						<h2 class="title_lottery"></h2>\
						<div class="lottery_pan">\
							<img class="active pan" src="/resource/static/image/anniversary/pan.png" data-role="pan" />\
							<img class="arrow" src="/resource/static/image/anniversary/arrow.png" data-role="button" />\
						</div>\
						<p class="time">عدد السحوبات المتبقية :<span data-role="counter"></span></p>\
						<div class="rule">\
							<h2>شروط السحب</h2>\
							<h3>طريقة الحصول على السحب لأكثر من مرة :</h3>\
                            <p>سجل دخولك يومياً وأحصل علي فرصة للمشاركة في السحب اليومي ( تستخدم فرصة السحب لنفس اليوم وإلا ستلغي تلقائياً ) <br />\
			                <br> \
                            في الإحتفالية السنوية، يجب عليك الانتهاء من المهام اليومية كي تشارك بسحب على الجوائز ( يمكن إبقاء فرص السحب حتي نهاية النشاط ) <br />\
                            <br> \
                            يمكنك ايضاً الحصول على فرص جديدة للسحب عن طريق عجلة السحب ( يمكن إبقاء فرص السحب حتي نهاية النشاط ) \
                            </p>\
							<h3>جوائز السحب :</h3>\
							<p>هدايا ، عملات ، زهور  . </p>\
						</div>\
						<div class="notice" data-role="marquee"></div>\
					</div>',

		'GIFT': '<div class="gift_main clearfix">\
						<h2 class="title_gift"></h2>\
						<div class="ticket">\
							<h3>قواعد شحن الحصول على الهدايا</h3>\
							<p>في الإحتفالات السنوية ، إذا شحنت <span class="gold">500</span> عملة ، ستحصل علي<br /><span class="gold">10</span>من بطاقات التميز مجاناً (يمكنك جمع الهدايا حتى انتهاء النشاط )</p>\
							<img class="ticket_img" src="/resource/static/image/anniversary/ticket.png" alt="ticket" />\
							<a class="btn_ticket" href="javascript:;"><img src="/resource/static/image/anniversary/btn_ticket.png" alt="btn_ticket" /></a>\
						</div>\
						<div class="box">\
							<h3>قواعد استلام الهدايا للمستويات المختلفة</h3>\
							<p>في الإحتفالية السنوية : لكل مستوي هدايا مختلفة، فكلما كان المستوى أعلى كلما كانت الهدايا أثرى !</p>\
							<ul class="box_list clearfix">\
							</ul>\
							<a class="btn_box" href="javascript:;">هدايا المستوى(0)</a>\
						</div>\
						<img class="gift_box" src="/resource/static/image/anniversary/gift_box.png" alt="gift_box" />\
					</div>',

		'MEDAL': '<div class="medal_main clearfix">\
					<h2 class="medal_title"></h2>\
					<img src="/resource/static/image/anniversary/medal_pop.png" width="171" height="255" class="medal_pop">\
					<div class="medal_content">\
					<div class="medal_lft clearfix">\
					<p class="medal_lft1">قواعد النشاط</p>\
					<p class="medal_lft2">من بداية النشاط أي مستخدم يقوم بتسجيل الوصول لمدة 15 يوم بشكل متواصل سيحصل على وسام "الإحتفالية السنوية" الموضح يمين الصفحة والذي ستتمكن من تجميعه علي شكل 3 أجزاء منفصلة من خلال تسجيل الوصول.</p>\
					<p class="medal_lft3"> فترة الصلاحية لمدة :30 يوم</p>\
					<img id="sign" src="/resource/static/image/anniversary/medal_btn.png" width="247" height="67" class="medal_btn">\
					</div>\
					<div class="anniv_rgt"></div>\
					</div>\
					<div class="anniv_bottom"></div>\
					</div>',
		'RANK': '<h2 class="title_rank"></h2>\
                    <div class="rank_main clearfix">\
                    	<ul class="btn_date_list">\
                    	</ul>\
                    	<div class="rank_left">\
                    		<div class="rank_list">\
                    			<div class="user_rank">\
                    				<ul class="user_list">\
                    				</ul>\
									<ul class="host_list">\
									</ul>\
                    			</div>\
                    			<div class="clearfix">\
				                    <div class="rank_rule_left">\
										<img src="/resource/static/image/anniversary/rule_left.png" alt="rule" />\
				                    </div>\
				                    <div class="rank_rule_right">\
				                    	<img src="/resource/static/image/anniversary/rule_right.png" alt="rule" />\
				                    </div>\
								</div>\
                    		</div>\
                    	</div>\
                    	<div class="rank_right">\
                    		<p class="rank_time"><span>الوقت المتبقي من الجولة : </span><span class="time_num"></span></p>\
                    		<dl>\
			                    <dt>طريقة الحصول على بطاقات التميز</dt>\
			                  	<dd>بطاقة التميز هي هدية جديدة  تم طرحها بالأستديوهات خلال الأحتفال ،وإذا شحنت 500عملة ستحصل على 10 بطاقات مجانية .</dd>\
			                    <dt>جوائز المضيفين</dt>\
			                    <dd>يحتل المضيف مقدمة الصفحة الرئيسية لمدة ثلاثة أشهر</dd>\
			                    <dt>جوائز المستخدم</dt>\
		                    	<dd>بعد انتهاء كل جولة سيقوم النظام تلقائيا ، بأضافة وسام على شكل "تاج"الي اسم المستخدم الذي حصل على المركز الأول ، وسيحصل على الوسام لمدة 15 يومًا .</dd>\
		                    </dl>\
						</div>\
                    </div>',
		'VIDEO': '<div class="video_pop">\
					<div class="video_box">\
						<iframe width="560" height="315" src="https://www.youtube.com/embed/Zy2CT16VsOU?autoplay=1" frameborder="0" allowfullscreen></iframe>\
						<span id="youtubend" class="close"><img src="/resource/static/image/anniversary/close.png" alt="close"></span>\
					</div>\
					<div class="bg"></div>\
				</div>',
		//'VIDEO': 'http://r2---sn-nx5e6n76.googlevideo.com/videoplayback?nh=IgpwcjAyLnNlYTAzKgkxMjcuMC4wLjE&amp;expire=1446419021&amp;sver=3&amp;ipbits=0&amp;sparams=dur%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&amp;dur=110.155&amp;ratebypass=yes&amp;pl=23&amp;mm=31&amp;ms=au&amp;source=youtube&amp;mv=u&amp;fexp=3300131%2C3300137%2C3300161%2C3310700%2C3312381%2C9408710%2C9422596&amp;ip=104.238.154.56&amp;key=yt6&amp;lmt=1446140728810816&amp;mt=1446397162&amp;id=o-APiZDQCYZoSpNWO1PkUeYSR8HNiUPeaa-yF_sTLD8Wm7&amp;mime=video%2Fmp4&amp;signature=D007FF331646A30EF4CE1E0B6B2C4AB738ADEAE5.B1FA29FA1A350F2D96FFFEFEC3D332DEC3C982E2&amp;itag=18&amp;mn=sn-nx5e6n76&amp;upn=P9ipz_udcDg&amp;cpn=J9VrYQkKID8nfeSW&amp;ptk=youtube_none&amp;pltype=contentugc&amp;c=MWEB&amp;cver=html5
		//			http://r2---sn-nx5e6n76.googlevideo.com/videoplayback?id=o-ACB42ZvTULTJ6Hq1JyWiKvvIK-VCNQsKxFBUisQ-m5WT&sparams=dur%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&lmt=1446140728810816&signature=297BBB2E2E3CF965A692DD187FC86045DE5F3819.543EE157D519444F17281F59F2BD3ABF04E3365E&ipbits=0&mime=video%2Fmp4&ip=104.238.154.56&sver=3&itag=18&ms=au&fexp=3300131%2C3300137%2C3300161%2C3310700%2C3312381%2C9408710%2C9422596&mt=1446444381&mv=u&dur=110.155&pl=23&nh=IgpwcjAyLnNlYTAzKgkxMjcuMC4wLjE&ratebypass=yes&key=yt6&expire=1446466612&upn=IHc77g-d6Pw&mm=31&source=youtube&mn=sn-nx5e6n76&cpn=6LWskn2UTkTTJNPs&ptk=youtube_none&pltype=contentugc&c=MWEB&cver=html5
		//          <video width="560" height="315" controls="" autoplay="" autobuffer="" src="http://r2---sn-nx5e6n76.googlevideo.com/videoplayback?id=o-AIP315_kbCu8CMy9L1aMMvyh1UkFF6QGMdOJSN4mE5oG&upn=xL-0_f4fqpE&key=yt6&ip=104.238.154.56&ipbits=0&pl=23&signature=C45858219EDFAB8E42FAF8E9C81CEE183FEEB2C6.805EC282B7C29C7EC292CBFC2FD5B73C282BE2ED&sver=3&initcwndbps=10515000&ratebypass=yes&nh=IgpwcjAyLnNlYTAzKgkxMjcuMC4wLjE&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&fexp=3300131%2C3300137%2C3300161%2C3310700%2C3312381%2C9408710%2C9418014%2C9420772%2C9421002%2C9421155%2C9421886%2C9422596%2C9423428%2C9423512%2C9423629%2C9423791&itag=18&expire=1446630723&mime=video%2Fmp4&source=youtube&mt=1446609006&mv=m&ms=au&lmt=1446530511270599&mm=31&mn=sn-nx5e6n76&dur=110.155&cpn=PSB1DWymn03qYwxY&ptk=youtube_none&pltype=contentugc&c=MWEB&cver=html5">You must have an HTML5 capable browser.</video>
		'RANK_SINGLE': '<li>\
							<img class="rank_photo" src="{0}" onerror="this.src=\'{3}\'" alt="">\
							<p>\
								<span class="rank_name">{1}</span>\
								<span class="rank_ticket">{2}<img src="/resource/static/image/anniversary/icon_ticket.png" alt="ticket" /></span>\
							</p>\
						</li>',
		'RANK_TAB': '<li><a data-role="{0}" href="javascript:;">{1}</a></li>'
	}

	var IMG_BASE = DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'activity_1y/';
	var CLIENT_WDITH = document.documentElement.clientWidth;
	var END_EVENT = 'transitionend';
	var EVENT = {
		'createView': 'createView',
		'switchView': 'switchView',
		'goBack': 'goBack'
	};
	var VIEWS_CONFIG = {
		'gift': {
			'left': true
		},

		'lottery': {
			'left': false
		},

		'medal': {
			'left': true
		},

		'rank': {
			'left': false
		},

		'video': {
			'left': false
		}

	};

	var Tip = {
		'dictionary': {
			'RechargeGifts0': 'اشحن اولاً حتى تتمكن من الحصول على الجائزة ',
			'LevelGifts1': 'تم استلام كل الهدايا', //activityStatus 1-活动已完成  rewardCode：!777不可领
			'LevelGifts0': 'لم تصل بعد الى هذا  المستوى ', //activityStatus:0  rewardCode!=777
			'LotteryAgain': 'مبروك ! حصلت على فرصة أعادة المحاولة ',
			'LotteryNone': 'لقد أنتهت فرصة السحب'
		},


		'init': function() {
			$(document.body).append(this.container = $(TEMPLATE.POP));
			this.caption = this.container.find('[data-role="caption"]');
			this.content = this.container.find('[data-role="content"]');
			this.ok = this.container.find('[data-role="ok"]');
			this.ok.on('click', this.close.bind(this));
		},

		'show': function(content, handler) {
			if (!this.initlized)
				this.init();
			this.content.html(content);
			if (handler)
				this.closeHandler = handler;
			this.container.show();
		},

		'prize': function(html) {
			this.show('<p>مبروك حصلت على :</p>' + html +
				'<p class="min">(لكتشاف هدايا السحب ، تفضل بالدخول الى صندوق الهدايا الموجود في غرف المضيفين) .</p>');
		},

		'text': function(code) {
			this.show('<p class="text_only">' + this.dictionary[code] + '</p>');
		},

		'close': function() {
			if (this.closeHandler)
				this.closeHandler();
			this.container.hide();
			this.closeHandler = null;
			this.content.html('');
		}
	};

	var Work = {
			'gift': {
				'rechargeTemplate': '<ul>\
										<li><img src="{0}">×<span class="win_num">{1}</span></li>\
									</ul>',
				'levelTemplate': '<li><img src="{0}" /><span>{1}</span></li>',

				'load': function() {
					this.activityId = 3;
					this.queryRechargeGifts = this.queryRechargeGifts.bind(this);
					this.getRechargeGifts = this.getRechargeGifts.bind(this);
					this.refreshRechargeGifts = this.refreshRechargeGifts.bind(this);
					this.getRewardData = this.getRewardData.bind(this);
					this.queryLevelGifts = this.queryLevelGifts.bind(this);
					this.getLevelGifts = this.getLevelGifts.bind(this);
					this.refreshLevelGifts = this.refreshLevelGifts.bind(this);
				},

				'render': function() {
					this.rechargeBtn = $('.btn_ticket');
					this.levelBtn = $('.btn_box');
					this.levelGiftsList = $('.box_list');
				},

				'compose': function() {

				},

				'bind': function() {
					this.rechargeBtn.on('click', this.getRechargeGifts);
					this.levelBtn.on('click', this.getLevelGifts);
				},

				'start': function() {
					this.rechargePromise = new Promise(this.queryRechargeGifts).then(this.refreshRechargeGifts);
					this.levelPromise = new Promise(this.getRewardData).then(this.queryLevelGifts).then(this.refreshLevelGifts);
				},

				'queryRechargeGifts': function() {
					Bussiness.postData('user_getRechargeActivityStatus.fly', {
						'activityId': this.activityId
					}, function(result) {
						this.rechargePromise.resolve(result);
					}.bind(this), function() {}.bind(this));
				},

				'refreshRechargeGifts': function(result) {
					this.rechargeFlag = false;
					this.chargeCode = result['code']; // code:0 rewardCode!=777
					switch (result['code']) {
						case 0:
							if (result.dataInfo && result.dataInfo.rewardCode == 777)
								this.rechargeFlag = true;
							break;
						default:
							//this.chargeCode = result['code'];
					}
				},

				'getRechargeGifts': function() {
					if (!this.rechargeFlag) {
						Tip.text('RechargeGifts0');
						return;
					}
					Bussiness.postData('user_getRechargeActivityRewards.fly', {
						'activityId': this.activityId
					}, function(result) {
						switch (result.code) {
							case 0:
								var data = result['dataInfo']['rewardDetails'][0];
								Tip.prize(stringFormat(this.rechargeTemplate,
									DOMAIN_CONFIG.IMAGE_DOMAIN + 'activity_1y/' + 'p_t' + data['type'] + 'i' + data['id'] + '.png',
									data['number'] * result['dataInfo']['rewardTimes']));
								this.refreshRechargeGifts(result) //refresh ,避免不必要的请求
								break;
							default:
								Tip.text('RechargeGifts0');
								break;
						}
					}.bind(this), function() {

					}.bind(this));
				},

				'getRewardData': function() {
					Bussiness.getJSON('reward/reward_data.json', function(result) {
						this.rewardData = result;
						this.levelPromise.resolve();
					}.bind(this));
				},

				'queryLevelGifts': function() {
					Bussiness.postData('user_getLevelActivityStatus.fly', null, function(result) {
						switch (result['code']) {
							case 0:
								this.levelPromise.resolve(result);
								break;
							default:
								this.levelPromise.resolve(result);
								this.levelFlag = false;
								break;
						}
					}.bind(this), function() {}.bind(this));
				},

				'refreshLevelGifts': function(result) {
					this.levelFlag = false;
					var data = result['dataInfo'],
						levelRewardId = data.rewardId;
					var triggers = data['triggers'];
					if (triggers && (triggers = triggers[0], triggers['rewardCode'] == 777)) {
						this.triggerId = triggers.triggerId;
						this.levelFlag = true;
					} else
						this.levelCode = data['activityStatus'] || 0;
					levelRewardId && this.levelGiftsList.html(
						this.rewardData[levelRewardId].map(function(item) {
							return stringFormat(this.levelTemplate, DOMAIN_CONFIG.IMAGE_DOMAIN + 'activity_1y/t' + item['type'] + 's' + item['special'] + '.png',item['number']);
						}.bind(this)).join(''));
					this.levelBtn.html('هدايا المستوى'+data['activityName']);
				},

				'getLevelGifts': function() {
					if (!this.levelFlag) {
						Tip.text('LevelGifts' + this.levelCode);
						return;
					}
					Bussiness.postData('user_getLevelActivityRewards.fly', {
						'triggerId': this.triggerId
					}, function(result) {
						switch (result['code']) {
							case 0:
								var data = result['dataInfo']['rewardDetails'];
								var template = '<li><img src="{0}" />×<span class="win_num">{1}</span></li>';
								var html = data.map(function(item) {
									return stringFormat(template, DOMAIN_CONFIG.IMAGE_DOMAIN + 'activity_1y/' + 'p_t' + item['type'] + 'i' + item['id'] + '.png', item['number']);
								}).join('');
								Tip.prize('<ul>' + html + '</ul>');
								this.refreshLevelGifts(result);
								break;
							default:
								this.levelFlag = false;
								Tip.text('LevelGifts' + result.code);
								break;
						}
					}.bind(this), function() {}.bind(this));
				}
			},

			'lottery': {
				'config': {
					't4s127n2': {
						'pos': 1,
						'pic': 'sweet.png',
						'tip': 'حلوي'
					},
					't4s149n1': {
						'pos': 2,
						'pic': 'balloon.png',
						'tip': 'بلون'
					},
					't4s143n1': {
						'pos': 5,
						'pic': 'ferrari.png',
						'tip': 'سيارة فراري'
					},
					't0s0n1': {
						'pos': 8,
						'pic': 'flower.png'
					},
					't0s0n2': {
						'pos': 3,
						'pic': 'flower.png'
					},
					't2s0n10': {
						'pos': 6,
						'pic': 'coin.png'
					},
					't2s0n100': {
						'pos': 9,
						'pic': 'coin.png'
					},
					't8s0n1': {
						'pos': 10,
						'pic': ''
					},
					't4s154n1': {
						'pos': 7,
						'pic': 'starticket.png',
						'tip': 'بطاقة التميز'
					},
					't4s154n10': {
						'pos': 4,
						'pic': 'starticket.png',
						'tip': 'بطاقة التميز'
					},

					't4s154': 'starticket.png',

					't2s0': 'coin.png',

					't4s143': 'ferrari.png'
				},

				'result': {
					'Success': 0,
					'Error': 1
				},

				'timeout': 50,

				'prizeTemplate': '<ul>\
									<li><img src="{0}" />×<span>{1}</span></li>\
								</ul>',

				'luckyTemplate': '<span>حصل {2} على {0} x <img src="{1}" /></span>',


				'load': function(option) {
					this.luckId = 33;
					this.degree = 0;
					this.count = 0;
				},
				'render': function() {
					this.pan = this.container.find('[data-role="pan"]');
					this.button = this.container.find('[data-role="button"]');
					this.counter = this.container.find('[data-role="counter"]');
					this.marquee = this.container.find('[data-role="marquee"]');
				},
				'compose': function() {

				},
				'bind': function() {
					this.button.on('click', this.submit.bind(this));
				},
				'start': function() {
					Bussiness.postData('user_getUserLuckQualificationCount.fly', {
						'luckId': this.luckId
					}, function(result) {
						result = (result ? result['dataInfo'] : 0) || 0;
						this.counter.html(this.count = result);
					}.bind(this), function() {
						this.count = 0;
					}.bind(this));
					Bussiness.postData('user_getAllUserAward.fly', {
						'luckId': this.luckId
					}, function(result) {
						this.lucky = result.dataInfo;
						this.loop();
						/*result = result ? result['dataInfo'] : 0;
						this.counter.html(this.count = result);*/
					}.bind(this), function() {
						//this.count = 0;
					}.bind(this));
				},
				'submit': function() {
					if (!this.count) {
						Tip.text('LotteryNone');
						return;
					}
					if (this.lock)
						return;
					this.lock = true;
					var promise = new Promise(function() {
						this.pan.css({
							'transition-duration': '0ms',
							'transform': 'rotate(' + this.degree % 360 + 'deg)'
						});
						return true;
					}.bind(this)).wait(this.timeout).then(
						function() {
							this.pan.css('transition-duration', '5000ms');
							Bussiness.postData('user_luck.fly', {
								'luckId': this.luckId,
								'roomId': 1
							}, function(result) {
								result = result['dataInfo'];
								this.counter.html(this.count = result['qualificationCount']);
								this.answer(result['awardBeans'][0]);
							}.bind(this), function() {
								this.lock = false;
							}.bind(this));
						}.bind(this)
					);
				},

				'answer': function(prize) {
					var key = prize['key'] = 't' + prize['type'] + 's' + prize['special'] + 'n' + prize['number'],
						model = this.config[key];
					if (!model) {
						this.lock = false;
						return;
					}
					var pos = model['pos'];
					var n = 8,
						length = 10,
						cell = parseInt(360 / length),
						half = cell / 2;
					var degree = this.degree = n * 360 + (1 - pos) * cell + Math.ceil((Math.ceil(Math.random() * 1000000) % cell - half) * 0.8);
					var promise = new Promise(function() {
						this.pan.one(END_EVENT, function() {
							this.pan.css({
								'transition-duration': '0ms'
							});
							$(document.body).focus();
							promise.resolve();
						}.bind(this)).css('transform', 'rotate(' + degree + 'deg)');
					}.bind(this)).wait(this.timeout).then(this.tip.bind(this, this.result.Success, prize));
				},

				'tip': function(result, data) {
					switch (result) {
						case this.result.Success:
							if (data['type'] == 8)
								Tip.text('LotteryAgain');
							else
								Tip.prize(stringFormat(this.prizeTemplate, IMG_BASE + this.config[data['key']]['pic'], data['number']));
							break;
						case this.result.Error:
							break;
					}
					this.lock = false;
				},

				'loop': function(){
					this.lucky = this.lucky.award;
					if (!this.lucky)
						return;
					this.lucky = this.lucky.map(function(item) {
						return stringFormat(this.luckyTemplate, item['number'], IMG_BASE + this.config['t' + item['type'] + 's' + item['special']], item['nickName']);
					}.bind(this));
					if (this.lucky.length == 0)
						return;
					var stage = this.marquee.width(),end = 'translate3d(' + stage + 'px,0,0)',
						limit = this.lucky.length,
						index = 0,
						actor, promise;
					var handler = function() {
						promise = new Promise(appendHnandler).wait(this.timeout).then(transitionHandler);
					}.bind(this);
					var appendHnandler = function() {
						actor = $(this.lucky[index++]);
						actor.appendTo(this.marquee).css({
							'transform': 'translate3d(' + (-actor.width()) + 'px,0,0)',
							'visibility': 'visible',
							'transition': 'transform 6s ease-out'
						});
						return true;
					}.bind(this);
					var transitionHandler = function() {
						if (index == limit)
							index = 0;
						actor.one(END_EVENT, function() {
							actor.remove();
							handler();
						}.bind(this)).css('transform', end);
					}.bind(this);
					handler();
				}
			},

			'medal': {
				'load': function() {},
				'render': function() {},
				'compose': function() {
					var sign = this.sign = require('component/sign');
					sign.start();
				},
				'bind': function() {},
				'start': function() {}
			},

			'rank': {
				'period': [{
					'start': new Date(2015, 10, 23),
					'end': new Date(2015, 10, 29 + 1),
					'range': '11/23 — 11/29'
				}, {
					'start': new Date(2015, 10, 16),
					'end': new Date(2015, 10, 22 + 1),
					'range': '11/16 — 11/22'
				}, {
					'start': new Date(2015, 10, 9),
					'end': new Date(2015, 10, 15 + 1),
					'range': '11/9 — 11/15'
				}, {
					'start': new Date(2015, 10, 2),
					'end': new Date(2015, 10, 8 + 1),
					'range': '11/2 — 11/8'
				}], //TimeoffZone已抵消

				'load': function() {
					this.order = [1, 2, 3, 4, 5];
					this.now = new Date, this.current = -1;
					var end;
					this.period.some(function(period, index) {
						if (this.now >= period['start'] && this.now < (end = period['end']))
							return this.current = index, true;
						if (this.now >= end)
							return this.current = 0;
						return false;
					}.bind(this));
				},
				'render': function() {
					if (this.current < 0)
						return;
					this.tab = $('.btn_date_list');
					this.userList = $('.user_list');
					this.hostList = $('.host_list');
					this.countDownSpan = $('.time_num');
					var tabs = [],
						css = 'btn_active',
						period;
					for (var i = this.current, j = 0; i < this.period.length; i++, j++) {
						period = this.period[i];
						this.tab.append($(stringFormat(TEMPLATE.RANK_TAB, j, period['range'])));
						tabs.push({
							'index': j,
							'element': this.tab.find('[data-role="' + j + '"]'),
							'enter': function() {
								this.element.addClass(css);
								this.onEnter(this.index);
							},
							'onEnter': this.renderPeriod.bind(this),
							'quit': function() {
								this.element.removeClass(css);
							}
						});
					};
					this.mutex = new(Kit.use('Mutex'))({
						'items': tabs,
						'lazy': true
					});
				},
				'compose': function() {},
				'bind': function() {},
				'start': function() {
					if(!this.dataSource){
						Bussiness.getData('anniversary_gift_rank.json', function(result) {
							this.dataSource = result;
						}.bind(this));
					}
					this.mutex && this.mutex.refresh();
					this.countInterval();
				},
				countInterval: function() {
					if (this.current < 0) return;
					this.timeLeft = new Date(this.period[this.current]['end']).getTime() - new Date(this.now).getTime();
					this.countDown();
					if (this.timeLeft && this.timeLeft <= 60000) {
						var timer = setInterval(function() {
							if (this.timeLeft < 0) {
								clearInterval(timer);
							} else {
								this.countDown();
								this.timeLeft -= 1000;
							}
						}.bind(this), 1000);
					}
				},
				countDown: function() {
					var day = 24 * 60 * 60 * 1000,
						hour = 60 * 60 * 1000,
						minutes = 60 * 1000,
						timeFormat;
					if ((timeFormat = parseInt(this.timeLeft / day)) >= 1) {
						timeFormat += 'يوم';
					} else if ((timeFormat = parseInt(this.timeLeft / hour)) >= 1) {
						timeFormat += 'ساعة';
					} else if ((timeFormat = parseInt(this.timeLeft / minutes)) >= 1) {
						timeFormat += 'دقيقة ';
					} else {
						timeFormat = this.timeLeft<=0 ? 0:parseInt(this.timeLeft / 1000) + 'ثانية ';
					}
					this.countDownSpan.html(timeFormat);
				},
				'renderPeriod': function(index) {
					var data = this.dataSource[index],
						fullDefaultHead = DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/img/default/nophoto.jpg';
					if (!data)
						return;
					var users = data['user'];
					this.userList.html(this.order.map(function(item) {
						if (!users[item]) return '';
						return stringFormat(TEMPLATE.RANK_SINGLE, !users[item]['head_pic'] ? fullDefaultHead : DOMAIN_CONFIG['IMAGE_DOMAIN'] + users[item]['head_pic'],
							users[item]['nick_name'],
							users[item]['total'],
							fullDefaultHead);
					}).join(''));
					var hosts = data['host'];
					this.hostList.html(this.order.map(function(item) {
						if (!hosts[item]) return '';
						return stringFormat(TEMPLATE.RANK_SINGLE, !hosts[item]['head_pic'] ? fullDefaultHead : DOMAIN_CONFIG['IMAGE_DOMAIN'] + hosts[item]['head_pic'],
							hosts[item]['nick_name'],
							hosts[item]['total'],
							fullDefaultHead);
					}).join(''));
				}
			},

			'video': {
				'load': function() {},
				'render': function() {},
				'compose': function() {},
				'bind': function() {},
				'start': function() {}
			}
		},
		workBase = {
			'init': function(option) {
				$.extend(this, option);
				this.load(option);
				this.render();
				this.compose();
				this.bind();
				this.start();
			},
			'quit': function() {
				if (this.stop)
					this.stop();
			}
		};
	Object.keys(Work).forEach(function(item, index) {
		$.extend(Work[item], workBase);
	});

	var View = OOP.create('View',
		function(option) {
			this.load(option);
			this.render();
			this.compose();
			this.bind();
			this.start();
		}, {
			'load': function(option) {
				$.extend(this, option);
				this.key = this.id.toUpperCase();
			},

			'render': function() {
				var html = stringFormat(TEMPLATE.VIEW,
					this.id,
					CLIENT_WDITH + 'px', (this.left ? -1 : 1) * CLIENT_WDITH + 'px');
				Trigger.emit(EVENT.createView, [html, this.onCreate.bind(this)]);
			},

			'compose': function() {
				this.container.find('[data-role="content"]').html(TEMPLATE[this.key]);
				(this.work = Work[this.id]).init({
					'container': this.container,
					'dataSource':this.dataSource
				});
			},

			'bind': function() {

			},

			'start': function() {
				this.initlized = true;
			},

			'onCreate': function(element) {
				this.container = element;
			},

			'act': function() {
				this.container.show();
				Trigger.emit(EVENT.switchView, [this.left]);
			},

			'quit': function() {
				this.work.quit();
				this.container.hide();
			}
		});

	var Page = {
		'run': function() {
			this.load();
			this.render();
			this.compose();
			this.bind();
			this.start();
		},

		'load': function() {
			this.views = {};
		},

		'render': function() {
			this.container = $('#container');
			this.container.i18nHTML(Header.html() + stringFormat(TEMPLATE.MAIN, document.documentElement.clientWidth + 'px'));
			this.stage = $('#stage');
			this.gohome = $('#gohome');
		},

		'compose': function() {
			I18N.init({
				'onLocalize': this.localize.bind(this)
			});
			login_util.setCallback(this.identifyFlow.bind(this));
			Header.init({
				'container': this.container
			});
		},

		'bind': function() {
			this.stage.on('click', '[data-command]', function(evt) {
				var command = $(evt.currentTarget).data('command');
				if (['gift', 'lottery', 'medal'].some(function(item) {
						return item == command;
					}) && !this.identity)
					login_util.show_login_div();
				else
					this.view(command);
			}.bind(this));

			var gohome = function() {
				if (this.current)
					this.current['view'].quit();
				this.current = null;
			}.bind(this);
			this.gohome.on('click', function() {
				this.gohome.hide();
				Trigger.emit(EVENT.goBack, [gohome]);
			}.bind(this));

			Trigger.register(EVENT.createView, function(html, onCreate) {
				var element = $(html);
				this.stage.append(element);
				onCreate(element);
			}.bind(this));
			Trigger.register(EVENT.switchView, function(left) {
				this.stage.one(END_EVENT, function() {
					this.gohome.show();
				}.bind(this)).css('transform', 'translate3d(' + (left ? 1 : -1) * CLIENT_WDITH + 'px,0,0)');
			}.bind(this));
			Trigger.register(EVENT.goBack, function(onEnd) {
				this.stage.one(END_EVENT, onEnd).css('transform', 'translate3d(0,0,0)');
			}.bind(this));
		},

		'start': function() {
			this.identifyFlow();
			this.queryRank();
		},
		'queryRank':function(){
			Bussiness.getData('anniversary_gift_rank.json', function(result) {
				this.dataSource = result;
				var tpl = '<img class="first_photo" onerror="this.src=\'{2}\'" src="{0}" alt="photo" /><strong  class="first_name">{1}</strong>';
				if(this.dataSource[0] && this.dataSource[0]['host']){
					var fullDefaultHead = DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/img/default/nophoto.jpg';
					$('.btn_rank').prepend(stringFormat(tpl,DOMAIN_CONFIG['IMAGE_DOMAIN']+this.dataSource[0]['host'][1]['head_pic'],this.dataSource[0]['host'][1]['nick_name'],fullDefaultHead));
				}
			}.bind(this));
		},

		'view': function(command) {
			if (!VIEWS_CONFIG.hasOwnProperty(command))
				return;
			if(command == 'video')
				return this.youtube();
			var view = this.views[command] = this.views[command] || new View($.extend(VIEWS_CONFIG[command], {
				'id': command,'dataSource':this.dataSource || {}
			}));
			view.act();
			this.current = {
				'command': command,
				'view': view
			};
		},

		localize: function() {
			if (this.sign)
				this.sign.localize();
			if (top_util) {
				top_util.reset_popup_message();
			}
		},

		'identifyFlow': function() {
			this.promise = new Promise(this.identify.bind(this))
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
		},

		'youtube': function() {
			this.video = $(TEMPLATE.VIDEO).appendTo(this.stage);
			$('#youtubend').on('click',function(){this.video.remove()}.bind(this));
		}
	};
	I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});