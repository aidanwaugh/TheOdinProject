import createTask from "./task.js";
import createList from "./list.js";

const domContainer = document.querySelector("#container");

const keyTarget = document.querySelector(`[data-doc-id]`);
const LOCAL_STORAGE_LIST_KEY = `${keyTarget.dataset.docId}.lists`;

let gtdArray = [];
let testArray = [{ listName: "waiting", listId: "22", tasks: [] }];

domContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const targetElement = e.target;
  const targetListId = e.target.dataset.listId; //22
  const listContainerElement = document.querySelector(`#list-${targetListId}`);
  const listTasksElement = listContainerElement.querySelector(".tasks");
  const textInput = targetElement[0].value;
  if (textInput == null || textInput === "") return;

  if (targetElement.hasAttribute("data-new-task-form")) {
    const taskDeadline = targetElement[1].value;
    console.log("id: " + targetListId);
    const targetList = testArray.find((list) => list.listId === targetListId); //add item to selected list
    console.log(targetList);
    console.log(testArray);
    const newTaskIndex = targetList.tasks.length;
    const newTask = createTask(textInput, taskDeadline, newTaskIndex);
    console.log(newTask.info());
    targetList.tasks.push(newTask);
    targetElement[0].value = null;
    targetElement[1].value = null;
    console.log(targetList.tasks);
    clearElement(listTasksElement);
    // saveToLocalStorage();
    renderTasks(targetList, listTasksElement);
  }

  if (targetElement.hasAttribute("data-new-section-form")) {
    const newList = createList(textInput);
    testArray.push(newList);
    // console.log(newList.listId);
    console.log(newList);
    console.log(testArray);

    renderList(textInput, newList.listId, listContainerElement);
    targetElement[0].value = null;
  }
});

domContainer.addEventListener("click", (e) => {
  //
});

function renderList(listName, listArrayId, referenceNode) {
  const listTemplate = document.importNode(document.getElementById("list-template").content, true);
  const listContainer = listTemplate.querySelector(".list-container");
  const listTitle = listTemplate.querySelector("[data-list-header");
  const listId = listArrayId;
  listContainer.id = "list-" + listId;
  listContainer.dataset.listId = listId;
  listTemplate.querySelector(".tasks").dataset.listId = listId;
  listTemplate.querySelector("[data-new-task-form]").dataset.listId = listId;
  listTemplate.querySelector("[data-new-task-input]").dataset.listId = listId;
  listTemplate.querySelector("[data-new-task-deadline]").dataset.listId = listId;
  listTemplate.querySelector("[data-new-section-form]").dataset.listId = listId;
  listTitle.append(listName + " " + listId);
  referenceNode.parentNode.insertBefore(listTemplate, referenceNode.nextSibling); //add new list after current
}
function renderTasks(list, renderLocation) {
  list.tasks.forEach((task) => {
    const taskTemplate = document.importNode(document.getElementById("task-template").content, true);
    const taskDiv = document.querySelector(".task");
    taskDiv.dataset.taskId = task.id;
    const checkbox = taskTemplate.querySelector(`input[type="checkbox"]`);
    checkbox.dataset.priority = task.priority;
    const label = taskTemplate.querySelector("label");
    label.append(task.name);
    const taskTag = taskTemplate.querySelector("[data-task-tag");
    taskTag.append(task.tag);
    const taskDeadline = taskTemplate.querySelector("[data-task-deadline]");
    task.deadline == "" ? taskDeadline.append(task.deadline) : taskDeadline.append(renderDate(task.deadline));

    renderLocation.appendChild(taskTemplate);
  });
}

function renderDate(date) {
  let dateObj = new Date(date);
  let dateObjUTC = dateObj.getUTCDate();
  let formattedDate;
  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  //if dued date is within 1 week, show day name, else date
  if (dateObj < endDate) {
    formattedDate = weekday[dateObj.getUTCDay()];
  } else {
    formattedDate = `${dateObj.getUTCDate()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCFullYear()}`;
  }
  return formattedDate;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function saveToLocalStorage() {
//   localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(testArray));
// }
