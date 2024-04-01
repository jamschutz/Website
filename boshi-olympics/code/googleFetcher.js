async function getState() {   
    let uri = 'https://sheets.googleapis.com/v4/spreadsheets/15fh5Mo-S9DDzFVaBBkbjw5np9JJEMs8393iBXRlg2fo/values/state?key=AIzaSyDVHHN6eVNT8JjGRN7v9c9rte_QdyDXmPk';
    const response = await fetch(uri);
    const statesJson = await response.json();

    let allStates = statesJson['values']
    let currentState = allStates[allStates.length - 1];
    return {
        'name': currentState[1],
        'nextChangeInSeconds': currentState[2],
        'id': currentState[3]
    };
}


async function getUpgrades() {
    let uri = 'https://sheets.googleapis.com/v4/spreadsheets/15fh5Mo-S9DDzFVaBBkbjw5np9JJEMs8393iBXRlg2fo/values/upgrades?key=AIzaSyDVHHN6eVNT8JjGRN7v9c9rte_QdyDXmPk';
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
            'items': data[i][5],
            'racerId': data[i][6],
            'stateSubmitted': data[i][7]
        });
    }

    console.log(upgrades);
    return upgrades;
}