const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM(
      'inCart',
      'pending',
      'checkout',
      'confirmed',
      'shipped'
    )
    //remove pending and checkout
  },
  subtotal: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
  shipping: Sequelize.INTEGER,
  discount: Sequelize.INTEGER,
  grandTotal: Sequelize.INTEGER
})

module.exports = Order
