//what content array will look like
/* 
each column has own array - there are 3 columns per page
section name - first one is empty, this is the default section that is shown, rest must  be named upon creation 
columIndex - position of items in column, will be updated when drag function is implemented (last feature) - save local storage
columnCollapsed - is the section shown fully? or just the header? - save to local storage
taskPriority - normal, medium, high, urgent
deadline - first show dates only, (future have day 'monday' show if within the next 7 days)
taskIndex - order of task items in array, when drag task, index is updated
*/
let columnArray1 = [
  {
    sectionName: "",
    columnIndex: 0,
    columnCollapsed: false,
    tasks: [
      {
        taskName: "todo",
        taskTag: "@xmas",
        taskPriority: "normal",
        taskDeadline: "Tuesday",
        taskIndex: 0,
      },
      {
        taskName: "make dumplings",
        taskTag: "@waiting",
        taskPriority: "medium",
        taskDeadline: "03/11/2020",
        taskIndex: 1,
      },
    ],
  },
  { sectionName: "waiting for", columnIndex: 1, columnCollapsed: false, tasks: [] },
];
