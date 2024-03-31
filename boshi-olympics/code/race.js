const nameEntryId = 'entry.674049401';
const speedEntryId = 'entry.1074850540';


async function cheer() {    
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSfOB6ylM09IVZQN4kjlYKhadUUpqdBboEDd49Q_ojSMh0LIqA/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.1296978131': 'boshi'
      }),
      mode: 'no-cors'
    })

    console.log('cheered for boshi');
}


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitCommentBtn = document.getElementById('cheer-btn');
        submitCommentBtn.addEventListener("click", cheer);
    }
})(window, document, undefined);