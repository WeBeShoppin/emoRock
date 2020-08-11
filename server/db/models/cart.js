const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: Sequelize.INTEGER,
  purchasePrice: Sequelize.INTEGER,
  itemsList: Sequelize.ARRAY(Sequelize.INTEGER)
})

module.exports = Cart
