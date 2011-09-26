

// --------------- variables ---------------- //
var root = this;
var _menuAnimated = false;
var videoDiv;
var introDiv;
var htmlDiv;
var gameDiv;
var qaDiv;
var pdfDiv;


// -------------- onload stuff ------------- //

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
	
	function onBodyLoad()
	{		
		// document.addEventListener("deviceready",onDeviceReady,false);
        
        // Apple device
        if(usingMobileDevice()){
            document.addEventListener("deviceready",onDeviceReady,false); //document.addEventListener("deviceready",initBingo,false);
        }else{
			// Anything else			
            $(document).ready(function(){
                init('testing'); // testModeFallback = setTimeout("initBingo('testing')", 3000);
            });							
        }	
        
	}
	
	
	
	function onCloseBrowser()
	{
		// alert("In index.html child browser closed");
	}
	
	function locChanged(loc)
	{
		//alert("In index.html new loc = " + loc);
	}
	
	function onOpenExternal()
	{
		//alert("In index.html onOpenExternal");
	}       
	
	/* ------------------------------------ */	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	function onDeviceReady()
	{
	    //* Debug */ // navigator.notification.alert("PhoneGap is working");
	    //* Debug */  // alert('device ready!')
	    init();        
	}
	
	/* ------------------------------------ */        
	function comingSoon(){
	    alert('Functionality coming soon!...');
	}
	
	$(document).ready(function(){                             
	   //* Debug */ alert('running $document.ready()...')
	   init();
	   
	});
	
	// prevent scrolling
	touchMove = function(event) {
		// Prevent scrolling on this element
		event.preventDefault();
	}	

// -------------- onload stuff (end) ------------- //



/* ------------------------------------ */
function init(strMode){

	document.addEventListener("touchstart", new Function(), false);
    
    if(!browserDetection()) return;
    
    if(strMode != 'testing'){
        // navigator.notification.alert("Welcome to Aranesp&reg; Bingo!")
        phoneGapIsLoaded = true;
    }
    
	$("#pdfList").bind("change",function(){
        selectNewPDF();
	});
	
    // init sounds
    playAudio('assets/audio/silence.wav');
	
	//window.addEventListener("orientationchange",adjustHeight,false);
	
	videoDiv = document.getElementById("video");	
	introDiv = document.getElementById("intro");
	htmlDiv = document.getElementById("html");
	gameDiv = document.getElementById("game");
	qaDiv = document.getElementById("qa");	
	pdfDiv = document.getElementById("pdf");
	audioDiv = document.getElementById("audio");
	
	// abort if run already (phonegap/jquery sync thing... sort out later)	    
	if(_menuAnimated != false) return;            
	_menuAnimated = true;
	       
	document.getElementById("logo").className = "fadein_from_left";           
	document.getElementsByClassName("square-buttons")[0].className = "square-buttons fadein_from_left";
	document.getElementsByClassName("nav-wrapper")[0].className = "nav-wrapper fadein_from_left";
	document.getElementsByClassName("group-wrapper")[0].className = "group-wrapper fadein_from_right";	   			
    
}
/* ------------------------------------ */	
function adjustHeight(){
	// handle rotation events
	switch(window.orientation){
		case 0:
			document.body.className = "portrait";
			break;
		case 90:
			document.body.className = "landscape";
			break;
		case 180:
			document.body.className = "portrait";
			break;
		case -90:
			document.body.className = "portrait";
			break;				
	}		
}

