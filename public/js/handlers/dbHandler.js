//get todos from localstorage
function getLocalTodos() {
    return (localStorage.getItem("todos")) ?
        JSON.parse(localStorage.getItem("todos")) : [];
}

//update  localstorage
function updateList(todo) {
    let todos = (getLocalTodos().length !== 0) ? [...JSON.parse(localStorage.getItem("todos")), todo] : [todo];

    localStorage.setItem("todos", JSON.stringify(todos));
}