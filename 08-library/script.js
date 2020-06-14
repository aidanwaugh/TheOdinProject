let myLibraryArray = [];

function Book(title, author, pages, readState) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

function addBook() {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const checkbox = document.querySelector("#book-state").checked;

  //if readState is true, print new item with 'checked' else leave empty
  if (checkbox == true) {
    readState = "checked";
  } else {
    readState = "";
  }

  if (title == "" || author == "" || pages == "") {
    console.log("wrong");
  } else {
    const newTitle = new Book(title, author, pages, readState);
    myLibraryArray.push(newTitle);
    console.table(myLibraryArray);
  }
}

function deleteBook(book) {
  // if (book.classList.contains("delete")) {
  // book.parentElement.parentElement.remove();
  // }
  let row = book.parentNode.parentNode;
  console.log(row.rowIndex);
  myLibraryArray.splice(row.rowIndex - 1, 1);
  row.remove();
}

function clearFormFields() {
  document.querySelector("#book-title").value = "";
  document.querySelector("#book-author").value = "";
  document.querySelector("#book-pages").value = "";
  document.querySelector("#book-state").checked = false;
}

function render(library) {
  const bookList = document.querySelector("#book-table");
  const newRow = document.createElement("tr");
  library.forEach((book) => {
    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><input type="checkbox" ${book.readState}/></td?
    <td><button class="delete-btn delete">X</button></td>
    `;
    bookList.appendChild(newRow);
  });
}

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault(); //prevent actual submit
  addBook();
  render(myLibraryArray);
  clearFormFields();
});

document.querySelector("#book-table").addEventListener("click", (e) => {
  // Remove book from UI
  deleteBook(e.target);
  console.table(myLibraryArray);
});
const sampleBook = new Book("Harry Potter", "JK", "200", "Read");
myLibraryArray.push(sampleBook);

render(myLibraryArray);
