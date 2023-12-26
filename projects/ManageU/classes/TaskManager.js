export default class TaskManager {
  constructor() {
    this.tasks = [];
    this.completed = [];
  }

  moveTaskToCompleted(taskToUpdate) {
    const completedTask = { ...taskToUpdate, completed: true };
    this.completed.push({ ...completedTask });
  }

  addTask(description) {
    this.tasks.push(description);
  }

  deleteTask(taskId) {
    let indexToDelete = this.tasks.findIndex((task) => task.id == taskId);
    this.tasks.splice(indexToDelete, 1);
  }

  updateTaskDescription(taskId, newDescription) {
    let indexToUpdate = this.tasks.findIndex((task) => task.id == taskId);
    this.tasks[indexToUpdate].description = newDescription;
  }

  completeTask(taskId) {
    const updateCompleted = this.tasks.findIndex((task) => task.id == taskId);
    const taskToUpdate = this.tasks[updateCompleted];

    if (taskToUpdate) {
      this.moveTaskToCompleted(taskToUpdate);
      const newId = Math.floor(Math.random() * 1000);
      taskToUpdate.id = newId;

      const description =
        typeof taskToUpdate.description === "object"
          ? taskToUpdate.description.description
          : taskToUpdate.description;

      taskToUpdate.completed = true;

      const completedList = document.getElementById("completedList");

      completedList.innerHTML += `
      <li class="fs-3 d-flex justify-content-evenly">${description}<a onclick="removeCompletedTask(${taskId})" class="ms-3 lh-lg"><i class="fa-solid fa-check"></i></a><a onclick="updateCompletedTask(${taskId})" class="ms-3"><i class="fa-solid fa-pen"></i></a><a onclick="removeCompletedTask(${taskId})" class="ms-3"><i class="fa-solid fa-trash"></i></a></li>`;
    }
  }
  showCompletedTasksInList() {
    const listElement = document.getElementById("completedList");
    listElement.innerHTML = "";

    for (let task of this.completed) {
      let description =
        task.description && typeof task.description === "object"
          ? task.description.description
          : task.description;

      listElement.innerHTML += `<li class="fs-3 shadow d-flex justify-content-evenly">${description}<a onclick="removeCompletedTask(${task.id})" class="ms-3 lh-lg"><i class="fa-solid fa-check"></i> </a><a onclick="updateCompletedTask(${task.id})"class="ms-3"><i class="fa-solid fa-pen"></i></a><a onclick="removeCompletedTask(${task.id})"class="ms-3"><i class="fa-solid fa-trash"></i>
    </li>`;
    }
  }

  updateCompletedDescription(taskId, newDescription) {
    let indexToUpdate = this.completed.findIndex((task) => task.id == taskId);
    if (indexToUpdate !== -1 && this.completed[indexToUpdate]) {
      this.completed[indexToUpdate].description = newDescription;
      console.log("before log");
      console.log(newDescription);
      console.log("after log");
      this.showCompletedTasksInList();
    }
  }
}
