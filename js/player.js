
/* global mhe */
/* global appLaunched */

/* global loadingValues */
/* global customSetting */
/* global appLaunched */
/* global resett */


/******************** player ************************/
var configValue = {};
//var screenWidth;


/* global mhe */


//added by sumedh  //add comment while checking in package

///////////////////////////Start Comment//////////////////////

var config = {};
config.exploreButton = true;
config.questionDisplay = true;
config.yInterceptOption = true;
config.slopeOption = true;
config.x1TextBoxValue = 1;
config.x2TextBoxValue = 1;

configValue = config;

var mhe = {};

mhe.onResize = function(callback) {
    callback();
};

mhe.setSize = function(callback) {

};

mhe.addLinkToThemeCss = function() {

};

mhe.onWidgetReady = function(callback) {
    $(document)
        .ready(function() {
            //console.log("launch");
            callback();
        });
};
mhe.caliper = function(data){
//	console.log(data);
}
mhe.initialParams = {};

mhe.initialParams.configFile = {};

mhe.getConfigFile = function(configFileUrl, onSuccess, onError) {

    //getConfigFile()
    if (typeof configFileUrl === "object") {
        onSuccess(config);
    } else {
        onError();
    }
    //	, onSuccess, onError
};

///////////////////////////End Comment//////////////////////

mhe.onWidgetReady(function() {

  function listenForCaliperEvents() {
    [ { elt: 'riseChk', event: {type:'AssessmentEvent', action:'clicked on rise button'} },
      { elt: 'yInterceptOption', event: {type:'AssessmentItemEvent', action:'clicked on Y Intercepts button'} },
      { elt: 'slopChk', event: {type:'AssessmentItemEvent', action:'clicked on Slope button'} },
      { elt: 'x1Text', event: {type:'AssessmentItemEvent', action:'x1 value changed'} },
      { elt: 'x2Text', event: {type:'AssessmentItemEvent', action:'x2 value changed'} }

	  ]
   /* [ { elt: 'looked', event: {type:'AssessmentEvent', action:'Started'} },
      { elt: 'started-typing', event: {type:'AssessmentItemEvent', action:'Started'} },
      { elt: 'submitted-answer', event: {type:'AssessmentItemEvent', answer: "Tallahassee", action:'Completed'} } ]*/
    .forEach(function(spec) {
      if($('#'+spec.elt).hasClass("txtValue")){
		  $('#'+spec.elt).on('change paste keyup', function() {
			spec.event.time = new Date().toISOString();
			mhe.caliper(spec.event);
		  });
	  }else{
		  $('#'+spec.elt).on('click', function() {
			spec.event.time = new Date().toISOString();
			mhe.caliper(spec.event);
		  });
	  }

    });
  }


    function getConfigFile() {

        function onSuccess(config) {
            configValue = config;

			if(config.exploreButton === true){
				$('.toogleQuestion').css({'display': "block"});
			} else{
				$('.toogleQuestion').css({'display': "none"});
			}

            if (config.questionDisplay === true) {
                $('.question_Div')
                    .css({
                        'display': "block"
                    });
            } else {
                $('.question_Div')
                    .css({
                        'display': "none"
                    });
            }

            if (config.yInterceptOption === true) {
                $("#yInterceptBox")
                    .css({
                        'display': 'inline-block'
                    });
            } else {
                $("#yInterceptBox")
                    .css({
                        'display': 'none'
                    });
            }

            if (config.slopeOption === true) {
                $("#slopeBox")
                    .css({
                        'display': 'inline-block'
                    });
            } else {
                $("#slopeBox")
                    .css({
                        'display': 'none'
                    });
            }

             if (config.slopeOption === false && config.yInterceptOption === false) {
                 $("#dottedBtn").hide();
             }

            setTimeout(function() {
                //console.log("in-----")
                //resetValue(configValue);
                resett();
				customSetting();

            },400);


        }

        function onError() {
                alert('Failed to get config file.');
            }
            // console.log("in");
        loadingValues();
		customSetting();

        if (mhe.initialParams && mhe.initialParams.configFile) {
            var configFileUrl = mhe.initialParams.configFile;
            mhe.getConfigFile(configFileUrl, onSuccess, onError);
        }
    }

    function listenForResizeEvents() {
        mhe.onResize(function(width, height) {
            $('#width')
                .text(width);
            $('#height')
                .text(height);


			setTimeout(function(){
				  resett();
				customSetting();
			},400);
        });
    }

    mhe.setSize({
        width: '100%',
        height: '780px'
    });

  listenForCaliperEvents();
  listenForResizeEvents();
  getConfigFile();
  //remove comment while checking in package
  //mhe.onResize();

  mhe.addLinkToThemeCss();

  //launch document ready
  appLaunched();

});
