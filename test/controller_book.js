const chai = require('chai'), expect = chai.expect;
describe('BookController', function () {
  const Book=require('../controllers/book.js')
  describe('List', function(){
    it('should return the list of books', function(){
      const list=Book.list();
      expect(list).to.be.an('array');
    });
    it('should return a book with isbn', function(){
      const arr=["9781593275846", "9781449331818", "9781449365035"]
      //every odd minute it should fail
      dt=new Date()
      min=dt.getMinutes()
      let rndNo=(min%2==0)? 0 : (Math.floor(Math.random() * arr.length) + 0);
      const book=Book.getISBN(arr[rndNo]);

      expect(book).to.be.an('object');
      expect(book).to.have.property('isbn', '9781593275846');

    });

  });

});
