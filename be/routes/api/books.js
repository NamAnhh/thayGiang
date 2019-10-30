var router = require('express').Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var User = mongoose.model('User');
var auth = require('../auth');

//post category
//token: "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjY0ZDUzZDMyZWQwNGMzYjQ4YTE0NSIsInVzZXJuYW1lIjoibmFtYW5oMTEwMiIsImV4cCI6MTU3NzQxMzY3NywiaWF0IjoxNTcyMjI5Njc3fQ.eJxjGDioPsaOp9JhiV8YqLtGsxxsIJtcQpZl6jeAfBU"
router.post('/', auth.required, (req, res, next) => {
    if (!req.body.name) return res.status(422).json({ errors: { name: "name is required" } });

    var book = new Book(req.body);

    book.createdBy = req.payload.id;
    book.bookList = book.bookList.map(x=>mongoose.Types.ObjectId(x));
    return book.save().then(() => {
        console.log(book);
        return res.json({ data: book });
    }).catch(next);
});

//get books
router.get('/', auth.required, (req, res, next) => {
    Book.find()
    .populate({
        path:"createBy",
        select:"username"
    })
    .populate({
        path:"bookList",
        select:"title name"
    })
   .then(book => {
       if(!book) {return res.sendStatus(401)}
       return res.json({data: book})
   }).catch(next)
});

module.exports = router;
