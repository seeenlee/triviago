const router = require('express').Router();
const Question = require('../models/question');
const { Op, Sequelize} = require('sequelize');

router.route('/').post((req, res) => {
    Question.findOne({
        where: {
            [Op.and]: [
                {
                    id: {
                        [Op.notIn]: Sequelize.literal(`(
                            SELECT questionID
                            FROM Results
                            WHERE username = :username
                        )`)
                    },
                },
                {
                    username: {
                        [Op.ne]: req.body.username
                    }
                }
            ]
        },
        replacements: {username: req.body.username}
    })
    .then((result) => {
        if (result === null) {
            res.json(-1)
        }
        else {
            res.json(result)
        }
    })
    .catch((error) => console.error(error));
})

router.route('/find').post((req, res) => {
    Question.findOne({
        where: {
            id: req.body.id
        }
    })
        .then((result) => res.json(result))
        .catch((error) => console.error(error))
})

router.route('/update').post((req, res) => {
    Question.update({
            question: req.body.question,
            answer: req.body.answer,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3
        },
    {
        where: {
            id: req.body.id
        }
    })
        .then((result) => res.json(result))
        .catch((error) => console.error(error))
})

router.route('/user').post((req, res) => {
    Question.findAll({
        where: {
            username: req.body.username
        }
    })
        .then((results) => res.json(results))
        .catch((error) => console.error(error))
})

router.route('/delete').post((req, res) => {
    Question.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(() => res.json("Deleted"))
        .catch((error) => console.error(error))
})

router.route('/add').post((req, res) => {
    Question.create({
        username: req.body.username,
        question: req.body.question,
        answer: req.body.answer,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3
    })
    .then(() => res.json("Added!"))
    .catch((error) => console.error(error));
})

module.exports = router;