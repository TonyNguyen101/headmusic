var audioCtx = new window.AudioContext();

var oscilattor = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscilattor.connect(gainNode);
gainNode.connect(audioCtx.destination);

var windowWIDTH = window.innerWidth;
var windowHEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02; 

var initialFreq = 3000;
var initialVol = 0.01;

oscilattor.type = "square";
oscilattor.frequency.value = initialFreq;
oscilattor.detune.value = 100;
oscilattor.start(0);

oscilattor.onended = function(){
	console.log("stopped playing");
};

gainNode.gain.value = initialVol;


/*oscilattor.frequency.value = initialFreq;*/

/*document.addEventListener('headtrackrStatus', 
  function (event) {
    if (event.status == "getUserMedia") {
      alert("getUserMedia is supported!");
    }
  }
);*/


var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

/*htracker.addEventListener("found", function(event){
	alert('it works');
});*/

headTracker.addEventListener("found", function(event){
        object.rotationZ(event.angle)
            .positionX(event.x).positionY(event.y)
            .scaleX(event.width).scaleY(event.height);
    });


