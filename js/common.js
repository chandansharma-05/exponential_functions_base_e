/* exported appLaunched */
/* exported resetValue */
/* exported loadingValues */
/* exported customSetting */

/* exported drawHyperbolas */
/* exported midPoint */
/* exported checkbox */
/* exported initialValueOfSlider */
/* exported popmenu */
/* exported focusRise */
/* exported searchMenu */
/* exported resett */
$(document).ready(function(){

					$('.formula_outer').hide();
					$("#searchBtn").click(function(){

						if(($("#slopChk").css("display") === "none") && ($("#yChk").css("display") === "none")){
							// console.log("done");
						} else{
								$(".formula_outer").toggle();
								$(".edit-popup").hide();
						}
						if (($(".formula_outer").css("display") === "block")) {
									$(".refresh_part span").show();
												$("#arrowspop").addClass("arrowPopcss");
												$("#searchBtn").addClass("searchActive");
										} else {
									$(".refresh_part span").hide();
												$("#arrowspop").removeClass("arrowPopcss");
												$("#searchBtn").removeClass("searchActive");
									}
						});

		});


function appLaunched() {
	$(".edit-toggle-button").on("click", function(){
		 if($(".edit-popup").css("display") === "none"){
			 $(this).css("background-color","#bbc6be");
		 $(".edit-popup").css("display", "block");
		 }else{
		 $(".edit-popup").css("display", "none");
			$(this).css("background-color","transparent");
		 }
	 });

$(".up").click(function(){
	var parentId = $(this).parent().attr("id");
	if(typeof parentId !== "undefined"){
		var TextBoxValue = Number($("#"+parentId+" .txtValue").val());
		if(typeof TextBoxValue !== "undefined"){
			if($("#"+parentId+" .txtValue").attr("max") >= TextBoxValue + 0.1){
				$("#"+parentId+" .txtValue").val((TextBoxValue + 0.1).toFixed(1));
				var event = {};
				event.type = "keyup";
				moveSlider(event, $("#"+parentId+" .txtValue").attr("id"), $("#"+parentId+" .txtValue").attr("min"), $("#"+parentId+" .txtValue").attr("max"));

				$("#"+parentId+" .down").css("background-image","url(images/thik_down_arrow.png)");
				$(this).css("background-image","url(images/thik_up_arrow.png)");
				$("#"+parentId+" .txtValue").click();
				if(Number($("#"+parentId+" .txtValue").val()) === Number($("#"+parentId+" .txtValue").attr("max"))){
					$(this).css("background-image","url(images/thin_up_arrow.png)");
				}
			}else{

				$(this).css("background-image","url(images/thin_up_arrow.png)");
					popAlert($("#"+parentId+" .txtValue").attr("min"),$("#"+parentId+" .txtValue").attr("max"));

			}
		}

	}

});
$("#btnOk").click(function(){
	$("#alertBox").hide();
});
$(".down").click(function(){
	var parentId = $(this).parent().attr("id");
	if(typeof parentId !== "undefined"){
		var TextBoxValue = Number($("#"+parentId+" .txtValue").val());
		if(typeof TextBoxValue !== "undefined"){
			if($("#"+parentId+" .txtValue").attr("min") <= TextBoxValue-0.1){
				$("#"+parentId+" .txtValue").val((TextBoxValue - 0.1).toFixed(1));
				var event = {};
				event.type = "keyup";
				moveSlider(event, $("#"+parentId+" .txtValue").attr("id"), $("#"+parentId+" .txtValue").attr("min"), $("#"+parentId+" .txtValue").attr("max"));

				$("#"+parentId+" .up").css("background-image","url(images/thik_up_arrow.png)");
				$(this).css("background-image","url(images/thik_down_arrow.png)");

				$("#"+parentId+" .txtValue").click();

				if(Number($("#"+parentId+" .txtValue").val()) === Number($("#"+parentId+" .txtValue").attr("min"))){
					$(this).css("background-image","url(images/thin_down_arrow.png)");
				}

			}else{
				$(this).css("background-image","url(images/thin_down_arrow.png)");
				/* alert("Please enter a value between -10 and 10 to the nearest tenth."); */
				popAlert($("#"+parentId+" .txtValue").attr("min"),$("#"+parentId+" .txtValue").attr("max"));
			}
		}
	}

});

    div_attributes();
}




changeValues();
//0.1 increment input type number
function changeValues(event, id, min, max) {
    var tempevent = {};
    tempevent.type = "keyup";
    if (typeof event !== "undefined") {
        if (event.key !== "Backspace" && event.key !== "Delete") {
            var textBoxValueHolder = document.getElementById(id);
            var num = 0;
            num = Number(textBoxValueHolder.value);
            if (textBoxValueHolder > max || textBoxValueHolder < min) {
                // console.log(" empty block");
            } else {
                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    textBoxValueHolder.value = (num - 0.1).toFixed(1);
                    moveSlider(tempevent, id, max, min);
                } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    textBoxValueHolder.value = (num + 0.1).toFixed(1);
                    moveSlider(tempevent, id, max, min);
                }

            }

        }
    }
}
setDefaultValue();

function setDefaultValue(min, max, value) {
    if ($("#x1Text").val() === "") {

        var id = $("#x1Text").attr("id");
        var tempEvent = {};
        tempEvent.type = "keyup";
        setTimeout(function() {
            $("#x1Text").val(min);
            moveSlider(tempEvent, id, min, max);
        }, 200);

    }
}


function arrowNumberStatus(id) {
    var actualId = id.slice(0, 2) + "Value";
    //console.log(actualId);
    if (Number($("#" + actualId + " .txtValue").val()) === Number($("#" + actualId + " .txtValue").attr("min"))) {
        $($("#" + actualId + " .down")).css("background-image", "url(images/thin_down_arrow.png)");
    } else {
        $($("#" + actualId + " .down")).css("background-image", "url(images/thik_down_arrow.png)");
    }

    if (Number($("#" + actualId + " .txtValue").val()) === Number($("#" + actualId + " .txtValue").attr("max"))) {
        $($("#" + actualId + " .up")).css("background-image", "url(images/thin_up_arrow.png)");
    } else {
        $($("#" + actualId + " .up")).css("background-image", "url(images/thik_up_arrow.png)");
    }


}




/******************************** Exponential Functions, Base e ************************/

var sg;
var utile = new Utile();
var svgObj;
var holder;
var info;
var aValue=0;
var kValue=0;
var ktValue=0;
var eValue=0;
var intersectChecked = false;
var asymptoteChecked = false;

window.onload = function(){
	holder = document.getElementById("svgHolder");
	holder.scrollLeft = 180;
	holder.scrollTop = 180;

	sg = new SVGraphs({
		'holder': document.getElementById("svgHolder"),
		'scaleX1': -11,
		'scaleY1': -11,
		'scaleX2': 11,
		'scaleY2': 11,
		'ticksY': 0.1,
		'ticksX': 0.1,
	});
	sg.zoom(3);
	sg.drawGraph();
	svgObj = document.getElementById('svgObj');

	resetValue(configValue);
	loadTouch();
	ploatequation();
}


function zoomIn()
{

	if(sg.zoomValue > 0)
	{
		redraw(sg.zoomValue - 1);
	}
	else
	{
		document.getElementById("zoomin").src = "images/plus1.png";
		document.getElementById("zoomout").src = "images/minus.png";
	}
}

function zoomOut()
{
	if(sg.zoomValue < 6)
	{
		redraw(sg.zoomValue + 1);
	}
	else
	{
		document.getElementById("zoomin").src = "images/plus.png";
		document.getElementById("zoomout").src = "images/minus1.png";
	}
}

function redraw(zoom){
	document.getElementById("svgHolder").removeChild(svgObj);
	sg.zoom(zoom);
	sg.drawGraph();
	initialValueOfSlider();
	loadTouch();
	svgObj = document.getElementById('svgObj');
	ploatequation();
}

