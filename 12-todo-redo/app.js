import * as storageCtrl from './storageCtrl.js';
import * as dataCtrl from './dataCtrl.js';
import * as uiCtrl from './uiCtrl.js';

const loadEventListeners = () => {
  const uiSelectors = uiCtrl.getSelectors();

  document.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  //add event listener each list
  document.querySelectorAll(uiSelectors.listContainer).forEach((list) => {
    list.addEventListener('click', (e) => {
      const listContainerId = list.dataset.listContainer;
      //console.log(list.dataset.listContainer); //print out id
      console.log(e.target);
      // console.log(e.target.dataset);

      if (e.target.dataset.newTask == 'btn') {
        newTaskSubmit(listContainerId);
      }

      if (e.target.dataset.newList == 'btn') {
        newListSubmit(listContainerId);
      }

      if (e.target.dataset.task == 'delete') {
        const deletedTask = e.target.parentElement;
        deleteTaskSubmit(deletedTask, listContainerId);
      }

      if (e.target.dataset.listDelete == 'btn') {
        deleteListSubmit(listContainerId);
      }

      if (e.target.dataset.task == 'checkbox' || e.target.dataset.task == 'label' || e.target.dataset.taskTag == '') {
        let taskIndex;
        if (e.target.dataset.taskTag == '') {
          taskIndex = e.target.parentElement.parentElement.dataset.taskIndex;
        } else {
          taskIndex = e.target.parentElement.dataset.taskIndex;
        }
        toggleTaskCompleteSubmit(taskIndex, listContainerId);
      }

      if (e.target.dataset.newTask == 'prompt' || e.target.dataset.newTask == 'span' || e.target.dataset.newTask == 'p') {
        toggleNewTaskInputClick(listContainerId);
      }

      if (e.target.dataset.newList == 'hover') {
        toggleAddListInputClick(listContainerId);
      }
    });
  });
};

const newTaskSubmit = (listContainerId) => {
  const input = uiCtrl.getTaskInput(listContainerId);
  if (input.taskInput === '' || input.taskInput === null) return;
  // console.log(input);
  const newTask = dataCtrl.createTask(input.taskInput, input.taskDeadline, listContainerId);
  console.log(newTask);
  dataCtrl.addTask(newTask, listContainerId);
  uiCtrl.renderTasks(listContainerId, dataCtrl.findTargetList(listContainerId).tasks);
  uiCtrl.clearInput(listContainerId);
  uiCtrl.toggleNewTaskInput(listContainerId);
  storageCtrl.saveToLocalStorage(dataCtrl.todoData);
  // console.log(dataCtrl.todoData);
};

const deleteTaskSubmit = (deletedTask, listContainerId) => {
  const taskIndex = deletedTask.dataset.taskIndex;
  dataCtrl.deleteTask(taskIndex, listContainerId);
  uiCtrl.renderTasks(listContainerId, dataCtrl.findTargetList(listContainerId).tasks);
  storageCtrl.saveToLocalStorage(dataCtrl.todoData);
};

const newListSubmit = (listContainerId) => {
  // console.log('new list');
  const parentColumn = uiCtrl.getParentColumn(listContainerId);
  console.log(parentColumn);

  const input = uiCtrl.getListInput(listContainerId, parentColumn);
  if (input === '' || input === null) return;
  const newList = dataCtrl.createList(input, listContainerId);
  console.log(newList);
  dataCtrl.addList(newList, parentColumn);
  uiCtrl.renderList(listContainerId, newList);
  loadEventListeners();
  uiCtrl.clearInput(listContainerId);
  uiCtrl.toggleAddListInput(listContainerId);
  storageCtrl.saveToLocalStorage(dataCtrl.todoData);
};

const deleteListSubmit = (listContainerId) => {
  const parentColumn = uiCtrl.getParentColumn(listContainerId);
  // console.log(parentColumn);
  dataCtrl.deleteList(listContainerId, parentColumn);
  storageCtrl.saveToLocalStorage(dataCtrl.todoData);
  init();
};

const toggleTaskCompleteSubmit = (taskIndex, listContainerId) => {
  // console.log(taskIndex);
  dataCtrl.toggleTaskComplete(taskIndex, listContainerId);
  uiCtrl.renderTasks(listContainerId, dataCtrl.findTargetList(listContainerId).tasks);
  storageCtrl.saveToLocalStorage(dataCtrl.todoData);
};

const toggleNewTaskInputClick = (listContainerId) => {
  uiCtrl.toggleNewTaskInput(listContainerId);
};

const toggleAddListInputClick = (listContainerId) => {
  uiCtrl.toggleAddListInput(listContainerId);
};

const init = () => {
  const items = dataCtrl.todoData;
  // const items = storageCtrl.getItemsFromStorage();
  console.log(items);
  uiCtrl.renderPage(items);
  loadEventListeners();
};

init();
