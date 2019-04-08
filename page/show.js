define(function (require) {
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility = require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP = Utility['OOP'],
        Flash = Utility['Flash'],
        Promise = Utility['Promise'],
        StringHelper = Utility['String'],
        Datetime2 = Utility['DateTime'],
        xss = Utility['String']['xssFilter'],
        stringFormat = StringHelper['stringFormat'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Trigger = Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness'),
        ClickCollect = Kit.use('ClickCollect'),
        Body=Kit.use('Body'),
        _nav = Body.nav,
        _task = Body.TASKS,
        Headers=Body.Header,
        Footer = Body.Footer;
        
    var V3_DATA_DOMAIN = DOMAIN_CONFIG['SITE_DOMAIN'] + 'resource/show/data/v3/',
        V3_SERVICE_DOMAIN = DOMAIN_CONFIG['SITE_DOMAIN'] + 'service/',
        V3_URL = DOMAIN_CONFIG['SITE_DOMAIN'];
     var language_NUM={
        'ar':2,
        'en':1,
        'tr':3,
        'es':4,
        'pt':5,
        'pl':6,
        'in':7
    };
    var CONST = {
        Event: {
            'SocketReady': 'SocketReady',
            'SocketJoin': 'SocketJoin',
            'SocketLeave': 'SocketLeave',
            'SocketChat': 'SocketChat',
            'SocketTask': 'SocketTask',
            'SocketHostLevel': 'SocketHostLevel',
            'SocketGiving': 'SocketGiving',
            'SocketPromote': 'SocketPromote',
            'SocketMarquee': 'SocketMarquee',
            'SocketStop': 'SocketStop',
            'StartOfQueue': 'StartOfQueue',
            'EndOfQueue': 'EndOfQueue',
            'SocketFlower': 'SocketFlower',
            'SocketDiamond':'SocketDiamond',
            'SocketAdmin': 'SocketAdmin',
            'PopupTip': 'PopupTip',
            'CloseTip': 'CloseTip',
            'PopupText': 'PopupText',
            'ActivityFetch': 'ActivityFetch',
            'StartVideo': 'StartVideo'
        },
        UserType: {
            'Anonymous': 0,
            'User': 1
        },
        MemberType: {
            'None': 0,
            'VIP': 1,
            'SVIP': 2
        },
        AdminType: {
            'User': 0, //普�?�用�???????
            'Host': 1, //主播
            'Constable': 2, //巡管
            'Manager': 3, // 后台管理�???????
            'Bussiness': 4, //运营用户
            'Guy': 77 // 机器�???????
        },
        UserAttr: {
            'Badge': 2,
            'Member': 3,
            'Limo': 4
        },
        ChatMode: {
            'Whisper': 1,
            'Speech': 2
        },
        Batch: [777, 500, 100, 10],
        Threshold: 7,
        MemberTag: {
            0: STRING_EMPTY,
            1: 'vip',
            2: 'svip'
        },
        GiftSC:{
            0:'Common',
            1:'Level',
            2:'VIP',
            3:'Store'
        }
    };
    var imageTemplate = '<img src="{0}" />',
        limitImageTemplate = '<img src="{0}" height="{1}" />',
        classTemplate = ' class="{0}"';
    var TEMPLATE = {
        'MAINS': '<div class="bar hidden" id="bar"></div>\
        			<div class="content">\
	                    <div class="cinama_content">\
		                    <div class="room" id="room" style="margin:0;float:left">\
		                        <div class="middle">\
		                            <div id="roomTop" class="room_top_cinama"></div>\
		                            <div id="roomGift" class="room_gift"></div>\
		                            <div id="roomBottom"></div>\
		                        </div>\
		                    </div>\
		                    <div id="shore_btns" class="shore_btns"></div>\
		                    <div class="right" id="roomRight" style="min-height:300px"></div>\
	                    </div>\
	                    <div data-role ="ce_nav" class="user_sys_nav"></div>\
	                    <div class="hidden" id="task_tan"></div>\
						<div class="task_con" data-role ="task"></div>\
						<div class="popup_cont"></div>\
	                </div>\
	                <div id="notice_popup" class="notice_popup">\
                	<div class="notice_wrap" style="width:500px">\
			            <h2 data-i18n="Room_Top_Title">{{Room_Top_Title}}</h2>\
			            <div id="notice_container" class="notice_container">\
							<div class="topic_header">\
								<div class="topic_img">\
									<div class="input_title" data-i18n="Room_poster">{{Room_poster}}</div>\
									<img src=""/>\
								</div>\
								<div class="topic_con">\
									<div class="input_title" data-i18n="Room_Btitle">{{Room_Btitle}}</div>\
									<input type="text" class="topic_input" id="topicname" maxlength="70" />\
									<div class="game_info">\
										<div class="input_title" data-i18n="Room_Game"  style="margin-top: 16px;">{{Room_Game}}</div>\
										<div class="play_type" id="play_type">\
											<div class="icons" data-i18n="Room_gn">{{Room_gn}}</div>\
											<div class="taglistPs"><ul class="taglist"></ul></div>\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="gerror" data-i18n="Room_sn">{{Room_sn}}</div>\
							<div class="topic_info game_info">\
								<div  class="input_title" data-i18n="Room_URL">{{Room_URL}}</div>\
								<input class="topic_url" readonly/>\
								<div  class="input_title" style="margin-top: 10px;" data-i18n="Room_SK">{{Room_SK}}</div>\
								<div class="topic_key"></div>\
							</div>\
							<div class="topic_shore">\
								<span class="facebook share_to_facebook"></span>\
								<span class="twitter share_to_twitter"></span>\
							</div>\
							<div class="topic_btns">\
								<div class="topic_btn_ok" ></div>\
							</div>\
			            </div>\
			        </div>\
			        <div class="bg"></div>\
			    </div>',
'SHOREBTNS': '<div class="btns_top">\
	    					<a id="hostFollow" data-stat="Room_follow" href="javascript:;">\
		    					<div class="show_btn follow_add">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_hostFollow">{{Room_hostFollow}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="hostUnFollow" data-stat="Room_unFollow" href="javascript:;">\
		    					<div class="show_btn follow_no">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_hostUnFollow">{{Room_hostUnFollow}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<div class="show_btn btn_shore">\
	    						<div class="shore_message">\
	    							<ul class="room_shared">\
		                                <li class="share_to_facebook"><span data-stat="Room_share_to_facebook" class="facebook_icon"></span></li>\
		                            	<li class="share_to_twitter"> <span data-stat="Room_share_to_twitter" class="twitter_icon"></span></li>\
		                            </ul>\
	    						</div>\
	    					</div>\
	    					<a  id="show_Ring" data-stat="Room_vodeoChat" href="javascript:;" class="hidden">\
		    					<div class="show_btn vodeo_chat">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_vodeoChat">{{Room_vodeoChat}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="hostReport" data-stat="Room_accusation" href="javascript:;">\
		    					<div class="show_btn btn_accusation">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_hostAccusation">{{Room_hostAccusation}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="whisper" class="" data-stat="Room_whisper" href="javascript:;">\
	    						<em class="hidden"></em>\
	    						<div class="show_btn btn_private_chat">\
	    							<div class="btn_message">\
		    							<span data-i18n="Room_hostPrivateChat">{{Room_hostPrivateChat}}</span>\
		    						</div>\
	    						</div>\
	    					</a>\
	    					<a id="managerList" data-stat="Room_managerList" href="javascript:;" class="hidden">\
		    					<div class="show_btn manager_list">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_managerList">{{Room_managerList}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="flashStart" data-stat="Room_vodeoChat" href="javascript:;" class="hidden">\
		    					<div class="show_btn flash_start">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_flashStart">{{Room_flashStart}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="flashShop" data-stat="Room_vodeoChat" href="javascript:;" class="hidden">\
		    					<div class="show_btn flash_shop">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_flashStop">{{Room_flashStop}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    					<a id="videoStop" data-stat="Room_videoStop" href="javascript:;" class="hidden">\
		    					<div class="show_btn video_stop">\
		    						<div class="btn_message">\
		    							<span data-i18n="Room_videoStop">{{Room_videoStop}}</span>\
		    						</div>\
		    					</div>\
	    					</a>\
	    			  </div>\
                      <div class="btns_middle"></div>\
                      <div class="btns_bottom">\
                      	<div class="btns_voice" id="voice_btn_bar"><span id="voice_btn"></span></div>\
	    				<div id="full_screen" class="show_btn btn_enlarge"></div>\
                      </div>',
	    'WHISPERAREA': '<div id="whisper_area" class="whisper_area">\
                            <div class="whisper_chat_list">\
                                <div class="whisper_chat_list_top hidden">\
                                    <span class="whisper_tips">\
                                        <img class="whisper_tips_img" src="/resource/static/image/show2/privateIco.png" alt="">\
                                    </span>\
                                    <span class="whisper_num"></span>\
                                </div>\
                                <div class="whisper_chat_list_ul">\
                                    <ul id="whisper_list"></ul>\
                                </div>\
                            </div>\
                        </div>',

        'ROOM_TOP': '<div class="room_top">\
                    <div class="host_basic">\
                        <div class="host_photo {7}" >{0}</div>\
                        <div class="host_info">\
                            <span class="host_name">{1}</span>\
                        </div>\
                    </div>\
                    <ul class="host_honor clearfix">\
	                    <li class="honor_follow hidden">{3}</li>\
	                    <li id="hostGoodNum" class="honor_flower hidden">{4}</li>\
	                    <li data-role="onlineTotal" class="honor_online ">{5}</li>\
	                </ul>\
                </div>\
                <div class="holder clearfix" style="">\
                	<div id="newsTips" class="newsTips hidden"></div>\
        		  	<span id="flower" class="flower_area flower_time hidden">\
                        <span id="fans" class="flower_num" data-stat="Room_btn_flower"><span class="num" data-role="counter"></span></span>\
                        <span class="flower_text" data-role="timer" data-i18n="Room_GetFlowerTime">{{Room_GetFlowerTime}}</span>\
                    </span>\
                    <ul id="wealth_rank" class="wealth_rank"></ul>\
                    <div id ="switch_windows" class="switch_windows">\
                    	<div></div>\
                    	<span data-i18n="Room_SwitchViewWinMeg">{{Room_SwitchViewWinMeg}}</span>\
                    </div>\
                </div>\
            </div>',
        'CINEMA': '<div id="cinema" class="magic">\
        			<div id="cinema_full" class="cinema_full"></div>\
        			<div id="cinema_flash" class="cinema_flash"></div>\
        			<div id="cinema_daily" class="cinema_daily"></div>\
        			</div>',
        'ROOM_GIFT': '<div class="gift clearfix">\
                    <ul id="tabGoods" class="tab_gift clearfix">\
                        <li data-type="common"><a href="javascript:;" data-i18n="Room_CommonGift" data-stat="Room_CommonGift">{{Room_CommonGift}}</a></li>\
                        <li data-type="backpack"><a href="javascript:;" data-i18n="Room_MyBag" data-stat="Room_MyBag">{{Room_MyBag}}</a></li>\
                        <li data-type="vip"><a href="javascript:;" data-i18n="Room_Store" data-stat="Room_VipGift">{{Room_Store}}</a></li>\
                    </ul>\
                    <div class="pop_par">\
                		<div class="top_pop"></div>\
                		<div class="bottom_pop"></div>\
                	</div>\
                    <div id="listGoods" class="gift_box" style="visibility: hidden;">\
                        <ul class="gift_list clearfix hidden" data-type="common"></ul>\
                        <ul class="gift_list clearfix hidden" data-type="vip"></ul>\
                        <ul class="gift_list clearfix hidden" data-type="backpack"></ul>\
                    </div>\
                    <div id="preview" class="gift_preview">\
                    	<div id="preview_img" class="preview_img"></div>\
                    	<div class="gift_pack hidden" id="gift_pack">\
                            <p class="preview_pack_title"></p>\
                            <p class="preview_pack_time"></p>\
                            <ul></ul>\
                    </div>\
                    <div class="gift_preview_info">\
	                    	<div id="gift_num" class="gift_num">\
	                    		<div class="quantity_input">\
	                                <span id="quantity_minus" class="btn_minus">-</span>\
	                                <div class="num_quantity"><input id="count" class="quantity" type="text" value="1" maxlength="3"></div>\
	                                <span id="quantity_plus" class="btn_minus">+</span>\
	                                <ul id="quantity" class="quantity_hint hidden" data-collector="giftQuantity">\
	                                     <li data-value="1" data-stat="Room_quantity1">1</li>\
	                                     <li data-value="10" data-stat="Room_quantity7">10</li>\
	                                     <li data-value="100" data-stat="Room_quantity77">100</li>\
	                                     <li data-value="500" data-stat="Room_quantity177">500</li>\
	                                    <li data-value="777" data-stat="Room_quantity777">777</li>\
	                                </ul>\
	                            </div>\
	                    	</div>\
	                    	<ul class="store_days hidden">\
	                    		<li class="selectd" data-value="1" data-i18n="Store_30days">{{Store_30days}}</li>\
	                    		<li data-value="2" data-i18n="Store_60days">{{Store_60days}}</li>\
	                    		<li data-value="3" data-i18n="Store_90days">{{Store_90days}}</li>\
	                    	</ul>\
	                        <div class="gift_count_price" >\
	                            <span><span class="price"></span><input id="one-price" type="hidden"/><span id="gift_total_count"></span></span>\
	                            <span class="old hidden"><span class="price"></span><span class="tline"></span><span id="gift_total_count_old"></span></span>\
                            </div>\
                                <div id="give" class="gift_btn" data-i18n="Room_Send" data-stat="Room_gift_Send" style="color:#ffffff">{{Room_Send}}</div>\
	                    	<div id="gift_buy" class="gift_btn hidden" data-i18n="Room_Gift_Buy" data-stat="Room_Gift_Buy" style="color:#ffffff">{{Room_Gift_Buy}}</div>\
	                    </div>\
                    </div>\
                </div>',
        'ROOM_BOTTOM': '<div class="middle_recommend hidden">\
                    <a href="/myrecharge.shtml" target="_blank"><img src="/resource/static/image/show2/recharge_banner.jpg" alt="up to 50% now"></a>\
                    <span class="btn_close" data-role="middle_recommend_close"></span>\
                </div>',
        'RIGHT': '<div class="right_wrap">\
                <div id="uv" class="rank">\
                    <ul id="roster" class="alpha01">\
                    </ul>\
                </div>\
                <div id="ugc" class="gift_chat_area clearfix">\
                	<div class="chat_top_pop"></div>\
                    <div id="gift_show" class="gift_show">\
                        <div class="gift_record " id="gift_record">\
                            <ul id="dessert" class="common_record"></ul>\
                        </div>\
                        <div id="giftView" class="gift_view"></div>\
                    </div>\
                    <div class="chat_wrap">\
                        <div class="chat_area">\
                        	<div class="chatroom_y"></div>\
                            <ul id="chatroom"></ul>\
                        </div>\
                        <span id="lockScreen" class="chat_lock"></span>\
                    </div>\
                    <div id="send_area_content">\
	                    <div class="send_area clearfix">\
	                        <div class="emoji_block" data-collector="emoji">\
	                            <span id="emoji" data-stat="Room_btn_emoji" class="btn_emoji"><img src="/resource/static/image/show2/icon_emoji2.png" alt="chat"></span>\
	                            <div id="face" class="emoji_wrap hidden">\
	                                <div data-role="list" class="emoji_area">\
	                                    <ul class="emoji_common hidden"></ul>\
	                                    <ul class="emoji_level hidden"></ul>\
	                                    <ul class="emoji_vip hidden"></ul>\
	                                    <ul class="emoji_lion hidden"></ul>\
	                                    <div class="emoji_preview"></div>\
	                                </div>\
	                                <ul data-role="tab" class="emoji_tab"></ul>\
	                            </div>\
	                        </div>\
	                        <input id="message" class="message readStart" type="text" name="message">\
	                        <input id="say" data-i18n="Room_Send_Message" data-stat="Room_message_Send" value="{{Room_Send_Message}}" class="send" value="Chat" type="button" name="send">\
	                    </div>\
	                    <div id="send_wrong_meg" class="send_area_wrong_meg hidden" data-i18n="Room_Send_Wrong_Meg">{{Room_Send_Wrong_Meg}}</div>\
                    </div>\
                </div>\
                <div id="manage" class="admin_info hidden" data-collector="manage"></div>\
                <div id="bages_hover" class="badgeHover hidden"></div>\
            </div>',
        'GIFT': '<li data-giftid="{0}" {4} class="viplevel{5}">\
                <div class="gift-icon">\
                    <strong class="{1}" data-stat="Room_gift_{1}"></strong>\
                    <span class="icon_select"></span>\
                </div>\
                <div class="gift-price">\
                	<span class="price"></span>\
                	<span class="price_num">{2}</span>\
                </div>\
            </li>',
        'GIFTSTORE': '<li data-giftid="{0}" data-storetype="{5}" {4}>\
                <div class="gift-icon">\
                    <div class="store-img">\
                    	<img src="{1}" />\
                    </div>\
                    {3}\
                    <span class="icon_select"></span>\
                </div>\
                <div class="gift-price">\
                	<span class="price"></span>\
                	<span class="price_num">{2}</span>\
                </div>\
            </li>',
        'BACKPACK': '<li data-giftid="{0}" data-count="{2}" data-role="special">\
                <div class="gift-icon">\
                    <strong class="{1}" data-stat="Room_gift_{1}"></strong>\
                    <span class="icon_select"></span>\
                </div>\
                <div class="gift-price">\
                	<span class="price2">X</span>\
                	<span class="price_num">{2}</span>\
                </div>\
            </li>',
        'BACKPACKEMPTY': '<div class="back_empty" data-i18n="Room_BACKPACK_EMPTY">{{Room_BACKPACK_EMPTY}}</div>',
        
        'DESSERT': '<li class="chat_gift_list {0}">\
                    <span class="name">{1}</span>\
                    <span class="member"></span>\
                    <span class="badge">{2}</span>\
                    <p class="record_right">\
                        <strong class="{3}"></strong><span>×</span><span>{4}</span>\
                    </p>\
                </li>',

        'CHAT': '<li{0} data-identity="{1}">\
                <div class="chat_info"><p class="chat_user">\
                    {2}\
                    {3}\
                    <span class="name">{4}</span>\
                    <span class="member"></span>\
                    <span class="badge" data-userid="{1}">{6}</span>\
                </p>\
                <p>{7}</p></div>\
            </li>',

        'CHAT_SYSTEM': '<li class="system">\
                        <p>{0}</p>\
                    </li>',

        'CHAT_FOCUS_SHARE': '<li class="{0}" data-identity="{2}">\
                                    {1}\
                            </li>',

        'UV': '<li {0}>\
                <span>\
                	<div class="photo_par">\
                		<div class="icon"></div>\
                		<div class="photo">{1}</div>\
                	</div>\
                </span>\
                <span class="level"><span class="img"></span><span class="num">{2}</span></span>\
                <span class="name">{3}</span>\
            </li>',
                
        'PREVIEW_IMG': '<img src="{0}" />',
        
        'PREVIEW_NUM': '<span class="price"></span><span id="gift_total_count">{0}</span>',
        
        'MANAGE': '<div class="admin_info_top">\
                    <p class="admin_info_photo">\
                        {0}\
                        <span class="admin_info_off"></span>\
                    </p>\
                    <div class="admin_info_user">\
                        <p class="admin_info_name"><span>{1}</span></p>\
                        <p class="admin_info_id"><span>ID:&nbsp;<label>{2}</label></span></p>\
                    </div>\
                    <span id="user_context_menu_type"></span>\
                </div>\
                <div class="admin_info_bottom">{3}</div>',
        'MANAGE_NEW': '<div class="user_card_head">\
        		<input type="hidden" id="usercard_manage_id" value="{2}"/>\
				<div style="width:15px">\
					<a href="javascript:;" class="{1}" data-action="Follow" data-stat="Room_Follow">\
						<div class="card_follow {4}">\
							<span data-i18n="Room_hostFollow">{{Room_hostFollow}}</span>\
						</div>\
					</a>\
					<a href="javascript:;" class="{1}" data-action="UnFollow" data-stat="Room_unFollow">\
						<div class="card_unfollow {5}">\
							<span data-i18n="Room_hostUnFollow">{{Room_hostUnFollow}}</span>\
						</div>\
					</a>\
				</div>\
				<div class="card_header">\
					{0}\
				</div>\
				<div style="width:15px">\
					<a href="javascript:;" class="{1}" data-action="Report" data-stat="Room_Report">\
						<div class="card_report {6}">\
							<span data-i18n="Room_hostAccusation">{{Room_hostAccusation}}</span>\
						</div>\
					</a>\
				</div>\
			</div>\
			<div class="user_card_info">\
				<div class="card_userName">{1}</div>\
				<div class="card_badge {9}">\
					{8}\
				</div>\
				<div class="card_ID">\
					ID:{2}\
				</div>\
				<div class="card_balance">\
					{7}\
				</div>\
				<div class="card_fans">\
					{10}\
				</div>\
			</div>\
			<div class="user_card_btns">\
				{3}\
			</div>',
		'MENU_NEW': '<a href="javascript:;" class="{0}" data-action="admin" data-state="0" data-stat="Room_Admin">\
						<span class="card_admin ">\
							<img src="/resource/static/image/show2/card_admin.png"/>\
							<span data-i18n="Room_Admin" >{{Room_Admin}}</span>\
						</span>\
					</a>\
					<a href="javascript:;" class="{1}" data-action="admin" data-state="1" data-stat="Room_Cancel">\
						<span class="card_removeAdmin">\
							<img src="/resource/static/image/show2/card_removeAdmin.png"/>\
							<span data-i18n="Room_Cancel" >{{Room_Cancel}}</span>\
						</span>\
					</a>\
					<a href="javascript:;" class="{2}"  data-action="out" data-stat="Room_Remove">\
		               	<span class="card_remove">\
							<img src="/resource/static/image/show2/card_remove.png"/>\
							<span data-i18n="Room_Remove">{{Room_Remove}}</span>\
						</span>\
					</a>\
					<a href="javascript:;" class="{3}"  data-action="mute" data-state="0"  data-stat="Room_Mute">\
						<span class="card_ban">\
							<img src="/resource/static/image/show2/card_ban.png"/>\
							<span data-i18n="Room_Mute">{{Room_Mute}}</span>\
						</span>\
					</a>\
					<a href="javascript:;" class="{4}" data-action="whisper" data-stat="Room_Whisper">\
						<span class="card_whisper">\
							<img src="/resource/static/image/show2/card_whisper.png"/>\
							<span data-i18n="Room_Whisper">{{Room_Whisper}}</span>\
						</span>\
					</a>',
        'MENU': '<a href="javascript:;" class="admin_link_second{0}" data-action="whisper" data-i18n="Room_Whisper" data-stat="Room_Whisper">{{Room_Whisper}}</a>\
                <a href="javascript:;" class="admin_link_second{1}" data-action="admin" data-state="0" data-i18n="Room_Admin" data-stat="Room_Admin">{{Room_Admin}}</a>\
                <a href="javascript:;" class="admin_link_second{2}" data-action="admin" data-state="1" data-i18n="Room_Cancel" data-stat="Room_Cancel">{{Room_Cancel}}</a>\
                <a href="javascript:;" class="admin_link_second{3}" data-action="mute" data-state="0" data-i18n="Room_Mute" data-stat="Room_Mute">{{Room_Mute}}</a>\
                <a href="javascript:;" class="admin_link_second{4}" data-action="out"data-i18n="Room_Remove" data-stat="Room_Remove">{{Room_Remove}}</a>\
                <a href="javascript:;" class="admin_link_second hidden" data-action="ban" data-i18n="Room_BanIP" data-stat="Room_BanIP">{{Room_BanIP}}</a>',
        'OFFLINE': '<div id="offline" class="offline" style="position:absolute;left:0;top:0;width: 100%;height:100%;margin:0 auto;background:url(/resource/static/image/show/absent_yb.jpg) no-repeat;background-size:100% 100%;">\
                    <div class="offline_show">\
                        <p class="left_arrow" data-role="prev" style="display: none;"></p>\
                        <div class="show_list">\
                            <h3 data-i18n="Room_wonderful_show">{{Room_wonderful_show}}</h3>\
                            <span class="show_video">\
                                <ul data-role="offline_video_list"></ul>\
                            </span>\
                        </div>\
                        <p class="right_arrow" data-role="next" style="display: none;"></p>\
                    </div>\
                    <p class="live_word" data-i18n="Room_LiveShowNotStarted">{{Room_LiveShowNotStarted}}</p>\
                    </div>\
                <div class="offline_video" style="display:none;position:absolute;width:100%;height:100%;left:0;top:0;margin:0 auto;background:url(/resource/static/image/show/absent_yb.jpg) no-repeat;background-size:100%; 100%">\
                    <a href="javascript:;" class="iframe_close" data-stat="Room_video_BtnClose">X</a>\
                    <div id="movie_iframe" style="width:100%;height: 100%;"></div>\
                </div>',
        'OFFLINE_ITEM': '<li>\
                        <dl>\
                            <dt><img src="{0}" alt=""></dt>\
                            <dd>{1}</dd>\
                        </dl>\
                        <div class="video_mask" data-url="{2}" data-stat="Room_video_roomId={3}"></div>\
                    </li>',
        'RANK':'<li>\
                    <span class="coin no1">{3}</span>\
                </li>',

        'TASK':'<div class=" hidden" id="" data-collector="task">\
                    <div class="task_list_con">\
                     <div class="task_user_info" id="task_user_detail_info">\
                    <dl>\
                        <dt>\
                            <img id="task_user_head" src="/resource/systemRes/img/default/nophoto.jpg" alt="">\
                        </dt>\
                        <dd>\
                            <b id="task_nick_name"></b><a href="/act/level" target="_blank" data-stat="Room_task_levelLink"><img id="task_user_level_img" src="/resource/systemRes/img/default/level1_01.png" alt="" /></a><span><i id="task_user_level_persent" style="width: 0%;"><font size="0">0.00%</font></i></span>\
                        </dd>\
                        <p>\
                            <b data-i18n="Task_Level">{{Task_Level}}</b><b>&nbsp;:&nbsp;</b><b id="task_user_level"></b> <br>\
                            <em data-i18n="Task_ToNextLevel">{{Task_ToNextLevel}}</em><em>&nbsp;:&nbsp;</em><em id="task_user_next_level"></em><img src="/resource/systemRes/imgNew/toplist/exp_icon.png" alt="">\
                        </p>\
                    </dl>\
                    </div>\
                    <div class="task_list_ul">\
                        <div class="task_tit" data-i18n="Task_MyTask">{{Task_MyTask}}</div>\
                        <div class="task_list_scroll" id="task_list_scroll">\
                            <ul id="user_task_list"></ul>\
                        </div>\
                        <div class="list_btm_mask"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="task_list host hidden" data-role="task_list_host" data-collector="task">\
                <div class="task_list_con">\
                    <div class="task_user_info" data-role="task_user_info"></div>\
                    <span class="task_host_hr" data-i18n="Task_MyTask">{{Task_MyTask}}</span>\
                    <div class="host_task_con" style="height:410px;">\
                        <div data-role="host_flower" class="host_flower hidden">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                    <span class="level5"><i></i></span>\
                                    <span class="level6"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div data-i18n="Task_HostFlowerMore" class="host_more hidden">{{Task_HostFlowerMore}}</div>\
                        </div>\
                        <div data-role="host_focus" class="host_focus">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                    <span class="level5"><i></i></span>\
                                    <span class="level6"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div class="host_more hidden" data-i18n="Task_HostFocusMore">{{Task_HostFocusMore}}</div>\
                        </div>\
                        <div data-role="host_popular" class="host_popular hidden">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div data-i18n="Task_HostPopularMore" class="host_more hidden">{{Task_HostPopularMore}}</div>\
                        </div>\
                    </div>\
                    <p class="host_task_common" data-i18n="Task_HostCommonDesc">{{Task_HostCommonDesc}}</p>\
                </div>\
            </div>',

        'BATCH': '<span class="photo">{0}</span>\
                    <span class="name">{1}</span>\
                    <span class="num">{2}</span>\
                    <strong class="gift {3}"></strong>\
                    <span class="times"{4}>\
                        <span class="times_symbol">×</span>\
                        <span class="times_num">{5}</span>\
                    </span>',

        'BUYVIP': '<div class="popup" style="display: none;">\
                    <div class="wrap v3 clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BecomeVIPtoSendFace}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',

        'BUYVIPGIFT': '<div class="popup" style="display: none;">\
                    <div class="wrap v3 clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BecomeVIPtoSendGift}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',

        'BUYSVIPGIFT': '<div class="popup" style="display: none;">\
                    <div class="wrap v3 clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BecomeSVIPtoSendGift}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
			'BUYSUCCESS': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BUY_SUCCESS}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
			'BUYSUCCESSGIFTPACK': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix" style="width: 350px;height: auto;padding-bottom: 20px;">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Room_buy_success_pack}}</h2>\
                        <div data-role="content" class="content_v3" style="height: 134px;margin-top: 10px;">\
                            <p>{{Room_success_check_pack}}</p>\
                            <ul class="giftpack_pop">{0}</ul>\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
			'BUYERROE': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BUY_ERROE}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
            'GAMELIVETOP': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_Live_Top}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
            'REOPRTSUCCESS': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3" style="height:85px;margin-top:25px">\
                            {{Room_REOPRT_SUCCESS}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
			'REOPRTERROE': '<div class="popup" style="display: none;">\
                    <div class="meg_pop clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{13017}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a data-role="close" class="cancel" data-stat="Store_OK">{{Store_OK}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
            'UNLOCKMEG': '<div class="popup" style="display: none;">\
                <div class="meg_pop clearfix">\
                    <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                    <div data-role="content" class="content_v3" style="height:85px;margin-top:25px">\
                        {{Room_REOPRT_SUCCESS}}{0}\
                    </div>\
                    <div data-role="button" class="pop_button_v3">\
                        <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                    </div>\
                    <a data-role="close" class="clz"></a>\
                </div>\
                <div class="popBg v3"></div>\
            </div>',
        'BECOMESVIPTOCHAT': '<div class="popup" style="display: none;">\
                    <div class="wrap v3 clearfix">\
                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content_v3">\
                            {{Room_BecomeSVIPtoPrivateChat}}\
                        </div>\
                        <div data-role="button" class="pop_button_v3">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                        <a data-role="close" class="clz"></a>\
                    </div>\
                    <div class="popBg v3"></div>\
                </div>',
                'WHISPER':'<li class="{0}">\
                        {1}\
                        <span>{2}</span>\
                    </li>',
                

        		'ACCUSATION':'<div class="popup_par"><div class="show_desc_txt_popup">\
                        <img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" class="show_pop_close closeMsgDetail" >\
                        <p class="ignore_all_title" data-i18n="Room_hostAccusation">{{Room_hostAccusation}}</p>\
                        <div class="show_desc_md clearfix">\
                            <ul>\
                            	<li><label><input type="radio" name="reportType" value="8"><span data-i18n="Store_Report_1">{{Store_Report_1}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="9"><span data-i18n="Store_Report_2">{{Store_Report_2}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="10"><span data-i18n="Store_Report_3">{{Store_Report_3}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="11"><span data-i18n="Store_Report_4">{{Store_Report_4}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="12"><span data-i18n="Store_Report_5">{{Store_Report_5}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="13"><span data-i18n="Store_Report_6">{{Store_Report_6}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="14"><span data-i18n="Store_Report_7">{{Store_Report_7}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="15"><span data-i18n="Store_Report_8">{{Store_Report_8}}</span></label></li>\
                            	<li><label><input type="radio" name="reportType" value="16"><span data-i18n="Store_Report_9">{{Store_Report_9}}</span></label></li>\
                            </ul>\
                        </div>\
                        <div class="show_desc_cont">\
                            <div class="scrollbar" id="ex3">\
                                <textarea rows="5" id="reportMeg"></textarea>\
                            </div>\
                            <div class="show_desc_btn closeMsgDetail"  data-i18n="13035">{{13035}}</div>\
                        </div>\
                    </div></div>',
				'MANAGER_USER_LISTS':'<div class="popup_par">\
								<div class="manager_lists_popup">\
                        			<img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" class="show_pop_close closeMsgDetail" >\
                        			<p class="ignore_all_title" data-i18n="Room_Manager_List">{{Room_Manager_List}}</p>\
                        			<div class="manager_bar">\
                                        <span class="online"></span>\
                                        <span class="noAdmin hidden" data-i18n="Room_Manager_None">{{Room_Manager_None}}</span>\
                                        <span class="manager_heads" id="manager_head_lists"></span>\
                                        <span class="manager_collapse reverse"></span>\
                        			</div>\
			                        <div class="manager_lists clearfix">\
                                        <div class="manager_container hidden">\
                                            <p data-i18n="Room_Manager_Set_Admin">{{Room_Manager_Set_Admin}}</p>\
                                            <div class="manager_lists_div">\
                                                <ul id="manager_lists"></ul>\
                                            </div>\
                                            <div class="mbg hidden">\
                                                <span></span>\
                                            </div>\
                                        </div>\
			                            <div class="user_container">\
			                                <span class="hidden" data-i18n="Room_Manager_Nofans">{{Room_Manager_Nofans}}</span>\
                                            <ul id="user_lists"></ul>\
                                        </div>\
                                        <div class="msk hidden"></div>\
                                        <div id="manage_user_card" data-collector="managefans" class="admin_info hidden" style="position:absolute;"></div>\
			                        </div>\
			                    </div>\
			                </div>',
				'MANAGERLISTS':'<div class="popup_par">\
								<div class="manager_lists_popup">\
                        			<img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" class="show_pop_close closeMsgDetail" >\
                        			<p class="ignore_all_title" id="managerAll" data-count="{1}">{0}</p>\
			                        <div class="manager_lists clearfix">\
			                        	<div class="onlive_type">\
			                        		<span class="onlive" data-i18n="Room_Managers_Online">{{Room_Managers_Online}}</span>\
			                        		<span class="noOnlive" data-i18n="Room_Managers_Offline">{{Room_Managers_Offline}}</span>\
			                        	</div>\
			                            <ul id="manager_lists"></ul>\
			                        </div>\
			                    </div>\
			                </div>',
			    'MANAGERLISTS_LI':'<li data-userid="{0}" data-username="{3}">\
                        		<span class="{1}"></span>\
                        		<span class="headerImg" data-utp="{6}" data-identity="{0}">{2}</span>\
                        		<span class="userLevel"><span class="img"></span><span class="num">{4}</span></span>\
                        		<span class="name">{3}</span>\
                        		<span class="closeValue">{5}</span>\
                        		<a href="javascript:;" data-action="remove" data-stat="1" class="remove_manager"></a>\
                        	</li>',
                'FANSLISTS_LI':'<li data-userid="{0}" data-username="{3}">\
                        		<span class="fansli {1}"></span>\
                        		<span class="headerImg" data-utp="{6}" data-identity="{0}">{2}</span>\
                        		<span class="userLevel"><span class="img"></span><span class="num">{4}</span></span>\
                        		<span class="name">{3}</span>\
                        		<span class="closeValue">{5}</span>\
                        	</li>',
            	'MANAGERCONFIRM': '<div class="popup manage_pop">\
			                    <div class="meg_pop clearfix">\
			                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
			                        <div data-role="content" class="content_v3">\
			                        	<input type="hidden" id="admin_remove_id" value={0}/>\
			                            {1}\
			                        </div>\
			                        <div id="manager_btns" class="pop_button_v3">\
			                        	<a data-role="manager_confirm" class="cancel" data-stat="Room_Manager_Confirm">{{Room_Manager_Confirm}}</a>\
			                            <a data-role="manager_close" style="background-color:#e1e1e1;color:#000" class="cancel" data-stat="Room_Manager_Cancle">{{Room_Manager_Cancle}}</a>\
			                        </div>\
			                    </div>\
			                </div>',
			    'BAGESHOVER': '<h2>{0}</h2><span>{1}</span>',
            	'STOPVIDEOCONFIRM': '<div class="videoConfirm_pop">\
			                    <div class="meg_pop clearfix">\
			                        <h2 data-role="caption" class="caption_v33" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
			                        <div data-role="content" class="content_v3">\
			                        	{{Room_Stopvideo_Confirm}}\
			                        </div>\
			                        <div id="video_btns" class="pop_button_v3">\
			                        	<a data-role="video_confirm" class="cancel" data-stat="Room_Manager_Confirm">{{Room_Manager_Confirm}}</a>\
			                            <a data-role="video_close" style="background-color:#e1e1e1;color:#000" class="cancel" data-stat="Room_Manager_Cancle">{{Room_Manager_Cancle}}</a>\
			                        </div>\
			                    </div>\
			                </div>' ,
			    'NEWSTIPS': '<marquee id="newstips_marquee"  direction="left" scrollamount="10" loop="1" >\
		        		  		<div class="newsTipsCon"><div id="newsCon">{0}</div></div>\
		        		  	</marquee>'
    };
    var Tip = {
        register: function () {
            Trigger.register(CONST.Event.PopupTip, Tip.pop.bind(this));
            Trigger.register(CONST.Event.CloseTip, Tip.close.bind(this));
            Trigger.register(CONST.Event.PopupText, Tip.text.bind(this));
        },
        init: function (option) {
            require.async('component/popup.js', function (pop) {
                this.tip = pop;
                this.tip.show(option);
            }.bind(this));
        },
        pop: function (option) {
            if (!this.tip) {
                this.init(option);
                return;
            }
            this.tip.show(option);
        },
        text: function (container, html) {
            var tips = $(html).show().appendTo(container);
            setTimeout(function () {
                tips.remove();
            }, 1000);
        },
        close: function() {
            this.tip && this.tip.close();
            
        }
    };
    var Order = OOP.create('Order',function(option){
        this.load(option);
        this.render();
        this.compose();
        this.bind();
        this.start();
    },{
        'load': function(option){
            this.key = option['key'],
                this.store = option['initial'] || [];
            this.compare = this.compare.bind(this);
            this.check = this.check.bind(this);
            this.asc = !!option['asc'];
            this.checkHandler = option['check'] || this.check;
            this.valueHandler = option['value'] || this.selfWorth;
            this.compareHandler = option['compare'] || this.compare;
        },

        'render': function() {},

        'compose': function() {},

        'bind': function() {},

        'start': function(){
            this.sort();
        },

        'sort': function(){
            if(this.store.length > 0)
                this.store.sort(this.compareHandler);
        },

        'check': function(item){
            return item['rankCost'] && item['estimate'];
        },

        'value': function(item,force){
            if(!this.checkHandler(item) || force){
                item['rankCost'] = this.valueHandler(item);
                item['estimate'] = true;
            }
            return item['rankCost'];
        },

        'selfWorth': function(item){
            return item;
        },

        'compare': function(a,b){
            return this.value(b) - this.value(a);
        },

        'get': function(index){
            return this.store[index];
        },

        'valueof': function(index){
            return this.value(this.store[index]);
        },

        'locate': function(item) {
            var value = this.value(item),
                length;
            if ((length = this.store.length) == 0)
                return 0;
            var h = 0,
                l = length - 1,
                m, temp, direction = true;
            while (h < l) {
                m = Math.floor((h + l) / 2);
                temp = this.valueof(m);
                if (value < temp) {
                    h = m + 1;
                    direction = 1;
                } else {
                    l = m - 1;
                    direction = 0;
                }
            }
            if (h == l)
                return value < this.valueof(l) ? l + 1 : h;
            else {
                if (direction)
                    return value < this.valueof(l) ? l + 1 : l;
                else
                    return value < this.valueof(h) ? h + 1 : h;
            }
        },

        'insert': function(item){
            var position = this.locate(item),
                length;
            if(position < 0)
                position = 0;
            else if(position > (length = this.store.length))
                position = length;
            this.store.splice(position, 0 , item);
            return position;
        },

        'remove': function(item){
            var position = this.locate(item),
                length;
            if(position < 0)
                position = 0;
            else if(position > (length =this.store.length))
                position = length;
            this.store.splice(position,1);
            return position;
        },

        'maintain': function(count){
            return this.store.splice(count);
        }
    });

    var Queue = $.extend(OOP.create('Queue',
        function (option) {
            this.load(option);
            this.render();
            this.compose();
            this.bind();
            this.start();
        }, {
            'load': function (option) {
                $.extend(this, option);
                this.status = Queue.STATUS.Static;
                this.thread = option.thread;
                this.handler = option.handler;
                this.dequeue = this.dequeue.bind(this);
                this.store = [];
                this.startEvent = CONST.Event.StartOfQueue + '-' + this.thread;
                this.endEvent = CONST.Event.EndOfQueue + '-' + this.thread;
            },
            'render': function () {
            },
            'compose': function () {
            },
            'bind': function () {
            },
            'start': function () {
            },
            'enqueue': function (item) {
                this.store.push(item);
                if (this.status == Queue.STATUS.Static) {
                    Trigger.emit(this.startEvent);
                    this.dequeue();
                }
            },
            'dequeue': function() {
                if (this.store.length == 0) {

                    this.status = Queue.STATUS.Static;
                    Trigger.emit(this.endEvent);
                    return;
                }
                var item = this.store.shift();
                if (item) {
                    this.status = Queue.STATUS.Run;
                    var promise = new Promise;
                    promise.then(this.fire(item, promise)).then(this.dequeue).resolve();
                }
            },
            'fire': function(item, promise) {
                return function() {
                    this.handler(item, promise);
                }.bind(this);
            }
        }), {
        'STATUS': {
            'Static': 0,
            'Run': 1
        }
    });
    var Player = {
        'init': function (dom) {
            this.load(dom);
            this.compose();
            this.bind();
            this.start();
        },
        'load': function (dom) {
            this.container = $('#video');
            this.wrap = $('#player');
            this.instance = this.wrap[0];
            this.absent = $('#absent');
            this.absentTemplate = '<div id="absent" class="absent" style="width:100%;height:100%;position:relative;background:url(' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'static/image/show/absent_bg.jpg) no-repeat;background-size:100% 100%;"></div>';
            if($("#container").hasClass("vertical")){
            	this.absentTemplate = '<div id="absent" class="absent" style="width:100%;height:100%;position:relative;background:url(' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'static/image/show/absent_bgS.jpg) no-repeat;background-size:100% 100%;"></div>';
            }
            this.offline = $('#offline');
        },
        'compose': function () {
        	Bussiness.getData('data/static/v4/?livevideo',function(data){
        		if(data.code == 0){
                    var lives = data.dataInfo.livevideo.d;
                    var lives_video = {};
                    for(var i in lives){
                        lives_video[i] = [{
                            video_desc:lives[i][0].d,
                            video_id:lives[i][0].id,
                            video_pic:lives[i][0].p,
                            video_url:lives[i][0].u
                        }];
                    };
                    DATASOURCE['offline_video'] = lives_video;
                    if (DATASOURCE['identity'] == undefined || DATASOURCE['identity']['userId'] !== DATASOURCE['room']['roomUserId']) {
                        this.Watch();
                    };
                }
        	}.bind(this),null,true);

        },
        'bind': function () {
        },
        'start': function () {
            window['VideoConnection'] = function(showlog) {
                this.ShowLog = showlog;
            }.bind(this);
        },
        'render': function (showing) {
        	var room = DATASOURCE['room'];
            if (showing) {
            	var swfSrc = '/room/swf3/show.swf';
            	if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId']) && room["screen"] != 0){非主播且竖屏
            		swfSrc = '/room/swf3/appShow.swf'
            	}
                this.instance = Flash.render({
                    'container': this.container,
                    'src': swfSrc + (typeof PLAYER_VERSION == 'undefined' ? STRING_EMPTY : '?' + PLAYER_VERSION),
                    'id': 'player',
                    'falshvars': {
                        'url': room['videoAddr'],
                        'streamId': room['prefixion'],
                        'isHost': DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']),
                        'roomId': room['roomId'],
                        'userId': DATASOURCE['identity'] ? DATASOURCE['identity']['userId'] : '0',
                        'language': 'en',
                        'fs': room['screen'],
                        'isEntertainment': (room['topCategory']==107)?1:0
                    },
                    'width': 560,
                    'height': 360,
                    'callback': function () {
                        (new Promise).wait(0).then(function () {
                            if (this.ready)
                                this.instance['SocketReady']();
                        }.bind(this)).resolve(); //此处验证了初始resolve的方式有问题，需改进，resolve-> setTimeout
                    }.bind(this)
                });
                this.wrap = $(this.instance);
                if (this.absent && (this.absent.length > 0))
                    this.absent.safeHide();
            } else {
                this.absent = $(this.absentTemplate).appendTo(this.container);
                if (this.instance)
                    this.wrap.safeHide();
            }
        },
        'socketReady': function () {
            if (this.instance)
                this.instance['SocketReady']();
            else
                this.ready = true;
        },
        'Watch': function () {
            var room = DATASOURCE['room'], off_Videos;
            //是不是直播中
            if (room['actorIng'] == 0) {
                if (off_Videos = DATASOURCE['offline_video'][room['roomId']]) { // offline
                    if (!this.offline || this.offline.length == 0) {
                        this.container.i18nAppend(TEMPLATE.OFFLINE).find('[data-role="offline_video_list"]').i18nHTML(off_Videos.map(function (item) {
                            return stringFormat(TEMPLATE.OFFLINE_ITEM, Environment.drawImage(item.video_pic), item.video_desc, item.video_url, room['roomId']);
                        }).join(''));
                        this.container.find('.video_mask').click(function (evt) {
                            this.show_Off_Video($(evt.target).data('url'));
                            $('.iframe_close').show();
                        }.bind(this));
                        $('.video_mask').eq(0).click();
                    } else {
                        this.offline.show();
                        this.wrap.safeHide();
                        this.absent && this.absent.safeHide();
                    }
                } else {
                    if (!this.absent || this.absent.length == 0) {
                        this.render(false);
                    } else {
                        this.absent.safeShow();
                        this.wrap.safeHide();
                    }
                }
            } else {
                if (!this.instance) {
                    this.render(true);
                } else {
                    $('#movie_iframe').html('');
                    $('.offline').hide();
                    $('.offline_video').hide();
                    this.wrap.safeShow();
                    this.absent.safeHide();
                }
            }
        },
        show_Off_Video: function (url) {
            this.container.find('.offline_video').show().find('#movie_iframe').html('<iframe src="' + url + '" width="100%" height="100%" wmode="Opaque"></iframe>');
            this.container.find('.iframe_close').unbind('click').click(function () {
                $(this).parent().hide();
                $('#movie_iframe').html('');
                $('.iframe_close').hide();
            });
        }
    };



    var Communicator = window['Comm'] = {
        'protocol': {
            'socketType': {
                'join': 1,
                'out': 2,
                'video': 3,
                'mute': 4,
                'chat': 5,
                'gift': 6,
                'fly': 7,
                'horn': 8,
                'notice': 9,
                'black': 10,
                'ssong': 11,
                'usong': 12,
                'songs': 13,
                'safe': 14,
                'admin': 15,
                'site': 16,
                'good': 17,
                'keepAlive': 18,
                'userLevel': 19,
                'hostLevel': 20,
                'task': 21,
                'special': 22,
                'update': 23,
                'marquee': 24,
                'topic': 31,
                'focus':29,
                'share':30,
                'stream':39,
                'diamond':35
            },
            'messageType': {
                'chat': 0
            }
        },
        'init': function (container) {
            this.load(container);
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        'load': function (container) {
            window['SocketReady'] = this.ready.bind(this);
            window['StartVideo'] = function () {
                Trigger.emit(CONST.Event.StartVideo)
            };
            window['SocketResponse'] = this.dispatch.bind(this);
            //window['SocketClose'] = function(){Communicator.instance['SocketClose']();};
            this.container = container;
        },
        'render': function () {
            var room = DATASOURCE['room'],isSocketHost;
            if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']))
                isSocketHost = 1;
            else
                isSocketHost = 0;
            this.instance = Flash.render({
                'container': this.container,
                'src': '/room/swf3/communicator.swf?20170418',
                'id': 'communicator',
                'falshvars': {
                    'url': room['chatAddr'],
                    'port': room['port'],
                    'roomId': room['roomId'],
                    'isHost': isSocketHost,
                    'connectionString': JSON.stringify({
                        commandId: 1,
                        loginKey: Cookie.get(Cookie.key['login_key']) || 0,
                        roomId: room['roomId'],
                        type: 1
                    }),
                    'isEntertainment': (room['topCategory']==107)?1:0
                }
            });
        },
        'compose': function () {
            window['VideoClose'] = function(){
                console.log('VideoClose');
                Communicator.instance['VideoShow'](Player.ShowLog);
            };
            window['StartShow'] = function(){
                console.log('timer timer~');
                Communicator.instance['ShowStart']();
            };
            window['EndShow'] = function(){
                console.log('clear timer~ ');
                Communicator.instance['ShowEnd']();
            };
        },
        'bind': function () {
        },
        'start': function () {
        },
        'ready': function () {
            Player.socketReady();
            Trigger.emit(CONST.EVENT.SocketReady);
        },
        'dispatch': function (data) {
            data = JSON.parse(data);
            var socketType = this.protocol['socketType'], room = DATASOURCE['room'];
            switch (data['commandId']) {
                case socketType['video']:
                	if(room["screen"] != data.screenDirection){//当横竖屏切换时强刷页面
                		 window.location.reload();
                	}
                    $.extend(DATASOURCE['room'], {
                        'videoAddr': data['videoAddr'],
                        'prefixion': data['prefixion'],
                        'roomId': data['roomId']
                    });

                    room['actorIng'] = data['videoAddr'] == ''? 0:1;
                    if(DATASOURCE['identity'] == undefined || DATASOURCE['identity']['userId'] !== DATASOURCE['room']['roomUserId']){
                        Player.Watch();
                    }


                    if(data['stopType']==2){
                        window['noReads'] = window['noReads'] || [];
                        window['noReads'].push(data);
                        Player.instance['StopStream']();
                        Trigger.emit(CONST.Event['SocketStop']);
                    }
                    break;
                case socketType['mute']:
                	if((data['toUserId'] == DATASOURCE['identity']['userId'])){
                        if(DATASOURCE['room']['roomId'] == data['userId']){
                        	$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_BanText_By_Host'),Math.floor(data['time']/60000))));
                    	}else{
                    		$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_BanText_By_Admin'),Math.floor(data['time']/60000))));
                    	}
                        UIHelper.updateChatroom();
                	}
                    Trigger.emit(CONST.Event['SocketLeave'], [data]);
                    break;
                case socketType['join']:
	                Trigger.emit(CONST.Event['SocketJoin'], [data]);
	                break;
                case socketType['out']:
                    if(data['outType']==1 && (data['toUserId'] == DATASOURCE['identity']['userId'])){
                        if(DATASOURCE['room']['roomId'] == data['userId']){
                        	$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_RemoveText_By_Host'),Math.floor(data['time']/60000))));
                    	}else{
                    		$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_RemoveText_By_Admin'),Math.floor(data['time']/60000))));
                    	}
                    	UIHelper.updateChatroom();
                    }
                    Trigger.emit(CONST.Event['SocketLeave'], [data]);
                    break;
                case socketType['chat']:
                    Trigger.emit(CONST.Event['SocketChat'], [data]);
                    break;
                case socketType['gift']:
                    Trigger.emit(CONST.Event['SocketGiving'], [data]);
                    break;
                case socketType['good']:
                    Trigger.emit(CONST.Event['SocketFlower'], [data]);
                    break;
//              case socketType['task']:
//                  Trigger.emit(CONST.Event['SocketTask'], [data]);
//                  break;
                case socketType['admin']:
                	if(data['toUserId'] == DATASOURCE['identity']['userId'] && data['toRoomAdmin']){
                        $('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_user_admin'))));
                    	UIHelper.updateChatroom();
                	}else if(data['toUserId'] == DATASOURCE['identity']['userId'] && !data['toRoomAdmin']){
                		$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_user_removeAdmin'))));
                    	UIHelper.updateChatroom();
                	}else if(data['roomId'] == DATASOURCE['identity']['userId'] && data['toRoomAdmin']){
                		$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_admin'),data['toUserName'])));
                    	UIHelper.updateChatroom();
                	}else if(data['roomId'] == DATASOURCE['identity']['userId'] && !data['toRoomAdmin']){
                		$('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_removeadmin'),data['toUserName'])));
                    	UIHelper.updateChatroom();
                	}
                    Trigger.emit(CONST.Event['SocketAdmin'], [data]);
                    break;
                case socketType['marquee']:
                    Trigger.emit(CONST.Event['SocketMarquee'], [data]);
                    break;
                case socketType['update']:
                    Trigger.emit(CONST.Event['SocketPromote'], [data]);
                    break;
                case socketType['focus']:
                    console.dir(data);
                    if(data['state'] == 1) return;
                    var message = stringFormat(i18nTranslate('Room_System_focus'),xss(data['userName']),xss(data['hostName']));
                    $('#chatroom').append(stringFormat(TEMPLATE['CHAT_FOCUS_SHARE'],'system_focus',message,data['userId']));
                    UIHelper.updateChatroom();
                    break;
                case socketType['share']:
                    console.dir(data);
                    var message = stringFormat(i18nTranslate('Room_System_share'),xss(data['userName']));
                    $('#chatroom').append(stringFormat(TEMPLATE['CHAT_FOCUS_SHARE'],'system_share',message));
                   	UIHelper.updateChatroom();
                   	break;
                case socketType['stream']:
                    Player.instance['StopStream']();
                    break;
                case socketType['diamond']:
                    Trigger.emit(CONST.Event['SocketDiamond'], [data]);
                    break;
            }
        },
        'delegate': function (data, cache, success, error) {
//          var action = data['action'],
//              info = $.extend({
//                  'commandId': this.protocol['socketType'][action],
//                  'userId': 0,
//                  'UserType': 0,
//                  'roomId': DATASOURCE['room']['roomId']
//              }, data);
//          Bussiness.postData('room_sendRoomMessage.fly', {
//                  'data': JSON.stringify(info)
//              },
//              success && success.bind(this, cache),
//              error && error.bind(this, cache));
                var action = data['action'],
				info=$.extend({
                    'cmd': this.protocol['socketType'][action],
                    'to': 0,
                    'tp': 0
                }, data);
//              兼容
                if(this.protocol['socketType'][action]==6){  //礼物
                	info.gid=info.giftId;
                }else if(this.protocol['socketType'][action]==5){  //发言
                	info.msg=info.message;
                	info.mtype=info.messageType;
                }
                
console.log(info)
        	var sUrl="service/room/v3/"+DATASOURCE['room']['roomId']+"/send";
             Bussiness.postData(sUrl, {
                    'data': JSON.stringify(info)
                },
                success && success.bind(this, cache),
                error && error.bind(this, cache));
        }
    };
    //礼物区域(全屏)
    var MagicFull = {
        'init': function(container,containerFlash) {
            this.load(container);
            this.loadFlash(containerFlash);
            this.render();
            this.renderFlash();
            this.compose();
            this.bind();
            this.bindFlash();
            this.start();
            this.startFlash();
        },

        'load': function(container) {
            var iFlashBoxW=parseInt( $('#cinema_full').width());
            var iFlashBoxH=parseInt( $('#cinema_full').height());

            this.container = container;
            this.showOption = {
                'width': iFlashBoxW+'px',
                'height':iFlashBoxH+'px'
            };
            this.hideOption = {
                'width': 0,
                'height': 0
            };
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            window['MagicEnd'] = this.magicEnd.bind(this);
            this.thread = 'MagicFull'
        },
		
		'loadFlash': function(containerFlash) {
            var iFlashBoxW = parseInt( $('#cinema_flash').width());
            var iFlashBoxH= parseInt( $('#cinema_flash').height());
            this.containerFlash = containerFlash;
            this.showFlashOption = {
                'width': iFlashBoxW+'px',
                'height':iFlashBoxH+'px'
            };
            this.hideFlashOption = {
                'width': 0,
                'height': 0
            };
            this.showFlash = this.showFlash.bind(this);
            this.hideFlash = this.hideFlash.bind(this);
            window['MagicFlashEnd'] = this.magicFlashEnd.bind(this);
            this.threadFlash = 'MagicFlash'
        },
		
        'render': function() {
        	var swfSrc = '/room/swf3/WebFullScreenAnimation.swf';
//			var swfSrc = '/room/swf3/magic.swf';
        	if($('#container').hasClass("vertical")){//竖屏
        		swfSrc = '/room/swf3/AppFullScreenAnimation.swf';
        	}
            this.instance = Flash.render({
                'container': this.container,
                'src': swfSrc,
                'id': 'magicFull',
                'width': 720,
                'height': 405,
                'callback': function() {
                    new Promise().wait(0).then(function() {
                        this.wrap = $(this.instance);
                        this.hide();
                    }.bind(this)).resolve(); //此处验证了初始resolve的方式有问题，需改进，resolve-> setTimeout
                }.bind(this)
            });
        },
		'renderFlash': function() {
        	var swfSrcFlash = '/room/swf3/WebAnimationFrame.swf';
        	if($('#container').hasClass("vertical")){//竖屏
        		swfSrcFlash = '/room/swf3/AppAnimationFrame.swf';
        	}
            this.instanceFlash = Flash.render({
                'container': this.containerFlash,
                'src': swfSrcFlash,
                'id': 'magicFlash',
                'width': 720,
                'height': 405,
                'callback': function() {
                    new Promise().wait(0).then(function() {
                        this.wrapFlash = $(this.instanceFlash);
                        this.hideFlash();
                    }.bind(this)).resolve(); //此处验证了初始resolve的方式有问题，需改进，resolve-> setTimeout
                }.bind(this)
            });
        },
        
        'compose': function() {
            this.magicQueue = new Queue({
                'handler': this.conjure.bind(this),
                'thread': this.threadFlash
            });
//          this.magicFlashQueue = new Queue({
//              'handler': this.conjureFlash.bind(this),
//              'thread': this.threadFlash
//          });
        },

        'bind': function() {
            Trigger.register(CONST.Event.StartOfQueue + '-' + this.thread, this.structure.bind(this));
            Trigger.register(CONST.Event.EndOfQueue + '-' + this.thread, this.dispose.bind(this));
        },
		'bindFlash': function() {
            Trigger.register(CONST.Event.StartOfQueue + '-' + this.threadFlash, this.structureFlash.bind(this));
            Trigger.register(CONST.Event.EndOfQueue + '-' + this.threadFlash, this.disposeFlash.bind(this));
        },
        
        'start': function() {},
		'startFlash': function() {},
		
        'show': function() {
            this.wrap.css(this.showOption);
            $("#cinema").show();
        },

        'hide': function() {
            this.wrap.css(this.hideOption);
            //主播
            if(DATASOURCE['identity'] && DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']){
            	$("#cinema").css('visibility','hidden');
            }
        },
		
		'showFlash': function() {
            this.wrapFlash.css(this.showFlashOption);
            $("#cinema").show();
        },

        'hideFlash': function() {
            this.wrapFlash.css(this.hideFlashOption);
            //主播
            if(DATASOURCE['identity'] && DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']){
            	$("#cinema").css('visibility','hidden');
            }
        },
		
		
        'conjure': function(item, promise) {
            //this.show();
            
            if(item['url'].substr(0,4) != 'http'){
            	item['url'] = 'http:'+item['url'];
            }
            if(item.type=='full'){
            	this.magicPromise = promise;
            	this.show();
            	this.instance.StartMagic(item['url'], item['id'], item['caption']);
            }else{
            	this.magicFlashPromise = promise;
            	this.instanceFlash.StartMagic(item['url'], item['id'], item['caption']);
            }
            
        },
		
		'conjureFlash': function(item, promise) {
            //this.show();
            this.magicFlashPromise = promise;
            if(item['url'].substr(0,4) != 'http'){
            	item['url'] = 'http:'+item['url'];
            }
            this.instanceFlash.StartMagic(item['url'], item['id'], item['caption']);
        },
		
        'magicEnd': function() {
              this.hide();
            this.magicPromise.resolve();
        },


        'playMagic': function(data) {
            this.magicQueue.enqueue(data);
        },
		
		
		'magicFlashEnd': function() {
            //this.hide();
            this.magicFlashPromise.resolve();
        },


        'playMagicFlash': function(data) {
            this.magicQueue.enqueue(data);
        },
		
        'structure': function() {
            if (this.magicQueue.status == Queue.STATUS.Static )
                this.show();
        },

        'dispose': function() {
            if (this.magicQueue.status == Queue.STATUS.Static )
                this.hide();
        },
        'structureFlash': function() {
            if (this.magicQueue.status == Queue.STATUS.Static )
                this.showFlash();
        },

        'disposeFlash': function() {
            if (this.magicQueue.status == Queue.STATUS.Static)
                this.hideFlash();
        }

    };
    
    //座驾播放
    var MagicCar = {
        'init': function(container) {
            this.load(container);
            this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load': function(container) {
            var iFlashBoxW=parseInt( $('#giftView').width());
            var iFlashBoxH=parseInt( $('#giftView').height());
            this.container = container;
            this.showOption = {
                'width': iFlashBoxW+'px',
                'height':iFlashBoxH+'px'
            };
            this.hideOption = {
                'width': 0,
                'height': 0
            };
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            window['DriveEnd'] = this.driveEnd.bind(this);
            this.thread = 'MagicCar'
        },
        'render': function() {
            this.instanceCar = Flash.render({
                'container': this.container,
                'src': '/room/swf3/DriveAnimationFrame.swf',
                'id': 'MagicCar',
                'width': 270,
                'height': 45,
                'callback': function() {
                    new Promise().wait(0).then(function() {
                        this.wrap = $(this.instanceCar);
                        this.hide();
                    }.bind(this)).resolve(); //此处验证了初始resolve的方式有问题，需改进，resolve-> setTimeout
                }.bind(this)
            });
        },
        'compose': function() {
            this.driveQueue = new Queue({
                'handler': this.drive.bind(this),
                'thread': this.thread
            });
        },

        'bind': function() {
            Trigger.register(CONST.Event.StartOfQueue + '-' + this.thread, this.structure.bind(this));
            Trigger.register(CONST.Event.EndOfQueue + '-' + this.thread, this.dispose.bind(this));
        },

        'start': function() {},

        'show': function() {
//          this.wrap.css(this.showOption);
            $("#giftView").css('visibility','visible');
        },

        'hide': function() {
//          this.wrap.css(this.hideOption);
            $("#giftView").css('visibility','hidden');
        },

        'drive': function(item, promise) {
            //this.show();
            this.drivePromise = promise;
            if(item['url'].substr(0,4) != 'http'){
            	item['url'] = 'http:'+item['url'];
            }
            this.instanceCar.StartDrive(item['url'], item['id'], item['caption']);
        },

        'driveEnd': function() {
            //this.hide();
            
            this.drivePromise.resolve();
        },
        'driveCar': function(data) {
            this.driveQueue.enqueue(data);
        },

        'structure': function() {
            if (this.driveQueue.status == Queue.STATUS.Static)
                this.show();
        },

        'dispose': function() {
            if (this.driveQueue.status == Queue.STATUS.Static)
                this.hide();
        }
    };
    var Environment = (function () {
        return {
            'drawImage': function (src) {
                return DOMAIN_CONFIG['IMAGE_DOMAIN'] + src;
            }
        };
    })();
    var MessageHelper = window['MH'] = {
        'format': function (content, richLevel, userAttr, isHost) {
            return content.replace(/\[(?:[^\]]+?)\]/gi, function (a, b) {
                var emoji = DATASOURCE['emoji'][a];
                //优化快照
                if (emoji) {
                    var group = DATASOURCE['face'][emoji[0]], cell = group['vals'][emoji[1]], src = cell['pic'], height;
                    if (!isHost) {
                        if ((group['tag'] == 1) && (cell['val'] > richLevel)) {
                            return a;
                        } else if ((group['tag'] == 2) && (cell['val'] > (userAttr && userAttr[CONST.UserAttr.Member] || 0))) {
                            return a;
                        }
                    }
                    if (src.toLowerCase().lastIndexOf('.gif') == src.length - 4)
                        height = 40;
                    else
                        height = 24;
                    return '<img src="' + Environment.drawImage(src) + '" height="' + height + '" />';
                } else {
                    return a;
                }
            })
        },
        'safe': function (content) {
            content = content.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
            // content = content.replace(/(?:http[s]?\:\/\/)?(?:\w+)(?:\.\w+)*\.com[\w|=|\?|\.|\/|\&|-]*/gi, function (a) {
            //     if (a.indexOf('http') != 0)
            //         a = 'http://' + a;
            //     return stringFormat('<a href="{0}" target="_blank">{0}</a>', a);
            // });
            return content;
        }
    };
    var UIHelper = {
        'attribute': {
            'horizontal': ['scrollLeft', 'scrollWidth', 'offsetWidth'],
            'vertical': ['scrollTop', 'scrollHeight', 'offsetHeight']
        },
        'initScroller': function (element, option) {
            Ps.initialize(element, option);
        },
        'updateScroller': function (element, direction) {
            var attr = this.attribute[direction ? 'horizontal' : 'vertical'];
            var delta = element[attr[0]] = element[attr[1] - attr[2]];
            if (delta > 0)
                Ps.update(element);
        },
        'refreshScroller': function (element) {
            Ps.update(element);
        },
        'updateChatroom': function (element) {
            var chatroomPanel = $('#chatroom').parent()[0];
        	var delta = chatroomPanel.scrollTop = chatroomPanel.scrollHeight - chatroomPanel.offsetHeight;
            if (delta > 0)
                Ps.update(chatroomPanel);
        }
       
    };
    var UserHelper = (function () {
        var defaultHead = 'systemRes/img/default/nophoto.jpg',
            fullDefaultHead = Environment.drawImage(defaultHead);
        fullDefaultHead = fullDefaultHead.replace('/', '\/');
        fullDefaultHead = 'onerror="this.src=\'' + fullDefaultHead + '\';"';
        var badgeTemplate = '<img src="{0}" title="{1}" data-badgeid="{2}"/>';
        return {
            'validate': function () {
                var identified = DATASOURCE['identity'];
                if (!identified) {
                    login_util.show_login_div();
                }
                return identified;
            },
            'portrait': function (src) {
                return stringFormat('<img src="{0}" {1} />',
                    Environment.drawImage(src || defaultHead),
                    fullDefaultHead);
            },
            'vipType': function (type) {
            	var vipCss = '';
            	if(type==1){
            		vipCss = 'vip'
            	}else if(type==2){
            		vipCss = 'svip'
            	}
                return vipCss;
            },
            'level': function (entity) {
                return stringFormat(imageTemplate, Environment.drawImage(DATASOURCE['richLevel'][entity['richLevel'] || 1]['pic']));
            },
            'badge': function (entity) {
                var data;
                data = (data = (entity.userAttr || entity.ua)) && (data = data[CONST.UserAttr.Badge]);
                if (!data || data.length == 0) {
                    return STRING_EMPTY;
                }
                var temp;
                return data.map(function (item, index) {
                    temp = DATASOURCE['badge'][item];
                    if (temp) {
                        return stringFormat(badgeTemplate, Environment.drawImage(temp['p']), STRING_EMPTY,item);
                    }
                    return STRING_EMPTY;
                }).join(STRING_EMPTY);
            },
            'consume': function (entity, type) {
                switch (type) {
                    case 'top7':
                        return entity['rankCost'];
                    case 'top1':
                        return entity['roomCost'];
                }
                return 0;
            },
            'estimate': function (entity) {
                var AdminType = CONST.AdminType,
                    UserAttr = CONST.UserAttr,
                    value = 0,
                    ratio = Math.pow(10, 14),
                    temp = 0;
                switch (entity['adminType']) {
                    case AdminType.Host:
                        temp = 3;
                        break;
                    case AdminType.Constable:
                        temp = 2;
                        break;
                }
                if (entity['roomAdmin'])
                    temp = 1;
                value += ratio * temp;
                ratio = Math.pow(10, 13);
                temp = (temp = entity['userAttr']) && temp[UserAttr.Member] || 0;
                value += ratio * temp;
                ratio = Math.pow(10, 10);
                temp = entity['richLevel'];
                value += ratio * temp;
                value += entity['roomCost'];
                return value;
            }
        }
    })();
