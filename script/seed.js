'use strict'

const db = require('../server/db')
const {User, Rock, Order, CartDetail, Cart} = require('../server/db/models')
const {users, orders, rocks, cartDetails, carts} = require('./seed/index')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const dummyUsers = await User.bulkCreate(users, {
    returning: true
  })

  const dummyOrders = await Order.bulkCreate(orders, {
    returning: true
  })

  const dummyRocks = await Rock.bulkCreate(rocks, {
    returning: true
  })

  const dummyCarts = await Cart.bulkCreate(carts, {
    returning: true
  })

  const dummyCartDetails = await CartDetail.bulkCreate(cartDetails, {
    returning: true
  })

  console.log(`seeded ${dummyUsers.length} users`)
  console.log(`seeded ${dummyRocks.length} rocks`)
  console.log(`seeded ${dummyOrders.length} orders`)
  console.log(`seeded ${dummyCarts.length} carts`)
  console.log(`seeded ${dummyCartDetails.length} cartDetails`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
