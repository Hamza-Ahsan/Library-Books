console.log("Hello World");


// Book Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}

// Add in Prototype of Display
Display.prototype.add = function (book) {
  let bookList = document.getElementById("bookList");
  let bookRows = `<tr>
                        <th scope="row">#</th>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
  bookList.innerHTML += bookRows;
};

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, message) {
  let alertShow = document.getElementById("alertShow");
  alertShow.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>Message</strong> ${message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
  setTimeout(() => {
    alertShow.innerHTML = "";
  }, 3000);
};


// Add Event Listener to Submit form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("addName").value;
  let author = document.getElementById("addAuthor").value;

  let fiction = document.getElementById("fiction");
  let cooking = document.getElementById("cooking");
  let comics = document.getElementById("comics");
  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (cooking.checked) {
    type = cooking.value;
  } else if (comics.checked) {
    type = comics.value;
  }

  let book = new Book(name, author, type);

  let display = new Display();
  if (display.validate(book)) {
    display.clear();
    display.add(book);
    display.show("success", "Your book has been Successfully Added");
  } else {
    //   Error
    display.show("danger", "Sorry you can not add the Book");
  }

  console.log(book);
}
