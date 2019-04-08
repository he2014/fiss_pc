function load_setHeader(img,state){
	$.iframe("/user/setheaderV3.shtml?img="+img+"&state="+state,574,490);
}

//var i = 0;
//0:临时图片  1:相册  2:说说  3:背景  4:头像  5:活动  6:礼物  7：表情
function ajaxFileUpload(type,fileId,state){
	var filePath = $("#"+fileId).val();
	if(filePath == null){
		$.tip_simple_alert(get_language_desc('3001'));
		return;
	}	
	var extStart=filePath.lastIndexOf(".");
	var suffix=$.trim(filePath.substring(extStart,filePath.length).toUpperCase());
	if(suffix!=".BMP" && suffix!=".PNG" && suffix!=".GIF" && suffix!=".JPG" && suffix!=".JPEG"){
		$.tip_simple_alert('文案：The picture format is limited to BMP, PNG, GIF, JPEG, JPG');
		return;
	}
	
//	var filesize = 0;
//	try{
//		if(window.ActiveXObject){ 
//	       var fileSystem=new ActiveXObject("Scripting.FileSystemObject"); 
//	       var file=fileSystem.GetFile(filePath); 
//	       filesize=file.size;
//		}else{
//			filesize = $('#'+fileId).get(0).files[0].size;
//		}
//	}catch(e){
//        alert("请修改IE浏览器ActiveX安全设置为启用~！");
//        return;
//    }  

	/* var file = $('#'+fileId).get(0).files[0];*/
//	if(file.size>10*1024*1024){      
//	   $.alert(null,get_language_desc('3004')); 
//	   return;
//	}
	$.blockUI({
		message : "<img style='width:23px;height:23px' src='/resource/static/image/myinfo/loading.gif'/>",
		css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
	});
	if(type == 0){
		$.ajaxFileUpload({
			   url:"/user_uploadFile.fly",
		       secureuri:false,
		       type:"post",
		       fileElementId:fileId, 
		       dataType: 'json',  
		       success: function (data)            
		       {
		    	   $.unblockUI();
		    	   if(data.code==0){
		    		   load_setHeader(data.dataInfo,state);
		    	   } else{
		    		   if(data.code==79){
		    			   $.tip_simple_alert(get_error_message(data.code));
		    		   }else{
		    			   $.tip_simple_alert(get_language_desc('3003'));
		    		   }
		    	   }
		       },
		       error: function (data)            
		       {	
		    	   $.unblockUI();
		           $.tip_simple_alert('文案：Picture upload failed, please try again later');
		       }
		     }); 
	}else if(type == 1)
	{	
		$.ajaxFileUpload({
		   url:domain+"user_uploadPhoto.fly",
	       secureuri:false,
	       type:"post",
	       fileElementId:fileId, 
	       dataType: 'json',  
	       success: function (data)            
	       {
			   console.log(data)
	    	   $.unblockUI();
	    	   if(data.code==0){
	    		   location.reload();
	    	   }else{
	    		   $.tip_simple_alert(get_language_desc('3003')); 
	    	   }  	  
	       },
	       error: function (data)            
	       {	
	    	   $.unblockUI();
	           $.tip_simple_alert(get_language_desc('3003'));
	       }
	    }); 
	}else if(type == 2)
	{	
		$.ajaxFileUpload({
		   url:domain+"user_uploadFile.fly",
	       secureuri:false,
	       type:"post",
	       fileElementId:fileId, 
	       dataType: 'json',  
	       success: function (data)            
	       { 	
	    	   $.unblockUI(); //关闭弹出层
	    	   if(data.code==0){  
	    		   var h = document.body.offsetHeight;
	    		   $('.cover_modal').attr('style','height:'+h+'px;');
	    		   $("#modify_family_pic").show();
	    		   $('#modal_none').show();
	    		   $("#modifyUPhoto").show();
	    		   $("#div_over5").show();
	    		   tiaozhuan(data.dataInfo);
	    	   }else{
	    		   $.tip_simple_alert(get_language_desc('3003'));
	    	   }  
	       },
	       error: function (data)            
	       {	
	    	   $.unblockUI(); //关闭弹出层
	           $.tip_simple_alert(get_language_desc('3003'));
	       }
	    });
	}
 }	 

/*
 * 报名页面上传图片(申请主播报名)
 * */
function ajaxFileUploadEnroll(type,fileId,state){
	if(!user_util['is_login'](true)){
		return ;
	}
	var filePath = $("#"+fileId).val();
 
	if(filePath == null){
		$.tip_simple_alert(i18nTranslate('3001'));
		return;
	}	
	var extStart=filePath.lastIndexOf(".");
	var suffix=$.trim(filePath.substring(extStart,filePath.length).toUpperCase());
	if(suffix!=".BMP" && suffix!=".PNG" && suffix!=".GIF" && suffix!=".JPG" && suffix!=".JPEG"){
		$.tip_simple_alert(i18nTranslate('3002'));
		return;
	}
	 
   var file = $('#'+fileId).get(0).files[0];
  
   if(file.size>10*1024*1024){      
	   $.alert(null,i18nTranslate('3004'));
	   return;
   }
   
   var imgsrc = DOMAIN_CONFIG['SYSRES_DOMAIN']+'img/loading.gif';
   $('#echo_'+fileId).attr('src',imgsrc);
   
	if(type == 0){
		$.ajaxFileUpload({
			   url:domain+"uploadPhotoTmp4PetitionHost.fly",
		       secureuri:false,
		       type:"post",
		       fileElementId:fileId, 
		       dataType: 'json', 
		       success: function (data)            
		       {		    	  
		    	   if(data.code==0){
	    			  $('#upload_'+fileId).val(data.dataInfo);
	    			  //等比例缩图
	    			  var thumbnail=system_info['base_attr']['imageUrl']+data.dataInfo;
	    			  var timg=new Image();
	    			  timg.src=thumbnail;
	    			  setTimeout(function(){
	    				  $('#echo_'+fileId).removeAttr('style');
	    				  $('#echo_'+fileId).attr('src',thumbnail);
	    			  },3000);
		    	   } else {
		    		   $.tip_simple_alert(i18nTranslate('3003'));
		    	   }  	  
		       },
		       error: function (data)            
		       {	
		    	   $.tip_simple_alert(i18nTranslate('3003'));
		       }
		     }); 
	}
 }