function ploatequation(checkId, countCheck)
{
	var mValue, bValue;
	mValue = Number(document.getElementById("x1Text").value); // m = base value form textbox

	if(document.getElementById("mvalue")) {
		if(mValue>=0) {
			document.getElementById("mvalue").innerHTML=mValue;
			// document.getElementById("mvalue2").innerHTML=mValue;
		} else {
			document.getElementById("mvalue").innerHTML= ' ('+mValue+')';
			// document.getElementById("mvalue2").innerHTML= ' ('+mValue+')';
		}
	}

	bValue = document.getElementById("x2Text").value; // b = base value form textbox
	if(document.getElementById("bvalue")) {
		if(bValue>=0){
		document.getElementById("bvalue").innerHTML= bValue;
		document.getElementById("bvalue2").innerHTML= "(0, "+mValue+")";
		// document.getElementById("bvalue2").innerHTML= bValue;
		}else{
			document.getElementById("bvalue").innerHTML=' ('+bValue+')';
			document.getElementById("bvalue2").innerHTML=' (0, '+mValue+')';
			// document.getElementById("bvalue2").innerHTML=' ('+bValue+')';
		}
	}

	var drLine = document.getElementById("drawLine");
	if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
	sg.SVGNode.appendChild(drawLine(mValue, bValue));

	if(intersectChecked) {
		var drLine1 = document.getElementById("showintercept");
		if(drLine1 != null) document.getElementById("svgObj").removeChild(drLine1);
		sg.SVGNode.appendChild(this.showIntercept(mValue));
	} else {
		var drLine = document.getElementById("showintercept");
		if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
	}

	if(asymptoteChecked) {
		var drLine = document.getElementById("drawLine");
		if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
		sg.SVGNode.appendChild(drawLine(mValue, bValue));

		var drLine = document.getElementById("showasymptote");
		if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
		sg.SVGNode.appendChild(this.showAsymptote(mValue));
	} else {
		var drLine = document.getElementById("showasymptote");
		if(drLine != null)
		{
			document.getElementById("svgObj").removeChild(drLine);
		}
	}

	switch (checkId) {
		  case "slopChk":
					asymptoteChecked = false;
					if(countCheck === 1) {
						var drLine = document.getElementById("drawLine");
						if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
						sg.SVGNode.appendChild(drawLine(mValue, bValue));

						var drLine = document.getElementById("showasymptote");
						if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
						sg.SVGNode.appendChild(this.showAsymptote(mValue));
						asymptoteChecked = true;
					} else {
						var drLine = document.getElementById("showasymptote");
						if(drLine != null)
						{
							document.getElementById("svgObj").removeChild(drLine);
						}
					}
		      break;
		  case "yChk":
					intersectChecked = false;
					if(countCheck === 1) {
						var drLine = document.getElementById("showintercept");
						if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
						sg.SVGNode.appendChild(this.showIntercept(mValue));
						intersectChecked = true;
					} else {
						var drLine = document.getElementById("showintercept");
						if(drLine != null) document.getElementById("svgObj").removeChild(drLine);
					}
					break;
			default:
	}
}

function circle(x, y)
{
	var circ;
	xPoint = (sg.maxPUP * (x/sg.ticksX));
	yPoint = (sg.maxPUP * (y/sg.ticksY));

	yPoint = (-1 * yPoint);
	//Limiting the value of y to -1000 because large values of y (positive or negative) cannot be plotted
	if(yPoint<-10000){
		yPoint=-10000;
	}

	yPoint = parseInt(yPoint + sg.zeroOrgin[0]);
	xPoint = parseInt(xPoint +  sg.zeroOrgin[1]);

	if(!isNaN(xPoint) && isFinite(xPoint)){
		circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circ.setAttribute('cx', xPoint);
		circ.setAttribute('cy', yPoint);
		circ.setAttribute('r', 4);
		circ.setAttribute('stroke-width', '.75pt');
		circ.setAttribute('fill', '0072bc');
		return circ;
	}
	return null;
}

function showIntercept(b)
{
	// b = 1;
	var xPoint = 0;
	var yPoint = 0;
	var x = 0, y = 0;

	var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	group.setAttribute('id', 'showintercept');

	var x1 = b;
	var circ = this.circle(0, x1);
	if(circ != null)group.appendChild(circ);
	line = line123(0, x1, b);
	if (line != null) group.appendChild(line);
	return group;
}

function showAsymptote(bValue)
{
	// bValue = parseFloat(bValue);
	var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	group.setAttribute('id', 'showasymptote');

	var lineV =  document.createElementNS('http://www.w3.org/2000/svg','line');
	lineV.setAttribute('style', 'stroke:#E07777;stroke-width:1.5pt;stroke-dasharray:4pt,2pt;fill:none');
	lineV.setAttribute('id', 'showasymptoteVert');
	var x1 = 0, x2 = 0, y1 = 0,	y2 = 0;
	// bValue=bValue;
	x1 = (((sg.maxPUP * (sg.scaleY1/sg.ticksY))) + sg.zeroOrgin[0]);
	y1 = ((-1 * sg.maxPUP * (bValue/sg.ticksX)) + sg.zeroOrgin[1]);
	x2 = (((sg.maxPUP * (sg.scaleY2/sg.ticksY))) + sg.zeroOrgin[0]);
	y2 = ((-1 * sg.maxPUP * (bValue/sg.ticksX)) + sg.zeroOrgin[1]);
	lineV.setAttribute('x1', x1);
	lineV.setAttribute('y1', y1);
	lineV.setAttribute('x2', x2);
	lineV.setAttribute('y2', y2);
	group.appendChild(lineV);

	return group;
}

function line123(x, y, b) {
    if (typeof x !== "undefined") {
        var circ;
        var xPoint;
        var yPoint;

        xPoint = (sg.maxPUP * (x / sg.ticksX));
        yPoint = (sg.maxPUP * (y / sg.ticksY));

        yPoint = (-1 * yPoint);
        //Limiting the value of y to -1000 because large values of y (positive or negative) cannot be plotted
        if (yPoint < -10000) {
            yPoint = -10000;
        }

        yPoint = parseInt(yPoint + sg.zeroOrgin[0], 10);
        xPoint = parseInt(xPoint + sg.zeroOrgin[1], 10);

        if (!isNaN(xPoint) && isFinite(xPoint)) {
            circ = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            circ.setAttribute('x', xPoint + 10);
            circ.setAttribute('y', yPoint + 20);
            circ.setAttribute('r', 4);
            //circ.setAttribute('stroke', '0072bc');
            circ.setAttribute('stroke-width', '.75pt');
            circ.setAttribute('fill', '0072bc');
            circ.appendChild(document.createTextNode("(" + x.toFixed(0) + "," + y + ")"));
            //console.log(circ);
            return circ;
        }
        return null;
    }
}

///////////////////////////////////////////////////////////

function drawLine(a , k){

	var xPoint = 0;
	var yPoint = 0;
	var x, y;
	var dataStr = 'M ';

	var path =  document.createElementNS('http://www.w3.org/2000/svg','path');
	path.setAttribute('style', 'stroke:#77C6DD;stroke-width:1.5pt;fill:none;');;
	path.setAttribute('id', 'drawLine');

	eValue = Math.E;
	//console.log('A Value = '+a);
	//console.log('K Value = '+k);

	var incr = 0.02;
	if(sg.zoomValue > 3)
	{
		incr = 0.1;
	}

	for(var x = sg.scaleX1; x<(sg.scaleX2 + 10); x+=incr){

		ktValue = k * x;

		y = a * (Math.pow(eValue, ktValue));

		xPoint = (sg.maxPUP * (x/sg.ticksX));
		yPoint = (sg.maxPUP * (y/sg.ticksY));

		yPoint = (-1 * yPoint);

		if(yPoint<-10000){
			yPoint=-10000;
		}

		yPoint = yPoint + sg.zeroOrgin[0];
		xPoint = xPoint +  sg.zeroOrgin[1];


		if(!isNaN(yPoint) && isFinite(yPoint)){
			dataStr += xPoint + " " + yPoint + " L";
		}
	}
	dataStr = dataStr.replace(/L *$/g, "");
	path.setAttribute('d', dataStr );
	return path;
}


