function submit() {
    console.log('submit');

    let name = document.getElementById('name').value;
    let reflection = document.getElementById('reflection').value;
    let teamwork = document.getElementById('teamwork').value;
    let help = document.getElementById('help').value;

    let showedWarning = false;
    if(name == undefined || name == null || name == '') {
        let warning = document.getElementById('nameWarning');
        warning.style.display = 'block';
        showedWarning = true;
    }
    if(reflection == undefined || reflection == null || reflection == '') {
        let warning = document.getElementById('reflectionWarning');
        warning.style.display = 'block';
        showedWarning = true;
    }
    if(teamwork == undefined || teamwork == null || teamwork == '') {
        let warning = document.getElementById('teamworkWarning');
        warning.style.display = 'block';
        showedWarning = true;
    }
    if(help == undefined || help == null || help == '') {
        let warning = document.getElementById('helpWarning');
        warning.style.display = 'block';
        showedWarning = true;
    }

    
    let warning = document.getElementById('submitWarning');
    warning.style.display = showedWarning? 'block': 'none';
}



// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitBtn = document.getElementById('Blog-submitCommentBtn');
        submitBtn.addEventListener('click', submit);
    }
})(window, document, undefined);