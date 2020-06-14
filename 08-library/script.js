let myLibraryArray = [];
// const submitBtn = document.querySelector("#submit-btn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} ${this.author} ${this.pages} ${this.read}`;
  };
}

function addBookToLibraryArray(book) {
  myLibraryArray.push(book);
}

function addBook() {
  let title = document.querySelector("#book-title").value;
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#book-pages").value;
  let readState = document.querySelector("#book-status");
  let newTitle = new Book(title, author, pages, readState);
  addBookToLibraryArray(newTitle);
  render(myLibraryArray);
}

function render(library) {
  const bookList = document.querySelector("#book-table");
  const newRow = document.createElement("tr");
  library.forEach((book) => {
    newRow.innerHTML = book.info();
    bookList.appendChild(newRow);
  });
}

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault(); //prevent actual submit
  addBook();
});

const sampleBook = new Book("Harry Potter", "JK", "200", "Read");
addBookToLibraryArray(sampleBook);
render(myLibraryArray);
