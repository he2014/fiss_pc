define(function (require, exports, module) {
    require('wheel/zepto');
    require('wheel/underscore');
    require('wheel/backbone');
    var Utility = require('common/utility'),Promise = Utility['Promise'],stringFormat = Utility['String']['stringFormat'];
    var Kit = require('component/kit'),Bussiness = Kit.use('Bussiness');

    var TEMPLATE = {
        'HOME': '<div class="view">\
                        <div class="home_main">\
                            <img src="/resource/static/image/anniversary_mb/home_main.png" alt="one year anniversary" />\
                        </div>\
                        <ul>\
                            <li><a class="btn_gift" href="javascript:;"><span>صندوق الهدايا</span></a></li>\
                            <li><a class="btn_rank" href="javascript:;"><span>قائمة النجوم الأسبوعية</span></a></li>\
                            <li><a class="btn_video" href="javascript:;"><span>تهاني المضيفين</span></a></li>\
                            <li><a class="btn_lottery" href="javascript:;"><span>السحب</span></a></li>\
                        </ul>\
                    </div>',

        'POP': '<div class="pop" style="display:none;">\
					<div class="wrap clearfix">\
						<h2 data-role="caption">التنبيهات</h2>\
						<div class="content" data-role="content"></div>\
						<a href="javascript:;" data-role="ok">تأكيد</a>\
					</div>\
					<div class="bg"></div>\
				</div>',

        'VIDEO': '<div class="view">\
                        <div class="video_pop">\
                            <div class="video_box">\
        						<iframe width="560" height="315" src="https://www.youtube.com/embed/Zy2CT16VsOU?autoplay=1" frameborder="0" allowfullscreen></iframe>\
                                <span id="youtubend" class="close"><img src="/resource/static/image/anniversary/close.png" alt="close"></span>\
                            </div>\
					     <div class="bg"></div>\
				        </div> \
                    </div>',

        'LOTTERY':'<div class="view" data-role="content">\
                        <div class="lottery_main">\
                        <h2 class="title_lottery"></h2>\
                        <div class="rule">\
                        <h2>شروط السحب</h2>\
                        <h3>طريقة الحصول على السحب لأكثر من مرة :</h3>\
  	                    <p>سجل دخولك يومياً وأحصل علي فرصة للمشاركة في السحب اليومي ( تستخدم فرصة السحب لنفس اليوم وإلا ستلغي تلقائياً )<br />\
						<br> \
        	            في الإحتفالية السنوية، يجب عليك الانتهاء من المهام اليومية كي تشارك بسحب على الجوائز ( يمكن إبقاء فرص السحب حتي نهاية النشاط )<br />\
        	            <br> \
        	            يمكنك ايضاً الحصول على فرص جديدة للسحب عن طريق عجلة السحب ( يمكن إبقاء فرص السحب حتي نهاية النشاط )\
		                </p>\
                        <h3>جوائز السحب :</h3>\
                        <p>هدايا ، عملات ، زهور ، أعادة المحاولة .</p>\
                        </div>\
                        <div class="notice" data-role="marquee"></div>\
                        <p class="time">عدد السحوبات المتبقية :<span data-role="counter"></span></p>\
                        <div class="lottery_block">\
                        <div class="lottery_pan">\
                        <img id="pan" class="active" src="/resource/static/image/anniversary_mb/pan.png" data-role="pan"/>\
                        <img class="arrow" src="/resource/static/image/anniversary_mb/arrow.png" data-role="button"/>\
                        </div>\
                        <img class="lottery_gift" src="/resource/static/image/anniversary_mb/lottery_gift.png" alt="" />\
                        </div>\
                        </div>\
                    </div>',

        'GIFT': '<div class="view">\
                    <div class="gift_main clearfix">\
                    <h2 class="title_gift"></h2>\
                    <div class="box">\
                    <h3>قواعد استلام الهدايا للمستويات المختلفة</h3>\
                    <p>في الإحتفالية السنوية : لكل مستوي هدايا مختلفة، فكلما كان المستوى أعلى كلما كانت الهدايا أثرى ! </p>\
                    <ul class="box_list clearfix">\
                    \
                    </ul>\
                    <a class="btn_box" href="javascript:;"></a>\
                    </div>\
                    <div class="ticket">\
                    <h3>قواعد شحن الحصول على الهدايا</h3>\
                    <p>في الإحتفالات السنوية ، إذا شحنت <span class="gold">500</span> عملة ، نهديك<br /><span class="gold">10</span>من بطاقات التميز مجانا(يمكنك جمع الهدايا حتى انتهاء العرض )</p>\
                    <img class="ticket_img" src="/resource/static/image/anniversary_mb/ticket.png" alt="ticket" />\
                    <a class="btn_ticket" href="javascript:;"><img src="/resource/static/image/anniversary_mb/btn_ticket.png" alt="btn_ticket" /></a>\
                    </div>\
                    <img class="gift_box" src="/resource/static/image/anniversary_mb/gift_box.png" alt="gift_box" />\
                    </div>\
                    </div>',

        'RANK':'<div class="view">\
                        <div class="rank_top">\
                        <h2 class="title_rank"></h2>\
                        <p class="rank_day"><span class="rank_day_text">الوقت المتبقي من الجولة</span><strong class="rank_day_num">30</strong><span class="rank_day_time">DAY</span></p>\
                        </div>\
                        <div class="rank_rule">\
                        <div class="rule_text" style="height:0px;">\
                            <dl>\
                                <dt>قواعد قائمة المضيفين</dt>\
                               <dd>يستطيع المضيف دخول القائمة عن طريق التنافس علي الحصول علي أكبر عدد من بطاقات التميز خلال مختلف الجولات. </dd>\
                               <dd>تبدأ جولة جديدة كل أسبوع، ومع نهاية كل جولة تحذف البطائق السابقة ولا تضاف الى الجولة القادمة .</dd>\
                                <dt>قواعد قائمة المستخدمين</dt>\
                               <dd>يستطيع المستخدم دخول القائمة عن طريق التنافس علي أرسال أكبر عدد من بطاقات التميز إلي المضيفين خلال مختلف الجولات. </dd>\
                               <dd>تبدأ جولة جديدة كل أسبوع، ومع نهاية كل جولة تحذف البطائق السابقة ولا تضاف الى الجولة القادمة .</dd>\
                                <dt>طريقة الحصول على بطاقات التميز</dt>\
                                <dd>يمكن للمستخدم أهداء الهدايا من إستديو المضيفين</dd>\
                                <dd>عند شحن<span class="blue">{500}</span> عملة ، سنهديك <span class="blue">{10}</span>من <span class="yellow">(بطاقات التميز)</span>، أشحن فوراً!</dd>\
                                <dt>جوائز المضيفين </dt>\
                                <dd>يحتل المضيف مقدمة الصفحة الرئيسية لمدة ثلاثة أشهر</dd>\
                                <dt>جوائز المستخدم</dt>\
                                <dd>بعد انتهاء كل جولة سيقوم النظام تلقائيا ، بأضافة وسام على شكل "تاج"الي اسم المستخدم الذي حصل على المركز الأول.</dd>\
                                <dd>تحصل على وسام لمدة 15 يوم</dd>\
                            </dl>\
                            </div>\
                        <a class="btn_slider" href="javascript:;">إضغط لمشاهدة قواعد النشاط</a>\
                        </div>\
                        <div class="rank_main">\
                        <ul class="btn_rank_list">\
                           <li class="user_list">المستخدمين </li>\
                           <li class="host_list active">المضيفين </li>\
                        </ul>\
                        \
                    </div>\
                </div>'
    };

    var Tip = {
        'init': function() {
            $(document.body).append(this.container = $(TEMPLATE.POP));
            this.caption = this.container.find('[data-role="caption"]');
            this.content = this.container.find('[data-role="content"]');
            this.ok = this.container.find('[data-role="ok"]');
            this.ok.on('click', this.close.bind(this));
        },

        'show': function(caption, content, handler) {
            if (!this.initlized)
                this.init();
            this.caption.html(caption);
            this.content.html(content);
            if (handler)
                this.closeHandler = handler;
            this.container.show();
        },

        'close': function() {
            if (this.closeHandler)
                this.closeHandler();
            this.container.hide();
            this.closeHandler = null;
            this.caption.html('')
            this.content.html('');
        }
    };

    var HomeView = Backbone.View.extend({
        initialize: function (options) {
            this.options = options;
            this.render();
        },
        //className: 'home',
        events: {
            'click .btn_rank': 'toRankPage',
            'click .btn_lottery': 'toLotteryPage',
            'click .btn_gift': 'toGiftPage',
            'click .btn_video': 'toVideoPage'
        },
        render: function () {
            var tmp = _.template(TEMPLATE.HOME)({});
            this.$el.html(tmp);
            this.$el.addClass('home').css({'width':'100%'}).appendTo(window.stage);
            this.queryRank();
            return this.$el;
        },
        queryRank:function(){
            Bussiness.getData('anniversary_gift_rank.json', function(result) {
                window.stage.dataSource = result;
                var tpl='<img class="first_photo" src="{0}" onerror="this.src=\'{2}\'" alt="photo" /><strong class="first_name">{1}</strong>',
                    fullDefaultHead = DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/img/default/nophoto.jpg';
                if(result[0] && result[0]['host']){
                    $('.btn_rank').prepend(stringFormat(tpl,DOMAIN_CONFIG['IMAGE_DOMAIN']+window.stage.dataSource[0]['host'][1]['head_pic'],window.stage.dataSource[0]['host'][1]['nick_name'],fullDefaultHead));
                };
            }.bind(this), true);

        },
        toRankPage: function () {
            aniversary_mb.navigate('rank',{trigger:true});
        },
        toLotteryPage: function () {
            aniversary_mb.navigate('lottery',{trigger:true});
        },
        toGiftPage: function () {
            aniversary_mb.navigate('gift',{trigger:true});
        },
        toVideoPage: function () {
            aniversary_mb.navigate('video',{trigger:true});
        }
    });

    var RankView = Backbone.View.extend({
        initialize: function (options) {
            this.options = {left:true};
            $.extend(this.options, options);
            this.draw();
            this.init();
        },
        events: {},
        period: [{
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
        draw: function () {
            var tpl = _.template(TEMPLATE.RANK)({});
            this.$el.html(tpl);
            this.$el.addClass('rank').css({'width':'100%','top':'0px','left':'100%'});
            this.$el.appendTo(stage);
            return this.$el;
        },
        init:function(){
            this.load();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){
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
        compose: function() {
            this.userBtn = $('.user_list');
            this.hostBtn = $('.host_list');
            this.rankList = $('.rank_main');
            this.tabList = $('.btn_rank_list');
            this.userCache = this.hostCache = '';
            this.btnSlider = $('.btn_slider');
            this.ruleTxt = $('.rule_text');
            this.rankDayNum = $('.rank_day_num');
            this.rankDayTime = $('.rank_day_time');
        },
        bind: function() {
            this.userBtn.on('click',function(){
                this.tabList.children().removeClass('active');
                this.userBtn.addClass('active');
                this.renderList(this.userResult,'user');}.bind(this));
            this.hostBtn.on('click',function(){
                this.tabList.children().removeClass('active');
                this.hostBtn.addClass('active');
                this.renderList(this.hostResult,'host');}.bind(this));
            this.btnSlider.on('click',function(){
                this.ruleTxt.height() == 0 ? this.ruleTxt.css('height','910px'):this.ruleTxt.css('height','0px');
            }.bind(this))
        },
        start: function() {
            if(!window.stage.dataSource){
                Bussiness.getData('anniversary_gift_rank.json', function(result) {
                    window.stage.dataSource = result;
                    this.renderdataSource(result);
                }.bind(this), true);
            }else{
                this.renderdataSource(window.stage.dataSource);
            }
            this.countInterval();
        },
        renderdataSource:function(result){
            var res = this.formatListData(result);
            this.userResult = res['user'];
            this.hostResult = res['host'];
            this.renderList(this.hostResult,'host');
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
                timeFormat,
                unit;
            if ((timeFormat = parseInt(this.timeLeft / day)) >= 1) {
                unit = 'يوم';
            } else if ((timeFormat = parseInt(this.timeLeft / hour)) >= 1) {
                unit = 'ساعة';
            } else if ((timeFormat = parseInt(this.timeLeft / minutes)) >= 1) {
                unit = 'دقيقة ';
            } else {
                timeFormat =this.timeLeft <= 0 ? 0: parseInt(this.timeLeft / 1000) ;
                unit =  'ثانية ';
            }
            this.rankDayNum.html(timeFormat);
            this.rankDayTime.html(unit);
        },
        renderList:function(dataArr,cacheKey){
            if(!dataArr) return;
            this.rankList.find('.rank_list_block').remove();
            if(cacheKey == 'user' && this.userCache){
                $('<div class="rank_list_block"></div>').html(this.userCache).appendTo( this.rankList);
                return;
            }else if(cacheKey == 'host' && this.hostCache){
                $('<div class="rank_list_block"></div>').html(this.hostCache).appendTo( this.rankList);
                return;
            }else{
                var timeRange = ['11/23 — 11/29', '11/16 — 11/22', '11/9 — 11/15', '11/2 — 11/8'];
                timeRange = timeRange.slice(4 - (dataArr.length + 1));
                var tpl = '<li>\
                            <img class="rank_photo" src="{0}" onerror="this.src=\'{3}\'" alt="" />\
                            <p>\
                            <span class="rank_name">{1}</span>\
                            <span class="rank_ticket"> {2}</span>\
                            {4}\
                            </p>\
                        </li>';
                var html ='', fullDefaultHead = DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                dataArr.forEach(function(value,index,array){
                    var html = '<h4>'+ timeRange[index] +'</h4><ul class="rank_list">';
                    $.each(value,function(k,item){
                        if(k>5) return;
                        var rank = k<=3 ? '<img class="rank_icon" src="/resource/static/image/anniversary_mb/icon_rank'+k+'.png" alt="" />':'';
                        html += stringFormat(tpl,DOMAIN_CONFIG['IMAGE_DOMAIN']+item['head_pic'],item['nick_name'],item['total'],fullDefaultHead,rank);
                    });
                    html += '</ul>';
                    $('<div class="rank_list_block"></div>').html(html).appendTo( this.rankList);
                    cacheKey == 'user' ? this.userCache += html : this.hostCache += html;
                }.bind(this));
            }
        },
        formatListData:function(result){
            if(result && result.length>0){
                var userArr = [],hostArr=[],resArr=[];
                result.forEach(function(item){
                    userArr.push(item['user']);
                    hostArr.push(item['host']);
                });
                resArr['user'] = userArr;
                resArr['host'] = hostArr;
                return resArr;
            }
        }
    });

    var GiftView = Backbone.View.extend({
        initialize: function (options) {
            this.options = {left:true};
            $.extend(this.options, options);
            this.draw();
            this.init();
        },
        events: {},
        rechargeTemplate: '<ul>\
                                <li><img src="{0}">×<span class="win_num">{1}</span></li>\
                            </ul>',
        levelTemplate: '<li><img src="{0}" /><span>{1}</span></li>',
        draw: function () {
            var tpl = _.template(TEMPLATE.GIFT)();
            this.$el.html(tpl);
            this.$el.addClass('gift').css({'width':'100%','top':'0px','right':'100%'});
            this.$el.appendTo(stage);
            return this.$el;
        },
        init:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load: function() {
            this.activityId = 3;
            this.queryRechargeGifts = this.queryRechargeGifts.bind(this);
            //this.getRechargeGifts = this.getRechargeGifts.bind(this);
            this.refreshRechargeGifts = this.refreshRechargeGifts.bind(this);
            this.getRewardData = this.getRewardData.bind(this);
            this.queryLevelGifts = this.queryLevelGifts.bind(this);
            //this.getLevelGifts = this.getLevelGifts.bind(this);
            this.refreshLevelGifts = this.refreshLevelGifts.bind(this);
        },

        render: function() {
            this.rechargeBtn = $('.btn_ticket');
            this.levelBtn = $('.btn_box');
            this.levelGiftsList = $('.box_list');
        },

        compose: function() {

        },

        bind: function() {
            this.rechargeBtn.on('click',this.getRechargeGifts.bind(this));
            this.levelBtn.on('click',this.getLevelGifts.bind(this));
        },

        start: function() {
            this.rechargePromise = new Promise(this.queryRechargeGifts).then(this.refreshRechargeGifts);
            this.levelPromise = new Promise(this.getRewardData).then(this.queryLevelGifts).then(this.refreshLevelGifts);
        },

        queryRechargeGifts: function() {
            Bussiness.postData('mobile/user_getRechargeActivityStatus.fly', {
                'activityId': this.activityId,
                'loginKey': loginKey
            }, function(result) {
                this.rechargePromise.resolve(result);
            }.bind(this), function() {}.bind(this));
        },

        refreshRechargeGifts: function(result) {
            this.rechargeFlag = false;
            this.chargeCode = result['code'];// code:0 rewardCode!=777
            switch (result['code']) {
                case 0:
                    if (result.dataInfo && result.dataInfo.rewardCode == 777)
                        this.rechargeFlag = true;
                    break;
                default:
                //this.chargeCode = result['code'];
            }
        },

        getRechargeGifts: function() {
            if(!this.rechargeFlag){
                Tip.text('RechargeGifts0');
                return;
            }
            Bussiness.postData('mobile/user_getRechargeActivityRewards.fly', {
                'activityId': this.activityId,
                'loginKey': loginKey
            }, function(result) {
                switch (result.code) {
                    case 0:
                        var data = result['dataInfo']['rewardDetails'][0];
                        Tip.prize(stringFormat(this.rechargeTemplate,
                            DOMAIN_CONFIG.IMAGE_DOMAIN + 'activity_1y/' + 'p_t' + data['type'] + 'i' + data['id'] + '.png',
                            data['number'] * result['dataInfo']['rewardTimes']));
                        this.refreshRechargeGifts(result)  //refresh ,避免不必要的请求
                        break;
                    default:
                        Tip.text('RechargeGifts0');
                        break;
                }
            }.bind(this), function() {

            }.bind(this));
        },

        getRewardData: function() {
            Bussiness.getJSON('reward/reward_data.json', function(result) {
                this.rewardData = result;
                this.levelPromise.resolve();
            }.bind(this));
        },

        queryLevelGifts: function() {
            Bussiness.postData('mobile/user_getLevelActivityStatus.fly', {'loginKey': loginKey}, function(result) {
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

        refreshLevelGifts: function(result) {
            this.levelFlag = false;
            var data = result['dataInfo'],levelRewardId = data.rewardId;
            var triggers = data['triggers'];
            if (triggers && (triggers = triggers[0], triggers['rewardCode'] == 777)) {
                this.triggerId = triggers.triggerId;
                this.levelFlag = true;
            }
            else
                this.levelCode = data['activityStatus'] || 0;
            levelRewardId && this.levelGiftsList.html(
                this.rewardData[levelRewardId] && this.rewardData[levelRewardId].map(function(item) {
                    return stringFormat(this.levelTemplate, DOMAIN_CONFIG.IMAGE_DOMAIN + 'activity_1y/t' + item['type'] + 's' + item['special'] + '.png',item['number']);
                }.bind(this)).join(''));
            this.levelBtn.html('هدايا المستوى'+data['activityName']);
        },

        getLevelGifts: function() {
            if (!this.levelFlag){
                Tip.text('LevelGifts'+this.levelCode);
                return;
            }
            Bussiness.postData('mobile/user_getLevelActivityRewards.fly', {
                'triggerId': this.triggerId,
                'loginKey': loginKey
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

    });

    var LotteryView = Backbone.View.extend({
        initialize: function (options) {
            this.options = {left:false};
            $.extend(this.options, options);
            var promise = new Promise(function(){
              this.draw(promise);
            }.bind(this)).then(function(){
                    this.init();
                }.bind(this));
        },
        events: {},
        draw: function (promise) {
            var tpl = _.template(TEMPLATE.LOTTERY)({});
            this.$el.html(tpl);
            this.$el.addClass('lottery').css({'width':'100%','top':'0px','left':'100%'});
            this.$el.appendTo(stage);
            promise.resolve();
            return this.$el;
        },
        init:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        config: {
            t4s127n2: {
                'pos': 1,
                'pic': 'sweet.png',
                'tip': 'حلوي'
            },
            t4s149n1: {
                'pos': 2,
                'pic': 'balloon.png',
                'tip': 'بلون'
            },
            t4s143n1: {
                'pos': 5,
                'pic': 'ferrari.png',
                'tip': 'سيارة فراري'
            },
            t0s0n1: {
                'pos': 8,
                'pic': 'flower.png'
            },
            t0s0n2: {
                'pos': 3,
                'pic': 'flower.png'
            },
            t2s0n10: {
                'pos': 6,
                'pic': 'coin.png'
            },
            't2s0n100': {
                'pos': 9,
                'pic': 'coin.png'
            },
            t8s0n1: {
                'pos': 10,
                'pic': ''
            },
            t4s154n1: {
                'pos': 7,
                'pic': 'starticket.png',
                'tip': 'بطاقة التميز'
            },
            t4s154n10: {
                'pos': 4,
                'pic': 'starticket.png',
                'tip': 'بطاقة التميز'
            },

            t4s154: 'starticket.png',

            t2s0: 'coin.png',

            t4s143: 'ferrari.png'
        },

        result: {
            'Success': 0,
            'Error': 1
        },

        timeout: 50,

        prizeTemplate: '<ul>\
									<li><img src="{0}" />×<span>{1}</span></li>\
								</ul>',
        'luckyTemplate': '<span>حصل {2} على {0} x <img src="{1}" /></span>',


        load: function(option) {
            this.luckId = 33;
            this.degree = 0;
            this.count = 0;
        },
        render: function() {
            this.pan = this.$el.find('[data-role="pan"]');
            this.button = this.$el.find('[data-role="button"]');
            this.counter = this.$el.find('[data-role="counter"]');
            this.marquee = this.$el.find('[data-role="marquee"]');
        },
        compose: function() {

        },
        bind: function() {
            this.button.on('click',this.submit.bind(this));
        },
        start: function() {
            Bussiness.postData('mobile/user_getUserLuckQualificationCount.fly', {
                'luckId': this.luckId,
                'loginKey': loginKey
            }, function(result) {
                result = (result ? result['dataInfo'] : 0)||0;
                this.counter.html(this.count = result);
            }.bind(this), function() {
                this.count = 0;
            }.bind(this));
            Bussiness.postData('mobile/user_getAllUserAward.fly', {
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
        submit: function() {
            if (!this.count) {
                Tip.text('LotteryNone');
                return;
            }
            if (this.lock)
                return;
            this.lock = true;
            var promise = new Promise(function() {
                this.pan.css({
                    '-webkit-transition-duration': '0ms',
                    '-webkit-transform': 'rotate(' + this.degree % 360 + 'deg)'
                });
                return true;
            }.bind(this)).wait(this.timeout).then(
                function() {
                    this.pan.css('-webkit-transition-duration', '5000ms');
                    Bussiness.postData('mobile/user_luck.fly', {
                        'luckId': this.luckId,
                        'roomId': 1,
                        'loginKey': loginKey
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

        answer: function(prize) {
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
            var degree = n * 360 + (1 - pos) * cell + Math.ceil((Math.ceil(Math.random() * 1000000) % cell - half) * 0.8);
            var promise = new Promise(function() {
                this.pan.one(END_EVENT, function() {
                    this.pan.css({
                        'transition-duration': '0ms'
                    });
                    $(document.body).focus();
                    promise.resolve();
                }.bind(this)).css('-webkit-transform', 'rotate(' + degree + 'deg)');
            }.bind(this)).wait(this.timeout).then(this.tip.bind(this, this.result.Success, prize));
        },

        tip: function(result, data) {
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
        loop: function(){
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
    });


    var VideoView = Backbone.View.extend({
        initialize: function (options) {
            this.options = {left:true};
            $.extend(this.options, options);
            this.render();
        },
        events: {},
        render: function () {
            var tpl = _.template(TEMPLATE.VIDEO)({});
            this.$el.html(tpl);
            this.$el.addClass('video');
            this.$el.appendTo(stage);
            $('#youtubend').on('click',function(){this.$el.remove();aniversary_mb.navigate('',{trigger:true})}.bind(this));
            return this.$el;
        }
    });


    var router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'rank': 'rank',
            'lottery': 'lottery',
            'gift': 'gift',
            'video': 'video'
        },
        initialize: function () {
            $('body').css({'width':'100%'});
            $('<div class="top"></div>').appendTo(container);
            $('<a class="back_btn" style="display: none;">رجوع </a>').appendTo(container).css({'z-index':9});
            window.stage = $('.top');
            this.goHomeBtn = $('.back_btn');
            var home_view = new HomeView({});
            this.bind();
        },
        bind:function(){
            $('.back_btn').click(function(){
                var handler = function(){ aniversary_mb.navigate('',{trigger:true});};
                this.slidePage(0,'home',true,handler);
            }.bind(this));
        },
        slidePage:function(value,eleClass,isHideGoHome,handler){
            $('.'+eleClass).css({'display':'block'});
            isHideGoHome?this.goHomeBtn.hide():this.goHomeBtn.show();
            var promise = new Promise(function(){
                stage.css({'transform':'translate3d('+ value +',0,0)','z-index':9});
                promise.resolve();
            }).wait(400).then(function(){
                    window.scrollTo(0,0);
                    if(handler)handler();
                    window.stage.children(':not(.'+eleClass+')').css({'display':'none'});
                });
        },
        rank: function () {
            //统一一个view转场
            if(!this._rank_view){
                this._rank_view = new RankView({left:true})
            }
            this.slidePage('-100%','rank',false);
        },
        gift: function () {
            console.log('gift nav');
            if(!this._gift_view){
                this._gift_view = new GiftView({left:true});
            }
            this.slidePage('100%','gift',false);
        },
        lottery:function(){
            if(!this._lottery_view){
                this._lottery_view = new LotteryView({left:false});
            }
            this.slidePage('-100%','lottery',false);
        },
        video: function () {
            console.log('video nav');
            new VideoView({left:false});
            //this.slidePage('100%','video',false);
        }
    });

    var Tip = {
        'dictionary': {
            'RechargeGifts0':'اشحن اولاً حتى تتمكن من الحصول على الجائزة ',
            'LevelGifts1':'تم استلام كل الهدايا',//activityStatus 1-活动已完成  rewardCode：!777不可领
            'LevelGifts0':'لم تصل بعد الى هذا  المستوى ',//activityStatus:0  rewardCode!=777
            'LotteryAgain':'مبروك ! حصلت على فرصة أعادة المحاولة ',
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




    _.templateSettings = {
        //interpolate: /\{\{=(.+?)\}\}/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        evaluate: /\{\{(.+?)\}\}/g
    };


    var IMG_BASE = DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'activity_1y/';
    var loginKey = Utility.URL.queryString('login_key');//'1850766709_1446197595059';
    var container = $('#container');
    container.addClass('container clearfix');
    var END_EVENT = 'webkitTransitionEnd';
    Backbone.history.start();
    var aniversary_mb = new router();// entrance



});