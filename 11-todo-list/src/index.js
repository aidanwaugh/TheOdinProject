import Task from "./task.js";

const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const newTaskDeadline = document.querySelector("[data-new-task-deadline]");

let colArray1 = [];

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(newTaskInput);
  // console.log(newTaskInput.value);
  // console.log(newTaskDeadline);
  // console.log(newTaskDeadline.value === "");
  const taskInput = newTaskInput.value;
  const taskDeadline = newTaskDeadline.value;
  if (taskInput == null || taskInput === "") return;
  const newTask = Task(taskInput, taskDeadline);
  console.log(newTask.info());
  newTaskInput.value = null;
  newTaskDeadline.value = null;
  const parentSection = newTaskForm.parentElement.parentElement.dataset.sectionId;
  console.log("parentSection id =" + parentSection);
  // newTaskDeadline
  // const selectedList = lists.find((list) => list.id === selectedListId); //add item to selected list
  // selectedList.tasks.push(task);
  // saveAndRender();
});

// let task = Task("laundary @setag", null);
// console.log(task.info());

// window.addEventListener('DOMContentLoaded', render())
