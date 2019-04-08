define(function(require){
    var Utility = require('common/utility'),Promise = Utility['Promise'],stringFormat = Utility['String']['stringFormat'];
    var Kit = require('component/kit'),Bussiness = Kit.use('Bussiness');
    var loginKey = Utility.URL.queryString('login_key');
    var IMAGE_DOMAIN = DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var TEMPLATE={
        'HEADER':'<div class="top"></div>',
        'RULE':'<div class="block1">\
                    <h2>قواعد النشاط </h2>\
                    <p>1.تم إضافة "ورود الحب" و "باقة الورود"  كهديتين جديدتين خلال مسابقة شهر الحب. حيث ستتمكن من دعم مضيفك المفضل في المسابقة من خلال إرسال هذه الهدايا .\
                        مع العلم أن إرسال هدية واحدة من "باقة الورود" يعادل إرسال 10 هدايا من هدية "ورود الحب ".</p>\
                    <p>2.هناك مستويات مختلفة للمضيفين ، عندما يقوم المستخدم بإرسال هدايا شهر الحب للمضيفين ، سيتمكن المضيف من الإنتقال من مستوى لأخر أعلي . وبالتالي سيحصل المضيفين على جوائز أفضل .  (سيحصل المضيفين على الهدية المستحقة ، خلال 15 يوماً من انتهاء النشاط ).</p>\
                    <p>3.المستخدمين العشرة الأكثر إرسالاً لهدايا شهر الحب للمضيفين ، سيحصلون على مركبة كهدية بعد انتهاء النشاط ....</p>\
                </div>',
        'REWARDS':'<div class="block2">\
                        <h2>جوائز النشاط </h2>\
                        <ul class="gift">\
                            <li><img src="/resource/static/image/2016valentine/eyebrow.png" alt="eyebrow" /></li>\
                            <li><img src="/resource/static/image/2016valentine/lipstick.png" alt="lipstick" /></li>\
                            <li><img src="/resource/static/image/2016valentine/prefume.png" alt="prefume" /></li>\
                            <li><img src="/resource/static/image/2016valentine/necklace.png" alt="necklace" /></li>\
                            <li><img src="/resource/static/image/2016valentine/watch.png" alt="watch" /></li>\
                            <li><img src="/resource/static/image/2016valentine/bag.png" alt="bag" /></li>\
                            <li><img src="/resource/static/image/2016valentine/phone.png" alt="phone" /></li>\
                        </ul>\
                        <ul class="rose">\
                            <li><strong>50,000</strong><span>آيلاينر<br/>Chanel</span></li>\
                            <li><strong>100,000</strong><span>أحمر الشفاه<br/>Chanel</span></li>\
                            <li><strong>200,000</strong><span>عطر<br/>Dior</span></li>\
                            <li><strong>500,000</strong><span>عقد وحلق<br/>Swarovski</span></li>\
                            <li><strong>700,000</strong><span>ساعة يد<br/>Calvin Klein</span></li>\
                            <li><strong>1,000,000</strong><span>حقيبة<br/>Michael Kors</span></li>\
                            <li><strong>2,500,000</strong><span>Samsung<br />Galaxy s6</span></li>\
                        </ul>\
                        <p>مستويات المضيفين وجوائز كل مستوى !</p>\
                        <img class="rose_img1" src="/resource/static/image/2016valentine/rose_img1.png" alt="rose" />\
                        </div>',

        'REWARD_LI':'<li><img src="{0}" alt="" /></li>',

        'REWARD_DETAIL_LI':'<li><strong>{0}</strong><span>Chanel<br />آيلاينر</span></li>',

        'CAR':' <div class="block3">\
                    <h2>قوائم المتسابقين</h2>\
                    <p><span class="red">جوائز المستخدم:</span>الفائز سيحصل على مركبة هدية ، علماً بأن الفوز سيكون من نصيب العشرة أسماء الأولى ! </p>\
                    <img class="car" src="/resource/static/image/2016valentine/car.png" alt="car" />\
                    <img class="rose_img2" src="/resource/static/image/2016valentine/rose_img2.png" alt="rose" />\
                </div>',

        'BOARD':'<div class="rank">\
                    <ul class="rank_tab">\
                        <li data-role="host_board" class="on">قائمة المضيفين</li>\
                        <li data-role="user_board">قائمة المستخدمين</li>\
                    </ul>\
                    <ul data-role="board_list" class="rank_host">\
                    </ul>\
                </div>',

        'BOARD_HOST':'<li>\
                            <span class="photo"><img src="{0}" onerror="this.src=\''+DOMAIN_CONFIG['IMAGE_DOMAIN'] +'systemRes/img/default/nophoto.jpg\'" alt="photo" /></span>\
                            <span class="name">{1}</span>\
                            <span class="rose">{2}</span>\
                            <span class="gift {5}">\
                                {3}\
                            </span>\
                        </li>',

         'GOOD_ITEM':'<img src="{0}">',

        'BOARD_USER':'<li class="{4}">\
                            <span class="photo"><img src="{0}" onerror="this.src=\''+DOMAIN_CONFIG['IMAGE_DOMAIN'] +'systemRes/img/default/nophoto.jpg\'" alt="photo" />{5}</span>\
                            <span class="info">\
                                <span class="name">{1}</span>\
                                <span class="badge">{2}</span>\
                            </span>\
                            <span class="rose">{3}</span>\
                        </li>',
        'BADGE':'<img src="{0}" alt="{1}" />',

        'FOOTER':'<h2 class="title_valentine"></h2>'
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
            this.container.html(TEMPLATE.HEADER+ TEMPLATE.RULE+TEMPLATE.REWARDS+TEMPLATE.CAR+TEMPLATE.BOARD+TEMPLATE.FOOTER);
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
            var promise = new Promise(function(){
                Bussiness.getJSON('level/badge_level_data.json', function(data) {
                    this.badgeData = data;
                    promise.resolve();
                }.bind(this))
            }.bind(this)).then(function(){
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
                                        this.element.addClass('on');
                                        this.onEnter(index);
                                    },
                                    'onEnter': this.showBoard.bind(this,index),
                                    'quit':function(){
                                        this.element.removeClass('on');
                                    }
                                });
                            }.bind(this));

                            var mutex=new(Kit.use('Mutex'))({
                                'items': tabs,
                                'lazy': false
                            });
                        }
                    }.bind(this));
                }.bind(this));
        },
        showBoard:function(i){
            var current,goodHTML,badgeHTML,STRING_EMPTY='',cache,cssName,vip;
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
                        return stringFormat(TEMPLATE.BOARD_HOST,IMAGE_DOMAIN+item.headPic,item.nickName,item.number,goodHTML,item.surfing,current>3?'many':STRING_EMPTY);
                    }.bind(this)).join('');
                }
            }else{
                if(!this.userCache){
                    this.userCache = this.board[i].map(function(item,index){
                        if(index >9) return;
                        badgeHTML = '';
                        vip = item.vip > 0 ? (item.vip>1?'svip':'vip'):'';
                        item['badges'].forEach(function(item,i){
                            if(this.badgeData[item]){
                                badgeHTML += stringFormat(TEMPLATE.BADGE,IMAGE_DOMAIN + this.badgeData[item]['pic'],this.badgeData[item]['name']);
                            }
                        }.bind(this));
                        return stringFormat(TEMPLATE.BOARD_USER,IMAGE_DOMAIN+item.headPic,item.nickName,badgeHTML,item.number,vip,vip?'<span class="vip_icon"></span>':STRING_EMPTY);
                    }.bind(this)).join('');
                }
            }
            cache= i==0 ? this.hostCache : this.userCache ;
            cssName = i==0 ? 'rank_host' : 'rank_user' ;
            this.boardContainer.html(cache).attr('class',cssName);
        }
    };
    Page.run();
})