/* ------------------------------------ */	
function renderPDFList(specialCase){
	var pdfArray = new Array("Advanced_Selling_Skills_FG_FINAL_NoBranding.pdf",
			      "ARS_Generic_comparison.pdf",
			     "SPBT2011_Brochure_launch.pdf", 
			     "ASMT_REGIONAL_Generic.pdf.pdf",
			      "Backgrounder_Generic.pdf",
			      "DiSC for Eisai Selling Workshop_NoBranding.pdf",
			      "ei112_Participant _Guide_NoBranding.pdf",
			      "Impact_Selling_Model_NoBranding.pdf",
			     "What-great-managers-do_Buckingham.pdf", 
			     "PS101_HIL_MODEL_NoBranding.pdf",
			      "PS101_OFTEN_JA_NoBranding.pdf",
			      "PS105_PreWork_Instructions.pdf",
			      "PS105_PreWork_ScenarioQuestions.pdf",
			      "QA_Generic.pdf",
			      "Role-Play - Physician -- Generic.pdf",
			      "SPBT MAP.pdf",
			      "SPBT_Workshop_REVIEWONLY(notshow).pdf",
			      "SPBT2011_Brochure_interact.pdf",
			      "SPBT2011_Brochure_measure.pdf",
			      "SPBT2011_Brochure_train.pdf",
			      "spbt2011_schedule_4-20-11.pdf");
	
	
	// document.write("<select id='pdfList' onchange='selectNewPDF()'>");
	for(var p = 0;p<pdfArray.length;p++){
	    // if((specialCase == "partial") && (p > 8)) break;
	    var nextPDFFile = pdfArray[p];
	    // document.write("<br/>-<a href=\"Javascript:viewPDF('" + nextPDFFile + "');\" style='font-size:17px;'>" + nextPDFFile.substring(0,25) + "</a>");
	    
	    document.write("<option value='" + nextPDFFile + "'>" + nextPDFFile + "</option>");
	}
	// document.write("</select>");
}

/* ------------------------------------ */
function selectNewPDF(){
// alert('pdf selected!');
    
    var selectedPDFFile = document.getElementById("pdfList").options[document.getElementById("pdfList").selectedIndex].value;
    viewPDF(selectedPDFFile);
}

/* ------------------------------------ */
function viewPDF(strFileName){
    
    //root.onCloseBrowser();
    
    var cb = ChildBrowser.install();
    if(cb != null)
    {
	// root.onCloseBrowser();
	cb.onLocationChange = function(loc){ root.locChanged(loc); };
	cb.onClose = function(){root.onCloseBrowser()};
	cb.onOpenExternal = function(){root.onOpenExternal();};
	
	window.plugins.childBrowser.showWebPage("www/assets/pdf/" + strFileName);
	
    }
    
    if(specialCase != "global") document.getElementById("contentarea").className = "group-wrapper pdfmode";
}


/* ------------------------------------ */
function viewSection(strSection){

var cb = ChildBrowser.install();
cb.close();
document.getElementById("contentarea").className = "group-wrapper";


	video = document.getElementById('videoplayer');	
	video.pause();
	gameDiv.style.display = 'none';
	videoDiv.style.display = 'none';
	htmlDiv.style.display = 'none';
	introDiv.style.display = 'none';
	qaDiv.style.display = 'none';
	pdfDiv.style.display = 'none';
    audioDiv.style.display = 'none';

		
	if(strSection.toUpperCase() == "GAME"){
		gameDiv.style.display = 'block';		
	}else if(strSection.toUpperCase() == "VIDEO"){
		videoDiv.style.display = 'block';
	}else if(strSection.toUpperCase() == "AUDIO"){
		audioDiv.style.display = 'block';
	}else if(strSection.toUpperCase() == "QA"){
		qaDiv.style.display = 'block';				
	}else if(strSection.toUpperCase() == "HTML"){
		
		document.getElementById("img_1").src = 'images/graphics/doodle_td_hue.png';
		document.getElementById("img_2").src = 'images/graphics/doodle_sv_hue.png';
		document.getElementById("img_3").src = 'images/graphics/doodle_al_hue.png';
		document.getElementById("img_4").src = 'images/graphics/doodle_mps_hue.png';			
		htmlDiv.style.display = 'block';		
		/*alert('Tap each icon to see full color verisons...(This is just an example popup message)')*/
	}else if(strSection.toUpperCase() == "PDF"){
    pdfDiv.style.display = 'block';				
}else{
		introDiv.style.display = 'block';
	}
	
}

