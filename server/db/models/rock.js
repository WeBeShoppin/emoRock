const Sequelize = require('sequelize')
const db = require('../db')

const Rock = db.define('rock', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      'Fear',
      'Enjoyment',
      'Anger',
      'Sadness',
      'Misc',
      'Disgust'
    ),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  color: {
    type: Sequelize.STRING
  }
})

module.exports = Rock
