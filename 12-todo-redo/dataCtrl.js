export function createTask(inputValue, deadlineValue, listId) {
  let input = inputValue;
  let targetList = findTargetList(listId);

  const indexRegex = /\d+\)/g;
  let taskIndex = input.match(indexRegex);
  if (taskIndex === null) {
    taskIndex = targetList.tasks.length;
  } else if (taskIndex !== null && parseInt(taskIndex[0]) >= targetList.tasks.length) {
    taskIndex = targetList.tasks.length;
    input = input.replace(indexRegex, '');
  } else if (taskIndex !== null && parseInt(taskIndex[0]) < targetList.tasks.length) {
    taskIndex = parseInt(taskIndex[0].replace(/\)/, '')) - 1;
    input = input.replace(indexRegex, '');
  }

  const tagRegex = /@\S+/g;
  let taskTag = input.match(tagRegex);
  if (taskTag !== null) {
    input = input.replace(tagRegex, '');
    taskTag = taskTag[0];
  }

  const tagPriority = /p[1-4]/g;
  let taskPriority = input.match(tagPriority);
  if (taskPriority === null) {
    taskPriority = 4;
  } else if (taskPriority !== null) {
    taskPriority = parseInt(taskPriority[0].replace('p', ''));
    input = input.replace(tagPriority, '');
  }

  const firstSpaceRegex = /^\s?/g;
  let tempName = input.match(firstSpaceRegex);
  if (tempName == null) {
    tempName = input;
  } else {
    tempName = input.replace(firstSpaceRegex, '');
  }
  const lastSpaceRegex = /\s?$/g;
  let taskName;
  taskName = tempName.match(lastSpaceRegex);
  if (taskName == null) {
    taskName = tempName;
  } else {
    taskName = tempName.replace(lastSpaceRegex, '');
  }

  let taskDeadline = deadlineValue;

  return { index: taskIndex, name: taskName, tag: taskTag, priority: taskPriority, deadline: taskDeadline, completed: false };
}
/* ------------------------------------------------ */

export function createList(inputValue, currentListId) {
  const input = inputValue;
  const targetList = findTargetList(currentListId);
  const targetListIndex = targetList.index + 1;
  const newListId = Date.now();

  return { index: targetListIndex, name: input, id: newListId, tasks: [] };
}

/* ------------------------------------------------ */

export let todoData = [
  {
    columnId: 'col-0',
    columnName: 'GTD',
    lists: [
      {
        index: 0,
        name: 'i0',
        id: 100,
        tasks: [
          { index: 0, name: 'hehheeh' },
          { index: 1, name: 'randomtask' },
        ],
      },
      { index: 1, name: 'i1', id: 101, tasks: [{ index: 0, name: 'brh' }] },
    ],
  },
  {
    columnId: 'col-1',
    columnName: 'col1name',
    lists: [{ index: 0, name: 'cnter row here', id: 111, tasks: [{ index: 0, name: 'make cake' }] }],
  },
  {
    columnId: 'col-2',
    columnName: 'sometextcol2',
    lists: [
      {
        index: 0,
        name: 'last row',
        id: 222,
        tasks: [
          { index: 0, name: 'running' },
          { index: 1, name: 'shoes' },
          { index: 2, name: 'stretch' },
        ],
      },
    ],
  },
];

export const findTargetList = (listId) => {
  let targetList;
  for (let i = 0; i < todoData.length; i++) {
    targetList = todoData[i].lists.find((list) => list.id == listId);
    if (targetList != undefined) {
      return targetList;
    }
  }
};

const increaseIndexValues = (referenceIndex, listArray) => {
  listArray.forEach((item) => {
    if (referenceIndex <= item.index) {
      item.index += 1;
    }
  });
};

const decreaseIndexValues = (referenceIndex, listArray) => {
  listArray.forEach((item) => {
    if (referenceIndex < item.index) {
      item.index -= 1;
    }
  });
};

const sortByIndex = (list) => {
  list.sort((a, b) => a.index - b.index);
  console.log(list);
};

export const addTask = (newTask, listId) => {
  let targetList = findTargetList(listId);
  increaseIndexValues(newTask.index, targetList.tasks);
  targetList.tasks.push(newTask);
  sortByIndex(targetList.tasks);
};

export const deleteTask = (taskIndexString, listContainerId) => {
  const taskIndex = parseInt(taskIndexString);
  let targetListTasks = findTargetList(listContainerId).tasks;
  targetListTasks.splice(taskIndex, 1);
  decreaseIndexValues(taskIndex, targetListTasks);
  console.log(targetListTasks);
};

export const deleteList = (listContainerId, parentColumnName) => {
  let columnLists;
  for (let i = 0; i < todoData.length; i++) {
    if (todoData[i].columnId == parentColumnName) {
      columnLists = todoData[i].lists;
      break;
    }
  }
  let targetListIndex = findTargetList(listContainerId).index;
  columnLists.splice(targetListIndex, 1);
  console.log(columnLists);
  decreaseIndexValues(targetListIndex, columnLists);
};

export const addList = (newList, currentListId, parentColumn) => {
  //FIXME: delete?
  let targetList = findTargetList(currentListId);
  let targetColumn; //TODO: make into function
  for (let i = 0; i < todoData.length; i++) {
    if (todoData[i].columnId == parentColumn) {
      targetColumn = todoData[i];
      break;
    }
  }

  console.log(targetColumn);
  increaseIndexValues(newList.index, targetColumn.lists);
  targetColumn.lists.push(newList);
  sortByIndex(targetColumn.lists);
};