//  var Header = {
//      'init': function (option) {
//          this.load(option);
//          this.render();
//          this.compose();
//          this.bind();
//          this.start();
//      },
//      'load': function (option) {
//          $.extend(this, option);
//      },
//      'render': function () {
//          this.container = this.container;
//          this.container.i18nHTML(stringFormat(TEMPLATE['HEADER'], DOMAIN_CONFIG['IMAGE_DOMAIN']));
//          this.anonymous = this.container.find('[data-role="anonymous"]');
//          this.user = this.container.find('[data-role="user"]');
//      },
//      'compose': function () {
//      },
//      'bind': function () {
//          $('[data-role="signin"]', this.container).unbind("click").click(function () {
//              login_util.show_login_div();
//          });
//          $('[data-role="signup"]', this.container).unbind("click").click(function () {
//              login_util.show_register_div();
//          });
//          $('[data-role="i18n"]').unbind("click").click(function () {
//              var I18N = require(useJSComponent('kit')).use('I18N');
//              I18N.localize(I18N.reverse());
//          });
//      },
//      'start': function () {
//      },
//      'identified': function (identity) {
//          this.identity = identity;
//          if (this.identity) {
//              this.anonymous.safeHide();
//              if (!identity['userHeadPic'])
//                  identity['userHeadPic'] = 'systemRes/img/default/nophoto.jpg';
//              var vipIcon = identity['userAttr'][3] > 0 ? (identity['userAttr'][3] > 1 ? '<span class="svip_flag"><a href="/myinfo.shtml" style="display:block;height:100%" target="_blank"></a></span>' : '<span class="vip_flag"><a href="/myinfo.shtml" style="display:block;height:100%" target="_blank"></a></span>') : '<span><a href="/myinfo.shtml" style="display:block;height:100%" target="_blank"></a></span>',
//                  user_detail = stringFormat(TEMPLATE.HEADER_USER_DETAIL, UserHelper.portrait(identity['userHeadPic']), identity.userNickName, vipIcon, identity.userId,
//                      STRING_EMPTY, identity['userBalance'] + identity['userReturnBalance'], identity.host ? STRING_EMPTY : 'display:none;', '/live/' + identity.userSurfing);
//              this.user.i18nHTML(
//                  stringFormat(TEMPLATE.HEADER_USER, UserHelper.portrait(identity['userHeadPic']), identity.userId, identity.userNickName, identity['userBalance'] + identity['userReturnBalance'], vipIcon, user_detail)).safeShow();
//              var user_detail_badge = this.user.find('[data-role="user_detail_badge"]'),
//                  detail = this.user.find('[data-role="user_detail"]');
//              top_util.init_top(identity);
//              if (identity.host) {
//                  var userSurfing=identity.userSurfing;
//                  $(".nav_self_living").removeClass("hidden");
//                  $(".nav_self_living a").attr("href","/live/"+userSurfing);
//              }
//              $('#bar .nav_exit').removeClass('hidden');
//              $('body').find("[name='login_out_buttom']").unbind("click").click(function () {
//                  user_util.user_out('login_util', 'user_out');
//              });
//              this.user.on('mouseenter', function () {
//                  DATASOURCE['richLevel'] && this.reset_user_level(identity);
//                  DATASOURCE['badge'] && user_detail_badge.html(UserHelper.badge(identity));
//                  //detail.show();
//              }.bind(this)).on('mouseleave', function () {
//                  //detail.hide();
//              }.bind(this));
//          } else {
//              this.user.safeHide();
//              this.anonymous.safeShow();
//          }
//      },
//      reset_user_level: function (identity) {
//          if (!identity) return;
//          var level = 0,
//              level_score = 0,
//              level_obj = null,
//              next_level_obj = null,
//              exp = 100,
//              score = 0;
//          level = identity.host ? identity.hostLevel : identity.userLevel;
//          level_score = identity.host ? identity.hostLevelScore : identity.userLevelScore;
//          if (identity.host) {
//              level_obj = DATASOURCE['hostLevel'][level];
//              next_level_obj = DATASOURCE['hostLevel'][level + 1];
//          } else {
//              level_obj = DATASOURCE['richLevel'][level];
//              next_level_obj = DATASOURCE['richLevel'][level + 1];
//          }
//          if (level_obj && next_level_obj) {
//              exp = (((level_score - level_obj.score) / (next_level_obj.score - level_obj.score)) * 100).toFixed(0);
//              $("[name='level_img']").attr("src", DOMAIN_CONFIG['IMAGE_DOMAIN'] + level_obj.pic);
//          }
//          exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
//          $('[name="level_persent"]').css({
//              width: (exp < 15 ? (exp < 1 ? 0 : 15) : exp) + '%'
//          });
//          if (exp < 1) {
//              $("[name='level_persent'] font").attr('color', '#868181');
//          } else {
//              $("[name='level_persent'] font").removeAttr('color');
//          }
//          $("[name='level_persent'] font").text(exp + '%');
//          if (next_level_obj) {
//              score = next_level_obj.score - level_score;
//          }
//          $('[name="next_level_score"]').text(score > 0 ? score : (score < 0 ? 0 : score));
//      }
//  };
    var Counting = window['ct'] = {
        'init': function () {
            var field = 'totalBalance',
                temp = DATASOURCE['identity'];
            if (temp && (temp = temp['userId'])) {
                if (temp == (temp = DATASOURCE['room'])['roomUserId'])
                    field = 'totalExchangeBalance';
            } else
                temp = DATASOURCE['room'];
            this.total = this.aim = temp[field];
            if (field == 'totalExchangeBalance')
                (this.instance = $('#income')).html(this.total).safeShow();
            else
                this.update = function () {
                };
        },
        'update': function (delta,diamond) {
            if (delta > 0 && !(diamond==1))
                this.aim += delta;
            if (!this.growing && !(diamond==1))
                this.grow();
        },
        'grow': function (diamond) {
            if (this.total >= this.aim) {
                this.growing = false;
                return;
            }
            this.growing = true;
            new Promise().wait(42).then(function () {
                this.instance.html(++this.total);
                this.grow();
            }.bind(this)).resolve();
        }
    };
    var Emoji = OOP.create('Emoji',function(option){
        this.load(option);
        this.render();
        this.compose();
        this.bind();
        this.start();
    },{
        'load':function(option){
            this.container = option.container || $('.send_area');
            this.chatMode = CONST.ChatMode.Whisper;
            this.emojiDOM = option.emojiDOM || this.container.find('[data-role="emoji"]');
            this.faceDOM = option.faceDOM || this.container.find('[data-role="face"]');
            this.messageDOM = option.messageDOM || this.container.find('[data-role="message"]');
            this.whisperID = option.whisperID;
            this.sayDOM = option.sayDOM || this.container.find('[data-role="say"]');
            this.sayWhisper = option.sayHandler;
            this.sayCallback  = option.sayCallback;
            this.range = this.faceDOM.find('[data-role="list"]');
            this.list = this.range.find('ul');
        },
        'render': function() {
            var isHost;
            isHost = (isHost = DATASOURCE['identity']) && (isHost['userId'] == DATASOURCE['room']['roomUserId']);
            var tab = this.faceDOM.find('[data-role="tab"]'),
                face = DATASOURCE['face'],
                items = [],
                item, temp;
            var groupTemplate = '<li><img src="{0}"></li>',
                unitTemplate = '<li class="{0}" data-code="{0}" data-advance="{1}"{2}>{3}</li>',
                levelTemplate = ' data-level="{0}"',
                vipTemplate = ' data-vip="{0}"',
                lockTemplate = '<span class="lock"></span>';
            var trim = function(code) {
                return code.replace(/^\[|\]$/gi, STRING_EMPTY);
            };
            var cache = DATASOURCE['emoji'] = {};

            var level = DATASOURCE['identity'] ? DATASOURCE['identity']['userLevel'] : 0,
                vipType = DATASOURCE['identity'] ? DATASOURCE['identity']['vipType'] : 0,
                lock,
                dict;
			
            this.dict = dict = {};

            face.forEach(function(group, index) {
                item = {
                    'index': index,
                    'element': $(stringFormat(groupTemplate, Environment.drawImage(group['iconUrl']))).appendTo(tab),
                    'list': $(this.list[index]).html(group['vals'].map(function(f, j) {
                        cache[temp = f['code']] = [index, j];
                        dict[f['code']] = f['pic'] || '';
                        switch (group['tag']) {
                            case 0:
                                return stringFormat(unitTemplate, trim(temp), f['faceSendFlag'], STRING_EMPTY, STRING_EMPTY);
                            case 1:
                                return stringFormat(unitTemplate, trim(temp), f['faceSendFlag'], (lock = (f['val'] > level) && !isHost) ? stringFormat(levelTemplate, f['val']) : STRING_EMPTY, lock ? lockTemplate : STRING_EMPTY);
                            case 2:
                                return stringFormat(unitTemplate, trim(temp), f['faceSendFlag'], (lock = (f['val'] > vipType) && !isHost) ? stringFormat(vipTemplate, f['val']) : STRING_EMPTY, lock ? lockTemplate : STRING_EMPTY);
                        }
                    }).join(''))
                };
                item['enter'] = function() {
                    this.element.addClass('on');
                    this.list.safeShow();
                }.bind(item);
                item['quit'] = function() {
                    this.element.removeClass('on');
                    this.list.safeHide();
                }.bind(item);
                items.push(item);
            }.bind(this));
            this.emojiMutex = new(Kit.use('Mutex'))({
                'items': items
            });
        },

        'compose': function() {},

        'bind': function() {
            function wrapCode(code) {
                return '[' + code + ']';
            }
            this.emojiDOM.on('click', function() {
                if (this.faceDOM.is(':visible'))
                    this.faceDOM.safeHide();
                else
                    this.faceDOM.safeShow();
            }.bind(this));

            this.sayDOM.on('click',this.sayWhisper.bind(this));
            this.messageDOM.on('keypress', function(evt) {
                if (evt.keyCode == 13)
                    this.sayWhisper.call(this);
            }.bind(this));
            this.messageDOM.on('keydown', function(evt) {
                var messageJDOM=$(this),
                    message=messageJDOM.val(),
                    tempFlag='';

                if(evt.keyCode == 8){
                   if(tempFlag=message.match(/\[[^\]]*\]$/)){
                       evt.preventDefault();
                       messageJDOM.val(message.replace(tempFlag,''));
                   }
                }
            });

            this.list.on('click', '[data-code]', function (evt) {
                var target = $(evt.currentTarget),
                    code = target.data('code'),
                    level = target.data('level'),
                    index = target.index();
                //this.faceDOM.safeHide();
                if (!code)
                    return;
                code = wrapCode(code);
                var advance = parseInt(target.data('advance'));
                if (advance) {
                    if (!UserHelper.validate())
                        return;
                    var top = target.position().top - 55 + 'px';
                    var hIndex = index % 5,
                    arrPos = ['right:73px','right:42px','right:0px','right:42px','right:0px'],
                    arrowPos;
                    arrowPos = index % 5 < 3 ? 'left:32px':' right:38px';
                    if (level) {
                        Trigger.emit(CONST.Event.PopupText, [this.faceDOM, '<p class="lock_tip" style="' + arrPos[hIndex] + ';top:' + top + ';">' + stringFormat(i18nTranslate('Room_TounlockInLevel'), level) + '<em style="'+arrowPos+'"></em></p>']);
                        return;
                    } else if (target.find('span.lock').length > 0) {
                        Trigger.emit(CONST.Event.PopupTip, [{
                            'template': TEMPLATE.BUYVIP,
                            'isBind': true,
                            'top': '100px'
                        }]);
                        return;
                    }
                    this.messageDOM.val(code);
                    this.sayWhisper.call(this);
                } else
                    this.messageDOM.val(this.messageDOM.val() + code);
                this.faceDOM.safeHide();
            }.bind(this));
            ClickCollect.register('emoji', this.faceDOM);

            function preview(code, index) {
                var url = this.dict[wrapCode(code)];
                if (!url)
                    return;
                var style = index % 5 <= 2 ? 'side1' : 'side2';
                if (previewStyle != style) {
                    previewDOM.removeClass(previewStyle).addClass(style);
                    previewStyle = style;
                }
                previewDOM.html(stringFormat(imageTemplate, DOMAIN_CONFIG['IMAGE_DOMAIN'] + url));
            }

            var previewDOM = this.range.find('.emoji_preview'),
                previewStyle;
            this.list.on('mouseenter', '[data-advance]', function(evt) {
                var target = evt.currentTarget;
                if (!target)
                    return;
                target = $(target);
                if (parseInt(target.attr('data-advance')) == 1)
                    preview.apply(this,[target.attr('data-code'),target.index()]);
                //preview.bind(this,target.attr('data-code'),target.index());
            }.bind(this));
            this.list.on('mouseleave', function(evt) {
                previewDOM.removeClass(previewStyle).html(STRING_EMPTY);
                previewStyle = null;
            }.bind(this));
        },

        'start': function(){}
    });
    var Whisper = {
        'init':function(container){
            this.container = container;
            this.more_list = this.container.find('#whisper_list');
            this.more_list_top = this.container.find('.whisper_chat_list_top');
            this.more_list_ul = this.container.find('.whisper_chat_list_ul')[0];
            this.emoji_list = [];
            this.whisperTpl = '<div class="privateSend clearfix {2}" data-whisper="{0}">\
                                        <em class="hidden"></em>\
                                       <div class="privateTop">\
                                            <span class="privateName" data-role="whisper_tog">{1}</span>\
                                            <a data-role="whisper_clz" class="privateClose" href="javascript:;"></a>\
                                       </div>\
                                        <div class="whisper_wrap">\
                                            <div class="whisper_chat_area">\
                                                <ul data-role="whisper_chatroom"></ul>\
                                            </div>\
                                            <div class="whisper_send_area clearfix">\
                                                <div class="whisper_emoji_block" data-collector="emoji">\
                                                    <span data-role="emoji" data-stat="Room_btn_emoji" class="whisper_btn_emoji"></span>\
                                                    <div data-role="face" class="whisper_emoji_wrap hidden">\
                                                        <div data-role="list" class="emoji_area">\
                                                            <ul class="emoji_common hidden"></ul>\
                                                            <ul class="emoji_level hidden"></ul>\
                                                            <ul class="emoji_vip hidden"></ul>\
                                                            <ul class="emoji_lion hidden"></ul>\
                                                            <div class="emoji_preview"></div>\
                                                        </div>\
                                                        <ul data-role="tab" class="emoji_tab"></ul>\
                                                    </div>\
                                               </div>\
                                                <input data-role="message" class="whisper_message readStart" type="text" name="message">\
                                                <input data-role="say" data-i18n="Room_Send_Message" value="{{Room_Send_Message}}" class="whisper_send" type="button" name="send">\
                                            </div>\
                                        </div>\
                                        <li data-more="{0}" class="hidden whisper_user">\
                                            <a data-role="whisper_rmv" href="javascript:;"></a>\
                                            <span>{1}</span>\
                                        </li>\
                                    </div>';
            this.container.on('click','[data-whisper]',function(evt){
                var $curTarget = $(evt.currentTarget),
                    $tar = $(evt.target),
                    whisperID = $curTarget.data('whisper');
                switch($tar.data('role')){
                    case 'whisper_clz':
                        this.close(whisperID);
                        break;
                    case 'whisper_tog':
                        this.toggle($curTarget);
                        break;
                    default:
                        break;
                }
            }.bind(this));
            this.more_list.on('click','[data-more]',function(evt){
                var $curTarget = $(evt.currentTarget),wID = $curTarget.data('more'),wName = $curTarget.find('span').html() ;
                if($(evt.target).data('role') == 'whisper_rmv'){
                    this.close(wID);
                }
                else{
                    this.restore(wID);
                }
            }.bind(this));
            Ps.initialize(this.more_list_ul);
        },
        'toggle':function(oWin){
            oWin.toggleClass('folded').find('em').safeHide();
            oWin.find('[data-more]').removeClass('whisper_user_news').safeHide();
        },
        'close':function(whisperId){
            var oWin = this.container.find('[data-whisper="'+ whisperId+'"]').appendTo(this.container).safeHide(),
                mWin = this.more_list.find('[data-more="'+ whisperId +'"]');
            if(mWin.length>0)
                mWin.safeHide().appendTo(oWin);
            if(this.more_list.children().length==0)
                this.more_list_top.safeHide();
            if(!oWin.hasClass('folded')) oWin.addClass('folded');
        },
        'more':function(oWin){
            oWin.appendTo(this.container).safeHide().find('[data-more]').appendTo(this.more_list).safeShow();
            this.more_list_top.safeShow();
            Ps.update(this.more_list_ul);
        },
        'restore':function(whisperId){
            var showWins = this.container.find('.privateSend').not(':hidden');
            if(showWins.length>=3){
                this.more(showWins.eq(0));
            }
            var oWin = this.container.find('[data-whisper="'+ whisperId+'"]').appendTo(this.container).safeShow().removeClass('folded');
            oWin.find('em').safeHide();
            this.more_list.find('[data-more="'+ whisperId +'"]').removeClass('whisper_user_news').appendTo(oWin).safeHide();
            if(this.more_list.children().length==0)
                this.more_list_top.safeHide();
        },
        'create':function(whisperID,whisperName,sayHandler,sayCallbackHandler,force){
            var oWin = this.container.find('[data-whisper="'+ whisperID+'"]');
            var wins = this.container.find('.privateSend').not(':hidden'),len = wins.length;
            if(len>=3 && !force)
                this.more(wins.eq(0));
            if(oWin.length>0){
                this.toggle(oWin);
                oWin.appendTo(this.container).safeShow();
                return;
            }
            var newWin = $(I18N.evaluate(stringFormat(this.whisperTpl,whisperID,whisperName,force?'hidden folded':''))).appendTo(this.container);
            if(force){
                //$('#whisper').find('em').safeShow();
                newWin.find('[data-more]').addClass('whisper_user_news').safeShow();
                this.more(newWin);
            }
            Ps.initialize(newWin.find('.whisper_chat_area')[0]);
            var emoji_opt = {
                'emojiDOM':newWin.find('[data-role="emoji"]'),
                'faceDOM':newWin.find('[data-role="face"]'),
                'messageDOM':newWin.find('[data-role="message"]'),
                'sayDOM':newWin.find('[data-role="say"]'),
                'chatMode':CONST.ChatMode.Whisper,
                'whisperID':whisperID,
                'sayHandler':sayHandler,
                'sayCallback':sayCallbackHandler
            };
            this.emoji_list[whisperID] = new Emoji(emoji_opt);
        }
    };
    var Card = (function(){
        var self = DATASOURCE['identity'], hidden = ' hidden';
        var selfType, selfHost, selfRoomAdmin;
        if (!self)//未登录
            return;
        var AdminType = CONST.AdminType, selfID = self['userId'];
            selfHost = selfID == DATASOURCE['room']['roomUserId'];
        var correction = {
            'left': 90,
            'top': 8
        };

        return {
            'adminRight':function (targetType, targetRoomAdmin){
                if (selfType == AdminType.Host || selfType == AdminType.Constable) {
                    if (targetType != AdminType.Constable)
                        return true;
                } else if (selfRoomAdmin) {
                    if (targetType != AdminType.Host && targetType != AdminType.Constable)
                        return true;
                }
                return false;
            },
            'render':function(cardDOM,data) {
                cardDOM.safeHide();
                var target = data;
                if (!target)
                    return false;
                var lookUserId = DATASOURCE['identity']['userId'];
                //var lookUser = this.users[lookUserId];
                var lookUser = DATASOURCE['identity'];
                console.log(this.users)
                console.log(lookUserId)
                //var lookType = lookUser['adminType'];
                var lookType = DATASOURCE['identity']['userType'];
                //查看用户的类型(0:用户，1：主播：3，管理员)
                var beLookType = target['rut']; //adminType
                //被查看人的类型(0:用户，1：主播：3，管理员)
                var isRoomAdmin = target['ia'];
                var isSelfLook = false;
                //自己查看自己

                if (DATASOURCE['identity'] && DATASOURCE['room']['roomUserId'] == DATASOURCE['identity']['userId']) {
                    lookType = "host";
                    //主播
                } else if (DATASOURCE['identity'] && DATASOURCE['room']['roomUserId'] != DATASOURCE['identity']['userId'] && lookUser['roomAdmin']) {
                    lookType = "manager";
                    //管理员
                } else if (lookUser && lookUser['adminType'] == 2) {
                    lookType = "constable";
                    //系统管理员
                } else {
                    lookType = "user";
                    //用户
                }
                if (target['uid'] == DATASOURCE['identity']['userId']) {
                    isSelfLook = true;
                }

                if (isSelfLook) {
                    cardDOM.i18nHTML(stringFormat(TEMPLATE['MANAGE_NEW'], UserHelper.portrait(target['hp']), xss(target['nn']), this.manageID, '', hidden, hidden, hidden, beLookType == 1 ? this.userDataObj["tr"] : this.userDataObj['tc'], //cost
                        UserHelper.badge(target), UserHelper.badge(target) ? '' : hidden, this.userDataObj['fsn']));
                    //follow
                } else {
                    if (lookType == "host") {
                        cardDOM.i18nHTML(stringFormat(TEMPLATE['MANAGE_NEW'], UserHelper.portrait(target['hp']), xss(target['nn']), this.manageID, stringFormat(TEMPLATE['MENU_NEW'], (isRoomAdmin || beLookType == 2) ? hidden : STRING_EMPTY, isRoomAdmin ? STRING_EMPTY : hidden, beLookType == 2 ? hidden : STRING_EMPTY, beLookType == 2 ? hidden : STRING_EMPTY, target['ua']['3'] == 2 ? STRING_EMPTY : hidden), hidden, hidden, '', beLookType == 1 ? this.userDataObj["tr"] : this.userDataObj['tc'], UserHelper.badge(target), UserHelper.badge(target) ? '' : hidden, this.userDataObj['fsn']));
                    } else if (lookType == "constable") {
                        cardDOM.i18nHTML(stringFormat(TEMPLATE['MANAGE_NEW'], UserHelper.portrait(target['hp']), xss(target['nn']), this.manageID, stringFormat(TEMPLATE['MENU_NEW'], hidden, hidden, STRING_EMPTY, STRING_EMPTY, (beLookType == 1 && target['ua']['3'] == 2) ? STRING_EMPTY : hidden), hidden, hidden, hidden, beLookType == 1 ? this.userDataObj["tr"] : this.userDataObj['tc'], UserHelper.badge(target), UserHelper.badge(target) ? '' : hidden, this.userDataObj['fsn']));
                    } else if (lookType == "manager") {
                        cardDOM.i18nHTML(stringFormat(TEMPLATE['MANAGE_NEW'], UserHelper.portrait(target['hp']), xss(target['nn']), this.manageID, (beLookType == 0 || beLookType == 1) ? stringFormat(TEMPLATE['MENU_NEW'], hidden, hidden, (isRoomAdmin || beLookType == 1) ? hidden : STRING_EMPTY, (isRoomAdmin || beLookType == 1) ? hidden : STRING_EMPTY, beLookType == 1 ? STRING_EMPTY : hidden) : STRING_EMPTY, (beLookType == 1 && !DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY : hidden, (beLookType == 1 && DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY : hidden, '', beLookType == 1 ? this.userDataObj["tr"] : this.userDataObj['tc'], UserHelper.badge(target), UserHelper.badge(target) ? '' : hidden, this.userDataObj['fsn']));
                    } else if (lookType == "user") {
                        cardDOM.i18nHTML(stringFormat(TEMPLATE['MANAGE_NEW'], UserHelper.portrait(target['hp']), xss(target['nn']), this.manageID, beLookType == 1 ? stringFormat(TEMPLATE['MENU_NEW'], hidden, hidden, hidden, hidden, STRING_EMPTY) : STRING_EMPTY, (beLookType == 1 && !DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY : hidden, (beLookType == 1 && DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY : hidden, '', beLookType == 1 ? this.userDataObj["tr"] : this.userDataObj['tc'], UserHelper.badge(target), UserHelper.badge(target) ? '' : hidden, this.userDataObj['fsn']));
                        //follow
                    }
                }
                return true;
            },
            'location':function manage(target,cardDOM) {
                var chatLeft = 0 + correction['left'];
                var chatRight = "auto";
                if ($("#container").hasClass("arabic")) {
                    chatRight = 0 + correction['left'];
                    chatLeft = "auto";
                }
                var chatTop = target.parent().position()['top'] + correction['top'];
                var chatBottom = "auto";
                var position = {
                    'left': chatLeft,
                    'right': chatRight,
                    'top': chatTop,
                    'bottom': chatBottom
                };
                cardDOM.css(position).safeShow();
            },
            'manage': function(evt,cardDOM,userType) {
                var target = $(evt.currentTarget);
                var manageID = target.data('identity');
                selfType = self['userType'];
                selfRoomAdmin = self['roomAdmin'];
                this.manageID = manageID;
                var userType = userType == undefined ? this.users[this.manageID]['userType'] : userType;
                lock = true;
                $.ajax({
                    url: '/service/room/v3/u/v4/' + DATASOURCE['room']['roomId'] + '/' + this.manageID + '/' + userType,
                    type: "get",
                    dataType: 'json',
                    success: function(result) {
                        //	                		console.log(result)
                        this.userDataObj = result.dataInfo;
                        if (Card.render.call(this,cardDOM,result.dataInfo))
                            Card.location(target,cardDOM);
                        if (result['code'] == 0) {} else if (result['code'] == 99) {
                            return false;
                        }
                        lock = false;
                    }.bind(this)
                });
            },
            'action':function(evt,cardDOM){
                var target = $(evt.currentTarget), action = target.data('action');
                switch (action) {
                    case 'whisper':
                        Trigger.emit('Manage-Whisper', [this.manageID]);
                        //this.rightSwitch(null, true);
                        break;
                    case 'admin':
                    case 'mute':
                    case 'out':
                        this.manage(action, this.manageID, parseInt(target.data('state')));
                        break;
                    case 'Follow':
                        this.userCardFollow(true);
                        break;
                    case 'UnFollow':
                        this.userCardFollow(false);
                        break;
                    case 'Report':
                        this.userCardReport(this.manageID);
                        break;
                }
                cardDOM.safeHide();
                this.manageID = null;
            }
        };
    })();
    var Page = {
        'run': function () {
            this.load();
            this.render();
            this.compose();
            this.show_Broadcast_self();
            this.start();
            this.notClosedPop();
        },
        'load': function () {
            var sourceIdentity,sourceRoom;
            if (!DATASOURCE)
                DATASOURCE = {};
            else{
                if(sourceIdentity = DATASOURCE['identity']){
                    sourceIdentity['userNickName'] = xss(DATASOURCE['identity']['userNickName']);
                }
                if(sourceRoom = DATASOURCE['room']){
                    sourceRoom['roomUserName'] = xss(sourceRoom['roomUserName']);
                    sourceRoom['topic'] = xss(DATASOURCE['room']['topic']);
                    sourceRoom['roomNotice'] = xss(DATASOURCE['room']['roomNotice']);
                }
            }
            this.chatMode = CONST.ChatMode.Speech;
            this.sayCallback = this.sayCallback.bind(this);
            this.fansCallback = this.fansCallback.bind(this);
            this.specialCallback = this.specialCallback.bind(this);
            this.giftCallback = this.giftCallback.bind(this);
        },
        'render': function () {
            this.containerDOM = $('#container');
           	if(DATASOURCE['room']["screen"] != 0 && (!DATASOURCE['identity'] || (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId'])))){//非主播且竖屏
        		this.containerDOM.addClass("vertical");
        		$("#absent").css("background","url('/resource/static/image/show/absent_bgS.jpg') no-repeat");
        		$("#absent").css("background-size","100%");
           	}
           	//游戏体育，强转横版
//         	if(this.containerDOM.hasClass("vertical")){
//         		if(DATASOURCE['room'].topCategory==112 || DATASOURCE['room'].topCategory==106){
//	           		this.containerDOM.removeClass("vertical");
//	        		$("#absent").css("background","url('/resource/static/image/show/absent_bg.jpg') no-repeat");
//	        		$("#absent").css("background-size","100%");
//	           	}
//         	}
           	
            this.videoHtml = $("#roomTop").html();
            this.containerDOM.i18nHTML(Headers.html()  + stringFormat(TEMPLATE.MAINS));
            this.containerDOM.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.containerDOM.find('[data-role="task"]').i18nHTML(_task.html());
//          this.containerDOM.i18nAppend(TEMPLATE['TASK']).i18nAppend(TEMPLATE['WHISPERAREA']);
            this.containerDOM.i18nAppend(TEMPLATE['WHISPERAREA']);
            this.barDOM = $('#bar');
            this.roomDOM = $('#room');
            this.roomTopDOM = $('#roomTop');
            this.roomGiftDOM = $('#roomGift');
            this.roomBottomDOM = $('#roomBottom');
            this.roomRightDOM = $('#roomRight');
            this.shoreBtnsDOM = $('#shore_btns');
            this.roomTopDOM.i18nAppend(stringFormat(TEMPLATE.CINEMA));
            this.roomRightDOM.i18nHTML(TEMPLATE.RIGHT);
            this.roomTopDOM.append(this.videoHtml);
            this.absentDOM = $('#absent');
            this.cinemaDOM = $('#cinema_full');
            this.cinemaFlashDOM = $('#cinema_flash');
            this.roomMiddleDOM = $('#roomMiddle');
            this.giftViewDOM = $('#giftView');
            $('body').css('background-color','#fff');
            this.containerDOM.addClass('container clearfix').css({'padding':'0'});
            $('#video').append('<p id="giftMagic" class="hidden"></p><p id="income" class="host_wealth hidden"></p>');
            this.whisperDOM = $('#whisper_area');
            this.popupContDom = $(".popup_cont");
            
        },
        'compose': function () {
            Communicator.init(this.containerDOM);
            //Magic.init(this.cinemaDOM);
            Player.init(this.playerDOM);
            I18N.init({'onLocalize': this.localize.bind(this)});
            login_util.setCallback(function () {
                location.reload();
            });
            Headers.init({
                'container': this.container
            });
            _nav.init({
                'container': this.container
            });
            _task.init({
                'container': this.container
            });
            require.async('component/sign', function (sign) {
                (this.sign = sign).start();
            }.bind(this));
            ClickCollect.init();
            Counting.init();
            Whisper.init(this.whisperDOM);
        },
        'start': function () {
            var promise = new Promise(function(){
            	Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
					if(data.code==0){
						 DATASOURCE['messages_length'] = data['dataInfo']['list'].length;
					}
                    promise.resolve();
                    
				}.bind(this),null,true);
            }.bind(this)).then(
                function () {
                    Bussiness.getJSON('system/version_data.json', function (data) {
                        DATASOURCE['version'] = data;
                        promise.resolve(data);
                    }.bind(this));
                }.bind(this)).then(this.structure.bind(this));
        },
        'structure': function (VERSION) {
            var promise = new Promise(function () {
                Bussiness.getData('data/mobile/v3/?badge=&requestType=1',function(data){
                    if(data.code == 0)
                        DATASOURCE['badge'] = data.dataInfo.badge.d;
                        promise.resolve();
                }.bind(this),null,true);
            }).then(function () {
            	//用户等级
            	Bussiness.getData('data/static/v4/?userlevel',function(data){
            			if(data.code==0){
                            var userL = data.dataInfo.userlevel.d;
                            var USERLVE = {};
                            for(var i in userL){
                                USERLVE[i] ={
                                    name :userL[i].n,
                                    pic: userL[i].p,
                                    score:userL[i].s
                                }
                            }
            				DATASOURCE['richLevel'] = USERLVE;
                        	promise.resolve();
            			};
            		}.bind(this), VERSION['richLevel'],true)
//                  Bussiness.getJSON('level/rich_level_data.json', function (data) {
//                      DATASOURCE['richLevel'] = data;
//                      promise.resolve();
//                  }.bind(this), VERSION['richLevel']);
               }).then(function () {
               	//主播等级
                	Bussiness.getData('data/static/v4/?hostlevel',function(data){
                		if(data.code==0){
                            var Hostle = data.dataInfo.hostlevel.d;
                            var hostLVE = {};
                            for(var i in Hostle){
                                hostLVE[i]={
                                    name : Hostle[i].n,
                                    pic:Hostle[i].p,
                                    score:Hostle[i].s
                                }
                            }
	                		DATASOURCE['hostLevel'] = hostLVE;
	                		promise.resolve();
                		}
                	}.bind(this), VERSION['host_level_v2'],true);
//                  Bussiness.getJSON('level/host_level_data.json', function (data) {
//                      DATASOURCE['hostLevel'] = data;
//                      promise.resolve();
//                  }.bind(this), VERSION['host_level_v2']);
                }).then(function () {
                	//表情
                	Bussiness.getData('data/static/v4/?face',function(data){
                		if(data.code==0){
                            var isface = data.dataInfo.face.d;
                            var arrs =[];
                            var Obj = {};
                            for(var i=0 ;i<isface.length ;i++){
                                Obj[i]={
                                    flag:isface[i].tf,
                                    iconUrl:isface[i].tu,
                                    showFlag:isface[i].sf,
                                    tag:isface[i].tt,
                                    vals:[]
                                };
                             var arrVals  = isface[i].fs;
                                var faceobj ={};
                                for(var k=0; k<arrVals.length ;k++) {
                                    faceobj[k]={
                                       code:arrVals[k].c,
                                        pic:arrVals[k].p,
                                        faceSendFlag:arrVals[k].f,
                                        iconUrl:arrVals[k].u,
                                        title:arrVals[k].t,
                                        val:arrVals[k].v
                                    }
                                    Obj[i].vals.push(faceobj[k])
                               }
                                arrs.push(Obj[i]);
                            }
                			DATASOURCE['face'] = arrs;
                        	 promise.resolve();
                		};
                	}.bind(this), VERSION['face'] ,true);
//                  Bussiness.getJSON(DOMAIN_CONFIG['DATA_DOMAIN_NEW'].replace('v2', 'v3') + 'face/face_data.json', function (data) {
//                      //Bussiness.getJSON('face/face_data.json', function(data) {
//                      DATASOURCE['face'] = data;
//                      promise.resolve();
//                  }.bind(this), VERSION['face']);
                })

                .then(function () {
                    //car 显示
                	Bussiness.getData('data/static/v4/?car',function(data){
                		if(data.code==0){
                			var myCars = data.dataInfo.car.d;
                			var carShow ={};
                			for(var i=0; i<myCars.length;i++){
                				carShow[myCars[i].id]={
                					id:myCars[i].id,
                					name:myCars[i].n,
                					no:myCars[i].no,
                					webPic:myCars[i].p,
                					webResource:myCars[i].r,
                					renewalFees:myCars[i].rf,
                					showPrice:myCars[i].sp,
                					showType:myCars[i].st
                				};
                			};
                			DATASOURCE['limo'] = carShow;
                            promise.resolve();
                		};
                	}.bind(this), VERSION['car'],true);
                 // Bussiness.getJSON('car/car_data.json', function (data) {
                 // DATASOURCE['limo'] = data;
                 //promise.resolve();
                 //}.bind(this));
                }).then(function () {
                    this.domReady();
                    Tip.register();
                    this.bind();
                    this.initUser();
                    this.initGift();
                    //this.initWhisper();
                    this.rankReq();
//                  this.initRank();
                    this.initEmoji();
                    this.initManage();
                    this.initFollow();
                    this.initVidepStop();
                    this.initFlashShop();
                    this.initFullScreen();
                    this.initAccusatiaon();
                    this.initManagerUserLists();
                    this.initBroadcast();
                    //this.initFlower();
                    this.initGoods();
                    this.initWhisper();
                    MagicCar.init(this.giftViewDOM);
//                  MagicFull.init(this.cinemaDOM);
//					MagicFlash.init(this.cinemaFlashDOM);
					MagicFull.init(this.cinemaDOM,this.cinemaFlashDOM);
                     //主播
                    if(DATASOURCE['identity'] && DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']){
		            	$("#cinema").css('visibility','hidden');
		            }else{
		            	$("#cinema").css('visibility','visible');
		            }
                }.bind(this));

           // (DATASOURCE['identity'] && DATASOURCE['identity']['host']) ? this.initHostTask() : this.initTask();
            Headers.identified(DATASOURCE['identity']);
			 _nav.identified(DATASOURCE['identity'], DATASOURCE['messages_length']);
			 _task.identified(DATASOURCE['identity']);
            this.myBalanceDOM = $('span[name="user_balance"]');
        },
        'domReady': function () {
        	
            var room = DATASOURCE['room'];
//          console.log(room)
            this.roomTopDOM.i18nAppend(stringFormat(TEMPLATE.ROOM_TOP,
                UserHelper.portrait(room['roomHeadPic']),
                room['roomUserName'],
                DOMAIN_CONFIG['IMAGE_DOMAIN'] + DATASOURCE['hostLevel'][room['roomHostLevel']]['pic'],
                room['favoriteNum'],
                room['roomGoodNum'],
                '',
                room['topic'] ? room['topic'] : '',
                UserHelper.vipType(DATASOURCE['roomHostVip']),
                DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']) ? 'hidden':'')
            	);
            this.roomGiftDOM.i18nHTML(TEMPLATE.ROOM_GIFT);
//          if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){//主播
           		$("#switch_windows").css("display", "none")
//         	}
            setTimeout(function(){
            	$("#listGoods").css("visibility",'visible');
            },1000)
            $(".host_info p").on("mouseenter",function(){
                $(".host_info p").removeClass("host_topic");
            }).on("mouseleave",function(){
                $(".host_info p").addClass("host_topic");
            });
            $('#video').appendTo($('.holder')).show();
//          this.roomRightDOM.i18nHTML(TEMPLATE.RIGHT);
            this.shoreBtnsDOM.i18nHTML(TEMPLATE.SHOREBTNS);
            
            if(!Cookie.get('middle_recommend')){this.roomBottomDOM.i18nHTML(TEMPLATE.ROOM_BOTTOM);}
            this.rightState = 'chat';
            this.manageDOM = $('#manage');
            this.uvDOM = $('#uv');
            this.ugcDOM = $('#ugc');
            this.rosterDOM = $('#roster');
            this.dessertDOM = $('#dessert');
            this.chatroomDOM = $('#chatroom');
            this.messageDOM = $('#message');
            this.rosterPanel = this.rosterDOM.parent()[0];
            this.chatroomPanel = this.chatroomDOM.parent()[0];
            this.dessertPanel = this.dessertDOM.parent()[0];
            this.hostGoodNumDOM = $('#hostGoodNum');
			this.taglistPanel = $(".taglist").parent()[0];
			//添加滚动
//          UIHelper.initScroller(this.rosterPanel);
//          UIHelper.initScroller(this.barDOM[0]);
//          UIHelper.initScroller(this.roomDOM[0]);
//          UIHelper.initScroller(this.roomRightDOM[0]);
            Ps.initialize(this.chatroomPanel);
            Ps.initialize(this.dessertPanel);
            Ps.initialize(this.taglistPanel);
            
            // 被剔出用户系统提示
            if(DATASOURCE['code']==52 && DATASOURCE['kick'] && DATASOURCE['kick']>0){
                $('#chatroom').append(stringFormat(TEMPLATE['CHAT_SYSTEM'],stringFormat(i18nTranslate('Room_System_RemoveText_By_Admin'),Math.floor(DATASOURCE['kick']/60000))));
            }
            //音量初始化
            VoiceScroller.value = 70;//当前音量
            VoiceScroller.maxValue = 100;//最大音量
            VoiceScroller.Initialize();//初始化
        },
        'bind': function () {
            //Trigger.register(CONST.Event.SocketReady, setTimeout(this.initFlower.bind(this),3500));
            Trigger.register(CONST.Event.StartVideo, this.Broadcast.bind(this));
            $('#show_Ring').on('click', this.Broadcast.bind(this));
            /**
             var sayHandler = this.say.bind(this);
             $('#say').on('click', sayHandler);
             this.messageDOM.on('keypress', function (evt) {
                if (evt.keyCode == 13)
                    sayHandler();
            }.bind(this));
             */
            var registerSocket = function (eventName, handler) {
                Trigger.register('Socket' + eventName, handler);
            };
            registerSocket('Join', this.join.bind(this));
            registerSocket('Leave', this.leave.bind(this));
            registerSocket('Chat', this.chat.bind(this));
            registerSocket('Giving', this.giving.bind(this));
            registerSocket('Flower', this.flower.bind(this));
            registerSocket('Diamond', this.diamond.bind(this));
            registerSocket('Admin', this.admin.bind(this));
            registerSocket('Marquee', this.marquee.bind(this));
            registerSocket('Promote', this.promote.bind(this));
            registerSocket('Stop', this.kickOutPop.bind(this));
//          $('#switch_chat').on('click', this.rightSwitch.bind(this,'chat'));
            $('#switch_ranking').on('click', this.rightSwitch.bind(this,'ranking'));
            $('#fans').on('click', this.fans.bind(this));
            this.lockScreenDOM = $('#lockScreen').on('click', function (evt) {
                this.screenLock = !this.screenLock;
                this.lockScreenDOM.toggleClass('locked');
            }.bind(this));
            var share_room = function (share_type) {
                $.ajax({
                    type: "POST",
                    url: system_info.base_attr.domain + "room_shareRoom.fly",
                    cache: false,
                    dataType: "json",
                    data: {
                        shareType: share_type
                    },
                    success: function (result) {
                        result = null;
                    },
                    complete: function (XHR, TS) {
                        XHR = null;
                    }
                });
            };
            //横竖屏切换
            $("#switch_windows").click(function () {
                var containerDom = $("#container");
//              if(containerDom.hasClass("vertical")){
//              	containerDom.removeClass("vertical");
//              }else{
//              	containerDom.addClass("vertical");
//              }
//              window.onresize();
                history.go(0);
            }.bind(this));
            $(".share_to_twitter").click(function () {
                var twitterUrl = 'http://twitter.com/intent/tweet';
                var shareUrl = encodeURIComponent(document.location.href + '?promotion=10002');
//              var message = $("meta[property='og:title']").attr("content");
				var message = stringFormat(i18nTranslate('Room_User_Shore'),DATASOURCE['room']['roomUserName']);
                if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                	message = i18nTranslate('Room_Host_Shore');
                }
                var shareText = encodeURIComponent(message);
                var url = twitterUrl + '?url=' + shareUrl + '&text=' + shareText + '&via=7nujoom&related=7nujoom,flyshow';
                system_util.open_win(url);
                share_room(1);
            }.bind(this));
            $('.share_to_facebook').click(function(){
            	$.ajax({
                    url: '//connect.facebook.net/en_US/sdk.js',
                    dataType: "script",
                    cache:true,
                    success: function(){
                        FB.init({
                            appId: system_info.base_attr.facebook_key, //replace with your app ID
                            version:'v2.0'
                        });
                        FB.ui({
                                method: 'share',
                                //display:'iframe',
                                href: document.location.href.replace(location.href.search, '') + '?lg=' + system_info.base_attr.local_language
                            },
                            function(response) {
                                if (response && !response.error_code) {
                                    var shareFeedUrl = '/service/room/v3/' + DATASOURCE['room']['roomId'] + '/send/share';
                                    $.ajax({
                                        url: shareFeedUrl,
                                        type: "post",
                                        data:{data:JSON.stringify({'cmd':30,'type':2}),loginKey: Cookie.get(Cookie.key['login_key']) || 0},
                                        dataType: 'json',
                                        success:function(data){
                                        	console.log("facebook----")
                                        	console.log(data)
                                        }
                                    });
                                } else {
                                    console.log('Error while posting.');
                                }
                            });
                    }});
                share_room(0);
            }.bind(this));
            var middleRecDOM,
                shareBtn = this.roomTopDOM.find('.host_share'),
                shareBtn_ar = this.roomTopDOM.find('.arabic .host_share'),
                shareDOM = this.roomTopDOM.find('.room_share'),
                screenFull = false;
            if(middleRecDOM = this.roomBottomDOM.find('.middle_recommend')){
                middleRecDOM.find("[data-role='middle_recommend_close']").click(function(evt){
                    middleRecDOM.hide();
                    Cookie.set('middle_recommend',1);
                }.bind(this));
            }
            shareBtn.on('mouseenter',function(){
                shareBtn.css('margin-right','60px');
                shareBtn_ar.css('margin-left','60px');
                shareBtn.find('a').hide();
                shareDOM.show();
            }.bind(this)).on('mouseleave',function(){
                shareBtn.find('a').show();
                shareBtn.css('margin-right','20px');
                shareBtn_ar.css('margin-left','20px');
                shareDOM.hide();
            }.bind(this));
            //$('#nav_message').on('click',function(){
            //    if (!UserHelper.validate())
            //        return;
            //    var url = '/mymessage.shtml';
            //    system_util.open_win(url);
            //}.bind(this));
//          全屏切换
			var shoreBtnSetTime;
            $('#full_screen').on('click',function(){
                fullscreenToggle();
            }.bind(this));
            $('#cinema_full').on('dblclick',function(event){
                if(event.target==event.currentTarget){
	                fullscreenToggle();
	            }
            }.bind(this));
            $('#cinema_flash').on('dblclick',function(event){
                if(event.target==event.currentTarget){
	                fullscreenToggle();
	            }
            }.bind(this));
            $('#cinema_daily').on('dblclick',function(event){
                if(event.target==event.currentTarget){
	                fullscreenToggle();
	            }
            }.bind(this));
            $('#cinema').on('dblclick',function(event){
                if(event.target==event.currentTarget){
	                fullscreenToggle();
	            }
            }.bind(this));

            window['fullscreen'] = fullscreenToggle = function(){
				if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']))
		            return;
		        screenFull = !screenFull;
		        if(screenFull){
		            $("#container").addClass('fullscr');
		            $("#full_screen").addClass("btn_ensmall").removeClass("btn_enlarge");
		            $("#shore_btns").css("visibility","hidden");
				  	$(document).mousemove(function(e){
				  		var isScreenFull = $("#container").hasClass("fullscr");
				  		if(!isScreenFull){
				  			$("#shore_btns").css("visibility","visible");
				  			return;
				  		}
				  		$("#shore_btns").css("visibility","visible");
				  		clearTimeout(shoreBtnSetTime);
					    shoreBtnSetTime = setTimeout(function(){
					   		$("#shore_btns").css("visibility","hidden");
					    },2000);
					});
					
		        }else{
		        	clearTimeout(shoreBtnSetTime);
		        	$("#shore_btns").css("visibility","visible");
		            $("#container").removeClass('fullscr');
		            $("#full_screen").removeClass("btn_ensmall").addClass("btn_enlarge");
		        }
		        window.onresize();
       		}.bind(this);
            window.onresize = function(){
                Ps.update(this.chatroomPanel);
                var roomType = $("#container").hasClass("vertical");//横屏
                var roomFull = $("#container").hasClass("fullscr");//全屏
                //主播
                if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                	if(!roomType){
                		$('.content').css('width',"1120px");
                		$('.header_wrap').css('width',"1120px");
                	}
                	$("#cinema_flash").css('left','113px');
                	$("#cinema_daily").css('left','113px');
                	$("#cinema").css("height",'315px');
                	$(".chat_area").css("max-height",'360px');
                	this.chatroomPanel.style.height = (document.body.clientHeight - 246 - 60)+'px';
                	var magicTop = $("#cinema_flash").height()+30;
                	var magicRight = $("#cinema").width()/2+'px';
                	var styleDoc = document.getElementById("room_show_ly");
                	styleDoc.innerHTML = styleDoc.innerHTML +'@keyframes gift_slider{0% {transform: (0px);opacity: 1;} 30% {transform: translateX('+magicRight+');opacity: 1;} 70% {transform: translateX('+magicRight+');opacity: 1;} 100% {transform: translateX('+magicRight+');opacity: 0;}}';			
//              	$("#giftMagic").css("top",magicTop);
                	return;
                }
                if(roomFull){
                	var winHei = document.body.offsetHeight-60;
                    var winWid = document.body.offsetWidth;
                    var hei = winHei;
                    var wei = winHei / 9 *16;
                    if(roomType){
                    	wei = winHei /16*9;
                    }
                    var btnsBottom = 3;
                    var btnsRight = (winWid - wei)/2;
                    if(wei>winWid){
                    	wei = winWid;
                    	hei = winWid/16*9;
                    	if(roomType){
	                    	wei = winHei /9 *16;
	                    }
                    	btnsRight = 5;
                    	btnsBottom = (winHei-hei)/2;
                    	$(".holder").css("top",btnsBottom);
                    	$("#cinema").css("top",btnsBottom);
                    	$("#cinema").css("left",0);
                    }else{
                    	$(".holder").css("top",0);
                    	$("#cinema").css("top",0);
                    	var left = (winWid-wei)/2;
                		$("#cinema").css("left",left);
                    }
                    $(".holder").css("height",hei);
                    $(".holder").css("width",wei);
                    $("#cinema").css("height",hei);
                    $("#cinema").css("width",wei);
                    $("#shore_btns").css("right",btnsRight);
                    $("#shore_btns").css("bottom",btnsBottom);
                	$("#absent").css("background-size","100%")

                	if(!roomType){//横屏自适应 
                		//礼物动画展示区自适应
		                var cinemaFlashH = hei*(280/405),
		                	cinemaFlashW = wei*(430/720),
		                	cinemaDailyH = hei*(122/405);
		                	cinemaFlashLeft = 0;
		                	if(wei >=560){
		                		cinemaFlashLeft = (wei - cinemaFlashW)/2;
		                	}else{
		                		cinemaFlashLeft = 112;
		                	}
	                	var cinemaFlash = $("#cinema_flash"),
	                	cinemaDaily = $("#cinema_daily");
		                cinemaFlash.css('width',cinemaFlashW);
		                cinemaFlash.css('height',cinemaFlashH);
		                cinemaFlash.css('left',cinemaFlashLeft);
		                cinemaDaily.css('width',cinemaFlashW);
		                cinemaDaily.css('height',cinemaDailyH);
		                cinemaDaily.css('left',cinemaFlashLeft);
		                cinemaDaily.css('top',"auto");
                	}else{
                		var cinemaFlash = $("#cinema_flash"),
	                	cinemaDaily = $("#cinema_daily"),
	                	cinemaFlashH = wei*(242/370),
	                	cinemaDailyH = wei*(104/370);
	     				cinemaFlash.css('width',wei);
		                cinemaFlash.css('height',cinemaFlashH);
		                cinemaFlash.css('left','0');
		                cinemaDaily.css('width',wei);
		                cinemaDaily.css('height',cinemaDailyH);
		                cinemaDaily.css('left','0');
		                
		                if(cinemaFlashH>177){
		                	cinemaDaily.css('top',cinemaFlashH);
		                }else{
		                	cinemaDaily.css('top',"177px");
		                }
                	}
                	var magicTop = $("#cinema_flash").height()+30;;
                	var magicRight = $("#cinema").width()/2+'px';
                	var styleDoc = document.getElementById("room_show_ly");
                	styleDoc.innerHTML = styleDoc.innerHTML +'@keyframes gift_slider{0% {transform: (0px);opacity: 1;} 30% {transform: translateX('+magicRight+');opacity: 1;} 70% {transform: translateX('+magicRight+');opacity: 1;} 100% {transform: translateX('+magicRight+');opacity: 0;}}';			
                	
//              	$("#giftMagic").css("top",magicTop);
                	return;
                }
                $("#cinema").css("top",'45px');
            	$("#cinema").css("left",'auto');
                if(!roomType){//横屏自适应    
                	this.chatroomPanel.style.height = (document.body.clientHeight - 240 - 20)+'px';
	                var holder = $('.holder'),
	                	cinema = $("#cinema"),
	                	cinemaFlash = $("#cinema_flash"),
	                	cinemaDaily = $("#cinema_daily"),
	                	clientH	= document.body.clientHeight ,
	                	holderHeight = clientH - 60 - 50 - 210;
	                	var holderWidth = holderHeight/9*16,
	                	videoWidth = holderWidth;
	                holder.css('height',holderHeight);
	                holder.css('width',holderWidth);
	                $("#room").css("width",holderWidth);
	//              $("#absent").animate({backgroundSize:holderWidth}).animate({backgroundSize:holderHeight});
	                cinema.css('height',holderHeight);
	                cinema.css('width',holderWidth);
	                //礼物动画展示区自适应
	                var cinemaFlashH = holderHeight*(280/405),
	                	cinemaFlashW = holderWidth*(430/720),
	                	cinemaDailyH = holderHeight*(122/405);
	                	cinemaFlashLeft = 0;
	                	if(holderWidth<=720 && holderWidth >=560){
	                		cinemaFlashLeft = (holderWidth - cinemaFlashW)/2;
	                		$("#absent").css('background-size',holderWidth);
	                	}else if(holderWidth>720){
	                		cinemaFlashLeft = 145;
	                		$("#absent").css('background-size','720px');
	                	}else{
	                		cinemaFlashLeft = 112;
	                		$("#absent").css('background-size',holderWidth);
	                		$("#absent").css('background-size','560px');
	                	}
	                cinemaFlash.css('width',cinemaFlashW);
	                cinemaFlash.css('height',cinemaFlashH);
	                cinemaFlash.css('left',cinemaFlashLeft);
	                cinemaDaily.css('width',cinemaFlashW);
	                cinemaDaily.css('height',cinemaDailyH);
	                cinemaDaily.css('left',cinemaFlashLeft);
	                cinemaDaily.css('top',"auto");
	                $("#roomGift").css('width',holderWidth);
	                $("#shore_btns").css("height",holderHeight);
	                var cinama_contentWid = 1060 - (720 -holderWidth),
	                	contentWid = 1280 - (720 -holderWidth)
	                $('.cinama_content').css('width',cinama_contentWid);
	                $('.content').css('width',contentWid);
	                $('.header_wrap').css('width',contentWid);
	                $(".pop_par").css("height","150px");
                	$("#listGoods").css("height","150px");
                	$("#preview").css('top','20px');
                }else{
                	this.chatroomPanel.style.height = (document.body.clientHeight - 240 - 30)+'px';
                	var clientH	= document.body.clientHeight-110 -30;
                	var cinamaW =  clientH * (9 / 16);
                	var giftListH = clientH - 210;
                	var roomW = cinamaW + 230;
                	$("#room").css("width",roomW);
                	$("#cinema").css("width",cinamaW);
                	$("#cinema").css("height",clientH);
                	$(".pop_par").css("height",giftListH);
                	$("#listGoods").css("height",giftListH);
                	$(".holder").css("width",cinamaW);
                	$(".holder").css("height",clientH);
                	$("#shore_btns").css("height",clientH);
                	var cinama_contentWid = roomW  + 380,
	                	contentWid = cinama_contentWid + 220;
                	$('.content').css('width',contentWid);
                	$('.header_wrap').css('width',contentWid);
                	$('.cinama_content').css('width',cinama_contentWid);
                	if(giftListH>265 && giftListH<440){
                		$("#preview").css('top',giftListH+20);
                	}else if(giftListH<265){
                		$("#preview").css('top','285px');
                	}else{
                		$("#preview").css('top','460px');
                	}
                	 var cinemaFlash = $("#cinema_flash"),
	                	cinemaDaily = $("#cinema_daily"),
	                	cinemaFlashH = cinamaW*(242/370),
	                	cinemaDailyH = cinamaW*(104/370);
	     				cinemaFlash.css('width',cinamaW);
		                cinemaFlash.css('height',cinemaFlashH);
		                cinemaFlash.css('left','0');
		                cinemaDaily.css('width',cinamaW);
		                cinemaDaily.css('height',cinemaDailyH);
		                cinemaDaily.css('left','0');
		                
	                if(cinemaFlashH>242){
	                	cinemaDaily.css('top',"242px");
	                }else if(cinemaFlashH<242 && cinemaFlashH>177){
	                	cinemaDaily.css('top',cinemaFlashH);
	                }else{
	                	cinemaDaily.css('top',"177px");
	                }
		                
                }
                var magicTop = $("#cinema_flash").height()+30;
                var magicRight = $("#cinema").width()/2 +'px';
            	var styleDoc = document.getElementById("room_show_ly");
            	styleDoc.innerHTML = styleDoc.innerHTML +'@keyframes gift_slider{0% {transform: (0px);opacity: 1;} 30% {transform: translateX('+magicRight+');opacity: 1;} 70% {transform: translateX('+magicRight+');opacity: 1;} 100% {transform: translateX('+magicRight+');opacity: 0;}}';			
//              $("#giftMagic").css("top",magicTop);
            }.bind(this);
            window.onresize();
        },
        'initGoods': function () {
            var VERSION = DATASOURCE['version'];
            var promise = new Promise(function () {
            	Bussiness.getData('data/static/v4/?gifttype',function(data){
            		if(data.code==0){
	            		var giftp = data.dataInfo.gifttype.d;
	            		var giftab =[];
	            		giftp.map(function(ele,i){
	            			giftab[i] ={
	            				datas:ele.ds, 
	            				typeId:ele.id,
	            				typeName:ele.n,
	            				typeRank:ele.r,
	            				typeCondition:ele.c
	            			};
	            		});
	            		DATASOURCE['giftType'] = giftab;
	                    promise.resolve();
            		}
            	}.bind(this),VERSION['giftType'],true);
//             Bussiness.getJSON('gift/gift_type_data.json', function (data) {
//	              DATASOURCE['giftType'] = data;
//	              promise.resolve();
//             }.bind(this));
            }.bind(this)).then(function () {
            	//获取礼物列表的数据
                    var temp = {},group={},sc;
                    Bussiness.getData('data/mobile/v3/?gift=&requestType=1',function(data){
                        if(data.code != 0 )
                            return;
                        data.dataInfo.gift.d.forEach(function(item,index){
                        	if(item['gpt']==0){//金币礼物
	                            if(item['gs'] == 0){
	                                sc = CONST.GiftSC[item.sc];
	                                group[sc] ?  STRING_EMPTY:  group[sc] = [];
	                                group[sc].push(item);
	                            }
                            	temp[item.id] = item;
                            }
                        });
                        DATASOURCE['giftGroup'] = group;
                        DATASOURCE['gift'] = temp;
                        promise.resolve();
                    }.bind(this),null,true);
                }.bind(this)).then(function () {
                    //获取store数据
                    var storeData=[];
                    var sUrl='service/shop/v3/room/types?car=&vip=&gift=';
                    Bussiness.getData(sUrl,function(data){
                        if(data.code != 0 )
                            return;
                        $.each(data.dataInfo.car.dt, function(index,item) {
                        	storeData.push(item);
                        });
                        $.each(data.dataInfo.vip.dt, function(index,item) {
                        	storeData.push(item);
                        });
                        $.each(data.dataInfo.gift.dt, function(index,item) {
                        	storeData.push(item);
                        });
                        DATASOURCE['storeData'] = storeData;
                        promise.resolve();
                    }.bind(this),null,true);
                }.bind(this)).then(function () {
                    var giftType = DATASOURCE['giftType'],
                        giftGroup = DATASOURCE['giftGroup'],
                        storeData = DATASOURCE['storeData'],
                        gift = DATASOURCE['gift'];
                    if (!giftType || !gift) return;
                    //giftType.forEach(function (data, index) {
                    //    group[data['typeName']] = data['datas'];
                    //});
                    //礼物展示区
                    this.previewDOM = $('#preview');
                    this.previewImgDOM = $('#preview_img');
                    var types = ['common', 'vip', 'backpack'],
                        items = [],
                        tab = $('#tabGoods'),
                        list = $('#listGoods'),
                        panel = list[0],
                        item,
                        data,
                        template = TEMPLATE.GIFT,
                        temp, smallGift = ['|'];
                    $.each(types, function (index, type) {
                        var item = {
                            'index': index,
                            'type': type,
                            'tab': temp = tab.find('[data-type="' + type + '"]'),
                            'element': temp.find('a'),
                            'list': list.find('[data-type="' + type + '"]')
                        };
                        switch (type) {                      	
                            case 'common':
                                data = giftGroup['Common'].concat(giftGroup['VIP']);
                                //data = group['Common'].concat(group['Special'], group['Luxury']);
                                break;
                            case 'vip':
                                data = DATASOURCE['storeData'];
                                break;
//                              shan
//                          case 'backpack':
//                              data = DATASOURCE['Other']['package_list']||[];
//                              break;
//								shan
                        }
                        item['data'] = data;
                        item['enter'] = function () {
                            if (!this.init) {
                                this.init = true;
                                if (!this.data)
                                    return;
                                var type = this.type,
                                    origin;
                                switch (type) {
                                    case 'common':
                                        this.list.html(this.data.map(function (temp, index) {
                                            //temp = gift[temp];
                                            if (temp) {
                                                //if (temp['showType'] == 1)
                                                    smallGift.push(temp['giftId'] + '|');
                                                //return stringFormat(template, temp['giftId'], temp['name'], temp['cbalance'], STRING_EMPTY, STRING_EMPTY);
                                             	 var tmpl = '<span class="{0}_icon"></span>',
		                                            tp = {
		                                                1: 'vip',
		                                                2: 'svip'
		                                            };
                                                if(temp['scv']){
                                                	return stringFormat(template, temp['id'], temp['n'], temp['cb'], stringFormat(tmpl, tp[temp['scv']]), 'data-role="vipgift" data-vip="' + temp['scv'] + '"',temp['scv']);
                                                }else{
                                                	return stringFormat(template, temp['id'], temp['n'], temp['cb'], STRING_EMPTY, STRING_EMPTY,temp['scv']);
                                                }
                                            } else
                                                return STRING_EMPTY;
                                        }));
                                        $('.gift_list').eq(0).css('width',this.data.filter(function(item){return typeof item !== 'undefined';}).length * 66 + 'px');
                                        $('.gift_list').eq(0).css('width',"auto");
                                        break;
                                    case 'vip':
                                    	
                                        var tmpl = '<span class="{0}_icon"></span>',
                                            tp = {
                                                1: 'vip',
                                                2: 'svip'
                                            };
                                        this.list.html(this.data.map(function (temp, index) {
                                            //temp = gift[temp];
                                            if (temp)
//                                          	var urls = 'http://7nujoom.7najm.com:9999/resource/';
                                                return stringFormat(TEMPLATE.GIFTSTORE, temp.id, "../resource/"+temp.pic, temp.price, STRING_EMPTY, STRING_EMPTY,temp.type);
                                            else{
                                                return STRING_EMPTY;
                                           }
                                        }));
                                        //$('.gift_list').eq(1).css('width',this.data.filter(function(item){return typeof item !== 'undefined';}).length * 66 + 'px');
                                        break;
                                    case 'backpack':
                                        this.diamondData = [{}];
                                        var promise = new Promise(function(){
                                            $.ajax({
                                                url: '/service/user/v3/property?fansgift=',
                                                type:'GET',
                                                dataType: 'json',
                                                success: function (data) {
                                                    if(data.code == 0){
                                                        var diaNum;
                                                        (data.dataInfo && (diaNum = data.dataInfo.fansGift.num)) ? this.diamondData[0].number = diaNum : '';
                                                        promise.resolve();
                                                    }
                                                }.bind(this)
                                            });
                                        }.bind(this)).then(function(){
                                                Bussiness.postData('user_getUserSpecialBySpecialType.fly', {
                                                    specialType: 3
                                                }, function (result) {
                                                    var inum= 0;
                                                    if (result['code'] != 0)
                                                        return;
                                                    var info = result.dataInfo.concat(this.diamondData);
                                                	this.list.html(info.map(function (temp, index) {
                                                        if(!temp['number'])
                                                            return STRING_EMPTY;
                                                        //var special = temp['special'] || '99999',
                                                        var special = temp['special'],
                                                            origin = special=='99999' ? {'n':'BAG_Diamond'} : gift[special] ;
                                                        if (origin){
                                                            inum++;
                                                            return stringFormat(TEMPLATE['BACKPACK'], special, origin['n'], temp['number']);
                                                        }return STRING_EMPTY;
                                                    }));
                                                  	if(!this.list.html()){
                                                  		$("#listGoods>ul[data-type='backpack']").i18nHTML(TEMPLATE['BACKPACKEMPTY']);
                                                  	}
                                                    var inumLast=info.length>inum?info.length:inum;
                                                    var selObj = $("ul[data-type='backpack']>li").eq(0);
	                            					selObj.trigger("click");
                                                    //$('.gift_list').eq(2).css('width',inumLast * 66 + 'px');
                                                }.bind(this));
                                            }.bind(this));
                                        this.init = false;
                                        break;
                                }
                            }

                            panel.scrollTop = 0;
                            Ps.update(panel,{'useBothWheelAxes':true});
                            this.tab.addClass('select');
                            var giftType = this.tab.attr('data-type');
                            if(giftType == 'backpack'){
                            	if (!UserHelper.validate()){
				            		return;
				            	}
                            }
                            $('#gift_total_count').html('');
                            $("#one-price").val('');
                            $("#preview_img").empty();
                            $('#listGoods>ul>li').removeClass("select");
                            $(".store_days>li").removeClass("selectd");
                        	$(".store_days>li").eq(0).addClass("selectd");
                            if(giftType=="vip"){
                            	$("#gift_buy").removeClass('hidden');
                            	$("#preview_img").addClass('hidden');
                            	$("#gift_num").addClass('hidden');
                            	$("#give").addClass('hidden');
                            	$(".store_days").removeClass('hidden');
                            }else{
                            	$("#gift_buy").addClass('hidden');
                            	$("#preview_img").removeClass('hidden');
                            	$("#gift_num").removeClass('hidden');
                            	$("#give").removeClass('hidden');            	
                            	$(".store_days").addClass('hidden');
                            }
                            this.list.removeClass('hidden');
                            if(giftType =='common'){
	                    		var selObj = $("ul[data-type='common']>li").eq(0);
	                            selObj.trigger("click");
							}else if(giftType == 'vip'){
								var selObj = $("ul[data-type='vip']>li").eq(0);
	                            selObj.trigger("click");
							}
                        }.bind(item);
                        item['quit'] = function () {
                            this.tab.removeClass('select');
                            this.list.addClass('hidden');
                        }.bind(item);
                        items.push(item);
                    });
                    this.goodsMutex = new (Kit.use('Mutex'))({
                        'items': items
                    });
                    this.smallGift = smallGift.join(STRING_EMPTY);
                    Ps.initialize(panel,{'useBothWheelAxes':true});
                    this.goodsMutex.mutex(0,true);
                    this.countDOM = $('#count');
                    this.precountDOM = $('#precount');
                    this.quantityDOM = $('#quantity');
                    this.minusDOM = $('#quantity_minus');
                    this.plusDOM = $('#quantity_plus');
                    this.totalPriceDOM = $('#gift_totalMoney');
                    this.totalPriceDOM2 = $("#gift_total_count");
                    this.onePriceDOM = $("#one-price");
                    ClickCollect.register('giftQuantity', this.quantityDOM);
                    var listGoods = $('#listGoods');
                    var tabSelObjType = $("#tabGoods>li[class='select']").attr('data-type');

                    //点击礼物事件
                    listGoods.on('click', '[data-giftid]', function (evt) {
                        var target = evt.currentTarget,
                            select = 'select';
                        if (!target)
                            return;
                        target = $(target);
                        var giftId = parseInt(target.attr('data-giftid')),index = target.index();;
                        if (this.giftId === giftId)
                            return;
                        $('.gift_count_price span.old').addClass('hidden');
                        $("#listGoods>ul>li").removeClass(select);  
                        this.currentGift = target.addClass(select);
                        this.giftId = giftId;
                        this.isGiftPack = false;
                        if(target.parent().attr("data-type")=='common' || target.parent().attr("data-type")=='backpack'){
                        	this.special = target.data('role') == 'special';
                        	this.vipgift = target.data('role') == 'vipgift';
	                        this.price = parseInt(target.find('.price_num').html());
	                        this.totalPriceDOM.html(this.price * this.countDOM.val());
	                        this.preview(giftId,I18N.language=='ar'? $(target).siblings().length - index :index);
                        }else{
                            $("#gift_buy").removeClass('hidden');
                            $("#preview_img").addClass('hidden');
                            $("#gift_num").addClass('hidden');
                            $("#give").addClass('hidden');
                            if(target.data('storetype') == 8){ //礼包类型
                                //礼包预览dom
                                $('#gift_pack').removeClass('hidden');
                                $(".store_days").addClass('hidden');
                                this.isGiftPack = true;this.rewards=[];
                                //礼包详情
                                $.ajax({
                                    url:'/service/shop/v3/info/'+giftId,
                                    type:'GET',
                                    datatype:'json',
                                    success:function(data){
                                        var info = data.dataInfo,giftpack_tpl='<li><img src="{0}">{1}</li>',old_price;
                                        var time = Datetime2.showtime(new Date(info.period.startTime)).replace(/-/g,'/')+'-'+Datetime2.showtime(new Date(info.period.endTime)).replace(/-/g,'/');
                                        $('#gift_pack').find('.preview_pack_title').html(info.name);
                                        $('#gift_pack').find('.preview_pack_time').html(time);
                                        this.rewards = info.rewards;
                                        if( (old_price =info.price.original) && old_price != info.price.current){
                                            $('.gift_count_price').addClass('column');
                                            $('.gift_count_price span.old').removeClass('hidden');
                                            $('#gift_total_count_old').html(old_price);
                                        }
                                        $('#gift_pack ul').i18nHTML(info.rewards.map(function(item){
                                            var unit = item.expire == 0 ? 'X'+ item.number : item.expire + i18nTranslate('Store_Days');
                                            return stringFormat(giftpack_tpl,'/resource/'+item.pic , unit);
                                        }.bind(this)).join(''));
                                    }.bind(this)
                                });
                            }else{
                                $('#gift_pack').addClass('hidden');
                                $(".store_days").removeClass('hidden');
                                $(".store_days>li").removeClass("selectd");
                                $(".store_days>li").eq(0).addClass("selectd");
                            }
                            this.price = parseInt(target.find('.price_num').html());
                            this.totalPriceDOM2.html(this.price);
                            $("#one-price").val(this.price);


                        }

                    }.bind(this));
                    var selObj = $("ul[data-type='common']>li").eq(0);
                    selObj.trigger("click");
                    //划过礼物事件
//                  listGoods.on('mouseenter', '[data-giftid]', function (evt) {
//                      var target = evt.currentTarget;
//                      if (!target)
//                          return;
//                      target = $(target);
//                      var giftId = parseInt(target.attr('data-giftid')),index = target.index();
//                      this.preview(giftId,I18N.language=='ar'? $(target).siblings().length - index :index);
//                  }.bind(this));
                    //鼠标划过之后效果消失
//                  listGoods.on('mouseleave', function (evt) {
//                      this.previewDOM.removeClass(this.previewStyle).html(STRING_EMPTY);
//                      this.previewStyle = null;
//                  }.bind(this));
                    var giveHandler = this.give.bind(this);
                    $('#give').on('click', giveHandler);
//                  购买
                    var buyHandler = this.storeBuy.bind(this);
                    $('#gift_buy').on('click', buyHandler);
                    
                    this.precountDOM.on('click', this.quantityDOM.safeShow.bind(this.quantityDOM));
                    //点击礼物个数输入框下拉菜单
//                  this.quantityDOM.on('click', '[data-value]', function (evt) {
//                      var value = parseInt($(evt.currentTarget).data('value'));
//                      this.quantityDOM.safeHide();
//                      if (value)
//                          this.countDOM.val(value);
//                  }.bind(this));
//                  this.countDOM.on('click',function(){
//                      this.quantityDOM.safeShow();
//                  }.bind(this));
//                  this.countDOM.on('input',function(){
//                      //console.log(1);
//                      this.quantityDOM.safeHide();
//                  }.bind(this));
					this.countDOM.on('input',function(){
                        var value = this.countDOM.val();
                        this.totalPriceDOM2.html(parseInt(this.onePriceDOM.val()) * this.countDOM.val());
                    }.bind(this));
					$(".store_days").on('click', '[data-value]',function(evt){
                        var target = evt.currentTarget,
                            select = 'selectd';
                        if (!target)
                            return;
                        target = $(target);
                       	$(".store_days>li").removeClass(select);
                        target.addClass(select);
                        $("#gift_total_count").html(parseInt($("#one-price").val()*target.attr('data-value')));
                    
					}.bind(this));
                    
                    this.minusDOM.on('click',function(){
                        var value = this.countDOM.val();
                        if(value>1){
                            this.countDOM.val(--value);
                            this.totalPriceDOM2.html(parseInt(this.onePriceDOM.val()) * this.countDOM.val());
                        }
                    }.bind(this));
                    this.plusDOM.on('click',function(){
                        var value = this.countDOM.val();
                        if(value<999){
                            this.countDOM.val(++value);
                            this.totalPriceDOM2.html(parseInt(this.onePriceDOM.val()) * this.countDOM.val());
                        }
                    }.bind(this));
                }.bind(this));
        },
		//用户
        'initUser': function () {
            var users = this.users = {},
//          shan
//              userList = DATASOURCE['Other']['user_list_info']['user_list'],
                Limo = DATASOURCE['limo'],
                uvTemplate = TEMPLATE['UV'],
            //limoTemplate = TEMPLATE['LIMO'],
                uvHTML = [],
            //limoHTML = [],
                nickname, userId, temp, className,
                AdminType = CONST.AdminType;
//              shan
//              element, html, admins = DATASOURCE['Admin']['dataInfo'] || [], adminId, hit;
//          if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])) {
//              admins.forEach(function (admin, index) {
//                  adminId = admin['userId'];
//                  hit = false;
//                  for (var i = 0, count = userList.length; i < count; i++) {
//                      if (userList[i]['userId'] == adminId) {
//                          hit = true;
//                          break;
//                      }
//                  }
//                  if (!hit) {
//                      admin.offLine = true;
//                      userList.push(admin);
//                  }
//              });
//          }
//			shan
            this.userOrder = new Order({
//          	shan
//              'initial': userList,
                'value': function (data) {
                    return UserHelper.estimate(data);
                }
            });
            var memberCSS;
//          shan
//          if(userList.length>3){
//          	userList = userList.slice(0,3)
//          }
//          userList.forEach(function (user, index) {
//              userId = user['userId'];
//              users[userId] = user;
//              className = STRING_EMPTY;
//              temp = user['adminType'], className = null;
//              if (temp == AdminType.Host)
//                  className = 'host';
//              else if (temp == AdminType.Constable)
//                  className = 'constable';
//              else if (user['roomAdmin'])
//                  if (user['offLine'])
//                      className = 'manager off';
//                  else
//                      className = 'manager';
//              memberCSS = CONST.MemberTag[(temp = (temp = user['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
//              html = stringFormat(uvTemplate,
//                  stringFormat(classTemplate, className + ' ' + memberCSS),
//                  userId,
//                  STRING_EMPTY, //todo: admin icon
//                  UserHelper.portrait(user['headPic']),
//                  nickname = xss(user['userName']),
//                  user.vipLevel?user.vipLevel:0,
//                  UserHelper.badge(user));
//              uvHTML.push(element = $(html));
//              user['element'] = element;
//          });
//          shan
           
//          this.rosterDOM.html(uvHTML);
//          var rosterChildsLength = this.rosterDOM.children().length;
//          if(rosterChildsLength>3){
//          	$("#roster li").eq(2).nextAll().remove();
//          }
//          $("#roster li").eq(0).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_one");
//          $("#roster li").eq(1).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_two");
//          $("#roster li").eq(2).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_three");
//          UIHelper.refreshScroller(this.rosterPanel);
        },
        'initGift': function () {
            var recordThread = 'Record';
            var temp;
            var levelTemplate = '<span class="userLevel"><span class="img"></span><span class="num">{0}</span></span>';
            this.recordQueue = new Queue({
                'handler': function (item, promise) {
                    this.chatroomDOM.append(stringFormat(TEMPLATE.DESSERT,
                        item['member']+' '+item['isSelfGift'], xss(item['nickname']), item['badge'], item['name'], item['num']));
//                  var delta = this.dessertPanel.scrollTop = this.dessertPanel.scrollHeight - this.dessertPanel.offsetHeight;
//                  if (delta > 0)
//                      Ps.update(this.dessertPanel);
                    var timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        promise.resolve();
                    }, 0);
                    if (this.screenLock)
		                UIHelper.refreshScroller(this.chatroomPanel);
		            else
		                UIHelper.updateScroller(this.chatroomPanel);
		            if (!this.screenLock){
		                var delta = this.chatroomPanel.scrollTop = this.chatroomPanel.scrollHeight - this.chatroomPanel.offsetHeight;
		                if (delta > 0)
		                    Ps.update(this.chatroomPanel);
		            }
                }.bind(this),
                'thread': recordThread
            });
             
            var queueStart = function () {
                viewDom.safeShow();
            }.bind(this);
            var queueEnd = function () {
                viewDom.safeHide();
            }.bind(this);
            var viewDom = $('#cinema_daily'),
                thread = 'Gift',
                template = '<div class="pngGift anim_show"><img src="{0}" /><div class="megAll" id="dalay_gift_con"><div class="num_all" id="dalay_gift_addNum"><div class="numX">X</div><div class="num" id="dalay_gift_num">{2}</div></div><span class="name">{1}</span></div></div>';
            var gifNumTemp ='<div class="num_all dalay_gift_num" id="dalay_gift_addNum"><div class="numX">X</div><div class="num" id="dalay_gift_num">{0}</div></div>';          		
			Trigger.register(CONST.Event.StartOfQueue + '-' + thread, queueStart);
            Trigger.register(CONST.Event.EndOfQueue + '-' + thread, queueEnd);
            this.giftQueue = new Queue({
                'handler': function (item, promise) {
                	var gifNums = [];
                	if(item['num']<=100){
                		for(var i=1;i<=item['num'];i++){
                			gifNums.push(i);
                		}
                	}else if(item['num']>100){
                		for(var i=1;i<=item['num'];i++){
                			if(i== 1 || i%15==0 || i==item['num']){
                				gifNums.push(i);
                			}
                		}
                	}
                    viewDom.html(stringFormat(template, 
                    	Environment.drawImage(item['url']), 
                    	item['caption'],
                    	gifNums[0]));
                    $("#cinema").css('visibility','visible');
                   	setTimeout(function () {
                   		var j=0;
                   		var dalay_inter = setInterval(function(){
                   			j++;
                   			if(j==gifNums.length){
                   				clearInterval(dalay_inter);
	                    		$(".pngGift").removeClass('anim_show').addClass('anim_hide');
	                    		var timeout2 = setTimeout(function () {
			                    	$("#cinema").css('visibility','hidden');
			                        clearTimeout(timeout2);
			                        promise.resolve();
			                    }, 1000);
	                    	}else{
	                    		$("#dalay_gift_addNum").remove();
	                    		$("#dalay_gift_con").prepend(stringFormat(gifNumTemp,gifNums[j]));
	                    	}
                   		},500)
                    }, 1000);
                },
                'thread': thread
            });
            var batchStart = function () {
                batch.safeShow();
            }.bind(this);
            var batchEnd = function () {
                batch.safeHide();
            }.bind(this);
            var batch = $('#giftMagic'),
                batchThread = 'Batch',
                endEvent = 'animationend';
            Trigger.register(CONST.Event.StartOfQueue + '-' + batchThread, batchStart);
            Trigger.register(CONST.Event.EndOfQueue + '-' + batchThread, batchEnd);
//          this.batchQueue = new Queue({
//              'handler': function (item, promise) {
//                  var level = item['level'],
//                      className = 'gift' + level;
//                  batch.html(stringFormat(TEMPLATE.BATCH,
//                      UserHelper.portrait(item['pic']),
//                      xss(item['nickname']),
//                      item['num'],
//                      item['gift'],
//                      item['hit'] > 0 ? STRING_EMPTY : DISPLAY_NONE,
//                      item['hit']
//                  )).one(endEvent, function () {
//                      batch.removeClass(className);
//                      batch.html('');
//                      promise.resolve();
//                  }).addClass(className);
//              },
//              'thread': batchThread
//          });
            (function () {
                var destory = function (key) {
                    return function (key) {
                        var temp = this.batchCombo[key];
                        if (temp) {
                            clearTimeout(temp['timeout']);
                            delete this.batchCombo[key];
                        }
                    }.bind(this, key);
                }.bind(this);
                this.batchCombo = {};
                this.comboInterval = 15 * 1000;
                this.comboKeygen = function (userId, giftId, num) {
                    return [userId, giftId, num].join('-');
                };
                this.comboQuery = function (key) {
                    var combo = this.batchCombo[key],
                        hits, timeout;
                    if (!combo)
                        combo = {
                            'hits': 0,
                            timeout: null
                        };
                    hits = combo['hits'];
                    timeout = combo['timeout'];
                    clearTimeout(timeout);
                    combo = this.batchCombo[key] = {
                        'hits': ++hits,
                        'timeout': setTimeout(destory(key), this.comboInterval)
                    };
                    return hits;
                }
            }.bind(this))();
        },
//      粉丝
		'rankReq':function(){
			Bussiness.getData('service/room/v3/rank/'+DATASOURCE['room']['roomId'],function(data){
				DATASOURCE['rank']=data.dataInfo;
        		this.initRank();
        	}.bind(this),null,true);
		},
        'initRank': function() {
            this.onlineTotal = $("[data-role='onlineTotal']");
            this.onlineTotal.html(DATASOURCE['room'].online);
            var orderRank = this.orderRank = {},
                hashRank = this.hashRank = {},
                datasource = DATASOURCE['rank'];
//              shan
//              datasource = DATASOURCE['Other']['rank_list_info'];
//              console.log(DATASOURCE['rank'])
                var totalBalance = DATASOURCE['room']['totalBalance'];
                $('#wealth_rank').html('<li><span class="coin no1" id="total_balance">'+totalBalance+'</span></li>');
			if(datasource && datasource['week']){
//				shan
//              datasource['week'].forEach(function(it, i) {
//              	console.log(it)
//                  it['roomCost'] = it['cost'];
//              });
//				shan
                $('#roster').html(datasource['week'].map(
                    function(item,i){
                        if(i>2) return;
                        var className = '';
//                      shan
//						uatr-3暂时认定为vip字段,需要确认一下
                        if(item.uatr["3"]==1){
                        	className='vip'
                        }else if(item.uatr["3"]==2){
                        	className='svip'
                        }
                        var htlm = stringFormat(TEMPLATE['UV'],stringFormat(classTemplate, className),UserHelper.portrait(item['pic']),item.ufl, xss(item['nk']));
                    	return htlm;
                    }
                ));
				$("#roster li").eq(0).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_one");
	            $("#roster li").eq(1).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_two");
	            $("#roster li").eq(2).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_three");
                orderRank['top1'] = new Order({
                    'initial': datasource['week'],
                    'value': function(data) {
                        return UserHelper.consume(data, 'top1');
                    }
                });
                orderRank['top1'].store.forEach(function(item, i) {
                    hashRank[item['uid']] = item;
                });
           }   
        },
        'initEmoji': function () {
            var chat_emoji = new Emoji({'emojiDOM':$('#emoji'),'faceDOM':$('#face'),'messageDOM':$('#message'),'sayDOM':$('#say'),'sayHandler':this.say.bind(this)});
        },
        'initFlower': function () {
            clearTimeout(this.flowerTimeout);
            var flowerDOM = $('#flower');
            var identity = DATASOURCE['identity'];
            if (!identity || identity['host']) {
                flowerDOM.safeHide();
                return;
            } else {
                flowerDOM.safeShow();
            }
            var counterDOM = flowerDOM.find('[data-role="counter"]'),
                timerDOM = flowerDOM.find('[data-role="timer"]'),
                second = 1000,
                minute = 60,
                interval = 1 * second,
                timeout,
                url = 'room_getUserGoodNum.fly',
                param = {
                    'roomId': DATASOURCE['room']['roomId']
                },
                pick, put, countdownTimeout, limit, total, seconds, minutes;
            var clock = function (initial) {
                clearTimeout(countdownTimeout);
                if (initial)
                    total = Math.floor(initial / second);
                minutes = Math.floor(total / minute);
                seconds = total % minute;
                timerDOM.html(stringFormat(i18nTranslate('Room_GetFlowerTime'), minutes, seconds));
                if (--total >= 0)
                    countdownTimeout = setTimeout(clock, second);
            }.bind(this);
            var put = this.putFlower = function (result) {
                clearTimeout(countdownTimeout);
                var data = result['dataInfo'];
                count = data['userGoodNum'],
                    timerCSS = 'flower_time';
                limit = data['lastGoodTime'];
                counterDOM.html(count).data('count', this.flowerCount = count);
                if (isNaN(limit) || limit < 0) {
                    flowerDOM.removeClass(timerCSS);
                    timerDOM.html(STRING_EMPTY);
                } else {
                    clock(limit);
                    if ((timeout = limit - interval) < 0)
                        timeout = limit;
                    this.flowerTimeout = setTimeout(pick, timeout);
                    if (!flowerDOM.hasClass(timerCSS))
                        flowerDOM.addClass(timerCSS);
                }
            }.bind(this);
            (pick = function () {
                clearTimeout(this.flowerTimeout);
                Bussiness.postData(url, param, put);
            }.bind(this))();
        },
        'initManage': function () {
            var self = DATASOURCE['identity'],
                hidden = ' hidden';
            var selfType, selfHost, selfRoomAdmin;
            if (!self)//未登录
                return;
            var AdminType = CONST.AdminType,
                selfID = self['userId'];
            selfHost = selfID == DATASOURCE['room']['roomUserId'];
            var correction = {
                'left': 50,
                'top': 8
            };
            var adminRight = function adminRight(targetType, targetRoomAdmin) {
                if (selfType == AdminType.Host || selfType == AdminType.Constable) {
                    if (targetType != AdminType.Constable)
                        return true;
                } else if (selfRoomAdmin) {
                    if (targetType != AdminType.Host && targetType != AdminType.Constable)
                        return true;
                }
                return false;
            }.bind(this);
            var render = function () {
                this.manageDOM.safeHide();
                var target = this.users[this.manageID];
                if (!target)
                    return false;
                var lookUserId = DATASOURCE['identity']['userId'];
                var lookUser = this.users[lookUserId];
               	console.log(this.users)
               	console.log(lookUserId)
               	var lookType =lookUser['adminType'] ;//查看用户的类型(0:用户，1：主播：3，管理员)
               	var beLookType = target['adminType'];//被查看人的类型(0:用户，1：主播：3，管理员)
               	var isRoomAdmin = target['roomAdmin']
               	var isSelfLook = false;//自己查看自己
               	
               	if(DATASOURCE['identity'] && DATASOURCE['room']['roomUserId'] == DATASOURCE['identity']['userId']){
               		lookType = "host";//主播
               	}else if(DATASOURCE['identity'] && DATASOURCE['room']['roomUserId'] != DATASOURCE['identity']['userId'] && lookUser['roomAdmin']){
               		lookType = "manager";//管理员
               	}else if(lookUser && lookUser['adminType']==2){
               		lookType = "constable";//系统管理员
               	}else{
               		lookType = "user";//用户
               	}
               	if(target['userId'] == DATASOURCE['identity']['userId']){
               		isSelfLook = true;
               	}

               	if(isSelfLook){
               		this.manageDOM.i18nHTML(
	                    stringFormat(TEMPLATE['MANAGE_NEW'],
	                    	UserHelper.portrait(target['userHeadPic']),
	                        xss(target['userName']),
	                        this.manageID,
	                        '',
	                        hidden,
	                        hidden,
	                        hidden,
	                    	beLookType == 1? this.userDataObj["tr"]:this.userDataObj['tc'],//cost
			                UserHelper.badge(target),
	                    	UserHelper.badge(target)?'':hidden,
	                    	this.userDataObj['fsn']));//follow
               	}else{
               		if(lookType == "host"){
               			this.manageDOM.i18nHTML(
		                    stringFormat(TEMPLATE['MANAGE_NEW'],
			                    UserHelper.portrait(target['userHeadPic']),
			                        xss(target['userName']),
			                        this.manageID,
			                        stringFormat(TEMPLATE['MENU_NEW'],
			                        	(isRoomAdmin || beLookType==2) ? hidden : STRING_EMPTY,
			                        	isRoomAdmin ? STRING_EMPTY : hidden,
			                        	beLookType==2 ? hidden : STRING_EMPTY,
			                        	beLookType==2 ? hidden : STRING_EMPTY,
			                        	target['userAttr']['3'] == 2 ? STRING_EMPTY:hidden),
			                        hidden,
			                        hidden,
			                        '',
			                    	beLookType == 1? this.userDataObj["tr"]:this.userDataObj['tc'],
			                    	UserHelper.badge(target),
			                    	UserHelper.badge(target)?'':hidden,
		                    	this.userDataObj['fsn']));
               		}else if(lookType == "constable"){
               			this.manageDOM.i18nHTML(
		                    stringFormat(TEMPLATE['MANAGE_NEW'],
			                    UserHelper.portrait(target['userHeadPic']),
			                        xss(target['userName']),
			                        this.manageID,
			                        stringFormat(TEMPLATE['MENU_NEW'],
			                        	hidden,
			                        	hidden,
			                        	STRING_EMPTY,
			                        	STRING_EMPTY,
			                        	(beLookType == 1 && target['userAttr']['3'] == 2) ? STRING_EMPTY:hidden),
			                        hidden,
			                        hidden,
			                        hidden,
			                    	beLookType == 1? this.userDataObj["tr"]:this.userDataObj['tc'],
			                    	UserHelper.badge(target),
			                    	UserHelper.badge(target)?'':hidden,
		                    	this.userDataObj['fsn']));
               		}else if(lookType == "manager"){
               			this.manageDOM.i18nHTML(
		                    stringFormat(TEMPLATE['MANAGE_NEW'],
			                    UserHelper.portrait(target['userHeadPic']),
			                        xss(target['userName']),
			                        this.manageID,
			                        (beLookType == 0 || beLookType == 1) ? stringFormat(TEMPLATE['MENU_NEW'],
			                        	hidden,
			                        	hidden,
			                        	(isRoomAdmin || beLookType == 1) ? hidden : STRING_EMPTY,
			                        	(isRoomAdmin || beLookType == 1) ? hidden : STRING_EMPTY,
			                        	beLookType == 1 ? STRING_EMPTY : hidden):STRING_EMPTY,
			                        (beLookType == 1 && !DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY :hidden,
			                        (beLookType == 1 && DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY :hidden,
			                        '',
			                    	beLookType == 1? this.userDataObj["tr"]:this.userDataObj['tc'],
			                    	UserHelper.badge(target),
			                    	UserHelper.badge(target)?'':hidden,
			                    	this.userDataObj['fsn']));
               		}else if(lookType == "user"){
               			this.manageDOM.i18nHTML(
		                    stringFormat(TEMPLATE['MANAGE_NEW'],
		                    	UserHelper.portrait(target['userHeadPic']),
		                        xss(target['userName']),
		                        this.manageID,
		                        beLookType == 1 ? stringFormat(TEMPLATE['MENU_NEW'],
			                        	hidden,
			                        	hidden,
			                        	hidden,
			                        	hidden,
			                        	STRING_EMPTY):STRING_EMPTY,
		                        (beLookType == 1 && !DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY :hidden,
			                    (beLookType == 1 && DATASOURCE['room']['userIsFavorite']) ? STRING_EMPTY :hidden,
		                        '',
		                    	beLookType == 1? this.userDataObj["tr"]:this.userDataObj['tc'],
			                    UserHelper.badge(target),
		                    	UserHelper.badge(target)?'':hidden,
		                    	this.userDataObj['fsn']));//follow
               		}
               	}
                return true;
            }.bind(this);
            var location = function manage(target) {
                var chatLeft = 0 + correction['left'];
                var chatRight = "auto";
                if($("#container").hasClass("arabic")){
                	chatRight = 0 + correction['left'];
                	chatLeft = "auto";
                }
                var chatTop = target.offset()['top'] - this.roomRightDOM.offset()['top'] + correction['top'];
                var chatBottom = "auto";
                var rightHei = $(".right_wrap").height();
                if(chatTop > rightHei-180){
                	chatTop = "auto";
                	chatBottom = 0;
                }
                var position = {
                    'left': chatLeft,
                    'right': chatRight,
                    'top': chatTop,
                    'bottom':chatBottom
                };
                this.manageDOM.css(position).safeShow();
            }.bind(this);
            var manage = function (evt) {
                var target = $(evt.currentTarget);
                var manageID = target.data('identity');
                selfType = self['userType'];
                selfRoomAdmin = self['roomAdmin'];
//              if (selfType == AdminType.Host && DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId'])
//                  selfType = AdminType.User;
//              switch (selfType) {
//                  case AdminType.User:
//                  case AdminType.Bussiness:
//                  case AdminType.Guy:
//                      if (!selfRoomAdmin)
//                          return;
//                      break;
//              }
//              if (this.manageID == manageID || manageID == selfID)
//                  return;
                this.manageID = manageID;
                var userType = this.users[this.manageID]['userType'];
                lock = true;
                $.ajax({
	                url: '/service/room/v3/u/v4/'+DATASOURCE['room']['roomId']+'/'+this.manageID +'/'+userType,
	                type: "get",
	                dataType: 'json',
	                success:function(result){
//	                		console.log(result)
	                        this.userDataObj = result.dataInfo;
	                        if (render())
                    			location(target);	                        
	                    if (result['code'] == 0) {
	                    }else if(result['code'] == 99){
	                    	 return false;
	                    }
	                    lock = false;
	                }.bind(this)
	            });
                
            }.bind(this);
            var badgeHover = function (evt) {
            	var target = $(evt.currentTarget);
                var beLookId = target.parent().data('userid');
                var badgeId = target.data('badgeid');
            	var users = this.users[beLookId];
            	var chatTop = target.offset()['top'] - this.roomRightDOM.offset()['top'] + 25;
            	this.badgeTim = setTimeout(function(){
	                var isAr = $("#container").hasClass("arabic");
	                var bagesHoverDom = $("#bages_hover");
	                bagesHoverDom.removeClass('hidden');
					bagesHoverDom.i18nHTML(
		                stringFormat(TEMPLATE['BAGESHOVER'],
		                isAr ? DATASOURCE['badge'][badgeId]['lg']['ar'].n:DATASOURCE['badge'][badgeId]['lg']['en'].n,
		                isAr ? DATASOURCE['badge'][badgeId]['lg']['ar'].t:DATASOURCE['badge'][badgeId]['lg']['en'].t
	                ));
				    bagesHoverDom.css('top',chatTop);
            	},1500)
                
            }.bind(this);
            var badgeLeave = function (evt) {
            	clearTimeout(this.badgeTim);
                $("#bages_hover").addClass('hidden');
                $("#bages_hover").html('');
            }.bind(this);
            this.roomRightDOM.on('click', '[data-identity]', manage);
            
            this.manageDOM.on('click', '[data-action]', function (evt) {
                var target = $(evt.currentTarget),
                    action = target.data('action');
                switch (action) {
                    case 'whisper':
                        Trigger.emit('Manage-Whisper', [this.manageID]);
                        //this.rightSwitch(null, true);
                        break;
                    case 'admin':
                    case 'mute':
                    case 'out':
                        this.manage(action, this.manageID, parseInt(target.data('state')));
                        break;
                    
                    case 'Follow':
                    	this.userCardFollow(true);
                    break;
                    case 'UnFollow':
                    	this.userCardFollow(false);
                    break;
                    case 'Report':
                    	this.userCardReport(this.manageID);
                    break;
                }
                this.manageDOM.safeHide();
                this.manageID = null;
            }.bind(this));
            ClickCollect.register('manage', this.manageDOM, function () {
                this.manageID = null;
            }.bind(this));
            $("#chatroom").on('mouseenter', '[data-badgeid]', badgeHover);
            $("#chatroom").on('mouseleave', '[data-badgeid]', badgeLeave);
        },
        //关注和取消关注
        'initFollow': function () {
            var identity = DATASOURCE['identity'];
            var followDOM = $('#hostFollow'),
            	unFollowDOM = $('#hostUnFollow'),
            	followHeartDOM = this.roomTopDOM.find('.honor_follow'),
                followed, lock;
            if (followed = DATASOURCE['room']['userIsFavorite']){//用户是否关注-是
            	followDOM.addClass('hidden');
                unFollowDOM.removeClass('hidden');
            }else{
            	followDOM.removeClass('hidden');
                unFollowDOM.addClass('hidden');
            }   
            if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
           	    followDOM.safeHide();
                unFollowDOM.safeHide();
            }  
            followDOM.on('click', function () {
                if(followed)
                    return;
                if (!UserHelper.validate())
                    return;
                if (lock)
                    return;
                lock = true;
                
                $.ajax({
                    url: '/service/room/v3/fav/add/'+DATASOURCE['room']['roomId'], //v3关注接口
                    type: "post",
                    dataType: 'json',
                    success:function(result){
                        if (result['code'] == 0) {
                            followed = true;
                            followHeartDOM.html(parseInt(followHeartDOM.text()) + 1 * (followed ? 1 : -1));
                            followDOM.addClass('hidden');
                			unFollowDOM.removeClass('hidden');
                			DATASOURCE['room']['userIsFavorite']=true;
                        }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }
                        lock = false;
                    }.bind(this)
                });
            }.bind(this));
            unFollowDOM.on('click', function () {
                if(!followed)
                    return;
                if (!UserHelper.validate())
                    return;
                if (lock)
                    return;
                lock = true;
                $.ajax({
                    url: '/service/room/v3/user/fav/push/state/'+DATASOURCE['room']['roomId'], //v3取消关注接口
                    type: "post",
                    dataType: 'json',
                    data:{favorite:1},
                    success:function(result){
                        if (result['code'] == 0) {
                            followed = false;
                            followHeartDOM.html(parseInt(followHeartDOM.text()) + 1 * (followed ? 1 : -1));
                            followDOM.removeClass('hidden');
                			unFollowDOM.addClass('hidden');
                			DATASOURCE['room']['userIsFavorite']=false;
                        }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }
                        lock = false;
                    }.bind(this)
                });
            }.bind(this));
        },
        //全屏
        'initFullScreen': function () {
            var fullScreenDOM = $('#full_screen');
//         	是主播
           	if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
           		fullScreenDOM.safeHide();
           	}
        },
        //视频关闭
        'initVidepStop': function () {
            var videoStopDOM = $('#videoStop');
////         	是主播
//         	if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
//         		$('#videoStop').removeClass("hidden");
//         	}
			videoStopDOM.on("click",function(){
				$("#container").i18nAppend(TEMPLATE['STOPVIDEOCONFIRM']);
				
                $("#video_btns").on('click', '[data-role]', function (evt) {
					var tar = $(evt.currentTarget),
       				role = tar.data('role');
       				if(role == 'video_confirm'){
       					$("#show_Ring").addClass("hidden");
		                videoStopDOM.addClass("hidden");
		                console.log(Player);
						Player.instance['StopVideo']();
       				}
       				$('.videoConfirm_pop').remove();
				}.bind(this));
			})
        },
        //清屏动画
        'initFlashShop': function () {
        	sessionStorage.setItem("isFlashStart", "true");
        	//非主播
        	if((!DATASOURCE['identity'] || (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId']))) && DATASOURCE['room']['topCategory']!=107){
           		$("#flashShop").removeClass('hidden');
           	}
            var flashShopDOM = $('#flashShop'),
            	flashStartDOM = $('#flashStart');
			flashShopDOM.on("click",function(){
				sessionStorage.setItem("isFlashStart", "false");
				flashShopDOM.addClass("hidden");
				flashStartDOM.removeClass("hidden");
			})
			flashStartDOM.on("click",function(){
				sessionStorage.setItem("isFlashStart", "true");
				flashShopDOM.removeClass("hidden");
				flashStartDOM.addClass("hidden");
			})
        },
        
        //举报
        'initAccusatiaon': function () {
            var accusationDOM = $('#hostReport');       	
//         	是主播
           	if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
           		accusationDOM.safeHide();
           	}
            accusationDOM.on('click', function () {
            	if (!UserHelper.validate()){
            		return;
            	}
            	$("#container").i18nAppend(stringFormat(TEMPLATE.ACCUSATION));
        		
        		var showPopClose = $('.show_pop_close'),
            	showDescBtn = $('.show_desc_btn');
            	
        		showPopClose.on('click', function () {
	        		$(".popup_par").remove();
	        	}.bind(this));
	        	var popSetT;
	        	showDescBtn.on('click', function () {
	            	var reportType = $("input[name='reportType']:checked").val();
	            	var reportMeg = $("#reportMeg").val();
	            	$.ajax({
	                    url: '/service/report/v3/'+DATASOURCE['room']['roomId']+'/'+reportType, //v3举报接口
	                    type: "post",
	                    dataType: 'json',
	                    data:{to:DATASOURCE['room']['roomUserId'],msg:reportMeg,relation:'',countryName:''},
	                    success:function(result){
	                    	$(".popup_par").addClass("hidden");
	                        if (result['code'] == 0) {
	                            Trigger.emit(CONST.Event.PopupTip, [{
			                        'template': TEMPLATE.REOPRTSUCCESS,
			                        'isBind': true,
			                        'top': '100px'
			                    }]);
	                        }else if(result['code'] == 99){
		                    	login_util.show_login_div();
		                    }else{
	                        	Trigger.emit(CONST.Event.PopupTip, [{
			                        'template': TEMPLATE.REOPRTERROE,
			                        'isBind': true,
			                        'top': '100px'
			                    }]);
	                        }
	                    }.bind(this)
	                });
	        	}.bind(this));
            }.bind(this));
        },
        ///管理员用户列表
        'initManagerUserLists':function(){
            var managerListDOM = $('#managerList');
            //是主播
            if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                managerListDOM.safeShow();
            }else{
                return false;
            }
            managerListDOM.on('click',function(){
                if(!UserHelper.validate()) return;
                $("#container").i18nAppend(TEMPLATE['MANAGER_USER_LISTS']);
                var showPopClose = $('.show_pop_close'),
                    collapseAdmin = $('.manager_collapse'),
                    managerScrollDOM = $('.manager_lists_div')[0],
                    $userContainer = $('.user_container'),
                    $userLists=$('#user_lists'),
                    $mbg = $('.manager_container .mbg'),
                    $msk = $('.manager_lists .msk'),
                    $cardDOM = $('#manage_user_card');
                UIHelper.initScroller($userContainer[0]);
                showPopClose.on('click', function () {
                    $(".popup_par").remove();
                }.bind(this));
                //折叠展开
                collapseAdmin.on('click',function(){
                    $('.manager_container').toggleClass('hidden');
                    $(this).toggleClass('reverse');
                    $userContainer.toggleClass('hidden');
                    $mbg.toggleClass('hidden');
                    $msk.toggleClass('hidden');
                    UIHelper.updateScroller($userContainer[0],true);
                    UIHelper.updateScroller(managerScrollDOM,true);
                    var height = $('.manager_container').height()-40-$('#manager_lists').height();
                    if(height>0){
                        $mbg.css('height',height+'px');
                        $msk.css('bottom',height+'px');
                    }
                });

                //管理员列表
                $.ajax({
                    url : '/service/room/v3/users/admin/'+DATASOURCE['room']['roomId'], //v3管理员接口
                    type: 'GET',
                    dataType:'json',
                    success: function(result){
                        console.log('manager:');
                        console.log(result);
                        if(result['code'] == 0){
                            var userObjs = this.users,len = result['dataInfo'].length;
                            if(len<1){
                                $('.manager_bar .noAdmin').removeClass('hidden');
                                return;
                            }
                            UIHelper.initScroller(managerScrollDOM);

                            $("#manager_lists").i18nHTML(result.dataInfo.map(function (item) {
                                var onlineCss = 'noOnline';
                                if(item['online']){
                                    onlineCss = 'online';
                                }
                                $('#manager_head_lists').append(stringFormat('<span data-userid="{3}"><img alt="" src="{0}" {2}><strong class="{1}"></strong></em></span>',Environment.drawImage(item.pic),onlineCss,'onerror="this.src=\'' + Environment.drawImage('systemRes/img/default/nophoto.jpg') + '\';"',item['uid']));
                                return stringFormat(TEMPLATE.MANAGERLISTS_LI,
                                    item['uid'],
                                    onlineCss,
                                    UserHelper.portrait(item['pic']),
                                    item['nk'],
                                    item['fl'],
                                    item['fs'],
                                    item['utp']
                                );
                            }).join(''));


                            if(len<7){
                                // var height = $('.manager_container').height()-40-$('#manager_lists').height();
                                // $mbg.css('height',height+'px');
                                // $msk.css('bottom',height+'px');
                            }
                            $mbg.addClass('hidden');
                            $msk.addClass('hidden');

                            $("#manager_lists").on('click', '[data-action]', function (evt) {
                                var target = $(evt.currentTarget),
                                    userId = target.parent().data('userid'),
                                    userNm = target.parent().data('username');
                                $("#container").i18nAppend(stringFormat(TEMPLATE['MANAGERCONFIRM'],userId,stringFormat(i18nTranslate('Room_Managers_Confirm'),userNm)));

                                $("#manager_btns").on('click', '[data-role]', function (evt) {
                                    var removeId = parseInt($("#admin_remove_id").val());
                                    var tar = $(evt.currentTarget),
                                        role = tar.data('role');
                                    if(role == 'manager_close'){
                                        $('.manage_pop').remove();
                                    }else{
                                        this.manage('admin', userId, 1);
//		                        				target.parent().remove();
                                        $('#manager_lists>li[data-userid="'+removeId+'"]').remove();
                                        $('#manager_head_lists>span[data-userid="'+removeId+'"]').remove();
                                        if($('#manager_lists>li').length<1){
                                            $('.manager_bar .noAdmin').removeClass('hidden');
                                        }
                                        var height = $('.manager_container').height()-40-$('#manager_lists').height();
                                        $mbg.css({'height':height+'px'});
                                        $msk.css('bottom',height+'px');
                                        UIHelper.updateScroller(managerScrollDOM);
                                        $('.manage_pop').remove();
                                    }
                                }.bind(this));
                            }.bind(this));
                        }
                    }.bind(this)
                });
                //粉丝列表
                var fansPage = 1,fansLoading = false;
                $.ajax({
                    url:'/service/room/v3/fans/on/'+DATASOURCE['room']['roomId']+'?size=20&no=1',
                    type:'GET',
                    dataType:'json',
                    success:function(result){
                        renderFans(result,false);
                        $userContainer.scroll(function(){
                            if(!fansLoading) return;
                            if($userContainer.scrollTop() + $userContainer.height() + 10 >= $userLists.height()){
                                $userContainer.append('<p class="loading">loading</p>');
                                $.ajax({
                                    url:'/service/room/v3/fans/on/'+DATASOURCE['room']['roomId']+'?size=20&no='+(++fansPage),
                                    type:'GET',
                                    dataType:'json',
                                    success:function(result){
                                        fansLoading = false;
                                        renderFans(result,true);
                                    }.bind(this)
                                });
                            }
                        }.bind(this));
                    }.bind(this)
                });
                function renderFans(result,repaint){
                    console.log(result);
                    if(result.code == 0){
                        $userContainer.find('p.loading').remove();
                        var len = result.dataInfo.length;
                        if(len<1){
                            if(!repaint)
                                $userContainer.find('span').removeClass('hidden');
                            return;
                        }
                        //造假数据
                        if(!repaint){
                            for(var i=0;i<22;i++){
                               // result.dataInfo[i+2]=result.dataInfo[0];
                            }
                        }
                        $userLists.i18nAppend(result.dataInfo.map(function(item){
                            var onlineCss = 'noOnline';
                            if(item['online']){
                                onlineCss = 'online';
                            }
                            return stringFormat(TEMPLATE.FANSLISTS_LI,
                                item['uid'],
                                onlineCss,
                                UserHelper.portrait(item['pic']),
                                item['nk'],
                                item['fl'],
                                item['fs'],
                                item['utp']
                            );
                        }.bind(this)).join(''));
                        UIHelper.updateScroller($userContainer[0],true);
                        fansLoading = len ==20 ? true : false;
                    }
                }

                //管理员用户个人名片
                $('.manager_lists').on('click','[data-identity]',function(evt){
                    Card.manage.call(this,evt,$cardDOM,$(evt.currentTarget).data('utp'));
                }.bind(this));
                $cardDOM.on('click', '[data-action]', function (evt) {
                    Card.action.call(this,evt,$cardDOM);
                }.bind(this));
                ClickCollect.register('managefans', $cardDOM, function () {
                    this.manageID = null;
                }.bind(this));
            }.bind(this));
        },
        //管理员列表
        'initManagerLists': function () {
            var managerListDOM = $('#managerList');       	
//         	是主播
           	if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
           		managerListDOM.safeShow();
           	}
            managerListDOM.on('click', function () {
            	if (!UserHelper.validate()){
            		return;
            	}
				$.ajax({
                    url: '/service/room/v3/users/admin/'+DATASOURCE['room']['roomId'], //v3管理员接口
                    type: "get",
                    dataType: 'json',
                    success:function(result){
                    	console.log(result)
                    	if (result['code'] == 0) {
                    		$("#container").i18nAppend(stringFormat(TEMPLATE['MANAGERLISTS'],stringFormat(i18nTranslate('Room_managers_lists'),result['dataInfo'].length),result['dataInfo'].length));
                    		var showPopClose = $('.show_pop_close');
							showPopClose.on('click', function () {
				        		$(".popup_par").remove();
				        	}.bind(this));         
				        	var userObjs = this.users;
                    		if(result['dataInfo'].length<1){
                    			$("#manager_lists").html(stringFormat('<span class="noManager">{0}</span>',i18nTranslate('Room_managers_noAdmin')));
                    			return;
                    		}
                    		$("#manager_lists").i18nHTML(result.dataInfo.map(function (item) {
	                           var onlineCss = 'noOnline';
	                           if(item['online']){
	                           		onlineCss = 'online';
	                           }
	                           return stringFormat(TEMPLATE.MANAGERLISTS_LI,
	                            item['uid'],
	                            onlineCss,
	                            UserHelper.portrait(item['pic']),
	                            item['nk']);
	                        }).join(''));
	                        
				        	$("#manager_lists").on('click', '[data-action]', function (evt) {
				                var target = $(evt.currentTarget),
				               		userId = target.parent().data('userid'),
				               		userNm = target.parent().data('username');
				               		$("#container").i18nAppend(stringFormat(TEMPLATE['MANAGERCONFIRM'],userId,stringFormat(i18nTranslate('Room_Managers_Confirm'),userNm)));
                    				
                    				$("#manager_btns").on('click', '[data-role]', function (evt) {
                    					var removeId = parseInt($("#admin_remove_id").val());
                    					var oldCount = parseInt($("#managerAll").attr("data-count"));
                    					var tar = $(evt.currentTarget),
				               				role = tar.data('role');
				               				if(role == 'manager_close'){
				               					$('.manage_pop').remove();
				               				}else{
                                                Communicator.delegate({'action': 'admin','userId': userId,'userType': user['userType'],'state':1,'roomId': DATASOURCE['room']['roomId']});
                                                this.manage('admin', userId, 1);
//		                        				target.parent().remove();
		                        				$('#manager_lists>li[data-userid="'+removeId+'"]').remove();
		                        				var nowManagerCount = oldCount - 1;
		                        				$("#managerAll").i18nHTML(stringFormat(i18nTranslate('Room_managers_lists'),nowManagerCount));
				               					$("#managerAll").attr("data-count",nowManagerCount);
		                        				if(nowManagerCount<1){
					                    			$("#manager_lists").html(stringFormat('<span class="noManager">{0}</span>',i18nTranslate('Room_managers_noAdmin')));
					                    		}
				               					$('.manage_pop').remove();
				               				}
                    				}.bind(this));
							}.bind(this));
                        }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }else{
                        	
                        }
                    }.bind(this)
                });
            }.bind(this));
            
        },
        'initWhisper': function(){
            var whisperBtn = $('#whisper'),identity = DATASOURCE['identity'];
            var viewWhisper = function(){ //toggle
                var whisperWin = this.whisperDOM.find('[data-whisper]');
                $('#whisper').find('em').safeHide();
                if(whisperWin && whisperWin.length>0){
                    if(whisperWin.is(':visible')){
                        whisperWin.toggleClass('folded');
                    }else{
                        if($('#whisper_list').find('[data-more]').length>0)
                            Whisper.restore(whisperWin.data('whisper'));
                        else
                            whisperWin.toggleClass('folded').toggleClass('hidden').find('em').safeHide()
                    }
                }else{
                    identifyFn();
                }
            }.bind(this);
            var identifyFn = function(whisperID,whisperName,force) {
                if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId'])) {
                    var room = DATASOURCE['room'];
                    whisperID = room['roomUserId'];
                    whisperName = room['roomUserName'];//host
                }
                var tipKey, identity = DATASOURCE['identity'];
                if (identity) {
                    if (identity['userId'] != DATASOURCE['room']['roomUserId']) {
                        if ((identity['vipType'] != CONST.MemberType.SVIP) && (identity['userType'] != CONST.AdminType.Constable))
                            tipKey = 'Room_BecomeSVIPtoPrivateChat';
                    }
                } else{
                    login_util.show_login_div();
                    return;
                }

                if (tipKey && !force) {
                    Trigger.emit(CONST.Event.PopupTip, [{
                        'template': TEMPLATE.BECOMESVIPTOCHAT,
                        'isBind': true,
                        'top': '100px'
                    }]);
                    return;
                }else{
                    Whisper.create(whisperID,whisperName,this.say,this.sayCallback.bind(this),force);
                }
            }.bind(this);
            Trigger.register('Manage-Whisper', function(whisperID,force) {
                this.whisperID = whisperID;
                var user = this.users[this.whisperID];
                if (user) {
                    identifyFn(whisperID,xss(user['userName']),force);
                }
            }.bind(this));
            whisperBtn.on('click', viewWhisper);
            if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
           		whisperBtn.safeHide();
                return;
           	}else {
                whisperBtn.safeShow();
            }

        },
        'rightSwitch': function (state , evt) {
            if (this.rightState == state)
                return;
            if (state == 'chat') {
                this.uvDOM.addClass('hidden');
                this.ugcDOM.removeClass('hidden');
                $('#switch_ranking').parent().removeClass('select');
                $('#switch_chat').parent().addClass('select');
            } else {
                this.ugcDOM.addClass('hidden');
                this.uvDOM.removeClass('hidden');
                $('#switch_chat').parent().removeClass('select');
                $('#switch_ranking').parent().addClass('select');
            }
            this.rightState = state;
        },
        'fans': function () {
            if (!this.flowerCount)
                return;
            if (this.flowerLock)
                return;
            this.flowerLock = true;
            Communicator.delegate({
                'action': 'good',
                'roomId': DATASOURCE['room']['roomId'],
                'num': 1
            }, null, this.fansCallback);
        },
        'fansCallback': function (cache, result) {
            if (result['code'] == 0)
                this.putFlower(result);
            this.flowerLock = false;
        },
        'say': function () {
            if (!UserHelper.validate())
                return;
            var content = StringHelper.trim(this.messageDOM.val());
            if (content === STRING_EMPTY)
                return;
            var ChatMode = CONST.ChatMode;
            var option = {
                'action': 'chat',
                'message': content,
                'messageType': this.chatMode
            }
            if (this.chatMode == ChatMode.Whisper)
                option['userId'] = this.whisperID;
            Communicator.delegate(option, option, this.sayCallback);
            this.messageDOM.val('');
        },
        'sayCallback': function (cache, result) {
            var textNO;
            switch (result['code']) {
                case 31:
                    textNO = i18nTranslate('Room_System_SendMessageTooLong');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 34://禁言                 
                	textNO = stringFormat(i18nTranslate('Room_System_BanText_By_Admin'),Math.floor(result['dataInfo']/60000));
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 800:
                    textNO = i18nTranslate('Room_System_SendMessageTooFast');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 55: //剔除
                    textNO = i18nTranslate('Room_System_SystemBusy');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 43:
                    textNO=i18nTranslate('Room_System_UserOffline');
                    tipType = CONST.ChatMode.Whisper;
                    break;
                case 44:
                    textNO = i18nTranslate('Room_System_HostOffline');
                    tipType = CONST.ChatMode.Whisper;
                    break;
                case 99:
                    login_util.show_login_div();
                    break;
                /* case 3003:
                 textNO = i18nTranslate('Room_BecomeSVIPtoPrivateChat');
                 tipType = CONST.ChatMode.Whisper;
                 break;*/
            }
            if (!textNO)
                return;
//          this.notice(textNO, tipType);
			if(cache['messageType']==1){
				this.notice(textNO, tipType);
			}else{
				$("#send_wrong_meg").removeClass("hidden");
				$("#send_wrong_meg").html(textNO);
				setTimeout(function(){
					$("#send_wrong_meg").addClass("hidden");
				},2000);
			}
			
        },
        'notice': function (content, mode) {
            this.chat({
                'system': true,
                'messageType': mode,
                'message': content
            }, true);
        },
        'give': function () {
            if (!UserHelper.validate())
                return;
            if (!this.giftId)
                return;
            var count = parseInt(this.countDOM.val());
            if (isNaN(count) || count == 0) {
                this.countDOM.val(1);
                return;
            } else if (count > 999)
                this.countDOM.val(count = 999);
            var data = {
                'userId': DATASOURCE['room']['roomUserId'],
                'num': count
            };
            if (this.special) {
                var maxCount = $('#listGoods').find('[data-role="special"][data-giftid="' + this.giftId + '"]').data('count');
                if (parseInt(maxCount) < count) {
                    Trigger.emit(CONST.Event.PopupText, [$('#listGoods'), '<div class="bag_tip">' + stringFormat(i18nTranslate('Room_PackTipCountLess'), count) + '</div>']);
                    return;
                }
                if(this.giftId == 99999){ //backpack diamond
                    $.ajax({
                        url:"/service/room/v3/"+ DATASOURCE['room']['roomId'] +"/send",
                        type : 'post',
                        contentType : 'application/x-www-form-urlencoded',
                        dataType : "json",
                        data : {
                            loginKey :Cookie.get(Cookie.key['login_key']) || 0,
                            data:JSON.stringify({"cmd":35,"num":count})
                        },
                        success:this.specialCallback.bind(this,data)
                    });
                }else{
                    $.extend(data, {
                        'action': 'special',
                        'special': this.giftId
                    });
                    Communicator.delegate(data, data, this.specialCallback);
                }
            } else {
                if (this.vipgift) {
                    var giftVIP = $('#listGoods').find('[data-role="vipgift"][data-giftid="' + this.giftId + '"]').data('vip');
                    var userType = DATASOURCE['identity']['vipType'];
                    if (userType < giftVIP) {
                        Trigger.emit(CONST.Event.PopupTip, [{
                            'template': userType < 1 ? TEMPLATE.BUYVIPGIFT : TEMPLATE.BUYSVIPGIFT,
                            'isBind': true,
                            'top': '100px'
                        }]);
                        return;
                    }
                }
                $.extend(data, {
                    'action': 'gift',
                    'giftId': this.giftId
                });
                Communicator.delegate(data, data, this.giftCallback);
            }
        },
