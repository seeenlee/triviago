const router = require('express').Router();
const sequelize = require('../database');
const Question = require('../models/question');

router.route('/').get((req, res) => {
    Question.findOne({
        order: sequelize.random()
    })
    .then((result) => {
        const package = {
            question: result.question,
            answer: result.answer,
            option1: result.option1,
            option2: result.option2,
            option3: result.option3
        }
        res.json(package);
    })
    .catch((error) => console.error(error));
})

router.route('/all').get((req, res) => {
    Question.findAll()
    .then((results) => res.json(results))
    .catch((error) => console.error(error));
})

router.route('/add').post((req, res) => {
    Question.create({
        question: req.body.question,
        answer: req.body.answer,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3
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