function resetValue(config) {
	// console.log("config........ ",config);
    if ($(window)
        .width() < 768) {
        _dragMax = parseInt($(".slider_1_Color")
            .css("width"), 10) - 24;
    } else {
        _dragMax = parseInt($(".slider_1_Color")
            .css("width"), 10) - 24;
    }

    document.getElementById("sliderFill_1").style.width =
    document.getElementById("x1Point")
        .style.left = _dragMin + ((_dragMax - _dragMin) * (parseFloat(config.x1TextBoxValue, 2) - (0.1))) / (_scaleMax - (0.1)) + "px";

    document.getElementById("sliderFill_2").style.width =
    document.getElementById("x2Point")
        .style.left = _dragMin + ((_dragMax - _dragMin) * (parseFloat(config.x2TextBoxValue, 2) - (0.1))) / (_scaleMax - (0.1)) + "px";

    document.getElementById("x1Text").value = config.x1TextBoxValue;
    document.getElementById("x2Text").value = config.x2TextBoxValue;

}

function resett(resetData) {
		intersectChecked = false;
		asymptoteChecked = false;
		
    document.getElementById("yChk")
        .style.background = 'url("images/02_tickmark_blank.png")';
    document.getElementById("slopChk")
        .style.background = 'url("images/02_tickmark_blank.png")';
    yChk = false;
    slopChk = false;
    if (typeof configValue.x1TextBoxValue !== "undefined" && typeof resetData === "undefined") {
        resetValue(configValue);
    } else {
        loadingValues();
    }
    this.redraw(3);
    holder.scrollLeft = 120;
    holder.scrollTop = 180;
    customSetting();
	$(".formula_outer").hide();
	$("#arrowspop").removeClass("arrowPopcss");
	$(".refresh_part span").hide();
	 $("#searchBtn").removeClass("searchActive");


}

// function resetValue()
// {
// 	_scaleMin = 0.1;
// 	_scaleMax = 5;
// 	document.getElementById("x1Point").style.left = _dragMin +  ((_dragMax - _dragMin) * (1 - _scaleMin)) / (_scaleMax - _scaleMin) + "px";
// 	document.getElementById("x2Point").style.left = _dragMin +  ((_dragMax - _dragMin) * (1 - _scaleMin)) / (_scaleMax - _scaleMin) + "px";
//
// 	document.getElementById("x1Text").value = 1;
// 	document.getElementById("x2Text").value = 1;
//
// 	document.getElementById("avalue").value = 1;
// 	document.getElementById("kvalue").value = 1;
//
// }

// function resett()
// {
// 	resetValue();
// 	this.redraw(3);
// 	holder.scrollLeft = 180;
// 	holder.scrollTop = 180;
// }

checkbox();
function checkbox(id) {
  var check = document.getElementById(id);
  var countCheck = 0;
  if (id === "yChk") {
      if (!yChk) {
          countCheck = 1;
          check.style.background = 'url("images/03_tickmark.png")';
          document.getElementById('yInt')
              .style.display = 'inline-block';
          yChk = true;

      } else {
        countCheck = 0;
          check.style.background = 'url("images/02_tickmark_blank.png")';
          yChk = false;
          document.getElementById('yInt')
              .style.display = 'none';
      }
      this.ploatequation("yChk", countCheck);
  }  else if (id === "slopChk") {
      if (!slopChk) {
        countCheck = 1;
          check.style.background = 'url("images/03_tickmark.png")';
          document.getElementById('slopeB')
              .style.display = 'inline-block';
          slopChk = true;
      } else {
        countCheck = 0;
          check.style.background = 'url("images/02_tickmark_blank.png")';
          document.getElementById('slopeB')
              .style.display = 'none';
          slopChk = false;
      }
      this.ploatequation("slopChk", countCheck);
  }
}



/******************************** Close Exponential Functions, Base e ************************/

/********************************  Editor_sliderControl ************************/
//***************************************************************************************
// Draging Slider (Starting)
//***************************************************************************************
var _dragObj = {};
var _dragValue = {};
//var _baseValue = {};

var _dragMin = 0;
var _dragMax = 235;
var _scaleMin = 0.1;
var _scaleMax = 5;
//var _scaleInterval = 0.1;

var _varNotEqualZero = false;

document.ontouchstart = moveSlider;
document.onmousedown = moveSlider;
document.onkeydown = moveSlider;
document.onmouseup = dragStop;
document.ontouchend = dragStop;
document.onmousemove = dragGo;
document.ontouchmove = dragGo;

$(document).ready(function() {

    $(".toogleQuestion").click(function() {
        if ($(this).hasClass("active") === true) {
            $(".question_Div").removeClass("active");
            $(this).removeClass("active");
        } else {
            $(".question_Div").addClass("active");
            $(this).addClass("active");
        }
    });

    var tempHolderData = "";
    $(".txtValue").on("change keyup mouseup", function(e) { //console.log( $(this).val())
        var id = "#" + $(this).attr("id");
        // console.log($(id).val());
        if (e.key !== "Backspace" && e.key !== "Delete" && tempHolderData !== "Backspace" && tempHolderData !== "Delete") {
            setTimeout(function() {
                var txtBoxValue = $(id).val();
                var maxx = Number($(id).attr("max"));
                var minn = Number($(id).attr("min"));
                //console.log(maxx + " " + txtBoxValue + " " + minn);
                //var maxx= 10, minn = -10;
                //console.log(txtBoxValue > maxx || txtBoxValue < minn);
                if (txtBoxValue > maxx || txtBoxValue < minn) {

                    popAlert(minn, maxx);
                    if (txtBoxValue <= minn) {
                        $(id).val(minn);
                    } else {
                        $(id).val(maxx);
                    }

                    $(id).click();
                }
            }, 50);
        } else {
            tempHolderData = e.key;
        }
    });

    $(".txtValue").on("blur", function() {
        if ($(this).val() === "") {

            var tempEvent = {};
            tempEvent.type = "keyup";
            var minn = $(this).attr("min");
            var max = $(this).attr("max");
            var id = $(this).attr("id");
            setTimeout(function() {
                $("#" + id).val(minn);
                moveSlider(tempEvent, id, minn, max);
            }, 50);

        }
    });


    if ($(window).width() < 768) {
        _dragMax = parseInt($(".slider_1_Color").css("width"), 10) - 21;
    } else {
        _dragMax = parseInt($(".slider_1_Color").css("width"), 10) - 21;
    }
    customSetting();

  $(".txtValue").on("change", function(event){
	var px = $(this).val();
	if (_scaleMin <= px) {

		if (_scaleMax >= px) {
			// console.log(event+" "+ $(this).attr("id")+" "+$(this).attr("min")+" "+$(this).attr("max"));
			moveSlider(event, $(this).attr("id"),$(this).attr("min"), $(this).attr("max"));

		}

	}
});
$(document).on('click', '.txtValue', function () {
	var px = $(this).val();
	if (_scaleMin <= px) {
		if (_scaleMax >= px) {
			px = _dragMin + ((_dragMax - _dragMin) * (px - _scaleMin)) / (_scaleMax - _scaleMin);
			//dragMove(px, false);'
			//console.log(event+" "+ $(this).attr("id")+" "+$(this).attr("min")+" "+$(this).attr("max"));
			moveSlider(event, $(this).attr("id"),$(this).attr("min"), $(this).attr("max"));
		}
	}
});

    $(window).resize(function() {
        setTimeout(function() {
            customSetting();
						resett();
        }, 300);

        if ($(window).width() < 768) {
            _dragMax = parseInt($(".slider_1_Color").css("width"), 10) - 21;
        } else {
            _dragMax = parseInt($(".slider_1_Color").css("width"), 10) - 21;
        }
        //loadingValues();
    });
    setTimeout(function() {
        //loadingValues();
    });

    loadingValues();

    $(document).on('change click', '.txtValue', function() {
        var txtBoxValue = $(this).val();
        var maxx = 10,
            minn = -10;
        if (txtBoxValue >= maxx || txtBoxValue <= minn) {
            //alert("Please enter a value between -10 and 10 to the nearest tenth.");
        }
    });

});

