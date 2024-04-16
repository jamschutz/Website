function submit() {
    console.log('submit');

    let name = document.getElementById('name').value;
    let reflection = document.getElementById('reflection').value;
    let teamwork = document.getElementById('teamwork').value;
    let help = document.getElementById('help').value;

    console.log('name: ' + name);
    console.log('reflection: ' + reflection);
    console.log('teamwork: ' + teamwork);
    console.log('help: ' + help);
}



// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitBtn = document.getElementById('Blog-submitCommentBtn');
        submitBtn.addEventListener('click', submit);
    }
})(window, document, undefined);