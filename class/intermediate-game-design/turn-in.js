var submittingResponse = false;


async function submit() {
    if(submittingResponse)
        return;

    console.log('submit');

    let name = document.getElementById('name').value;
    let reflection = document.getElementById('reflection').value;
    let teamwork = document.getElementById('teamwork').value;
    let help = document.getElementById('help').value;

    let showedWarning = false;
    if(showHideWarning('name')) showedWarning = true;
    if(showHideWarning('reflection')) showedWarning = true;
    if(showHideWarning('teamwork')) showedWarning = true;
    if(showHideWarning('help')) showedWarning = true;

    
    let warning = document.getElementById('submitWarning');
    warning.style.display = showedWarning? 'block': 'none';
    if(showedWarning) {
        console.log('not all fields filled out, bailing');
        return;
    }

    submittingResponse = true;
    
    await fetch('https://docs.google.com/forms/u/1/d/e/1FAIpQLSc_K8lA-R9plxuuLHOW2APPd91pBqsvj8AHY4ZAMoLtl-jjPQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.255255000': name,
        'entry.2033258892': reflection,
		'entry.1636864848': teamwork,
		'entry.859166577':  help
      }),
      mode: 'no-cors'
    })
    
    window.location.href ="/class/intermediate-game-design/submitted.html";
}


function showHideWarning(elementId) {
    let data = document.getElementById(elementId).value;
    let warning = document.getElementById(`${elementId}Warning`);
    let showWarning = data == undefined || data == null || data == '';
    warning.style.display = showWarning? 'block' : 'none';
    
    return showWarning;
}



// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        submittingResponse = false;

        let submitBtn = document.getElementById('Blog-submitCommentBtn');
        submitBtn.addEventListener('click', submit);
    }
})(window, document, undefined);