var _scaleMin = 0.1;
var _scaleMax = 5;
//var _scaleInterval = 0.1;

var _varNotEqualZero = false;

document.ontouchstart = moveSlider;
document.onmousedown = moveSlider;
document.onmouseup = dragStop;
document.ontouchend = dragStop;
document.onmousemove = dragGo;
document.ontouchmove = dragGo;

var dargMove = false;

function initialValueOfSlider() {
    document.getElementById('yInt')
        .style.display = 'none';
    document.getElementById('slopeB')
        .style.display = 'none';
}


var desabledText = 0;
$(document).ready(function() {
    $(".txtValue").keypress(function() {
        desabledText = 0;
    });
});

function moveSlider(event, id, minn, maxx) {

    var x, y;
    try {
        _dragObj.elNode = document.getElementById(id.replace(/Text/g, "Point"));
        _dragValue.elNode = document.getElementById(id.replace(/Point/g, "Text"));
    } catch (e) {
        return 0;
    }

    if (event.type === "keyup") {

        if (_dragValue.elNode.value.length < 5) {
            var px = _dragValue.elNode.value;
            if (_scaleMin <= px) {
                if (_scaleMax >= px) {
                    px = _dragMin + ((_dragMax - _dragMin) * (px - _scaleMin)) / (_scaleMax - _scaleMin);
                    dragMove(px, false);
                }
            }
        }
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        _dragObj.elNode = document.getElementById(id.replace(/Point/g, "Text"));
        if (_scaleMax > $("#" + _dragObj.elNode.id)
            .val() && _scaleMin <= $("#" + _dragObj.elNode.id)
            .val()) {
            $("#" + _dragObj.elNode.id)
                .val(parseInt($("#" + _dragObj.elNode.id)
                    .val(), 10) + 1);
        }

    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        _dragObj.elNode = document.getElementById(id.replace(/Point/g, "Text"));
        if (_scaleMax >= $("#" + _dragObj.elNode.id)
            .val() && _scaleMin < $("#" + _dragObj.elNode.id)
            .val()) {
            $("#" + _dragObj.elNode.id)
                .val(parseInt($("#" + _dragObj.elNode.id)
                    .val(), 10) - 1);
        }
    } else if (event.type === "mousedown" || event.type === "touchstart") {
        _scaleMin = minn;
        _scaleMax = maxx;

        if (event.type === "touchstart") {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;

        } else {
            x = event.clientX;
            y = event.clientY;
        }

        _dragObj.cursorStartX = x;

        _dragObj.cursorStartY = y;
        _dragObj.elStartLeft = parseInt(_dragObj.elNode.offsetLeft, 10);

        if (isNaN(_dragObj.elStartLeft)) _dragObj.elStartLeft = 0;

        dargMove = true;

        /*try {
        	document.attachEvent("onmousemove", dragGo);
        	document.attachEvent("onmouseup",   dragStop);
        	window.event.cancelBubble = true;
        	window.event.returnValue = false;
        }
        catch (e) {
        	document.addEventListener("mousemove", dragGo,   true);
        	document.addEventListener("mouseup",   dragStop, true);
        	event.preventDefault();
        }*/
    }

}
pointMoving();
function pointMoving(event, id, minn, maxx) {
	if(typeof event !== "undefined"){
	var base;
    if (id.indexOf(3) >= 0) {
        base = 0;
        _scaleMin = 0;
    } else {
        base = _scaleMin;
        _scaleMin = 0.1;
    }

    //var x, y;
    try {
        _dragObj.elNode = document.getElementById(id.replace(/Text/g, "Point"));
        _dragValue.elNode = document.getElementById(id.replace(/Point/g, "Text"));
    } catch (e) {
        return 0;
    }
    if (event.type === "keyup") {

        if (_dragValue.elNode.value.length < 4) {
            var px = _dragValue.elNode.value;

            if (_scaleMin <= px) {
                if (_scaleMax >= px) {
                    px = _dragMin + ((_dragMax - _dragMin) * (px - _scaleMin)) / (_scaleMax - _scaleMin);
                    dragMove(px, false);
                }
            }
        }
    }
	}
}

function dragGo(event) {
    var x, y;
    if (dargMove) {
        if (event.type === "touchmove") {
            try {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            } catch (e) {
                x = event.touches[0].clientX + window.scrollX;
                y = event.touches[0].clientY + window.scrollY;
            }
        } else {
            try {
                x = event.clientX;
                y = event.clientY;
            } catch (e) {
                x = event.clientX + window.scrollX;
                y = event.clientY + window.scrollY;
            }
        }
        var drLeft = (_dragObj.elStartLeft + x - _dragObj.cursorStartX);
        dragMove(drLeft, true, event);
    }
}

var sliderActive = null;

function dragMove(drLeft, tracevalue, event) {
    var base = _scaleMin;

	//if(typeof event !== "undefined"){
    if (drLeft >= _dragMin) {
        if (drLeft <= _dragMax) {
            _dragObj.elNode.style.left = drLeft + "px";
			sliderProgress(drLeft);
            if (tracevalue) {
                base = utile.roundNumber(_scaleMin + ((_scaleMax - _scaleMin) * (_dragObj.elNode.offsetLeft - _dragMin)) / (_dragMax - _dragMin), 1);

                if (_varNotEqualZero)
                    if (base === 0) base = 0.1;
                _dragValue.elNode.value = base;
                //_baseValue.elNode.innerHTML = base;

            }
        } else {
            _dragObj.elNode.style.left = _dragMax + "px";
			sliderProgress(_dragMax);
            if (tracevalue) {
                base = utile.roundNumber(_scaleMin + ((_scaleMax - _scaleMin) * (_dragObj.elNode.offsetLeft - _dragMin)) / (_dragMax - _dragMin), 1);
                if (_varNotEqualZero)
                    if (base === 0) base = 0.1;
                _dragValue.elNode.value = base;
                //_baseValue.elNode.innerHTML = base;
            }
        }
    } else {
        _dragObj.elNode.style.left = _dragMin + "px";
		sliderProgress(_dragMin);
        if (tracevalue) {
            base = utile.roundNumber(_scaleMin + ((_scaleMax - _scaleMin) * (_dragObj.elNode.offsetLeft - _dragMin)) / (_dragMax - _dragMin), 1);
            if (_varNotEqualZero)
                if (base === 0) base = 0.1;
            _dragValue.elNode.value = base;
            //_baseValue.elNode.innerHTML = base;
        }
    }

	function sliderProgress(drLeft){
		//console.log(drLeft);
		if(_dragValue.elNode.id.indexOf("1") >= 0){
			if($(".slider_1_Color").width() > drLeft){
				$("#sliderFill_1").css("width", drLeft);
			}
		}else if(_dragValue.elNode.id.indexOf("2") >= 0){
			if($(".slider_1_Color").width() > drLeft){
				$("#sliderFill_2").css("width", drLeft);
			}
		}else if(_dragValue.elNode.id.indexOf("3") >= 0){
			if($(".slider_1_Color").width() > drLeft){
				$("#sliderFill_3").css("width", drLeft);
			}
		}
	}
	sliderActive = null;
	if(event) {
		sliderActive = event.target.id;
	}
	//input number arrows status
	arrowNumberStatus(_dragValue.elNode.id);

    try {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
        this.ploatequation(sliderActive);
    } catch (e) {
        this.ploatequation(sliderActive);
        event.preventDefault();
    }
}

