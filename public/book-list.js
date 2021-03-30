const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title,
        author,
        publisher,
        publish_date,
        numOfPages
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

  /*const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    location.reload();
}*/

const loadBooks = () => {

  $.getJSON("http://localhost:3000/book", function(bookList){
      for (let book of bookList) {
          const x = `
              <div class="col-4">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">${book.title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                          <div>Author: ${book.author}</div>
                          <div>Publisher: ${book.publisher}</div>
                          <div>Number Of Pages: ${book.numOfPages}</div>

                          <hr>

                          <button type="button" class="btn btn-danger">Delete</button>
                          <button types="button" class="btn btn-primary" data-toggle="modal"
                              data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                              Edit
                          </button>
                      </div>
                  </div>
              </div>
          `
        var books=$("#books").html();
        $("#books").html(books+x)
      }

  });


}

$(document).ready(function(){
  loadBooks();

});

