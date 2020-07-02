export const UISelectors = {
  contentElement: '#content',
  listTemplate: '#list-template',
  listTemplateHeader: '[data-list-header]',
  listTemplateTaskLocation: '[data-tasks]',
  taskTemplate: '#task-template',
};

export const renderPage = (items) => {
  let contentElement = document.querySelector(UISelectors.contentElement);
  items.forEach((col) => {
    //column render
    let columnElement = document.createElement('div');
    columnElement.innerText = col.columnName;
    columnElement.dataset.colId = col.columnId;
    contentElement.appendChild(columnElement);
    //list render
    col.lists.forEach((list) => {
      const listElement = document.importNode(document.querySelector(UISelectors.listTemplate).content, true);
      const listTitle = listElement.querySelector(UISelectors.listTemplateHeader);
      listTitle.innerText = list.name;
      //task render
      list.tasks.forEach((task) => {
        const taskTemplate = document.importNode(document.querySelector(UISelectors.taskTemplate).content, true);
        const taskLocation = listElement.querySelector(UISelectors.listTemplateTaskLocation);
        const label = taskTemplate.querySelector('label');
        label.append(task.name);
        taskLocation.appendChild(taskTemplate);
      });
      columnElement.appendChild(listElement);
    });
  });
};
