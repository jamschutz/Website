var ezio;
var timer = 0;
const TARGET_TIME_IN_MILLISECONDS = 5000;
const TOTAL_SPINS = 3;
const MAX_SIZE = 300;


function spinAndGrow() {
    let lerpVal = timer / TARGET_TIME_IN_MILLISECONDS;
    let rotation = lerp(0, 360 * TOTAL_SPINS, lerpVal);
    let size = lerp(0, MAX_SIZE, lerpVal);
    ezio.setAttribute("style", "transform: rotate(" + rotation + "deg); transform-origin: 50% 50%;");
    ezio.style.width = `${size}px`;

    timer += 10;
    console.log(timer);
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
        spinAndGrow();
    }
})(window, document, undefined);