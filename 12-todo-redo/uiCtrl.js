export const uiSelectors = {
  contentElement: '#content',
  listTemplate: '#list-template',
  listContainer: '[data-list-container]',
  listContainerName: 'data-list-container',
  listHeader: '[data-list-header]',
  listTaskRenderLocation: '[data-tasks]',
  taskTemplate: '#task-template',
  newTaskInput: '[data-new-task="input"]',
  newTaskDeadline: '[data-new-task="deadline"]',
  newTaskBtn: '[data-new-task="btn"]',
};

export const renderTasks = (listId, tasksArray) => {
  //select that task list -> rennder items
  const listElement = document.querySelector(`[${uiSelectors.listContainerName}='${listId}']`);
  let tasksElement = listElement.querySelector('[data-tasks]');
  tasksElement.innerHTML = '';
  console.log(tasksElement);
  tasksArray.forEach((task) => {
    const taskTemplate = document.importNode(document.querySelector(uiSelectors.taskTemplate).content, true);
    const taskLocation = listElement.querySelector(uiSelectors.listTaskRenderLocation);
    const label = taskTemplate.querySelector('label');
    label.append(task.name);
    taskLocation.appendChild(taskTemplate);
  });
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
      listTitle.innerText = list.name;
      listElement.querySelector(uiSelectors.listContainer).dataset.listContainer = list.id;
      //task render
      list.tasks.forEach((task) => {
        const taskTemplate = document.importNode(document.querySelector(uiSelectors.taskTemplate).content, true);
        const taskLocation = listElement.querySelector(uiSelectors.listTaskRenderLocation);
        const label = taskTemplate.querySelector('label');
        label.append(task.name);
        taskLocation.appendChild(taskTemplate);
      });
      columnElement.appendChild(listElement);
    });
  });
};

export const getTaskInput = (listContainerId) => {
  const targetList = document.querySelector(`[${uiSelectors.listContainerName}='${listContainerId}']`);
  return {
    taskInput: targetList.querySelector(uiSelectors.newTaskInput).value,
    taskDeadline: targetList.querySelector(uiSelectors.newTaskDeadline),
  };
};

export const getSelectors = () => {
  return uiSelectors;
};
