var racers = [];
var selectedRacer;

// to be set in page's init
var OnRacerSelectionCallback;

async function loadRacers() {
    await fetchAndStoreGameInfo();
    let uri = `${API_BASE_URL}/${GET_RACERS_API}?gameId=${GAME_INFO['id']}`;
    const response = await fetch(uri);
    racers = await response.json();
    console.log(racers);

    let dropdown = document.getElementById('racerDropdown');
    racers.forEach(racer => {
        let option = document.createElement('option');
        option.value = racer['id'];
        option.innerHTML = racer['name'];
        dropdown.appendChild(option);
    });
}


function _onRacerSelection(event) {
    // get racer that was selected
    let selectedRacerId = event.target.value;
    racer = getRacer(selectedRacerId);

    // appearance
    bodyPartElements['Head'].src = `assets/BoshiPartsSprites_heads/BoshiHead${racer['bodyParts']['head']}.png`;
    bodyPartElements['Arms'].src = `assets/BoshiParts_Bodies/Boshi_Arms_${getColor(racer['bodyParts']['arms'])}.png`;
    bodyPartElements['Body'].src = `assets/BoshiParts_Bodies/Boshi_Body_${getColor(racer['bodyParts']['body'])}.png`;
    bodyPartElements['Legs'].src = `assets/BoshiParts_Bodies/Boshi_Legs_${getColor(racer['bodyParts']['legs'])}.png`;

    OnRacerSelectionCallback(racer);
}


function getColor(c) {
    if(c === 'g')
        return 'Green';
    if(c === 'o')
        return 'Orange';
    if(c === 'p')
        return 'Pink';
    if(c === 'y')
        return 'Yellow'

    return 'White';
}


function getRacer(id) {
    for(let i = 0; i < racers.length; i++) {
        if(racers[i]['id'] === id)
            return racers[i];
    }

    console.error('unable to find racer with id: ' + id);
    console.error('these are the racers i have: ' + racers);
}