//      store购买
        'storeBuy': function () {
            if (!UserHelper.validate())
                return;
            if (!this.giftId){
            	Trigger.emit(CONST.Event.PopupTip, [{
                    'template': TEMPLATE.BUYERROE,
                    'isBind': true,
                    'top': '100px'
                }]);
                setTimeout(function(){
                	$(".popup").remove();
                },2000);
            	return;
            }
            var count = parseInt(this.totalPriceDOM2.html()),
			giftNum = parseInt($(".store_days>.selectd").attr("data-value"));
			var totalCount = count*giftNum;
            var maxCount = DATASOURCE["identity"]["userBalance"];
            var userBalance = parseInt($("span[name='user_balance']").html());
            if (userBalance < totalCount) {
                Trigger.emit(CONST.Event.PopupTip, [{
                    'isBind': true,
                    'top': '100px'
                }]);
                return;
            }
            $.ajax({
                url:"/service/shop/v3/"+this.giftId ,
                type : 'post',
                contentType : 'application/x-www-form-urlencoded',
                dataType : "json",
                data : {
                    num:giftNum
                },
                success: function (data) {
                    if(data.code == 0){
                        var packTpl;
                        if(this.isGiftPack){
                              packTpl = this.rewards.map(function(item){
                                  var unit = item.expire == 0 ? 'X'+ item.number : item.expire + i18nTranslate('Store_Days');
                                  return stringFormat('<li><span></span><img src="{0}">{1}</li>','/resource/'+item.pic , unit);
                              }.bind(this)).join('');
                        }
                        Trigger.emit(CONST.Event.PopupTip, [{
	                        'template': this.isGiftPack ? stringFormat(TEMPLATE.BUYSUCCESSGIFTPACK,packTpl) : TEMPLATE.BUYSUCCESS ,
	                        'isBind': true,
	                        'top': '100px'
	                    }]);
	                    var nowUserBalance = userBalance - totalCount;
	                    $("span[name='user_balance']").html(nowUserBalance)
                    }else if(data.code == 99){
                    	login_util.show_login_div();
                    }else{
                    	Trigger.emit(CONST.Event.PopupTip, [{
	                        'template': TEMPLATE.BUYERROE,
	                        'isBind': true,
	                        'top': '100px'
	                    }]);
                    }
                }.bind(this)
            });
        },
        'specialCallback': function (cache, result) {
            if (result.code == 0) {
                var $packGift = $('#listGoods').find('[data-role="special"][data-giftid="' + this.giftId + '"]'),
                    nowCount = parseInt($packGift.data('count')) - cache.num;
                nowCount <= 0 ? $packGift.hide() : $packGift.data('count', nowCount).find('.price_num').html(nowCount);           	
            	if(nowCount <= 0){
            		if(parseInt($("ul[data-type='backpack']>li").eq(0).attr('data-giftid')) == cache.special){
	        			$("ul[data-type='backpack']>li").eq(0).remove();
	        			var selObj = $("ul[data-type='backpack']>li").eq(0);
	                    selObj.trigger("click");
            		}else{
            			$("ul[data-type='backpack']>li[data-giftid="+cache.special+"]").remove();
            		}
            		if(!$("ul[data-type='backpack']").html()){
            			$("#preview_img").empty();
            			$("#count").val(1);
            			$("#gift_total_count").html('');
            		}
            	}
            	
            }else if(result.code == 99){
            	login_util.show_login_div();
            }
        },
        'giftCallback': function (cache, result) {
            switch (result.code) {
                case 0:
                    var data = result['dataInfo'];
                    var nowBalance = parseInt(this.myBalanceDOM.html());
                    this.myBalanceDOM.html(nowBalance - data['costBalance']);
                    break;
                case 35:
                    Trigger.emit(CONST.Event.PopupTip, [{
                        'isBind': true,
                        'top': '100px'
                    }]);
                    break;
                case 99:
                    login_util.show_login_div();
                    break;
                default:
                    break;
            }
        },
        'preview': function (giftId, index) {
            var iGiftBoxW=parseInt(this.roomTopDOM.css('width'));
            var iGiftBoxSL=parseInt($("#listGoods").scrollLeft());
            var style=index*64-iGiftBoxSL<iGiftBoxW/2?'side1':'side2';
            var gift = DATASOURCE['gift'][giftId];
            if (!gift)
                return;
            var url = gift['gp'];
            if (url.toLowerCase().lastIndexOf('.swf') == (url.length - 4))
                url = gift['gr'];
            if (!url)
                return;
            if (this.previewStyle != style) {
                this.previewDOM.removeClass(this.previewStyle).addClass(style);
                this.previewStyle = style;
            }
            var imgUrl = DOMAIN_CONFIG['IMAGE_DOMAIN'] + url;
        	$('#preview_img').html('<img src="'+imgUrl+'"/>');
			$('#count').val(1);
			$("#one-price").val(gift['cb'])
           	$('#gift_total_count').html(gift['cb']);
        },
        //向列表中添加数据（MZY）
        'join': function (data, force) {
            var userId = data['userId'],
                temp;
            if (userId == ((temp = DATASOURCE['identity']) && (temp = temp['userId'])))
                DATASOURCE['identity']['roomAdmin'] = data['roomAdmin'];
            var item = this.users[userId];
            if (this.users.hasOwnProperty(userId) && !force) {
                item.element.removeClass('off');
                return;
            }
            
            var nowOnline = parseInt(this.onlineTotal.html());
            this.onlineTotal.html(nowOnline+1)
            var position = this.userOrder.insert(data);
            this.users[userId] = data;
            
            var nickname = data['userName'];
            var AdminType = CONST.AdminType,
                adminType = data['adminType'],
                className = STRING_EMPTY;
            if (adminType == AdminType.Host)
                className = 'host';
            else if (adminType == AdminType.Constable)
                className = 'constable';
            else if (data['roomAdmin'])
                className = 'manager';
            var memberCSS = CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
           var element, html = stringFormat(TEMPLATE['UV'],
                stringFormat(classTemplate, className + ' ' + memberCSS),
                data['userId'], STRING_EMPTY, UserHelper.portrait(data['headPic']), 
                xss(nickname), data.hostLevel, UserHelper.badge(data))
            element = $(html);
            data['element'] = element;
            
            var Limo = DATASOURCE['limo'],
                limo ;
            limo = (limo = data['showCar']) && (limo = data['car']) && (limo = Limo[limo]);
          if (limo)//如果在在线用户列表中就不播放自己的座驾
          		setTimeout(function(){
      				MagicCar.driveCar({
	                    'url': DOMAIN_CONFIG['IMAGE_DOMAIN'] + limo['webResource'],
	                    'id': limo['name'],
	                    'caption': nickname
	                });
      			},800);
                
            /**
             if (data['car'] && Limo[data['car']]) {
                this.limoDOM.prepend($(stringFormat(TEMPLATE['LIMO'], Environment.drawImage(DATASOURCE['limo'][data['car']]['webPic']), STRING_EMPTY, nickname, userId)));
                var num = this.roomLeftDOM.find('[data-role="carNum"]').html();
                this.roomLeftDOM.find('[data-role="carNum"]').html(parseInt(num) + 1);
                UIHelper.updateScroller(this.limoPanel, true);
            }
             */
//          if (data['userAttr'] && data['userAttr'][CONST.UserAttr.Member] > 0 && !force)
//              this.notice(stringFormat(i18nTranslate('Room_System_WelcomeVipMember'), xss(data['userName'])), 2);
            //else (data['userAttr'][CONST.UserAttr.Member] = 2)
            //    this.notice(stringFormat(i18nTranslate('Room_System_WelcomeSVipMember'), data['userName']));
        },
        'leave': function (data) {
            var userId = data['toUserId'];
            var item = this.users[userId];
            var className = STRING_EMPTY;
//          shan
//          if (item['roomAdmin']) {
//              item.element.addClass('off');
//              return;
//          }
//			shan
            this.userOrder.remove(item);
//          delete this.users[userId];
            item.element.remove();
			var nowOnline = parseInt(this.onlineTotal.html())-1;
			if(nowOnline<0){
				nowOnline = - nowOnline;
			}
            this.onlineTotal.html(nowOnline);

        },
        //聊天
        'chat': function (data, unsafe) {
            var ChatMode = CONST.ChatMode,
                message = data['message'],
                self = ' class="self"',
                isSelf = false,
                isHost = false,
                memberCSS = STRING_EMPTY,
                temp;
            if (temp = DATASOURCE['identity']) {
                isSelf = data['userId'] == temp['userId'],//自己说的话
                    isHost = temp['userId'] == DATASOURCE['room']['roomUserId'];//
                memberCSS = CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
            }
            memberCSS = CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
            var isHostSend = data['userId'] == DATASOURCE['room']['roomUserId'];
            var userId_y = data['userId'];
            this.users[userId_y] = data;
            if (!unsafe)
                message = MessageHelper.safe(message);
            message = MessageHelper.format(message, data['richLevel'], data['userAttr'], isHostSend);
           switch (data['messageType']) {
                case ChatMode.Whisper://私聊
                    var whisperId = ((isHostSend && isSelf) || (!isHostSend && isSelf))?  data['toUserId'] : data['userId'],
                        win = this.whisperDOM.find('[data-whisper="'+ whisperId+ '"]');
                    if(!win.length){
                        var promise = new Promise(function(){
                            Trigger.emit('Manage-Whisper', [whisperId,true]);
                        }).then(function(){
                                win = this.whisperDOM.find('[data-whisper="'+ whisperId+ '"]');
                                if(win.is(':hidden')){
		                        Whisper.more(win);
			                        //$('#whisper').find('em').removeClass('hidden');
			                    }else if(win.hasClass('folded')){
			                        win.find('em').removeClass('hidden');
			                    }
			                    var moreDiv = this.whisperDOM.find('.whisper_chat_list').find('[data-more="'+ whisperId +'"]'),
			                        chatDiv = win.find('.whisper_chat_area')[0],
			                        chatUl = win.find('[data-role="whisper_chatroom"]');
			                    if(moreDiv.length>0){
			                        if(!moreDiv.hasClass('whisper_user_news'))
			                            moreDiv.addClass('whisper_user_news');
			                    }
			                    var room = DATASOURCE['room'], headpic = UserHelper.portrait('');
			                    if(isHostSend){
			                        headpic = UserHelper.portrait(DATASOURCE['room']['roomHeadPic']);
			                    }else{
			                        if(this.users && this.users[whisperId])
			                            headpic = UserHelper.portrait(this.users[data['userId']]['userHeadPic']);
			                    }
			                    if(data['system']){
			                        if(chatUl.length==0){
			                            win = this.whisperDOM.find('[data-whisper]').eq(0);
			                            chatUl = win.find('[data-role="whisper_chatroom"]');
			                            chatDiv = win.find('.whisper_chat_area')[0];
			                        }
			                        chatUl.append(stringFormat(TEMPLATE['CHAT_SYSTEM'],message));
			                    }else{
			                        chatUl.append(stringFormat(TEMPLATE['WHISPER'],isSelf ? 'self' : 'host',headpic ,message));
			                    }
			                    var delta = chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.offsetHeight;
			                    if(delta > 0 )
		                        	Ps.update(chatDiv);
                            }.bind(this)).resolve();
                    }else{
                    	if(win.is(':hidden')){
                        Whisper.more(win);
	                        //$('#whisper').find('em').removeClass('hidden');
	                    }else if(win.hasClass('folded')){
	                        win.find('em').removeClass('hidden');
	                    }
	                    var moreDiv = this.whisperDOM.find('.whisper_chat_list').find('[data-more="'+ whisperId +'"]'),
	                        chatDiv = win.find('.whisper_chat_area')[0],
	                        chatUl = win.find('[data-role="whisper_chatroom"]');
	                    if(moreDiv.length>0){
	                        if(!moreDiv.hasClass('whisper_user_news'))
	                            moreDiv.addClass('whisper_user_news');
	                    }
	                    var room = DATASOURCE['room'], headpic = UserHelper.portrait('');
	                    if(isHostSend){
	                        headpic = UserHelper.portrait(DATASOURCE['room']['roomHeadPic']);
	                    }else{
	                        if(this.users && this.users[whisperId])
	                            headpic = UserHelper.portrait(this.users[data['userId']]['userHeadPic']);
	                    }
	                    if(data['system']){
	                        if(chatUl.length==0){
	                            win = this.whisperDOM.find('[data-whisper]').eq(0);
	                            chatUl = win.find('[data-role="whisper_chatroom"]');
	                            chatDiv = win.find('.whisper_chat_area')[0];
	                        }
	                        chatUl.append(stringFormat(TEMPLATE['CHAT_SYSTEM'],message));
	                    }else{
	                        chatUl.append(stringFormat(TEMPLATE['WHISPER'],isSelf ? 'self' : 'host',headpic ,message));
	                    }
	                    var delta = chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.offsetHeight;
	                    if(delta > 0 )
                        	Ps.update(chatDiv);
                    }
//              function fn(){
//              	console.log("333333----------")
//                  
//              }

                    break;
                case ChatMode.Speech:
                default:
                    if (data['system'])
                        this.chatroomDOM.append(stringFormat(TEMPLATE['CHAT_SYSTEM'], message));
                    else {
                        var adminTag = STRING_EMPTY,chat_pic = (chat_pic = this.users[data['userId']]) && (chat_pic = chat_pic['headPic']);
                        var levelTemplate = '<span class="userLevel"><span class="img"></span><span class="num">{0}</span></span>'
                        switch (data['adminType']) {
                            case CONST.AdminType.Host:
                                adminTag = 'host';
                                break;
                            case CONST.AdminType.Constable:
                                adminTag = 'constable';
                                break;
                        }
                        
                        this.chatroomDOM.append(stringFormat(TEMPLATE['CHAT'],
                            stringFormat(classTemplate, (isSelf ? 'self' : STRING_EMPTY) + ' ' + memberCSS + ' ' + adminTag),
                            data['userId'],
                            adminTag ? '<span class="type"></span>' : STRING_EMPTY,
                            !adminTag ? stringFormat(levelTemplate, data['fansLevel']) : STRING_EMPTY,
                            xss(data['userName']), 
                            STRING_EMPTY, 
                            UserHelper.badge(data), 
                            message,
                            UserHelper.portrait(chat_pic)
                        ));
                    }
                    if (this.screenLock)
                        UIHelper.refreshScroller(this.chatroomPanel);
                    else
                        UIHelper.updateScroller(this.chatroomPanel);
            }
            if (!this.screenLock){
                var delta = this.chatroomPanel.scrollTop = this.chatroomPanel.scrollHeight - this.chatroomPanel.offsetHeight;
                if (delta > 0)
                    Ps.update(this.chatroomPanel);
            }
        },
        'giving': function (data) {
            var giftId = data['giftId'],
                gift = DATASOURCE['gift'][giftId];
            //if(gift['gpt']==1){
            //    return ;
            //}else{
            Counting.update(data['giftNum'] * gift['cb'],gift['gpt']);
            //}
//          为了老字段做了兼容
            var url = gift['gr'].toLowerCase(),
                nickname = data['nk']||data['userName'],
                name = gift['n'],
                num = data['giftNum'],
                badge = UserHelper.badge(data),
                fansLevel = data['ufl']||data['fansLevel'];
            if (this.smallGift.indexOf('|' + giftId + '|') < 0) {
                var edge = url.length - 4;
                if (url.lastIndexOf('.swf') == edge){
                	$("#cinema").css("visibility","visible");
                	var isFlashStart = sessionStorage.getItem("isFlashStart");
                	if(gift.gpt==0 && isFlashStart =='true'){
                		if(gift.hsf && gift.hsf==1){//全屏礼物
		                    MagicFull.playMagic({
		                        'url': DOMAIN_CONFIG['IMAGE_DOMAIN'] + url,
		                        'id': name,
		                        'caption': nickname,
		                        'type':'full'
		                    });
		                }else{//Flash礼物
		                  	MagicFull.playMagicFlash({
		                        'url': DOMAIN_CONFIG['IMAGE_DOMAIN'] + url,
		                        'id': name,
		                        'caption': nickname,
		                        'type':'flash'
		                    });
		                }
                	}
                }else if (url.lastIndexOf('.gif') == edge){
                	this.giftQueue.enqueue({
                        'url': url,
                        'caption': nickname,
                        'num':num
                    });
                }
                    
            }
            var range = CONST.Batch,
                pic, temp;
            if (num >= CONST.Threshold) {
                for (var i = 0, length = range.length; i < length; i++) {
                    temp = range[i];
                    if (num >= temp)
                        break;
                }
                var hits = this.comboQuery(this.comboKeygen(data['userId'], data['giftId'], num));
                pic = (pic = this.users[data['userId']]) && (pic = pic['headPic']);
//              this.batchQueue.enqueue({
//                  'level': temp,
//                  'pic': pic || STRING_EMPTY,
//                  'nickname': nickname,
//                  'num': num,
//                  'gift': name,
//                  'hit': hits
//              });
            }
            var tempNum = num - 99;
            if (tempNum < 1)
                tempNum = 1;
            var delta = num - tempNum + 1;
            var children = this.dessertDOM.children().length;
            if ((delta = (children + delta) - 100) > 0);
            $('li:lt(' + delta + ')', this.dessertDOM).remove();
            var isSelfGift = '';//是不是自己送的禮物
            if(DATASOURCE['identity']['userId']==data['userId']){
            	isSelfGift = "self";
            }
//          for (var i = tempNum; i <= num; i++)
            this.recordQueue.enqueue({
                'member': CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0],
                'nickname': nickname,
                'badge': badge,
                'name': name,
                'num': num,
                'isSelfGift':isSelfGift,
                'fansLevel':fansLevel
            });
			var giveGiftId = data['giftId'];
        	var giftNum = data['giftNum']*DATASOURCE['gift'][giveGiftId].cb;
            var hash = this.hashRank;
            var userId = data['userId'];
            if(hash && hash.hasOwnProperty(userId)){
            	data['rankCost'] = hash[userId]['rankCost'] + giftNum;
            }else{
            	data['rankCost'] = giftNum;
            }          
            var order = this.orderRank['top1'];
            var position = order.locate(data);
            
            	
            if(hash.hasOwnProperty(userId)){
            	$.each(order.store, function(index,userOb) {
            	if(userOb.userId == userId){
	            		userOb['rankCost'] = data['rankCost'];
	            	}
	            });
            }
            if(position<3){
                if(hash.hasOwnProperty(userId)){
                    var item = hash[userId];
//                  order.value(item,true);
                    if(order.get(position)!= item)
                        order.sort(); 
                }else{
                    if(this.users[userId]){
                        data['headPic'] = this.users[userId]['headPic'];
                    }	
                    order.insert(data);
                    hash[userId] = data;
//                  var abandon = order.maintain(4);
                }
            }
            var oldTotalBalance = parseInt($('#total_balance').html());
            var newTotalBalance = oldTotalBalance + parseInt(data['giftNum']) * parseInt(DATASOURCE['gift'][giftId].cb);
            $('#total_balance').html(newTotalBalance);
           	_this = this;
           	console.log("_this.orderRank['top1'].store")
            console.log(_this.orderRank['top1'].store)
            	 $('#roster').html(_this.orderRank['top1'].store.map(
                	
                function(item,i){
          				console.log(item)
                	if(i>2){
                    	return;
                    }
                	var vipLevel = '';
                		console.log(1)
                		console.log(11)
                		if(item['userAttr']){
                			vipLevel=item['userAttr']['3'];
                		}else if(item['uatr']){
                			vipLevel=item['uatr']['3'];
                		}
           
                    var className = '';
                    if(vipLevel == 1){
                    	className='vip';
                    }else if(vipLevel == 2){
                    	className='svip';
                    }
//                  兼容旧的
					console.log(_this.orderRank['top1'].store)
					var htlm = stringFormat(TEMPLATE['UV'],stringFormat(classTemplate, className),UserHelper.portrait((item['headPic'] || item['headPic']=='0' || item['headPic']==0)?item['headPic']:item['pic']),(item['ufl'] || item['ufl']=='0' || item['ufl']==0)?item['ufl']:item['fansLevel'], xss(item['nk'] || item['userName']));
					console.log(htlm)
                    	return htlm;
                }
            ));
			$("#roster li").eq(0).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_one");
            $("#roster li").eq(1).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_two");
            $("#roster li").eq(2).find(".photo_par").removeClass("photo_one photo_two photo_three").addClass("photo_three");
                 
        },
        'flower': function (data) {
            data['messageType'] = CONST.ChatMode.Speech;
            data['message'] = stringFormat(limitImageTemplate, Environment.drawImage('systemRes/img/hall_img/rose_min.png'), 45);
            this.chat(data, true);
            this.hostGoodNumDOM.html(data['roomGoodNum']);
        },
        'diamond': function(data){
            var num = data.num;
            data['messageType'] = CONST.ChatMode.Speech;
            data['message'] = stringFormat(limitImageTemplate, Environment.drawImage('systemRes/imgNew/home_img/diamond54.png'), 45);
            $.extend(data,this.users[data['userId']]);
            while(num--){
                this.chat(data, true);
            }
        },
        'userCardFollow': function (followType) {
        	var followDOM = $('#hostFollow'),
            	unFollowDOM = $('#hostUnFollow');
            if(followType){
            	lock = true;
            	$.ajax({
	                url: '/service/room/v3/fav/add/'+DATASOURCE['room']['roomId'], //v3关注接口
	                type: "post",
	                dataType: 'json',
	                success:function(result){
	                    if (result['code'] == 0) {
	                        followDOM.addClass('hidden');
                			unFollowDOM.removeClass('hidden');
	                        DATASOURCE['room']['userIsFavorite']=true;
	                    }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }
	                    lock = false;
	                }.bind(this)
	            });
            }else{
            	lock = true;
                $.ajax({
                    url: '/service/room/v3/user/fav/push/state/'+DATASOURCE['room']['roomId'], //v3取消关注接口
                    type: "post",
                    dataType: 'json',
                    data:{favorite:1},
                    success:function(result){
                        if (result['code'] == 0) {
                            followDOM.removeClass('hidden');
                			unFollowDOM.addClass('hidden');
                            DATASOURCE['room']['userIsFavorite']=false;
                        }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }
                        lock = false;
                    }.bind(this)
                });
            }
            
        },
        'userCardReport': function (userId) {     	
        	if (!UserHelper.validate()){
            		return;
        	}
        	$("#container").i18nAppend(stringFormat(TEMPLATE.ACCUSATION));
    		
    		var showPopClose = $('.show_pop_close'),
        	showDescBtn = $('.show_desc_btn');
        	
    		showPopClose.on('click', function () {
        		$(".popup_par").remove();
        	}.bind(this));
        	var popSetT;
        	showDescBtn.on('click', function () {
            	var reportType = $("input[name='reportType']:checked").val();
            	var reportMeg = $("#reportMeg").val();
            	$.ajax({
                    url: '/service/report/v3/'+DATASOURCE['room']['roomId']+'/'+reportType, //v3举报接口
                    type: "post",
                    dataType: 'json',
                    data:{to:userId,msg:reportMeg,relation:'',countryName:''},
                    success:function(result){
                    	$(".popup_par").addClass("hidden");
                        if (result['code'] == 0) {
                            Trigger.emit(CONST.Event.PopupTip, [{
		                        'template': TEMPLATE.REOPRTSUCCESS,
		                        'isBind': true,
		                        'top': '100px'
		                    }]);
                        }else if(result['code'] == 99){
	                    	login_util.show_login_div();
	                    }else{
                        	Trigger.emit(CONST.Event.PopupTip, [{
		                        'template': TEMPLATE.REOPRTERROE,
		                        'isBind': true,
		                        'top': '100px'
		                    }]);
                        }
                    }.bind(this)
                });
        	}.bind(this));
        },
        'manage': function (action, manageID, state) {
            var user = this.users[manageID];
            if (!user)
                return;
            var data = {
                    'action': action,
                    'userId': manageID,
                    'userType': user['userType'],
                    'roomId': DATASOURCE['room']['roomId']
                },
                state;
            switch (action) {
                case 'admin':
                    state = state;
                    break;
                case 'mute':
                    state = 0;
                    break;
                case 'out':
                    break;
                default:
                    return;
            }
            if (state != null)
                data['state'] = state;
            Communicator.delegate(data);
        },
        'admin': function (data) {
            var userID = data['toUserId'],
                user = this.users[userID];
            if (!user)
                return;
            var state = user.roomAdmin = data['toRoomAdmin'];
            user.element[state ? 'addClass' : 'removeClass']('manager');
            if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == userID))
                DATASOURCE['identity']['roomAdmin'] = state;
        },
        'marquee': function (data) {
            var param = data['param'];
            var gifts = DATASOURCE['gift'][param.giftId];
			var giftImg = stringFormat('<img src="{0}"/>',V3_URL+"resource/"+gifts['gp']);
			$("#newsTips").i18nHTML(
            	stringFormat(TEMPLATE.NEWSTIPS,
            		stringFormat(i18nTranslate('Room_marquee'),
	            		param['nickName'],
	            		param['toNickName'],
	            		giftImg,
	            		param['number']
	            	)
            	)
            );
            var newsCon = $("#newsCon");
            var newsTipsLeft = $(".holder").offset().left;
            var winWidth = document.body.clientWidth;
            var isAraBic =$("#container").hasClass("arabic");
            if(isAraBic){
            	$("#newstips_marquee").attr('direction','right');
            	newsTipsLeft = winWidth - newsTipsLeft -$(".holder").width();
            }
            $("#newsTips").removeClass('hidden');
			var marqueeInter = setInterval(function(){
				var lastWidth = parseInt(newsCon.width());
				var newsConLeft = newsCon.offset().left;
				if(isAraBic){
					newsConLeft = winWidth - newsConLeft - lastWidth ;
				}
	   			if(newsConLeft < (newsTipsLeft - lastWidth)){
	   				clearInterval(marqueeInter);
	   				$("#newsTips").addClass('hidden');
//	   				$("#newsTips").html('');
	   			}
	   		},800);
        },
        'promote': function (data) {
            //console.log('update');
            var userId = data['userId'];
            var item = this.users[userId];
            this.userOrder.remove(item);
            item.element.remove();
            //item['userAttr'] = data['userAttr'];
            this.join(data, true);
        },
        'localize': function () {
            var language = I18N.language;
            if($('#listGoods').length>0){
                Ps.destroy($('#listGoods')[0]);
                Ps.initialize($('#listGoods')[0],{'useBothWheelAxes':true});
            }
            if (this.sign)
                this.sign.localize();
        },
        'kickOutPop': function (data) {
            if ($('.popupStop').size() >= 1) {
                return;
            }

            if (window['noReads'].length > 0) {
                data = window['noReads'].shift();
            } else {
                return;
            }

            var that = this;
            var TEMPLATE = {
                'POPUP': '<div class="popupStop {0}" >\
                            <div class="wrap">\
                                <h2 >{1}</h2>\
                                <div class="popContent">\
                                    <h6>{2}</h6>\
                                    <h3>{3} <a class="redColor" href="/user/showtime" target="_blank">{4}</a> {5}</h3>\
                                    <div class="reasonBox clearfix">\
                                        <div class="readStart reasonTitle"><span class="redColor">{6}:</span></div>\
                                        <div class="readStart reasonInfo">\
                                            <p>\
                                            {7}\
                                            </p>\
                                        </div>\
                                    </div>\
                                    <div class="moreBox clearfix {8}">\
                                        <div class="readStart moreTitle">{9}:</div>\
                                        <div class="readStart moreInfo">\
                                            <h4><a href="javascirpt:;" class="moreDown" ></a></h4>\
                                            <p class="popHide" >\
                                            {10}\
                                            </p>\
                                        </div>\
                                    </div>\
                                    <div class="btnBox">\
                                        <a href="javaScript:;" class="actived" id="confirmBtn" >{11}</a>\
                                        <a href="/user/showtime" target="_blank" id="checkBtn">{12}</a>\
                                    </div>\
                                </div>\
                                <span  class="btn_close"></span>\
                            </div>\
                            <div class="bg"></div>\
                           </div>',
                'POPUP2': '<div class="popupStop {0}" >\
                                <div class="wrap">\
                                    <h2 >{1}</h2>\
                                    <div class="popContent">\
                                        <h6>{2}</h6>\
                                        <div class="reasonBox2 clearfix">\
                                            <div class=" reasonInfo2">\
                                                <p>\
                                                {3}\
                                                </p>\
                                            </div>\
                                        </div>\
                                        <div class="moreBox clearfix {4}">\
                                            <div class="readStart moreTitle">{5}:</div>\
                                            <div class="readStart moreInfo">\
                                                <h4><a href="javascirpt:;" class="moreDown" ></a></h4>\
                                                <p class="popHide" id="moreInfo">\
                                                {6}\
                                                </p>\
                                            </div>\
                                        </div>\
                                        <div class="btnBox">\
                                            <a href="javaScript:;" class="actived" id="confirmBtn" >{7}</a>\
                                        </div>\
                                    </div>\
                                    <span  class="btn_close"></span>\
                                </div>\
                                <div class="bg"></div>\
                           </div>'
            }


            var bShowMore = '';
            if ($.trim(data.prompt).length <= 0) {
                bShowMore = "popHide";
            } else {
                bShowMore = "";
            }

            if (data.language == 3) {
                if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])) {
                    renderPop(0, bShowMore, data);
                }

            } else if (data.language == 1) {
                if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])) {
                    renderPop(1, bShowMore, data);
                }
            }

            function renderPop(way, bShowMore, data) {

                var oPopInfo = {
                    'popTitle': ['Notice of stop broadcasting', 'إخطار إيقاف البث'],
                    'reasonTitle': ['reason', 'السبب'],
                    'moreTitle': ['more', 'المزيد'],
                    'confirm': ['confirm', 'تأكيد'],
                    'check': ['check', 'فحص'],
                    'hoursPrefix': ['The broadcast has been stopped, will be deducted for', 'تم إيقاف البث وخصم منك عدد '],
                    'hoursSuffix': ['hours', ' ساعة']
                };
                if (data['deductionTime'] > 0) {
                    var fTemphours = parseInt(data['deductionTime'] / 60);
                    if (way == 0) {
                        $(stringFormat(TEMPLATE.POPUP, '', oPopInfo["popTitle"][0], Datetime2.fulltime(new Date()), oPopInfo["hoursPrefix"][0], fTemphours, oPopInfo["hoursSuffix"][0], oPopInfo["reasonTitle"][0], data['reason'], bShowMore, oPopInfo["moreTitle"][0], data['prompt'], oPopInfo["confirm"][0], oPopInfo["check"][0])).appendTo($(document.body));
                    } else if (way == 1) {
                        $(stringFormat(TEMPLATE.POPUP, ' arabic arabicFF ', oPopInfo["popTitle"][1], Datetime2.showtime(new Date()), oPopInfo["hoursPrefix"][1], fTemphours, oPopInfo["hoursSuffix"][1], oPopInfo["reasonTitle"][1], data['reason'], bShowMore, oPopInfo["moreTitle"][1], data['prompt'], oPopInfo["confirm"][1], oPopInfo["check"][1])).appendTo($(document.body));
                    }

                } else {
                    if (way == 0) {
                        $(stringFormat(TEMPLATE.POPUP2, '', oPopInfo["popTitle"][0], Datetime2.fulltime(new Date()), data['reason'], bShowMore, oPopInfo["moreTitle"][0], data['prompt'], oPopInfo["confirm"][0])).appendTo($(document.body));
                    } else if (way == 1) {
                        $(stringFormat(TEMPLATE.POPUP2, ' arabic arabicFF ', oPopInfo["popTitle"][1], Datetime2.showtime(new Date()), data['reason'], bShowMore, oPopInfo["moreTitle"][1], data['prompt'], oPopInfo["confirm"][1])).appendTo($(document.body));
                    }
                }

                //"×"关闭弹窗
                $('.btn_close').bind('click', function () {
                    var iInfoId = '/service/room/v3/host/checked/' + data['id'];
                    var _this = $(this);
                    $.ajax({
                        url: iInfoId,
                        type: 'POST',
                        success: function (response) {
                            if (response['code'] == 0) {
                                _this.parents('.popupStop').remove();
                                that.kickOutPop();
                            }
                        }
                    });
                })
                //确认按钮关闭
                $('.btnBox a.actived').bind('click', function () {
                    var iInfoId = '/service/room/v3/host/checked/' + data['id'];
                    var _this = $(this);
                    $.ajax({
                        url: iInfoId,
                        type: 'POST',
                        success: function (response) {
                            if (response['code'] == 0) {
                                _this.parents('.popupStop').remove();
                                that.kickOutPop();
                            }
                        }
                    });
                })
                //显示隐藏更多
                $('.moreDown').each(function () {
                    $(this).click(function () {
                        $(this).toggleClass('moreUp');
                        $(this).parents('.moreInfo').find('.popHide').toggle();
                    });
                });
            }
        },
        'notClosedPop': function () {
            var _this = this;
            if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])) {
                var sRoomIdUrl = '/service/room/v3/host/stoplive/' + DATASOURCE['room']['roomId'];
                $.get(sRoomIdUrl,
                    function (data) {
                        if (data['code'] == 0) {
                            if (data['dataInfo'].length > 0) {
                                window['noReads'] = window['noReads'] || [];
                                for (var i = 0; i < data['dataInfo'].length; i++) {
                                    window['noReads'].push(data['dataInfo'][i]);
                                }
                                _this.kickOutPop();
                            }
                        }
                    })
            }
        },
        //主播开播话题kaibo
        'initBroadcast': function () {
        	var room=window['Host_Topic'];
        	var rocjson;
			var topicjson;
			$(".topic_img img").attr("src",V3_URL+"resource/"+room.roomPosterPic);	
			if (room.topCategory==106) {  //106是游戏主播
				$(".topic_url").val(room.videoAddr);
				$(".topic_key").html(room.prefixion);           		
			} else if (room.topCategory==112) {  //体育
				$(".game_info").remove();
				$(".gerror").remove();
				$(".notice_wrap").css("height","316px");
				rocjson=112;
			} else if (room.topCategory==107) {  //娱乐
				$(".game_info").remove();
				$(".gerror").remove();
				$(".topic_img img").css({"width":"220px","height":"220px"});
				$(".notice_wrap").css("height","310px");
				$(".topic_shore").appendTo($(".topic_con"));
				$(".topic_shore").css("margin-top","102px");
				$(".topic_btns").appendTo($(".topic_con"));
				rocjson=107;
			}
			var gamereg=false;
			var topicreg=false;
			if(this.isClick){
				return;
			}
			$(".topic_btns").click(function(){
//				如果是游戏主播的验证
				if(room.topCategory==106){
					if($(".icons").css("color")!="rgb(0, 0, 0)"){
						$(".gerror").css("opacity","1");
						return;
					}
					gamereg=true;
					rocjson=$(".icons").attr("id");
				}else{
					gamereg=true;
				}
//				最终提交
				topicjson=$("#topicname").val();
				var screen = 0;
//				if(room.topCategory==112 || room.topCategory==106){
//					screen = 2;
//				}
				if(gamereg){
					$.ajax({
                        url:"/service/room/v3/"+ DATASOURCE['room']['roomId'] +"/send",
                        type : 'post',
                        dataType : "json",
                        data : {
 							data:JSON.stringify({
 								"cmd":3,
	 							"roc":rocjson,
	 							"state":true,
	 							"topic":topicjson,
	 							"screen":screen
 							})
                        },
                        success: function (data) {
                        	if(data.code==0){
                        		if(room.topCategory==112 || room.topCategory==106){
									Player.instance['HideOK']();
								}
								$("#notice_popup").hide();
                				$("#show_Ring").removeClass("hidden");
                				$("#show_Ring").bind("click",function(){
                					$("#notice_popup").show();
                				})
                				$('#videoStop').removeClass("hidden");
                				
                        	}else if(data['code'] == 99){
		                    	login_util.show_login_div();
		                    }
                        	
                        }
                    });
				}

			})

        },
        'Broadcast': function () {
        	var room=window['Host_Topic'];
        	if (room.topCategory==106){
        		$.ajax({
                    type: "GET",
                    url: system_info.base_attr.domain + "data/static/v4/?roomtag",
                    cache: false,
                    dataType: "json",
                    success: function (data) {
                        var gametag=[];
                        $.each(data.dataInfo.roomtag.d, function(index,value) {
//                      console.log(value)  //value.v一级标签名字
                        	if(value.id==106){
                        		gametag=value.sn;
                        	}
                        });
                        $(".taglist").empty();
                        $(".taglistPs").hide();
                         $.each(gametag, function(index,value) {
//                       	console.log(value)
                         		var gameName = value.lg.en;
                         		if($("#container").hasClass("arabic")){
                         			gameName = value.lg.ar;
                         		}
                        		$(".taglist").append($("<li class='tagitem' id='"+value.id+"'>"+gameName+"</li>"))
                        });
                        
//                      点击游戏名称
						$(".tagitem").click(function(evt){
							var target = $(evt.target);
							$(".tagitem").removeClass("selected");
							target.addClass("selected");
							$(".icons").removeAttr("data-i18n");
							$(".icons").html($(this).html());
							$(".icons").css("color","#000")
							$(".icons").attr("id",$(this).attr("id"));
							$(".taglistPs").hide();
							$(".gerror").css("opacity","0");
						})
//                      设置一个参数用于检测是否点击icon
                        var ulshow=false;
						$(".icons").click(function(){
							$(".taglistPs").show();
							ulshow=true;
						})
//						点击空白选择游戏hide
						 $(document).click(function(){
							if(!ulshow){
								$(".taglistPs").hide();
							}
							ulshow=false;
  						})
                    }
                });	
        	}
        	$("#notice_popup").show();      	
        },
