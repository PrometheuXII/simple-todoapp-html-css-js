const inputBox = document.querySelector(".add-todo input");
const addBtn = document.querySelector(".add-todo button");
const todoList = document.querySelector(".todo-list");
const taskStatus = document.querySelector(".status");
const clearList = document.querySelector(".footer button");

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
    if(userData != ''){
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
    }else{
        alert("Enter todo description...")
    }
    
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

    if(listArr.length != 0){
        clearList.classList.add("active");
    }else{
        clearList.classList.remove("active");
    }

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

clearList.onclick = () => {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

showTasks();