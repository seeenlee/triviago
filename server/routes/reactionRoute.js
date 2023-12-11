const router = require('express').Router();
const Reaction = require('../models/reaction');

router.route('/all').get((req, res) => {
    Reaction.findAll()
        .then((results) => res.json(results))
        .catch((error) => console.error(error));
})

router.route('/add').post((req, res) => {
    Reaction.create({
        questionID: req.body.questionID,
        username: req.body.username,
        reaction: req.body.reaction
    })
        .then(() => res.json("Added!"))
        .catch((error) => console.error(error))
})

router.route('/').post((req, res) => {
    Reaction.findOne({
        where: {
            questionID: req.body.questionID,
            username: req.body.username
        }
    })
        .then((result) => res.json(result))
        .catch((error) => console.error(error))
})
router.route('/delete').post((req, res) => {
    Reaction.destroy({
        where: {
            questionID: req.body.questionID,
            username: req.body.username
        }
    })
        .then(() => res.json("Deleted"))
        .catch((error) => console.error(error))
})

module.exports = router;