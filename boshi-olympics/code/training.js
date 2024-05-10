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
    'boshiBars': 6,
    'steroids': 6,
    'idols': 6
}

var minValues = {
    'speed': 0,
    'stamina': 0,
    'determination': 0,
    'boshiBars': 0,
    'steroids': 0,
    'idols': 0
}
var currentState;
var upgrades;
var racerUpgradeCountLookup = {}

var upgradeContainer;
var alreadyTrainedMsg;
var youAreTrainingFor;

const allBodyParts = [
    'Head', 'Arms', 'Body', 'Legs'
]
var bodyPartElements = {}
var bodyPartsLookup = {}

const defaultPointsAvailable = 10;


async function submitTrainingData() {
    let speed = attributes['speed'].value == ''? 0 : attributes['speed'].value;
    let stamina = attributes['stamina'].value == ''? 0 : attributes['stamina'].value;
    let determination = attributes['determination'].value == ''? 0 : attributes['determination'].value;
    let boshiBars = attributes['boshiBars'].value == ''? 0: attributes['boshiBars'].value;
    let idols = attributes['idols'].value == ''? 0: attributes['idols'].value;
    let steroids = attributes['steroids'].value == ''? 0: attributes['steroids'].value;
    
    // submit for each upgrade available (unity will just take the most recent, they're not additive)
    let numPreviousUpgrades = getNumRacerUpgrades(selectedRacer['id']);
    let numAllowedUpgrades = currentState['numTrainingSessions'];
    let availableUpgrades = numAllowedUpgrades - numPreviousUpgrades;
    for(let i = 0; i < availableUpgrades; i++) {
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
    }
    
    window.location.href ="/boshi-olympics/racer-submitted.html";
}


function onRacerSelection(racer) {
    if(racer['numUpgrades'] >= GAME_INFO['upgradesAvailable']) {
        upgradeContainer.style.display = 'none';
        alreadyTrainedMsg.style.display = 'block';
        return;
    }
    else {
        upgradeContainer.style.display = 'block';
        alreadyTrainedMsg.style.display = 'none';
    }

    pointsAvailable.innerText = defaultPointsAvailable * (GAME_INFO['upgradesAvailable'] - racer['numUpgrades']);
    let racerType = racer['type'] === 'crowdPleaser'? 'crowd pleaser' : racer['type'];
    youAreTrainingFor.innerText = `${racer['name']} (${racerType})`;

    // update racer stats
    console.log(racer)
    allAttributes.forEach(attribute => {
        attributes[attribute].value = racer[attribute];
        minValues[attribute] = racer[attribute];
    });
}


// function onRacerSelection(event) {
//     let selectedRacerId = event.target.value;
//     selectedRacer = getRacer(selectedRacerId);

//     let numUpgrades = getNumRacerUpgrades(selectedRacer['id']);
//     if(numUpgrades >= currentState['numTrainingSessions']) {
//         upgradeContainer.style.display = 'none';
//         alreadyTrainedMsg.style.display = 'block';
//         return;
//     }
//     else {
//         upgradeContainer.style.display = 'block';
//         alreadyTrainedMsg.style.display = 'none';
//     }

//     pointsAvailable.innerText = defaultPointsAvailable * (parseInt(currentState['numTrainingSessions']) - parseInt(numUpgrades));
//     let racerType = selectedRacer['type'] === 'crowdPleaser'? 'crowd pleaser' : selectedRacer['type'];
//     youAreTrainingFor.innerText = `${selectedRacer['name']} (${racerType})`;
//     let stats = getBestRaceStats();
//     allAttributes.forEach(attribute => {
//         let racerStat = parseInt(stats[attribute]);
//         attributes[attribute].value = racerStat;

//         minValues[attribute] = racerStat;
//     });

    

//     // appearance
//     let bodyPartPieces = bodyPartsLookup[selectedRacer['id']].split(',');
//     bodyPartElements['Head'].src = `assets/BoshiPartsSprites_heads/BoshiHead${parseInt(bodyPartPieces[0])}.png`;
//     bodyPartElements['Arms'].src = `assets/BoshiParts_Bodies/Boshi_Arms_${getColor(bodyPartPieces[1])}.png`;
//     bodyPartElements['Body'].src = `assets/BoshiParts_Bodies/Boshi_Body_${getColor(bodyPartPieces[2])}.png`;
//     bodyPartElements['Legs'].src = `assets/BoshiParts_Bodies/Boshi_Legs_${getColor(bodyPartPieces[3])}.png`;
// }



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
        dropdown.addEventListener('change', _onRacerSelection);

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

        allBodyParts.forEach(bodyPart => {
            bodyPartElements[bodyPart] = document.getElementById(`boshiPart-${bodyPart}`);
        });

        OnRacerSelectionCallback = onRacerSelection;

        loadRacers();
        // showHidePage('Training');
    }
})(window, document, undefined);