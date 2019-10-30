var router = require('express').Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var auth = require('../auth');

//post categories
//token: "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjY0ZDUzZDMyZWQwNGMzYjQ4YTE0NSIsInVzZXJuYW1lIjoibmFtYW5oMTEwMiIsImV4cCI6MTU3NzQxMzY3NywiaWF0IjoxNTcyMjI5Njc3fQ.eJxjGDioPsaOp9JhiV8YqLtGsxxsIJtcQpZl6jeAfBU"
router.post('/', auth.required, function (req, res, next) {
    if (!req.body.name) {
        return res.status(422).json({ errors: { name: "name is required" } });
    }
    var category = new Category(req.body);
    category.createdBy = req.payload.id;
    category.save().then(() => {
        return res.json({ data: category });
    }).catch(next);

});


//get categories
router.get('/', auth.required, function (req, res, next) {
    Category.find()
        .populate({
            path: 'createdBy',
            select: 'username'
        })
        .then((categories) => {
            if (!categories) { return res.sendStatus(401); }
            return res.json({ data: categories });
        }).catch(next);
});


router.get('/:id', function (req, res, next) {
    Category.findById(req.params.id).then(category => {
        if (!category) { return res.sendStatus(401); }
        return res.json({ data: category });
    }).catch(next);
});


router.put('/:id', function (req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body.category, { new: true }).then(category => {
        if (!category) { return res.sendStatus(401); };
        return res.json({ data: category });
    }).catch(next);
});



router.delete('/:article/comments/:comment', auth.required, function (req, res, next) {
    if (req.comment.author.toString() === req.payload.id.toString()) {
        req.article.comments.remove(req.comment._id);
        req.article.save()
            .then(Comment.find({ _id: req.comment._id }).remove().exec())
            .then(function () {
                res.sendStatus(204);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
