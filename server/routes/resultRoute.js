const router = require('express').Router();
const Result = require('../models/result');

router.route('/add').post((req, res) => {
    Result.create({
        questionID: req.body.questionID,
        username: req.body.username,
        correct: req.body.correct,
        choice: req.body.choice,
        answer: req.body.answer,
    })
        .then(() => res.json("Added!"))
        .catch((error) => console.error(error))
})

module.exports = router;