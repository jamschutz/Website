var lastCheerTime;
var lastCheerInterval;
var progressBar;
var progressBarFilling;


function getSpeedsterCheerPower() {
    // first cheer is fine
    if(lastCheerTime == undefined) {
        lastCheerTime = Date.now();
        return;
    }

    // second cheer, get first interval
    if(lastCheerInterval == undefined) {
        lastCheerInterval = Date.now() - lastCheerTime;
        lastCheerTime = Date.now();
        return;
    }

    // interval should be half of previous interval
    let cheerInterval = Date.now() - lastCheerTime;
    lastCheerTime = Date.now();

    let cheerPower = cheerInterval <= lastCheerInterval * 0.5? 1 : -1;
    lastCheerInterval = cheerInterval;

    return cheerPower;
}


function updateProgressBar() {
    
}


function initSpeedster() {
    lastCheerTime = undefined;
    lastCheerInterval = undefined;

    progressBar = document.getElementById('speedsterBarContainer');
    progressBarFilling = document.getElementById('speedstarBar');
}