var racerTypeDescriptions = {
    'religious': 'at the beginning of the race, before you start to cheer you can pray to the boshi gods for support. for each prayer, increase your speed by +1',
    'crowdPleaser': 'for each cheer, move speed * X/2, where X is the number of different people who have cheered for you this race',
    'loner': 'for each cheer, move speed * (X - Y), where X can be upgraded, and Y is the number of different people who have cheered for you this race',
    'speedster': 'for each cheer, move speed * 2. additionally, you can upgrade your speed +2 for 1 attribute point. however, every successive cheer has to be done twice as fast as the previous one (e.g. if you wait 1 second between the first two cheers, you must then cheer a third time within 0.5 seconds, a fourth time within 0.25 seconds, and so on. once you fail, a determination roll will be made. if successful, your cheer timer will be reset and you may continue as you were. if unsuccessful, your speed will be set to 1.',
    'focuser': 'each time you cheer, multiply your speed by 1.2. when you cheer your racer on your phone, the cheer button will disappear each time you press and reappear at a random position on screen. when it reappears, the time it takes you to press the button will be added to the next disappearance interval.',
    'pacer': 'for each cheer, move speed * 2. additionally, you can upgrade your speed by +2 for 1 attribute point. however, for each cheer your speed will be multiplied by (1 - abs(cheerInterval - 1)). that is, you want to leave exactly one second between cheers.'
}

var racerTypeLabelElement;
var descriptionElement;
var racerInfoContainer;
var selectedRacerType;




function onRacerTypeSelection(event) {
    selectedRacerType = event.target.value;
    let description = racerTypeDescriptions[selectedRacerType];

    racerTypeLabelElement.innerText = selectedRacerType === 'crowdPleaser'? 'crowd pleaser' : selectedRacerType;
    descriptionElement.innerText = description;

    racerInfoContainer.style.display = 'block';
}


function racerTypeInit() {
    let dropdown = document.getElementById('racerTypeDropdown');
    dropdown.addEventListener('change', onRacerTypeSelection);

    descriptionElement = document.getElementById('racerTypeDescription');
    racerTypeLabelElement = document.getElementById('racerTypeLabel');
    racerInfoContainer = document.getElementById('racerInfoContainer');
}