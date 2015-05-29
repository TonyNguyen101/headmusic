var audioCtx = new window.AudioContext();

var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

var windowWIDTH = window.innerWidth;
var windowHEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02; 

var initialFreq = 3000;
var initialVol = 0.01;

oscillator.type = "square";
oscillator.frequency.value = initialFreq;
oscillator.detune.value = 100;
oscillator.start(0);

function changeFreq(str, num) {
			if (str === "plus") {
				oscillator.frequency.value += num;
			}
			else if (str === "minus") {
				oscillator.frequency.value -= num;
			}
		}


oscillator.onended = function(){
	console.log("stopped playing");
};

gainNode.gain.value = initialVol;


/*oscillator.frequency.value = initialFreq;*/

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

var startX = 100;

/*htracker.addEventListener("found", function(event){
	alert('it works');
});*/

/*htracker.addEventListener("found", function(event){
        object.rotationZ(event.angle)
        .positionX(event.x).positionY(event.y)
        .scaleX(event.width).scaleY(event.height);
    });*/


  document.addEventListener("facetrackingEvent", function( event ) {
                // once we have stable tracking, draw rectangle
                if (event.detection == "CS") {
                	if(startX < event.x) {
                		changeFreq('minus', 10);
                	}
                	else if (startX > event.x ) {
                		changeFreq('plus', 10);
                	}
                    startX = event.x;

                }
            });