function dragStop(event) {
    dargMove = false;
}

isNumberKey();
function isNumberKey(event, id) {
    if(typeof event !=="undefined"){
        var keycode = event.keyCode || event.Which;

        if (keycode !== 8 || (keycode < 37 || keycode > 40)) //if the key is the (backspace, left, right, down, up) key
        {

            if ((keycode < 48 || keycode > 57) && keycode !== 45 && keycode !== 46) //if not a number, minus(-) and dot(.)
            {
                return false; // disable key press
            } else {
                _dragValue.elNode = document.getElementById(id);

                if (_dragValue.elNode.value.length < 4)
                    return true; // enable key press
                else
                    return false; // disable key press
            }
        }
    }
}
function popAlert(value){
	 var winH = $(window).height();
	 var idH = $("#alertBox").height();
	 $("#alertBox").css("top", (winH /2 - idH /2) + "px");
	 $("#alertBox").show();
	 var msg = "Please enter a value between 0.1 and 5 to the nearest tenth.";
	 if(typeof value !== "undefined"){
		document.getElementById("alertMessage").innerHTML = value;
	 }else{
		document.getElementById("alertMessage").innerHTML = msg;
	 }

}
changeValues();
//0.1 increment input type number
function changeValues(event, id, min, max) {
    var tempevent = {};
    tempevent.type = "keydown";

    if (typeof event !== "undefined") {

        var textBoxValueHolder = document.getElementById(id);
        var num = 0;
        num = Number(textBoxValueHolder.value);
        if (textBoxValueHolder > max || textBoxValueHolder < min) {
              // console.log('textBoxValueHolder');
        } else {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                textBoxValueHolder.value = (num - 0.1).toFixed(1);
                moveSlider(tempevent, id, min, max);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                textBoxValueHolder.value = (num + 0.1).toFixed(1);
                moveSlider(tempevent, id, min, max);

            }

        }

    }
}

function popAlert(min, max) {
    var winH = $(window).height();
    var idH = $("#alertBox").height();
    $("#alertBox").css("top", (winH / 2 - idH / 2) + "px");
    $("#alertBox").show();
    var msg = "Please enter a value between " + min + " and " + max + " to the nearest tenth.";
    document.getElementById("alertMessage").innerHTML = msg;
}
//********          Draging Slider (Ending)         *************************************

/********************************  Close Editor_sliderControl ************************/

/********************************  SVGraphs ************************/
function SVGraphs(config) {
    this.holder = config.holder;
    this.scaleX1 = config.scaleX1;
    this.scaleX2 = config.scaleX2;
    this.scaleY1 = config.scaleY1;
    this.scaleY2 = config.scaleY2;
    this.ticksY = config.ticksY;
    this.ticksX = config.ticksX;
}

SVGraphs.prototype.SVGNode = null;
SVGraphs.prototype.width = 0;
SVGraphs.prototype.height = 0;
SVGraphs.prototype.maxPUP = 40;
SVGraphs.prototype.minPUP = 10;
SVGraphs.prototype.unitsX = 0;
SVGraphs.prototype.unitsY = 0;
SVGraphs.prototype.majorLineStyle = 'stroke:#58595b;stroke-width:.25pt;fill:none'; //'stroke:#000000;stroke-width:.5pt;';
SVGraphs.prototype.minorLineStyle = 'stroke:#999999;stroke-width:.5pt';
SVGraphs.prototype.xyAxisLineStyle = 'stroke:#58595b;stroke-width:1pt'; //stroke:#333333;stroke-width:1.5pt'
SVGraphs.prototype.labelStyle = 'font-size:12; fill:#000000;background-color:#FFFFFF';
SVGraphs.prototype.zeroOrginStyle = 'font-size:14; fill:#000000;font-style:italic; font-weight:bold';
SVGraphs.prototype.zoomValue = 1;
SVGraphs.prototype.zeroOrgin = [0, 0];


SVGraphs.prototype.zoom = function(zoomlevel) {
    var tickers = [0.1, 0.2, 0.5, 1, 2, 5, 10];
    var UPP = [1, 2, 5, 10, 10, 10, 10];

    if (zoomlevel > 3) {
        this.scaleX1 = -100;
        this.scaleX2 = 100;
        this.scaleY1 = -100;
        this.scaleY2 = 100;
    } else {
        this.scaleX1 = -16;
        this.scaleX2 = 16;
        this.scaleY1 = -16;
        this.scaleY2 = 16;
    }

    this.zoomValue = zoomlevel;
    this.ticksY = tickers[zoomlevel];
    this.ticksX = tickers[zoomlevel];

    this.unitsX = (Math.abs(this.scaleX1) + Math.abs(this.scaleX2)) / tickers[zoomlevel];
    this.unitsY = (Math.abs(this.scaleY1) + Math.abs(this.scaleY2)) / tickers[zoomlevel];


    this.width = this.unitsX * this.maxPUP;
    this.height = this.unitsY * this.maxPUP;
    this.minPUP = this.maxPUP / UPP[zoomlevel];
};


SVGraphs.prototype.drawUnitsXY = function(config) {
    var step = config.step;
    var style = config.style;
    var shape = config.shape;
    var label = config.label;
    var xy;
    var lbrect;
    var xAxisSt = (Math.abs(this.scaleX1) / this.ticksX) * this.maxPUP; ///x Axis starting position (in System move left position)
    var yAxisSt = (Math.abs(this.scaleY1) / this.ticksY) * this.maxPUP; ///y Axis starting position (in System move top position)

    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', config.group);

    var scaleLabel = this.scaleX1; //x scale start value
    for (var i = step; i < this.width; i += step) {
        var axisY = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        axisY.setAttribute('id', 'axisY' + i);
        axisY.setAttribute('d', 'M ' + i + ' 0 L ' + i + " " + this.height.toString());
        axisY.setAttribute('style', style);

        if (shape) {
            axisY.setAttribute('shape-rendering', 'crispEdges');
        }

        group.appendChild(axisY);

        if (label) {
            //find intersect of 2 lines [0, yAxisSt, this.width, yAxisSt] y axis line
            //xy have label position of x, y;
            xy = utile.intersection(i, 0, i, this.height, 0, yAxisSt, this.width, yAxisSt);

            scaleLabel += this.ticksX; // x scale incrementing
            if (utile.roundNumber(scaleLabel, 1) !== 0) {
                lbrect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                lbrect.setAttribute('x', xy[0] - 5);
                lbrect.setAttribute('y', xy[1] - 14);
                lbrect.setAttribute('width', '10px');
                lbrect.setAttribute('height', '14px');
                lbrect.setAttribute('style', 'fill:#FFFFFF');
                group.appendChild(lbrect);

                var labelY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                labelY.setAttribute('id', 'labelY' + i);
                labelY.setAttribute('x', xy[0] + 5);
                labelY.setAttribute('y', xy[1] - 2);
                labelY.setAttribute('text-anchor', 'end');
                labelY.setAttribute('style', this.labelStyle);
                if (this.zoomValue < 3) {
                    labelY.appendChild(document.createTextNode(utile.roundNumber(scaleLabel, 1).toFixed(1)));
                } else {
                    labelY.appendChild(document.createTextNode(utile.roundNumber(scaleLabel, 1)));
                }
                group.appendChild(labelY);
            }
        }
    }

    scaleLabel = this.scaleY1; //y scale start value
    for (var j = step; j < this.height; j += step) {
        var axisX = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        axisX.setAttribute('id', 'axisX' + j);
        axisX.setAttribute('d', 'M 0 ' + j + ' L ' + this.width.toString() + " " + j);
        axisX.setAttribute('style', style);

        if (shape) {
            axisX.setAttribute('shape-rendering', 'crispEdges');
        }

        group.appendChild(axisX);

        if (label) {
            //find intersect of 2 lines [xAxisSt, 0, xAxisSt, this.height] x axis line
            //xy have label position of x, y;
            xy = utile.intersection(0, j, this.width, j, xAxisSt, 0, xAxisSt, this.height);
            var lbl = '';
            scaleLabel += this.ticksY; // y scale incrementing
            if (utile.roundNumber(scaleLabel, 1) !== 0) {
                if (this.zoomValue < 3) {
                    lbl = (utile.roundNumber(scaleLabel, 1) * -1).toFixed(1).toString();
                } else {
                    lbl = (utile.roundNumber(scaleLabel, 1) * -1).toString();
                }

                lbrect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                var width;
                if (scaleLabel > 0) {
                    width = lbl.replace(".", "").length * 9;
                } else {
                    width = lbl.replace(".", "").length * 9;
                }

                lbrect.setAttribute('x', xy[0] - width);
                lbrect.setAttribute('y', xy[1] - 6);
                lbrect.setAttribute('width', width);
                lbrect.setAttribute('height', '14px');
                lbrect.setAttribute('style', 'fill:#FFFFFF');
                group.appendChild(lbrect);

                var labelX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                labelX.setAttribute('id', 'labelX' + j);
                labelX.setAttribute('x', xy[0] - 2);
                labelX.setAttribute('y', xy[1] + 5);
                labelX.setAttribute('text-anchor', 'end');
                labelX.setAttribute('style', this.labelStyle);
                labelX.appendChild(document.createTextNode(lbl));
                group.appendChild(labelX);
            }
        }

    }
    return group;
};

