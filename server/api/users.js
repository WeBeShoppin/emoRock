const router = require('express').Router()
const {User, Cart, CartDetail, Rock} = require('../db/models')
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
    let cart = await Cart.findOne({where: {userId: req.params.userId}})

    if (cart) {
      let cartDetails = await CartDetail.findAll({
        where: {
          cartId: cart.id
        },
        include: [{model: Rock}]
      })
      if (cartDetails) {
        res.json(cartDetails)
      } else {
        res.json([])
      }
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    let rock = req.body

    let [newCart] = await Cart.findOrCreate({
      where: {userId: req.params.userId}
    })

    let newRock = await CartDetail.findOrCreate({
      where: {
        cartId: newCart.id,
        rockId: rock.id,
        quantity: rock.qty
      }
    })

    res.json(newRock)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const rockInCartToUpdate = await CartDetail.findOne({
      where: {rockId: req.body.id}
    })
    const newRock = await rockInCartToUpdate.update({quantity: req.body.qty})
    res.json(newRock)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    await CartDetail.destroy({where: {rockId: req.body.rockId}})
    res.status(204).end()
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
