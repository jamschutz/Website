function sayWelcome() {
    let welcomeBtn = document.getElementById('welcomeBtn');
    let assignmentBrief = document.getElementById('assignmentBrief');

    welcomeBtn.style.display = 'none';
    assignmentBrief.style.display = 'block';
}

function promiseFun() {
    let promiseBtn = document.getElementById('promiseBtn');
    let part2 = document.getElementById('phase2');

    promiseBtn.style.display = 'none';
    part2.style.display = 'block';
}



// on window load
(function(window, document, undefined) {  
    window.onload = init;
  
    async function init() {
        let welcomeBtn = document.getElementById('welcomeBtn');
        welcomeBtn.addEventListener('click', sayWelcome);

        let promiseBtn = document.getElementById('promiseBtn');
        promiseBtn.addEventListener('click', promiseFun);
    }
})(window, document, undefined);