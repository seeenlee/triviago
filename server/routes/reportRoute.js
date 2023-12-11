const router = require('express').Router();
const Reaction = require('../models/reaction');
const User = require('../models/user');
const Question = require('../models/question');
const Result = require('../models/result');
const { Op, Sequelize} = require('sequelize');
const sequelize = require('../database')


router.route('/').post(async (req, res) => {
    try {
        results = await sequelize.query(`SELECT results.questionID, results.answer, results.choice, questions.question FROM results, questions WHERE results.questionID = questions.id AND results.username = :username ORDER BY results.createdAt DESC LIMIT 10`,
            {
                replacements: {username: req.body.username}
            }
        )
        yours = await sequelize.query(
            `SELECT id AS questionID, question, answer
            FROM questions
            WHERE username = :username
            LIMIT 10`,
            {
                replacements: {username: req.body.username}
            }
        )
        twenty = await sequelize.query('SELECT AVG(correct) * 100 AS percent FROM (SELECT correct FROM Results WHERE username = :username ORDER BY createdAt DESC LIMIT 20) AS correct',
            {
                replacements: {username: req.body.username}
            })
        fifty = await sequelize.query('SELECT AVG(correct) * 100 AS percent FROM (SELECT correct FROM Results WHERE username = :username ORDER BY createdAt DESC LIMIT 50) AS correct',
            {
                replacements: {username: req.body.username}
            })
        all = await sequelize.query('SELECT AVG(correct) * 100 AS percent FROM (SELECT correct FROM Results WHERE username = :username ORDER BY createdAt DESC) AS correct',
            {
                replacements: {username: req.body.username}
            })
        likes = await sequelize.query(
            `
            SELECT SUM(Reactions.reaction) AS likes
            FROM Users, Questions, Reactions
            WHERE Users.username = Questions.username
            AND Questions.id = Reactions.questionID
            AND Users.username = :username`,
            {
                replacements: {username: req.body.username}
            }
        )
        res.json({results: results[0], yours: yours[0], twenty: twenty[0][0], fifty: fifty[0][0], all: all[0][0], likes: likes[0][0]})
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;