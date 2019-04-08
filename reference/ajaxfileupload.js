jQuery.extend({createUploadIframe:function(id,uri){var frameId="jUploadFrame"+id;var iframe=null;if(window.ActiveXObject){if(jQuery.browser.version=="6.0"||jQuery.browser.version=="7.0"||jQuery.browser.version=="8.0"){iframe=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof uri=="boolean"){iframe.src="javascript:false"}else{if(typeof uri=="string"){iframe.src=uri}}}else{iframe=document.createElement("iframe");iframe.id=frameId;iframe.name=frameId}}else{iframe=document.createElement("iframe");iframe.id=frameId;iframe.name=frameId}iframe.style.position="absolute";iframe.style.top="-1000px";iframe.style.left="-1000px";document.body.appendChild(iframe);return iframe},createUploadForm:function(id,fileElementId,data){var formId="jUploadForm"+id;var fileId="jUploadFile"+id;var form=jQuery('<form  action="" method="POST" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>');if(data){for(var i in data){jQuery('<input type="hidden" name="'+i+'" value="'+data[i]+'" />').appendTo(form)}}var oldElement=jQuery("#"+fileElementId);var newElement=jQuery(oldElement).clone();jQuery(oldElement).attr("id",fileId);jQuery(oldElement).before(newElement);jQuery(oldElement).appendTo(form);jQuery(form).css("position","absolute");jQuery(form).css("top","-1200px");jQuery(form).css("left","-1200px");jQuery(form).appendTo("body");return form},ajaxFileUpload:function(s){s=jQuery.extend({},jQuery.ajaxSettings,s);var id=new Date().getTime();var form=jQuery.createUploadForm(id,s.fileElementId,(typeof(s.data)=="undefined"?false:s.data));var iframe=jQuery.createUploadIframe(id,s.secureuri);if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}var requestDone=false;var xml={};if(s.global){jQuery.event.trigger("ajaxSend",[xml,s])}var uploadCallback=function(isTimeout){try{if(iframe.contentWindow){xml.responseText=iframe.contentWindow.document.body?iframe.contentWindow.document.body.innerHTML:null;xml.responseXML=iframe.contentWindow.document.XMLDocument?iframe.contentWindow.document.XMLDocument:iframe.contentWindow.document}else{if(iframe.contentDocument){xml.responseText=iframe.contentDocument.document.body?iframe.contentDocument.document.body.innerHTML:null;xml.responseXML=iframe.contentDocument.document.XMLDocument?iframe.contentDocument.document.XMLDocument:frame.contentDocument.document}}}catch(e){jQuery.handleError(s,xml,null,e)}if(xml||isTimeout=="timeout"){requestDone=true;var status;try{status=isTimeout!="timeout"?"success":"error";if(status!="error"){var data=jQuery.uploadHttpData(xml,s.dataType);if(s.success){s.success(data,status)}if(s.global){jQuery.event.trigger("ajaxSuccess",[xml,s])}}else{jQuery.handleError(s,xml,status)}}catch(e){status="error";jQuery.handleError(s,xml,status,e)}if(s.global){jQuery.event.trigger("ajaxComplete",[xml,s])}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}if(s.complete){s.complete(xml,status)}jQuery(iframe).unbind();setTimeout(function(){try{jQuery(iframe).remove();jQuery(form).remove()}catch(e){jQuery.handleError(s,xml,null,e)}},100);xml=null}};if(s.timeout>0){setTimeout(function(){if(!requestDone){uploadCallback("timeout")}},s.timeout)}try{jQuery(form).attr("action",s.url);jQuery(form).attr("method","POST");jQuery(form).attr("target","jUploadFrame"+id);if(form.encoding){jQuery(form).attr("encoding","multipart/form-data")}else{jQuery(form).attr("enctype","multipart/form-data")}jQuery(form).submit()}catch(e){jQuery.handleError(s,xml,null,e)}jQuery(iframe).load(uploadCallback);return{abort:function(){}}},uploadHttpData:function(r,type){var data=!type;data=type=="xml"||data?r.responseXML:r.responseText;if(type=="script"){jQuery.globalEval(data)}if(type=="json"){eval("data = "+data)}if(type=="html"){jQuery("<div>").html(data).evalScripts()}return data},handleError:function(s,xml,status,e){if(s.error){s.error.call(s.context||s,xhr,status,e)}if(s.global){(s.context?jQuery(s.context):jQuery.event).trigger("ajaxError",[xhr,s,e])}}});