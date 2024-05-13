var ezio;
var timer = 0;
const TARGET_TIME_IN_MILLISECONDS = 5000;
const TOTAL_SPINS = 3;
const MAX_SIZE = 300;

const TARGET_TIME = new Date(2024, 4, 13, 19);
console.log(TARGET_TIME);

var audioFiles = [];


function spinAndGrow() {
    let lerpVal = timer / TARGET_TIME_IN_MILLISECONDS;
    let rotation = lerp(0, 360 * TOTAL_SPINS, lerpVal);
    let size = lerp(0, MAX_SIZE, lerpVal);
    ezio.setAttribute("style", "transform: rotate(" + rotation + "deg); transform-origin: 50% 50%;");
    ezio.style.width = `${size}px`;

    timer += 10;
    if(timer < TARGET_TIME_IN_MILLISECONDS + 10)
        setTimeout(spinAndGrow, 10);
}

function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}

function initAudioFiles() {
    for(let i = 1; i <= 10; i++) {
        audioFiles.push(new Audio(`audio/pop_${i}.wav`));
        audioFiles.push(new Audio(`audio/bellbeep_${i}.wav`));
        audioFiles.push(new Audio(`audio/bellsynth_${i}.wav`));
    }
    audioFiles.push(new Audio('audio/bellsynth_11.wav'));
}

function playSunriseClip() {
    let sunrise = new Audio('audio/sunrise.wav');
    sunrise.play();
}

function playRandomAudio() {
    let i = randomIntFromInterval(0, audioFiles.length - 1);
    audioFiles[i].play();
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        ezio = document.getElementById('ezio');
        timer = 0;

        initAudioFiles();
        let audioBtn = document.getElementById('audioBtn');
        audioBtn.addEventListener('click', playRandomAudio);

        var timeRemaining = TARGET_TIME.getTime() - Date.now();
        console.log(timeRemaining);
        setTimeout(spinAndGrow, timeRemaining);
        setTimeout(playSunriseClip, timeRemaining - 14000);
    }
})(window, document, undefined);