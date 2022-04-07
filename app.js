const inputBox = document.querySelector(".add-todo input");
const addBtn = document.querySelector(".add-todo button");
const todoList = document.querySelector(".todo-list");
const taskStatus = document.querySelector(".status");

inputBox.onkeyup = ()=> {
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

addBtn.addEventListener('click', () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        var listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }

    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    inputBox.value = '';
    showTasks();
})

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        var listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += '<li> '+ element +' <span onclick = "deleteTask('+index+');" ><i class="fas fa-trash"></i></span></li>';
    });
    todoList.innerHTML = newLiTag;

    let numTasks = listArr.length;
    taskStatus.innerHTML = 'You have '+ numTasks + ' pending tasks';
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    var listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

showTasks();