const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER
  },
  cartStatus: {
    type: Sequelize.ENUM(
      'inCart',
      'checkout',
      'confirmed',
      'pending',
      'shipped'
    )
  }
})

module.exports = Order
