'use strict'

function init() {
    let gTodos =  getLocalTodos();
    getTodos(gTodos);
}

//show all todos
function showAll(){
    document.querySelector(".main__list").innerHTML = '';
    getTodos(getLocalTodos());
}

//show only complited todos
function showComplited() {
    let todos = getLocalTodos().filter(todo => todo.isComplited);

    document.querySelector(".main__list").innerHTML = '';
    getTodos(todos);
}

//show only not-complited todos
function showUncomplited() {
    let todos = getLocalTodos().filter(todo => !todo.isComplited);

    document.querySelector(".main__list").innerHTML = '';
    getTodos(todos);
}

//get all todos
function getTodos(todos) {
    let listHtml = ''
    todos.forEach(todo => {
        listHtml += addTodo(todo);
    });

    document.querySelector(".main__list").innerHTML = listHtml;
}

//hande input
function handleInpute(input, e) {
    if (e.keyCode !== 13 || input.value === '') return;

    let todo = {
        todo: input.value,
        id: uniqueId(),
        isComplited: false,
        createdAt: new Date().toISOString().split(/-|T/)
    };

    updateList(todo);
    document.querySelector(".main__list").innerHTML += addTodo(todo);

    input.value = '';
}

//create unique id
function uniqueId() {
    return  '_' + Math.random().toString(36).substr(2, 9);
};

//return moments ago
function getMoment(time) {
    let seconds = time[3].split(':')[2];
    let currDate = new Date();
    currDate = currDate.toISOString().split(/-|T/);

    let currTime = currDate[3].split(":");

    if (+currDate[0] - +time[0] !== 0) {
        return currDate[0] - time[0] +  ' years ago';
    }

    if (+currDate[1] - +time[1] !== 0) {
        return currDate[1] - +time[1] + ' month ago';
    }
    
    if (+currDate[2] - +time[2] !== 0) {
        if (+currDate[3].split(':')[0] - +time[3].split(':')[0] !== 0) {
            return +currDate[3].split(':')[0] - +time[3].split(':')[0] + 'hours ago';
        }

        return +currDate[2] - +time[2] + ' days ago';
    }

    if (+currDate[3].split(':')[0] - +time[3].split(':')[0] !== 0) {
        return +currDate[3].split(':')[0] - +time[3].split(':')[0] + ' hours ago';
    }

    if (+currTime[1] - +time[3].split(':')[1] !== 0) {
        return +currTime[1] - +time[3].split(':')[1] + ' minuts ago';
    }

    if (+currTime[2].substring(0,2) - +seconds.substring(0,2) !== 0) {
        console.log(+seconds.substring(0,2), +currTime[2].substring(0,2))
        return +currTime[2].substring(0,2) - +seconds.substring(0,2) + ' seconds ago';
    }

    return 'created 1 second ago'
}

/*
let currDate = new Date().toISOString().split(/-|T/);
undefined
currDate
(4) ["2018", "10", "08", "21:07:08.682Z"]
currDate[3].split(/:|./);
(14) ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
currDate[3].split(':')
(3) ["21", "07", "08.682Z"]
*/