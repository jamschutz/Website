function sayWelcome() {
    let welcomeBtn = document.getElementById('welcomeBtn');
    let assignmentBrief = document.getElementById('assignmentBrief');

    welcomeBtn.style.display = 'none';
    assignmentBrief.style.display = 'block';
}


function sayImReady() {
    let imReadyBtn = document.getElementById('imReadyBtn');
    let assignmentBrief = document.getElementById('fullAssignmentBrief');

    imReadyBtn.style.display = 'none';
    assignmentBrief.style.display = 'block';
}


function makeAnything() {
    let makeAnythingBtn = document.getElementById('makeAnythingBtn');
    let noteFromJoey = document.getElementById('noteFromJoey');

    makeAnythingBtn.style.display = 'none';
    noteFromJoey.style.display = 'block';
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

        let imReadyBtn = document.getElementById('imReadyBtn');
        imReadyBtn.addEventListener('click', sayImReady);

        let makeAnythingBtn = document.getElementById('makeAnythingBtn');
        makeAnythingBtn.addEventListener('click', makeAnything);
    }
})(window, document, undefined);