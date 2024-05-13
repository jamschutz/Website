var ezio;
var timer = 0;
const TARGET_TIME_IN_MILLISECONDS = 5000;
const TOTAL_SPINS = 3;
const MAX_SIZE = 300;

const TARGET_TIME = new Date(2024, 4, 13, 19);
console.log(TARGET_TIME);


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


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        ezio = document.getElementById('ezio');
        timer = 0;

        var timeRemaining = TARGET_TIME.getTime() - Date.now();
        console.log(timeRemaining);
        setTimeout(spinAndGrow, timeRemaining);
    }
})(window, document, undefined);