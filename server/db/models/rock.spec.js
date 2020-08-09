/* global describe beforeEach it */
const Promise = require('bluebird')
const {expect} = require('chai')
const db = require('../index')
const Rock = db.model('rock')

let rock

describe('Rock model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(() => {
    rock = Rock.build({
      id: 1,
      name: 'Test Rock',
      summary: 'This is a cute rock',
      description: 'The description should be longer than the summary lol',
      price: 1000,
      category: 'Fear',
      color: 'yellow',
      inventory: 20,
      status: 'outOfStock'
    })
  })

  afterEach(() => {
    return Promise.all([Rock.truncate({cascade: true})])
  })

  describe('arrtibutes definition', () => {
    it('includes the following fields: `name`, `summary`, `description`, `price`, `category`, `color`, `inventory`, `status`', async () => {
      const savedRock = await rock.save()
      expect(savedRock.name).to.equal('Test Rock')
      expect(savedRock.summary).to.equal('This is a cute rock')
      expect(savedRock.description).to.equal(
        'The description should be longer than the summary lol'
      )
      expect(savedRock.price).to.equal(1000)
      expect(savedRock.category).to.equal('Fear')
      expect(savedRock.color).to.equal('yellow')
      expect(savedRock.inventory).to.equal(20)
      expect(savedRock.status).to.equal('outOfStock')
    })

    it('requires `name` field', async () => {
      rock.name = null

      let result, error
      try {
        result = await rock.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `price` field', async () => {
      rock.price = null

      let result, error
      try {
        result = await rock.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when price is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `category` field', async () => {
      rock.category = null

      let result, error
      try {
        result = await rock.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when category is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `status` field', async () => {
      rock.status = null

      let result, error
      try {
        result = await rock.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when status is null')
      expect(error).to.be.an.instanceOf(Error)
    })
  })
}) // end describe('Rock model')
