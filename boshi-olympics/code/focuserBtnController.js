var cheerButton;
var hideButtonIntervalMilliseconds;
var lastButtonShowTime;

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
    cheerButton.style.display = 'block';
}


function initFocuserBtnController() {
    cheerButton = document.getElementById('cheer-btn');
    hideButtonIntervalMilliseconds = 100;
    lastButtonShowTime = undefined;
}