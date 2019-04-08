define(function(require){
    var Utility = require('common/utility');
    var TEMPLATE={
        'MAIN':{
            'en':'<div class="containers">\
			<div class="wrap">\
				<div class="Tips1">\
					<h1 class="Tips_Title1">1. What is the Fan level?</h1>\
					<div class="Tips1_Detail">\
						<img src="/resource/static/image/Fans_Levels/Tips1_Img.png" alt=""/>\
						<span class="Tips1_Details">Users can upgrade their Fan Level by earning EXP. EXP comes from sending gifts and diamonds to broadcasters.\
					</div>\
					<div class="Tips1_Detail1">\
						<img src="/resource/static/image/Fans_Levels/Tips1_Img1.png" alt=""/>\
						<span class="Tips1_Details1">Click here to check the broadcaster\'s fans and their levels.\
						</span>\
					</div>\
					<div class="Tips1_Detail2">\
						<img src="/resource/static/image/Fans_Levels/Tips1_Img2.png" alt=""/>\
						<span class="Tips1_Details2">Click here to check details of the fans.</span>\
					</div>\
				</div>\
				<div class="Tips2">\
					<h1 class="Tips_Title2">2. Why are my Fan levels different in each live room?</h1>\
					<span class="Tips2_Details">The fan level reflects the relation between the user and each individual broadcaster. It is caulculated individually in each room.</span>\
				</div>\
				<div class="Tips3">\
					<h1 class="Tips_Title3">3. What privileges do I have if I upgrade my fan level?</h1>\
					<span class="Tips3_Details">Higher rank in the broadcaster\'s fan ranking<br/>\
                Different chatroom colors<br/>\
           Mic linking to the broadcaster (coming soon)<br/>\
    Customized gifts and emoticons for fans (coming soon)\
					</span>\
				</div>\
			</div>\
		</div>',
            'ar':'<div class="containers">\
        <div class="wrap arabic">\
            <div class="Tips1">\
                <h1 class="Tips_Title1">1- ماهي مستويات الداعمين ؟</h1>\
                <div class="Tips1_Detail">\
                    <img src="/resource/static/image/Fans_Levels/Tips1_Img.png" alt=""/>\
                    <span class="Tips1_Details">هي عبارة عن مستويات للداعمين تحدد من خلال عدد الهدايا المرسلة إلى المضيف ، وتوجد قائمة "مستويات الداعمين" في كل أستوديو مضيف ، وكل مستخدم يختلف مستواه من أستوديو لآخر . <span>\
                </div>\
                <div class="Tips1_Detail1">\
                    <img src="/resource/static/image/Fans_Levels/Tips1_Img1.png" alt=""/>\
                    <span class="Tips1_Details1">انقر هنا ! لمعرفة "مستوى الداعم" الخاص بك داخل أستوديو المضيف ، وكذلك معرفة ترتيبك داخل قائمة "مستويات الداعمين"  بالأستوديو .</span>\
                    </div>\
                    <div class="Tips1_Detail2">\
                    <img src="/resource/static/image/Fans_Levels/Tips1_Img2.png" alt=""/>\
                    <span class="Tips1_Details2">انقر هنا ! لتعرف تفاصيل أكثر عن "مستويات الداعمين" .</span>\
                </div>\
            </div>\
            <div class="Tips2">\
                <h1 class="Tips_Title2">2- لماذا يوجد اختلاف في مستوى الداعم إذا كان داعم لأكثر من واحد من المضيفين ؟</h1>\
                <span class="Tips2_Details">هذا الاختلاف يعتمد على عدد الهدايا التي يرسلها الداعم إلى المضيف ، فإذا كان عدد الهدايا المرسلة أكثر ، فسيكون مستوى الداعم بداخل أستوديو هذا المضيف أعلى مقارنة بمستواه عند مضيف آخر .</span>\
            </div>\
            <div class="Tips3">\
                <h1 class="Tips_Title3">3- كيف يمكن زيادة مستوى الداعمين ؟</h1>\
                <span class="Tips3_Details">يمكن زيادة مستوى الداعمين من خلال إرسال الهدايا "المشتراة" إلى المضيف ، أو "هدية الجوهرة" الموجودة بداخل "البيضة السحرية" .\<br />\
                    ملاحظة :\
                <span>كلما زاد عدد الهدايا التي يرسلها الداعم للمضيف ، كلما زاد عدد نقاط الدعم لديه ، وبالتالي سيصل إلى مستوى داعم أعلى .\
                    و يتم حساب نقاط الدعم كالتالي :</span>\
                <span>عدد "1" عملة ذهبية = 10 نقاط دعم</span>\
                <span>عدد "1 " من هدية الجوهرة = 1 نقطة دعم .</span>\
                </span>\
            </div>\
            <div class="Tips4">\
                <h1 class="Tips_Title4">4- ماهى ميزات مستوى الداعمين ؟</h1>\
                <span class="Tips4_Details">كل عشر مستويات سيكون لها شارات تختلف عن العشر مستويات الأخرى ، هذه الشارات تميزك عن الآخرين وتدل على مستواك الداعم للمضيف .</span>\
            </div>\
        </div>\
    </div>'
        }
    };

    var Page={
        run:function(){
            this.load();
            this.render();
            this.start();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
        },
        start:function(){
            var lg= Utility.URL.queryString('lg')?Utility.URL.queryString('lg'):'en';
            var oLg={
                    'en':'en',
                    'ar':'ar'
                };
            if(oLg[lg]==undefined){
               lg='en';
            }
            this.lg=lg;
            this.Main =TEMPLATE.MAIN[this.lg];
            this.container.html(this.Main);
        }
    };
    Page.run();
});


