var racers = [];
var attributes = {}
var selectedRacer;
var currentState;
var upgrades;

var cheerContainer;
var cheerName;
var prayerButton;
var boshiBarButton;
var steroidButton;
var idolButton;
var userId;

const allAttributes = [
    'speed',
    'stamina',
    'determination'
]

var bodyPartElements = {}
var bodyPartsLookup = {}




async function cheer() {
    // focuser
    if(selectedRacer['type'][0] === 'f') {
        hideCheerButton();
    }
    // speedster
    let cheerPower = 1;
    if(selectedRacer['type'][0] === 's') {
        cheerPower = getSpeedsterCheerPower();
        console.log('cheer power: ' + cheerPower);
    }
    // pacer
    if(selectedRacer['type'][0] === 'p') {
        cheerPower = getPacerCheerPower();
    }

    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSfOB6ylM09IVZQN4kjlYKhadUUpqdBboEDd49Q_ojSMh0LIqA/formResponse', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        'entry.1296978131': selectedRacer['id'],
        'entry.227259800': `c${cheerPower}`,
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


async function useItem(item) {
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSfOB6ylM09IVZQN4kjlYKhadUUpqdBboEDd49Q_ojSMh0LIqA/formResponse', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        'entry.1296978131': selectedRacer['id'],
        'entry.227259800': item
        }),
        mode: 'no-cors'
    })

    console.log('used ' + item);
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

        bodyPartsLookup[racer[5]] = racer[7];
    }


    let dropdown = document.getElementById('racerDropdown');
    racers.forEach(racer => {
        let option = document.createElement('option');
        option.value = racer['id'];
        option.innerHTML = racer['name'];
        dropdown.appendChild(option);
    });
}


function onRacerSelection(event) {
    let selectedRacerName = event.target.value;
    selectedRacer = getRacer(selectedRacerName);

    let stats = getBestRaceStats();
    console.log(stats)
    allAttributes.forEach(attribute => {
        let racerStat = parseInt(stats[attribute]);
        attributes[attribute].value = racerStat;
    });

    cheerName.innerText = `${selectedRacer['name']} (${selectedRacer['type']})`;
    cheercontainer.style.display = 'block';

    prayerButton.style.display = selectedRacer['type'] === 'religious'? 'block': 'none';

    let boshiBars = stats['boshiBars'] == undefined || stats['boshiBars'] == ''? 0 : stats['boshiBars'];
    let steroids = stats['steroids'] == undefined || stats['steroids'] == ''? 0 : stats['steroids'];
    let idols = stats['idols'] == undefined || stats['idols'] == ''? 0 : stats['idols'];

    boshiBarButton.innerText = `eat boshi bar (${boshiBars})`;
    steroidButton.innerText = `take steroid (${steroids})`;
    idolButton.innerText = `pray to boshi idol (${idols})`;

    // appearance
    let bodyPartPieces = bodyPartsLookup[selectedRacer['id']].split(',');
    bodyPartElements['Head'].src = `assets/BoshiPartsSprites_heads/BoshiHead${parseInt(bodyPartPieces[0])}.png`;
    bodyPartElements['Arms'].src = `assets/BoshiParts_Bodies/Boshi_Arms_${getColor(bodyPartPieces[1])}.png`;
    bodyPartElements['Body'].src = `assets/BoshiParts_Bodies/Boshi_Body_${getColor(bodyPartPieces[2])}.png`;
    bodyPartElements['Legs'].src = `assets/BoshiParts_Bodies/Boshi_Legs_${getColor(bodyPartPieces[3])}.png`;

    boshiBarButton.style.display = boshiBars > 0? 'block' : 'none';
    steroidButton.style.display = steroids > 0? 'block' : 'none';
    idolButton.style.display = idols > 0? 'block' : 'none';
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


function getRacer(name) {
    for(let i = 0; i < racers.length; i++) {
        if(racers[i]['id'] === name)
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

        boshiBarButton = document.getElementById('boshibar-btn');
        steroidButton = document.getElementById('steroid-btn');
        idolButton = document.getElementById('idol-btn');
        boshiBarButton.addEventListener('click', () => useItem('boshiBar'));
        steroidButton.addEventListener('click', () => useItem('steroid'));
        idolButton.addEventListener('click', () => useItem('idol'));

        ['Head', 'Arms', 'Legs', 'Body'].forEach(bodyPart => {
            bodyPartElements[bodyPart] = document.getElementById(`boshiPart-${bodyPart}`);
        });

        currentState = await getState();
        upgrades = await getUpgrades();
        initFocuserBtnController();
        initSpeedster();
        initPacer();
        loadRacers();
    }
})(window, document, undefined);