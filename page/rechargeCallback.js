define(function(require) {
	var STRING_EMPTY = '',
		Utility = require(JS_UTILITY),
		Cookie = Utility['Cookie'],
		OOP = Utility['OOP'],
		Promise = Utility['Promise'],
		stringFormat = Utility['String']['stringFormat'],
		queryString = Utility['URL']['queryString'];
	var Kit = require(useJSComponent('kit')),
		I18N = Kit.use('I18N'),
		Body = Kit.use('Body'),
		Header = Body.Header,
		Footer = Body.Footer,
		Bussiness = Kit.use('Bussiness');
	var CONST = {
		'DISPLAY_NONE': ' style="display:none;"'
	};

	var TEMPLATE = {
		'MAIN': '<div class="charge_page3">\
					<div class="recharge_section">\
				        <div class="re_title"><p data-i18n="Recharge_SuccessfullyPayed">{{Recharge_SuccessfullyPayed}}</p></div>\
				        <p class="order_num"><span data-i18n="Recharge_OrderNumber">{{Recharge_OrderNumber}}</span><em>&nbsp;{0}</em></p>\
				        <p class="payment"><span data-i18n="Recharge_PaymentAmount">{{Recharge_PaymentAmount}}</span>${1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-i18n="Recharge_GainedCoins">{{Recharge_GainedCoins}}:&nbsp;</span>{2}</p>\
						<a href="/myrecharge.shtml" target="_blank" id="refresh" class="rec_again" data-i18n="Recharge_ContinueToCharge" data-stat="Recharge_ContinueToCharge">{{Recharge_ContinueToCharge}}</a>\
				        <p class="rg_bm" data-i18n="Recharge_HaveProblemContactUs">{{Recharge_HaveProblemContactUs}}</p>\
				        <p class="tel_nun">FB:<em>https://www.facebook.com/7nujoom.Customer.service/</em></p>\
				    </div>\
			     </div>',
		'MAIN_FAIlD': '<div class="charge_page3">\
					<div class="recharge_section">\
				        <div class="re_title"><p data-i18n="Recharge_PaymentIsFailed">{{Recharge_PaymentIsFailed}}</p></div>\
				        <p class="order_num"><span data-i18n="Recharge_OrderNumber">{{Recharge_OrderNumber}}</span><em>&nbsp;{0}</em></p>\
				        <p class="payment"><span data-i18n="Recharge_PaymentAmount">{{Recharge_PaymentAmount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-i18n="Recharge_GainedCoins">{{Recharge_GainedCoins}}:&nbsp;</span></p>\
						<a href="/myrecharge.shtml" target="_blank" id="refresh" class="rec_again" data-i18n="Recharge_ContinueToCharge" data-stat="Recharge_ContinueToCharge">{{Recharge_ContinueToCharge}}</a>\
				        <p class="rg_bm" data-i18n="Recharge_HaveProblemContactUs">{{Recharge_HaveProblemContactUs}}</p>\
				        <p class="tel_nun">FB:<em>https://www.facebook.com/7nujoom.Customer.service/</em></p>\
				    </div>\
			     </div>'
	};

	var Page = {
		'run': function() {
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
			this.container.i18nHTML(
				stringFormat(queryString('code')==0?TEMPLATE.MAIN:TEMPLATE.MAIN_FAIlD,queryString('trad_no'),queryString('amount'),
				parseInt(queryString('balance')) + parseInt(queryString('returnBalance'))));
			queryString('code')==0? fbq('track', 'Purchase', {value:queryString('amount'), currency:queryString('curreny')}):'';
		},

		'compose': function() {
			return;
			I18N.init({
				'onLocalize': this.localize.bind(this)
			});
			login_util.setCallback(this.identifyFlow.bind(this));
			Header.init({
				'container': this.container
			});
		},

		'bind': function() {
			
		},

		'start': function() {
			
		},

		localize: function() {
			
		}
	};

	I18N.init(null, true).localize(null, Page.run.bind(Page));
});