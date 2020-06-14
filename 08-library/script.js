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

  //set read state of book
  if (checkbox == true) {
    readState = "checked";
  } else {
    readState = "";
  }

  //form validation
  if (title == "" || author == "" || pages == "") {
    alert("add correct fields");
  } else {
    const newTitle = new Book(title, author, pages, readState);

    myLibraryArray.push(newTitle);
    console.table(myLibraryArray);
    render(myLibraryArray);
    clearFormFields();
  }
}

function deleteBook(btn) {
  let tableRow = btn.parentNode.parentNode; //btn>td>tr
  myLibraryArray.splice(tableRow.rowIndex - 1, 1); //tr of <th> is rowIndex 0, then start at 1
  tableRow.remove();
  console.table(myLibraryArray);
}

function changeReadState(checkbox) {
  let tableRow = checkbox.parentNode.parentNode;
  if (myLibraryArray[tableRow.rowIndex - 1].readState == "") {
    myLibraryArray[tableRow.rowIndex - 1].readState = "checked";
    console.log(`${myLibraryArray[tableRow.rowIndex - 1].title} readState changed to checked/read`);
  } else {
    myLibraryArray[tableRow.rowIndex - 1].readState = "";
    console.log(`${myLibraryArray[tableRow.rowIndex - 1].title} readState changed to ""/unread`);
  }
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
    <td><input type="checkbox" ${book.readState}/></td>
    <td><button class="delete-btn delete">X</button></td>
    `;
    bookList.appendChild(newRow);
  });
}

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault(); //prevent actual submit

  addBook();
});

document.querySelector("#book-table").addEventListener("click", (e) => {
  var clickedItem = e.target;
  if (clickedItem.tagName == "INPUT") {
    changeReadState(e.target);
  }
  if (clickedItem.tagName == "BUTTON") {
    deleteBook(e.target);
  }
});

const sampleBook = new Book("Harry Potter", "JK", "200", "");
myLibraryArray.push(sampleBook);

document.addEventListener("DOMContentLoaded", render(myLibraryArray));
console.table(myLibraryArray);
