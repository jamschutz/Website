function submitRacer() {
    let name = document.getElementById('name').value;
    let speed = document.getElementById('speed').value;

    var details = {
        'name': name,
        'speed': speed
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSenDKu3U4DCLzprMmBJFPXinZLHQBXefLr1_2kZE5xpQ91tMQ/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })

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