//      开播话题结束
        'show_Broadcast_self': function () {
            window['Host_Topic']=DATASOURCE['room'];
            var host_topic=window['Host_Topic']['topic'];
            if (DATASOURCE['identity'] == undefined || DATASOURCE['identity']['userId'] !== DATASOURCE['room']['roomUserId']) {
                $("#show_Ring").addClass("hidden");
                $('#videoStop').addClass("hidden");
            } else {
                if (!host_topic) {
                    $("#show_Ring").addClass("hidden");
                    $('#videoStop').addClass("hidden");
                } else {
                    $("#show_Ring").removeClass("hidden");
                    $('#videoStop').removeClass("hidden");
                }

            }
        },
        'newsTips': function () {
//	    	$.ajax({
//	            url:"/service/room/v3/"+ DATASOURCE['room']['roomId'] +"/send",
//	            type : 'get',
//	            dataType : "json",
//	            success: function (data) {
//	            	if(data.code==0){
//	            		$("#newsTips").removeClass('hidden');
//						$("#newsTips>ul").i18nHTML(stringFormat('<li>{0}</li>','Nickname is too short, at least 2 digit'));
//			    		var marqueeInter = setInterval(function(){
//				   			var lastDom = $("#newsTips>ul").children("li:last-child");
//				   			var lastWidth = parseInt(lastDom.width());
//				   			var newsTipsLeft = $("#newsTips").offset().left;
//				   			if(lastDom.offset().left< (newsTipsLeft-lastWidth)){
//				   				clearInterval(marqueeInter)
//				   				$("#newsTips").css('display','none');
//				   				$("#newsTips").html('');
//				   			}
//				   		},500);
//	            	}
//	            }
//	        });
			
//			$("#newsTips").removeClass('hidden');
//			$("#newsTips>ul").i18nHTML(stringFormat('<li>{0}</li>','Nickname is too short, at least 2 digit'));
//  		var marqueeInter = setInterval(function(){
//	   			var lastDom = $("#newsTips>ul").children("li:last-child");
//	   			var lastWidth = parseInt(lastDom.width());
//	   			var newsTipsLeft = $("#newsTips").offset().left;
//	   			if(lastDom.offset().left< (newsTipsLeft-lastWidth)){
//	   				clearInterval(marqueeInter)
//	   				$("#newsTips").css('display','none');
//	   				$("#newsTips").html('');
//	   			}
//	   		},500);
        }
    };
    
    var VoiceScroller = {
        value: 70,//当前值
        maxValue: 100,//最大值
        step: 1,
        currentY: 0,
        Initialize: function () {               
            this.GetValue();
            $("#voice_btn").css("bottom", this.currentY + "px");
            this.Value();
        },
        Value: function () {
            var valite = false;
            var currentValue;
            var scrollerbarHeight= $("#voice_btn_bar").height();
            $("#voice_btn").css('background-size',"20px 5px");
            $("#voice_btn").mousedown(function () {
                valite = true;
                $("#voice_btn_bar").mousemove(function (event) {
                    if (valite == false) return;
                    var changeY = event.clientY ;
                    currentValue = $("#voice_btn_bar").offset().top + scrollerbarHeight - changeY ;
                    $("#voice_btn").css("bottom", currentValue + 3+ "px");
                    if (currentValue >= scrollerbarHeight ) {
                        $("#voice_btn").css("bottom", scrollerbarHeight + 3+ "px");
                        VoiceScroller.value = VoiceScroller.maxValue;
                    } else if (currentValue <= 0) {
                        $("#voice_btn").css("bottom", "3px");
                    } else {
                        VoiceScroller.value = Math.round(100 * (currentValue / scrollerbarHeight));
                    }
                    
                    if(VoiceScroller.value < 101 && VoiceScroller.value>85){
                    	$("#voice_btn").css('background-size',"25px 5px");
                    }else if(VoiceScroller.value <=85 && VoiceScroller.value>55){
                    	$("#voice_btn").css('background-size',"20px 5px");
                    }else if(VoiceScroller.value <=55 && VoiceScroller.value>35){
                    	$("#voice_btn").css('background-size',"17px 5px");
                    }else{
                    	$("#voice_btn").css('background-size',"14px 5px");
                    }
                   
                });
            });
            $("#voice_btn_bar").mouseup(function () {
                VoiceScroller.value = Math.round(100 * (currentValue / scrollerbarHeight ));
                valite = false;
                if (VoiceScroller.value >= VoiceScroller.maxValue) VoiceScroller.value = VoiceScroller.maxValue;
                if (VoiceScroller.value <= 0) VoiceScroller.value = 0;
                var ChangeSoundNum = parseInt(VoiceScroller.value)/100;
                Player.instance['ChangeSound'](ChangeSoundNum);                
            });
        },
        GetValue: function () {
            this.currentY = $("#voice_btn_bar").height() * (this.value / this.maxValue);
        }
    }
    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
    fbq('track', 'AddToCart');
    
});
