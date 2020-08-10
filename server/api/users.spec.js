/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const agent = request.agent(app)
const Promise = require('bluebird')

xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([User.truncate({cascade: true})])
  })

  xdescribe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        email: codysEmail
      })
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  xdescribe('GET api/users/:userId', () => {
    let testUser

    beforeEach(async () => {
      const creatingUser = [
        {
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
        },
        {
          id: 2,
          firstName: 'Dala',
          lastName: 'Tru',
          email: 'david@oracle.com',
          password: 'UDwOGg666',
          salt: '',
          address: '61-55 junction rd',
          phone: 3513905365,
          isAdmin: false,
          googleId: ''
        }
      ].map(data => User.create(data))

      const createdUser = await Promise.all(creatingUser)
      testUser = createdUser[1]
    })

    /**
     * This is a proper GET /user/ID request
     * where we search by the ID of the user created above
     */
    xit('returns the JSON of the user based on the id', async () => {
      const res = await agent.get('/api/users/' + testUser.id).expect(200)

      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.email).to.equal('david@oracle.com')
    })

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    xit('returns a 404 error if the ID is not correct', () => {
      return agent.get('/api/users/200000').expect(404)
    })
  })
}) // end describe('User routes')
