const router = require('express').Router()
const {Rock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rocks = await Rock.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(rocks)
  } catch (err) {
    next(err)
  }
})
