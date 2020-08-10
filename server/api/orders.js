const router = require('express').Router()
const {Order} = require('../db/models')

/* const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(401)
    next(error)
  }
} */

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)

    if (order) {
      res.json(order)
    } else {
      res.status(404).send('The order is not found')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const updated = await Order.update(req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const deletedOrder = await ondragenter.delete(req.params.orderId)
    res.json(deletedOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
