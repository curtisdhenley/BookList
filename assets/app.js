// book class - takes in user book info to generate new instance
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// user interface class - handles user input tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash"><i/></a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  //   display alerts
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // alert vanish
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  //   method clears input
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("title").focus();
  }
}

// local storage class - will handle local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// event - will display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// event - will add books
document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  // get input values
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isbn = document.getElementById("isbn").value;

  // validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please make sure you fill in all fields", "danger");
  } else {
    // create book instance
    const book = new Book(title, author, isbn);

    // add new instance to page
    UI.addBookToList(book);

    // adds book to store class
    Store.addBook(book);

    // success message
    UI.showAlert("Book Successfully added!", "success");

    // clear input field after submit
    UI.clearFields();
  }
});

// event - will remove book both on page and in storage
document.getElementById("book-list").addEventListener("click", (event) => {
  event.preventDefault();
  // remove clicked item from page
  UI.deleteBook(event.target);
  //   remove book from store
  Store.removeBook(
    event.target.parentElement.previousElementSibling.textContent
  );
  // success message
  UI.showAlert("Book Successfully removed!", "info");
});
