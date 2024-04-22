function submit() {
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
        let submitBtn = document.getElementById('Blog-submitCommentBtn');
        submitBtn.addEventListener('click', submit);
    }
})(window, document, undefined);