SVGraphs.prototype.drawAxisXY = function() {

    var xAxisSt = (Math.abs(this.scaleX1) / this.ticksX) * this.maxPUP; ///x Axis starting position (in System move left position)
    var yAxisSt = (Math.abs(this.scaleY1) / this.ticksY) * this.maxPUP; ///y Axis starting position (in System move top position)
    //alert([xAxisSt, yAxisSt]);
    var asympgroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    asympgroup.setAttribute('id', 'asymptoteLines');
    asympgroup.setAttribute('style', 'visibility:hidden');

    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'xyAxis');

    var axisY = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    axisY.setAttribute('id', 'axisY');
    axisY.setAttribute('d', 'M ' + xAxisSt + ' 0 L ' + xAxisSt + " " + this.height.toString());
    axisY.setAttribute('style', this.xyAxisLineStyle);
    axisY.setAttribute('shape-rendering', 'crispEdges');

    var axisX = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    axisX.setAttribute('id', 'axisX');
    axisX.setAttribute('d', 'M 0 ' + yAxisSt + ' L ' + this.width.toString() + " " + yAxisSt);
    axisX.setAttribute('style', this.xyAxisLineStyle);
    axisX.setAttribute('shape-rendering', 'crispEdges');

    group.appendChild(axisX);
    group.appendChild(axisY);

    ////////////// Arrows /////////////////////
    group.appendChild(utile.Polygon('up', xAxisSt, 5));
    group.appendChild(utile.Polygon('down', xAxisSt, this.height - 5));
    group.appendChild(utile.Polygon('left', 5, yAxisSt));
    group.appendChild(utile.Polygon('right', this.width - 5, yAxisSt));

    /////////////////////Y label///////////////////////
    var ylable = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ylable.setAttribute('x', xAxisSt + 10);
    ylable.setAttribute('y', 15);
    ylable.setAttribute('style', this.zeroOrginStyle);
    ylable.appendChild(document.createTextNode("y"));
    group.appendChild(ylable);

    /////////////////////X label///////////////////////
    var xlable = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xlable.setAttribute('x', this.width - 15);
    xlable.setAttribute('y', yAxisSt + 15);
    xlable.setAttribute('style', this.zeroOrginStyle);
    xlable.appendChild(document.createTextNode("x"));
    group.appendChild(xlable);

    //////////////Zero Orgin label///////////////////
    var xy = utile.intersection(xAxisSt, 0, xAxisSt, this.height, 0, yAxisSt, this.width, yAxisSt);
    var labelOrg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    labelOrg.setAttribute('id', 'zeroOrg');
    labelOrg.setAttribute('x', xy[0] - 5);
    labelOrg.setAttribute('y', xy[1] - 5);
    labelOrg.setAttribute('text-anchor', 'end');
    labelOrg.setAttribute('style', this.zeroOrginStyle);
    labelOrg.appendChild(document.createTextNode("O"));
    group.appendChild(labelOrg);

    this.SVGNode.appendChild(group);
    this.SVGNode.appendChild(asympgroup);

    this.zeroOrgin = xy;
    return group;
};

SVGraphs.prototype.drawGraph = function() {
    //console.log([this.width, this.height]);
    if (this.width > 0 && this.height > 0) {
        this.SVGNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.holder.appendChild(this.SVGNode);

        this.SVGNode.setAttribute('id', "svgObj");
        this.SVGNode.setAttribute('width', this.width + "px");
        this.SVGNode.setAttribute('height', this.height + "px");
        this.SVGNode.setAttribute('viewport', '0 0 ' + this.width + ' ' + this.height);
        this.SVGNode.setAttribute('style', '-webkit-transform:scale(1);');
        //this.SVGNode.setAttribute('shape-rendering', 'crispEdges');


        var rect = document.getElementById("svgrect");
        if (rect === null) {
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        }
        rect.setAttribute('id', "svgrect");
        rect.setAttribute('width', this.width + "px");
        rect.setAttribute('height', this.height + "px");
        rect.setAttribute('style', 'stroke:#58595b;stroke-width:.25pt;fill:#FFFFFF;'); //stroke:#333333;stroke-width:1pt;fill:none

        this.SVGNode.appendChild(rect);
        //this.SVGNode.appendChild(this.drawUnitsXY({'step': this.minPUP, 'group': 'minAxis', 'style': this.minorLineStyle, 'shape': false, 'label': false}));
        this.SVGNode.appendChild(this.drawUnitsXY({
            'step': this.maxPUP,
            'group': 'maxAxis',
            'style': this.majorLineStyle,
            'shape': false,
            'label': true
        }));
        this.drawAxisXY();

    }

};

SVGraphs.prototype.drawRectLabel = function() {
    //var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('id', 'label');
    rect.setAttribute('width', '20px');
    rect.setAttribute('height', this.height);
    rect.setAttribute('x', (this.width / 2) - 20);
    rect.setAttribute('y', this.height / 2);
    rect.setAttribute('style', 'fill:#FFFFFF'); //stroke:#000000;stroke-width:.25pt;
    return rect;
};

SVGraphs.prototype.drawEquation = function(node) {
    this.SVGNode.appendChild(node);
};
/********************************  close SVGraphs ************************/

/********************************  touchHandler ************************/
//***************************************************************************************
// TouchHandler (Starting)
//***************************************************************************************

var IsIPad = function() {
    if (!navigator.appVersion.match(/Windows/g)) {
        document.getElementById("zoomin").style.visibility = "hidden";
        document.getElementById("zoomout").style.visibility = "hidden";
        return true;
    } else {
        document.getElementById("zoomin").style.visibility = "hidden";
        document.getElementById("zoomout").style.visibility = "hidden";
        return false;
    }
};

