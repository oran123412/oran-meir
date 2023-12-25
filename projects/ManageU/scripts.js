import Task from "./classes/Task.js";
import TaskManager from "./classes/TaskManager.js";

let manager = new TaskManager();

window.addTaskToManager = function () {
    let description = document.getElementById("new-task").value;

    let task = new Task(description);
    manager.addTask(task);
    showTasksInList();
    document.getElementById("new-task").value = "";
};

window.completeTaskFromManager = function (taskId) {
    manager.completeTask(taskId);
    showTasksInList();
};
window.updateTaskInManager = function (taskId) {
    let newDescription = prompt("Please enter new description");
    if(newDescription == "") alert("something went wrong");
    else {
        manager.updateTaskDescription(taskId,newDescription);
        showTasksInList();
    }
}
window.deleteTaskFromManager = function (taskId){
    console.log("deleteTaskFromManager called with taskId:", taskId);
    if (confirm("Are you sure?")) {
        manager.deleteTask(taskId);
        showTasksInList();
    }
}
  window.removeCompletedTask = function(taskId) {
    console.log("removeCompletedTask called with taskId:", taskId);
  let indexToRemove = manager.completed.findIndex((task) => task.id == taskId);
  manager.completed.splice(indexToRemove, 1);
    removeTasksFromList();
     manager.showCompletedTasksInList();
  }
 
 function removeTasksFromList(){
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = "";
  }

  window.updateCompletedTask = function(taskId){
     console.log("Updating task with ID:", taskId);
     let newDescription = prompt("Please enter new description");
    if(newDescription == "") alert("something went wrong");
    else {
      manager.updateCompletedDescription(taskId,newDescription);
        
    }
  }

  function showTasksInList() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = "";
    
for (let task of manager.tasks) {
    let description = typeof task.description === 'object' ? task.description.description : task.description;
    listElement.innerHTML += `<li class="fs-3 shadow d-flex justify-content-evenly">${description}<a onclick="completeTaskFromManager(${task.id})" class="lh-lg d-inline-block"><i class="fa-solid fa-check"></i> </a><a onclick="updateTaskInManager(${task.id})" class="d-inline-block"><i class="fa-solid fa-pen "></i></a><a onclick="deleteTaskFromManager(${task.id})" class="d-inline-block"><i class="fa-solid fa-trash "></i></a></li>`;
}

}

showTasksInList();































































































































