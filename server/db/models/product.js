const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
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
    type: Sequelize.FLOAT,
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

module.exports = Product
