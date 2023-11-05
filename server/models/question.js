const DataTypes = require('sequelize');
const sequelize = require('../database');

const Question = sequelize.define('Question', {
    questionID: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING
})

Question.sync();

module.exports = Question;