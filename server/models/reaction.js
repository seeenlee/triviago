const DataTypes = require('sequelize');
const sequelize = require('../database');
const User= require('./user')
const Question = require("./question");

const Reaction = sequelize.define('Reaction', {
    questionID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    reaction: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Question.hasMany(Reaction, {
    foreignKey: 'questionID',
    targetKey: 'id',
    onDelete: 'CASCADE'
})
Reaction.hasOne(Question, {
    foreignKey: 'id',
    targetKey: 'questionID',
    onDelete: 'CASCADE'
})

User.hasMany(Reaction, {
    foreignKey: 'username'
})
Reaction.hasMany(User, {
    foreignKey: 'username'
})

module.exports = Reaction;