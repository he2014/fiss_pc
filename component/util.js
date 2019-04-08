define(function(require,exports,module){
	require('wheel/jquery');
	var system_util = window['system_util'] = new function() {

		this.locale = null;
		this.init_locale = function() {
			jQuery.i18n.properties({
				name: 'message',
				path: system_info.base_attr.domain + 'i18n/',
				mode: 'map',
				language: system_info.base_attr.local_language,
				cache: false,
				encoding: 'UTF-8',
				callback: function() {
					system_util.locale = $.i18n;
				}
			});
		};
		
		this.add_or_update_language = function(language) {
			if (language && $.trim(language) != '') {
				cookie_util.add_or_update_cookie(cookie_util.base_attr.locale, $.trim(language), 7 * 24 * 50 * 60 * 1000);
				var queryParam = system_util.get_url_param("lg");
				location.href = location.href.replace("lg=" + queryParam, '');
			}
		};

		this.get_language_desc = function(code) {
			if (system_util.locale == null) {
				system_util.init_locale();
			}
			return system_util.locale.prop(code);
		};

		this.get_language_desc_param = function(code, param) {
			if (system_util.locale == null) {
				system_util.init_locale();
			}
			return string_util.format(system_util.locale.prop(code), param);
		};

		this.get_error_message = function(code) {
			var temp_code = "0000" + code;
			return system_util.get_language_desc(temp_code.substring(temp_code.length - 4));
		};

		this.get_error_message_param = function(code, param) {
			var temp_code = "0000" + code;
			return system_util.get_language_desc_param(temp_code.substring(temp_code.length - 4), param);
		};

		this.add_recharge_state_cookie = function() {
			cookie_util.add_or_update_cookie(cookie_util.base_attr.recharge_state, 1, 30 * 24 * 60 * 60 * 1000);
		};

		this.get_recharge_state = function() {
			return cookie_util.get_cookie(cookie_util.base_attr.recharge_state);
		};

		this.clear_trd_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.login_name);
			cookie_util.delete_cookie(cookie_util.base_attr.twitter_token);
			cookie_util.delete_cookie(cookie_util.base_attr.twitter_tokenSecret);
		};

		this.clear_rank_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.rank);
		};

		this.clear_login_key_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.login_key);
		};

		this.clear_login_auto_key_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.login_auto_type);
			cookie_util.delete_cookie(cookie_util.base_attr.login_auto_key);
		};

		this.clear_user_info_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.user_info);
		};

		this.clear_goods_num_cookie = function() {
			cookie_util.delete_cookie(cookie_util.base_attr.goods_num);
		};

		this.clear_all_cookie = function() {
			system_util.clear_login_key_cookie();
			system_util.clear_login_auto_key_cookie();
			system_util.clear_user_info_cookie();
			system_util.clear_goods_num_cookie();
		};

		this.get_last_view_cookie = function() {
			var last_view = cookie_util.get_cookie(cookie_util.base_attr.last_view);
			if (last_view) {
				return JSON.parse(last_view);
			}
		};

		this.add_last_view_cookie = function(obj) {
			var array = system_util.get_last_view_cookie();
			if (!array) {
				array = new Array();
				array.push(obj);
			} else {
				var bool = false;
				$.each(array, function(idx, last_view_obj) {
					if (last_view_obj && last_view_obj.r == obj.r) {
						last_view_obj.t = obj.t;
						bool = true;
						return false;
					}
				});

				if (!bool) {
					array.push(obj);
					if (array.length > 3) {
						array = array.sort(system_util.last_view_sort());
						array.pop();
					}
				}
			}
			cookie_util.add_or_update_cookie(cookie_util.base_attr.last_view, JSON.stringify(array), 30 * 24 * 60 * 60 * 1000);
		};

		this.last_view_sort = function() {
			return function(a, b) {
				return b.t - a.t;
			};
		};

		this.open_win = function(url) {
			if (url && $.trim(url) != '') {
				var a = document.createElement("a");
				a.setAttribute("href", $.trim(url));
				a.setAttribute("target", "_blank");
				$("body").append(a);
				a.click();
				$(a).remove();
			}
		};

		this.remove_html_tag = function(str) {
			if ($.trim(str) != '') {
				str = str.replace(/<\/?[^>]*>/g, '');
				/** 去除HTML tag* */
				str = str.replace(/[ | ]*\n/g, '\n');
				/** 去除行尾空白* */
				/** str = str.replace(/\n[\s| | ]*\r/g,'\n');* */
				/** 去除多余空行* */
				str = str.replace(/ /ig, '');
				/** 去掉 */
				return str;
			}
			return '';
		};

		this.check_email = function(email) {
			if ($.trim(email) == '') {
				return false;
			}
			email = $.trim(email);
			var reg = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (!reg.test(email)) {
				return false;
			}
			var exts = new Array("com", "net", "org", "edu", "gov", "int", "mil", "cn", "tel", "biz", "cc", "tv", "info", "name", "hk", "mobi", "asia", "cd", "travel", "pro", "museum", "coop", "aero", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cq", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "es", "et", "ev", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gh", "gi", "gl", "gm", "gn", "gp", "gr", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "io", "iq",
				"ir", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "mg", "mh", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nt", "nu", "nz", "om", "qa", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pt", "pw", "py", "re", "ro", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "va", "vc", "ve", "vg", "vn", "vu", "wf", "ws", "ye", "yu", "za",
				"zm", "zr", "zw");
			var userexts = email.split('.');
			var userext = userexts[userexts.length - 1];
			if (jQuery.inArray(userext, exts) < 0) {
				return false;
			}
			return true;
		};

		this.check_name = function(user_name) {
			if (!$.trim(user_name)) {
				return false;
			}
			user_name = $.trim(user_name);
			//var key1 = [ "anchor", "official", "admin", "seven najm", "seven nujoom", "najm", "7najm", "server", "system", "admin", "fuck", "shit", "7nujoom", "nujoom", ".", "http://", "@", "'", '"', "\\", "/", "av", "jb", "sb", "jj", "&", "%", "系统", "运营", "管理员", "消息", "中奖", "客服", "公告", "我操", "我日你妈", "脱", "拖", "托", "操你妈", "你好难看呀", "我想操你", "我想干你", "你中奖了", "几吧", "煞笔", "baobei", "就约我吧", "我草", "叼", "卧槽", "色情", "情色", "a片", "毛片", "女优", "妓女", "鸭子", "游客" ];
			var key1 = [];
			for (var i = 0; i < key1.length; i++) {
				var str1 = key1[i];

				if (user_name.indexOf(str1) >= 0)
					return false;
			}

			//var key2 = [ [ "系", "统" ], [ "客", "服" ], [ "公", "告" ], [ "中", "奖" ], [ "官", "方" ], [ "消", "息" ], [ "运", "营" ], [ "巡", "管" ] ];
			var key2 = [];
			for (var j = 0; j < key2.length; j++) {
				var str2 = key2[j];
				for (var k = 0; k < str2.length; k++) {
					if (user_name.indexOf(str2[k]) >= 0) {
						if (k == str2.length - 1)
							return false;
					} else
						break;
				}
			}
			return true;
		};

		this.get_byte_length = function(str) {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) > 255) {
					len += 2;
				} else {
					len += 1;
				}
			}
			return len;
		};

		this.is_show = function(id) {
			var is_show = $("#" + id).css("display");
			if (is_show == "" || is_show == "none") {
				return false;
			} else if (is_show == "block") {
				return true;
			}
			return false;
		};

		this.date_format_hm = function() {
			var date = new Date();
			return (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
		};

		this.is_int = function(str) {
			var ex = /^\d+$/;
			return ex.test(str);
		};

		this.load_async = function(url, obj, back_fun) {
			if (!url || url == '') {
				return;
			}

			// if(url.indexOf("all_host") > 0){
			// $.getJSON('http://static.7nujoom.com/resource/data/all_host.json',function(data,status,xhr){
			// xhr=null;
			// all_host_data = data;
			// data = null;
			// var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] :
			// null;
			// if(obj_fun){
			// setTimeout(function(){obj_fun();},10);
			// }
			// });
			// var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] :
			// null;
			// if(obj_fun){
			// setTimeout(function(){obj_fun();},10);
			// }
			// return;
			// }

			// var head = typeof document != 'undefined' && (document.head ||
			// document.getElementsByTagName('head')[0]);
			// var script = document.createElement("script");
			// script.type = "text/javascript";
			// if (script.readyState) {
			// script.onreadystatechange = function () {
			// if (script.readyState == "loaded" || script.readyState == "complete")
			// {
			// script.onreadystatechange = null;
			// var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] :
			// null;
			// if(obj_fun){
			// setTimeout(function(){obj_fun();},10);
			// }
			// }
			// };
			// } else {
			// script.onload = function () {
			// var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] :
			// null;
			// if(obj_fun){
			// setTimeout(function(){obj_fun();},10);
			// }
			// };
			// }
			// script.src = url;
			// head.appendChild(script);

			jQuery.getScript(url).done(function() {
				var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] : null;
				if (obj_fun) {
					setTimeout(function() {
						obj_fun();
					}, 10);
				}
			}).fail(function() {
				setTimeout(function() {
					system_util.load_async(url, obj, back_fun);
				}, 1000);
			});
		};

		this.load_lazy_img = function(id) {
			$.each($("#" + id + " img[is_lazy='false']"), function() {
				$(this).attr("src", $(this).attr("lazy_src"));
				$(this).attr("is_lazy", true);
			});
		};

		this.get_swf_obj = function(id) {
			if (navigator.appName.indexOf("Microsoft") == -1) {
				if (document.embeds && document.embeds[id]) {
					return document.embeds[id];
				}
			}
			if (window.document[id]) {
				return window.document[id];
			}
			if (window[id]) {
				return window[id];
			}
			if (document[id]) {
				return document[id];
			}
		};

		this.get_url_param = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		};

		this.get_random_num = function(Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return (Min + Math.round(Rand * Range));
		};

		this.clear_timer = function(timer) {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		};
	};

	var string_util = window['string_util'] = new function() {
		this.special_replace = function(str) {
			if (!str || $.trim(str) == '') {
				return "";
			}
			return str.replace(/\n/g, " ").replace(/\r/g, " ").replace(/\b/g, "").replace(/\f/g, "").replace(/\t/g, "").replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
		};

		this.format = function() {
			if (arguments.length == 0) {
				return "";
			}
			var str = arguments[0];
			for (var i = 1, len = arguments.length; i < len; i++) {
				var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
				str = str.replace(re, arguments[i]);
			}
			return str;
		};

		this.start_with = function(str, start) {
			if (str == null || str == "" || str.length == 0 || start == null || start == "" || start.length == 0 || start.length > s.length) {
				return false;
			}
			if (str.substr(0, start.length) == str) {
				return true;
			} else {
				return false;
			}
		};

		this.end_with = function(str, end) {
			if (str == null || str == "" || str.length == 0 || end == null || end == "" || end.length == 0 || end.length > s.length) {
				return false;
			}
			if (str.substring(str.length - end.length) == str) {
				return true;
			} else {
				return false;
			}
		};

		this.replace_html = function(str) {
			if (!str) {
				return null;
			}
			return $.trim(str).replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;")
		};
	};

	var system_data_util = window['system_data_util'] = new function() {
		this.load_async = function(url, version_name, obj, obj_fun) {
			var version = null;
			if (version_name && typeof(version_data) != 'undefined') {
				version = version_data[$.trim(version_name)];
			}
			if (!version) {
				version = (new Date()).getTime()
			}
			system_util.load_async(url + "?v=" + version, obj, obj_fun);
		};

		this.load_async_system_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/system/system_data.js";
			system_data_util.load_async(url, 'system', obj, obj_fun);
		}
		this.load_async_fragment_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/fragment/fragment_data.js";
			system_data_util.load_async(url, 'fragment', obj, obj_fun);
		}

		this.load_async_fragment_compound_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/fragment/fragment_compound_data.js";
			system_data_util.load_async(url, 'fragment_compound', obj, obj_fun);
		}

		this.load_async_badge_level_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/leve/badge_level_data.js";
			system_data_util.load_async(url, 'badgeLevel', obj, obj_fun);
		}
		this.load_async_host_level_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + load_data_js_util.data_resource_folder + "/host_level.js";
			system_data_util.load_async(url, 'hostLevel', obj, obj_fun);
		};

		this.load_async_rich_level_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + load_data_js_util.data_resource_folder + "/rich_level.js";
			system_data_util.load_async(url, 'richLevel', obj, obj_fun);
		};

		this.load_async_all_host_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/all_host.js";
			system_data_util.load_async(url, 'allHost', obj, obj_fun);
		};

		this.load_async_host_live_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + load_data_js_util.data_resource_folder + "/host_live.js";
			system_data_util.load_async(url, 'liveHost', obj, obj_fun);
		};

		this.load_async_infoClass_language_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/" + system_info.base_attr.local_language + "_infoClass_language_data.js";
			system_data_util.load_async(url, 'infoClass', obj, obj_fun);
		};

		this.load_async_infoClass_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/infoClass.js?";
			system_data_util.load_async(url, 'infoClass', obj, obj_fun);
		};

		this.load_async_gift_type_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/gift_type.js";
			system_data_util.load_async(url, 'giftType', obj, obj_fun);
		};

		this.load_async_gift_type_language_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/" + system_info.base_attr.local_language + "_gift_type_language_data.js";
			system_data_util.load_async(url, 'giftType', obj, obj_fun);
		};

		this.load_async_gift_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/gift.js";
			system_data_util.load_async(url, 'gift', obj, obj_fun);
		};

		this.load_async_gift_language_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/" + system_info.base_attr.local_language + "_gift_language_data.js";
			system_data_util.load_async(url, 'gift', obj, obj_fun);
		};

		this.load_async_falce_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/face.js";
			system_data_util.load_async(url, 'face', obj, obj_fun);
		};
		this.load_async_live_video_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/live_video_data.js";
			system_data_util.load_async(url, 'liveVideo', obj, obj_fun);
		};

		this.load_async_level_privilege = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/level_privilege.js";
			system_data_util.load_async(url, 'privilegeInfo', obj, obj_fun);
		};

		this.load_async_task_language_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/" + system_info.base_attr.local_language + "_task_language_data.js";
			system_data_util.load_async(url, 'task', obj, obj_fun);
		};

		this.load_async_task_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/task_data.js";
			system_data_util.load_async(url, 'task', obj, obj_fun);
		};

		this.load_async_all_host = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/all_host.js";
			system_data_util.load_async(url, 'allHost', obj, obj_fun);
		};

		this.load_async_activity_gift_rank_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/activity_gift_rank.js";
			system_data_util.load_async(url, 'activityGiftRank', obj, obj_fun);
		};

		this.load_async_activity_gift_rank_data_mobile = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/activity_gift_rank_h5.js";
			system_data_util.load_async(url, 'activityGiftRankMobile', obj, obj_fun);
		};

		this.load_async_ramadan_list_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "short_term/ramadan_list.js";
			system_data_util.load_async(url, 'ramadanList', obj, obj_fun);
		};

		this.load_async_winners_list_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "short_term/winners.js";
			system_data_util.load_async(url, 'winnersList', obj, obj_fun);
		};

		this.load_async_top_gift_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/top_gift_data.js";
			system_data_util.load_async(url, 'topGift', obj, obj_fun);
		};

		this.load_async_top_popu_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/top_popu_data.js";
			system_data_util.load_async(url, 'topPopu', obj, obj_fun);
		};

		this.load_async_top_rich_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/top_rich_data.js";
			system_data_util.load_async(url, 'topRich', obj, obj_fun);
		};

		this.load_async_sign_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/sign/sign_data_new.js";
			system_data_util.load_async(url, 'sign', obj, obj_fun);
		};

		this.load_async_show_schedule_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/showschedule.js";
			system_data_util.load_async(url, 'showschedule', obj, obj_fun);
		};

		this.load_async_good_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "show/data/v2/good/good_data.js";
			system_data_util.load_async(url, 'good', obj, obj_fun);
		};

		this.load_async_chat_style_data = function(obj, obj_fun) {
			var url = system_info.base_attr.staticResource + "data/chat_style.js";
			system_data_util.load_async(url, 'chat_style', obj, obj_fun);
		};

		this.get_sys_data = function(key) {
			if (typeof(sys_data) != 'undefined') {
				return sys_data[key];
			}
			return null;
		};

		this.get_gift_info = function(gift_id) {
			if (typeof(gift_data) != 'undefined') {
				return gift_data[gift_id];
			} else {
				system_data_util.load_async_gift_data(null, null);
			}
			return null;
		};

		this.get_rich_level_info = function(level) {
			if (typeof(rich_level_data) != 'undefined') {
				return rich_level_data[level];
			} else {
				system_data_util.load_async_rich_level_data(null, null);
			}
			return null;
		};

		this.get_host_level_info = function(level) {
			if (typeof(host_level_data) != 'undefined') {
				return host_level_data[level];
			} else {
				system_data_util.load_async_host_level_data(null, null);
			}
			return null;
		};

		this.get_gift_language_info = function(gift_id) {
			if (typeof(gift_language_data) != 'undefined') {
				return gift_language_data[gift_id];
			} else {
				system_data_util.load_async_gift_language_data(null, null);
			}
			return null;
		};

		this.get_live_video_info = function(room_id) {
			if (typeof(live_video_data) != 'undefined') {
				return live_video_data[room_id];
			} else {
				system_data_util.load_async_show_schedule_data(null, null);
			}
			return null;
		};

		this.get_show_schedule_info = function(room_id) {
			if (typeof(show_schedule_data) != 'undefined') {
				return show_schedule_data[room_id];
			} else {
				system_data_util.load_async_live_video_data(null, null);
			}
			return null;
		};

		this.get_good_info = function(rich_level, vip_level) {
			var good_obj = null;
			if (typeof(good_data) != 'undefined') {
				var good_data1 = null,
					good_data2 = null;
				do {
					good_data1 = good_data["1_" + rich_level];
					if (!good_data1) {
						rich_level--;
					}
				} while (good_data1 == null && rich_level > 0);
				good_obj = {};
				good_obj.addGoodNum = (good_data1 ? parseInt(good_data1.addGoodNum) : 0) + (good_data2 ? parseInt(good_data2.addGoodNum) : 0);
				good_obj.subGoodTime = (good_data1 ? parseInt(good_data1.subGoodTime) : 0) + (good_data2 ? parseInt(good_data2.subGoodTime) : 0);
			} else {
				system_data_util.load_async_good_data(null, null);
			}
			return good_obj;
		};
	};

	var loading_tip = window['loading_tip'] = new function() {
		this.loading_body = function() {
			if ($("#loading").length < 1) {
				var loadImg = $('<img style="width:23px;height:23px;position:absolute;left:50%;margin-left:-11px;top:50%;margin-top:-11px;" src="' + (system_info.base_attr.sysResource + 'img/loading.gif') + '"/>');
				var loadDiv = $('<div style="width:100%;height:100%;position:fixed;background:rgba(0,0,0,.7);z-index:999;" id="loading"></div>');
				loadDiv.append(loadImg);
				$('body').append(loadDiv);
			}
			$("#loading").show();
		};

		this.loading_hide = function() {
			$("#loading").hide();
		};

		this.blackTip_alert = function(tip_username_html, controlId, tipCon, auto_close_time) {
			var tipDiv = null;
			if ($("#tip_font").length < 1) {
				tipDiv = $('<div id="tip_font" style="position: fixed;left:50%;margin-left:-130px;width:260px;display:table-cell;text-align:center;padding:8px 10px;color:#fff;background:rgba(0,0,0,.7);font-family:Arial;">' + $.trim(tipCon) + '</div>');
				tipDiv.css("left", ($(window).width() / 2 - $("#tip_font").innerWidth() / 2) + "px").css("top", ($(window).height() / 2 - $("#tip_font").innerHeight() / 2) + "px");
				$('body').append(tipDiv);
			} else {
				tipDiv = $("#tip_font");
			}
			$("#tip_font").html(tip_username_html);
			$("#" + controlId).text($.trim(tipCon));
			auto_close_time = auto_close_time ? auto_close_time : 3;
			setTimeout(function() {
				tipDiv.slideUp(function() {
					tipDiv.remove();
				});
			}, auto_close_time * 1000);
		};
	};

	var user_util = window['user_util'] = new function() {
		this.user_info = null;
		this.login_key = null;
		this.is_init_user_info = false;
		this.is_login = function(bool) {
			user_util.reload_user_info();
			if (!user_util.user_info) {
				if (bool) {
					var is_register = cookie_util.get_cookie(cookie_util.base_attr.is_register);
					if (is_register && is_register == 1) {
						login_util.show_login_div();
					} else {
						login_util.show_register_div();
					}
				}
				return false;
			} else {
				return true;
			}
		};

		this.init_user_info = function() {
			user_util.reload_user_info();
			// if (!user_util.user_info) {
			// 	var login_name = user_util.get_login_name();
			// 	if (login_name && $.trim(login_name).length > 0) {
			// 		$.ajax({
			// 			type: "post",
			// 			url: system_info.base_attr.domain + "user_init_user_info.fly",
			// 			dataType: 'json',
			// 			data: {
			// 				loginName: $.trim(login_name)
			// 			},
			// 			success: function(data) {
			// 				user_util.is_init_user_info = true;
			// 				if (data && data.code == 0) {
			// 					user_util.reset_user_info(data);
			// 				} else {
			// 					user_util.user_out();
			// 				}
			// 			},
			// 			error: function() {
			// 				user_util.is_init_user_info = true;
			// 				user_util.user_out();
			// 			}
			// 		});
			// 	} else {
			// 		user_util.is_init_user_info = true;
			// 		user_util.user_out();
			// 	}
			// } else {
				user_util.is_init_user_info = true;
		//	}
		};

		this.reload_user_info = function() {

			if (cookie_util) {
				user_util.login_key = cookie_util.get_cookie(cookie_util.base_attr.login_key);
				if (user_util.login_key && user_util.login_key != '') {
					var user_info_str = cookie_util.get_cookie(cookie_util.base_attr.user_info);
					if (user_info_str) {
						user_util.user_info = JSON.parse(user_info_str);
						return;
					}

					// $.ajax({
					// 	type: "post",
					// 	url: system_info.base_attr.domain + "user_init_user_info.fly",
					// 	dataType: 'json',
					// 	async: true,
					// 	success: function(data) {
                     //        console.log(data)
					// 		if (data && data.code == 0) {
					// 			user_util.update_user_info(data.dataInfo);
					// 			user_util.reload_user_info();
					// 			return;
					// 		}
					// 	}
					// });
				}
				user_util.login_key = null;
				user_util.user_info = null;
			}
		};

		this.reset_user_info = function(data) {
			if (data && data.code == 0) {
				user_util.update_login_key(data.loginKey, data.dataInfo.loginAutoKey, data.dataInfo.loginAutoType);
				user_util.update_user_info(data.dataInfo);
				user_util.reload_user_info();
			}
		}

		this.get_login_name = function() {
			return cookie_util.get_cookie(cookie_util.base_attr.login_name);
		};

		this.reset_user_info_blance = function(obj, back_fun) {
			$.ajax({
				url: system_info.base_attr.domain + "service/user/v3/property?bl",
				type: "get",
				dataType: "json",
				success: function(data) {
					if (data.code == 0) {
                        console.log(data)
                        var reBalance = data.dataInfo.returnBalance?data.dataInfo.returnBalance:0;
						user_util.update_user_info_balance(data.dataInfo.balance, reBalance);
						user_util.update_goods(data.dataInfo.good);
						var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] : null;
						if (obj_fun) {
							setTimeout(function() {
								obj_fun();
							}, 10);
						}
					} else if (data.code == 99) {
						user_util.user_out();
					}
				}
			});
		};

		this.update_user_info = function(user_info) {
			
			if (user_info) {
				user_util.user_info = user_info;
				cookie_util.add_or_update_cookie(cookie_util.base_attr.user_info, JSON.stringify(user_info), 10 * 24 * 60 * 60 * 1000);
				if (user_info.loginAutoType == 1) {
					cookie_util.add_or_update_cookie(cookie_util.base_attr.login_name, user_info.loginName, 30 * 24 * 60 * 60 * 1000);
				} else {
					cookie_util.delete_cookie(cookie_util.base_attr.login_name);
				}
				cookie_util.add_or_update_cookie(cookie_util.base_attr.is_register, 1, 30 * 24 * 60 * 60 * 1000);
			}
		};

		this.update_user_info_head_pic = function(head_pic) {
			user_util.reload_user_info();
			if (user_util.user_info) {
				user_util.user_info.headPic = head_pic;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.update_userinfo_nick_name = function(nick_name) {
			user_util.reload_user_info();
			if (user_util.user_info) {
				user_util.user_info.nickName = nick_name;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.update_user_info_attr = function(nick_name, sex, birthday) {
			user_util.reload_user_info();
			if (user_util.user_info) {
				user_util.user_info.nickName = nick_name;
				user_util.user_info.sex = sex;
				user_util.user_info.birthday = birthday;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.update_goods = function(num) {
			cookie_util.add_or_update_cookie(cookie_util.base_attr.goods_num, num, 0);
		};

		this.update_user_info_balance = function(balance, return_balance) {
			user_util.reload_user_info();
			if (user_util.user_info) {
				user_util.user_info.balance = balance;
				user_util.user_info.returnBalance = return_balance;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.add_user_return_balance = function(return_balance) {
			user_util.init_user_info();
			if (user_util.user_info) {
				user_util.user_info.returnBalance = user_util.user_info.returnBalance + return_balance;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.update_user_exp = function(exp, level) {
			user_util.reload_user_info();
			if (user_util.user_info && (user_util.user_info.richLevel <= level || user_util.user_info.richScore <= exp)) {
				user_util.user_info.richLevel = level;
				user_util.user_info.richScore = exp;
                console.log(user_util.user_info)
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.update_host_exp = function(exp, level) {
			user_util.reload_user_info();
			if (user_util.user_info && user_util.user_info.hostInfo && (user_util.user_info.hostInfo.hostLevel <= level || user_util.user_info.hostInfo.hostScore <= exp)) {
				user_util.user_info.hostInfo.hostLevel = level;
				user_util.user_info.hostInfo.hostScore = exp;
				user_util.update_user_info(user_util.user_info);
			}
		};

		this.get_nickname = function() {
			if (user_util.user_info) {
				return user_util.user_info.nickName;
			}
			return null;
		};

		this.get_level = function() {
			if (user_util.user_info) {
				if (user_util.user_info.hostInfo) {
					return user_util.user_info.hostInfo.hostLevel;
				} else {
					return user_util.user_info.richLevel;
				}
			}
			return 0;
		};

		this.get_level_score = function() {
			if (user_util.user_info) {
				if (user_util.user_info.hostInfo) {
					return user_util.user_info.hostInfo.hostScore;
				} else {
					return user_util.user_info.richScore;
				}
			}
			return 0;
		};

		this.get_user_info_blance = function() {
			if (user_util.user_info) {
				return user_util.user_info.balance + user_util.user_info.returnBalance;
			}
			return 0;
		};

		this.update_login_key = function(login_key, login_auto_key, login_auto_type) {
			if (!login_key) {
				user_util.user_out();
			} else {
				cookie_util.add_or_update_cookie(cookie_util.base_attr.login_key, login_key, 10 * 24 * 60 * 60 * 1000);
				cookie_util.add_or_update_cookie(cookie_util.base_attr.login_auto_key, login_auto_key, 7 * 24 * 60 * 60 * 1000);
				cookie_util.add_or_update_cookie(cookie_util.base_attr.login_auto_type, login_auto_type, 7 * 24 * 60 * 60 * 1000);
			}
		};

		this.user_out = function(obj, back_fun) {
			var login_key = user_util.login_key;
			user_util.user_info = null;
			user_util.login_key = null;
			system_util.clear_all_cookie();
			var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] : null;
			if (obj_fun) {
				setTimeout(function() {
					obj_fun();
				}, 10);
			}
			//$.ajax({
			//	url: system_info.base_attr.domain + "user_logout.fly",
			//	type: "post",
			//	dataType: "json",
			//	data: {
			//		loginKey: login_key
			//	},
             //   success:function(data){
             //       console.log(data)
             //   }
			//});

			login_util.init_facebook();
			login_util.init_google();
		};

		this.user_sure = function(obj, back_fun) {
			user_util.reload_user_info();
			if (!user_util.user_info) {
				user_util.user_out();
			} else {
				var obj_fun = back_fun ? window[obj][back_fun] : obj ? window[obj] : null;
				if (obj_fun) {
					setTimeout(function() {
						obj_fun();
					}, 10);
				}
			}
		};
	};
	//user_util.init_user_info();

	var to_page_util = window['to_page_util'] = new function() {
		this.to_pay = function() {
			if (!user_util.is_login(true)) {
				return;
			}
			window.location.href = system_info.base_attr.domain + "user/pay.shtml";
		};
		this.to_recharge = function() {
			if (!user_util.is_login(true)) {
				return;
			}
			system_util.open_win(system_info.base_attr.domain + "user/account/pay");
		};
		this.to_info = function() {
			if (!user_util.is_login(true)) {
				return;
			}
			system_util.open_win(system_info.base_attr.domain + "user/info.shtml");
		};
		this.to_favorite = function() {
			if (!user_util.is_login(true)) {
				return;
			}
			system_util.open_win(system_info.base_attr.domain + "user/followed");
		};
		this.to_room = function(surfing) {
			if (surfing) {
				system_util.open_win(system_info.base_attr.domain + "live/" + surfing);
			}
		};
		this.to_message = function() {
			if (!user_util.is_login(true)) {
				return;
			}
			$(".red_dot2").hide();
			system_util.open_win(system_info.base_attr.domain + "user/message");
		};
	};

	var promotion_util = window['promotion_util'] = new function() {
		this.base_attr = {
			promotion_pv: 1,
			promotion_paypal: 2,
			promotion_cashu: 3,
			promotion_operator: 4,
			promotion_install: 5,
			promotion_ikoo: 70001,
			promotion_ikoo_auth: 71001,
			promotion_adcash: 70008,
			promotion_google: 70007,
			promotion_google2_min: 700130,
			promotion_google2_max: 700139,
			promotion_google3: 10002001,
			promotion_mobvista: 10002002,
			promotion_google4: 700140,
			promotion_facebook: 10004,
			promotion_facebook2: 100041,
			promotion_facebook3: 10002801,
			promotion_onecard: 18001,
			promotion_visa: 18002,
			promotion_master: 18003,
			promotion_maxbounty: 900052,
			promotion_arabyads_egypt: 11002301,
			promotion_arabyads_gcc: 12002301,
			promotion_levant_gcc: 11002501,
			promotion_levant_egypt: 12002501,
			promotion_propellerads: 10002401,
			promotion_pixel: 12002901,
			promotion_noahmob: 10002201,
			promotion_noahmob2: 10002202,
			index_pv: 100,
			room_load_pv: 101,
			room_over_pv: 102,
			fb_share_load_pv: 103,
			mb_fb_share_load_pv: 104,
			hostwish_load_pv: 105,
			mb_hostwish_load_pv: 106
		};

		this.set_promotion = function(id) {
			cookie_util.add_or_update_cookie("promotion", id, 0);
		};

		this.get_promotion = function() {
			var promotion = cookie_util.get_cookie("promotion");
			if (promotion == null || promotion == undefined || promotion == '') {
				promotion = 0;
			}
			return promotion;
		};

		this.set_ikooid = function(ikooid) {
			cookie_util.add_or_update_cookie("ikooid", ikooid, 0);
		};

		this.set_propellerads = function(propellerads) {
			cookie_util.add_or_update_cookie("propellerads", propellerads, 0);
		};

		this.get_propellerads = function() {
			var propellerads = cookie_util.get_cookie("propellerads");
			if (propellerads == null || propellerads == undefined || propellerads == '') {
				propellerads = 0;
			}
			return propellerads;
		};

		this.set_arabyads = function(arabyads) {
			cookie_util.add_or_update_cookie("arabyads", arabyads, 0);
		};

		this.get_arabyads = function() {
			var arabyads = cookie_util.get_cookie("arabyads");
			if (arabyads == null || arabyads == undefined || arabyads == '') {
				arabyads = 0;
			}
			return arabyads;
		};

		this.set_levantnetwork = function(levantnetwork) {
			cookie_util.add_or_update_cookie("levantnetwork", levantnetwork, 0);
		};

		this.get_levantnetwork = function() {
			var levantnetwork = cookie_util.get_cookie("levantnetwork");
			if (levantnetwork == null || levantnetwork == undefined || levantnetwork == '') {
				levantnetwork = 0;
			}
			return levantnetwork;
		};

		this.get_ikooid = function() {
			var ikooid = cookie_util.get_cookie("ikooid");
			if (ikooid == null || ikooid == undefined || ikooid == '') {
				ikooid = 0;
			}
			return ikooid;
		};

		this.set_adcashid = function(adcashid) {
			cookie_util.add_or_update_cookie("adCashId", adcashid, 0);
		};

		this.get_adcashid = function() {
			var adcashid = cookie_util.get_cookie("adCashId");
			if (adcashid == null || adcashid == undefined || adcashid == '') {
				adcashid = 0;
			}
			return adcashid;
		};

		this.submit_user_register = function(userId) {
			var promotion = promotion_util.get_promotion();
			$.ajax({
				url: system_info.base_attr.domain + "user_supportUserRegister.fly?promotion=" + promotion + "&userId=" + userId,
				type: "get",
				async: false,
				cache: false,
				dataType: 'json',
				success: function(data) {},
				error: function(data) {}
			});
			if (promotion == promotion_util.base_attr.promotion_ikoo || promotion == promotion_util.base_attr.promotion_ikoo_auth) {
				promotion_util.register_user_ikoo(userId);
			} else if (promotion == promotion_util.base_attr.promotion_adcash) {
				promotion_util.register_user_adcash(userId);
			} else if (promotion == promotion_util.base_attr.promotion_google) {
				promotion_util.register_user_google(userId);
			} else if (promotion <= promotion_util.base_attr.promotion_google2_max && promotion >= promotion_util.base_attr.promotion_google2_min) {
				promotion_util.register_user_google2(userId);
			} else if (promotion == promotion_util.base_attr.promotion_google3) {
				promotion_util.register_user_google3(userId);
			} else if (promotion == promotion_util.base_attr.promotion_mobvista) {
				promotion_util.register_user_mobvista(userId);
			} else if (promotion == promotion_util.base_attr.promotion_google4) {
				promotion_util.register_user_google4(userId);
			} else if (promotion == promotion_util.base_attr.promotion_facebook || promotion == promotion_util.base_attr.promotion_facebook2) {
				promotion_util.register_user_facebook(userId);
			} else if (promotion == promotion_util.base_attr.promotion_facebook3) {
				promotion_util.register_user_facebook3(userId);
			} else if (promotion == promotion_util.base_attr.promotion_maxbounty) {
				promotion_util.register_user_maxbounty(userId);
			} else if (promotion == promotion_util.base_attr.promotion_arabyads_egypt) {
				promotion_util.register_user_arabyads_egypt(userId);
			} else if (promotion == promotion_util.base_attr.promotion_arabyads_gcc) {
				promotion_util.register_user_arabyads_gcc(userId);
			} else if (promotion == promotion_util.base_attr.promotion_propellerads) {
				promotion_util.register_user_propellerads(userId);
			} else if (promotion == promotion_util.base_attr.promotion_levant_egypt) {
				promotion_util.register_user_levant_egypt(userId);
			} else if (promotion == promotion_util.base_attr.promotion_levant_gcc) {
				promotion_util.register_user_levant_gcc(userId);
			} else if (promotion == promotion_util.base_attr.promotion_pixel) {
				promotion_util.register_user_levant_pixel(userId);
			} else if (promotion == promotion_util.base_attr.promotion_noahmob) {
				promotion_util.register_user_google_noahmob(userId);
			} else if (promotion == promotion_util.base_attr.promotion_noahmob2) {
				promotion_util.register_user_facebook_noahmob(userId);
			}
		};

		this.register_user_facebook_noahmob = function(userId) {
			var _fbq = window._fbq || (window._fbq = []);
			if (!_fbq.loaded) {
				var fbds = document.createElement("script");
				fbds.async = true;
				fbds.src = "//connect.facebook.net/en_US/fbds.js";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(fbds, s);
				_fbq.loaded = true;
			}
			window._fbq = window._fbq || [];
			window._fbq.push(["track", "6031941325844", {
				"value": "0.01",
				"currency": "USD"
			}]);
			//		$.ajax({
			//			url : "https://www.facebook.com/tr?ev=6031941325844&cd[value]=0.01&cd[currency]=USD&noscript=1",
			//			type : "get",
			//			async : false,
			//			success : function(data) {
			//			},
			//			error:function(data){
			//			}
			//		});
		};

		this.register_user_google_noahmob = function(userId) {
			var w = window;
			w.google_conversion_id = 944488453;
			w.google_conversion_label = "uUxfCJCa1l8QhYCvwgM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();
			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};

		this.register_user_levant_pixel = function(userId) {
			$.ajax({
				url: "http://tracking.crobo.com/aff_l?offer_id=14934&transaction_id=" + promotion_util.get_levantnetwork(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_levant_egypt = function(userId) {
			$.ajax({
				url: "https://levantnetwork.go2cloud.org/aff_lsr?offer_id=74&transaction_id=" + promotion_util.get_levantnetwork(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_levant_gcc = function(userId) {
			$.ajax({
				url: "https://levantnetwork.go2cloud.org/aff_lsr?offer_id=76&transaction_id=" + promotion_util.get_levantnetwork(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_propellerads = function(userId) {
			$.ajax({
				url: "http://ad.propellerads.com/conversion.php?aid=5164&pid=20256&tid=5801&visitor_id=" + promotion_util.get_propellerads(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_arabyads_egypt = function(userId) {
			$.ajax({
				url: "http://arabyads.go2cloud.org/aff_lsr?transaction_id=" + promotion_util.get_arabyads(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_arabyads_gcc = function(userId) {
			$.ajax({
				url: "http://arabyads.go2cloud.org/aff_lsr?transaction_id=" + promotion_util.get_arabyads(),
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_google = function(userId) {
			var w = window;
			w.google_conversion_id = 955423554;
			w.google_conversion_label = "KozPCJTlvVgQwrbKxwM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();

			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};

		this.register_user_google2 = function(userId) {
			var w = window;
			w.google_conversion_id = 954095749;
			w.google_conversion_label = "YPz7CKC-_1kQhbH5xgM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();

			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};

		this.register_user_google3 = function(userId) {
			var w = window;
			w.google_conversion_id = 951097802;
			w.google_conversion_label = "FBjpCLHcxVwQyrPCxQM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();

			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};


		this.register_user_mobvista = function(userId) {
			var w = window;
			w.google_conversion_id = 951291638;
			w.google_conversion_label = "kbQpCKTF410Q9p3OxQM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();

			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};

		this.register_user_google4 = function(userId) {
			var w = window;
			w.google_conversion_id = 947863548;
			w.google_conversion_label = "SmPwCPaY21wQ_P_8wwM";
			w.google_remarketing_only = false;
			w.google_conversion_format = "3";
			w.google_is_call = true;
			var opt = new Object();

			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		};

		this.register_user_maxbounty = function(userId) {
			var sub_id2 = system_util.get_url_param("sub_id2");
			if (!sub_id2) {
				sub_id2 = userId;
			}
			$.ajax({
				url: "http://www.maxbounty.com/lead_nc.asp?o=7801&r=cam&d=" + userId + "&i=" + sub_id2,
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		}

		this.register_user_facebook = function(userId) {
			var _fbq = window._fbq || (window._fbq = []);
			if (!_fbq.loaded) {
				var fbds = document.createElement("script");
				fbds.async = true;
				fbds.src = "//connect.facebook.net/en_US/fbds.js";
				var s = document.getElementsByTagName("script")[0]; +
				s.parentNode.insertBefore(fbds, s);
				_fbq.loaded = true;
			}
			window._fbq = window._fbq || [];
			window._fbq.push(["track", "6024281921190", {
				"value": "0.01",
				"currency": "USD"
			}]);
			$.ajax({
				url: "https://www.facebook.com/tr?ev=6024281921190&cd[value]=0.01&cd[currency]=USD&noscript=1",
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_facebook3 = function(userId) {
			! function(f, b, e, v, n, t, s) {
				if (f.fbq) return;
				n = f.fbq = function() {
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
				};
				if (!f._fbq) f._fbq = n;
				n.push = n;
				n.loaded = !0;
				n.version = '2.0';
				n.queue = [];
				t = b.createElement(e);
				t.async = !0;
				t.src = v;
				s = b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t, s)
			}(window, document, 'script', '//connect.facebook.net/en_US/fbevents.js');
			window.fbq('init', '797786317008257');
			window.fbq('track', 'PageView');
			window.fbq('track', 'CompleteRegistration');
			$.ajax({
				url: "https://www.facebook.com/tr?id=797786317008257&ev=PageView&noscript=1",
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_ikoo = function(userId) {
			$.ajax({
				url: "https://pertrkikoo.com/p.ashx?o=1304423&f=pb&r=" + promotion_util.get_ikooid() + "&t=" + userId,
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
			$.ajax({
				url: "https://pertrkikoo.com/p.ashx?o=1304424&f=pb&r=" + promotion_util.get_ikooid() + "&t=" + userId,
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
			$.ajax({
				url: "https://pertrkikoo.com/p.ashx?o=1304425&f=pb&r=" + promotion_util.get_ikooid() + "&t=" + userId,
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.register_user_adcash = function(userId) {
			$.ajax({
				url: "http://www.adcash.com/script/register_event.php?key=7bf2bfb8519eff905de84cb8e6dd0507&idform=258599&campagne=4670420&cid=" + getAdCashid() + "&variable=" + userId,
				type: "get",
				async: false,
				success: function(data) {},
				error: function(data) {}
			});
		};

		this.submit_promotion_action = function(action, param) {
//			var promotion = promotion_util.get_promotion(),
//				user_id = user_util.user_info ? user_util.user_info.userId : 0;
//			var url = param && $.trim(param) ? param : window.location.href;
//			$.ajax({
//				url: system_info.base_attr.domain + "user_supportUserAction.fly",
//				type: "get",
//				async: true,
//				cache: false,
//				dataType: 'json',
//				data: {
//					url: url,
//					type: action,
//					promotion: promotion,
//					userId: user_id
//				},
//				success: function(data) {
//					if (data.code == 0) {}
//				},
//				error: function(data) {}
//			});
		};

		this.promotion_init = function() {
			var promotion = system_util.get_url_param("promotion");
			if (promotion != undefined && promotion != '') {
				promotion_util.set_promotion(promotion);
			}
			promotion_util.init_ikoo();
			promotion_util.init_adcash();
			promotion_util.init_arabyads();
			promotion_util.init_propellerads();
			promotion_util.init_levantnetwork();
			promotion_util.submit_promotion_action(promotion_util.base_attr.promotion_pv);
			promotion_util.listen_init();
			if (system_info.base_attr.web_site == 10) {
				promotion_util.load_fb_share_pv();
			} else if (system_info.base_attr.web_site == 11) {
				promotion_util.load_mb_fb_share_pv();
			} else if (system_info.base_attr.web_site == 20) {
				promotion_util.load_hostwish_pv();
			} else if (system_info.base_attr.web_site == 21) {
				promotion_util.load_mb_hostwish_pv();
			}
		};

		this.listen_init = function() {
			$(document).mousedown(function(e) {
				// 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
				var val = e.which;
				if (val == 1) {
					var target_obj = $(e.target);
					var target_id = null,
						target_attr = null;
					if (target_obj && (target_id = target_obj.attr("tag_id"))) {
						//alert(target_id);
						var param = {};
						param["uri"] = window.location.href.replace(system_info.base_attr.domain, '');
						target_attr = target_obj.attr("tag_attr");
						if (target_attr) {
							param["attr"] = target_attr;
						}
						promotion_util.submit_promotion_action(target_id, JSON.stringify(param));
					}
				}
			});
		};

		this.init_ikoo = function() {
			var ikooid = system_util.get_url_param("ikooid");
			if (ikooid != undefined && ikooid != '') {
				promotion_util.set_ikooid(ikooid);
			}
		};

		this.init_adcash = function() {
			var adCashId = system_util.get_url_param("cid");
			if (adCashId != undefined && adCashId != '') {
				promotion_util.set_adcashid(adCashId);
			}
		};

		this.init_propellerads = function() {
			var propellerads = system_util.get_url_param("visitor_id");
			if (propellerads != undefined && propellerads != '') {
				promotion_util.set_propellerads(propellerads);
			}
		};

		this.init_levantnetwork = function() {
			var levantnetwork = system_util.get_url_param("transaction_id");
			if (levantnetwork != undefined && levantnetwork != '') {
				promotion_util.set_levantnetwork(levantnetwork);
			}
		};

		this.init_arabyads = function() {
			var arabyads = system_util.get_url_param("tran_id");
			if (arabyads != undefined && arabyads != '') {
				promotion_util.set_arabyads(arabyads);
			}
		};


		this.load_room_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.room_load_pv);
		};

		this.load_room_over_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.room_over_pv);
		};

		this.load_fb_share_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.fb_share_load_pv);
		};

		this.load_mb_fb_share_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.mb_fb_share_load_pv);
		};

		this.load_hostwish_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.hostwish_load_pv);
		};

		this.load_mb_hostwish_pv = function() {
			promotion_util.submit_promotion_action(promotion_util.base_attr.mb_hostwish_load_pv);
		};
	};
	promotion_util.promotion_init();
});