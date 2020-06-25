//factory function - return object without the 'new' keyword (makes it factory)
export default function Task(input, deadline) {
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
    if (taskDeadline === "") return "none";
    return taskDeadline;
  }

  return {
    name: getTaskName(),
    tag: getTaskTag(),
    priority: "default P",
    deadline: getDeadline(),
    info: () => {
      console.log(`Task = name:${getTaskName()} tag:${getTaskTag()} priority:tbd deadline:${getDeadline()}`);
    },
  };
}