function loadTouch() {

    try {
        if (new IsIPad()) {
            document.getElementById("x1Point").addEventListener("touchstart", touchHandler, true);
            document.getElementById("x1Point").addEventListener("touchmove", touchHandler, true);
            document.getElementById("x1Point").addEventListener("touchend", touchHandler, true);
            document.getElementById("x1Point").addEventListener("touchcancel", touchHandler, true);

            document.getElementById("x2Point").addEventListener("touchstart", touchHandler, true);
            document.getElementById("x2Point").addEventListener("touchmove", touchHandler, true);
            document.getElementById("x2Point").addEventListener("touchend", touchHandler, true);
            document.getElementById("x2Point").addEventListener("touchcancel", touchHandler, true);

            document.getElementById("x3Point").addEventListener("touchstart", touchHandler, true);
            document.getElementById("x3Point").addEventListener("touchmove", touchHandler, true);
            document.getElementById("x3Point").addEventListener("touchend", touchHandler, true);
            document.getElementById("x3Point").addEventListener("touchcancel", touchHandler, true);

            document.getElementById("x4Point").addEventListener("touchstart", touchHandler, true);
            document.getElementById("x4Point").addEventListener("touchmove", touchHandler, true);
            document.getElementById("x4Point").addEventListener("touchend", touchHandler, true);
            document.getElementById("x4Point").addEventListener("touchcancel", touchHandler, true);


            document.getElementById("svgHolder").addEventListener('gesturestart', gestureHandler, true);
            document.getElementById("svgHolder").addEventListener('gesturechange', gestureHandler, true);
            document.getElementById("svgHolder").addEventListener('gestureend', gestureHandler, true);


            document.getElementById("svgHolder").addEventListener("touchstart", touchHandlerNew, true);
            document.getElementById("svgHolder").addEventListener("touchmove", touchHandlerNew, true);
            document.getElementById("svgHolder").addEventListener("touchend", touchHandlerNew, true);
            document.getElementById("svgHolder").addEventListener("touchcancel", touchHandlerNew, true);

            document.getElementById("bgDiv").addEventListener('touchstart', touchHandlerBdy, true);
            document.getElementById("bgDiv").addEventListener('touchmove', touchHandlerBdy, true);
            document.getElementById("bgDiv").addEventListener('touchend', touchHandlerBdy, true);
            document.getElementById("bgDiv").addEventListener('touchcancel', touchHandlerBdy, true);

            document.getElementById("bgDiv").addEventListener('gesturestart', gestureHandlerBdy, true);
            document.getElementById("bgDiv").addEventListener('gesturechange', gestureHandlerBdy, true);
            document.getElementById("bgDiv").addEventListener('gestureend', gestureHandlerBdy, true);

        }
    } catch (e) {}

}

function touchHandlerNew(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        // info.innerHTML="dsffg";
        return false;
    }
}

function gestureHandlerBdy(event) {
    event.preventDefault();
    event.returnValue = false;
    return false;
}

function touchHandlerBdy(event) {
    event.preventDefault();
    event.returnValue = false;
    return false;
}


//var w,h,wS,hS;
var touchX, touchY, orgXPercnt, orgYPercnt;

function gestureHandler(event) {
    event.preventDefault();
    var lastW, lastH;
    if (event.type === 'gesturestart') {
        event.preventDefault();
        //var lastW, lastH;

        //holder.style.webkitOverflowScrolling="auto";

        lastW = svgObj.getAttribute("width");
        lastH = svgObj.getAttribute("height");

        touchX = event.pageX - holder.offsetLeft;
        touchY = event.pageY - holder.offsetTop;
        var sL, sT;
        sL = holder.scrollLeft;
        sT = holder.scrollTop;

        orgXPercnt = (touchX + sL) / parseInt(lastW, 10);
        orgYPercnt = (touchY + sT) / parseInt(lastH, 10);

    }

    if (event.type === 'gesturechange') {
        event.preventDefault();
        if ((event.scale < 1 && sg.zoomValue === 6) || (event.scale > 1 && sg.zoomValue === 0)) {
            //Do nothing
            // console.log();
        } else {
            svgObj.style.webkitTransform = "scale(" + event.scale + ")";
            svgObj.style.webkitTransformOrigin = (orgXPercnt * 100) + "% " + (orgYPercnt * 100) + "%";
        }
    }

    if (event.type === "gestureend") {
        var zflag = true;
        event.preventDefault();
        if (event.scale > 1) {
            zoomIn();
            zflag = false;
        } else if (event.scale < 1) {
            zoomOut();
            zflag = true;
        }

        //svgObj.style.webkitTransform = "scale(1)";
        //svgObj.style.webkitTransformOrigin = '0% 0%';

        //var lastW, lastH;
        lastW = svgObj.getAttribute("width");
        lastH = svgObj.getAttribute("height");

        if (sg.zoomValue === 4 && zflag === true) {
            holder.scrollLeft = 1750;
            holder.scrollTop = 1750;
        } else {
            holder.scrollLeft = (orgXPercnt * parseInt(lastW, 10)) - touchX;
            holder.scrollTop = (orgYPercnt * parseInt(lastH, 10)) - touchY;
        }

        /*if(sg.zoomValue === 0)
        {
        	holder.style.webkitOverflowScrolling="touch";
        }
        else
        {
        	holder.style.webkitOverflowScrolling="touch";
        }*/
    }
}

function touchHandler(event) {
    event.preventDefault();
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
    first.target.dispatchEvent(simulatedEvent);
}

//********          TouchHandler (Ending)         *************************************
/********************************  Close touchHandler ************************/

/********************************  utile ************************/
function Utile(config) {

}

Utile.prototype.roundVal = function(val) {
    var dec = 2;
    var result = Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
};

Utile.prototype.Polygon = function(dir, xPos, yPos) {
    var polygon;
    var polystring = '';
    if (dir === "right") {
        polystring = (xPos - 5) + "," + (yPos - 5) + " " + (xPos + 5) + "," + yPos + " " + (xPos - 5) + "," + (yPos + 5);
    } else if (dir === "left") {
        polystring = (xPos + 5) + "," + (yPos + 5) + " " + (xPos - 5) + "," + yPos + " " + (xPos + 5) + "," + (yPos - 5);
    } else if (dir === "up") {
        polystring = (xPos - 5) + "," + (yPos + 5) + " " + xPos + "," + (yPos - 5) + " " + (xPos + 5) + "," + (yPos + 5);
    } else if (dir === "down") {
        polystring = (xPos - 5) + "," + (yPos - 5) + " " + (xPos + 5) + "," + (yPos - 5) + " " + xPos + "," + (yPos + 5);
    }
    polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', polystring);
    polygon.setAttribute('style', 'fill:#000000;');
    return polygon;
};

Utile.prototype.roundNumber = function(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
};

Utile.prototype.intersection = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var x12 = x1 - x2;
    var x34 = x3 - x4;
    var y12 = y1 - y2;
    var y34 = y3 - y4;

    var c = (x12 * y34) - (y12 * x34);

    var a = (x1 * y2) - (y1 * x2);
    var b = (x3 * y4) - (y3 * x4);

    var x = ((a * x34) - (b * x12)) / c;
    var y = ((a * y34) - (b * y12)) / c;
    return [x, y];
};


