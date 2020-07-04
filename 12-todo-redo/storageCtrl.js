export const STORAGE_KEY = 'aw.gtd';

export const getItemsFromStorage = () => {
  let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
      columnId: 'col-0',
      columnName: 'Todo',
      lists: [
        {
          index: 0,
          name: '',
          id: 111,
          tasks: [
            { index: 0, name: 'Hi!', tag: '@example', priority: 1, deadline: '2020-07-08', complete: false },
            { index: 1, name: 'Tags, priority & deadlines are optional', tag: '', priority: 4, deadline: '', complete: false },
            { index: 2, name: 'use @ for tags', tag: '@tag', priority: 4, deadline: '2020-09-02', complete: false },
            { index: 3, name: 'Set priority with P1-4 [lowercase p]', tag: '', priority: 2, deadline: '', complete: false },
            { index: 4, name: 'Set task position with #)', tag: '', priority: 3, deadline: '', complete: false },
            { index: 5, name: 'Click checkbox or text to complete', tag: '', priority: 4, deadline: '', complete: true },
            {
              index: 6,
              name: 'Add a new list by clicking in the gap below this list',
              tag: '',
              priority: 4,
              deadline: '',
              complete: false,
            },
          ],
        },
        {
          index: 1,
          name: 'Future Addons',
          id: 1593802129857,
          tasks: [
            { index: 0, name: 'double click tasks to edit', tag: '', priority: 1, deadline: '', complete: false },
            { index: 1, name: 'button to clear all completed tasks', tag: '', priority: 4, deadline: '', complete: false },
            { index: 2, name: 'only use uiSelectors, no direct reference', tag: '', priority: 4, deadline: '', complete: false },
          ],
        },
      ],
    },
    {
      columnId: 'col-1',
      columnName: 'Projects',
      lists: [{ index: 0, name: '', id: 222, tasks: [] }],
    },
    {
      columnId: 'col-2',
      columnName: 'Someday / Maybe',
      lists: [
        {
          index: 0,
          name: '',
          id: 333,
          tasks: [],
        },
      ],
    },
  ];

  return todos;
};

export const saveToLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
