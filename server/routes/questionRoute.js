const router = require('express').Router();
const Question = require('../models/question');

router.route('/').get((req, res) => {
    Question.findAll()
    .then((results) => res.json(results))
    .catch((error) => console.error(error));
})

router.route('/add').post((req, res) => {
    Question.create({
        question: req.body.question,
        answer: req.body.answer,
        option1: "hi",
        option2: "hi",
        option3: "hi",
    })
    .then(() => res.json("Added!"))
    .catch((error) => console.error(error));
})

router.route('/clear').delete((req, res) => {
    Question.destroy({
        where: {},
    })
    .then(() => res.json("All rows deleted"))
    .catch((error) => console.error('Failed to delete rows:', error));
})

module.exports = router;