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
  imageUrl: {
    type: Sequelize.STRING
  },
  summary: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.INTEGER,
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
  color: Sequelize.STRING,
  inventory: Sequelize.INTEGER,
  status: {
    type: Sequelize.ENUM('inStock', 'outOfStock', 'lowSupply'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Rock
