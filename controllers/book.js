let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publish_date": "2014-12-14",
    "publisher": "No Starch Press",
    "numOfPages": 472,
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publish_date": "2012-07-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 254,
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publish_date": "2014-02-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 460,
}];
exports.add=(book)=>{
    books.push(book);

}
exports.list=()=>{
  return books;
}
exports.getISBN=(isbn)=>{
    for (let book of books) {
        if (book.isbn === isbn) {
            return book;
        }
    }
  return {};

}
exports.delISBN=(isbn)=>{
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });
    return true;

}
exports.updateISBN=(isbn, newBook)=>{
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }
  return true;

}

