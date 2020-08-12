const router = require('express').Router()
const {User, Cart, Order, Rock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.send(401)
    } else if (req.user.isAdmin) {
      const users = await User.findAll({
        attributes: [
          'id',
          'email',
          'isAdmin',
          'firstName',
          'lastName',
          'address',
          'phone'
        ]
      })
      res.json(users)
    } else {
      res.send('Not authorized')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.send(401)
    } else if (req.user.id === req.params.userId || req.user.isAdmin) {
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

// PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
