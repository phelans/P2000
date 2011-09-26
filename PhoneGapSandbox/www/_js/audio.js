
// Audio player
//
var my_media = null;
var mediaTimer = null;


function playAudio(src, volumeLevel) {
    //* debug */ alert('playAudio(src:' + src + ')...');
    
    playCount = 1;
    
    if(!phoneGapIsLoaded){
        my_media = document.createElement('audio');
        my_media.setAttribute('src', src);
        /* my_media.setAttribute('loop', true);         */
        my_media.play(playCount);
        return;    
    }
    
    
    // otherwise use the phonegap API    
    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);
    // Play audio   
    my_media.play({numberOfLoops:playCount});

}

// Pause audio
// 
function pauseAudio() {
    if (my_media) {
	my_media.pause();
    }
}

// Stop audio
// 
function stopAudio() {
    if (my_media) {
	my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback 
//
function onError(error) {
    alert('code: '    + error.code    + '\n' + 
	  'message: ' + error.message + '\n');
}

// Set audio position
// 
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}

var _test_score_value = 0;
// TEST
function test_playMultipleAudio(){
    playAudio('assets/audio/pinball_02.wav');    
    playAudio('assets/audio/pinball_00.wav');
    playAudio('assets/audio/pinball_01.wav');
    
    var s1 = setTimeout(test_playScoreSound,500);
    var s2 = setTimeout(test_playScoreSound,1000);
    var s3 = setTimeout(test_playScoreSound,1500);
    var s4 = setTimeout(test_playScoreSound,2000);
    var s5 = setTimeout(test_playScoreSound,2500);    
}

function test_playScoreSound(){
    _test_score_value += 500;
    $("#test_score").html(String(_test_score_value));
    playAudio('assets/audio/score_00.wav');
}

  
