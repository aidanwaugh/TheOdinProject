//TODO: rename data-list-container to - - only, no =
export const uiSelectors = {
  contentElement: '#content',
  listTemplate: '#list-template',
  listContainer: '[data-list-container]',
  listContainerName: 'data-list-container',
  listHeader: '[data-list-header]',
  listDeleteBtn: '[data-list-delete]',
  listTaskRenderLocation: '[data-tasks]',
  newListInput: '[data-new-list="input"]',
  taskTemplate: '#task-template',
  newTaskInput: '[data-new-task="input"]',
  newTaskDeadline: '[data-new-task="deadline"]',
  newTaskBtn: '[data-new-task="btn"]',
};

export const renderTasks = (listId, tasksArray) => {
  //select that task list -> rennder items
  const listElement = document.querySelector(`[${uiSelectors.listContainerName}='${listId}']`);
  let tasksElement = listElement.querySelector(`${uiSelectors.listTaskRenderLocation}`);
  tasksElement.innerHTML = '';
  // console.log(tasksElement);
  tasksArray.forEach((task) => {
    const taskTemplate = document.importNode(document.querySelector(uiSelectors.taskTemplate).content, true);
    const taskLocation = listElement.querySelector(uiSelectors.listTaskRenderLocation);
    const taskDiv = taskTemplate.querySelector('div');
    taskDiv.dataset.taskIndex = task.index;
    const label = taskTemplate.querySelector('label');
    label.append(task.name);
    if (task.complete == true) taskDiv.classList.add('complete');

    const tagElement = taskTemplate.querySelector('[data-task-tag]');
    if (task.tag !== '') tagElement.innerText = task.tag + ' ';
    const deadlineElement = taskTemplate.querySelector('[data-task-deadline]');
    if (task.deadline !== '') deadlineElement.innerText = renderDeadline(task.deadline);
    const checkElement = taskTemplate.querySelector('input[type="checkbox"]');
    checkElement.classList.add(`p${task.priority}`);
    taskLocation.appendChild(taskTemplate);
  });
};

export const renderList = (listId, newList) => {
  const listElement = document.querySelector(`[${uiSelectors.listContainerName}='${listId}']`);
  console.log(listElement);
  const listTemplate = document.importNode(document.querySelector(uiSelectors.listTemplate).content, true);
  const listTitle = listTemplate.querySelector(uiSelectors.listHeader);
  listTitle.innerText = newList.name + ' ' + newList.id;
  listTemplate.querySelector(uiSelectors.listContainer).dataset.listContainer = newList.id;
  listElement.parentNode.insertBefore(listTemplate, listElement.nextSibling); //add new list behind current list
};

export const clearInput = (listId) => {
  const listElement = document.querySelector(`[${uiSelectors.listContainerName}='${listId}']`);
  let inputElements = listElement.querySelectorAll('input[type="text"], input[type="date"]');
  inputElements.forEach((input) => {
    input.value = '';
  });
};

export const renderPage = (items) => {
  let contentElement = document.querySelector(uiSelectors.contentElement);
  contentElement.innerHTML = '';
  items.forEach((col) => {
    //column render
    let columnElement = document.createElement('div');
    columnElement.innerText = col.columnName;
    columnElement.dataset.colId = col.columnId;
    contentElement.appendChild(columnElement);
    //list render
    col.lists.forEach((list) => {
      const listElement = document.importNode(document.querySelector(uiSelectors.listTemplate).content, true);
      const listTitle = listElement.querySelector(uiSelectors.listHeader);
      listTitle.innerText = list.name + ' ' + list.index;
      listElement.querySelector(uiSelectors.listContainer).dataset.listContainer = list.id;
      //task render
      list.tasks.forEach((task) => {
        //TODO: make this a function
        const taskTemplate = document.importNode(document.querySelector(uiSelectors.taskTemplate).content, true);
        const taskLocation = listElement.querySelector(uiSelectors.listTaskRenderLocation);
        const label = taskTemplate.querySelector('label');
        const taskDiv = taskTemplate.querySelector('div');
        label.append(task.name);
        if (task.complete == true) taskDiv.classList.add('complete');
        const tagElement = taskTemplate.querySelector('[data-task-tag]');
        if (task.tag !== '') tagElement.innerText = task.tag + ' ';
        const deadlineElement = taskTemplate.querySelector('[data-task-deadline]');
        if (task.deadline !== '') deadlineElement.innerText = renderDeadline(task.deadline);
        const checkElement = taskTemplate.querySelector('input[type="checkbox"]');
        checkElement.classList.add(`p${task.priority}`);
        //
        taskLocation.appendChild(taskTemplate);
      });
      columnElement.appendChild(listElement);
    });
  });
};

const renderDeadline = (deadline) => {
  let taskDueDate = new Date(deadline);
  // let taskDueDateUTC = taskDueDate.getUTCDate();
  let formattedDate;
  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate());
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  if (taskDueDate < todayDate) {
    formattedDate = `${taskDueDate.getUTCDate()}-${taskDueDate.getUTCMonth() + 1}-${taskDueDate.getUTCFullYear()}`;
  } else if (taskDueDate < endDate) {
    formattedDate = weekday[taskDueDate.getUTCDay()];
  } else {
    formattedDate = `${taskDueDate.getUTCDate()}-${taskDueDate.getUTCMonth() + 1}-${taskDueDate.getUTCFullYear()}`;
  }
  return formattedDate;
};

export const getTaskInput = (listContainerId) => {
  const targetList = document.querySelector(`[${uiSelectors.listContainerName}='${listContainerId}']`);
  return {
    taskInput: targetList.querySelector(uiSelectors.newTaskInput).value,
    taskDeadline: targetList.querySelector(uiSelectors.newTaskDeadline).value,
  };
};

export const getListInput = (listContainerId) => {
  const targetList = document.querySelector(`[${uiSelectors.listContainerName}='${listContainerId}']`);
  console.log(targetList);
  return targetList.querySelector(uiSelectors.newListInput).value;
  // return {
  // listName: targetList.querySelector(uiSelectors.newListInput).value
  // };
};

export const getParentColumn = (listContainerId) => {
  const targetList = document.querySelector(`[${uiSelectors.listContainerName}='${listContainerId}']`);
  return targetList.parentElement.dataset.colId;
};

export const getSelectors = () => {
  return uiSelectors;
};
