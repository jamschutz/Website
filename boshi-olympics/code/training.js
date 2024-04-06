var racers = [];
var pointsAvailable;
var attributes = {}
const allAttributes = [
    'speed',
    'stamina',
    'determination',
    'boshiBars',
    'steroids',
    'idols'
]
var attributeIncrements = {
	'speed': 1,
	'stamina': 2,
	'determination': 2,
    'boshiBars': 1,
    'steroids': 1,
    'idols': 1
}

const itemCosts = {
    'speed': 1,
	'stamina': 1,
	'determination': 1,
    'boshiBars': 10,
    'steroids': 10,
    'idols': 10
}

var minValues = {
    'speed': 0,
    'stamina': 0,
    'determination': 0,
    'boshiBars': 0,
    'steroids': 0,
    'idols': 0
}
var selectedRacer;
var currentState;
var upgrades;
var racerUpgradeCountLookup = {}

var upgradeContainer;
var alreadyTrainedMsg;
var youAreTrainingFor;

const defaultPointsAvailable = 10;


async function submitTrainingData() {
    let speed = attributes['speed'].value == ''? 0 : attributes['speed'].value;
    let stamina = attributes['stamina'].value == ''? 0 : attributes['stamina'].value;
    let determination = attributes['determination'].value == ''? 0 : attributes['determination'].value;
    let boshiBars = attributes['boshiBars'].value == ''? 0: attributes['boshiBars'].value;
    let idols = attributes['idols'].value == ''? 0: attributes['idols'].value;
    let steroids = attributes['steroids'].value == ''? 0: attributes['steroids'].value;
    
    await fetch('https://docs.google.com/forms/u/1/d/e/1FAIpQLSczIvqsf50Dp833qd6jsSo2quE9F7QLiC-nET1HvdV7dD_1oQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.1584351445': selectedRacer['name'],
        'entry.1836487193': speed,
		'entry.901390338': stamina,
		'entry.1030287421':  determination,
        'entry.994883380': selectedRacer['id'],
        'entry.393707600': currentState['id'],
        'entry.939624832': boshiBars,
        'entry.511393298': idols,
        'entry.1315473925': steroids
      }),
      mode: 'no-cors'
    })
    
    window.location.href ="/boshi-olympics/racer-submitted.html";
}


async function loadRacers() {   
    let uri = getSheetsUrl('racers');
    const response = await fetch(uri);
    const racersJson = await response.json();
    
    // skip 0th index because it's just the header
    for(let i = 1; i < racersJson['values'].length; i++) {
        let racer = racersJson['values'][i];

        // empty line, skip
        if(racer.length === 0)
            continue;

        racers.push({
            'name': racer[1],
            'speed': racer[2],
            'stamina': racer[3],
            'determination': racer[4],
            'id': racer[5],
            'type': racer[6],
            'boshiBars': 0,
            'steroids': 0,
            'idols': 0
        });
    }


    let dropdown = document.getElementById('racerDropdown');
    racers.forEach(racer => {
        let option = document.createElement('option');
        option.value = racer['name'];
        option.innerHTML = racer['name'];
        dropdown.appendChild(option);
    });
}


function onRacerSelection(event) {
    let selectedRacerName = event.target.value;
    selectedRacer = getRacer(selectedRacerName);

    let numUpgrades = getNumRacerUpgrades(selectedRacer['id']);
    if(numUpgrades >= currentState['numTrainingSessions']) {
        upgradeContainer.style.display = 'none';
        alreadyTrainedMsg.style.display = 'block';
        return;
    }
    else {
        upgradeContainer.style.display = 'block';
        alreadyTrainedMsg.style.display = 'none';
    }

    pointsAvailable.innerText = defaultPointsAvailable * (parseInt(currentState['numTrainingSessions']) - parseInt(numUpgrades));
    let racerType = selectedRacer['type'] === 'crowdPleaser'? 'crowd pleaser' : selectedRacer['type'];
    youAreTrainingFor.innerText = `${selectedRacer['name']} (${racerType})`;
    let stats = getBestRaceStats();
    allAttributes.forEach(attribute => {
        let racerStat = parseInt(stats[attribute]);
        attributes[attribute].value = racerStat;

        minValues[attribute] = racerStat;
    });
}