/********************************  Close utile ************************/
function loadingValues() {

    if ($(window)
        .width() < 768) {
        _dragMax = parseInt($(".slider_1_Color")
            .css("width"), 10) - 24;
    } else {
        _dragMax = parseInt($(".slider_1_Color")
            .css("width"), 10) - 24;
    }

    document.getElementById("sliderFill_1").style.width =
    document.getElementById("x1Point")
        .style.left = _dragMin + ((_dragMax - _dragMin) * (1 - (0.1))) / (_scaleMax - (0.1)) + "px";

    document.getElementById("sliderFill_2").style.width =
   document.getElementById("x2Point")
        .style.left = _dragMin + ((_dragMax - _dragMin) * (1 - (0.1))) / (_scaleMax - (0.1)) + "px";


    document.getElementById("x1Text")
        .value = 1;
    document.getElementById("x2Text")
        .value = 1;

}
function graphHeightControl() {
    if ($("body").width() > 900) {
        var graphWidth = $("body").height() - 75 - 60;
        if (graphWidth > 600) {
            $("#svgHolder").height(600);
        } else if (graphWidth > 100) {
            $("#svgHolder").height(graphWidth);
        }
    } else {
        var partOne = $(".left_side").height();
        var footerHeight = $(".footer_main").height();
        var totalHeight = $("body").height();
			if($(window).width() < 480){
				totalHeight = totalHeight - footerHeight - partOne +70;
				// console.log("480");
			} else if($(window).width() > 480 && $(window).width() < 900){
				totalHeight = totalHeight - footerHeight - partOne -60;
				// console.log("768");
			} else{
				totalHeight = totalHeight - footerHeight - partOne -30;
				// console.log("768 more");
			}
  		$("#svgHolder").height(totalHeight);
        //console.log(totalHeight +" "+ footerHeight +" "+ partOne);
        // if (totalHeight < 100) {
        //     $("#svgHolder").height(150);
        // } else if (totalHeight > 100) {
				//     $("#svg	Holder").height(totalHeight);
        // }
    }

    //check for square size
    if ($("#svgHolder").width() < $("#svgHolder").height()) {
        if ($(".right_side").height() > ($("#svgHolder").width() + 40)) {
            $("#svgHolder").height($("#svgHolder").width());
        }
    }
     if ($(window).width() > 900) {
        $("#svgHolder").width($("#svgHolder").height());
        $("#svgHolder").css("margin", "0px auto");
    }

    if ($(window).width() < 350) {
        if (($(".toogleQuestion").css("display") === "none") && ($(".question_Div").css("display") === "none")) {
            $("#svgHolder").height($("#svgHolder").width() + 170);
        } else if (($(".toogleQuestion").css("display") === "none") || ($(".question_Div").css("display") === "none")) {
            $("#svgHolder").height($("#svgHolder").width() + 120);
        } else {
            $("#svgHolder").height($("#svgHolder").width() + 40);
        }
    }
}

function customSetting() {

    var scrollDiv = $("#svgHolder");
    graphHeightControl();
    setTimeout(function() {
        // console.log("always came in ");
        if ($(window).width() < 770) {

            scrollDiv.scrollLeft(($("#svgObj").width() - $("#svgHolder").width()) / 2);
            scrollDiv.scrollTop(($("#svgObj").height() - $("#svgHolder").height()) / 2);
        } else {
            scrollDiv.scrollLeft(($("#svgObj").width() - $("#svgHolder").width() + 12) / 2);
            scrollDiv.scrollTop(($("#svgObj").height() - $("#svgHolder").height() + 12) / 2);
        }
    }, 450);
}

function div_attributes() {
    document.getElementById("svgHolder").setAttribute("tabIndex", "0");
    document.getElementById("searchBtn").setAttribute("tabIndex", "0");
    var div_attr_point = ["tabIndex", "ontouchmove", "ontouchend", "ontouchstart", "onkeydown", "onMouseDown", "onkeyup"];
    var div_values_1 = ["0", "dragGo(event)", "dragStop(event)", "moveSlider(event, id, 0.1, 5);", "moveSlider(event, id, 0.1, 5);", "moveSlider(event, id, 0.1, 5);", "pointMoving(event, id, 0.1, 5);"];
    var div_values_2 = ["0", "dragGo(event)", "dragStop(event)", "moveSlider(event, id, 0.1, 5);", "moveSlider(event, id, 0.1, 5);", "moveSlider(event, id, 0.1, 5);", "pointMoving(event, id, 0.1, 5);"];
    var input_elements = ["title", "tabIndex", "min", "max", "type", "pattern", "onKeyPress", "onKeyUp", "onkeydown", "onMouseDown", "onblur"];
    var input_element_values = ["", "0", "0.1", "5", "number", "[0-9]*", "return isNumberKey(event, id);", "moveSlider(event, id, 0, 10)", "changeValues(event, id, 0.1, 5)", "moveSlider(event, id, 0.1, 5)", "setDefaultValue(0.1, 5, value)"];
    var input_element_values_1 = ["", "0", "0.1", "5", "number", "[0-9]*", "return isNumberKey(event, id);", "moveSlider(event, id, 0.1, 5)", "changeValues(event, id, 0.1, 5)", "moveSlider(event, id, 0.1, 5)", "setDefaultValue(0.1, 5, value)"];
    var x1point = document.getElementById("x1Point");
    var x2point = document.getElementById("x2Point");
    // var x3point = document.getElementById("x3Point");
    var x1Text = document.getElementById("x1Text");
    var x2Text = document.getElementById("x2Text");
    // var x3Text = document.getElementById("x3Text");
    for (var i = 0; i < div_attr_point.length; i++) {
        x1point.setAttribute(div_attr_point[i], div_values_1[i]);
        x2point.setAttribute(div_attr_point[i], div_values_1[i]);
        // x3point.setAttribute(div_attr_point[i], div_values_2[i]);
        // x4point.setAttribute(div_attr_point[i],div_values_2[i]);
    }
    for (var j = 0; j < input_elements.length; j++) {
        x1Text.setAttribute(input_elements[j], input_element_values[j]);
        x2Text.setAttribute(input_elements[j], input_element_values_1[j]);
        // x3Text.setAttribute(input_elements[j], input_element_values_1[j]);
        // x4Text.setAttribute(input_elements[j],input_element_values_1[j]);
    }

    var checkboxes_attr = document.getElementsByClassName("chckbxDiv");
    for (var h = 0; h < checkboxes_attr.length; h++) {
        checkboxes_attr[h].setAttribute("tabIndex", "0");
        checkboxes_attr[h].setAttribute("onkeypress", "checkbox(id)");
        checkboxes_attr[h].setAttribute("onMouseDown", "checkbox(id)");
    }
    var common_for_radio = document.getElementsByClassName("common_for_radio");
    for (var g = 0; g < common_for_radio.length; g++) {
        common_for_radio[g].setAttribute("type", "radio");
        common_for_radio[g].setAttribute("onClick", "ploatequation()");
        common_for_radio[g].setAttribute("name", "radioButton");
    }
    document.getElementById("reset").setAttribute("tabIndex", "0");
    document.getElementById("reset").setAttribute("onkeypress", "resett(1)");
    document.getElementById("reset").setAttribute("onClick", "resett(1)");
    document.getElementById("svgHolder").setAttribute("tabIndex", "0");



}
setTimeout(function() {
    // console.log('insearch')
    var searchBtn = document.getElementById("searchBtn");
    searchBtn.setAttribute("tabIndex", "0");
    searchBtn.setAttribute("onKeyPress", "openSubmenu(this);");
    searchBtn.setAttribute("onkeydown","focusRise(event)");
}, 200);

openSubmenu();

function openSubmenu(a) {
    if ("undefined" !== typeof a) $(a).click();
}
//popmenu();
function popmenu(event, id) {
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $("#riseChk").focus();
        }, 15);
    }
}
//focusRise();
function focusRise(event, id) {
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $("#slopChk").focus();
        }, 15);
    }
}

//searchMenu();
function searchMenu(event, id) {
    // console.log(id);
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $(searchBtn).focus();
        }, 30);
    }
}
//risefocus();
function risefocus(event, id) {
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $("#riseChk").focus();
        }, 15);
    }
}
//closePopMenu();
function closePopMenu(event, id) {
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $('#searchBtn').focus();
        }, 15);
    }
}
//configmenu();
function configmenu(event, id) {
    var x = event.keyCode;
    if (event === "keydown" || x === 9) {
        setTimeout(function() {
            $(".edit-toggle-button").focus();
        }, 15);
    }
}
