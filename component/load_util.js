define(function(require,exports,module){
	var system_info = window['system_info'] = new function(){
		this.base_attr={
			domain : "/",
			domains : DOMAIN_CONFIG['SAFE_DOMAIN'],
			cookieDomain : DOMAIN_CONFIG['COOKIE_DOMAIN'],
			imageUrl : DOMAIN_CONFIG['IMAGE_DOMAIN'],
			staticResource : DOMAIN_CONFIG['IMAGE_DOMAIN'],
			sysResource : DOMAIN_CONFIG['SYSRES_DOMAIN'],
			local_language : "ar",
			scrollPosition : "left",
			web_site:0, // 0:首页  1:直播间  2:用户页面
			//厂商环境  366581576846427
			//正式环境  1488403388104712
			facebook_key:366581576846427,
			//87环境      488868798367-9lbt7jpe1v1vmtee85a3r7oopg9flnb8.apps.googleusercontent.com
			//厂商环境(已废弃)    488868798367-tkr9e7h355jhilf4597j0mibhv7ooe8l.apps.googleusercontent.com
			//正式环境（已废弃）   488868798367-2fcduukk5f680cv50ml5utrr99fk7ev2.apps.googleusercontent.com
			//最新134：325196212636-p79jl9bs31cfvf8ge29u1cdeq6sbetgd.apps.googleusercontent.com
			//最新线上：325196212636-cu4oj64p22dvm9c13sflqdi9l1l4oq6u.apps.googleusercontent.com
			google_key:'325196212636-p79jl9bs31cfvf8ge29u1cdeq6sbetgd.apps.googleusercontent.com'
		};
		//初始化系统资源地址
		this.init_info=function(str1, str2, str3, str4, str5, str6) {
			if(str1){
				system_info.base_attr.domain = str1;
			}

			if (str2) {
				system_info.base_attr.imageUrl = str2;
			}else{
				system_info.base_attr.imageUrl = system_info.base_attr.domain;
			}

			if (str3) {
				system_info.base_attr.staticResource = str3;
			}else{
				system_info.base_attr.staticResource = system_info.base_attr.domain;
			}

			if (str4) {
				system_info.base_attr.sysResource = str4;
			}else{
				system_info.base_attr.sysResource = system_info.base_attr.domain;
			}

			if (str5) {
				system_info.base_attr.domains = str5;
			}else{
				system_info.base_attr.domains = system_info.base_attr.domain;
			}

			if (str6) {
				system_info.base_attr.cookieDomain = str6;
			}else{
				system_info.base_attr.domains = system_info.base_attr.domain;
			}

			system_info.init_language();
			if (system_info.base_attr.local_language == "en") {
				system_info.base_attr.scrollPosition = "right";
			}
			load_data_js_util.init_data_folder();
		};

		this.init_language=function() {
		var language = cookie_util.get_cookie(cookie_util.base_attr.locale);
		var language_cookie_is_null = false;
		if (!language || language == '' || language == 'null') {
			language_cookie_is_null =  true;
			if (navigator.userLanguage) {
				language = navigator.userLanguage.substring(0, 2).toLowerCase();
			} else {
				language = navigator.language.substring(0, 2).toLowerCase();
			}
		}
		if(language == 'en' || language == 'ar'){
			system_info.base_attr.local_language = language;
		}
		if(language_cookie_is_null){
			cookie_util.add_or_update_cookie(cookie_util.base_attr.locale,system_info.base_attr.local_language,7*24*60*60*1000);
		}
	};
};

	var cookie_util = window['cookie_util'] = new function(){
	this.base_attr={
		login_key:"loginKey",
		login_name:"login_name",
		user_info:"login_userinfo",
		goods_num:"login_goods_num",
		rank:"rank",
		recharge_state:"rcg",
		locale:"locale",
		twitter_token:"twitter-token",
		twitter_tokenSecret:"twitter-tokenSecret",
		data_resource_folder:"data_resource_folder",
		is_register:'is_reg',
		login_auto_key:'login_auto_key',
		login_auto_type:'login_auto_type',
		last_view:'last_view',
		eid_festival:'e_f_s',
		task_update:'task_update',
		guide_step1:'guide_step1',
		guide_step2:'guide_step2',
		room_logo:'room_logo',
		room_step1:'room_step1',
		room_step2:'room_step2',
		room_step3:'room_step3',
		room_step4:'room_step4',
		room_step5:'room_step5',
		room_step6:'room_step6',
		room_step7:'room_step7',
		room_step8:'room_step8'
	};
	this.get_cookie=function(cookie_name) {
		if(!cookie_name || cookie_name == ''){
			return null;
		}
		var reg = new RegExp("(^| )" + cookie_name + "=([^;]*)(;|$)");
		var arr = document.cookie.match(reg);
		if (arr) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	};
	this.add_or_update_cookie=function(cookie_name,cookie_val,time){
		if(!cookie_name || cookie_name == ''){
			return;
		}
		var cookie_str = cookie_name+"="+escape(cookie_val)+";";
		if(time > 0){
			var date=new Date();
			date.setTime(date.getTime()+time);
			cookie_str+="expires="+date.toGMTString()+";";
		}
		cookie_str+="path=/;domain="+system_info.base_attr.cookieDomain+";";
		document.cookie=cookie_str;
	};
	this.delete_cookie=function(cookie_name){
		if(!cookie_name || cookie_name == ''){
			return;
		}
		var date=new Date();
		date.setTime(date.getTime()-10000);
		document.cookie=cookie_name+"=; expires="+date.toGMTString()+";path=/;domain="+system_info.base_attr.cookieDomain+";";
	};
};

	var load_util = window['load_util']=new function(){
	this.load=function(url) {
		var name = url.replace(/^\s|\s$/g, '');
		var att = name.split('?');
		var ext = att[0].toLowerCase().split('.');
		var isCSS = ext[ext.length - 1] == 'css';
		if (isCSS) {
			url = url ? ' href="' + url + '" ' : '';
			if (url != '') {
				document.write('<link rel="stylesheet" type="text/css" ' + url + ' charset="utf-8"/>');
			}
		} else {
			url = url ? ' src="' + url + '" ' : '';
			if (url != '') {
				document.write('<script type="text/javascript" ' + url + ' charset="utf-8"></script>');
			}
		}
	};

	this.get_version=function(version_name) {
		try {
			if (version_data) {
				var version = version_data[version_name];
				if (version) {
					return version;
				}
			}
		} catch (e) {
			return (new Date()).getTime();
		}
		return (new Date()).getTime();
	};
};

	var load_system_js_util= window['load_system_js_util']=new function(){
	this.default_version= "1.08";
	this.load=function(url,version){
		if(!url || url == ""){
			return;
		}
		if(!version || version == ""){
			version  = load_system_js_util.default_version;
		}
		load_util.load(system_info.base_attr.sysResource + url+"?v=" +version);
	};

	//加载jquery
	this.load_jquery=function(){
		load_system_js_util.load("js_1.0/jquery.js");
		load_system_js_util.load("js_1.0/jquery.json-2.4.min.js");
		load_system_js_util.load("js_1.0/jquery.i18n.properties-1.0.9.js");
	};

	//房间逻辑
	this.load_live_room=function(){
		load_system_js_util.load("js_1.0/live_room.js");
	};

	//登录逻辑
	this.load_login=function(){
		load_system_js_util.load("js_1.0/login.js");
	};

	//flash
	this.load_swf=function(){
		load_system_js_util.load("js_1.0/swfobject.js");
	};

	//根据js
	this.load_top=function(){
		load_system_js_util.load("js_1.0/top.js");
	};

	//根据js
	this.load_util=function(){
		load_system_js_util.load("js_1.0/util.js");
	};

	//统计js
	this.load_promotion=function(){
		load_system_js_util.load("js_1.0/promotion.js");
	};

	//google跟踪
	this.load_google_analytics=function(){
		load_system_js_util.load("js_1.0/google_analytics.js");
	};


	//首页js
	this.load_index_js=function(){
		load_system_js_util.load("js_1.0/index.js");
	};

	this.load_index_active=function(){
		load_system_js_util.load("js_1.0/index_active.js");
	};

	this.load_index_right=function(){
		load_system_js_util.load("js_1.0/index_right.js");
	};

	this.load_index_left=function(){
		load_system_js_util.load("js_1.0/index_left.js");
	};

	this.load_sign=function(){
		load_system_js_util.load("js_1.0/sign.js");
	};

	//首页其他效果
	this.load_hoverdir=function(){
		load_system_js_util.load("js_1.0/jquery.hoverdir.js");
	};

	this.load_modernizr=function(){
		load_system_js_util.load("js_1.0/modernizr.js");
	};

	this.load_modernizrCus=function(){
		load_system_js_util.load("js_1.0/modernizr.custom.js");
	};

	this.load_masonry=function(){
		load_system_js_util.load("js_1.0/masonry.pkgd.min.js");
	};

	this.load_imagesloaded=function(){
		load_system_js_util.load("js_1.0/imagesloaded.js");
	};

	this.load_classie=function(){
		load_system_js_util.load("js_1.0/classie.js");
	};

	this.load_AnimOnScroll=function(){
		load_system_js_util.load("js_1.0/AnimOnScroll.js");
	};

	this.load_bxslider=function(){
		load_system_js_util.load("js_1.0/jquery.bxslider.min.js");
	};

	this.load_fitvids=function(){
		load_system_js_util.load("js_1.0/jquery.fitvids.js");
	};

	this.load_eid_festival=function(){
		load_system_js_util.load("js_1.0/eid_festival.js");
	};

	this.load_eid_festival_mobile=function(){
		load_system_js_util.load("js_1.0/eid_festival_mobile.js");
	};

};

	var load_data_js_util = window['load_data_js_util']=new function(){
	this.default_version = (new Date()).getTime();
	this.data_resource_folder = 'data';

	this.init_data_folder=function () {
		var folder = cookie_util.get_cookie(cookie_util.base_attr.data_resource_folder);
		if (!folder || folder == '' || folder == 'null') {
			folder = "data";
		}
		load_data_js_util.data_resource_folder = folder;
	};

	this.load=function(url,version){
		if(!url || url == ""){
			return;
		}
		var version_val = null;
		if(version && version != ""){
			version_val  = load_util.get_version(version);
		}

		if(!version_val || version_val == ""){
			version_val  = load_data_js_util.default_version;
		}
		load_util.load(system_info.base_attr.staticResource + url+"?v=" +version_val);
	};

	//加载数据文件版本
	this.load_version=function() {
		load_data_js_util.load("data/version.js");
	};

	//加载活动数据
	this.load_active=function() {
		load_data_js_util.load("data/" + system_info.base_attr.local_language + "_active.js?","active");
	};

	//加载房间分类
	this.load_room_type=function() {
		load_data_js_util.load("data/room_type.js","roomType");
		load_data_js_util.load("data/" + system_info.base_attr.local_language + "_room_type_language_data.js","roomType");
	};

	//加载所有主播数据
	this.load_all_host=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/all_host.js","allHost");
	};

	//加载主播排班数据
	this.load_all_host_schedule=function() {
		load_data_js_util.load("data/showschedule.js","showschedule");
	};

	//加载金币商城数据
	this.load_balance=function() {
		load_data_js_util.load("data/balance.js","balance");
	};

	//加载表情数据
	this.load_face=function() {
		load_data_js_util.load("data/face.js","face");
	};

	//加载礼物类型数据
	this.load_gift_type=function() {
		load_data_js_util.load("data/gift_type.js","giftType");
		load_data_js_util.load("data/" + system_info.base_attr.local_language + "_gift_type_language_data.js","giftType");
	};

	//加载礼物数据
	this.load_gift=function() {
		load_data_js_util.load("data/gift.js","gift");
	};

	this.load_gift_language=function () {
		load_data_js_util.load("data/" + system_info.base_attr.local_language + "_gift_language_data.js","gift");
	};

	//加载主播等级数据
	this.load_host_level=function() {
		if(typeof(host_level_data) == 'undefined'){
			load_data_js_util.load("data/host_level.js","hostLevel");
		}
	};

	//加载直播主播数据
	this.load_host_live=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/host_live.js","liveHost");
	};

	//加载用户财富等级
	this.load_rich_level=function() {
		if(typeof(rich_level_data) == 'undefined'){
			load_data_js_util.load("data/rich_level.js","richLevel");
		}
	};

	//
	this.load_room_adver=function() {
		load_data_js_util.load("data/room_adver.js","adver");
	};

	//加载系统默认数据
	this.load_sys_data=function() {
		load_data_js_util.load("data/sys_data.js","system");
	};

	//加载礼物榜单数据
	this.load_top_gift=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_gift_data.js","topGift");
	};

	//加载今日礼物榜单
	this.load_top_today_gift=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_today_gift_data.js","topTodayGift");
	};

	this.load_top_last_week=function() {
		load_data_js_util.load("data/top_last_week.js","topLastWeek");
	};

	this.load_top_new_week=function() {
		load_data_js_util.load("data/top_now_week.js","topNowWeek");
	};

	//加载人气榜单
	this.load_top_popu=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_popu_data.js","topPopu");
	};

	//加载今日人气榜单
	this.load_top_today_popu=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_today_popu_data.js","topTodayPopu");
	};

	//加载财富榜单
	this.load_top_rich=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_rich_data.js","topRich");
	};

	//加载今日财富榜单
	this.load_top_today_rich=function() {
		load_data_js_util.load(load_data_js_util.data_resource_folder + "/top_today_rich_data.js","topTodayRich");
	};

	//加载vip等级信息
	this.load_vip_level=function() {
		load_data_js_util.load("data/vip_level.js","vipLevel");
	};

	//加载vip商城数据
	this.load_vip=function() {
		load_data_js_util.load("data/vip.js","vip");
	};

	//加载任务数据
	this.load_task=function() {
		load_data_js_util.load("data/task_data.js","task");
		load_data_js_util.load("data/" + system_info.base_attr.local_language + "_task_language_data.js","task");
	};

	//加载房间视频数据
	this.load_live_video=function() {
		load_data_js_util.load("data/live_video_data.js","liveVideo");
	};

	//加载升级获得特权数据
	this.load_privilege_info=function() {
		load_data_js_util.load("data/level_privilege.js","privilegeInfo");
	};

	//加载开斋节排行榜数据
	this.load_activity_gift_rank=function() {
		load_data_js_util.load("data/activity_gift_rank.js","activityGiftRank");
	};

	//加载开斋节排行榜数据
	this.load_activity_gift_rank_mobile=function() {
		load_data_js_util.load("data/activity_gift_rank_h5.js","activityGiftRankMobile");
	};

	this.load_ramadan_list=function() {
		load_data_js_util.load("short_term/ramadan_list.js","ramadanList");
	};

	this.load_winners_list=function() {
		load_data_js_util.load("short_term/winners.js","winnersList");
	};


	this.load_sys_data_js=function () {
		load_data_js_util.load( "data/sys_data.js","system");
	};


};

	var load_css_util = window['load_css_util']=new function(){
	this.default_version = "1.07";
	this.load=function(url,version){
		if(!url || url == ""){
			return;
		}
		if(!version || version == ""){
			version  = load_css_util.default_version;
		}
		load_util.load(system_info.base_attr.sysResource + url+"?v=" +version);
	};

	this.load_agreement=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/agreement.css");
	};

	this.load_download=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/download.css");
	};

	this.load_enroll=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/enroll.css");
	};

	this.load_findpwd=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/findpwd.css");
	};

	this.load_guide=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/guide.css");
	};

	this.load_help_phone=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/help_phone.css");
	};

	this.load_jcrop=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/jcrop.css");
	};

	this.load_level=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/level.css");
	};

	this.load_levelh5=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/level_h5.css");
	};

	this.load_live_room=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/live_room_3.css");
	};

	this.load_load_page=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/load_page.css");
	};

	this.load_login=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/login_3.css");
	};

	this.load_openning_soon=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/new_openning_soon.css");
	};

	this.load_page404=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/new_page404.css");
	};

	this.load_upgrade=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/new_upgrade.css");
	};

	this.load_user=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/new_user.css");
	};

	this.load_page=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/page.css");
	};

	this.load_pub_page=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/pub_page.css");
	};

	this.load_rank=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/rank.css");
	};

	this.load_reset=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/reset_3.css");
	};

	this.load_support=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/support.css");
	};

	this.load_survey=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/survey.css");
	};

	this.load_task=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/task.css");
	};

	this.load_top=function() {
		load_css_util.load( "cssNew/" + system_info.base_attr.local_language + "/udtop.css");
	};

	this.load_web_home=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/web_home.css");
	};

	this.load_slider=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/jquery.bxslider.css");
	};

	this.load_eid=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/eid_festival.css");
	};

	this.load_eid_mobile=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/eid_festival_mobile.css");
	};
	this.load_concert=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/concert.css");
	};
	this.load_concert_mobile=function() {
		load_css_util.load("cssNew/" + system_info.base_attr.local_language + "/concert_mobile.css");
	};
};

	var load_page_util = window['load_page_util']=new function(){
	this.base_attr={
		load_base_js_state:0
	};

	this.load_base_js=function(){
		if(load_page_util.base_attr.load_base_js_state == 0){
			load_page_util.base_attr.load_base_js_state = 1;
			load_system_js_util.load_jquery();
			load_system_js_util.load_util();
			load_system_js_util.load_top();
			load_system_js_util.load_promotion();
			load_system_js_util.load_google_analytics();
			load_page_util.base_attr.load_base_js_state = 2;
			load_data_js_util.load_privilege_info();
			load_system_js_util.load_sign();
		}
	};

	this.load_index_css=function(){
		//load_css_util.load_guide();
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_web_home();
		load_css_util.load_slider();
	};

	this.load_top=function(){
		load_css_util.load_login();
		load_css_util.load_findpwd();
		load_page_util.load_base_js();
		load_data_js_util.load_ramadan_list();
	};

	this.load_active=function(){
		load_data_js_util.load_active();
		//load_system_js_util.load_modernizr();
		//load_system_js_util.load_boxslider();
		load_system_js_util.load_index_active();
		load_system_js_util.load_bxslider();
		load_system_js_util.load_sign();
	};

	this.load_index_js=function(){
//		load_css_util.load_login();
//		load_css_util.load_findpwd();
//		load_page_util.load_base_js();
//		load_system_js_util.load_top();
//		load_data_js_util.load_sys_data_js();
//		load_data_js_util.load_rich_level();
//		load_data_js_util.load_all_host();
//		load_system_js_util.load_other_jquery();
//		load_system_js_util.load_index_js();
	};

	this.load_index_right_js=function(){
		load_page_util.load_base_js();
		if(load_page_util.base_attr.load_base_js_state == 2){
			load_data_js_util.load_all_host_schedule();
			load_system_js_util.load_index_right();
		}else{
			setTimeout(load_page_util.load_index_right_js(), 500);
		}
	};

	this.load_index_left_js=function(){
		load_page_util.load_base_js();
		if(load_page_util.base_attr.load_base_js_state == 2){
			load_system_js_util.load_index_left();
			load_system_js_util.load_modernizrCus();
			load_system_js_util.load_hoverdir();
			load_system_js_util.load_masonry();
			load_system_js_util.load_imagesloaded();
			load_system_js_util.load_classie();
			load_system_js_util.load_AnimOnScroll();
		}else{
			setTimeout(load_page_util.load_index_left_js(), 500);
		}
	};

	this.load_room_css=function(){
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_live_room();
	};

	this.load_level_css=function() {
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_level();
	};

	this.load_room_js=function(){
		load_page_util.load_top();
		if(load_page_util.base_attr.load_base_js_state == 2){
			load_system_js_util.load_swf();
			load_data_js_util.load_sys_data_js();
			load_data_js_util.load_live_video();
			load_data_js_util.load_host_level();
			load_data_js_util.load_rich_level();
			load_data_js_util.load_all_host_schedule();
			//load_data_js_util.load_activity_gift_rank();
			load_system_js_util.load_live_room();
			load_data_js_util.load_winners_list();
			load_system_js_util.load_sign();
		}else{
			setTimeout(load_page_util.load_room_js(), 500);
		}
	};

	this.load_rank_css=function(){
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_rank();
	};

	this.load_rank_js=function(){
		load_data_js_util.load_host_level();
		load_data_js_util.load_rich_level();
		//加载礼物榜单数据
		load_data_js_util.load_top_gift();

		//加载今日礼物榜单
		load_data_js_util.load_top_today_gift();

		load_data_js_util.load_top_last_week();

		load_data_js_util.load_top_new_week();

		//加载人气榜单
		load_data_js_util.load_top_popu();

		//加载今日人气榜单
		load_data_js_util.load_top_today_popu();

		//加载财富榜单
		load_data_js_util.load_top_rich();

		//加载今日财富榜单
		load_data_js_util.load_top_today_rich();
		load_system_js_util.load_sign();
	};

	this.load_eid_css=function(){
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_eid();
	};

	this.load_activity_js=function(){
		load_page_util.load_top();
		load_system_js_util.load_eid_festival();
		load_data_js_util.load_activity_gift_rank();
		load_system_js_util.load_sign();
	};

	this.load_activity_mobile_js=function(){
		load_page_util.load_top();
		load_system_js_util.load_eid_festival_mobile();
		load_data_js_util.load_activity_gift_rank_mobile();
		load_system_js_util.load_sign();
	};

	this.load_eid_mobile_css=function(){
		load_css_util.load_eid_mobile();
	};

	this.load_concert_js=function(){
		load_page_util.load_base_js();
		load_system_js_util.load_fitvids();
		load_system_js_util.load_sign();
	};

	this.load_concert_css=function(){
		load_css_util.load_reset();
		load_css_util.load_top();
		load_css_util.load_concert();
	};

	this.load_concert_mobile_css=function(){
		load_css_util.load_concert_mobile();
	};
};
});