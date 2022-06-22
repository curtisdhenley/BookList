// book class - takes in user book info to generate new instance
class Book {
  constructor(title, author, isbn) {
    this._title = title;
    this._author = author;
    this._isbn = isbn;
  }

  // getters
  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get isbn() {
    return this._isbn;
  }

  // setters
  set title(newTitle) {
    this._title = newTitle;
  }

  set author(newAuthor) {
    this._author = newAuthor;
  }

  set isbn(newisbn) {
    this._isbn = newisbn;
  }
}

// user interface class - handles user input tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3434434",
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "45545",
      },
    ];

    const books = StoredBooks;

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

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// local storage class - will handle local storage

// event - will display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event - will add books
document.getElementById("submitBtn").addEventListener("click", (event) => {
    event.preventDefault();
    // get input values
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let isbn = document.getElementById("isbn").value;

    // create book instance
    const book = new Book(title, author, isbn);

    // add new instance to page and local storage
    UI.addBookToList(book);
    
    // clear input field after submit
    UI.clearFields();
})

// event - will remove book both on page and in storage
