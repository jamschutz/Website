async function onVisit() {    
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSftKc58dnAZorsypKPAq9OSMESnfVXeSyJ9aHCAukKR1w4Fhg/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.2096673858': 'visit'
      }),
      mode: 'no-cors'
    })
    
    console.log('hi');
}


async function onSignup() {    
    await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSdx673QVquA0NL5opIkVqYxaHNNtCUlP4IsLpGoQ70xvry3fg/formResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.983695580': 'signup'
      }),
      mode: 'no-cors'
    })
    
    console.log('signup');
}

//https://docs.google.com/forms/d/e/1FAIpQLSdx673QVquA0NL5opIkVqYxaHNNtCUlP4IsLpGoQ70xvry3fg/viewform?usp=header

// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        await onVisit();

        let signupBtn = document.getElementById('signup-btn');
        signupBtn.addEventListener("click", onSignup);

    }
})(window, document, undefined);