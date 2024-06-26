
function getSheetsUrl(targetSheet) {
    return `https://sheets.googleapis.com/v4/spreadsheets/15fh5Mo-S9DDzFVaBBkbjw5np9JJEMs8393iBXRlg2fo/values/${targetSheet}?key=AIzaSyDVHHN6eVNT8JjGRN7v9c9rte_QdyDXmPk`;
}


async function getState() {
    let uri = getSheetsUrl('state');
    const response = await fetch(uri);
    const statesJson = await response.json();

    let allStates = statesJson['values']
    let currentState = allStates[allStates.length - 1];
    return {
        'name': currentState[1],
        'numTrainingSessions': currentState[2],
        'id': currentState[3]
    };
}


async function getUpgrades() {
    let uri = getSheetsUrl('upgrades');
    const response = await fetch(uri);
    const statesJson = await response.json();

    let data = statesJson['values']
    let upgrades = [];
    for(let i = 1; i < data.length; i++) {
        upgrades.push({
            'racerName': data[i][1],
            'speed': data[i][2],
            'stamina': data[i][3],
            'determination': data[i][4],
            'boshiBars': data[i][5] == undefined? 0 : data[i][5],
            'racerId': data[i][6],
            'stateSubmitted': data[i][7],
            'steroids': data[i][8] == undefined? 0: data[i][8],
            'idols': data[i][9] == undefined? 0: data[i][9]
        });
    }

    return upgrades;
}