const router = require('express').Router()
const {User, Cart, Order, Rock} = require('../db/models')
module.exports = router

// const adminMiddleware = (req, res, next) => {
//   if (!req.user || !req.user.isAdmin) {
//     res.sendStatus(401)
//     next(error)
//   }
// }

// const isAdmin = req.user.isAdmin

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      const user = await User.findByPk(req.params.userId)

      if (user) {
        res.json(user)
      }
    } else {
      res.status(404).send('The user is not found')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    let rockIdsInCart = await Cart.findAll({
      where: {
        userId: req.params.userId
      },
      attributes: ['rockId'],
      raw: true
    })

    let rocksFromCart = []

    for (const rockId of rockIdsInCart) {
      const rock = await Rock.findByPk(rockId.id)
      return rocksFromCart.push(rock)
    }

    console.log('rocksFromCart', rocksFromCart)
    // const rocksInCart = await Rock.findAll
    if (rocksFromCart) {
      res.json(rocksFromCart)
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})
