/* --------- pi global.js version 1.1 --- */
var shakeTimeout ;


/* prevent scrolling?* 
touchMove = function(event) {
    // Prevent scrolling on this element
    event.preventDefault();
}*/

/* prevent scrolling via keyboard or any other method 
$(window).scroll(function() {
    $(window).scrollTop(0);
    }
);*/


/* prevent scrolling */
$(document).bind("touchmove",function(event){
    event.preventDefault();
});

/* --------------------------------------------*/
function removeSpaces(originalString){						
    var newString = originalString.split(' ').join('');
    return newString;
    //alert(newString);
}

/* --------------------------------------------*/
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}


/* --------------------------------------------*/
function randomRange(min,max) {
	return Math.round(Math.random() * (max-min) + min);
}




    // If you want to prevent dragging, uncomment this section
    /*
     function preventBehavior(e) 
     { 
     e.preventDefault(); 
     };
     document.addEventListener("touchmove", preventBehavior, false);
     */


    /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
    see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
    for more details -jm */
    /*
    function handleOpenURL(url)
    {
    // TODO: do something with the url passed in.
    }
    */

function usingMobileDevice(){
	var userAgent = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	return userAgent;
}

function browserDetection(){
    if((navigator.appVersion.toLowerCase().indexOf("safari",0) == -1) &&
    (navigator.appVersion.toLowerCase().indexOf("webkit",0) == -1)){
        var copyrightDate = new Date();
        document.getElementById("first").style.display = 'none';
        document.write("<div style='font-family:sans-serif;'><h1 style='font-size:25px;'>");
        document.write("Sorry!</h1>This application is only viewable on an iPad or Safari.");
        document.write("<hr/><span style='font-size:10px;color:#888;'>Performance Impact, Inc., " + copyrightDate.getFullYear() + "</div>");
        return false;
    }
    return true;
}


/* --------------------------------------------*/
function startOver(decisionToStartOver){
    
    var url = window.location.toString();
    //Remove anchor from url using the split
    url = url.split("#")[0];    
    window.location.href=url + '?nopasscode=y';
}
/* --------------------------------------------
function startOver(){    
    //if(confirm('Are you sure you want to start over?')){
	//Grab our current Url
	var url = window.location.toString();
	//Remove anchor from url using the split
	url = url.split("#")[0];    
        window.location.href=url; //window.location.href;
    //}    
}*/




/* ------------------------------ */
function checkPasscode(){
    clearTimeout(shakeTimeout);
    removePasscodeShake();
    
    var userInput = document.getElementById("crossword_password_input").value;
    if(userInput == appPasscode){        
        startCrossword();
    }else{                    
        $("#passcodebox").addClass("shake");
        shakeTimeout = setTimeout("removePasscodeShake()", 1500);
    }    
}

function removePasscodeShake(){
    $("#passcodebox").removeClass("shake")
}




function itemHasDisabledStyle(elementID){
    if ($("#" + elementID).attr("class").toLowerCase().indexOf("disable",0) > -1){	
	return true;
    }else{
	return false;
    }
    
}