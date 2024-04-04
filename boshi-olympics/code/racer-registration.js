const nameEntryId = 'entry.674049401';
const speedEntryId = 'entry.1074850540';
const startingPointsAvailable = 25;

var pointsAvailable;
var attributes = {}
var attributeIncrements = {
	'speed': 1,
	'stamina': 2,
	'determination': 2
}

async function submitRacer() {
    let name = document.getElementById('name').value;
    let speed = attributes['speed'].value == ''? 0 : attributes['speed'].value;
    let stamina = attributes['stamina'].value == ''? 0 : attributes['stamina'].value;
    let determination = attributes['determination'].value == ''? 0 : attributes['determination'].value;
    let id = uuidv4();
    
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSenDKu3U4DCLzprMmBJFPXinZLHQBXefLr1_2kZE5xpQ91tMQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.674049401': name,
        'entry.1074850540': speed,
		'entry.1545299839': stamina,
		'entry.526267970':  determination,
        'entry.422582051': id,
        'entry.1519570609': selectedRacerType
      }),
      mode: 'no-cors'
    })
    
    window.location.href ="/boshi-olympics/racer-submitted.html";
    console.log(`submitting racer with name ${name} and speed ${speed}`);
}



function incrementAttribute(attribute) {
	console.log('incrementing ' + attribute);
    let points = parseInt(pointsAvailable.innerText);
    if(points <= 0)
        return;

    let attributeElement = attributes[attribute];
    if(attribute === 'speed' && selectedRacerType === 'speedster') {
        attributeElement.value = parseInt(attributeElement.value) + 2;
    }
    else if(attribute === 'speed' && selectedRacerType === 'pacer') {
        attributeElement.value = parseInt(attributeElement.value) + 2;
    }
    else {
        attributeElement.value = parseInt(attributeElement.value) + attributeIncrements[attribute];
    }
    

    points--;
    pointsAvailable.innerText = points;

}
function decrementAttribute(attribute) {
	console.log('decrementing ' + attribute);
    let attributeElement = document.getElementById(attribute);
	let minimumValue = attribute == 'determination'? 0 : 1;
    if(attributeElement.value > minimumValue) {
        
        if(attribute === 'speed' && selectedRacerType === 'speedster') {
            attributeElement.value = parseInt(attributeElement.value) - 2;
        }
        else if(attribute === 'speed' && selectedRacerType === 'pacer') {
            attributeElement.value = parseInt(attributeElement.value) - 2;
        }
        else {
            attributeElement.value = parseInt(attributeElement.value) + attributeIncrements[attribute];
        }
        attributeElement.value = parseInt(attributeElement.value) - attributeIncrements[attribute];

        let points = parseInt(pointsAvailable.innerText) + 1;
        pointsAvailable.innerText = points;
    }
}


function resetAttributes() {
    pointsAvailable.innerText = startingPointsAvailable;
    ['speed', 'stamina', 'determination'].forEach(attribute => {
        let attributeElement = attributes[attribute];
        attributeElement.value = attribute === 'determination'? 0: 1;
    });
}


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitCommentBtn = document.getElementById('submit-racer-btn');
        submitCommentBtn.addEventListener("click", submitRacer);

        ['speed', 'stamina', 'determination'].forEach(attribute => {
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
        pointsAvailable.innerText = startingPointsAvailable;

        let dropdown = document.getElementById('racerTypeDropdown');
        dropdown.addEventListener('change', resetAttributes);
        racerTypeInit();
    }
})(window, document, undefined);