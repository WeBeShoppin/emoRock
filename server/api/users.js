const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// const adminMiddleware = (req, res, next) => {
//   if (!req.user || !req.user.isAdmin) {
//     res.sendStatus(401)
//     next(error)
//   }
// }

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// router.post('/add', adminMiddleware, async (req, res, next) => {
//   try {
//     const newUser = await User.create(req.body)
//     res.json(newUser)
//   } catch (error) {
//     next(error)
//   }
// })
