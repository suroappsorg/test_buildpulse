const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Book=require('./controllers/book')

const app = express()
const port = 3000

//test
//test
//test3
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    Book.add(book);

    res.send('Book is added to the database');
});

app.get('/book', (req, res) => {
    res.json(Book.list());
});

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    let b=Book.getISBN(isbn);
    if(b && b.isbn.length){
      return res.json(Book.getISBN(isbn));
    }
    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    Book.deleteISBN(isbn);

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    Book.updateISBN(isbn, newBook);
    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});
app.use(express.static('public'))

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
