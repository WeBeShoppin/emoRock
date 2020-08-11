const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
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
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
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
