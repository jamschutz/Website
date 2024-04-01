async function getCurrentState() {
    console.log('getting state...')
    let uri = 'https://sheets.googleapis.com/v4/spreadsheets/15fh5Mo-S9DDzFVaBBkbjw5np9JJEMs8393iBXRlg2fo/values/state?key=AIzaSyDVHHN6eVNT8JjGRN7v9c9rte_QdyDXmPk';
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

    console.log('hi')

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