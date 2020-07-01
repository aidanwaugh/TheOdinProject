let data = [
  {
    lists: [
      { index: 0, name: 'i0' },
      { index: 1, name: 'i1' },
      { index: 2, name: 'i2' },
      { index: 3, name: 'i3' },
    ],
  },
];

//create item
let newThing = { index: 1, name: 'be second,index1' };
console.log(data[0].lists);

//set the existing task items +1
data[0].lists.forEach((thing) => {
  if (thing.index >= newThing.index) {
    thing.index += 1;
  }
});
console.log(data[0].lists);

//push new item to array
data[0].lists.push(newThing);
console.log(data[0].lists);

//sort array by index numbers 0-end
data[0].lists.sort((a, b) => a.index - b.index);

//render now (sorted task items)

//TODO: in program, for each list in the data, render the list

const contentElement = document.querySelector('#content');
let columnArray = [
  {
    columnId: 'col-0',
    columnName: 'GTD',
    lists: [
      { index: 0, name: 'i0', tasks: [{ name: 'hehheeh' }, { name: 'randomtask' }] },
      { index: 1, name: 'i1', tasks: [{ name: 'brh' }, { name: 'things' }] },
    ],
  },
  {
    columnId: 'col-1',
    columnName: 'col1name',
    lists: [{ index: 0, name: 'cnter row here', tasks: [{ name: 'make cake' }, { name: 'icing' }] }],
  },
  {
    columnId: 'col-2',
    columnName: 'sometextcol2',
    lists: [{ index: 0, name: 'last row', tasks: [{ name: 'running' }, { name: 'shoes' }, { name: 'stretch' }] }],
  },
];

//INITIAL RENDER
columnArray.forEach((col) => {
  //column render
  let columnElement = document.createElement('div');
  columnElement.innerText = col.columnName;
  columnElement.dataset.colId = col.columnId;
  contentElement.appendChild(columnElement);
  //list render
  col.lists.forEach((list) => {
    let listElement = document.createElement('div');
    listElement.innerText = list.name;
    //task render
    list.tasks.forEach((task) => {
      let taskElement = document.createElement('div');
      taskElement.innerText = task.name;
      listElement.appendChild(taskElement);
    });
    columnElement.appendChild(listElement);
  });
});
