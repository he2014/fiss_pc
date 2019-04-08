define(function(require) {
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility = require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP = Utility['OOP'],
        Flash = Utility['Flash'],
        Promise = Utility['Promise'],
        StringHelper = Utility['String'],
        Storage = Utility['Storage'],
        dateTime = Utility['DateTime'],
        stringFormat = StringHelper['stringFormat'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Trigger = Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness'),
        ClickCollect = Kit.use('ClickCollect');
    var POPUP = require('component/popup');

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
            'SocketStop':'SocketStop',
            'StartOfQueue': 'StartOfQueue',
            'EndOfQueue': 'EndOfQueue',
            'SocketFlower': 'SocketFlower',
            'SocketAdmin': 'SocketAdmin',
            'PopupTip': 'PopupTip',
            'CloseTip': 'CloseTip',
            'PopupText': 'PopupText',
            'ActivityFetch': 'ActivityFetch',
            'StartVideo':'StartVideo'
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
            'User': 0,
            'Host': 1,
            'Constable': 2,
            'Manager': 3,
            'Bussiness': 4,
            'Guy': 77
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

        Batch: [777, 177, 77, 7],

        Threshold: 7,

        MemberTag: {
            0: STRING_EMPTY,
            1: 'vip',
            2: 'svip'
        }
    };

    var TEMPLATE = {
        'MAIN': '<div id="navigation" class="navigation">\
                    <ul>\
                        <li><a href="/" target="_blank" data-i18n="Header_Home" data-stat="Room_Header_Home">{{Header_Home}}</a></li>\
                        <li><a href="/top" target="_blank" data-stat="Room_TOP10">TOP10</a></li>\
                        <li><a href="/store.shtml" target="_blank" data-i18n="Header_Store" data-stat="Room_Header_Store">{{Header_Store}}</a></li>\
                        <li><a href="/download_app" target="_blank" data-i18n="Header_APPS" data-stat="Room_Header_APPS">{{Header_APPS}}</a></li>\
                        <li><a href="javascript:;" data-role="i18n" data-i18n="Header_Language" data-stat="Room_Header_Language">{{Header_Language}}</a></li>\
                    </ul>\
                </div>\
                <div id="marquee" class="marquee gift hidden"></div>\
                <div id="bar" class="bar"></div>\
                <div id="room" class="room">\
                    <div id="roomLeft" class="left"></div>\
                    <div id="roomMiddle" class="middle">\
                        <div id="holder" class="holder"></div>\
                    </div>\
                    <div id="roomRight" class="right"></div>\
                </div>\
                <div id="rightBar" class="right_bar">\
                    <p>\
                        <a href="/support/help" target="_blank" class="home_help"><b data-i18n="Side_FAQ">{{Side_FAQ}}</b></a>\
                        <a href="/support/feedback" target="_blank" class="home_fdbk"><b data-i18n="Side_Feedback">{{Side_Feedback}}</b></a>\
                    </p>\
                    <p id="trd_login_new" style="display:none;">\
                        <a href="javascript:;" onclick="window[\'login_util\'].facebook_login();" class="home_fbk"><b>Facebook</b></a>\
                        <a href="javascript:;" onclick="window[\'login_util\'].twitter_login();" class="home_tter"><b>Twitter</b></a>\
                        <span class="home_ggle g-signin" name="google_login" data-callback="google_login_back" data-clientid="488868798367-2fcduukk5f680cv50ml5utrr99fk7ev2.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-scope="https://www.googleapis.com/auth/plus.login"><b>Google+</b></span>\
                 </p>\
                </div>\
                <div id="cinema" class="magic"></div>',
        /*'NAVIGATION': '',*/
        'LEFT': '<div class="basic alpha01">\
                        <span class="portrait" >\
                            {0}\
                        </span>\
                        <span class="info">\
                            <span class="nameLevel"><em>{1}</em><img src="{2}" /></span>\
                            <div class="experience">\
                               <span></span>\
                            </div>\
                            <span id="hostGoodNum" class="flower">{4}</span>\
                            <span id="hostFollow" class="follow" data-stat="Room_follow">{5}</span>\
                        </span>\
                        <div class="share">\
                            <ul>\
                                <li id="share_to_twitter"><img data-stat="Room_share_to_twitter" src="/resource/systemRes/imgNew/hall_img/live_tt_03.png" alt="twitter"></li>\
                                <li id="share_to_facebook"><img data-stat="Room_share_to_facebook" src="/resource/systemRes/imgNew/hall_img/live_fb_03.png" alt="facebook"></li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div id="rankArea" class="top"></div>\
                    <div class="recommend_area alpha01">\
                        <ul id="saleList">\
                            <li>\
                                <div class="product_img">\
                                    <a href="/store.shtml" target="_blank" data-stat="Room_Applause"><img src="http://static.7nujoom.com/resource/show/image/v2/shop/shopinfo/1452076929670.png" alt=""></a>\
                                </div>\
                                <div class="product_info">\
                                    <h3 data-i18n="Room_Applause">{{Room_Applause}}</h3>\
                                    <p>59<img src="/resource/static/image/show/icon_coin.png"></p>\
                                    <a href="/store.shtml" target="_blank" data-i18n="Store_Buy" data-stat="Room_Applause">{{Store_Buy}}</a>\
                                </div>\
                            </li>\
                            <li>\
                                <div class="product_img">\
                                    <a href="/store.shtml" target="_blank" data-stat="Room_Lamborghini"><img src="http://static.7nujoom.com/resource/show/image/v2/shop/shopinfo/1452516182876.png" alt=""></a>\
                                </div>\
                                <div class="product_info">\
                                    <h3 data-i18n="Room_Lamborghini">{{Room_Lamborghini}}</h3>\
                                    <p>10000<img src="/resource/static/image/show/icon_coin.png">/<span>30days</span></p>\
                                    <a href="/store.shtml" target="_blank" data-i18n="Store_Buy" data-stat="Room_Lamborghini">{{Store_Buy}}</a>\
                                </div>\
                            </li>\
                        </ul>\
                        <p class="recommend_arrow">\
                            <a id="saleLeft" class="left_arrow" href="javascript:;" data-stat="Room_product_left_arrow"></a>\
                            <a id="saleRight" class="right_arrow" href="javascript:;" data-stat="Room_product_right_arrow"></a>\
                        </p>\
                        <p id="saleTab" class="recommend_dot">\
                            <span></span>\
                            <span></span>\
                        </p>\
                    </div>\
                    <div id="activityArea" class="giftActivity hidden">\
                        <span data-role="package"></span>\
                        <a class="gift_get" data-role="got"></a>\
                        <a href="/act/2016giftPack.shtml" target="_blank" class="gift_more"></a>\
                    </div>\
                    <div id="giftAD" class="gift_ad" style="display:none;">\
                        <div class="ad">\
                            <img src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'static/image/2016gift/start.png\">\
                            <a href="/act/2016giftPack.shtml" target="_blank" class="gift_go"></a>\
                            <a class="gift_close" onclick="document.getElementById(\'giftAD\').style.display=\'none\';"></a>\
                        </div>\
                        <div class="mask"></div>\
                    </div>\
                    <div class="car clearfix alpha01">\
                        <ul class="car_tab">\
                            <li class="select"><span data-i18n="Room_CarPark" data-stat="Room_CarPark">{{Room_CarPark}}</span>&nbsp;[<span data-role="carNum"></span>]</li>\
                            <li ><a target="_blank" href="/mycar.shtml" data-i18n="Room_MyCar" data-stat="Room_MyCar">{{Room_MyCar}}</a></li>\
                        </ul>\
                        <ul id="limo" class="car_list"></ul>\
                        <div class="car_more" style="display:none;" data-stat="Room_car_more"><img src="/resource/static/image/show/car_more.png" class="more"></div>\
                    </div>',
        'MIDDLE': '<div class="gift clearfix alpha01">\
                        <ul id="tabGoods" class="tab_gift clearfix">\
                            <li data-type="common"><a href="javascript:;" data-i18n="Room_CommonGift" data-stat="Room_CommonGift">{{Room_CommonGift}}</a></li>\
                            <li data-type="vip"><a href="javascript:;" data-i18n="Room_VipGift" data-stat="Room_VipGift">{{Room_VipGift}}</a></li>\
                            <li data-type="backpack"><a href="javascript:;" data-i18n="Room_MyBag" data-stat="Room_MyBag">{{Room_MyBag}}</a></li>\
                        </ul>\
                        <div id="listGoods" class="gift_box">\
                            <ul class="gift_list clearfix hidden" data-type="common"></ul>\
                            <ul class="gift_list clearfix hidden" data-type="vip"></ul>\
                            <ul class="gift_list clearfix hidden" data-type="backpack"></ul>\
                        </div>\
                        <div id="preview" class="gift_preview"></div>\
                        <div class="gift_send clearfix alpha01">\
                            <div class="quantity_area">\
                                <label data-i18n="Room_Quantity">{{Room_Quantity}}</label>\
                                <input id="count" type="text" class="quantity" value="1" />\
                                <span id="precount" class="btn_quantity" data-stat="Room_btn_quantity"></span>\
                                <ul id="quantity" class="quantity_hint hidden" data-collector="giftQuantity">\
                                    <li data-value="1" data-stat="Room_quantity1">1</li>\
                                    <li data-value="7" data-stat="Room_quantity7">7</li>\
                                    <li data-value="77" data-stat="Room_quantity77">77</li>\
                                    <li data-value="177" data-stat="Room_quantity177">177</li>\
                                    <li data-value="777" data-stat="Room_quantity777">777</li>\
                                </ul>\
                            </div>\
                            <button id="give" class="btn_send" data-i18n="Room_Send" data-stat="Room_gift_Send">{{Room_Send}}</button>\
                        </div>\
                    </div>',
        'RIGHT': '<h2 class="rank_title"><strong data-i18n="Room_Ranking">{{Room_Ranking}}</strong>(<span id="onlineTotal"></span>)\
                       <a id="rightSwitch" href="javascript:;" data-stat="Room_rank_rightSwitch"></a>\
                    </h2>\
                    <div id="uv" class="rank alpha01 hidden">\
                        <ul id="roster"></ul>\
                    </div>\
                    <div id="ugc" class="gift_chat_area clearfix alpha01">\
                        <div class="gift_show">\
                            <div class="gift_record">\
                                <ul id="dessert" class="common_record"></ul>\
                            </div>\
                            <div id="giftView" class="gift_view hidden"></div>\
                        </div>\
                        <div class="chat_wrap">\
                            <div class="chat_area">\
                                <ul id="chatroom"></ul>\
                            </div>\
                            <span id="lockScreen" class="chat_lock lock" data-stat="Room_chat_lock"></span>\
                        </div>\
                        <div class="send_area clearfix alpha02">\
                            <div class="chat_block">\
                                <span id="whisper" class="btn_chat" data-stat="Room_whisper"><em id="newWhisper" class="hidden"></em><img src="/resource/static/image/show/icon_chat.png" alt="chat"></span>\
                                <div id="paper" class="private_area hidden">\
                                    <ul data-role="secret"></ul>\
                                    <p id="whisperTip" class="whisper_remind hidden" data-stat="Room_whisperTip"></p>\
                                    <img data-role="close" class="btn_close" data-stat="Room_whisper_close" src="/resource/static/image/show/icon_close.png">\
                                    <img class="chat_arrow" src="/resource/static/image/show/chat_arrow.png">\
                                </div>\
                            </div>\
                            <div class="emoji_block" data-collector="emoji">\
                                <span id="emoji" class="btn_emoji" data-stat="Room_btn_emoji"><img src="/resource/static/image/show/icon_emoji.png" alt="chat"></span>\
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
                            <div id="input" class="private_mode1">\
                                <div class="private_box">\
                                    <span class="private_chat readStart">\
                                        <span class="at_symbol">@</span>\
                                        <span id="who" class="at_name"></span>\
                                    </span>\
                                    <input id="message" type="text" class="message readStart" />\
                                </div>\
                                <input id="say" type="button" class="send" data-i18n="Room_Send" data-stat="Room_message_Send" value="{{Room_Send}}" />\
                            </div>\
                        </div>\
                        <span id="flower" class="flower_area hidden">\
                            <span id="fans" class="flower_num" data-stat="Room_btn_flower"><span class="num" data-role="counter"></span></span>\
                            <span class="flower_text" data-role="timer" data-i18n="Room_GetFlowerTime">{{Room_GetFlowerTime}}</span>\
                            <span class="flower_circle"></span>\
                        </span>\
                    </div>\
                    <div id="manage" class="admin_info hidden" data-collector="manage"></div>',

        'GIFT': '<li data-giftid="{0}" {4}>\
                    <div>\
                        <strong class="{1}" data-stat="Room_gift_{1}"></strong>\
                        <span class="price">{2}</span>\
                        {3}\
                        <span class="icon_select"></span>\
                    </div>\
                </li>',

        'BACKPACK': '<li data-giftid="{0}" data-count="{2}" data-role="special">\
                    <div>\
                        <strong class="{1}" data-stat="Room_Mybag_{1}"></strong>\
                        <span class="times">×</span>\
                        <span class="bag_num">{2}</span>\
                        <span class="icon_select"></span>\
                    </div>\
                </li>',

        'DESSERT': '<li{0}>\
                        <span class="name">{1}</span>\
                        <span class="member"></span>\
                        <span class="badge">{2}</span>\
                        <p class="record_right">\
                            <strong class="{3}"></strong><span>×</span><span>{4}</span>\
                        </p>\
                    </li>',

        'CHAT': '<li{0} data-identity="{1}">\
                    <p class="chat_user">\
                        {2}\
                        <span class="name">{3}</span>\
                        <span class="member"></span>\
                        <span class="level">{4}</span>\
                        <span class="badge">{5}</span>\
                    </p>\
                    <p>{6}</p>\
                </li>',

        'CHAT_SYSTEM': '<li class="system">\
                            <p>{0}</p>\
                        </li>',

        'WHISPER1': '<li{0}>\
                        <p class="name host">{1}</p>\
                        <p class="at_message">\
                            <span class="at_symbol">@</span>\
                            <span class="at_name">{2}</span>\
                            <span class="private_message">{3}</span>\
                        </p>\
                    </li>',

        'WHISPER2': '<li{0}{1}>\
                        <p class="name">{2}</p>\
                        <p class="private_message">{3}</p>\
                    </li>',

        'UV': '<li{0} data-identity="{1}">\
                <span class="type">{2}</span>\
                <span class="photo">{3}</span>\
                <span class="name">{4}</span>\
                <span class="member"></span>\
                <span class="level">{5}</span>\
                <span class="badge">{6}</span>\
            </li>',

        'BADGE': '<span><img src="/resource/static/image/show/badge.png" alt="badge"></span>',

        'PREVIEW': '<img src="{0}" />\
                    <div class="gift_preview_info">\
                        <h2 class="name">{1}</h2>\
                        <p class="price">{2}</p>\
                    </div>',

        'RANK': '<ul id="rankTab" class="top_tab alpha01">\
                        <li data-role="top1" data-i18n="Room_RichTop" data-stat="Room_RichTop">{{Room_RichTop}}</li>\
                        <li data-role="top7" data-i18n="Room_RichTop7Days" data-stat="Room_RichTop7Days">{{Room_RichTop7Days}}</li>\
                    </ul>\
                    <div class="rank_box">\
                        <div id="rankList" class="top_box alpha01">\
                            <div class="hidden" data-role="top1">\
                                <ul data-role="rank3" class="top_list clearfix"></ul>\
                                <div data-role="more" class="top_bottom_block hidden">\
                                    <ul data-role="rank7" class="top_bottom"></ul>\
                                </div>\
                            </div>\
                            <div class="hidden" data-role="top7">\
                                <ul data-role="rank3" class="top_list clearfix"></ul>\
                                <div data-role="more" class="top_bottom_block hidden">\
                                    <ul data-role="rank7" class="top_bottom"></ul>\
                                </div>\
                            </div>\
                        </div>\
                        <div id="rankMore" class="top_slider" data-stat="Room_rankMore"></div>\
                    </div>',

        'LIMO': '<li data-identity="{3}">\
                    <img src="{0}" alt="{1}">\
                    <span>{2}</span>\
                </li>',

        /* 'RANK_LIST': '<ul data-role="rank3" class="top_list clearfix">{0}</ul>\
                         <div data-role="more" class="top_bottom_block alpha01 hidden">\
                             <ul data-role="rank7" class="top_bottom">{1}</ul>\
                     </div>',*/

        'RANK_3': '<li>\
                        <span class="top_photo">\
                                {0}{5}\
                                <img class="crown" src="/resource/static/image/show/icon_crown.png" alt="crown">\
                            </span>\
                            <span class="top_img">\
                                {1}\
                                {2}\
                            </span>\
                            <span class="top_name">{3}</span>\
                            <span class="top_rich">{4}</span>\
                        </li>',

        'RANK_7': '<li>\
                        <span class="top_rank">{0}</span>\
                        <span class="top_photo">{1}{6}</span>\
                        <span class="top_name">{2}</span>\
                        <span class="top_img">{3}{4}</span>\
                        <span class="top_rich">{5}</span>\
                    </li>',

        'BATCH': '<span class="photo">{0}</span>\
                    <span class="name">{1}</span>\
                    <span class="num">{2}</span>\
                    <strong class="gift {3}"></strong>\
                    <span class="times"{4}>\
                        <span class="times_symbol">×</span>\
                        <span class="times_num">{5}</span>\
                    </span>',

        'HEADER': '<h1><img src="{0}static/image/show/logo.png"></h1>\
                    <div class="user_info hidden" data-role="user"></div>\
                    <p class="user_sign hidden" data-role="anonymous">\
                        <span data-role="signin" data-i18n="Header_SIGNIN" data-stat="Room_Header_SIGNIN">{{Header_SIGNIN}}</span>\
                        <span data-role="signup" data-i18n="Header_SIGNUP" data-stat="Room_Header_SIGNUP">{{Header_SIGNUP}}</span>\
                    </p>\
                    <p id="task_button" class="btn_task" data-collector="task" data-stat="Room_task_button">\
                        <em class="hidden"></em>\
                        <span id="task_num"><i class="task_over">-</i>/<i class="task_all">-</i></span>\
                    </p>\
                    <p id="sign" class="daily_finish" data-stat="Room_btn_sign"></p>\
                    <div class="task_list hidden" id="task_detail_info" data-collector="task">\
                        <div class="task_list_con">\
                            <div class="task_user_info" id="task_user_detail_info">\
                                <dl>\
                                    <dt>\
                                        <img id="task_user_head" src="{0}systemRes/img/default/nophoto.jpg" alt="">\
                                    </dt>\
                                    <dd>\
                                        <b id="task_nick_name"></b><a href="/act/level" target="_blank" data-stat="Room_task_levelLink"><img id="task_user_level_img" src="{0}systemRes/img/default/level1_01.png" alt="" /></a><span><i id="task_user_level_persent" style="width: 0%;"><font size="0">0.00%</font></i></span>\
                                    </dd>\
                                    <p>\
                                        <b data-i18n="Task_Level">{{Task_Level}}</b><b>&nbsp;:&nbsp;</b><b id="task_user_level"></b> <br>\
                                        <em data-i18n="Task_ToNextLevel">{{Task_ToNextLevel}}</em><em>&nbsp;:&nbsp;</em><em id="task_user_next_level"></em><img src="{0}systemRes/imgNew/toplist/exp_icon.png" alt="">\
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
                            <div class="task_user_info" data-role="task_user_info">\
                            </div>\
                            <span class="task_host_hr" data-i18n="Task_MyTask">{{Task_MyTask}}</span>\
                            <div class="host_task_con" style="height:410px;">\
                                <div data-role="host_flower" class="host_flower">\
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
                                    <div data-role="host_popular" class="host_popular">\
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

        'HEADER_USER': '<div class="user_photo"><strong>{0}</strong>{3}{4}</div>\
                    <div class="user_blance">\
                        <span class="blance_img"><img src="{1}static/image/show/blance.png"></span>\
                        <span class="blance_txt" data-i18n="Room_Balance">{{Room_Balance}}</span>\
                        <span id="myBalance" class="blance_num">{2}</span>\
                        <a href="/user/account/pay" target="_blank" class="btn_recharge" data-i18n="Room_Recharge" data-stat="room_btn_recharge">{{Room_Recharge}}</a>\
                    </div>',

        'HEADER_USER_DETAIL': '<div class="user_detail" data-role="user_detail">\
                                    <div class="detail_top clearfix">\
                                        <div class="detail_top_left readStart">\
                                            <a href="/user/profile" target="_blank" data-stat="Room_user_levelLink">{0}{2}</a>\
                                        </div>\
                                        <div class="detail_top_right readEnd alignEnd">\
                                            <p class="detail_top_id">ID:<span>{3}</span></p>\
                                            <p class="detail_top_info clearfix">\
                                                <span class="detail_top_level readStart alignStart"><a href="/act/level" target="_blank"><img name="level_img"></a></span>\
                                                <span class="detail_top_name readStart">{1}</span>\
                                                <a class="detail_top_edit readStart" href="/user/profile" target="_blank" data-stat="Room_user_levelLink"></a>\
                                            </p>\
                                            <p class="detail_top_badge readStart" data-role="user_detail_badge">\
                                                {4}\
                                            </p>\
                                        </div>\
                                    </div>\
                                    <div class="detail_main">\
                                        <p class="detail_recharge clearfix">\
                                        <span class="detail_blance readStart">{5}</span>\
                                            <a class="btn_detail_recharge readEnd" href="/user/account/pay" target="_blank" data-i18n="Room_Recharge" data-stat="Room_user_BtnRecharge">{{Room_Recharge}}</a>\
                                        </p>\
                                        <p class="detail_exp clearfix"><span><i class="readStart" name="level_persent"></i></span></p>\
                                        <a name="show_living" style="{6}" class="btn_live clearfix" href="{7}" data-stat="Room_BtnLive"></a>\
                                        <p class="btn_group clearfix">\
                                            <a class="btn_myfollowed readStart" href="/user/followed" target="_blank" data-i18n="Index_MyFollowed" data-stat="Room_user_MyFollowed">{{Index_MyFollowed}}</a>\
                                            <span class="btn_exit readEnd" name="login_out_buttom" data-i18n="Header_LogOut" data-stat="Room_user_LogOut">{{Header_LogOut}}</span>\
                                        </p>\
                                    </div>\
                                </div>',

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

        'MENU': '<a href="javascript:;" class="admin_link_second{0}" data-action="whisper" data-i18n="Room_Whisper" data-stat="Room_Whisper">{{Room_Whisper}}</a>\
                    <a href="javascript:;" class="admin_link_second{1}" data-action="admin" data-state="0" data-i18n="Room_Admin" data-stat="Room_Admin">{{Room_Admin}}</a>\
                    <a href="javascript:;" class="admin_link_second{2}" data-action="admin" data-state="1" data-i18n="Room_Cancel" data-stat="Room_Cancel">{{Room_Cancel}}</a>\
                    <a href="javascript:;" class="admin_link_second{3}" data-action="mute" data-state="0" data-i18n="Room_Mute" data-stat="Room_Mute">{{Room_Mute}}</a>\
                    <a href="javascript:;" class="admin_link_second{4}" data-action="out"data-i18n="Room_Remove" data-stat="Room_Remove">{{Room_Remove}}</a>\
                    <a href="javascript:;" class="admin_link_second hidden" data-action="ban" data-i18n="Room_BanIP" data-stat="Room_BanIP">{{Room_BanIP}}</a>',

        'BUYVIP': '<div class="popup room" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            {{Room_BecomeVIPtoSendFace}}\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                </div>',

        'BUYVIPGIFT': '<div class="popup room" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            {{Room_BecomeVIPtoSendGift}}\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                </div>',

        'BUYSVIPGIFT': '<div class="popup room" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            {{Room_BecomeSVIPtoSendGift}}\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="/vip.shtml" target="_blank" class="recharge" data-stat="Room_Popup_BtnBuyVip">{{Store_Buy}}</a>\
                            <a data-role="close" class="cancel" data-stat="Room_Popup_BuyVipCancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                </div>',

        'OFFLINE': '<div id="offline" class="offline" style="position:absolute;left:0;top:0;width:480px;height:360px;background:url(/resource/static/image/show/absent_yb.jpg) no-repeat;">\
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
                    <div class="offline_video" style="display:none;position:absolute;width:480px;height:360px;left:0;top:0;background:url(/resource/static/image/show/absent_yb.jpg) no-repeat;">\
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
        'MARQUEE': '<div class="box">\
                    <span>مبروك للمستخدم</span>\
                    <span class="user_name">{0}</span>\
                    <span>لقيامه بفتح عضوية كبار الأعضاء ، وحصوله على لامبورجيني مجاناً لمدة</span>\
                    <span class="day_num">{1}</span>\
                    <span>يوماُ</span>\
                </div>',
        'POP': '<div class="gift_pop">\
                    {0}\
                    <div class="mask"></div>\
                </div>',
        'POP_FAIL': '<div class="gift_fail wrap" style="top:80px;">\
                            {0}\
                            {1}\
                        </div>',


        'POP_SUCCESS': '<div class="gift_success wrap" style="top:80px;">\
            <div data-role="caption">\
                <p class="info">مبروك حصلت على <em>{0}</em></em></p>\
                </div>\
                <div class="prize">\
                <ul>\
                {1}\
                </ul>\
                </div>\
                <div class="into_pack">\
                    <p>جميع الكنوز التي حصلت عليها تجدها في صندوق الهدايا داخل غرف المضيفين ، أما إذا حصلت على إحدى المركبات ستجدها داخل موقف السيارات بالملف الشخصي الخاص بك ! </p>\
                    <p>لمزيد من الهدايا! إلتقط الآن صورة لهديتك. شارك و أعمل لنا Tag على حسابك في الانستغرام</p>\
                </div>\
                <div data-role="button">\
                    <a href="javascript:;" data-role="close" class="gift_suc_close" data-stat="Room_PopGiftSuccess_BtnClose"></a>\
                    <a href="javascript:;" data-role="close" class="gift_suc_ok" data-stat="Room_PopGiftSuccess_BtnOk"></a>\
                </div>\
                <p class="gift_more">استلم المزيد من الكنوز !</p>\
                </div>',
        'REWARD_LI': '<li><img src="{0}"><span>x {1}</span></li>'
    };

    var imageTemplate = '<img src="{0}" />',
        limitImageTemplate = '<img src="{0}" height="{1}" />',
        classTempate = ' class="{0}"';

    var Tip = {
        register: function() {
            Trigger.register(CONST.Event.PopupTip, Tip.show.bind(this));
            Trigger.register(CONST.Event.CloseTip, Tip.close.bind(this));
            Trigger.register(CONST.Event.PopupText, Tip.text.bind(this));
        },
        init: function(option) {
            require.async('component/popup.js', function(pop) {
                this.tip = pop;
                this.tip.show(option);
            }.bind(this));
        },
        show: function(option) {
            if (!this.tip) {
                this.init(option);
                return;
            }
            this.tip.show(option);
        },
        text: function(container, html) {
            var tips = $(html).show().appendTo(container);
            setTimeout(function() {
                tips.remove()
            }, 1000);
        },
        close: function() {
            this.tip && this.tip.close();
        }
    };


    var Queue = $.extend(OOP.create('Queue',
        function(option) {
            this.load(option);
            this.render();
            this.compose();
            this.bind();
            this.start();
        }, {
            'load': function(option) {
                $.extend(this, option);
                this.status = Queue.STATUS.Static;
                this.thread = option.thread;
                this.handler = option.handler;
                this.dequeue = this.dequeue.bind(this);
                this.store = [];
                this.startEvent = CONST.Event.StartOfQueue + '-' + this.thread;
                this.endEvent = CONST.Event.EndOfQueue + '-' + this.thread
            },

            'render': function() {},

            'compose': function() {},

            'bind': function() {},

            'start': function() {},

            'enqueue': function(item) {
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

    var Order = OOP.create('Order',
        function(option) {
            this.load(option);
            this.render();
            this.compose();
            this.bind();
            this.start();
        }, {
            'load': function(option) {
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

            'start': function() {
                this.sort();
            },

            'sort': function() {
                if (this.store.length > 0)
                    this.store.sort(this.compareHandler);
            },

            'check': function(item) {
                return item['baseValue'] && item['estimate'];
            },

            'value': function(item, force) {
                if (!this.checkHandler(item) || force) {
                    item['baseValue'] = this.valueHandler(item);
                    item['estimate'] = true;
                }
                return item['baseValue'];
            },

            'selfWorth': function(item) {
                return item;
            },

            'compare': function(a, b) {
                return this.value(b) - this.value(a);
            },

            'get': function(index) {
                return this.store[index];
            },

            'valueof': function(index) {
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

            'insert': function(item) {
                var position = this.locate(item),
                    length;
                if (position < 0)
                    position = 0;
                else if (position > (length = this.store.length))
                    position = length;
                this.store.splice(position, 0, item);
                return position;
            },

            'remove': function(item) {
                var position = this.locate(item),
                    length;
                if (position < 0)
                    position = 0;
                else if (position > (length = this.store.length))
                    position = length;
                this.store.splice(position, 1);
                return position;
            },

            'maintain': function(count) {
                return this.store.splice(count);
            }
        });

    var Player = {
        'init': function(dom) {
            this.load(dom);
            //this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load': function(dom) {
            this.container = $('#video');
            this.wrap = $('#player');
            this.instance = this.wrap[0];
            this.absent = $('#absent');
            this.absentTemplate = '<div id="absent" class="absent" style="width:480px;height:360px;position:relative;background:url(' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'static/image/show/absent_bg.jpg) no-repeat;"></div>';
            this.offline = $('#offline');
        },

        'render': function(showing) {
            var room = DATASOURCE['room'];
            if (showing) {
                this.instance = Flash.render({
                    'container': this.container,
                    'src': '/room/swf/show.swf' + (typeof PLAYER_VERSION == 'undefined' ? STRING_EMPTY : '?' + PLAYER_VERSION),
                    'id': 'player',
                    'falshvars': {
                        'url': room['videoAddr'],
                        'streamId': room['prefixion'],
                        'isHost': DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId']),
                        'roomId': room['roomId'],
                        'userId': DATASOURCE['identity']?DATASOURCE['identity']['userId']:'0',
                        'language': 'en',
                        'fs':room['screen']
                    },
                    'width': 480,
                    'height': 360,
                    'callback': function() {
                        (new Promise).wait(0).then(function() {
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

        'compose': function() {
            Bussiness.getData('live_video.json',function(data){
                DATASOURCE['offline_video']= data;
                if(DATASOURCE['identity'] == undefined || DATASOURCE['identity']['userId'] !== DATASOURCE['room']['roomUserId']) {
                    this.Watch();
                }
            }.bind(this));
        },

        'bind': function() {},

        'start': function() {
            //setTimeout(this.render.bind(this,true),100);
        },

        'socketReady': function() {
            if (this.instance)
                this.instance['SocketReady']();
            else
                this.ready = true;
        },
        //'StartVideo': function() {
        //    if (this.instance)
        //        this.instance['StartVideo']();
        //    else
        //        this.ready = true;
        //},

        'Watch': function() {
            var room = DATASOURCE['room'],off_Videos;
            //if(room['videoAddr'] == STRING_EMPTY)
            if (room['actorIng'] == 0) {
                if(off_Videos = DATASOURCE['offline_video'][room['roomId']]) { // offline
                    if (!this.offline || this.offline.length == 0) {
                        this.container.i18nAppend(TEMPLATE.OFFLINE).find('[data-role="offline_video_list"]').i18nHTML(off_Videos.map(function (item) {
                            return stringFormat(TEMPLATE.OFFLINE_ITEM, Environment.drawImage(item.video_pic), item.video_desc, item.video_url,room['roomId']);
                        }).join(''));
                        this.container.find('.video_mask').click(function(evt){
                            this.show_Off_Video($(evt.target).data('url'));
                            $('.iframe_close').show();
                        }.bind(this));
                        $('.video_mask').eq(0).click();
                    } else {
                        this.offline.show();
                        this.wrap.safeHide();
                        this.absent && this.absent.safeHide();
                    }
                }else{
                    if (!this.absent || this.absent.length == 0)
                        this.render(false);
                    else {
                        this.absent.safeShow();
                        this.wrap.safeHide();
                    }
                }
            } else {
                if (!this.instance)
                    this.render(true);
                else {
                    $('#movie_iframe').html('');
                    $('.offline').hide();
                    $('.offline_video').hide();
                    this.wrap.safeShow();
                    this.absent.safeHide();
                }
            }
        },
        show_Off_Video:function(url){
            console.log(url);
            this.container.find('.offline_video').show().find('#movie_iframe').html('<iframe src="'+url+'" width="100%" height="100%" wmode="Opaque"></iframe>');
            this.container.find('.iframe_close').unbind('click').click(function(){
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
                'topic':31
            },
            'messageType': {
                'chat': 0
            }
        },

        'init': function(container) {
            this.load(container);
            this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load': function(container) {
            window['SocketReady'] = this.ready.bind(this);
            window['StartVideo'] = this.Starts.bind(this);
            window['SocketResponse'] = this.dispatch.bind(this);
            this.container = container;
        },

        'render': function() {
            var room = DATASOURCE['room'];
            this.instance = Flash.render({
                'container': this.container,
                'src': '/room/swf/communicator.swf',
                'id': 'communicator',
                'falshvars': {
                    'url': room['chatAddr'],
                    'port': room['port'],
                    'connectionString': JSON.stringify({
                        commandId: 1,
                        loginKey: Cookie.get(Cookie.key['login_key']) || 0,
                        roomId: room['roomId'],
                        type: 1
                    })
                }
            });
        },

        'compose': function() {},

        'bind': function() {},

        'start': function() {

        },

        'ready': function() {
            Player.socketReady();
            Trigger.emit(CONST.Event.SocketReady);
        },

        'Starts': function() {
            Trigger.emit(CONST.Event.StartVideo);
        },

        'dispatch': function(data) {
            data = JSON.parse(data);
            console.log(data);
            var socketType = this.protocol['socketType'],room = DATASOURCE['room'];
            switch (data['commandId']) {
                case socketType['video']:
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
                case socketType['join']:
                    Trigger.emit(CONST.Event['SocketJoin'], [data]);
                    break;
                case socketType['out']:
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
                case socketType['task']:
                    Trigger.emit(CONST.Event['SocketTask'], [data]);
                    break;
                case socketType['admin']:
                    Trigger.emit(CONST.Event['SocketAdmin'], [data]);
                    break;
                case socketType['marquee']:
                    Trigger.emit(CONST.Event['SocketMarquee'], [data]);
                    break;
                case socketType['update']:
                    Trigger.emit(CONST.Event['SocketPromote'], [data]);
                    break;

            }
        },

        'delegate': function(data, cache, success, error) {
            var action = data['action'],
                info = $.extend({
                    'commandId': this.protocol['socketType'][action],
                    'userId': 0,
                    'userType': 0,
                    'roomId': DATASOURCE['room']['roomId']
                }, data);
            Bussiness.postData('room_sendRoomMessage.fly', {
                    'data': JSON.stringify(info)
                },
                success && success.bind(this, cache),
                error && error.bind(this, cache));
        }
    };

    var Magic = {
        'init': function(container) {
            this.load(container);
            this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load': function(container) {
            this.container = container;
            this.showOption = {
                'width': '1200px',
                'height': '400px'
            };
            this.hideOption = {
                'width': 0,
                'height': 0
            };
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            window['MagicEnd'] = this.magicEnd.bind(this);
            window['DriveEnd'] = this.driveEnd.bind(this);
            this.thread = 'Magic'
        },

        'render': function() {
            this.instance = Flash.render({
                'container': this.container,
                'src': '/room/swf/magic.swf',
                'id': 'magic',
                'width': 1200,
                'height': 400,
                'callback': function() {
                    new Promise().wait(0).then(function() {
                        this.wrap = $(this.instance);
                        this.hide();
                    }.bind(this)).resolve(); //此处验证了初始resolve的方式有问题，需改进，resolve-> setTimeout
                }.bind(this)
            });
        },

        'compose': function() {
            this.magicQueue = new Queue({
                'handler': this.conjure.bind(this),
                'thread': this.thread
            });
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
            this.wrap.css(this.showOption);
        },

        'hide': function() {
            this.wrap.css(this.hideOption);
        },

        'conjure': function(item, promise) {
            //this.show();
            this.magicPromise = promise;
            this.instance.StartMagic(item['url'], item['id'], item['caption']);
        },

        'drive': function(item, promise) {
            //this.show();
            this.drivePromise = promise;
            this.instance.StartDrive(item['url'], item['id'], item['caption']);
        },

        'magicEnd': function() {
            //this.hide();
            this.magicPromise.resolve();
        },

        'driveEnd': function() {
            //this.hide();
            this.drivePromise.resolve();
        },

        'playMagic': function(data) {
            this.magicQueue.enqueue(data);
        },

        'driveCar': function(data) {
            this.driveQueue.enqueue(data);
        },

        'structure': function() {
            if (this.magicQueue.status == Queue.STATUS.Static && this.driveQueue.status == Queue.STATUS.Static)
                this.show();
        },

        'dispose': function() {
            if (this.magicQueue.status == Queue.STATUS.Static && this.driveQueue.status == Queue.STATUS.Static)
                this.hide();
        }
    };

    var Environment = (function() {
        return {
            'drawImage': function(src) {
                return DOMAIN_CONFIG['IMAGE_DOMAIN'] + src;
            }
        };
    })();

    var MessageHelper = window['MH'] = {
        'format': function(content,richLevel,userAttr,isHost) {
            return content.replace(/\[(?:[^\]]+?)\]/gi, function(a, b) {
                var emoji = DATASOURCE['emoji'][a];
                //优化快照
                if (emoji) {
                    var group = DATASOURCE['face'][emoji[0]],cell = group['vals'][emoji[1]],src = cell['pic'],height;
                    if(!isHost)
                    {
                        if((group['tag'] == 1) && (cell['val'] > richLevel))
                            return a;
                        else if((group['tag'] == 2) && (cell['val'] > (userAttr && userAttr[CONST.UserAttr.Member]|| 0)))
                            return a;
                    }
                    if (src.toLowerCase().lastIndexOf('.gif') == src.length - 4)
                        height = 60;
                    else
                        height = 30;
                    return '<img src="' + Environment.drawImage(src) + '" height="' + height + '" />';
                } else
                    return a;
            });
        },

        'safe': function(content) {
            content = content.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
            content = content.replace(/(?:http[s]?\:\/\/)?(?:\w+)(?:\.\w+)*\.com[\w|=|\?|\.|\/|\&|-]*/gi,function(a){
                if(a.indexOf('http') !== 0)
                    a = 'http://' + a;
                return  stringFormat('<a href="{0}" target="_blank">{0}</a>',a);
            });
            return content;
        }
    };

    var UIHelper = {
        'attribute': {
            'horizontal': ['scrollLeft', 'scrollWidth', 'offsetWidth'],
            'vertical': ['scrollTop', 'scrollHeight', 'offsetHeight']
        },

        'initScroller': function(element) {
            Ps.initialize(element);
        },

        'updateScroller': function(element, direction) {
            var attrbute = this.attribute[direction ? 'horizontal' : 'vertical'];
            var delta = element[attrbute[0]] = element[attrbute[1]] - element[attrbute[2]];
            if (delta > 0)
                Ps.update(element);
        },

        'refreshScroller': function(element) {
            Ps.update(element);
        }
    };

    var UserHelper = (function() {
        var defaultHead = 'systemRes/img/default/nophoto.jpg',
            fullDefaultHead = Environment.drawImage(defaultHead);
        fullDefaultHead = fullDefaultHead.replace('/', '\/');
        fullDefaultHead = 'onerror="this.src=\'' + fullDefaultHead + '\';"';
        var badgeTemplate = '<img src="{0}" title="{1}" />';

        return {
            'validate': function() {
                var identified = DATASOURCE['identity'];
                if (!identified)
                    login_util.show_login_div();
                return identified;
            },

            'portrait': function(src) {
                return stringFormat('<img src="{0}" {1} />',
                    Environment.drawImage(src || defaultHead),
                    fullDefaultHead);
            },

            'level': function(entity) {
                return stringFormat(imageTemplate, Environment.drawImage(DATASOURCE['richLevel'][entity['richLevel'] || 1]['pic']));
            },

            'badge': function(entity) {
                var data;
                data = (data = entity.userAttr) && (data = data[CONST.UserAttr.Badge]);
                if (!data || data.length == 0)
                    return STRING_EMPTY;
                var temp;
                return data.map(function(item, index) {
                    temp = DATASOURCE['badge'][item];
                    if (temp)
                        return stringFormat(badgeTemplate, Environment.drawImage(temp['pic']), STRING_EMPTY);
                    return STRING_EMPTY;
                }).join(STRING_EMPTY);
            },

            'consume': function(entity, type) {
                switch (type) {
                    case 'top7':
                        return entity['rankCost'];
                    case 'top1':
                        return entity['roomCost'];
                }
                return 0;
            },

            'estimate': function(entity) {
                var AdminType = CONST.AdminType,
                    UserAttr = CONST.UserAttr,
                    value = 0,
                    ratio = Math.pow(10, 14),
                    temp = 0;
                switch (entity['adminType']) {
                    case AdminType.Host:
                        temp = 3
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

    var Header = {
        'init': function(option) {
            this.load(option);
            this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load': function(option) {
            $.extend(this, option);
        },

        'render': function() {
            this.container = this.container;
            this.container.i18nHTML(stringFormat(TEMPLATE['HEADER'], DOMAIN_CONFIG['IMAGE_DOMAIN']));
            this.anonymous = this.container.find('[data-role="anonymous"]');
            this.user = this.container.find('[data-role="user"]');
        },

        'compose': function() {

        },

        'bind': function() {
            $('[data-role="signin"]', this.container).unbind("click").click(function() {
                login_util.show_login_div();
            });

            $('[data-role="signup"]', this.container).unbind("click").click(function() {
                login_util.show_register_div();
            });

            $('[data-role="i18n"]').unbind("click").click(function() {
                var I18N = require(useJSComponent('kit')).use('I18N');
                I18N.localize(I18N.reverse());
            });
            //$("[name='login_out_buttom']").unbind("click").click(function(){user_util.user_out('login_util','user_out');});
        },

        'start': function() {

        },

        'identified': function(identity) {
            this.identity = identity;
            if (this.identity) {
                this.anonymous.safeHide();
                if (!identity['userHeadPic'])
                    identity['userHeadPic'] = 'systemRes/img/default/nophoto.jpg';
                var vipIcon = identity['userAttr'][3] > 0 ? (identity['userAttr'][3] > 1 ? '<span class="svip_flag"></span>' : '<span class="vip_flag"></span>') : '',
                    user_detail = stringFormat(TEMPLATE.HEADER_USER_DETAIL, UserHelper.portrait(identity['userHeadPic']), identity.userNickName, vipIcon, identity.userId,
                        STRING_EMPTY, identity['userBalance'] + identity['userReturnBalance'], identity.host ? STRING_EMPTY : 'display:none;', '/live/' + identity.userSurfing);
                this.user.i18nHTML(
                    stringFormat(TEMPLATE.HEADER_USER, UserHelper.portrait(identity['userHeadPic']), DOMAIN_CONFIG['IMAGE_DOMAIN'], identity['userBalance'] + identity['userReturnBalance'], vipIcon, user_detail)).safeShow();
                var user_detail_badge = this.user.find('[data-role="user_detail_badge"]'),
                    detail = this.user.find('[data-role="user_detail"]');
                top_util.init_top(identity);
                if (identity.host) {}
                this.user.find("[name='login_out_buttom']").unbind("click").click(function() {
                    user_util.user_out('login_util', 'user_out');
                });
                this.user.on('mouseenter', function() {
                    DATASOURCE['richLevel'] && this.reset_user_level(identity);
                    DATASOURCE['badge'] && user_detail_badge.html(UserHelper.badge(identity));
                    //detail.show();
                }.bind(this)).on('mouseleave', function() {
                    //detail.hide();
                }.bind(this));
            } else {
                this.user.safeHide();
                this.anonymous.safeShow();
            }
        },

        reset_user_level: function(identity) {
            if (!identity) return;
            var level = 0,
                level_score = 0,
                level_obj = null,
                next_level_obj = null,
                exp = 100,
                score = 0;
            level = identity.host ? identity.hostLevel : identity.userLevel;
            level_score = identity.host ? identity.hostLevelScore : identity.userLevelScore;
            if (identity.host) {
                level_obj = DATASOURCE['hostLevel'][level];
                next_level_obj = DATASOURCE['hostLevel'][level + 1];
            } else {
                level_obj = DATASOURCE['richLevel'][level];
                next_level_obj = DATASOURCE['richLevel'][level + 1];
            }
            if (level_obj && next_level_obj) {
                exp = (((level_score - level_obj.score) / (next_level_obj.score - level_obj.score)) * 100).toFixed(0);
                $("[name='level_img']").attr("src", DOMAIN_CONFIG['IMAGE_DOMAIN'] + level_obj.pic);
            }
            exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
            $('[name="level_persent"]').css({
                width: (exp < 15 ? (exp < 1 ? 0 : 15) : exp) + '%'
            });
            if (exp < 1) {
                $("[name='level_persent'] font").attr('color', '#868181');
            } else {
                $("[name='level_persent'] font").removeAttr('color');
            }
            $("[name='level_persent'] font").text(exp + '%');
            if (next_level_obj) {
                score = next_level_obj.score - level_score;
            }
            $('[name="next_level_score"]').text(score > 0 ? score : (score < 0 ? 0 : score));
        }
    };

    var Counting = window['ct'] = {
        'init': function() {
            var field = 'totalBalance',
                temp = DATASOURCE['identity'];
            if (temp && (temp = temp['userId'])) {
                if (temp == (temp = DATASOURCE['room'])['roomUserId'])
                    field = 'totalExchangeBalance';
            } else
                temp = DATASOURCE['room'];
            this.total = this.aim = temp[field];
            if(field == 'totalExchangeBalance')
                (this.instance = $('#income')).html(this.total).safeShow();
            else
                this.update = function(){

                };
        },

        'update': function(delta) {
            if (delta > 0)
                this.aim += delta;
            if (!this.growing)
                this.grow();
        },

        'grow': function() {
            if (this.total >= this.aim) {
                this.growing = false;
                return;
            }
            this.growing = true;
            new Promise().wait(42).then(function() {
                this.instance.html(++this.total);
                this.grow();
            }.bind(this)).resolve();
        }
    };

    var Page = {
        'run': function() {
            this.load();
            this.render();
            this.compose();
            this.show_Broadcast_self();
            //this.start_radio_change();
            //this.bind();
            this.start();
            this.notClosedPop();
        },

        'load': function() {
            if (!DATASOURCE)
                DATASOURCE = {};
            this.chatMode = CONST.ChatMode.Speech;

            this.sayCallback = this.sayCallback.bind(this);
            this.fansCallback = this.fansCallback.bind(this);
            this.specialCallback = this.specialCallback.bind(this);
            this.giftCallback = this.giftCallback.bind(this);
        },

        'render': function() {
            this.containerDOM = $('#container');
            this.containerDOM.i18nAppend(TEMPLATE.MAIN);
            this.navigationDOM = $('#navigation');
            this.barDOM = $('#bar');
            this.roomDOM = $('#room');
            this.roomLeftDOM = $('#roomLeft');
            this.roomMiddleDOM = $('#roomMiddle');
            this.roomRightDOM = $('#roomRight');
            this.absentDOM = $('#absent');
            this.cinemaDOM = $('#cinema');
            $('#video').append('<p id="giftMagic" class="hidden"></p><p id="income" class="host_wealth hidden"></p><span id="show_Ring" ></span>');
            //$('#video').append('<p id="giftMagic" class="hidden"></p><p id="income" class="host_wealth hidden"></p>');
        },

        'compose': function() {
            Communicator.init(this.containerDOM);
            Magic.init(this.cinemaDOM);
            Player.init(this.playerDOM);
            I18N.init({
                'onLocalize': this.localize.bind(this)
            });
            login_util.setCallback(function() {
                location.reload();
            });
            Header.init({
                'container': $('#bar')
            });
            require.async('component/sign', function(sign) {
                (this.sign = sign).start();
            }.bind(this));
            ClickCollect.init();
            Counting.init();
        },

        'start': function() {
            var promise = new Promise(function() {
                Bussiness.postData('room_getRoomOtherInfo.fly', {
                    'roomId': DATASOURCE['room']['roomId']
                }, function(data) {
                    DATASOURCE['Other'] = data;
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(
                function() {
                    Bussiness.postData('room_getRoomAdminUsers.fly', {
                        'roomId': DATASOURCE['room']['roomId']
                    }, function(data) {
                        DATASOURCE['Admin'] = data;
                        promise.resolve();
                    }.bind(this));
                }
            ).then(
                function() {
                    Bussiness.getJSON('system/version_data.json', function(data) {
                        DATASOURCE['version'] = data;
                        promise.resolve(data);
                    }.bind(this));
                }.bind(this)).then(this.structure.bind(this));
        },

        'structure': function(VERSION) {
            var promise = new Promise(function() {
                Bussiness.getJSON('level/badge_level_data.json', function(data) {
                    DATASOURCE['badge'] = data;
                    promise.resolve();
                }.bind(this), VERSION['badgeLevel']);
            }).then(function() {
                Bussiness.getJSON('level/rich_level_data.json', function(data) {
                    DATASOURCE['richLevel'] = data;
                    promise.resolve();
                }.bind(this), VERSION['richLevel']);
            }).then(function() {
                Bussiness.getJSON('level/host_level_data.json', function(data) {
                    DATASOURCE['hostLevel'] = data;
                    promise.resolve();
                }.bind(this), VERSION['host_level_v2']);
            }).then(function() {
                Bussiness.getJSON(DOMAIN_CONFIG['DATA_DOMAIN_NEW'].replace('v2', 'v3') + 'face/face_data.json', function(data) {
                    //Bussiness.getJSON('face/face_data.json', function(data) {
                    DATASOURCE['face'] = data;
                    promise.resolve();
                }.bind(this), VERSION['face']);
            }).then(function() {
                Bussiness.getJSON('car/car_data.json', function(data) {
                    DATASOURCE['limo'] = data;
                    promise.resolve();
                }.bind(this), VERSION['car']);
            }).then(function() {
                this.domReady();
                Tip.register();
                this.bind();
                this.initUser();
                this.initGift();
                this.initWhisper();
                this.initRank();
                this.initEmoji();
                this.initManage();
                this.initFollow();
                this.initSale();
                this.initActivity();
                this.initRightBar();
                this.initFlower();
                //this.initValentine();
            }.bind(this));
            this.initGoods();
            (DATASOURCE['identity'] && DATASOURCE['identity']['host']) ? this.initHostTask(): this.initTask();
            Header.identified(DATASOURCE['identity']);
            this.myBalanceDOM = $('#myBalance');
        },

        'domReady': function() {
            var room = DATASOURCE['room'];
            this.roomLeftDOM.i18nHTML(stringFormat(TEMPLATE.LEFT,
                UserHelper.portrait(room['roomHeadPic']), room['roomUserName'], DOMAIN_CONFIG['IMAGE_DOMAIN'] + DATASOURCE['hostLevel'][room['roomHostLevel']]['pic'], '', room['roomGoodNum'], room['favoriteNum']));
            this.roomRightDOM.i18nHTML(TEMPLATE.RIGHT);
            this.rightState = true;
            //this.navigationDOM.html(TEMPLATE.NAVIGATION);
            this.manageDOM = $('#manage');
            this.uvDOM = $('#uv');
            this.ugcDOM = $('#ugc');
            this.limoDOM = $('#limo');
            this.rosterDOM = $('#roster');
            this.dessertDOM = $('#dessert');
            this.chatroomDOM = $('#chatroom');
            this.messageDOM = $('#message');
            this.rosterPanel = this.rosterDOM.parent()[0];
            this.chatroomPanel = this.chatroomDOM.parent()[0];
            this.dessertPanel = this.dessertDOM.parent()[0];
            this.hostGoodNumDOM = $('#hostGoodNum');
            UIHelper.initScroller(this.rosterPanel);
            Ps.initialize(this.chatroomPanel);
            Ps.initialize(this.dessertPanel);
        },

        'bind': function() {
            Trigger.register(CONST.Event.SocketReady, this.initFlower.bind(this));

            Trigger.register(CONST.Event.StartVideo, this.Broadcast.bind(this));

            $('#show_Ring').on('click', this.Broadcast.bind(this));



            var sayHandler = this.say.bind(this);
            $('#say').on('click', sayHandler);
            this.messageDOM.on('keypress', function(evt) {
                if (evt.keyCode == 13)
                    sayHandler();
            }.bind(this));

            var registerSocket = function(eventName, handler) {
                Trigger.register('Socket' + eventName, handler);
            };
            registerSocket('Join', this.join.bind(this));
            registerSocket('Leave', this.leave.bind(this));
            registerSocket('Chat', this.chat.bind(this));
            registerSocket('Giving', this.giving.bind(this));
            registerSocket('Flower', this.flower.bind(this));
            registerSocket('Admin', this.admin.bind(this));
            registerSocket('Marquee', this.marquee.bind(this));
            registerSocket('Promote', this.promote.bind(this));
            registerSocket('Stop', this.kickOutPop.bind(this));
            this.rightSwitchDOM = $('#rightSwitch').on('click', this.rightSwitch.bind(this));

            $('#fans').on('click', this.fans.bind(this));

            this.lockScreenDOM = $('#lockScreen').on('click', function(evt) {
                this.screenLock = !this.screenLock;
                this.lockScreenDOM.toggleClass('locked');
            }.bind(this));

            var share_room = function(share_type) {
                $.ajax({
                    type: "POST",
                    url: system_info.base_attr.domain + "room_shareRoom.fly",
                    cache: false,
                    dataType: "json",
                    data: {
                        shareType: share_type
                    },
                    success: function(result) {
                        result = null;
                    },
                    complete: function(XHR, TS) {
                        XHR = null;
                    }
                });
            };

            $("#share_to_twitter").click(function() {
                var twitterUrl = 'http://twitter.com/intent/tweet';
                var shareUrl = encodeURIComponent(document.location.href + '?promotion=10002');
                var message = $("meta[property='og:title']").attr("content");
                var shareText = encodeURIComponent(message);
                var url = twitterUrl + '?url=' + shareUrl + '&text=' + shareText + '&via=7nujoom&related=7nujoom,flyshow';
                system_util.open_win(url);
                share_room(1);
            }.bind(this));

            $('#share_to_facebook').click(function() {
                var url = 'https://www.facebook.com/dialog/share_open_graph?app_id=' + system_info.base_attr.facebook_key + '&display=popup&action_type=og.shares&action_properties=%7B%22object%22%3A%22' + document.location.href.replace(location.href.search, '') + '?lg=' + system_info.base_attr.local_language + '%22%7D&redirect_uri=' + document.location.href.replace(location.href.search, '') + '?promotion=10001&lg=' + system_info.base_attr.local_language;
                system_util.open_win(url);
                share_room(0);
            }.bind(this));
        },

        'initSale': function() {
            var tab = $('#saleTab'),
                list = $('#saleList'),
                items = [];
            $('span', tab).each(function(index, span) {
                var item = {
                    'index': index,
                    'element': $(span),
                    'list': list.find('li:eq(' + index + ')')
                };
                item['enter'] = function() {
                    this.element.addClass('on');
                    list.css('left', index * -320 + 'px');
                }.bind(item);
                item['quit'] = function() {
                    this.element.removeClass('on');
                }.bind(item);
                items.push(item);
            });
            var saleMutex = new(Kit.use('Mutex'))({
                'items': items,
                'lazy': true
            });

            var saleIndex = Math.floor(Math.random() * 2);
            saleMutex.mutex(saleIndex);

            function next() {
                if (saleIndex > 1)
                    saleIndex = 0;
                else if (saleIndex < 0)
                    saleIndex = 1;
                saleMutex.mutex(saleIndex);
            }

            $('#saleLeft').on('click', function(evt) {
                saleIndex--;
                next();
            });

            $('#saleRight').on('click', function(evt) {
                saleIndex++;
                next();
            });
        },

        'initActivity': function() {
            var activityArea = $('#activityArea'),
                activityAd = $('#giftAD'),
                pack = activityArea.find('[data-role="package"]'),
                got = activityArea.find('[data-role="got"]'),
                current = 6,
                lock, config, storageUId;
            var caption = [
                'هدايا الأيام السبعة ',
                ' هدايا الضيوف الجدد',
                'كنز المستوى ',
                ' كنز كبار الأعضاء'
            ];

            function popFail_Fail(id) {
                var failReason;

                var html1 = '<div data-role="button">\
                                <a href="javascript:;" data-role="close" class="gift_fail_close"></a>\
                                <a href="javascript:;" class="gift_suc_ok" data-role="close"></a>\
                            </div>',
                    html2 = '<div class="vip" data-role="button">\
                                <a href="javascript:;"  class="gift_fail_close" data-role="close"></a>\
                                <a href="javascript:;"  class="fail_close" data-role="close"></a>\
                                <a href="/vip.shtml" target="_blank" class="fail_vip"></a>\
                            </div>';

                switch (id) {
                    case 3:
                        failReason = '<p class="reason">عذراً ، مستواك الحالي لا يكفي ، أذهب لترقية مستواك !</p>';
                        break;
                    case 5:
                        failReason = '<p class="reason">عذراً ، لم تقوم بشراء عضوية كبار الأعضاء خلال فترة النشاط ، لذالك لايمكنك استلام الكنز.</p>';
                        failReason += '<p class="reason_more">قم بشراء إحدي عضويات كبار الأعضاء (SVIP\VIP) خلال فترة النشاط لتحصل علي مركبة اللامبورجيني مجانًا لمدة 5 أيام ( أشتري العضوية لمدة 30 يوم و أحصل علي مركبة اللامبورجيني لمدة 5 أيام مجانًا و لو أشتريتها لمدة 90 يوم  أحصل علي المركبة لمدة 15 يوم مجانًا )</p>';
                        break;
                    case 2:
                        failReason = ' لا تنطبق عليك شروط النشاط！';
                        break;
                    default:
                        failReason = '<p class="reason">عذراً ، مستواك الحالي لا يكفي ، استمر في إنهاء المهام اليومية !</p>';
                        failReason += '<p class="reason_more">أي مستخدم يصل إلى أي مستوى سيحصل على الكنز المقرر له ، خلال الفترة من 2016.3.7-2016.4.3</p>';
                        break;
                }
                //POPUP.close();
                POPUP.rePaint({
                    'template': stringFormat(TEMPLATE.POP, stringFormat(TEMPLATE.POP_FAIL, failReason, id == 5 ? html2 : html1)),
                    'isBind': true
                });
            }

            function fetch() {
                if (!current)
                    return;
                if (lock)
                    return;
                lock = true;
                activityArea.removeClass('on');
                Bussiness.postData('user_trigger_activity.fly?id=' + current, null, function(c, result) {
                    if (c < 6) {
                        switch (result.code) {
                            case 0:
                                var rewardsHTML = result['dataInfo']['award'].map(function(item, i) {
                                    return stringFormat(TEMPLATE.REWARD_LI, DOMAIN_CONFIG['IMAGE_DOMAIN'] + config['packages'][item['packageId']]['pic'], item['expire'] || item['number']);
                                }.bind(this)).join('');
                                //POPUP.close();
                                POPUP.rePaint({
                                    'template': stringFormat(TEMPLATE.POP, stringFormat(TEMPLATE.POP_SUCCESS, caption[c - 2] + (result['dataInfo']['level'] || ''), rewardsHTML)),
                                    'isBind': true
                                });
                                break;
                            case 1103:
                            default:
                                popFail_Fail(c);
                        }
                    }
                    var data;
                    if (result['code'] == 0 && (data = result['dataInfo']) && (data = data['next']))
                        render(data);
                    lock = false;
                }.bind(window, current));
            }

            function render(data) {
                var type = data['type'];
                if (data['state'] == 1)
                    activityArea.addClass('on');
                current = config['activity'][type]['id'];
                pack.removeClass().addClass('package' + type);
                if (type == 3)
                    pack.addClass('level' + data['level']);
            }

            var iDate = new Date(),
                sDate = iDate.getFullYear() + '' + iDate.getMonth() + '' + iDate.getDate(),
                storageUId = 0;
            if (DATASOURCE['identity']) {
                storageUId = DATASOURCE['identity']['userId'];
            }
            if (Storage.get(sDate + '-' + storageUId) == null) {
                //activityAd.show();
                Storage.set(sDate + '-' + storageUId, 1);
            }



            Bussiness.getJSON('activity/activity.json', function(data) {
                config = data;
                /*var reverse = config['reverse'] = {},
                    con = config['packages'],
                    temp;
                for (var key in con) {
                    temp = con[key];
                    reverse[temp['special'] || '0'] = temp['pic'];
                }*/
                if (DATASOURCE['identity'])
                    fetch();
                got.bind('click', function() {
                    if (!DATASOURCE['identity']) {
                        login_util.show_login_div();
                        return;
                    }
                    fetch();
                }.bind(this));
            }.bind(this), DATASOURCE['version']['activity_data']);

            Trigger.register(CONST.Event.ActivityFetch, render);

            this.marqueeDOM = $('#marquee');
            var marqueeStart = function() {
                this.marqueeDOM.safeShow();
            }.bind(this);
            var marqueeEnd = function() {
                this.marqueeDOM.safeHide();
            }.bind(this);
            var marqueeThread = 'Marquee',
                endEvent = 'animationend';
            Trigger.register(CONST.Event.StartOfQueue + '-' + marqueeThread, marqueeStart);
            Trigger.register(CONST.Event.EndOfQueue + '-' + marqueeThread, marqueeEnd);
            this.marqueeQueue = new Queue({
                'handler': function(actor, promise) {
                    actor = $(actor);
                    actor.appendTo(this.marqueeDOM).one(endEvent, function() {
                        actor.remove();
                        promise.resolve();
                    });
                }.bind(this),
                'thread': marqueeThread
            });
        },

        'initRightBar': function() {
            if (!DATASOURCE['identity']) {
                $("#trd_login_new").show();
                login_util.init_facebook();
                login_util.init_google();
            }
        },

        'initGoods': function() {
            var VERSION = DATASOURCE['version'];
            var promise = new Promise(function() {
                Bussiness.getJSON('gift/gift_type_data.json', function(data) {
                    DATASOURCE['giftType'] = data;
                    promise.resolve();
                }.bind(this), VERSION['giftType']);
            }.bind(this)).then(function() {
                Bussiness.getJSON('gift/gift_data.json', function(data) {
                    DATASOURCE['gift'] = data;
                    promise.resolve();
                }.bind(this), VERSION['gift']);
            }.bind(this)).then(function() {
                var giftType = DATASOURCE['giftType'],
                    gift = DATASOURCE['gift'],
                    group = {};
                if (!giftType || !gift) return;
                giftType.forEach(function(data, index) {
                    group[data['typeName']] = data['datas'];
                });
                this.roomMiddleDOM.i18nAppend(TEMPLATE.MIDDLE);
                this.previewDOM = $('#preview');
                var types = ['common', 'vip', 'backpack'],
                    items = [],
                    tab = $('#tabGoods'),
                    list = $('#listGoods'),
                    panel = list[0],
                    item,
                    data,
                    template = TEMPLATE.GIFT,
                    temp, smallGift = ['|'];
                $.each(types, function(index, type) {
                    var item = {
                        'index': index,
                        'type': type,
                        'tab': temp = tab.find('[data-type="' + type + '"]'),
                        'element': temp.find('a'),
                        'list': list.find('[data-type="' + type + '"]')
                    };
                    switch (type) {
                        case 'common':
                            data = group['Common'].concat(group['Special'], group['Luxury']);
                            break;
                        case 'vip':
                            data = group['VIP'];
                            break;
                        case 'backpack':
                            data = DATASOURCE['Other']['package_list'];
                            break;
                    }
                    item['data'] = data;
                    item['enter'] = function() {
                        if (!this.init) {
                            this.init = true;
                            if (!this.data)
                                return;
                            var type = this.type,
                                origin;
                            switch (type) {
                                case 'common':
                                    this.list.html(this.data.map(function(temp, index) {
                                        temp = gift[temp];
                                        if (temp) {
                                            if (temp['showType'] == 1)
                                                smallGift.push(temp['giftId'] + '|');
                                            return stringFormat(template, temp['giftId'], temp['name'], temp['cbalance'], STRING_EMPTY, STRING_EMPTY);
                                        } else
                                            return STRING_EMPTY;
                                    }));
                                    break;
                                case 'vip':
                                    var tmpl = '<span class="{0}_icon"></span>',
                                        tp = {
                                            1: 'vip',
                                            2: 'svip'
                                        };
                                    this.list.html(this.data.map(function(temp, index) {
                                        temp = gift[temp];
                                        if (temp)
                                            return stringFormat(template, temp['giftId'], temp['name'], temp['cbalance'], stringFormat(tmpl, tp[temp['val']]), 'data-role="vipgift" data-vip="' + temp['val'] + '"');
                                        else
                                            return STRING_EMPTY;
                                    }));
                                    break;
                                case 'backpack':
                                    Bussiness.postData('user_getUserSpecialBySpecialType.fly', {
                                        specialType: 3
                                    }, function(result) {
                                        if (result['code'] != 0)
                                            return;
                                        this.list.html(result.dataInfo.map(function(temp, index) {
                                            var special = temp['special'],
                                                origin = gift[special];
                                            if (origin)
                                                return stringFormat(TEMPLATE['BACKPACK'], special, origin['name'], temp['number']);
                                            else
                                                return STRING_EMPTY;
                                        }));
                                    }.bind(this));
                                    this.init = false;
                                    break;
                            }
                        }
                        panel.scrollTop = 0;
                        Ps.update(panel);
                        this.tab.addClass('select');
                        this.list.removeClass('hidden');
                    }.bind(item);
                    item['quit'] = function() {
                        this.tab.removeClass('select');
                        this.list.addClass('hidden');
                    }.bind(item);
                    items.push(item);
                });
                this.goodsMutex = new(Kit.use('Mutex'))({
                    'items': items
                });
                this.smallGift = smallGift.join(STRING_EMPTY);
                Ps.initialize(panel);
                this.countDOM = $('#count');
                this.precountDOM = $('#precount');
                this.quantityDOM = $('#quantity');
                ClickCollect.register('giftQuantity', this.quantityDOM);
                var listGoods = $('#listGoods');
                listGoods.on('click', '[data-giftid]', function(evt) {
                    var target = evt.currentTarget,
                        select = 'select';
                    if (!target)
                        return;
                    target = $(target);
                    var giftId = parseInt(target.attr('data-giftid'));
                    if (this.giftId === giftId)
                        return;
                    if (this.currentGift)
                        this.currentGift.removeClass(select);
                    this.currentGift = target.addClass(select);
                    this.giftId = giftId;
                    this.special = target.data('role') == 'special';
                    this.vipgift = target.data('role') == 'vipgift';
                }.bind(this));
                listGoods.on('mouseenter', '[data-giftid]', function(evt) {
                    var target = evt.currentTarget;
                    if (!target)
                        return;
                    target = $(target);
                    var giftId = parseInt(target.attr('data-giftid'));
                    this.preview(giftId, target.index());
                }.bind(this));
                listGoods.on('mouseleave', function(evt) {
                    this.previewDOM.removeClass(this.previewStyle).html(STRING_EMPTY);
                    this.previewStyle = null;
                }.bind(this));
                var giveHandler = this.give.bind(this);
                $('#give').on('click', giveHandler);
                this.precountDOM.on('click', this.quantityDOM.safeShow.bind(this.quantityDOM));
                this.quantityDOM.on('click', '[data-value]', function(evt) {
                    var value = parseInt($(evt.currentTarget).data('value'));
                    this.quantityDOM.safeHide();
                    if (value)
                        this.countDOM.val(value);
                }.bind(this));
            }.bind(this));
        },

        'initTask': function() {
            var _this = this;
            this.task_map = {};
            this.task_button = $("#task_button");
            this.task_detail_info = $("#task_detail_info");
            this.user_task_list = $("#user_task_list");
            this.task_num = $("#task_num");
            this.red = this.task_button.find("em");
            ClickCollect.register('task', $('#task_detail_info'));
            var promise = new Promise(function() {
                Bussiness.getJSON('task/task_data.json',
                    function(data) {
                        DATASOURCE['sys_task'] = data;
                        promise.resolve();
                    }.bind(this));
            }.bind(this)).then(function() {
                Bussiness.getJSON('task/en_task_language_data.json',
                    function(data) {
                        DATASOURCE['task_en'] = data;
                        promise.resolve();
                    }.bind(this));
            }.bind(this)).then(function() {
                Bussiness.getJSON('task/ar_task_language_data.json',
                    function(data) {
                        DATASOURCE['task_ar'] = data;
                        promise.resolve();
                    }.bind(this));
            }.bind(this)).then(function() {
                var task = DATASOURCE['sys_task'],
                    en = DATASOURCE['task_en'],
                    ar = DATASOURCE['task_ar'],
                    temp;
                for (var t in task) {
                    task[t]['en'] = (temp = en[t]) ? temp['languageVal'] : STRING_EMPTY;
                    task[t]['ar'] = (temp = ar[t]) ? temp['languageVal'] : STRING_EMPTY;
                }
                _this.init_user_task_detail(false);
            }.bind(this));

            this.task_button.on("click", function() {
                if (!UserHelper.validate())
                    return;
                var is_show = $("#task_detail_info").css("display") == "block";
                if (!is_show) {
                    _this.init_user_task_detail(true);
                } else {
                    _this.task_detail_info.addClass("hidden");
                }
            });

            this.user = function() {
                    var user = Cookie.get(Cookie.key['user_info']);
                    if (user)
                        return JSON.parse(user);
                },

                this.init_task_map = function() {
                    _this.task_map = {};
                    var task_list = DATASOURCE['task'] ? DATASOURCE['task']['taskList'] : null;
                    if (task_list && task_list.length > 0) {
                        $.each(task_list, function(idx, obj) {
                            _this.task_map[obj.taskId] = obj;
                        });
                    }
                },

                this.init_user_task_detail = function(bool) {
                    var identified = DATASOURCE['identity'];
                    //$("#task_button p").hide();
                    if (!identified) {
                        $("#task_button .task_nologin").show();
                        $("#task_button .task_nologin p").show();
                        return;
                    }

                    if (DATASOURCE['sys_task']) {
                        if (DATASOURCE['task']) {
                            _this.init_task_map();
                            _this.show_task(bool);
                        } else {
                            $.ajax({
                                type: "GET",
                                url: DOMAIN_CONFIG['DOMAIN'] + "/user_getUserTask.fly",
                                cache: false,
                                dataType: "json",
                                success: function(obj) {
                                    if (obj.code == 0) {
                                        if (!DATASOURCE['task']) {
                                            DATASOURCE['task'] = {};
                                        }
                                        DATASOURCE['task']['taskList'] = obj.dataInfo;
                                        _this.init_task_map();
                                        _this.show_task(bool);
                                    }
                                    obj = null;
                                },
                                complete: function(XHR, TS) {
                                    XHR = null;
                                }
                            });
                        }
                    }
                };

            this.show_task = function(is_show) {
                var bool = is_show ? true : false;
                if (bool) {
                    _this.show_task_user_info();
                }
                var finish_num = 0,
                    task_num = 0,
                    bool = false;
                var language = I18N.language;
                if (_this.task_map) {
                    var task_finish_html_str_temp = '',
                        task_unfinish_html_str_temp = '';
                    $.each(_this.task_map, function(key, obj) {
                        if (obj) {
                            var task_obj = DATASOURCE['sys_task'][obj.taskId];
                            if (task_obj) {
                                var task_html_str_temp = '';
                                task_num++;
                                var task_finish_num = parseInt((task_obj.finishNum + task_obj.finishOffset) / (task_obj.finishType == 2 ? (1000 * 60) : 1));
                                var task_schedule = obj.state != 0 ? task_finish_num : parseInt((obj.schedule + task_obj.finishOffset) / (task_obj.finishType == 2 ? (1000 * 60) : 1));
                                var task_li_class = (obj.state == 0 ? "" : obj.state == 1 ? "task_f1" : "task_f2");
                                task_html_str_temp += '<li id="task_' + obj.taskId + '" class="' + task_li_class + '">';
                                task_html_str_temp += '<dl>';
                                task_html_str_temp += (obj.state == 0 && obj.taskId == 1 ? '<a href="/user/profile" target="_blank">' : '') + '<dt><img src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + task_obj.imageUrl + '" alt="" tag_id="10057"></dt>' + (obj.state == 0 && obj.taskId == 1 ? '</a>' : '');
                                task_html_str_temp += '<dd>';
                                var task_name = task_obj[language] ? task_obj[language] : task_obj.taskName;
                                task_html_str_temp += '<b>' + task_name + '</b>';
                                task_html_str_temp += '<strong data-i18n="Task_Rewards">{{Task_Rewards}}</strong><strong>:</strong>';
                                if (task_obj.taskAwards && task_obj.taskAwards.length > 0) {
                                    $.each(task_obj.taskAwards, function(taidx, taskAward) {
                                        if (taskAward) {
                                            task_html_str_temp += '<img ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + ' src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + taskAward.imageUrl + '" alt=""><strong ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + '>+</strong><strong ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + '>' + taskAward.awardAmount + '</strong>';
                                        }
                                    });
                                }
                                task_html_str_temp += '</dd>';
                                var task_state_html_str = '';
                                if (obj.state != 0) {
                                    task_state_html_str = '<p tag_id="10058" ' + (obj.state == 1 ? ' onclick="window[\'submit_user_task\'](' + obj.taskId + ');"' : '') + (obj.state == 2 ? '' : ' data-i18n="Task_GetRewards"') + '>' + (obj.state == 2 ? '' : '{{Task_GetRewards}}') + '</p>';
                                } else {
                                    task_state_html_str = '<p tag_id="10058" ><i>' + task_schedule + '</i>/<i>' + task_finish_num + '</i></p>';
                                }
                                task_html_str_temp += task_state_html_str;
                                task_html_str_temp += '</dl>';
                                task_html_str_temp += '</li>';
                                if (obj.state != 0) {
                                    if (obj.state == 1) {
                                        bool = true;
                                        task_finish_html_str_temp = task_finish_html_str_temp + task_html_str_temp;
                                    } else {
                                        task_unfinish_html_str_temp = task_unfinish_html_str_temp + task_html_str_temp;
                                    }
                                    finish_num++;
                                } else {
                                    task_unfinish_html_str_temp = task_html_str_temp + task_unfinish_html_str_temp;
                                }
                            }
                        }
                    });
                    var task_html_str = task_finish_html_str_temp + task_unfinish_html_str_temp;
                    _this.user_task_list.i18nHTML(task_html_str);
                    if (bool) {
                        _this.red.removeClass("hidden");
                    } else {
                        _this.red.addClass("hidden");
                    }
                    if ($(".task_f2")) {
                        var finish_task = $(".task_f2");
                        _this.user_task_list.not(finish_task).prependTo("#user_task_list");
                    }
                    if ($(".task_f1")) {
                        var receive_task = $(".task_f1");
                        _this.user_task_list.not(receive_task).appendTo("#user_task_list");
                    }
                    var txt_num = finish_num >= task_num ? task_num : finish_num;
                    _this.task_num.i18nHTML('<i class="task_over">' + txt_num + '</i>/<i class="task_all">' + task_num + '</i>');
                }
            };

            this.show_task_user_info = function() {
                var identity = DATASOURCE['identity'];
                var user = _this.user();
                if (identity && user) {
                    $("#task_nick_name").text(user['nickName']);
                    var user_photo = user['headPic'];
                    if (user_photo == '') {
                        user_photo = 'systemRes/img/default/nophoto.jpg'
                    } else {
                        user_photo = user['headPic'];
                    }
                    $('#task_user_head').attr('src', DOMAIN_CONFIG['IMAGE_DOMAIN'] + user_photo);
                    var leval = 0,
                        level_score = 0,
                        level_obj = null,
                        next_level_obj = null;
                    if (!identity['host']) {
                        leval = user['richLevel'];
                        level_score = user['richScore'];
                        level_obj = DATASOURCE['richLevel'][leval];
                        next_level_obj = DATASOURCE['richLevel'][leval + 1];
                    } else {
                        leval = user['hostInfo']['hostLevel'];
                        level_score = user['hostInfo']['hostScore'];
                        level_obj = DATASOURCE['hostLevel'][leval];
                        next_level_obj = DATASOURCE['hostLevel'][leval + 1];
                    }
                    $("#task_user_level").text(leval);
                    var exp = '100';
                    if (level_obj) {
                        if (next_level_obj) {
                            exp = (((level_score - level_obj.score) / (next_level_obj.score - level_obj.score)) * 100).toFixed(0);
                        }
                        $("#task_user_level_img").attr("src", DOMAIN_CONFIG['IMAGE_DOMAIN'] + level_obj.pic);
                    }
                    exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
                    $("#task_user_level_persent").css({
                        width: (exp < 15 ? (exp < 1 ? 0 : 15) : exp) + '%'
                    });
                    if (exp < 1) {
                        $("#task_user_level_persent font").attr('color', '#868181');
                    } else {
                        $("#task_user_level_persent font").removeAttr('color');
                    }
                    $("#task_user_level_persent font").text(exp + '%');
                    var score = 0;
                    if (next_level_obj) {
                        score = next_level_obj.score - level_score;
                    }
                    $("#task_user_next_level").text(score > 0 ? score : (score < 0 ? 0 : score));
                    $(".task_user_info dl .lev_hover a").text(score > 0 ? score : (score < 0 ? 0 : score));
                    _this.task_detail_info.removeClass("hidden");
                }
            };

            this.update_user_task = function(task_id, task_state, task_schedule) {
                var task = _this.task_map[task_id];
                var is_show = $("#task_detail_info").css("display") == "block";
                if (task) {
                    if (task.schedule == parseInt(task_schedule) && task.state == task_state) {
                        return;
                    }
                    if (task_state == 2) {
                        $('#task_' + task_id + '.task_f1 dd img').css({
                            '-webkit-animation': 'auto_scale 1.5s ease'
                        });
                        $('#task_' + task_id + '.task_f1 .wordCol_01').css({
                            '-webkit-animation': 'auto_scale 1.5s ease'
                        });
                    }
                    setTimeout(function() {
                        task.schedule = parseInt(task_schedule);
                        task.state = task_state;
                        var task_detail = DATASOURCE['sys_task'][task_id];
                        if (task.state == 2 && task_detail.haveNextTask) {
                            _this.reset_user_task(is_show);
                        } else if (task.state == 1) {
                            if (is_show) {
                                _this.show_task();
                            } else {
                                _this.reset_user_task(is_show);
                            }
                        } else {
                            if (is_show) {
                                _this.reset_user_task(is_show);
                                _this.show_task();
                            }
                        }
                    }, task_state == 2 ? 1500 : 0);
                } else {
                    if (task_data[task_id]) {
                        _this.reset_user_task(is_show);
                    }
                }
            };

            // 更新主播等级信息
            this.update_host_exp_info = function(level, exp) {
                var identity = DATASOURCE['identity'];
                if (identity) {
                    user_util.update_host_exp(exp, level);
                    var is_show = $("#task_detail_info").css("display");
                    if (is_show == "block") {
                        _this.show_task_user_info();
                    }
                }
            };

            // 更新自己的用户等级信�?
            this.update_user_exp_info = function(level, exp) {
                var identity = DATASOURCE['identity'];
                var user = _this.user();
                if (user && level > user.richLevel) {
                    setTimeout(function() {
                        top_util.init_upgrade_level(level);
                    }, 10);
                }
                user_util.update_user_exp(exp, level);
                var is_show = $("#task_detail_info").css("display");
                if (is_show == "block") {
                    _this.show_task_user_info();
                }
            };

            this.reset_user_task = function(bool) {
                _this.init_user_task_detail(bool);
            };

            this.update_host_level = function(obj) {
                var identity = DATASOURCE['identity'];
                if (identity && !identity['host'] && identity.userId == obj.userId && obj.userType == 0) {
                    _this.update_host_exp_info(obj.selfHostLevel, obj.selfHostScore);
                }
            };

            this.submit_user_task = function(task_id) {
                $.ajax({
                    type: "GET",
                    url: DOMAIN_CONFIG['SITE_DOMAIN'] + "user_submitUserTask.fly",
                    cache: false,
                    dataType: "json",
                    data: {
                        taskId: task_id
                    },
                    success: function(obj) {
                        if (obj.code == 0) {
                            DATASOURCE['task'] = null;
                            if (obj.dataInfo) {
                                if (obj.dataInfo.level > 0 && obj.dataInfo.exp > 0) {
                                    if (obj.dataInfo.userType == 1) {
                                        _this.update_host_exp_info(obj.dataInfo.level, obj.dataInfo.exp);
                                    } else {
                                        _this.update_user_exp_info(obj.dataInfo.level, obj.dataInfo.exp);
                                    }
                                }
                            }
                            var task = DATASOURCE['sys_task'][task_id];
                            if (task) {
                                if (task.haveNextTask) {
                                    _this.reset_user_task(true);
                                } else {
                                    _this.update_user_task(task_id, 2, task.finishNum + task.finishOffset);
                                }
                            } else {
                                _this.reset_user_task(true);
                            }
                        } else {
                            alert('2703');
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("error");
                    }
                });
            };

            window['submit_user_task'] = this.submit_user_task;

            Trigger.register('SocketTask', function(data) {
                var identity = DATASOURCE['identity'];
                if (identity && data.userId == identity.userId && data.userType == 0) {
                    _this.update_user_task(data.taskId, data.state, data.schedule);
                }
            });

            Trigger.register('SocketHostLevel', function(data) {
                _this.update_host_level(data);
            });
        },

        'initHostTask': function() {
            var _this = this;
            var itemTpl = ' <li>\
                                <a class="btn {0}" {1} href="javascript:;">{2}</a>\
                                <p class="{5}">{3}+</p>\
                                <p class="host_target"><em>{4}</em></p>\
                            </li>',
                hostHeadTpl = '<dl>\
                                <dt>\
                                    {0}\
                                </dt>\
                                <dd>\
                                    <b>{2}</b><a href="/act/level" target="_blank"><img name="level_img" src="{1}" alt="" /></a><span><i name="level_persent" style="width: 0%;"><font size="0">0.00%</font></i></span>\
                                </dd>\
                                <p>\
                                    <b data-i18n="Task_Level">{{Task_Level}}</b><b>&nbsp;:&nbsp;</b><b>{3}</b> <br>\
                                    <em data-i18n="Task_ToNextLevel">{{Task_ToNextLevel}}</em><em>&nbsp;:&nbsp;</em><em name="next_level_score">{4}</em><img src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/imgNew/toplist/exp_icon.png" alt="">\
                                </p>\
                            </dl>',
                Task_HostGotRewards = i18nTranslate('Task_HostGotRewards'),
                Task_HostGetRewards = i18nTranslate('Task_HostGetRewards'),
                $hostContainer = $('.task_list.host'),
                taskNumDOM = $('#task_num'),
                scrollDOM = $hostContainer.find('.host_task_con')[0],
                hostflowerDOM = $hostContainer.find('[data-role="host_flower"]'),
                focusDOM = $hostContainer.find('[data-role="host_focus"]'),
                popularDOM = $hostContainer.find('[data-role="host_popular"]');

            this.desc = {};

            this.lockFlag = {};
            this.hasReward = false;
            this.task_button = $('#task_button');
            this.redDot = this.task_button.find('em');
            this.task_button.on("click", function() {
                if (!UserHelper.validate())
                    return;
                if ($hostContainer.is(':visible')) {
                    $hostContainer.addClass('hidden');
                } else {
                    show_task_host_info();
                    this.init_host_task();
                    $hostContainer.removeClass('hidden');
                    UIHelper.refreshScroller(scrollDOM);
                }
            }.bind(_this));
            taskNumDOM.hide();
            UIHelper.initScroller(scrollDOM);
            ClickCollect.register('task', $hostContainer);

            this.renderHostTask = function() {
                if (!this.host_task_all) return;
                UIHelper.refreshScroller(scrollDOM);
                $.each(this.host_task_all, function(i, item) {
                    switch (item['typename']) {
                        case 'flower':
                            this.desc[0] = [i18nTranslate('Task_HostFlowerUnfinishedDesc'), i18nTranslate('Task_HostFlowerFinishedDesc')];
                            this.renderItemReward(item['task'], 0, hostflowerDOM, i18nTranslate('Task_HostFlowerUnit'), true);
                            return;
                        case 'attention':
                            this.desc[1] = [i18nTranslate('Task_HostFocusUnfinishedDesc'), i18nTranslate('Task_HostFocusFinishedDesc')];
                            this.renderItemReward(item['task'], 1, focusDOM, i18nTranslate('Task_HostFocusUnit'), true);
                            return;
                        case 'popularity':
                            this.desc[2] = [i18nTranslate('Task_HostPopularUnfinishedDesc'), i18nTranslate('Task_HostPopularFinishedDesc')];
                            this.renderItemReward(item['task'], 2, popularDOM, i18nTranslate('Task_HostPopularUnit'), false);
                            return;
                    }
                }.bind(this));

                this.bindHostTask();
            };

            this.bindHostTask = function() {
                $hostContainer.unbind('click').click(function(evt) {
                    var $tar = $(evt.target),
                        taskId = $tar.data('task');
                    if (typeof(taskId) !== 'undefined') {
                        if (this.lockFlag[taskId]) return;
                        this.lockFlag[taskId] = true;
                        Bussiness.postData('user_submitUserTask.fly', {
                            'taskId': taskId
                        }, function(data) {
                            if (data.code == 0) {
                                $tar.html(i18nTranslate('Task_HostGotRewards'));
                                $tar.removeClass('active');
                                this.init_host_task();
                                if (data.dataInfo) {
                                    if (data.dataInfo.level > 0 && data.dataInfo.exp > 0) {
                                        if (data.dataInfo.userType == 1) {
                                            this.update_host_exp_info(data.dataInfo.level, data.dataInfo.exp);
                                        }
                                    }
                                }
                            }
                            this.lockFlag[taskId] = false;
                        }.bind(this));
                    } else if ($tar.hasClass('host_arrow')) {
                        var more_cnt = $tar.siblings('.host_more');
                        $tar.toggleClass('open');
                        more_cnt.toggleClass('hidden');
                        UIHelper.refreshScroller(scrollDOM);
                    }
                }.bind(this));
            };

            function show_task_host_info() {
                var identity = DATASOURCE['identity'];
                if (!identity) return;
                if (!identity['userHeadPic'])
                    identity['userHeadPic'] = 'systemRes/img/default/nophoto.jpg';
                var task_user_infoDOM = $hostContainer.find('[data-role="task_user_info"]');
                var vipIcon = identity['userAttr'][3] > 0 ? (identity['userAttr'][3] > 1 ? '<span class="svip_flag"></span>' : '<span class="vip_flag"></span>') : '';
                task_user_infoDOM.i18nHTML(stringFormat(hostHeadTpl, UserHelper.portrait(identity['userHeadPic']), DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/img/default/level1_01.png', identity.userNickName, identity.hostLevel, identity.userLevelScore || identity.hostLevelScore));
                Header.reset_user_level(identity);
            }

            this.init_host_task = function() {
                var promise = new Promise(function() {
                    if (this.host_task_all != null) return true;
                    Bussiness.getJSON('task/task_hot_data.json', function(data) {
                        this.host_task_all = this.formatTaskAll(data);
                        promise.resolve();
                    }.bind(_this));
                }.bind(_this)).then(function() {
                    Bussiness.postData('user_getUserTask.fly', {}, function(data) {
                        if (data['code'] == 0) {
                            this.host_task_cur = data['dataInfo'];
                            this.renderHostTask();
                            promise.resolve();
                        }
                    }.bind(_this));
                }.bind(_this));
            };

            this.formatTaskAll = function(data) {
                $.each(data, function(i, item) {
                    item.task.unshift({
                        goal: 0,
                        exp: 0
                    });
                }.bind(this));
                return data;
            };

            this.update_host_exp_info = function(level, exp) {
                var identity = DATASOURCE['identity'];
                if (identity) {
                    user_util.update_host_exp(exp, level);
                    identity.hostLevelScore = exp;
                    identity.hostLevel = level;
                    if ($hostContainer.is(':visible')) show_task_host_info();
                }
            };

            this.renderItemReward = function(flowers, index, hostflowerDOM, unit, exp_or_coin) {
                var curFlowerNum = this.host_task_cur[index]['current'],
                    curObj = this.host_task_cur[index]['tasks'],
                    f_len = flowers.length,
                    len = curObj.length;
                var flowerDescDOM = hostflowerDOM.find('.host_explain'),
                    pgBar = hostflowerDOM.find('.pg_bar span i');
                var limit = f_len - 1,
                    start = 0,
                    end = limit;
                if (len > 0)
                    start = len;
                if (len < limit)
                    end = start + 1;
                var desc_tpl = (len == limit ? this.desc[index][1] : this.desc[index][0]);
                flowerDescDOM.html(stringFormat(desc_tpl, curFlowerNum, flowers[start]['exp'], flowers[end]['goal'] - curFlowerNum, flowers[end]['exp']));
                hostflowerDOM.find('[data-role="rewards_list"]').i18nHTML(flowers.map(function(item, j) {
                    if (j == 0) return;
                    var i = j - 1;
                    curItemObj = curObj[i],
                        curAvaiable = curItemObj && (curItemObj['state'] == 0),
                        curStyle = curAvaiable ? 'active' : '',
                        curTask = curAvaiable ? 'data-task=' + curItemObj['taskId'] : '',
                        curState = curItemObj ? (curItemObj['state'] == 1 ? Task_HostGotRewards : Task_HostGetRewards) : Task_HostGetRewards;
                    curItemObj ? pgBar.eq(i).css('width', '100%') : '';
                    if (curAvaiable) this.hasReward = true;
                    return stringFormat(itemTpl, curStyle, curTask, curState, item['exp'], item['goal'] + ' ' + unit, exp_or_coin ? 'host_exp' : 'host_coin');
                }.bind(this)).join(''));

                this.hasReward ? this.redDot.removeClass('hidden') : this.redDot.addClass('hidden');
                if (len < limit) {
                    var ex_goal = flowers[len]['goal'],
                        goal = flowers[len + 1]['goal'];
                    pgBar.eq(len).css('width', ((curFlowerNum - ex_goal) / (goal - ex_goal) * 100).toFixed(2) + '%');
                } else {
                    //    if(curFlowerNum>flowers[end]['goal'])
                    //        pgBar.eq(end).css('width','100%');
                    //}
                    //if(f_len == len)
                    pgBar.eq(len).css('width', '100%');
                }
            };

            this.init_host_task();
        },

        'initUser': function() {
            var users = this.users = {},
                userList = DATASOURCE['Other']['user_list_info']['user_list'],
                Limo = DATASOURCE['limo'],
                uvTemplate = TEMPLATE['UV'],
                limoTemplate = TEMPLATE['LIMO'],
                uvHTML = [],
                limoHTML = [],
                nickname, userId, temp, className,
                AdminType = CONST.AdminType,
                element, html,admins = DATASOURCE['Admin']['dataInfo']||[],adminId,hit;
            if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])) {
                admins.forEach(function (admin, index) {
                    adminId = admin['userId'];
                    hit = false;
                    for (var i = 0, count = userList.length; i < count; i++) {
                        if (userList[i]['userId'] == adminId) {
                            hit = true;
                            break;
                        }
                    }
                    if (!hit) {
                        admin.offLine = true;
                        userList.push(admin);
                    }
                });
            }
            this.userOrder = new Order({
                'initial': userList,
                'value': function(data) {
                    return UserHelper.estimate(data);
                }
            });
            var memberCSS;
            userList.forEach(function(user, index) {
                userId = user['userId'];
                users[userId] = user;
                className = STRING_EMPTY;
                temp = user['adminType'], className = null;
                if (temp == AdminType.Host)
                    className = 'host';
                else if (temp == AdminType.Constable)
                    className = 'constable';
                else if (user['roomAdmin'])
                    if (user['offLine'])
                        className = 'manager off';
                    else
                        className = 'manager';
                memberCSS = CONST.MemberTag[(temp = (temp = user['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
                html = stringFormat(uvTemplate,
                    stringFormat(classTempate, className + ' ' + memberCSS),
                    userId,
                    STRING_EMPTY, //todo: admin icon
                    UserHelper.portrait(user['headPic']),
                    nickname = user['userName'],
                    UserHelper.level(user),
                    UserHelper.badge(user));
                uvHTML.push(element = $(html));
                user['element'] = element;
                temp = (temp = user.userAttr) && (temp = temp[CONST.UserAttr.Limo]) && (temp = Limo[temp]);
                if (temp)
                    limoHTML.push(stringFormat(limoTemplate, Environment.drawImage(temp['webPic']), STRING_EMPTY, nickname, userId));

            });
            this.rosterDOM.html(uvHTML);
            UIHelper.refreshScroller(this.rosterPanel);
            this.roomLeftDOM.find('[data-role="carNum"]').html(limoHTML.length);
            this.limoDOM.html(limoHTML.join(STRING_EMPTY));
            this.limoPanel = this.limoDOM.parent()[0];
            UIHelper.initScroller(this.limoPanel);
        },

        'initGift': function() {
            var recordThread = 'Record';
            var temp;
            this.recordQueue = new Queue({
                'handler': function(item, promise) {
                    this.dessertDOM.append(stringFormat(TEMPLATE.DESSERT,
                        stringFormat(classTempate, item['member']), item['nickname'], item['badge'], item['name'], item['num']));
                    var delta = this.dessertPanel.scrollTop = this.dessertPanel.scrollHeight - this.dessertPanel.offsetHeight;
                    if (delta > 0)
                        Ps.update(this.dessertPanel);
                    var timeout = setTimeout(function() {
                        clearTimeout(timeout);
                        promise.resolve();
                    }, 0);
                }.bind(this),
                'thread': recordThread
            });

            var queueStart = function() {
                viewDom.safeShow();
            }.bind(this);
            var queueEnd = function() {
                viewDom.safeHide();
            }.bind(this);
            var viewDom = $('#giftView'),
                thread = 'Gift',
                template = '<img src="{0}" /><span class="name">{1}</span>';
            Trigger.register(CONST.Event.StartOfQueue + '-' + thread, queueStart);
            Trigger.register(CONST.Event.EndOfQueue + '-' + thread, queueEnd);
            this.giftQueue = new Queue({
                'handler': function(item, promise) {
                    viewDom.html(stringFormat(template, Environment.drawImage(item['url']), item['caption']));
                    var timeout = setTimeout(function() {
                        clearTimeout(timeout);
                        promise.resolve();
                    }, 3000);
                },
                'thread': thread
            });

            var batchStart = function() {
                batch.safeShow();
            }.bind(this);
            var batchEnd = function() {
                batch.safeHide();
            }.bind(this);
            var batch = $('#giftMagic'),
                batchThread = 'Batch',
                endEvent = 'animationend';
            Trigger.register(CONST.Event.StartOfQueue + '-' + batchThread, batchStart);
            Trigger.register(CONST.Event.EndOfQueue + '-' + batchThread, batchEnd);
            this.batchQueue = new Queue({
                'handler': function(item, promise) {
                    var level = item['level'],
                        className = 'gift' + level;
                    batch.html(stringFormat(TEMPLATE.BATCH,
                        UserHelper.portrait(item['pic']),
                        item['nickname'],
                        item['num'],
                        item['gift'],
                        item['hit'] > 0 ? STRING_EMPTY : DISPLAY_NONE,
                        item['hit']
                    )).one(endEvent, function() {
                        batch.removeClass(className);
                        promise.resolve();
                    }).addClass(className);
                },
                'thread': batchThread
            });
            (function() {
                var destory = function(key) {
                    return function(key) {
                        var temp = this.batchCombo[key];
                        if (temp) {
                            clearTimeout(temp['timeout']);
                            delete this.batchCombo[key];
                        }
                    }.bind(this, key);
                }.bind(this);
                this.batchCombo = {};
                this.comboInterval = 15 * 1000;
                this.comboKeygen = function(userId, giftId, num) {
                    return [userId, giftId, num].join('-');
                };
                this.comboQuery = function(key) {
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

        'initWhisper': function() {
            var whisperCSS = 'private_mode';
            var viewWhisper = function() {
                if (this.paperDOM.is(':visible'))
                    this.speech();
                else
                    whisper();
            }.bind(this);
            var whisper = function() {
                this.paperDOM.safeShow();
                this.newWhisperDOM.safeHide();
                if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId'])) {
                    var room = DATASOURCE['room'];
                    this.whisperID = room['roomUserId'];
                    this.whisper(room['roomUserName']);
                }
                var tipKey, identity = DATASOURCE['identity'];
                if (identity) {
                    if (identity['userId'] != DATASOURCE['room']['roomUserId']) {
                        if ((identity['vipType'] != CONST.MemberType.SVIP) && (identity['userType'] != CONST.AdminType.Constable))
                            tipKey = 'Room_BecomeSVIPtoPrivateChat';
                    }
                } else
                    tipKey = 'Room_BecomeSVIPtoPrivateChat';
                if (tipKey) {
                    if (!this.whisperTipDOM.data('bind'))
                        this.whisperTipDOM.attr('data-bind', 1).attr('data-i18n', tipKey).html(i18nTranslate(tipKey));
                    this.whisperTipDOM.safeShow();
                }
            }.bind(this);
            this.speech = function() {
                this.chatMode = CONST.ChatMode.Speech;
                this.paperDOM.safeHide();
                this.whisperTipDOM.safeHide();
                this.input.removeClass(whisperCSS);
                this.whisperID = null;
            }.bind(this);
            this.whisper = function(talker) {
                this.chatMode = CONST.ChatMode.Whisper;
                if (!this.input.hasClass(whisperCSS))
                    this.input.addClass(whisperCSS);
                this.who.html(talker);
            }.bind(this);
            this.manageWhisperDOM = $(this.manageDOM.find('[data-role="whisper"]'));
            this.whisperDOM = $('#whisper');
            this.newWhisperDOM = $('#newWhisper');
            this.whisperTipDOM = $('#whisperTip');
            this.paperDOM = $('#paper');
            this.paperPanel = this.paperDOM[0];
            Ps.initialize(this.paperPanel);
            this.secretDOM = $(this.paperDOM.find('[data-role="secret"]'));
            this.input = $('#input');
            this.who = $('#who');
            this.whisperDOM.on('click', viewWhisper);
            $(this.paperDOM.find('[data-role="close"]')).on('click', this.speech);
            Trigger.register('Manage-Whisper', function(whisperID) {
                this.whisperID = whisperID;
                var user = this.users[this.whisperID];
                if (user) {
                    this.whisper(user['userName']);
                    whisper();
                }
            }.bind(this));
        },

        'initRank': function() {
            this.rankDOM = $('#rankArea').i18nHTML(TEMPLATE['RANK']);
            this.onlineTotal = $('#onlineTotal');
            this.onlineTotal.html(this.userOrder.store.length);
            var rankMoreDOM = $('#rankMore').on('click', function() {
                if (rankMoreDOM.hasClass('on')) {
                    current.more.addClass('hidden');
                    rankMoreDOM.removeClass('on');
                } else {
                    current.more.removeClass('hidden');
                    rankMoreDOM.addClass('on');
                }
            }.bind(this));
            var types = ['top7', 'top1'],
                items = [],
                tab = $('#rankTab'),
                list = $('#rankList'),
                item,
                data,
                template = TEMPLATE.GIFT,
                temp,
                current;
            var itemRank = this.itemRank = {},
                datasource = DATASOURCE['Other']['rank_list_info'],
                orderRank = this.orderRank = {},
                hashRank = this.hashRank = {},
                order, hash;
            if(datasource['top1'] && datasource['top1']['rank_list'])
            {
                datasource['top1']['rank_list'].forEach(function(it, i) {
                    it['roomCost'] = it['rankCost'];
                });
            }
            $.each(types, function(index, type) {
                order = orderRank[type] = new Order({
                    'initial': datasource[type]['rank_list'],
                    'value': function(data) {
                        return UserHelper.consume(data, type);
                    }
                });
                var field = type == 'top1' ? 'roomCost' : 'rankCost',
                    hash = hashRank[type] = {};
                order.store.forEach(function(item, i) {
                    hash[item['userId']] = item;
                });
                var item = itemRank[type] = {
                    'index': index,
                    'type': type,
                    'tab': temp = tab.find('[data-role="' + type + '"]'),
                    'element': temp,
                    'list': list.find('[data-role="' + type + '"]'),
                    'data': order.store, //DATASOURCE['Other']['rank_list_info'][type]['rank_list'],
                    'order': order,
                    'hash': hash
                };
                var itemList = item['list'];
                item['rank3'] = itemList.find('[data-role="rank3"]');
                item['rank7'] = itemList.find('[data-role="rank7"]');
                item['more'] = itemList.find('[data-role="more"]');
                item['enter'] = function() {
                    if (!this.init) {
                        this.init = true;
                        if (!this.data)
                            return;
                        var rank3 = [],
                            rank7 = [],
                            portrait,
                            nickname,
                            rankCost,
                            vipType;
                        this.data.forEach(function(item, index) {
                            portrait = UserHelper.portrait(item['headPic']);
                            nickname = item['nickName'] || item['userName'];
                            rankCost = item[field],
                                vipType = item['userAttr'][3];
                            if (index < 3)
                                rank3.push(stringFormat(TEMPLATE['RANK_3'],
                                    portrait,
                                    STRING_EMPTY,
                                    STRING_EMPTY,
                                    nickname,
                                    rankCost,
                                    vipType > 0 ? (vipType > 1 ? '<span class="svip_flag"></span>' : '<span class="vip_flag"></span>') : ''
                                ));
                            else if (index < 7)
                                rank7.push(stringFormat(TEMPLATE['RANK_7'],
                                    index + 1,
                                    portrait,
                                    nickname,
                                    STRING_EMPTY,
                                    STRING_EMPTY,
                                    rankCost,
                                    vipType > 0 ? (vipType > 1 ? '<span class="svip_flag"></span>' : '<span class="vip_flag"></span>') : ''
                                ));
                        }.bind(this));
                        this.rank3.html(rank3.join(STRING_EMPTY));
                        this.rank7.html(rank7.join(STRING_EMPTY));
                    }
                    this.tab.addClass('select');
                    this.list.removeClass('hidden');
                    current = this;
                }.bind(item);
                item['quit'] = function() {
                    this.tab.removeClass('select');
                    this.list.addClass('hidden');
                    this.more.addClass('hidden');
                    rankMoreDOM.removeClass('on');

                }.bind(item);
                items.push(item);
            });
            this.rankMutex = new(Kit.use('Mutex'))({
                'items': items
            });
        },

        'initEmoji': function() {
            var isHost;
            isHost = (isHost = DATASOURCE['identity']) && (isHost['userId'] == DATASOURCE['room']['roomUserId'])
            this.emojiDOM = $('#emoji');
            this.faceDOM = $('#face');
            var range = this.faceDOM.find('[data-role="list"]'),
                list = range.find('ul'),
                tab = this.faceDOM.find('[data-role="tab"]'),
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

            function wrapCode(code) {
                return '[' + code + ']';
            }

            var level = DATASOURCE['identity'] ? DATASOURCE['identity']['userLevel'] : 0,
                vipType = DATASOURCE['identity'] ? DATASOURCE['identity']['vipType'] : 0,
                lock;

            var dict = {};

            face.forEach(function(group, index) {
                item = {
                    'index': index,
                    'element': $(stringFormat(groupTemplate, Environment.drawImage(group['iconUrl']))).appendTo(tab),
                    'list': $(list[index]).html(group['vals'].map(function(f, j) {
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
            });
            this.emojiMutex = new(Kit.use('Mutex'))({
                'items': items
            });
            this.emojiDOM.on('click', function() {
                if (this.faceDOM.is(':visible'))
                    this.faceDOM.safeHide();
                else
                    this.faceDOM.safeShow();
            }.bind(this));
            list.on('click', '[data-code]', function(evt) {
                var target = $(evt.currentTarget),
                    code = target.data('code'),
                    level = target.data('level');
                //this.faceDOM.safeHide();
                if (!code)
                    return;
                code = wrapCode(code);
                var advance = parseInt(target.data('advance'));
                if (advance) {
                    if (!UserHelper.validate())
                        return;
                    var left = target.position().left,
                        top = target.position().top - 55 + 'px',
                        right = 0,
                        h_style;
                    h_style = left <= 110 ? ' left:' + left + 'px' : ' right:' + parseInt((285 - left) / 55) * 55 + 'px';
                    if (level) {
                        Trigger.emit(CONST.Event.PopupText, [this.faceDOM, '<p class="lock_tip" style="' + h_style + ';top:' + top + ';">' + stringFormat(i18nTranslate('Room_TounlockInLevel'), level) + '<em style="left: 41px;"></em></p>']);
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
                    this.say();
                } else
                    this.messageDOM.val(this.messageDOM.val() + code);
                this.faceDOM.safeHide();
            }.bind(this));
            ClickCollect.register('emoji', this.faceDOM);

            function preview(code, index) {
                var url = dict[wrapCode(code)];
                if (!url)
                    return;
                var style = index % 6 <= 2 ? 'side1' : 'side2';
                if (previewStyle != style) {
                    previewDOM.removeClass(previewStyle).addClass(style);
                    previewStyle = style;
                }
                previewDOM.html(stringFormat(imageTemplate, DOMAIN_CONFIG['IMAGE_DOMAIN'] + url));
            }

            var previewDOM = range.find('.emoji_preview'),
                previewStyle;
            list.on('mouseenter', '[data-advance]', function(evt) {
                var target = evt.currentTarget;
                if (!target)
                    return;
                target = $(target);
                if (parseInt(target.attr('data-advance')) == 1)
                    preview(target.attr('data-code'), target.index());
            }.bind(this));
            list.on('mouseleave', function(evt) {
                previewDOM.removeClass(previewStyle).html(STRING_EMPTY);
                previewStyle = null;
            }.bind(this));
        },

        'initFlower': function() {
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
            var clock = function(initial) {
                clearTimeout(countdownTimeout);
                if (initial)
                    total = Math.floor(initial / second);
                minutes = Math.floor(total / minute);
                seconds = total % minute;
                timerDOM.html(stringFormat(i18nTranslate('Room_GetFlowerTime'), minutes, seconds));
                if (--total >= 0)
                    countdownTimeout = setTimeout(clock, second);
            }.bind(this);
            var put = this.putFlower = function(result) {
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
            (pick = function() {
                clearTimeout(this.flowerTimeout);
                Bussiness.postData(url, param, put);
            }.bind(this))();
        },

        'initManage': function() {
            var self = DATASOURCE['identity'],
                hidden = ' hidden';
            var selfType, selfHost, selfRoomAdmin;
            if (!self)
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

            var render = function() {
                this.manageDOM.safeHide();
                var target = this.users[this.manageID];
                if (!target)
                    return false;
                var temp, targetType = target['adminType'],
                    targetRoomAdmin = target['roomAdmin'],
                    targetGuest = target['userType'] == 1,
                    targetSVIP = (temp = target['userAttr']) && (temp = temp[CONST.UserAttr.Member]) && (temp == CONST.MemberType.SVIP),
                    right;
                if (targetType == AdminType.Host && this.manageID != DATASOURCE['room']['roomUserId'])
                    targetType = AdminType.User;
                temp = selfHost && targetType != AdminType.Host && targetType != AdminType.Constable && !targetGuest;
                this.manageDOM.i18nHTML(
                    stringFormat(TEMPLATE['MANAGE'],
                        UserHelper.portrait(target['headPic']),
                        target['userName'],
                        this.manageID,
                        stringFormat(TEMPLATE['MENU'],
                            selfHost && targetSVIP ? STRING_EMPTY : hidden,
                            temp && !targetRoomAdmin ? STRING_EMPTY : hidden,
                            temp && targetRoomAdmin ? STRING_EMPTY : hidden,
                            right = adminRight(targetType, targetRoomAdmin) ? STRING_EMPTY : hidden,
                            right)));
                return true;
            }.bind(this);

            var location = function manage(target) {
                var position = {
                    'left': 0 + correction['left'],
                    'top': target.offset()['top'] - this.roomRightDOM.offset()['top'] + correction['top']
                };
                this.manageDOM.css(position).safeShow();
            }.bind(this);

            var manage = function(evt) {
                var target = $(evt.currentTarget);
                var manageID = target.data('identity');
                selfType = self['userType'];
                selfRoomAdmin = self['roomAdmin'];
                if (selfType == AdminType.Host && DATASOURCE['identity']['userId'] != DATASOURCE['room']['roomUserId'])
                    selfType = AdminType.User;
                switch (selfType) {
                    case AdminType.User:
                    case AdminType.Bussiness:
                    case AdminType.Guy:
                        if (!selfRoomAdmin)
                            return;
                        break;
                }
                if (this.manageID == manageID || manageID == selfID)
                    return;
                this.manageID = manageID;
                if (render())
                    location(target);
            }.bind(this);

            this.roomRightDOM.on('click', '[data-identity]', manage);
            this.manageDOM.on('click', '[data-action]', function(evt) {
                var target = $(evt.currentTarget),
                    action = target.data('action');
                switch (action) {
                    case 'whisper':
                        Trigger.emit('Manage-Whisper', [this.manageID]);
                        this.rightSwitch(null, true);
                        break;
                    case 'admin':
                    case 'mute':
                    case 'out':
                        this.manage(action, this.manageID, parseInt(target.data('state')));
                        break;
                }
                this.manageDOM.safeHide();
                this.manageID = null;
            }.bind(this));
            ClickCollect.register('manage', this.manageDOM, function() {
                this.manageID = null;
            }.bind(this));
        },

        'initFollow': function() {
            var identity = DATASOURCE['identity'];
            var followDOM = $('#hostFollow'),
                followed, lock, followCSS = 'followed';
            if (followed = DATASOURCE['room']['userIsFavorite'])
                followDOM.addClass(followCSS);
            if (identity && !identity['host'])
                followDOM.safeShow();
            else
                followDOM.safeHide();
            followDOM.on('click', function() {
                if (!UserHelper.validate())
                    return;
                if (lock)
                    return;
                lock = true;
                Bussiness.postData(followed ? 'room_subFavorite.fly' : 'room_addFavorite.fly', {
                    'roomId': DATASOURCE['room']['roomId']
                }, function(result) {
                    if (result['code'] == 0) {
                        followed = !followed;
                        followDOM.html(parseInt(followDOM.text()) + 1 * (followed ? 1 : -1));
                        followDOM.toggleClass(followCSS);
                    }
                    lock = false;
                }.bind(this));
            }.bind(this));
        },

        'rightSwitch': function(evt, state) {
            var on = 'on',
                hidden = 'hidden';
            if (typeof state == 'undefined')
                state = this.rightSwitchDOM.hasClass(on);
            if (this.rightState == state)
                return;
            if (state) {
                this.uvDOM.addClass(hidden);
                this.ugcDOM.removeClass(hidden);
                this.rightSwitchDOM.removeClass(on);
            } else {
                this.ugcDOM.addClass(hidden);
                this.uvDOM.removeClass(hidden);
                this.rightSwitchDOM.addClass(on);
            }
            this.rightState = state;
        },

        'fans': function() {
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

        'fansCallback': function(cache, result) {
            if (result['code'] == 0)
                this.putFlower(result);
            this.flowerLock = false;
        },

        'say': function() {
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

        'sayCallback': function(cache, result) {
            var textNO;
            switch (result['code']) {
                case 34:
                    textNO = i18nTranslate('Room_System_BanText');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 800:
                    textNO = i18nTranslate('Room_System_SendMessageTooFast');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 55:
                    textNO = i18nTranslate('Room_System_SystemBusy');
                    tipType = CONST.ChatMode.Speech;
                    break;
                case 43:
                case 44:
                    textNO = i18nTranslate('Room_System_HostOffline');
                    tipType = CONST.ChatMode.Whisper;
                    break;
                    /* case 3003:
                         textNO = i18nTranslate('Room_BecomeSVIPtoPrivateChat');
                         tipType = CONST.ChatMode.Whisper;
                         break;*/
            }
            if (!textNO)
                return;
            this.notice(textNO, tipType);
        },

        'notice': function(content, mode) {
            this.chat({
                'system': true,
                'messageType': mode,
                'message': content
            }, true);
        },

        'give': function() {
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
                    Trigger.emit(CONST.Event.PopupText, [$('#listGoods'), '<div class="bag_tip">' + stringFormat(i18nTranslate('Room_PackTipCountLess'), maxCount) + '</div>']);
                    return;
                }
                $.extend(data, {
                    'action': 'special',
                    'special': this.giftId
                });
                Communicator.delegate(data, data, this.specialCallback);
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

        'specialCallback': function(cache, result) {
            if (result.code == 0) {
                var $packGift = $('#listGoods').find('[data-role="special"][data-giftid="' + this.giftId + '"]'),
                    nowCount = parseInt($packGift.data('count')) - cache.num;
                nowCount <= 0 ? $packGift.hide() : $packGift.data('count', nowCount).find('.bag_num').html(nowCount);
            }
        },

        'giftCallback': function(cache, result) {
            switch (result.code) {
                case 0:
                    var data = result['dataInfo'];
                    this.myBalanceDOM.html(data['balance'] + data['returnBalance']);
                    break;
                case 35:
                    Trigger.emit(CONST.Event.PopupTip, [{
                        'isBind': true,
                        'top': '100px'
                    }]);
                    break;
                default:
                    break;
            }
        },

        'preview': function(giftId, index) {
            var gift = DATASOURCE['gift'][giftId];
            if (!gift)
                return;
            var url = gift['web'];
            if (url.toLowerCase().lastIndexOf('.swf') == (url.length - 4))
                url = gift['url']
            if (!url)
                return;
            var style = index % 7 <= 3 ? 'side1' : 'side2';
            if (this.previewStyle != style) {
                this.previewDOM.removeClass(this.previewStyle).addClass(style);
                this.previewStyle = style;
            }
            this.previewDOM.html(stringFormat(TEMPLATE['PREVIEW'], DOMAIN_CONFIG['IMAGE_DOMAIN'] + url, gift[I18N.language]['name'], gift['cbalance']));
        },

        'join': function(data, force) {
            var userId = data['userId'],
                temp;
            if (userId == ((temp = DATASOURCE['identity']) && (temp = temp['userId'])))
                DATASOURCE['identity']['roomAdmin'] = data['roomAdmin'];
            var item = this.users[userId];
            if (this.users.hasOwnProperty(userId) && !force) {
                item.element.removeClass('off');
                return;
            }
            var position = this.userOrder.insert(data);
            this.users[userId] = data;
            this.onlineTotal.html(this.userOrder.store.length);
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
                stringFormat(classTempate, className + ' ' + memberCSS),
                data['userId'], STRING_EMPTY, UserHelper.portrait(data['headPic']), nickname, UserHelper.level(data), UserHelper.badge(data))
            element = $(html);
            data['element'] = element;
            if (position == 0)
                this.rosterDOM.prepend(element);
            else if (position >= this.rosterDOM.children().length)
                this.rosterDOM.append(element);
            else
                this.rosterDOM.find('li:eq(' + position + ')').before(element);
            UIHelper.refreshScroller(this.rosterPanel);
            var Limo = DATASOURCE['limo'],
                limo;
            limo = (limo = data['showCar']) && (limo = data['car']) && (limo = Limo[limo]);
            if (limo)
                Magic.driveCar({
                    'url': DOMAIN_CONFIG['IMAGE_DOMAIN'] + limo['webResource'],
                    'id': limo['name'],
                    'caption': nickname
                });
            if (data['car'] && Limo[data['car']]) {
                this.limoDOM.prepend($(stringFormat(TEMPLATE['LIMO'], Environment.drawImage(DATASOURCE['limo'][data['car']]['webPic']), STRING_EMPTY, nickname, userId)));
                var num = this.roomLeftDOM.find('[data-role="carNum"]').html();
                this.roomLeftDOM.find('[data-role="carNum"]').html(parseInt(num) + 1);
                UIHelper.updateScroller(this.limoPanel, true);
            }
            if (data['userAttr'] && data['userAttr'][CONST.UserAttr.Member] > 0)
                this.notice(stringFormat(i18nTranslate('Room_System_WelcomeVipMember'), data['userName']), 2);
            //else (data['userAttr'][CONST.UserAttr.Member] = 2)
            //    this.notice(stringFormat(i18nTranslate('Room_System_WelcomeSVipMember'), data['userName']));
        },

        'leave': function(data) {
            console.log('out');
            var userId = data['toUserId'];
            var item = this.users[userId];
            var className = STRING_EMPTY;
            if(item['roomAdmin']){
                item.element.addClass( 'off');
                return;
            }
            this.userOrder.remove(item);
            //delete this.users[userId];
            item.element.remove();
            this.onlineTotal.html(this.userOrder.store.length);
            UIHelper.refreshScroller(this.rosterPanel);
            var carNum = this.roomLeftDOM.find('[data-role="carNum"]').html();
            var limoDOM = this.limoDOM.find('[data-identity="' + userId + '"]');
            if (limoDOM.length > 0) {
                limoDOM.remove();
                this.roomLeftDOM.find('[data-role="carNum"]').html(parseInt(carNum) - 1);
                UIHelper.updateScroller(this.limoPanel, true);
            }
        },

        'chat': function(data, unsafe) {
            var ChatMode = CONST.ChatMode,
                message = data['message'],
                self = ' class="self"',
                isSelf = false,
                isHost = false,
                memberCSS = STRING_EMPTY,
                temp;
            if (temp = DATASOURCE['identity']) {
                isSelf = data['userId'] == temp['userId'],
                    isHost = temp['userId'] == DATASOURCE['room']['roomUserId'];
                    memberCSS = CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0];
            }
            var isHostSend = data['userId'] == DATASOURCE['room']['roomUserId'];
            if (!unsafe)
                message = MessageHelper.safe(message);
            message = MessageHelper.format(message,data['richLevel'],data['userAttr'],isHostSend);
            switch (data['messageType']) {
                case ChatMode.Whisper:
                    if (this.secretDOM.is(':hidden')) {
                        this.whisperDOM.find('em').removeClass('hidden')
                    }
                    var room = DATASOURCE['room'];
                    if (data['userId'] == room['roomUserId'] && isHost)
                        this.secretDOM.append(stringFormat(TEMPLATE['WHISPER1'],
                            isSelf ? self : STRING_EMPTY,
                            room['roomUserName'],
                            data['toUserName'],
                            message));
                    else
                        this.secretDOM.append(stringFormat(TEMPLATE['WHISPER2'],
                            isSelf ? self : STRING_EMPTY,
                            isHost ? stringFormat(' data-identity="{0}"', data['userId']) : STRING_EMPTY,
                            data['userName'] || '',
                            message));
                    var delta = this.paperPanel.scrollTop = this.paperPanel.scrollHeight - this.paperPanel.offsetHeight;
                    if (delta > 0)
                        Ps.update(this.paperPanel);
                    break;
                case ChatMode.Speech:
                default:
                    if (data['system'])
                        this.chatroomDOM.append(stringFormat(TEMPLATE['CHAT_SYSTEM'], message));
                    else {
                        var adminTag = STRING_EMPTY;
                        switch (data['adminType']) {
                            case CONST.AdminType.Host:
                                adminTag = 'host';
                                break;
                            case CONST.AdminType.Constable:
                                adminTag = 'constable';
                                break;
                        }
                        this.chatroomDOM.append(stringFormat(TEMPLATE['CHAT'],
                            stringFormat(classTempate, (isSelf ? 'self' : STRING_EMPTY) + ' ' + memberCSS + ' ' + adminTag),
                            data['userId'],
                            adminTag ? '<span class="type"></span>' : STRING_EMPTY,
                            data['userName'], STRING_EMPTY, UserHelper.badge(data), message
                        ));
                    }
                    if (this.screenLock)
                        UIHelper.refreshScroller(this.chatroomPanel);
                    else
                        UIHelper.updateScroller(this.chatroomPanel);
            }
        },

        'giving': function(data) {
            var giftId = data['giftId'],
                gift = DATASOURCE['gift'][giftId];
            Counting.update(data['giftNum'] * gift['cbalance']);
            var url = gift['web'].toLowerCase(),
                nickname = data['userName'],
                name = gift['name'],
                num = data['giftNum'],
                badge = UserHelper.badge(data);
            if (this.smallGift.indexOf('|' + giftId + '|') < 0) {
                var edge = url.length - 4;
                if (url.lastIndexOf('.swf') == edge)
                    Magic.playMagic({
                        'url': DOMAIN_CONFIG['IMAGE_DOMAIN'] + url,
                        'id': name,
                        'caption': nickname
                    });
                else if (url.lastIndexOf('.gif') == edge)
                    this.giftQueue.enqueue({
                        'url': url,
                        'caption': nickname
                    });
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
                this.batchQueue.enqueue({
                    'level': temp,
                    'pic': pic || STRING_EMPTY,
                    'nickname': nickname,
                    'num': num,
                    'gift': name,
                    'hit': hits
                });
            }
            var tempNum = num - 99;
            if (tempNum < 1)
                tempNum = 1;
            var delta = num - tempNum + 1;
            var children = this.dessertDOM.children().length;
            if ((delta = (children + delta) - 100) > 0);
            $('li:lt(' + delta + ')', this.dessertDOM).remove();
            for (var i = tempNum; i <= num; i++)
                this.recordQueue.enqueue({
                    'member': CONST.MemberTag[(temp = (temp = data['userAttr']) && (temp = temp[CONST.UserAttr.Member])) || 0],
                    'nickname': nickname,
                    'badge': badge,
                    'name': name,
                    'num': i
                });

            for (var type in this.orderRank) {
                var order = this.orderRank[type],
                    position = order.locate(data);
                if (position < 7) {
                    var userId = data['userId'],
                        hash = this.hashRank[type],
                        field = type == 'top1' ? 'roomCost' : 'rankCost';
                    if (hash.hasOwnProperty(data['userId'])) {
                        var item = hash[userId];
                        item[field] = data[field];
                        order.value(item, true);
                        if (order.get(position) != item)
                            order.sort();
                    } else {
                        if(this.users[userId])
                            data['headPic'] = this.users[userId]['headPic'];
                        order.insert(data);
                        hash[userId] = data;
                        var abandon = order.maintain(7);
                        if (abandon)
                            abandon.forEach(function(item, i) {
                                delete hash[[item]['userId']];
                            });
                    }
                    this.itemRank[type].init = false;
                }
            }
            this.rankMutex.refresh();
            /* valentine add */
            if (Object.keys(this.valentine_gift).indexOf(giftId + '') > -1) {
                this.valentine_curNum += data['giftNum'] * this.valentine_gift[giftId];
                if (this.valentine_curNum > this.valentine_tarNum) {
                    this.refresh_valentine_bar(true);
                } else {
                    this.refresh_valentine_bar();
                }
            }
            /* valentine add*/
        },

        'flower': function(data) {
            data['messageType'] = CONST.ChatMode.Speech;
            data['message'] = stringFormat(limitImageTemplate, Environment.drawImage('systemRes/img/hall_img/rose_min.png'), 45);
            this.chat(data, true);
            this.hostGoodNumDOM.html(data['roomGoodNum']);
        },

        'manage': function(action, manageID, state) {
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

        'admin': function(data) {
            var userID = data['toUserId'],
                user = this.users[userID];
            if (!user)
                return;
            var state = user.roomAdmin = data['toRoomAdmin'];
            user.element[state ? 'addClass' : 'removeClass']('manager');
            if (DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == userID))
                DATASOURCE['identity']['roomAdmin'] = state;
        },

        'marquee': function(data) {
            var param = data['param'];
            switch (data['type']) {
                case 4:
                    this.marqueeQueue.enqueue(stringFormat(TEMPLATE.MARQUEE,
                        param['nickName'], param['expire']));
                    break;
                case 3:
                    Trigger.emit(CONST.Event.ActivityFetch, [data['param']['next']]);
                    break;
            }
        },

        'promote': function(data) {
            console.log('update');
            var userId = data['userId'];
            var item = this.users[userId];
            this.userOrder.remove(item);
            item.element.remove();
            //item['userAttr'] = data['userAttr'];
            this.join(data, true);
        },

        'localize': function() {
            var language = I18N.language;
            if (this.sign)
                this.sign.localize();
            /*if (top_util) {
             top_util.reset_popup_message();
             }*/
        },

        'kickOutPop':function(data){

            if($('.popupStop').size()>=1){
                return ;
            }

            if(window['noReads'].length>0){
                data=window['noReads'].shift();
            }else{
                return ;
            }

            var that=this;
            var TEMPLATE={
                'POPUP':'<div class="popupStop {0}" >\
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
                'POPUP2':'<div class="popupStop {0}" >\
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



            var bShowMore='';
            if($.trim(data.prompt).length<=0){
                bShowMore="popHide";
            }else{
                bShowMore="";
            }

            if(data.language==3){
                if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                    renderPop(0,bShowMore,data);
                }

            }else if(data.language==1){
                if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                    renderPop(1,bShowMore,data);
                }
            }

            function renderPop(way,bShowMore,data){

                var oPopInfo= {
                    'popTitle': ['Notice of stop broadcasting', 'إخطار إيقاف البث'],
                    'reasonTitle': ['reason', 'السبب'],
                    'moreTitle': ['more', 'المزيد'],
                    'confirm': ['confirm', 'تأكيد'],
                    'check': ['check', 'فحص'],
                    'hoursPrefix': ['The broadcast has been stopped, will be deducted for', 'تم إيقاف البث وخصم منك عدد '],
                    'hoursSuffix': ['hours', ' ساعة']
                };

                if(data['deductionTime']>0){
                    var fTemphours=parseInt(data['deductionTime']/60);
                    if(way==0){
                        $(stringFormat(TEMPLATE.POPUP,'',oPopInfo["popTitle"][0],dateTime.fulltime(new Date()),oPopInfo["hoursPrefix"][0],fTemphours,oPopInfo["hoursSuffix"][0],oPopInfo["reasonTitle"][0],data['reason'],bShowMore,oPopInfo["moreTitle"][0],data['prompt'],oPopInfo["confirm"][0],oPopInfo["check"][0])).appendTo($(document.body));
                    }else if(way==1){
                        $(stringFormat(TEMPLATE.POPUP,' arabic arabicFF ',oPopInfo["popTitle"][1],dateTime.showtime(new Date()),oPopInfo["hoursPrefix"][1],fTemphours,oPopInfo["hoursSuffix"][1],oPopInfo["reasonTitle"][1],data['reason'],bShowMore,oPopInfo["moreTitle"][1],data['prompt'],oPopInfo["confirm"][1],oPopInfo["check"][1])).appendTo($(document.body));
                    }

                }else{
                    if(way==0){
                        $(stringFormat(TEMPLATE.POPUP2,'',oPopInfo["popTitle"][0],dateTime.fulltime(new Date()),data['reason'],bShowMore,oPopInfo["moreTitle"][0],data['prompt'],oPopInfo["confirm"][0])).appendTo($(document.body));
                    }else if(way==1){
                        $(stringFormat(TEMPLATE.POPUP2,' arabic arabicFF ',oPopInfo["popTitle"][1],dateTime.showtime(new Date()),data['reason'],bShowMore,oPopInfo["moreTitle"][1],data['prompt'],oPopInfo["confirm"][1])).appendTo($(document.body));
                    }
                }

                //"×"关闭弹窗
                $('.btn_close').bind('click', function() {
                    var iInfoId='/service/room/v3/host/checked/'+data['id'];
                    var _this=$(this);
                    $.ajax({
                        url: iInfoId,
                        type: 'POST',
                        success: function( response ) {
                            if(response['code']==0){
                                _this.parents('.popupStop').remove();
                                that.kickOutPop();
                            }
                        }
                    });

                })
                //确认按钮关闭
                $('.btnBox a.actived').bind('click', function() {
                    var iInfoId='/service/room/v3/host/checked/'+data['id'];
                    var _this=$(this);
                    $.ajax({
                        url: iInfoId,
                        type: 'POST',
                        success: function( response ) {
                            if(response['code']==0){
                                _this.parents('.popupStop').remove();
                                that.kickOutPop();
                            }
                        }
                    });
                })
                //显示隐藏更多
                $('.moreDown').each(function(){
                    $(this).click(function(){
                        $(this).toggleClass('moreUp');
                        $(this).parents('.moreInfo').find('.popHide').toggle();
                    });
                });
            }
        },
        'notClosedPop':function(){
           var _this=this;
            if(DATASOURCE['identity'] && (DATASOURCE['identity']['userId'] == DATASOURCE['room']['roomUserId'])){
                var sRoomIdUrl='/service/room/v3/host/stoplive/'+DATASOURCE['room']['roomId'];
                $.get(sRoomIdUrl,
                    function(data){
                        if(data['code']==0){
                            if(data['dataInfo'].length>0){
                                window['noReads']= window['noReads'] || [];
                                for(var i=0;i<data['dataInfo'].length;i++){
                                    window['noReads'].push(data['dataInfo'][i]);
                                }
                                _this.kickOutPop();
                            }
                        }
                    })
            }
        },

        //'nextPOP':function(){
        //    if(window['noReads'].length>0 ){
        //       this.kickOutPop(window['noReads'][0]);
        //    }
        //},
        //主播开播话题
        'Broadcast':function(){
            var PopupTips={
                'show_Broadcast': '<div id="notice_popup" class="notice_popup">\
                    <div class="notice_wrap">\
                        <h2 >{0}</h2>\
                        <div id="notice_container">\
                            <p id="notice_content" class="notice_content" >{1}<span>{2}</span>{3}</p>\
                            <p class="notice_input">\
                                <textarea id="notice_input" maxlength="70" cols="30" rows="10" placeholder="{4}"></textarea>\
                            </p>\
                            <div class="notice_ok_tips">\
                            <p id="notice_ok_tips"></p>\
                            </div>\
                        </div>\
                        <div class="notice_ok">\
                            <span id="notice_ok">{5}</span>\
                        </div>\
                        <div class="notice_ok_close">\
                            <span id="notice_ok_close" >{5}</span>\
                        </div>\
                        <span  id="btn_close" class="btn_close"></span>\
                    </div>\
                    <div class="bg"></div>\
                </div>'
            }
            var PopupContent={
                'show_Broadcast_content':{
                    'Title':["Broadcast Topic","موضوع العرض "],
                    'word_number':["You can't input more than ","70"," characters.","أكتب موضع العرض ، بحيث لا يتجاوز موضوعك أكثرمن ","70"," حرف "],
                    'placeholder':["Please choose your broadcast topic and attract more users.","الرجاء كتابة موضوع العرض ، لجذب أكبر عدد من المستخدمين "],
                    'click_ok':["OK","تأكيد "],
                    "topic_success":["Broadcast topic is successfully published!","تم نشر موضوع العرض"],
                    "topic_fale":["Broadcast topic publishing is failed!","فشل في نشر موضوع العرض"]
                }
            }
            var language=getLanguage();
            var PopupContent=PopupContent['show_Broadcast_content'];
            if(language == 'en'){
                var en_content=stringFormat(PopupTips['show_Broadcast'],PopupContent['Title'][0],PopupContent['word_number'][0],PopupContent['word_number'][1],PopupContent['word_number'][2],PopupContent['placeholder'][0],PopupContent['click_ok'][0]);
                $(document.body).append(en_content)
            }else{
                var aria_content=stringFormat(PopupTips['show_Broadcast'],PopupContent['Title'][1],PopupContent['word_number'][3],PopupContent['word_number'][4],PopupContent['word_number'][5],PopupContent['placeholder'][1],PopupContent['click_ok'][1]);
                $(document.body).append(aria_content);
                $("#notice_popup").css({"direction":"rtl","fontFamily":"Al-Jazeera-Arabic-Bold"});
                $("#notice_content").css("margin","15px 54px 0 0");
            }
            if(localStorage.content){
                var detal_content = localStorage.content;
                //if(detal_content !=="" || detal_content !== 'underfine'){
                    $("#notice_input").val(detal_content);
                    $("#btn_close").removeClass("hidden");
                //}
                    $("#btn_close").click(function(){
                         $(this).parents(".notice_popup").remove();
                     });
            }else{
                $("#btn_close").addClass("hidden");
            }
            $("#notice_ok").bind("click",function(){
                var topic_title=$(".notice_wrap h2").text();
                var topic_content=$("#notice_input").val();
                topic_content= $.trim(topic_content);
                if(topic_content == 'null' || topic_content == '' || topic_content.length > 70) {
                    if(language == 'en'){
                        $("#notice_ok_tips").text("Broadcast topic publishing is failed!")
                    }
                    else{
                        $("#notice_ok_tips").text("فشل في نشر موضوع العرض")
                        $("#notice_ok_tips").css('margin','15px 54px 0 0 ');
                    }
                    $("#notice_ok_tips").css("color","red");
                    $("#notice_input").keyup(function(){
                        $("#notice_ok_tips").text('')
                    });
                    return;
                }else{
                    localStorage.content=topic_content;
                    if(localStorage.content){
                        $("#show_Ring").removeClass("hidden");
                    }else{
                        $("#show_Ring").addClass("hidden");
                    }
                    Communicator.delegate({'commandId':31,'topic':topic_content,'roomId': DATASOURCE['room']['roomId']},null,function(cache, result) {
                        if (result['code'] == 0) {
                            if(language== 'en'){
                                $("#notice_container").text("Broadcast topic is successfully published!");
                                $("#notice_container").css({"textAlign":"center","height":"185px","lineHeight":"185px"});
                                $("#notice_ok").remove();
                            }else{
                                $("#notice_container").text("تم نشر موضوع العرض");
                                $("#notice_container").css({"textAlign":"center","height":"185px","lineHeight":"185px"});
                                $("#notice_ok").remove();
                            }
                            $(".notice_ok_close").css("display","block");
                            $("#notice_ok_close").on("click",function(){
                                $(this).parents(".notice_popup").remove()
                            })
                        }
                    });
                }
            });
            function getCookie(name) {
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }
            function getLanguage(){
                var language=getCookie("locale");
                if(!language|language==""|language=='null'| language == 'en'){
                    language='en';
                }
                else{
                    language='ar';
                }
                return language;
            }
        },
        'show_Broadcast_self':function(){
            if(DATASOURCE['identity'] == undefined || DATASOURCE['identity']['userId'] !== DATASOURCE['room']['roomUserId']){
                $("#show_Ring").addClass("hidden")
            }else{
                if(!localStorage.content){
                    $("#show_Ring").addClass("hidden")
                }else {
                    $("#show_Ring").removeClass("hidden")
            }

            }
        }
        //'start_radio_change':function(){
        //    if(localStorage.content){
        //        $("#show_Ring").removeClass("hidden");
        //    }else{
        //        $("#show_Ring").addClass("hidden");
        //    }
        //}

    };

    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
    fbq('track', 'AddToCart');
});