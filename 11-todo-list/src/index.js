import createTask from "./task.js";
import createList from "./list.js";

const domContainer = document.querySelector("#container");

const keyTarget = document.querySelector(`[data-doc-id]`); //gtd
const LOCAL_STORAGE_LIST_KEY = `${keyTarget.dataset.docId}.lists`;

// let gtdArray = [];
// let gtdArray = [{ listName: "waiting", listId: "111", tasks: [] }];
let gtdArray = [
  { column: "col-0", name: "GTD", lists: [{ listCol: "col-0", listName: "col-0-default", listId: "000", tasks: [] }] },
  { column: "col-1", name: "Projects", lists: [{ listCol: "col-1", listName: "col-1-default", listId: "111", tasks: [] }] },
  { column: "col-2", name: "SomedayMaybe", lists: [{ listCol: "col-2", listName: "col-2-default", listId: "222", tasks: [] }] },
];

domContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const targetElement = e.target;
  const targetListId = e.target.dataset.listId; //111
  const listContainerElement = document.querySelector(`#list-${targetListId}`);
  const listTasksElement = listContainerElement.querySelector(".tasks");
  const textInput = targetElement[0].value;
  if (textInput == null || textInput === "") return;

  if (targetElement.hasAttribute("data-new-task-form")) {
    const taskDeadline = targetElement[1].value;
    // console.log("id: " + targetListId);
    //TODO:
    let targetList = undefined;
    for (let i = 0; i < gtdArray.length; i++) {
      // let targetList = gtdArray[i].find((list) => list.listId === targetListId);
      // console.log(gtdArray[i].lists);
      targetList = gtdArray[i].lists.find((list) => list.listId === targetListId);
      // console.log(targetList);
      if (targetList != undefined) break;
    }

    // const targetList = gtdArray.find((list) => list.listId === targetListId); //add item to selected list
    const newTaskIndex = targetList.tasks.length;
    const newTask = createTask(textInput, taskDeadline, newTaskIndex);
    targetList.tasks.push(newTask);
    console.group(`task: ${newTask.name}`);
    // console.log(targetList);
    console.log(textInput);
    console.log(newTask);
    console.log(targetList.tasks);
    console.log(gtdArray);
    console.groupEnd();
    targetElement[0].value = null;
    targetElement[1].value = null;
    clearElement(listTasksElement);
    // saveToLocalStorage();
    renderTasks(targetList, listTasksElement);
  }

  if (targetElement.hasAttribute("data-new-section-form")) {
    const columnId = listContainerElement.parentElement.parentElement.id;
    const targetCol = gtdArray.find((col) => col.column === columnId); //add item to selected list
    const newList = createList(textInput, columnId);
    // console.log(newList);
    // console.log(targetCol);
    targetCol.lists.push(newList);
    // gtdArray.push(newList);
    // console.log(newList.listId);
    // console.log(newList);
    // console.log(gtdArray);

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
  let taskDueDate = new Date(date);
  let taskDueDateUTC = taskDueDate.getUTCDate();
  let formattedDate;
  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate());
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  //if dued date is within 1 week, show day name, else date
  if (taskDueDate < todayDate) {
    formattedDate = `${taskDueDate.getUTCDate()}-${taskDueDate.getUTCMonth() + 1}-${taskDueDate.getUTCFullYear()}`;
  } else if (taskDueDate < endDate) {
    formattedDate = weekday[taskDueDate.getUTCDay()];
  } else {
    formattedDate = `${taskDueDate.getUTCDate()}-${taskDueDate.getUTCMonth() + 1}-${taskDueDate.getUTCFullYear()}`;
  }
  return formattedDate;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function saveToLocalStorage() {
//   localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(gtdArray));
// }
