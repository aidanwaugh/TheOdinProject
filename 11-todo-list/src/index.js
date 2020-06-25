import Task from "./task.js";

const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const newTaskDeadline = document.querySelector("[data-new-task-deadline]");
const domContainer = document.querySelector("#container");

const keyTarget = document.querySelector(`[data-doc-id]`);
const LOCAL_STORAGE_LIST_KEY = `${keyTarget.dataset.docId}.lists`;

let gtdArray = [];
let testArray = [
  { id: "22", name: "waiting", tasks: [] },
  { id: "33", name: "current", tasks: [] },
];

domContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = e.target;
  //add task item
  if (target.hasAttribute("data-new-task-form-id")) {
    const taskInput = e.target[0].value;
    const taskDeadline = e.target[1].value;
    if (taskInput == null || taskInput === "") return;
    const selectedListId = e.target.parentElement.parentElement.parentElement.dataset.listId;
    const targetList = testArray.find((list) => list.id === selectedListId); //add item to selected list

    // console.log(targetList.id);
    const newTaskIndex = targetList.tasks.length;
    const newTask = Task(taskInput, taskDeadline, newTaskIndex);
    //reset form values
    e.target[0].value = null;
    e.target[1].value = null;
    //send to array
    targetList.tasks.push(newTask);
    console.log(targetList.tasks);
    const tasksContainer = document.querySelector(`[data-tasks-id="${targetList.id}"]`);
    clearElement(tasksContainer);
    // saveToLocalStorage();
    renderTasks(targetList);
  }

  if (target.hasAttribute("data-new-sub-list-form")) {
    console.log("make a section");
    //TODO: push form value to new object, render in dom using template
  }
});

domContainer.addEventListener("click", (e) => {
  // console.log(e.target);
});

function renderTasks(targetList) {
  const taskTemplate = document.getElementById("task-template");

  targetList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const label = taskElement.querySelector("label");
    label.append(task.name);
    const tasksContainer = document.querySelector(`[data-tasks-id="${targetList.id}"]`);
    tasksContainer.appendChild(taskElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function saveToLocalStorage() {
//   localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(testArray));
// }
