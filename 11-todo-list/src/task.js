//factory function - return object without the 'new' keyword (makes it factory)
export default function createTask(input, deadline, listIndex) {
  let inputString = input.toLowerCase();
  let tagRegex = /(?=@).\w+/g;
  let taskTag = inputString.match(tagRegex);
  inputString = inputString.replace(tagRegex, "");
  let priorityRegex = /p1|urgent|p2|high|p3|medium|p4/g;
  let taskPriority = inputString.match(priorityRegex);
  inputString = inputString.replace(priorityRegex, "");
  let spaceRegex = /[^\s].+[^\s$]/g;
  let taskName = inputString.match(spaceRegex);
  // taskPriority.toString();

  function setTaskId() {
    return Date.now().toString();
  }

  function getTaskTag() {
    // let tagRegex = /(?=@).\w+/g;
    // let taskTag = input.match(tagRegex);
    if (taskTag == null) return "";
    return taskTag[0] + " ";
  }

  function getTaskPriority(taskPriority) {
    let priority;
    if (taskPriority == null || taskPriority == "") {
      priority = "p4";
      return priority;
    }
    let taskPriorityString = taskPriority.toString();

    switch (taskPriorityString) {
      case "p1":
      case "urgent":
        priority = "p1";
        break;
      case "p2":
      case "high":
        priority = "p2";
        break;
      case "p3":
      case "medium":
        priority = "p3";
        break;
      case "p4":
        priority = "p4";
        break;
      default:
        priority = "p4";
    }
    return priority;
  }

  function getTaskName() {
    // let tagRegex = /(?=@).\w+\s?/g;
    return taskName[0];
  }

  function getDeadline() {
    let taskDeadline = deadline;
    if (taskDeadline === "") return "";
    return taskDeadline;
  }

  function setCompleted() {
    let completed = false;
    return completed;
  }

  return {
    name: getTaskName(),
    id: setTaskId(),
    listIndex: listIndex,
    tag: getTaskTag(),
    priority: getTaskPriority(taskPriority),
    deadline: getDeadline(),
    completed: setCompleted(),
    info: () => {
      console.log(
        `Task = name:${getTaskName()} id:${setTaskId()} listIndex:${listIndex}  tag:${getTaskTag()} priority:${getTaskPriority(
          taskPriority
        )} deadline:${getDeadline()} completed:${setCompleted()}`
      );
    },
  };
}
