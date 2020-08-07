/* global describe beforeEach it */
const Promise = require('bluebird')
const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

let user

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(() => {
    user = User.build({
      id: 1,
      firstName: 'Danella',
      lastName: 'Trudgion',
      email: 'dtrudgion0@oracle.com',
      password: 'UDwOGg66W',
      salt: '',
      address: '648 Lawn Lane',
      phone: 3513905363,
      isAdmin: true,
      googleId: ''
    })
  })

  afterEach(() => {
    return Promise.all([User.truncate({cascade: true})])
  })

  describe('arrtibutes definition', () => {
    it('includes the following fields: `firstName`, `lastName`, `email`, `address`, `phone`, `googleId`, `isAdmin`', async () => {
      const savedUser = await user.save()
      expect(savedUser.firstName).to.equal('Danella')
      expect(savedUser.lastName).to.equal('Trudgion')
      expect(savedUser.email).to.equal('dtrudgion0@oracle.com')
      expect(savedUser.address).to.equal('648 Lawn Lane')
      expect(savedUser.phone).to.equal('3513905363')
      expect(savedUser.isAdmin).to.equal(true)
      expect(savedUser.googleId).to.equal('')
    })

    it('requires `email` field', async () => {
      user.email = null

      let result, error
      try {
        result = await user.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when email is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `firstName` field', async () => {
      user.firstName = null

      let result, error
      try {
        result = await user.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when firstName is null')
      expect(error).to.be.an.instanceOf(Error)
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
