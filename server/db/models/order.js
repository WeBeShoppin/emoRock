const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM(
      'inCart',
      'checkout',
      'confirmed',
      'pending',
      'shipped'
    )
  },
  subtotal: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
  shipping: Sequelize.INTEGER,
  discount: Sequelize.INTEGER,
  grandTotal: Sequelize.INTEGER
})

module.exports = Order
