let myLibraryArray = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const readState = document.querySelector("#book-status");

  if (title == "" || author == "" || pages == "") {
    alert("fill in fields correctly");
  } else {
    const newTitle = new Book(title, author, pages, readState);
    myLibraryArray.push(newTitle);
  }
}

function clearFormFields() {
  document.querySelector("#book-title").value = "";
  document.querySelector("#book-author").value = "";
  document.querySelector("#book-pages").value = "";
  //  document.querySelector("#book-status");
}

function render(library) {
  const bookList = document.querySelector("#book-table");
  const newRow = document.createElement("tr");
  library.forEach((book) => {
    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
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

const sampleBook = new Book("Harry Potter", "JK", "200", "Read");
myLibraryArray.push(sampleBook);

render(myLibraryArray);
