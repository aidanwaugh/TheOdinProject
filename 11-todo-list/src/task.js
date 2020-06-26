//factory function - return object without the 'new' keyword (makes it factory)
export default function createTask(input, deadline, listIndex) {
  function setTaskId() {
    // let taskId =
    return Date.now().toString();
  }

  function getTaskTag() {
    let tagRegex = /(?=@).\w+/g;
    let taskTag = input.match(tagRegex);
    if (taskTag == null) return;
    return taskTag[0] + " ";
  }

  function getTaskName() {
    let tagRegex = /(?=@).\w+\s?/g;
    return input.replace(tagRegex, "");
  }

  function getDeadline() {
    let taskDeadline = deadline;
    if (taskDeadline === "") return "noDeadline";
    return taskDeadline;
  }

  return {
    name: getTaskName(),
    id: setTaskId(),
    listIndex: listIndex,
    tag: getTaskTag(),
    priority: "default P",
    deadline: getDeadline(),
    completed: false,
    info: () => {
      console.log(`Task = id:${setTaskId()} listIndex:${listIndex} name:${getTaskName()} tag:${getTaskTag()} priority:tbd deadline:${getDeadline()}`);
    },
  };
}
