var cheerButton;
var hideButtonIntervalMilliseconds;
var lastButtonShowTime;

function randomRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function hideCheerButton() {
    console.log('hiding cheer btn');
    cheerButton.style.display = 'none';
    if(lastButtonShowTime != undefined) {
        let timeBetweenBtnPresses = Date.now() - lastButtonShowTime;
        hideButtonIntervalMilliseconds += timeBetweenBtnPresses;
    }

    setTimeout(showCheerButton, hideButtonIntervalMilliseconds);
}


function showCheerButton() {
    console.log('showing cheer btn');
    lastButtonShowTime = Date.now();

    cheerButton.style.marginLeft = `${randomRange(0, 60)}%`;
    cheerButton.style.marginTop  = `${randomRange(0, 200)}px`;
    cheerButton.style.display = 'block';
}


function initFocuserBtnController() {
    cheerButton = document.getElementById('cheer-btn');
    hideButtonIntervalMilliseconds = 10;
    lastButtonShowTime = undefined;
}