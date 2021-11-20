console.log("hello world");
// Making Library USing ES6 CLasses

// First make all input value function
class booksVal {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.types = type;
  }
}

// ADD BOOK function
let form = document.getElementById("libraryForm");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("addName").value;
  let author = document.getElementById("addAuthor").value;

  // TYPES Value
  let type;
  let fiction = document.getElementById("fiction");
  let cooking = document.getElementById("cooking");
  let comics = document.getElementById("comics");
  if (fiction.checked) {
    type = fiction.value;
  } else if (cooking.checked) {
    type = cooking.value;
  } else if (comics.checked) {
    type = comics.value;
  }

  let book = new booksVal(name, author, type);

  // LocalStorage Work
  if (name.length > 2 || author.length > 2 || book.length < 2) {
    let bookList = localStorage.getItem("book");
    let bookObj;
    if (bookList == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(bookList);
    }

    bookObj.push(book);
    localStorage.setItem("book", JSON.stringify(bookObj));

    // Display Function call
    let display = new Display();
    display.show();
    display.clear();
    display.message("success", "Your Book is Added Successfully");
  } else {
    let display = new Display();
    display.message("danger", "Sorry You Cannot Added the Book");
  }
}

// Third make Display class and Prototypes

class Display {
  // clear Function whose reset the input values
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  // show Function to display the book list
  show() {
    let uiDisplay = document.getElementById("bookList");
    let bookList = localStorage.getItem("book");
    let bookObj;
    if (bookList == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(bookList);
    }

    let html = "";
    bookObj.forEach(function (element, index) {
      html += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.types}</td>
    <td><button id=${index} onClick='bookDel()' class="btn btn-secondary">Delete</button></td>
    </tr>`;
    });
    if (bookObj != 0) {
      uiDisplay.innerHTML = html;
    } else {
      uiDisplay.innerHTML = `<h4 class='my-3'>Nothing to show please enter the book</h4>`;
    }
  }

  // message Function when you add book SHow message
  message(type, mesg) {
    let mesgShow = document.getElementById("mesgShow");
    let uiMesg = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      <strong>Message</strong> ${mesg}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>`;
    mesgShow.innerHTML = uiMesg;
    // message will disappear after 3 sec
    setTimeout(function () {
      mesgShow.innerHTML = "";
    }, 3000);
  }
}

function bookDel(index) {
  let bookList = localStorage.getItem("book");
  let bookObj;
  if (bookList == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(bookList);
  }
  bookObj.splice(index, 1);
  localStorage.setItem("book", JSON.stringify(bookObj));

  let show = new Display();
  show.show();
}

let show = new Display();
show.show();
