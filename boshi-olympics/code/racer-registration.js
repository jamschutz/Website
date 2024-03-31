const nameEntryId = 'entry.674049401';
const speedEntryId = 'entry.1074850540';


async function submitRacer() {
    let name = document.getElementById('name').value;
    let speed = document.getElementById('speed').value;
    
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSenDKu3U4DCLzprMmBJFPXinZLHQBXefLr1_2kZE5xpQ91tMQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.674049401': name,
        'entry.1074850540': speed
      }),
      mode: 'no-cors'
    })
    
    window.location.href ="/boshi-olympics/racer-submitted.html";
    console.log(`submitting racer with name ${name} and speed ${speed}`);
}


// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let submitCommentBtn = document.getElementById('submit-racer-btn');
        submitCommentBtn.addEventListener("click", submitRacer);
    }
})(window, document, undefined);