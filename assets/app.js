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
    <td></td>
    `
  }
}

// local storage class - will handle local storage

// event - will display books

// event - will add books

// event - will remove book both on page and in storage
