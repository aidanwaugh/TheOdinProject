export default function createList(name) {
  function getListId() {
    return Date.now().toString();
  }
  return {
    listName: name,
    listId: getListId(),
    tasks: [],
  };
}
