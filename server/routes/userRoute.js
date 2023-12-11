const router = require('express').Router();
const User = require('../models/user');

router.route('/add').post((req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(() => res.json("Added!"))
    .catch((error) => console.error(error))
})

router.route('/delete').post((req, res) => {
    User.destroy({
        where: {
            username: req.body.username
        }
    })
        .then(() => res.json("Deleted"))
        .catch((error) => console.error(error))
})

router.route('/login').post((req, res) => {
    User.findAndCountAll({
        where: {username: req.body.username, password: req.body.password} 
    })
    .then((result) => {
        if (result.count == 1) {
            res.json(result.rows[0].dataValues.id)
        }
        else if (result.count > 1) {
            console.log("Multiple users found")
            res.json(-1)
        }
        else {
            res.json(-1)
        }
    })
    .catch((error) => console.error(error));

    router.route('/clear').delete((req, res) => {
        User.destroy({
            where: {},
        })
        .then(() => res.json("All rows deleted"))
        .catch((error) => console.error('Failed to delete rows:', error));
    })
})

module.exports = router;