async function getCurrentState() {
    let uri = getSheetsUrl('state');
    const response = await fetch(uri);
    const statesJson = await response.json();

    let allStates = statesJson['values'];    
    let stateInfo = allStates[allStates.length - 1];
    let state = stateInfo[1];
    let nextStateTime = stateInfo[2];

    return state;
}


async function showHidePage(targetState) {
    let realPage = document.getElementById('realPage');
    let comeBackMsg = document.getElementById('disallowedMessage');

    let state = await getCurrentState();
    if(state === targetState) {
        comeBackMsg.style.display = 'none';
        realPage.style.display = 'block';
    }
    else {
        comeBackMsg.style.display = 'block';
        realPage.style.display = 'none';
    }
}