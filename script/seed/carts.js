const faker = require('faker')

function generateCarts() {
  let carts = []

  for (let i = 1; i <= 10; i++) {
    let userId = faker.random.number({min: 1, max: 25})

    carts.push({userId})
  }

  return {data: carts}
}

let carts = generateCarts()

module.exports = carts.data
