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

    if (user) {
      res.json(user)
    } else {
      res.status(404).send('The user is not found')
    }
  } catch (err) {
    next(err)
  }
})
