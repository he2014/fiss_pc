define(function(require){
    var Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'];
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        Bridge=Utility['Bridge'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        _nav=Body.nav,
        _task = Body.TASKS,
        Footer=Body.Footer;
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),
        UserTop=require('component/userTop');
    var TEMPLATE={
        'MAIN':'<div class="content" id="content">\
                    <div class="pop_rank">\
                        <div class="TopList TopLeft" id="rank1">\
                            <h2 class="TopName" data-i18n="Rank_Wealth">{{Rank_Wealth}}</h2>\
                            <div class="TipMenus">\
                                <a class="Day rank0" href="javascript:;" onclick="Page.load_rich_rank(0);" data-i18n="Rank_Day">{{Rank_Day}}</a>\
                                <a class="Week rank1" href="javascript:;" onclick="Page.load_rich_rank(1);" data-i18n="Rank_Week">{{Rank_Week}}</a>\
                                <a class="Month rank2" href="javascript:;" onclick="Page.load_rich_rank(2);" data-i18n="Rank_Month">{{Rank_Month}}</a>\
                            </div>\
                            <div class="userList"><ul class="userDetail"></ul></div>\
                        </div>\
                        <div class="TopList TopCenter" id="rank3">\
                            <h2 class="TopName" data-i18n="Rank_Gifts">{{Rank_Gifts}}</h2>\
                            <div class="TipMenus">\
                                <a class="Day rank0" href="javascript:;" onclick="Page.load_gift_rank(0);" data-i18n="Rank_Day">{{Rank_Day}}</a>\
                                <a class="Week rank1" href="javascript:;" onclick="Page.load_gift_rank(1);" data-i18n="Rank_Week">{{Rank_Week}}</a>\
                                <a class="Month rank2" href="javascript:;" onclick="Page.load_gift_rank(2);" data-i18n="Rank_Month">{{Rank_Month}}</a>\
                            </div>\
                            <div class="userList"><ul class="userDetail"></ul></div>\
                        </div>\
                        <div class="TopList TopRight hidden" id="rank2">\
                            <h2 class="TopName" data-i18n="Rank_Flowers">{{Rank_Flowers}}</h2>\
                            <div class="TipMenus">\
                                <a class="Day rank0" href="javascript:;" onclick="Page.load_flower_rank(0);" data-i18n="Rank_Day">{{Rank_Day}}</a>\
                                <a class="Week rank1" href="javascript:;" onclick="Page.load_flower_rank(1);" data-i18n="Rank_Week">{{Rank_Week}}</a>\
                                <a class="Month rank2" href="javascript:;" onclick="Page.load_flower_rank(2);" data-i18n="Rank_Month">{{Rank_Month}}</a>\
                            </div>\
                            <div class="userList"><ul class="userDetail"></ul></div>\
                        </div>\
                    </div>\
                    <div data-role ="ce_nav"></div>\
                    <div class="hidden" id="task_tan"></div>\
					<div class="task_con" data-role ="task"></div>\
                    </div>'
    };

    var Page =window['Page']= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
            this.identifyFlow();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.container.find('[data-role="task"]').i18nHTML(_task.html());
            $('.menu_nav a[href="/rank.shtml"]').attr({'target':'_self'}).addClass('active');
        },
        compose:function(){
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
        },
        bind:function(){

        },
        start:function(){
			
        },
       
        'identifyFlow': function() {
            this.promise = new Promise(this.listRanks.bind(this)).then(this.identify.bind(this)).then(this.message.bind(this)) //move method identity to utility
                .then(this.identified.bind(this));
        },
        'message':function(){
        	Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
        			if(data.code==0){
        				 this.messages_length = data['dataInfo']['list'].length;
        			}
                  this.promise.resolve();
			}.bind(this),null,true);
        },
        'listRanks':function(){
            var url='service/room/v3?ftv=&fwv=&fmv=&gtv=&gwv=&gmv=&rtv=&rwv=&rmv=';
            Bussiness.getData(url, function(data) {
                Page['listRank']=data;
                this.promise.resolve();
            }.bind(this),'','v3');
        },
        'identify': function() {
           this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            if (user)
                return this.identity = JSON.parse(user);
            // else {
            //     var userName = Cookie.get(Cookie.key['login_name']);
            //     if (!userName)
            //         return 'anonymous';
            //     Bussiness.postData('user_init_user_info.fly', {
            //         'loginName': userName
            //     }, function(data) {
            //         if (data && data.code == 0)
            //             this.promise.resolve(this.identity = data);
            //         else
            //             this.promise.resolve();
            //     }.bind(this), function() {
                    this.promise.resolve();
            //     }.bind(this));
            // }
        },
        'identified': function() {
        	//console.log(this)
            Header.identified(this.identity);
	     	 _nav.identified(this.identity,this.messages_length);
	        _task.identified(this.identity);
            this.load_rich_rank(0);
            this.load_gift_rank(0);
            this.load_flower_rank(0);
        },
