const DataTypes = require('sequelize');
const sequelize = require('../database');
const Question = require('./question')
const User= require('./user')

const Result = sequelize.define('Result', {
    questionID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    choice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Question.hasMany(Result, {
    foreignKey: 'questionID',
    targetKey: 'id',
    onDelete: 'CASCADE'
})
Result.hasOne(Question, {
    foreignKey: 'id',
    targetKey: 'questionID',
    onDelete: 'CASCADE'
})

User.hasMany(Result, {
    foreignKey: 'username'
})
Result.hasMany(User, {
    foreignKey: 'username'
})


// Result.sync();

module.exports = Result;