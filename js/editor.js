/************************************* editor file ******************************************/

/* global mhe */

var configValue = {};

//added by sumedh  //add comment while checking in package

///////////////////////////Start Comment//////////////////////

var config = {};
config.exploreButton = true;
config.questionDisplay = true;
config.yInterceptOption = true;
config.slopeOption = true;
config.x1TextBoxValue = 1;
config.x2TextBoxValue = 1;

var mhe = {};

mhe.onResize = function(callback){
	$(window).resize(function(){
		callback();
	});

};

mhe.setSize = function(callback){

};

mhe.addLinkToThemeCss = function(){

};

mhe.onWidgetReady = function(callback){
	$(document).ready(function(){
		//console.log("launch");
		callback();


	});
};

mhe.initialParams = {};

mhe.initialParams.configFile = {};

mhe.getConfigFile = function(configFileUrl, onSuccess, onError){

	//getConfigFile()
	if(typeof configFileUrl == "object"){
		onSuccess(config);
	}else{
		onError();
	}
//	, onSuccess, onError
}
mhe.updateConfigFile = function(data){
// console.log(data);
};

///////////////////////////End Comment//////////////////////

mhe.onWidgetReady(function() {
  var tempCheck = 1;
  var config = {};

                  $(document).ready(function(){
                                    //console.log("launch");
                                    //callback();

                                    //listen for edit popup show button click

                                    });

  function listenForConfigChanges() {

    mhe.onResize(function(width, height) {

		setTimeout(function(){
			if(typeof configValue.x1TextBoxValue !== "undefined"){
				resetValue(configValue);
			}else{
				loadingValues();
			}
			customSetting();
		},100);
    });

	$(".editorInner input").on('input',function(e){
		tempCheck = 0;
		$('#updateChanges').click();
	});

	$(".editorInner input").change(function(){
		tempCheck = 0;
		$('#updateChanges').click();
	});

    $('#updateChanges').on('click', function() {
							config.questionDisplay = $("#checkboxG4").prop("checked");
							config.exploreButton = $("#checkboxG5").prop("checked");
							config.yInterceptOption = $("#yIntercept_e").prop("checked");
							config.slopeOption = $("#slopeChk_e").prop("checked");

							if($("#x1Text").val() !== "" && typeof $("#x1Text").val() !== "undefined"){
								config.x1TextBoxValue = $("#x1Text").val();
							}else{
								config.x1TextBoxValue = 1;
							}

							if($("#x2Text").val() !== "" && typeof $("#x2Text").val() !== "undefined"){
								config.x2TextBoxValue = $("#x2Text").val();
							}else{
								config.x2TextBoxValue = 1;
							}


							//console.log(config);
							configValue = config;
							/*Code for chart*/

							if(typeof config.questionDisplay !== "undefined"){
								if(config.questionDisplay === true){
									$('.question_Div').css({'display': "block"});
								} else{
									$('.question_Div').css({'display': "none"});
								}
							}else{
								$('.question_Div').css({'display': "block"});
							}

							if(typeof config.exploreButton !== "undefined"){
								if(config.exploreButton === true){
									$('.toogleQuestion').css({'display': "block"});
								} else{
									$('.toogleQuestion').css({'display': "none"});
								}
							}else{
								$('.toogleQuestion').css({'display': "block"});
							}

							if(typeof config.yInterceptOption !== "undefined"){
								if(config.yInterceptOption === true){
									$("#yInterceptBox").css({'display':'inline-block'});
								}else{
									$("#yInterceptBox").css({'display':'none'});
								}
							}else{
								$("#yInterceptBox").css({'display':'inline-block'});
							}

							if(typeof config.slopeOption !== "undefined"){
								if(config.slopeOption === true){
									$("#slopeBox").css({'display':'inline-block'});
								}else{
									$("#slopeBox").css({'display':'none'});
								}
							}else{
								$("#slopeBox").css({'display':'inline-block'});
							}

							if(tempCheck === 0){
								resett();
								tempCheck = 1;
							}
							//resett();

							mhe.updateConfigFile(config);
                       });
  }


  function getConfigFile() {
    function onSuccess(configIn) {
		configValue = config = configIn;
		//console.log(config);
		if(config.questionDisplay === true){
			$("#checkboxG4").prop("checked",true);
		}else{
			$("#checkboxG4").prop("checked",false);
		}

		if(config.exploreButton === true){
			$("#checkboxG5").prop("checked",true);
		}else{
			$("#checkboxG5").prop("checked",false);
		}

		if(config.yInterceptOption === true){
			$("#yIntercept_e").prop("checked",true);
		}else{
			$("#yIntercept_e").prop("checked",false);
		}

		if(config.slopeOption === true){
			$("#slopeChk_e").prop("checked",true);
		}else{
			$("#slopeChk_e").prop("checked",false);
		}

		$("#x1Text").val(config.x1TextBoxValue);
		$("#x2Text").val(config.x2TextBoxValue);


		/*Code for chart*/
		if(config.questionDisplay === true){
			$('.question_Div').css({'display': "block"});
		} else{
			$('.question_Div').css({'display': "none"});
		}

		if(config.exploreButton === true){
			$('.toogleQuestion').css({'display': "block"});
		} else{
			$('.toogleQuestion').css({'display': "none"});
		}

		if(config.yInterceptOption === true){
			$("#yInterceptBox").css({'display':'inline-block'});
		}else{
			$("#yInterceptBox").css({'display':'none'});
		}

		if(config.slopeOption === true){
			$("#slopeBox").css({'display':'inline-block'});
		}else{
			$("#slopeBox").css({'display':'none'});
		}

    if(config.yInterceptOption === false && config.slopeOption === false){
    // $(".formula_outer").hide();
   }else{
    // $(".formula_outer").show();
   }

		listenForConfigChanges();
		setTimeout(function(){
			//resetValue(configValue);
			resett();

		},300);


    }
    function onError(){
      alert('Failed to get config file.');
    }

	loadingValues();
	customSetting();

    if (mhe.initialParams && mhe.initialParams.configFile) {
      var configFileUrl = mhe.initialParams.configFile;
      mhe.getConfigFile(configFileUrl, onSuccess, onError);
    }
    else {
      listenForConfigChanges();
    }
  }


  getConfigFile();
  //launch document ready
  appLaunched();
//for_editpopup();
});
function for_editpopup(){
document.getElementById("checkboxG5").setAttribute("tabIndex","0");

document.getElementById("absc").setAttribute("tabIndex","0");
document.getElementById("absc").setAttribute("onKeyPress","openSubmenu(this)");

document.getElementById("checkboxG4").setAttribute("tabIndex","0");
document.getElementById("n_question").setAttribute("tabIndex","0");
document.getElementById("n_question").setAttribute("onKeyPress","openSubmenu(this)");

document.getElementById("slopeChk_e").setAttribute("tabIndex","0");
document.getElementById("slopeChk_e").setAttribute("onKeyPress","openSubmenu(this)");

document.getElementById("yIntercept_e").setAttribute("tabIndex","0");
document.getElementById("yIntercept_e").setAttribute("onKeyPress","openSubmenu(this)");
document.getElementById("yIntercept_e").setAttribute("onkeydown","configmenu(event)");

document.getElementById("yChk").setAttribute("onkeydown","closePopMenu(event)");

document.getElementById("checkboxG5").setAttribute("tabIndex","-1");
document.getElementById("checkboxG4").setAttribute("tabIndex","-1");
document.getElementById("slopeChk_e").setAttribute("tabIndex","-1");
document.getElementById("yIntercept_e").setAttribute("tabIndex","-1");

}