//      wealth排行榜
        'load_rich_rank':function(idx){
            var rich_data = [];
            var richDate=['rti','rwi','rmi'];
            $(".TopLeft a").removeClass("underline");
            $(".TopLeft a").eq(idx).addClass("underline");
            if(Page['listRank']['dataInfo'][richDate[idx]]){
                rich_data =  Page['listRank']['dataInfo'][richDate[idx]]['dt'];
            }
            this.load_rank_data(rich_data,'rank1',idx);
//          console.log(rich_data)
        },
//      gifts排行榜
        'load_gift_rank':function(idx){
            var gift_data = [];
            var giftDate=['gti','gwi','gmi'];
            $(".TopCenter a").removeClass("underline");
            $(".TopCenter a").eq(idx).addClass("underline");
            if(Page['listRank']['dataInfo'][giftDate[idx]]){
                gift_data =  Page['listRank']['dataInfo'][giftDate[idx]]['dt'];
            }
            this.load_rank_data(gift_data,'rank3',idx);
        },
        'load_flower_rank':function(idx){
            var flower_data = [];
            var flowerDate=['fti','fwi','fmi'];
            $(".TopRight a").removeClass("underline");
            $(".TopRight a").eq(idx).addClass("underline");
            if(Page['listRank']['dataInfo'][flowerDate[idx]]){
                flower_data =  Page['listRank']['dataInfo'][flowerDate[idx]]['dt'];
            }
            //this.load_rank_data(flower_data,'rank2',idx);
        },
        'load_rank_data':function(rank_data,id){
//      	console.log(rank_data)
            //Page.topData=rank_data;
            var html_str='';
            var count=0;
            var userRich = id !="rank1";
            if(rank_data){
                var length=rank_data.length;
                $.each(rank_data,function(idx,obj){
//              	console.log($(this)[0].vip)
					var vipcolor;
					if($(this)[0].vip==2){
						vipcolor=2;
					}else if($(this)[0].vip==1){
						vipcolor=1;
					}else{
						vipcolor=0;
					}
                    if(obj && count <= length){
                        count++;
						html_str+='<li '+(count< 2 ? 'class="col_th1 userInfo"':count< 3 ? 'class="col_th2 userInfo"':count< 4 ? 'class="col_th3 userInfo"':'class="userInfo"')+'><a '+(userRich?'href="live/'+obj['sf']+'" target="_blank"':'href="javascript:void(0);"')+'><span class="userReceived">'+ obj['va'] +'</span><span class="userName">'+obj['nn']+'</span>'+(obj['hp'] ? '<img '+(vipcolor> 1 ? 'class="usersvip userIco"':vipcolor> 0 ? 'class="uservip userIco"':'class="userIco"')+' src="/resource/' + obj['hp']+'" alt="">':'<img '+(vipcolor> 1 ? 'class="usersvip userIco"':vipcolor> 0 ? 'class="uservip userIco"':'class="userIco"')+' src="/resource/static/image/Top10/nophoto.jpg" alt="">')+'<i '+(count<2 ? 'class="userId col_th1_uId"':count<3 ? 'class="userId col_th2_uId"':count<4 ? 'class="userId col_th3_uId"': 'class="userId"')+'>'+(count<=3? '': count)+'</i></a></li>';

                    }
                });
           }
            for(var i =count;i<10;i++){
                count++;
				html_str+='<li '+(count< 2 ? 'class="col_th1 userInfo"':count< 3 ? 'class="col_th2 userInfo"':count< 4 ? 'class="col_th3 userInfo"':'class="userInfo"')+'><span class="userReceived"></span><span class="userName"></span><img class="userIco" src="/resource/static/image/Top10/nophoto.jpg" alt=""><i '+(count<2 ? 'class="userId col_th1_uId"':count<3 ? 'class="userId col_th2_uId"':count<4 ? 'class="userId col_th3_uId"': 'class="userId"')+'>'+(count<=3? '': count)+'</i></li>';
            }
            $("#"+id+" .userDetail").html(html_str);
            //this.top3();
        }
       
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});

