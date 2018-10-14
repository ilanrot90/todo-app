//append item to list
function addTodo(todo) {
    let moment = 'created ' + getMoment(todo.createdAt);

    return li = `<li class= "${(todo.isComplited) ? "list__item is__done" : "list__item"}"
                data-id="${todo.id}" 
                onclick="toggleClass(this)">
                ${todo.todo} 
                <span class="todo__time">${moment}</span>
                <span class="close" onclick="removeTodo(this.parentElement, event)">X</span>
            </li>`;
}

//delete todo
function removeTodo(todo, e) {
    e.stopPropagation();

    let todos = getLocalTodos().filter(item => item.id !== todo.dataset.id);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.querySelector(".main__list").innerHTML = "";
    getTodos(todos);
}

//update isComplited
function toggleClass(todo){
    todo.classList.toggle("is__done");

    let updatedTodos = getLocalTodos().map(item => {
        if (item.id === todo.dataset.id) {
            if (!item.isComplited) {
                item = {...item, isComplited: !item.isComplited, complitedAt: createComplitDate()};
            }
            else item = {...item, isComplited: !item.isComplited};
        }

        return item;    
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function createComplitDate(){
    return new Date().toISOString().split(/-|T/)
}