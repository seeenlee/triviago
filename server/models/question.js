const DataTypes = require('sequelize');
const sequelize = require('../database');
const User= require('./user')


const Question = sequelize.define('Question', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
},
    option1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option3: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Question, {
    foreignKey: 'username',
    targetKey: 'username'
})
Question.hasOne(User, {
    foreignKey: 'username',
    targetKey: 'username',
    onDelete: 'SET NULL'
})

module.exports = Question;