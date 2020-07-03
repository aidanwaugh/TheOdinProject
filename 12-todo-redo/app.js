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
      //console.log(list.dataset.listContainer); //print out id
      // console.log(e.target);

      if (e.target.dataset.newTask == 'btn') {
        newTaskSubmit(list.dataset.listContainer);
      }
    });
  });
};

const newTaskSubmit = (listContainerId) => {
  const input = uiCtrl.getTaskInput(listContainerId);
  const newTask = dataCtrl.createTask(input.taskInput, listContainerId);
  console.log(newTask);
  dataCtrl.addTask(newTask, listContainerId);
  //TODO:
  uiCtrl.renderTasks(listContainerId, dataCtrl.findTargetList(listContainerId).tasks);
  uiCtrl.clearInput(listContainerId);
};

const init = () => {
  const items = dataCtrl.todoData;
  uiCtrl.renderPage(items);
  loadEventListeners();
};

init();
