const chai = require('chai'), expect = chai.expect;
describe('BookController', function () {
  const Book=require('../controllers/book.js')
  describe('List', function(){
    it('should return the list of books', function(){
      const list=Book.list();
      expect(list).to.be.an('array');
    });
  });

});
