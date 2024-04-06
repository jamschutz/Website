var lastCheerTime;

var paceMsg;
var cheerPowerDisplay;


function getPacerCheerPower() {
    // first cheer is fine
    if(lastCheerTime == undefined) {
        lastCheerTime = Date.now();
        return 1;
    }

    // interval should be half of previous interval
    let cheerInterval = Date.now() - lastCheerTime;
    lastCheerTime = Date.now();

    let cheerPower = 1 - Math.abs((cheerInterval / 1000.0) - 1.0);
    paceMsg.style.display = 'block';
    cheerPowerDisplay.innerText = cheerPower;
    return cheerPower * cheerPower;
}


function initPacer() {
    lastCheerTime = undefined;
    lastCheerInterval = undefined;

    cheerPowerDisplay = document.getElementById('paceMsgValue');
    paceMsg = document.getElementById('paceMsg');

    paceMsg.style.display = 'none';
}