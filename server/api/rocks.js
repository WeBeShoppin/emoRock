const router = require('express').Router()
const {Rock} = require('../db/models')
module.exports = router

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(401)
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const rocks = await Rock.findAll()
    res.json(rocks)
  } catch (error) {
    next(error)
  }
})

router.get('/:rockId', async (req, res, next) => {
  try {
    const rock = await Rock.findByPk(req.params.rockId)
    res.json(rock)
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const newRock = await Rock.create(req.body)
    res.json(newRock)
  } catch (error) {
    next(error)
  }
})

router.put('/:rockId', adminMiddleware, async (req, res, next) => {
  try {
    const updated = await Rock.update(req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:rockId', adminMiddleware, async (req, res, next) => {
  try {
    const deletedRock = await Rock.delete(req.params.rockId)
    res.json(deletedRock)
  } catch (error) {
    next(error)
  }
})