function getRacer(name) {
    for(let i = 0; i < racers.length; i++) {
        if(racers[i]['name'] === name)
            return racers[i];
    }

    console.error('unable to find racer with name: ' + name);
    console.error('these are the racers i have: ' + racers);
}


function getBestRaceStats() {
    console.log(upgrades)
    for(let i = upgrades.length - 1; i >= 0; i--) {
        if(upgrades[i]['racerId'] === selectedRacer['id'] && upgrades[i]['racerName'] === selectedRacer['name']) {
            return upgrades[i];
        }
    }

    return selectedRacer;
}


function getNumRacerUpgrades(id) {
    if(id in racerUpgradeCountLookup)
        return racerUpgradeCountLookup[id];

    // if not in dictionary, no upgrades
    return 0;
}



function incrementAttribute(attribute) {
	console.log('incrementing ' + attribute);
    let points = parseInt(pointsAvailable.innerText);
    if(points <= 0 || points - itemCosts[attribute] < 0)
        return;

    let attributeElement = attributes[attribute];
    if(attribute === 'speed' && selectedRacer['type'] === 'speedster') {
        attributeElement.value = parseInt(attributeElement.value) + 2;
    }
    else if(attribute === 'speed' && selectedRacer['type'] === 'pacer') {
        attributeElement.value = parseInt(attributeElement.value) + 2;
    }
    else {
        attributeElement.value = parseInt(attributeElement.value) + attributeIncrements[attribute];
    }

    points -= itemCosts[attribute];
    pointsAvailable.innerText = points;

}
function decrementAttribute(attribute) {
	console.log('decrementing ' + attribute);
    let attributeElement = document.getElementById(attribute);
    if(attributeElement.value > minValues[attribute]) {
        if(attribute === 'speed' && selectedRacer['type'] === 'speedster') {
            attributeElement.value = parseInt(attributeElement.value) - 2;
        }
        else if(attribute === 'speed' && selectedRacer['type'] === 'pacer') {
            attributeElement.value = parseInt(attributeElement.value) - 2;
        }
        else {
            attributeElement.value = parseInt(attributeElement.value) - attributeIncrements[attribute];
        }

        let points = parseInt(pointsAvailable.innerText) + itemCosts[attribute];
        pointsAvailable.innerText = points;
    }
}


function alreadyTrained(racer) {
    for(let i = 0; i < upgrades.length; i++) {
        if(racer['id'] === upgrades[i]['racerId'] && currentState['id'] == upgrades[i]['stateSubmitted']) {
            return true;
        }
    }

    return false;
}


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitCommentBtn = document.getElementById('submit-btn');
        submitCommentBtn.addEventListener("click", submitTrainingData);

        let dropdown = document.getElementById('racerDropdown');
        dropdown.addEventListener('change', onRacerSelection);

        ['speed', 'stamina', 'determination', 'boshiBars', 'steroids', 'idols'].forEach(attribute => {
            attributes[attribute] = document.getElementById(attribute);
			let plusBtn = document.getElementById(`${attribute}Plus`);
			let minusBtn = document.getElementById(`${attribute}Minus`);
			
			plusBtn.addEventListener('click', () => {
				incrementAttribute(attribute);
			});
			minusBtn.addEventListener('click', () => {
				decrementAttribute(attribute);
			});
        });
        pointsAvailable = document.getElementById('racerPoints');

        upgradeContainer = document.getElementById('trainingPoints')
        alreadyTrainedMsg = document.getElementById('alreadyTrainedMsg');
        youAreTrainingFor = document.getElementById('youAreTrainingFor');

        currentState = await getState();
        upgrades = await getUpgrades();
        upgrades.forEach(upgrade => {
            let id = upgrade['racerId'];
            if(!(id in racerUpgradeCountLookup)) {
                racerUpgradeCountLookup[id] = 0;
            }

            racerUpgradeCountLookup[id]++;
        })
        console.log(racerUpgradeCountLookup);
        loadRacers();
        showHidePage('Training');
    }
})(window, document, undefined);