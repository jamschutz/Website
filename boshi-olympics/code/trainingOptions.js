var trainingOptions = [
    // -------------- +1 tasks ------------------------ //
    {
        'attribute': 'speed',
        'effect': '+1',
        'cost': 1,
        'tasks': [
            'do jumping jacks in the rain',
            'write a letter to home',
            'swim 100 laps',
            'ride your bike to the grocery store',
            'read a good book',
            'run up 100 flights of stairs',
            'beat Steve in a boxing match',
        ],
    },
    {

        'attribute': 'stamina',
        'effect': '+1',
        'cost': 1,
        'tasks': [
            'do handstands with grandpa',
            'make the perfect cup of coffee',
            'hold your breath for 3 minutes',
            'read a bad book',
            'bake cookies for your neighbour',
            'bike dead man\'s pass',
            'lift a car',
        ]
    },
    {
        'attribute': 'determination',
        'effect': '+1',
        'cost': 1,
        'tasks': [
            'climb the great beanstalk tower',
            'surf during tsunami season',
            'sing happy birthday to grandpa',
            'become a weatherman',
            'get quarters from the bank for laundry',
            'ski down mount peril',
            'take your gloves off in the snow',
        ]
    },

    
    // -------------- +3 tasks ------------------------ //
    {
        'attribute': 'speed',
        'effect': '+3',
        'cost': 2,
        'tasks': [
            'start a bookclub',
            'go for a walk',
            'get carrots from the farmer\'s market',
        ]
    },


    
    // -------------- +5 tasks ------------------------ //
    {
        'attribute': 'speed',
        'effect': '+5',
        'cost': 3,
        'tasks': [
            'try the expensive tiramisu',
            'say thank you to the mail man',
            'do 500 push ups',
        ]
    },
    {
        'attribute': 'stamina',
        'effect': '+5',
        'cost': 3,
        'tasks': [
            'knit a sweater',
            'make a sand castle',
        ]
    },
    {

        'attribute': 'determination',
        'effect': '+5',
        'cost': 3,
        'tasks': [
            'go skydiving',
            'write a play',
        ]
    },


    
    // -------------- *2 tasks ------------------------ //
    {

        'attribute': 'speed',
        'effect': '*2',
        'cost': 15,
        'tasks': [
            'learn to play the piano',
            'learn latin',
        ]
    },
    {

        'attribute': 'stamina',
        'effect': '*2',
        'cost': 15,
        'tasks': [
            'learn to tie your shoes',
            'learn algebra',
        ]
    },
    {

        'attribute': 'determination',
        'effect': '*2',
        'cost': 15,
        'tasks': [
            'file your taxes',
            'grow a tomato',
        ]
    }
]


function getRandomRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function getRandomTasks(numTasks) {
    // let tasks = [];
    // let taskTypesAdded = {};
    // for(let i = 0; i < numTasks; i++) {
    //     let taskCategory = '';
    //     let taskType = {};
    //     do {
    //         taskType = trainingOptions[getRandomRange(0, trainingOptions.length)];    
    //     } while(taskCategory in taskTypesAdded);
    //     console.log('hi...')
    //     console.log(taskType);

    //     let task = taskType['tasks'][getRandomRange(0, taskType['tasks'].length)];
    //     tasks.push({
    //         'attribute': taskType['attribute'],
    //         'effect': taskType['effect'],
    //         'cost': taskType['cost'],
    //         'description': task
    //     });
    // }

    let tasks = [];
    while(tasks.length < numTasks) {
        tasks.push(trainingOptions[getRandomRange(0, trainingOptions.length - 1)]);
    }

    return tasks;
}