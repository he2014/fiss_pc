define(function(require){
    var Utility = require('common/utility'),Promise = Utility['Promise'],stringFormat = Utility['String']['stringFormat'],DateTime = Utility['DateTime'];
    var Kit = require('component/kit'),Bussiness = Kit.use('Bussiness'),I18N = Kit.use('I18N');
    var loginKey = Utility.URL.queryString('login_key'),device = Utility.URL.queryString('device');
    var IMAGE_DOMAIN = DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var POPUP = require('component/popup');
    var TEMPLATE={
        'UP':'<div class="up">\
                    <div data-role="box" class="box7" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box6" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box5" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box4" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box3" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box2" href="javascript:;"><a></a></div>\
                    <div data-role="box" class="box1" href="javascript:;"><a></a></div>\
                </div>',
        'DOWN':'<div class="down">\
                    <div class="door"><a></a></div>\
                    <div data-role="box" class="vip"><a></a></div>\
                    <div data-role="box" class="new"><a></a></div>\
                    <div class="guy"><a href="javascript:;" class="talk"></a></div>\
                    <div class="down_arrow"></div>\
                    <div class="rule"><a class="txt"></a></div>\
                </div>',

        'POP':'<div class="gift_pop">\
                    {0}\
                    <div class="mask"></div>\
                </div>',
        'POP_NOTGET':'<div class="to_get wrap">\
                            <div data-role="caption">\
                                <p>قبل انتهاء فترة النشاط ، على الضيوف الجدد أن يقوموا بإتمام المه</p>\
                            </div>\
                            <div class="prize">\
                                <ul>\
                                    {0}\
                                </ul>\
                            </div>\
                            <div data-role="button">\
                               <a href="javascript:;" data-role="close" class="close"></a>\
                               <a href="javascript:;" data-role="ok" class="ok"></a>\
                            </div>\
                     </div>',
        'POP_SUCCESS':'<div class="success wrap">\
                             <div class="title" data-role="caption">\
                                <h2>مبروك حصلت على {0}！</h2>\
                                <h3>الكنوز التي حصلت عليها : </h3>\
                            </div>\
                        <div class="prize">\
                            <ul>\
                                {1}\
                            </ul>\
                        </div>\
                        <div style="margin-top:-11px;">\
                            <p>جميع الكنوز التي حصلت عليها تجدها في صندوق الهدايا داخل غرف المضيفين ، أما إذا حصلت على إحدى المركبات ستجدها داخل موقف السيارات بالملف الشخصي الخاص بك ! </p>\
                            <p>لمزيد من الهدايا! إلتقط الآن صورة لهديتك. شارك و أعمل لنا Tag على حسابك في الانستغرام</p>\
                        </div>\
                        <div data-role="button">\
                            <a href="javascript:;" data-role="close" class="close"></a>\
                        </div>\
                    </div>',

        'POP_GOT':'<div class="success wrap">\
                         <div class="title" data-role="caption">\
                            <h2>تم الاستلام !</h2>\
                            <h3>الكنوز التي حصلت عليها : </h3>\
                        </div>\
                        <div class="prize">\
                            <ul>\
                                {0}\
                            </ul>\
                        </div>\
                        <p>  ستجد الكنوز التي حصلت عليها  داخل صندوق الهدايا بغرف المضيفين !</p>\
                        <div data-role="button">\
                            <a href="javascript:;" data-role="close" class="close"></a>\
                        </div>\
                    </div>',

        'POP_UNABLE':'<div class="unable wrap">\
                        <p>لا تنطبق عليك شروط النشاط！</p>\
                        <div data-role="button">\
                            <a href="javascript:;" data-role="close" class="close"></a>\
                        </div>\
                    </div>',

        'POP_LOGIN':'<div class="unable wrap">\
                        <p>لزيارة صفحة النشاط يرجي تسجيل الدخول أولاً ! </p>\
                        <div data-role="button">\
                            <a href="javascript:;" data-role="close" class="close"></a>\
                        </div>\
                    </div>',

        'POP_FAIL':'<div class="fail wrap">\
                         <div data-role="caption">\
                                <p>قبل انتهاء فترة النشاط ، على الضيوف الجدد أن يقوموا بإتمام المه</p>\
                            </div>\
                            <div class="prize">\
                                <ul>\
                                    {0}\
                                </ul>\
                            </div>\
                        <div data-role="button">\
                            \
                            <a href="javascript:;" data-role="close" class="close"></a>\
                        </div>\
                        <div class="reason">\
                            <h2>فشل في الاستلام ! </h2>\
                            {1}\
                        </div>\
                    </div>',

        'RULE_POP':'<div class="rule_pop" style="display: none">\
                        <img src="'+IMAGE_DOMAIN+'static/image/2016gift_mb/rule_pop.png">\
                        <a class="close" data-role="close"></a>\
                        <div class="mask"></div>\
                    </div>',

        'REWARD_LI':'<li><img src="{0}"><span>{1}</span></li>'

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
            this.box_Order={10:'1',12:'2',13:'3',14:'4',15:'5',16:'6'};
            this.giftName = [
                'هدايا الأيام السبعة ',
                'كنز المستوى 10 ',
                'كنز المستوى 12',
                'كنز المستوى 13',
                'كنز المستوى 14',
                'كنز المستوى 15',
                'كنز المستوى 16',
                ' كنز كبار الأعضاء',
                ' هدايا الضيوف الجدد'];
        },
        render:function(){
            this.container  = $('#container');
            this.container.html(TEMPLATE.UP + TEMPLATE.DOWN + TEMPLATE.RULE_POP);
            this.vip = $('.vip');
            this.new = $('.new');
            this.rule = $('.rule');
            this.rule_pop = $('.rule_pop');
            this.door = $('.door');
            this.boxes = $('[data-role="box"]');
        },
        compose:function(){
            window.scrollTo(0,1100);
            setTimeout(function(){this.rule.show();}.bind(this),3000);
            //login_util.setCallback(this.start.bind(this));
        },
        bind:function(){
            var tabs = [];
            $.each(this.boxes,function(i,item){
                $(item).click(function(evt){
                    this.getGift(i,evt);
                }.bind(this));
            }.bind(this));

            this.rule.click(function(){
                this.rule_pop.show();
                this.rule_pop.find('.mask').show();
            }.bind(this));

            this.rule_pop.find('.close').click(function(){
                this.rule_pop.hide();
            }.bind(this));

            this.door.click(function(){
                this.door.addClass('open');
                new Promise().wait(1000).then(function(){
                    var sInt = setInterval(function(){
                        var top = document.body.scrollTop + document.documentElement.scrollTop;
                        if(top<=1150){
                            clearInterval(sInt);
                        }else{
                            window.scrollTo(0,top-50);
                        }
                    }.bind(this),50);
                }.bind(this)).resolve();
            }.bind(this));
        },
        start:function(){
            var promise = new Promise(function(){
                Bussiness.postData('mobile/user_trigger_activity.fly',{id:7,'loginKey':loginKey,'device':device},function(data){
                    if(data.code==0){
                        //0 未领取 1 可领取  2 已领取  3 永久不可领取
                        $.each(data.dataInfo,function(i,item){
                            switch(parseInt(i)){
                                case 1://注册
                                    item.state==2 ? this.new.addClass('open'):'';
                                    this.new.data('state',item.state);
                                    this.new.data('id',2);
                                    break;
                                case 2://7天活跃
                                    item.state==2 ? this.boxes.eq(0).addClass('open'):'';
                                    this.boxes.eq(0).data('state',item['state']);
                                    this.boxes.eq(0).data('id',3);
                                    break;
                                case 3://10  12  13  14  15  16
                                    $.each(item,function(index,value){
                                        var $box_index = this.boxes.eq(this.box_Order[index]);
                                        $box_index.data('state',value['state']);
                                        $box_index.data('id',4 );
                                        $box_index.data('level',index);
                                        value.state==2? $box_index.addClass('open'):'';
                                        value.state==1? $box_index.addClass('active'):'';
                                    }.bind(this));
                                    break;
                                case 4:
                                    this.vip.data('state',item.state);
                                    this.vip.data('id',5);
                                    break;
                            }
                        }.bind(this));
                    }
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){
                    Bussiness.getJSON('activity/activity.json',function(data){
                        this.rewardsBool = data.packages;
                        $.each(data.activity,function(i,item){
                            switch(parseInt(i)){
                                case 1://注册
                                    this.boxes.eq(8).data('rewardIds', item.awards) ;
                                    break;
                                case 2://7天活跃
                                    this.boxes.eq(0).data('rewardIds', item.awards) ;
                                    break;
                                case 3://10  12  13  14  15  16
                                    $.each(item.details,function(index,value){
                                        var $box_index = this.boxes.eq(this.box_Order[index]);
                                        $box_index.data('rewardIds', value.awards) ;
                                    }.bind(this));
                                    break;
                                case 4:
                                    this.boxes.eq(7).data('rewardIds',item.detail[30]['awards']);
                                    //$.each(item.detail,function(index,value){
                                    //    this.vip.rewardIds[index]=value;
                                    //}.bind(this));
                                    break;
                            }
                        }.bind(this));
                    }.bind(this));
                }.bind(this));

        },
        getGift:function(index,evt){
            if(!loginKey){
                POPUP.show({
                    'template': stringFormat(TEMPLATE.POP, TEMPLATE.POP_LOGIN),
                    'isBind': true
                });
                return;
            }else{
                var $ele = this.boxes.eq(index), level = $ele.data('level'), id = $ele.data('id'), state = $ele.data('state');
                console.log(state);
                var rewardsHTML = $ele.data('rewardIds') && $ele.data('rewardIds').split(',').map(function (item, i) {
                        return stringFormat(TEMPLATE.REWARD_LI, IMAGE_DOMAIN + this.rewardsBool[item]['pic'],index==7 ? '':'x ' +(this.rewardsBool[item]['number'] || this.rewardsBool[item]['expire']))
                    }.bind(this)).join('');

                switch (parseInt(state)) {
                    //0 未领取 1 可领取  2 已领取  3 永久不可领取
                    case 0:
                    case 1:
                        this.queryGift(index, $ele, id, rewardsHTML,level);
                        break;
                    case 2:
                        POPUP.show({
                            'template': stringFormat(TEMPLATE.POP, stringFormat(TEMPLATE.POP_GOT, rewardsHTML)),
                            'isBind': true
                        });
                        //$ele.append(TEMPLATE.POP_GOT)
                        break;
                    case 3:
                        POPUP.show({
                            'template': stringFormat(TEMPLATE.POP, TEMPLATE.POP_UNABLE),
                            'isBind': true
                        });
                        break;
                }
            }
        },
        queryGift:function(index,$ele,id,rewardsHTML,level){
            var arg = {'id':id,'loginKey':loginKey,'device':device};
            if(level) arg.level=level;
            POPUP.show({
                'template':stringFormat(TEMPLATE.POP,stringFormat(TEMPLATE.POP_NOTGET,rewardsHTML)),
                'isBind':true
            });
            POPUP.container.find('[data-role="ok"]').unbind('click').click(function(){
                Bussiness.postData('mobile/user_trigger_activity.fly',arg,function(data){
                    var giftName = this.giftName[index];
                    switch(data.code){
                        case 0:
                            if(index==7){
                                rewardsHTML = rewardsHTML.replace(/<span>/,'<span>' + 'x '+data.dataInfo.award[0]['expire']);
                            }
                            POPUP.close();
                            POPUP.rePaint({
                                'template':stringFormat(TEMPLATE.POP,stringFormat(TEMPLATE.POP_SUCCESS,giftName,rewardsHTML)),
                                'isBind':true
                            });
                            //if(index!=7)
                            $ele.data('state',2).addClass('open');
                            break;
                        case 1107:
                            this.popFail_Got($ele,rewardsHTML);
                            break;
                        case 1103:
                            this.popFail_Fail(index,rewardsHTML);
                            break;
                        default:
                            this.popFail_Fail(index,rewardsHTML);
                    }
                }.bind(this));
            }.bind(this));
        },
        popFail_Fail:function(index,rewardsHTML){
            var failReason,activeTpl = 'في {0} عندما تصل إلى المستوى 8 ،يمكنك استلام الكنز المجاني';
            switch(index){
                case 0:
                    failReason = '<h3>عذراً ، مستواك الحالي لا يكفي ، أذهب لترقية مستواك !</h3>';
                    failReason+= stringFormat(activeTpl,data.datInfo ? DateTime.countdownTime(data.dataInfo.milliseconds,true) : '');
                    break;
                case 7:
                    failReason = '<h3>عذراً ، لم تقوم بشراء عضوية كبار الأعضاء خلال فترة النشاط ، لذالك لايمكنك استلام الكنز.</h3>';
                    failReason += '<h4>قم بشراء إحدي عضويات كبار الأعضاء (SVIP\VIP) خلال فترة النشاط لتحصل علي مركبة اللامبورجيني مجانًا لمدة 5 أيام ( أشتري العضوية لمدة 30 يوم و أحصل علي مركبة اللامبورجيني لمدة 5 أيام مجانًا و لو أشتريتها لمدة 90 يوم  أحصل علي المركبة لمدة 15 يوم مجانًا )</h4>';
                    break;
                case 8:
                    failReason = ' لا تنطبق عليك شروط النشاط！';  //不满足参与条件 - 新注册
                    break;
                default :
                    failReason='<h3>عذراً ، مستواك الحالي لا يكفي ، استمر في إنهاء المهام اليومية !</h3>';
                    failReason +='<h4>أي مستخدم يصل إلى أي مستوى سيحصل على الكنز المقرر له ، خلال الفترة من 2016.3.7-2016.4.3</h4>';
                    break;
            }
            POPUP.close();
            POPUP.rePaint({
                'template':stringFormat(TEMPLATE.POP,stringFormat(TEMPLATE.POP_FAIL,rewardsHTML,failReason)),
                'isBind':true
            });
        },
        popFail_Got:function($ele,rewardsHTML){
            POPUP.close();
            POPUP.rePaint({
                'template':stringFormat(TEMPLATE.POP,stringFormat(TEMPLATE.POP_GOT,rewardsHTML)),
                'isBind':true
            });
            $ele.data('state',2);
        }
    };
    Page.run();
});