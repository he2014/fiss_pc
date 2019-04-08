define(function(require){
    var Utility = require('common/utility'),Promise = Utility['Promise'],stringFormat = Utility['String']['stringFormat'];
    var Kit = require('component/kit'),Bussiness = Kit.use('Bussiness');
    var loginKey = Utility.URL.queryString('login_key');
    var IMAGE_DOMAIN = DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var TEMPLATE={
        'HEADER':'<div class="header"></div>',
        'MAIN':'{0}{1}{2}{3}',
        'RULE':'<div class="rule">\
                    <h2>قواعد النشاط</h2>\
                    <p>1.تم إضافة "ورود الحب" و "باقة الورود"  كهديتين جديدتين خلال مسابقة شهر الحب. حيث ستتمكن من دعم مضيفك المفضل في المسابقة من خلال إرسال هذه الهدايا .\
                        مع العلم أن إرسال هدية واحدة من "باقة الورود" يعادل إرسال 10 هدايا من هدية "ورود الحب ".</p>\
                    <p>2.هناك مستويات مختلفة للمضيفين ، عندما يقوم المستخدم بإرسال هدايا شهر الحب للمضيفين ، سيتمكن المضيف من الإنتقال من مستوى لأخر أعلي . وبالتالي سيحصل المضيفين على جوائز أفضل .  (سيحصل المضيفين على الهدية المستحقة ، خلال 15 يوماً من انتهاء النشاط ).</p>\
                    <p>3.المستخدمين العشرة الأكثر إرسالاً لهدايا شهر الحب للمضيفين ، سيحصلون على مركبة كهدية بعد انتهاء النشاط ....</p>\
                </div>',
        'REWARDS':'<div class="rewards">\
                        <h2>جوائز المضيفين</h2>\
                        <ul class="ul1" data-role="ul1">\
                            <li><img src="/resource/static/image/2016valentine_mb/eyebrow.png"></li>\
                            <li><img src="/resource/static/image/2016valentine_mb/lipstick.png"></li>\
                            <li><img src="/resource/static/image/2016valentine_mb/prefume.png"></li>\
                            <li><img src="/resource/static/image/2016valentine_mb/necklace.png"></li>\
                        </ul>\
                        <div class="arrow1">\
                            <span class="arrow1_l"></span>\
                            <span class="arrow1_r"></span>\
                        </div>\
                        <ul class="detail" data-role="detail1">\
                            <li><span class="number">50,000</span><span class="reward">آيلاينر<br/>Chanel</span></li>\
                            <li><span class="number">100,000</span><span class="reward">أحمر الشفاه<br/>Chanel</span></li>\
                            <li><span class="number">200,000</span><span class="reward">عطر<br/>Dior</span></li>\
                            <li><span class="number">500,000</span><span class="reward">عقد وحلق<br/>Swarovski</span></li>\
                        </ul>\
                        <span class="bg"></span>\
                        <ul class="ul2" data-role="ul2">\
                            <li><img src="/resource/static/image/2016valentine_mb/watch.png"></li>\
                            <li><img src="/resource/static/image/2016valentine_mb/bao.png"></li>\
                            <li><img src="/resource/static/image/2016valentine_mb/phone.png"></li>\
                        </ul>\
                        <div class="arrow2">\
                            <span class="arrow2_l"></span>\
                            <span class="arrow2_r"></span>\
                        </div>\
                        <ul class="detail" data-role="detail2">\
                             <li><span class="number">700,000</span><span class="reward">ساعة يد<br/>Calvin Klein</span></li>\
                             <li><span class="number">1,000,000</span><span class="reward">حقيبة<br/>Michael Kors</span></li>\
                             <li><span class="number">2,500,000</span><span class="reward">Samsung<br />Galaxy s6</span></li>\
                         </ul>\
                          <h3 class="warn">مستويات المضيفين وجوائز كل مستوى !</h3>\
                    </div>',

        'REWARD_LI':'<li><img src="{0}"></li>',

        'REWARD_DETAIL_LI':' <li>\
                                <span class="number">{0}</span>\
                                <span class="reward">{1}</span>\
                            </li>',

        'CAR':' <div class="car">\
                    <span class="bg"></span>\
                    <p><strong>جوائز المستخدم:</strong>الفائز سيحصل على مركبة هدية ، علماً بأن الفوز سيكون من نصيب العشرة أسماء الأولى ! </p>\
                    <img src="/resource/static/image/2016valentine_mb/car.png">\
                </div>',

        'BOARD':'<div class="board">\
                        <h2>قوائم المتسابقين</h2>\
                        <div class="tab">\
                            <span data-role="host_board" class=" cur">قائمة المضيفين</span><span data-role="user_board">قائمة المستخدمين</span>\
                        </div>\
                        <div class="board_detail">\
                            <table class="board_list" data-role="board_list">\
                            </table>\
                            <span class="ribbon"></span>\
                        </div>\
                    </div>',
        'BOARD_HOST':'<tr class="board_item {6}" data-room="{4}" onclick="javascript:;">\
                            <td class="no{0}"></td>\
                            <td class="user"><img src="{1}" onerror="this.src=\''+DOMAIN_CONFIG['IMAGE_DOMAIN'] +'systemRes/img/default/nophoto.jpg\'"></td>\
                            <td class="nickname">{2}</td>\
                            <td class="flower">{3}</td>\
                            <td class="goods">\
                                {5}\
                            </td>\
                        </tr>',
        'GOOD_ITEM':'<span><img src="{0}"></span>',
        'BOARD_USER':'<tr class="board_item user {4}">\
                            <td class="no{0}"></td>\
                            <td class="user"><img src="{1}" onerror="this.src=\''+DOMAIN_CONFIG['IMAGE_DOMAIN'] +'systemRes/img/default/nophoto.jpg\'">{5}</td>\
                            <td class="nickname">{2}</td>\
                            <td class="flower">{3}</td>\
                        </tr>',
        'FOOTER':'<div class="footer">\
                      <p></p>\
                    </div>'
    };


    var Page={
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){
            this.board = [];
        },
        render:function(){
            this.container  = $('#container');
            this.container.html(TEMPLATE.HEADER+stringFormat(TEMPLATE.MAIN,TEMPLATE.RULE,TEMPLATE.REWARDS,TEMPLATE.CAR,TEMPLATE.BOARD)+TEMPLATE.FOOTER);
        },
        compose:function(){
            this.userBtn= $('[data-role="user_board"]');
            this.hostBtn=$('[data-role="host_board"]');
            this.boardContainer = $('[data-role="board_list"]');
            this.rewards = [
                {'number':50000,'pic':'show/image/activity/eyebrow.png'},
                {'number':100000,'pic':'show/image/activity/lipstick.png'},
                {'number':200000,'pic':'show/image/activity/prefume.png'},
                {'number':500000,'pic':'show/image/activity/nec.png'},
                {'number':700000,'pic':'show/image/activity/watch.png'},
                {'number':1000000,'pic':'show/image/activity/bag.png'},
                {'number':2500000,'pic':'show/image/activity/phone.png'}
            ];
        },
        bind:function(){

        },
        start:function(){
            Bussiness.postData('user_get_activity_rank.fly',{'roomId':65},function(data){
                var tabs = [];
                if(data.code==0 &&  data.dataInfo){
                    this.board.push(data.dataInfo['host_rank']);//host
                    this.board.push(data.dataInfo['user_rank']);
                    $.each(data.dataInfo,function(i,item){
                       var index= i=='host_rank' ? 0:1;
                        tabs.push({
                            'index':index,
                            'element':index==0? this.hostBtn : this.userBtn,
                            'enter':function(){
                                this.element.addClass('cur');
                                this.onEnter(index);
                            },
                            'onEnter': this.showBoard.bind(this,index),
                            'quit':function(){
                                this.element.removeClass('cur');
                            }
                        });
                    }.bind(this));

                    var mutex=new(Kit.use('Mutex'))({
                        'items': tabs,
                        'lazy': false
                    });
                }
            }.bind(this));
        },
        showBoard:function(i){
            var current,goodHTML,STRING_EMPTY='',cache;
            if(i==0){
                if(!this.hostCache){
                    this.hostCache = this.board[i].map(function(item,index){
                        if(index >9) return;
                        current = -1,goodHTML='';
                        this.rewards.some(function(r,i){
                            if(item['number']<=r['number']){
                                return true;
                            }else{
                                current++;
                            }
                            return false;
                        }.bind(this));
                        current>-1 && this.rewards.forEach(function(item,i){
                            if(i>current)
                                return false;
                            goodHTML+=stringFormat(TEMPLATE.GOOD_ITEM,IMAGE_DOMAIN+item['pic'])
                        });
                        return stringFormat(TEMPLATE.BOARD_HOST,(index+1),IMAGE_DOMAIN+item.headPic,item.nickName,item.number,item.roomId,goodHTML,current>3?'double':STRING_EMPTY);
                    }.bind(this)).join('');
                }
            }else{
                if(!this.userCache){
                    this.userCache = this.board[i].map(function(item,index){
                        if(index >9) return;
                        vip = item.vip > 0 ? (item.vip>1?'svip':'vip'):'';
                        return stringFormat(TEMPLATE.BOARD_USER,(index+1),IMAGE_DOMAIN+item.headPic,item.nickName,item.number,vip,vip?'<span class="vip_icon"></span>':STRING_EMPTY);
                    }).join('');
                }
            }
            cache= i==0 ? this.hostCache : this.userCache ;
            this.boardContainer.html(cache);
        }
    };
    Page.run();
});