const Sequelize = require('sequelize')
const db = require('../db')

const CartDetail = db.define('cartDetail', {
  quantity: Sequelize.INTEGER
})

module.exports = CartDetail
