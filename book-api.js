const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var csrf = require('csurf')
const Book=require('./controllers/book')
var session = require('express-session')

var csrfProtection = csrf({ cookie: { secure: true, httpOnly: true }});

const app = express()
const port = 3000

//test
//test
//test3
let corsOptions = {
  origin: 'localhost' // Compliant
};
app.use(cors(corsOptions));
app.use(helmet());
app.disable('x-powered-by')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  cookie: {
    httpOnly: true
  }
}))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', csrfProtection, (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    Book.add(book);

    res.send('Book is added to the database');
});

app.get('/book', csrfProtection, (req, res) => {
    res.json(Book.list());
});

app.get('/book/:isbn', csrfProtection, (req, res) => {
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

app.post('/book/:isbn', csrfProtection, (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    Book.updateISBN(isbn, newBook);
    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});
app.use(express.static('public'))

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
