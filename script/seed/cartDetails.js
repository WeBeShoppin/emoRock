const faker = require('faker')
faker.seed(3)

function generateCartDetails() {
  let cartItem = []

  for (let i = 1; i <= 10; i++) {
    let cartId = faker.random.number({min: 1, max: 10})
    let rockId = faker.random.number({min: 1, max: 40})
    let quantity = faker.random.number(10)

    cartItem.push({cartId, rockId, quantity})
  }

  return {data: cartItem}
}

let cartDetails = generateCartDetails()

console.log(cartDetails)

module.exports = cartDetails.data
