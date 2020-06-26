export default function createList(name, column) {
  function getListId() {
    return Date.now().toString();
  }
  return {
    listName: name,
    listId: getListId(),
    listCol: column,
    tasks: [],
  };
}
