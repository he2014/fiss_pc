define(function(require){
    var TEMPLATE={
        'MAIN':'<div class="container">\
                    <div class="Slide_Lists">\
                        <span id="about" class="right" data-num="0" data-val="0">关于我们</span>\
                        <span id="produce_des" data-num="2" data-val="1">产品介绍</span>\
                        <span id="news_c" data-num="3" data-val="2">新闻中心</span>\
                        <span id="join_us" data-num="4" data-val="3">加入我们</span>\
                    </div>\
                    <div id="AllCont">\
                        <div class="page_num_1">\
                            <div class="page_num1_1">\
                                <img class="num1_1_img" src="/resource/static/image/FissionShow/page1_1.png" alt=""/>\
                                <span class="pag1_top">\
                                    <span class="Change_Lang"><a href="javascript:;">CN/EN</a></span>\
                                    <ul class="Top_Menu">\
                                        <li class="default_menu" data-num="0" data-val="0"><a href="javascript:;">关于我们</a></li>\
                                        <li class="top_produce_des" data-num="2" data-val="1"><a href="javascript:;">产品介绍</a></li>\
                                        <li class="top_news_c" data-num="3" data-val="2"><a href="javascript:;">新闻中心</a></li>\
                                        <li class="top_join_us" data-num="4" data-val="3"><a href="javascript:;">加入我们</a></li>\
                                    </ul>\
                                </span>\
                                <div class="page_num1_pics">\
                                    <span class="page_num1_title">\
                                        <img class="name_en" src="/resource/static/image/FissionShow/company_name.png" alt="FISSION"/>\
                                        <span class="name_ch">北京裂变科技有限公司</span>\
                                    </span>\
                                    <span class="page_num1_detail">我们去到世界上很多国家。从印度到西班牙，从越南到摩洛哥，从埃及到土耳其。我们很惊奇的发现，不论在哪，不论何种文明，人们对欢乐的追求亘古不变，但各地的娱乐条件却参差不齐。中国先进的互联网产品，其实可以为世界上更多人带来欢乐。我们想象着也许有一天科技真的没有了无国界，它能为不同的语言，不同的民族，带来相同的欢乐。虽然最初拥有的只是梦想，然而一切就从这里出发。</span>\
                                </div>\
                            </div>\
                            <div class="page_num1_2">\
                                <img class="num1_2_img" src="/resource/static/image/FissionShow/page1_2.png" alt=""/>\
                                <div class="page1_num2_tips">\
                                    <img class="page1_num2_tips_img" src="/resource/static/image/FissionShow/page1_2_detail.png" alt=""/>\
                                    <span class="page1_num2_title">起航</span>\
                                    <span class="page1_num2_details">我们驻扎在北京，致力于把最流行的互联网娱乐带到每一个需要它的国度。小伙伴们是8090后，来自中国，埃及，突尼斯，沙特阿拉伯，摩洛哥，也门，土耳其，西班牙。在这样多文化融合的地方，我们分享知识，共筑梦想，每一天都在充满未知中不断前行。</span>\
                                </div>\
                                <div class="company_CEO">\
                                    <img class="image_CEO" src="/resource/static/image/FissionShow/page1_2_CEO.png" alt=""/>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="page_num_2">\
                            <img class="num2_img" src="/resource/static/image/FissionShow/page2.png" alt=""/>\
                            <div class="page2_produce_all hidden">\
                                <div class="produce_desc">\
                                    <span class="produce_desc_details">7Nujoom和Haahi是分别针对阿拉伯语用户和土耳其语用户的移动生活直播App，截止2016年6月已拥有超过<span>400</span> 万注册用户和<span>1200</span> 位来自<span>9</span> 个国家的主播。</span>\
                                </div>\
                                <div class="produce_web">\
                                    <span class="web_ar"></span>\
                                    <span class="web_tr"></span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="page_num_3">\
                            <img class="num3_img" src="/resource/static/image/FissionShow/page3.png" alt=""/>\
                            <div class="page3_news">\
                                <span class="page_news1">7nujoom&haahi给你提供一个实现“明星梦”的平台</span>\
                                <span class="page_news2">7nujoom在埃及为孤儿们举办慈善募捐活动和音乐会</span>\
                                <span class="page_news3">7Nujoom将斋月期间收到的善款捐赠给埃及和摩洛哥的慈善机构</span>\
                                <span class="page_news4">北京裂变参加谷歌开发者大会 </span>\
                            </div>\
                        </div>\
                        <div class="page_num_4">\
                            <img class="num4_img" src="/resource/static/image/FissionShow/page4.png" alt=""/>\
                            <div class="page4_Job">\
                                    <span class="Job1 Jobs">\
                                        <span class="Jobs_title">\
                                            <span>阿拉伯语运营专员</span>\
                                            <span class="Job_title_en">Arabic Operation Specialist</span>\
                                        </span>\
                                        <div class="Jobs_Dis Job1_Dis">\
                                            <span class="Jobs_pos">\
                                                <span>岗位职责：</span>\
                                                <span>1,监管阿语主播日常直播</span>\
                                                <span>2,市场运营数据汇总和分析</span>\
                                                <span>3,根据运营数据调节运营策略手段，提高关键数据指标</span>\
                                                <span>4,配合市场和运营策略进行产品品牌推广</span>\
                                            </span>\
                                            <span class="Jobs_ask">\
                                                <span>岗位要求：</span>\
                                                <span>1,阿拉伯语专业本科或硕士学历</span>\
                                                <span>2,热爱互联网行业</span>\
                                                <span>3,有互联网运营经验优先</span>\
                                                <span>4,有阿拉伯地区出国经历优先</span>\
                                            </span>\
                                            <span class="Follow_Job">简历发送至：liuboxia@feinno.com</span>\
                                        </div>\
                                    </span>\
                                    <span class="Job2 Jobs">\
                                        <span class="Jobs_title">\
                                            <span>市场营销经理</span>\
                                            <span class="Job_title_en">Marketing Manager</span>\
                                        </span>\
                                        <div class="Jobs_Dis Job2_Dis">\
                                            <span class="Jobs_pos">\
                                                <span>岗位职责：</span>\
                                                <span>1.结合用户喜好和需求定制化开展市场推广活动</span>\
                                                <span>2.负责海外SNS平台事件营销、话题营销的方案设计和执行</span>\
                                                <span>3.开拓海外目标市场的媒体营销平台，并维护与平台关系，发布产品相关文章，提高产品品牌知名度</span>\
                                            </span>\
                                            <span class="Jobs_ask">\
                                                <span>岗位要求：</span>\
                                                <span>1.英语口头/书面沟通流畅</span>\
                                                <span>2.勤于思考，执行力强，沟通能力强</span>\
                                                <span>3.本科及本科以上学历</span>\
                                                <span>4.2年以上互联网产品市场营销相关工作经验 </span>\
                                            </span>\
                                            <span class="Follow_Job">简历发送至：wangfangsh@feinno.com</span>\
                                        </div>\
                                    </span>\
                                    <span class="Job3 Jobs">\
                                        <span class="Jobs_title">\
                                            <span>安卓开发</span>\
                                            <span class="Job_title_en">Android Developer </span>\
                                        </span>\
                                        <div class="Jobs_Dis Job3_Dis">\
                                            <span class="Jobs_pos">\
                                                <span>岗位职责：</span>\
                                                <span>1、负责Android手机APP功能设计、架构设计、概要设计、详细设计和编码工作；</span>\
                                                <span>2、按需求完成界面、逻辑功能、网络通信等设计，配合其他开发人员完成产品设计、测试和发布工作；</span>\
                                                <span>3、负责安卓应用后期的升级、修改、优化和维护工作。</span>\
                                            </span>\
                                            <span class="Jobs_ask">\
                                                <span>岗位要求：</span>\
                                                <span>1、3年以上android平台经验,并作为主要开发人员完整参与过一款以上成功上线项目的研发；</span>\
                                                <span>2、熟悉Android的线程机制和网络通讯机制，有社交类APP开发经验优先；</span>\
                                                <span>3、熟悉Android框架、主要控件以及平台的xml,json,html解析；</span>\
                                                <span>4、精通Android性能和高并发、消息推送及内存优化，善于解决系统崩溃、内存泄露和兼容性问题；</span>\
                                                <span>5、具有丰富的UI开发经验,能够针对需求正确进行界面布局,了解HTML5，JS相关技术者优先；</span>\
                                                <span>6、工作积极主动，有较强责任感和严谨的工作作风,能够承受一定工作压力,敏捷教练经验者优先。 </span>\
                                            </span>\
                                            <span class="Follow_Job">简历发送至：fanjianpeng@feinno.com</span>\
                                        </div>\
                                    </span>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    };

    var Page =window['Page']= {
        run: function () {
            this.load();
            //this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load: function () {
            this.container = $('#container');
            this.container.html(TEMPLATE.MAIN);
        },
        render: function () {
        },
        compose: function () {

        },
        bind: function () {

        },
        start: function () {
            var i= 0,j= 0,k=0;
            //$(".container").css({height:$(window).height()});
            var startTime,endTime= 0,height,normal=0.5625,chang=true;
            var Conts={"page_num1_detail":['我们去到世界上很多国家。从印度到西班牙，从越南到摩洛哥，从埃及到土耳其。我们很惊奇的发现，不论在哪，不论何种文明，人们对欢乐的追求亘古不变，但各地的娱乐条件却参差不齐。中国先进的互联网产品，其实可以为世界上更多人带来欢乐。我们想象着也许有一天科技真的没有了无国界，它能为不同的语言，不同的民族，带来相同的欢乐。虽然最初拥有的只是梦想，然而一切就从这里出发。','From Lebanon to Egypt, Morocco to Turkey, from Algeria to Spain Espana, Our steps have spread all around the world. It\'s amazing to see that People\'s pursuit for entertainment is insistent no matter where they are. But the entertainment conditions are quite different everywhere.\<br/>\The advanced online products could actually bring immerse joy and happiness to more people in every corner of the world. Similar entertainment and joy could be shared among various cultures without boundary.\<br/>\Everything starts from this simple perspective.'],"page1_num2_title":["起航","Start"],"page1_num2_details":["我们驻扎在北京，致力于把最流行的互联网娱乐带到每一个需要它的国度。小伙伴们是8090后，来自中国，埃及，突尼斯，沙特阿拉伯，摩洛哥，也门，土耳其，西班牙。在这样多文化融合的地方，我们分享知识，共筑梦想，每一天都在充满未知中不断前行。","While located in Beijng, China, we devote ourselves to bringing online entertainment to every country catering for it. Youth from Tunis, Egypt, K.S.A, Morocco, Yemen, Turkey, Spain and China work together to build the dream and share ideas in this culture melting pot."],"page_news1":["7nujoom&haahi给你提供一个实现“明星梦”的平台","7nujoom and Haahi-- a platform to help your dearm come ture"],"page_news2":["7nujoom在埃及为孤儿们举办慈善募捐活动和音乐会","7nujoom held charity activities and concert in Egypt"],"page_news3":["7Nujoom将斋月期间收到的善款捐赠给埃及和摩洛哥的慈善机构","7nujoom donate all the income to Morocco charity ..."],"page_news4":["北京裂变参加谷歌开发者大会","Fission on Google Play Connect"],"image_CEO":["/resource/static/image/FissionShow/page1_2_CEO.png","/resource/static/image/FissionShow/page1_2_CEO_en.png"],"num2_img":["/resource/static/image/FissionShow/page2.png","/resource/static/image/FissionShow/page2_en.png"],"num4_img":["/resource/static/image/FissionShow/page4.png","/resource/static/image/FissionShow/page4_en.png"],"about":["关于我们","About Us"],"produce_des":["产品介绍","Product"],"news_c":["新闻中心","News"],"join_us":["加入我们","Join Us"]};
            res();
            heig();
            $(".Change_Lang").bind("click",function(){
                if(chang){
                    $(".default_menu a,#about").html(Conts["about"][1]);
                    $(".top_produce_des a,#produce_des").html(Conts["produce_des"][1]);
                    $(".top_news_c a,#news_c").html(Conts["news_c"][1]);
                    $(".top_join_us a,#join_us").html(Conts["join_us"][1]);
                    $(".page_num1_detail").html(Conts["page_num1_detail"][1]);
                    $(".page1_num2_title").html(Conts["page1_num2_title"][1]);
                    $(".page1_num2_details").html(Conts["page1_num2_details"][1]);
                    $(".image_CEO").attr({"src":Conts["image_CEO"][1]});
                    $(".num2_img").attr({"src":Conts["num2_img"][1]});
                    $(".page_news1").html(Conts["page_news1"][1]);
                    $(".page_news2").html(Conts["page_news2"][1]);
                    $(".page_news3").html(Conts["page_news3"][1]);
                    $(".page_news4").html(Conts["page_news4"][1]);
                    $(".num4_img").attr({"src":Conts["num4_img"][1]});
                }else{
                    $(".default_menu a,#about").html(Conts["about"][0]);
                    $(".top_produce_des a,#produce_des").html(Conts["produce_des"][0]);
                    $(".top_news_c a,#news_c").html(Conts["news_c"][0]);
                    $(".top_join_us a,#join_us").html(Conts["join_us"][0]);
                    $(".page_num1_detail").html(Conts["page_num1_detail"][0]);
                    $(".page1_num2_title").html(Conts["page1_num2_title"][0]);
                    $(".page1_num2_details").html(Conts["page1_num2_details"][0]);
                    $(".image_CEO").attr({"src":Conts["image_CEO"][0]});
                    $(".num2_img").attr({"src":Conts["num2_img"][0]});
                    $(".page_news1").html(Conts["page_news1"][0]);
                    $(".page_news2").html(Conts["page_news2"][0]);
                    $(".page_news3").html(Conts["page_news3"][0]);
                    $(".page_news4").html(Conts["page_news4"][0]);
                    $(".num4_img").attr({"src":Conts["num4_img"][0]});
                }
                chang=!chang
            });
            function heig(){
                height=$(".container").css("height");
                height=parseInt(height);
                return height
            };
            function res(){
                var width=$(".container").css("width"),height=$(".container").css("height");
                width=parseInt(width);
                height=parseInt(height);
                width=width > 1200 ? width : 1200;
                height=height >600 ? height : 600;
                //$(".container").css({"width":"width","height":height})
                var resize=height/width;
                $("#AllCont").css("height",height*5);
                $(".page_num_1").css("height",height*2);
                $(".page_num1_detail").css({top:height*0.53});
                if(width >1200){
                    var autoWidth=(width-1200)/ 2,page1_1_detail_l=195+autoWidth,page1_1_detail_r=330+autoWidth,change_lang_l=autoWidth+50;
                    $(".Change_Lang").css("margin-left",change_lang_l);
                    $(".page_num1_detail ").css({"margin-left":page1_1_detail_l,"margin-right":page1_1_detail_r});
                    $(".page1_num2_tips").css("left",autoWidth+1);
                    //$(".page_num2_about").css({"left":autoWidth+250});
                    $(".company_CEO").css({left:autoWidth+290});
                    $(".page_num_3 .page3_news").css({"left":autoWidth+205})
                }
                if(width<2560&&width>1200){
                    var width1=width>1416 ? 1416 : width;
                    $(".page1_num2_tips_img").css({width:width1/2});
                    $(".page1_num2_details").css({width:width1/4})
                }
                if(height<=600){
                    $(".page_num1_1,.page_num1_2,.page_num_2,.page_num_3,.page_num_4").css("height",600);
                    //console.log("600")
                }else if(height<1440&&height>600){
                    $(".page_num1_1,.page_num1_2,.page_num_2,.page_num_3,.page_num_4").css("height",height);
                    //console.log("600--1440"+";"+height)
                }
                else{
                    $(".page_num1_1,.page_num1_2,.page_num_2,.page_num_3,.page_num_4").css("height",1440);
                    //console.log("1440")
                }

                if(width<2560){
                    $("img.num1_1_img,.num1_2_img,.num2_img,.num3_img,.num4_img").css({width:width,height:width/2560*1440});
                    if(width >1330){
                        $(".page2_produce_all").css({"right":width*0.18});
                    }
                    else{
                        $(".page2_produce_all").css({"right":239});
                    }
                }else{
                    $("img.num1_1_img,.num1_2_img,.num2_img,.num3_img,.num4_img").css({width:2560,height:1440});
                    $(".page2_produce_all").css({"right":1440})
                }
                if(resize>normal){
                    console.log('width and height cover');
                    $(".page_num1_detail").css({top:height*0.64});
                    $('.num1_1_img,.num1_2_img,.num2_img,.num3_img,.num4_img').css({"height":height,"width":height/normal});
                    $(".image_CEO").css({"height":height/2,"width":height/(normal*2)});
                }else{
                    console.log('height is cover');
                    $(".page_num1_detail").css({top:width*0.34});
                    $('.num1_1_img,.num1_2_img,.num2_img,.num3_img,.num4_img').css({"height":width*normal,"width":width});
                    $(".image_CEO").css({"height":width*normal/2,"width":width/2});
                }
                if(height>601){
                    var heigh=$(".num1_2_img").css('height');
                    heigh=parseInt(heigh);
                    $(".company_CEO").css({top:height*67/144});
                }
            };
            $(window).resize(
                function(){
                    heig();
                    res();
                    res_size();
                }
            );
            $(".Jobs").on("mouseenter",function(){
                $(this).children(".Jobs_Dis").stop().slideToggle("slow")
            }).on("mouseleave",function(){
                $(this).children(".Jobs_Dis").stop().slideToggle("slow")
            });
            $('.Slide_Lists span').on("mouseenter",function(){
                $(this).stop().animate({"right":80});
                $(this).css({"background":"rgba(8,163,172,.3)"})
            }).on("mouseleave",function(){
                $(this).stop().animate({"right":0});
                $(this).css({"background":"rgba(8,163,172,1)"})
            }).on("click",function(){
                $('.Slide_Lists span').css({"right":0});
                $('.Slide_Lists span').removeClass("right");
                $(this).addClass("right");
            });
            $(".Slide_Lists span,.Top_Menu li").on("click",function(){
                var num=0,val=$(this).index();
                if(val>0)
                    num=val+1;
                $('#AllCont').animate({"top":"-"+height*num},600);
                $('.Slide_Lists span').removeClass("right");
                $(".Slide_Lists span").eq(val).addClass("right");
                j=num;
            });

            var scrollFun = function (e) {
                //console.log("scroll")
                var height1=$(".container").css("height");
                height1=parseInt(height1);
                e = e || window.event;
                var lengs=$("#AllCont>div").length;
                startTime = new Date().getTime();
                if((endTime - startTime) < -800){
                    if (e.deltaY || e.detail) {
                        if (e.deltaY > 0 || e.detail>0) {
                            if(j<lengs){
                                j++;
                                $('#AllCont').animate({"top":"-"+height1*j},800);
                                $('.Slide_Lists span').removeClass("right");
                                $(".Slide_Lists span").eq(j-1).addClass("right");
                            }else
                                j=lengs;
                        }else{
                            if(j>0){
                                j--;
                                $('#AllCont').animate({"top":"-"+height1*j},800);
                                $('.Slide_Lists span').removeClass("right");
                                if(j>0)
                                    $(".Slide_Lists span").eq(j-1).addClass("right");
                                else
                                    $(".Slide_Lists span").eq(0).addClass("right");
                            }else
                                j=0;
                        }
                        endTime = new Date().getTime();
                    }
                }
            };
            function res_size(){
                var height1=$(".container").css("height");
                height1=parseInt(height1);
                $('#AllCont').animate({"top":"-"+height1*j},.3);
            }
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFun, false);
            }
            document.onmousewheel = scrollFun;
        }
    };
    Page.run();
});
