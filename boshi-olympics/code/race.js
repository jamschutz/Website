var racers = [];
var attributes = {}
var selectedRacer;
var currentState;
var upgrades;

var cheerContainer;
var cheerName;
var prayerButton;
var userId;




async function cheer() {
    if(selectedRacer['type'] === 'focuser') {
        hideCheerButton();
    }

    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSfOB6ylM09IVZQN4kjlYKhadUUpqdBboEDd49Q_ojSMh0LIqA/formResponse', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        'entry.1296978131': selectedRacer['id'],
        'entry.227259800': 'c',
        'entry.649948463': userId
        }),
        mode: 'no-cors'
    })

    console.log('cheered for boshi');
}


async function pray() {
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSfOB6ylM09IVZQN4kjlYKhadUUpqdBboEDd49Q_ojSMh0LIqA/formResponse', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        'entry.1296978131': selectedRacer['id'],
        'entry.227259800': 'p'
        }),
        mode: 'no-cors'
    })

    console.log('prayed for boshi');
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
            'type': racer[6]
        });
    }


    let dropdown = document.getElementById('racerDropdown');
    racers.forEach(racer => {
        let option = document.createElement('option');
        option.value = racer['name'];
        option.innerHTML = racer['name'];
        dropdown.appendChild(option);
    });

    console.log(racers);
}


function onRacerSelection(event) {
    let selectedRacerName = event.target.value;
    selectedRacer = getRacer(selectedRacerName);

    let stats = getBestRaceStats();
    ['speed', 'stamina', 'determination'].forEach(attribute => {
        let racerStat = parseInt(stats[attribute]);
        attributes[attribute].value = racerStat;
    });

    cheerName.innerText = `${selectedRacer['name']} (${selectedRacer['type']})`;
    cheercontainer.style.display = 'block';

    prayerButton.style.display = selectedRacer['type'] === 'religious'? 'block': 'none';
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
    for(let i = upgrades.length - 1; i >= 0; i--) {
        if(upgrades[i]['racerId'] === selectedRacer['id'] && upgrades[i]['racerName'] === selectedRacer['name']) {
            return upgrades[i];
        }
    }

    return selectedRacer;
}

// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        // generate unique id for each cheerer
        userId = uuidv4();

        let submitCommentBtn = document.getElementById('cheer-btn');
        submitCommentBtn.addEventListener("click", cheer);

        prayerButton = document.getElementById('pray-btn');
        prayerButton.addEventListener('click', pray);

        cheercontainer = document.getElementById('cheerContainer');
        cheerName = document.getElementById('youAreCheeringFor');

        let dropdown = document.getElementById('racerDropdown');
        dropdown.addEventListener('change', onRacerSelection);

        ['speed', 'stamina', 'determination'].forEach(attribute => {
            attributes[attribute] = document.getElementById(attribute);
        });

        currentState = await getState();
        upgrades = await getUpgrades();
        initFocuserBtnController();
        loadRacers();
    }
})(window, document, undefined);