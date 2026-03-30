const router = require('express').Router();
const User = require('../models/user');

router.route('/add').post((req, res) => {
    const username = (req.body?.username || "").trim();
    const password = req.body?.password || "";

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    User.create({ username, password })
        .then((user) => res.status(201).json({ username: user.username }))
        .catch((error) => {
            // Common case: duplicate username (SequelizeUniqueConstraintError)
            if (
                error?.name === "SequelizeUniqueConstraintError" ||
                error?.name === "SequelizeValidationError" ||
                error?.parent?.code === "SQLITE_CONSTRAINT"
            ) {
                return res.status(409).json({ error: "Username already exists" });
            }

            console.error(error);
            return res.status(500).json({ error: "Failed to create user" });
        })
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