const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Rock = db.model('rock')
const agent = request.agent(app)
const Promise = require('bluebird')

describe('Rock routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([Rock.truncate({cascade: true})])
  })

  describe('/api/rocks/', () => {
    beforeEach(() => {
      return Rock.create({
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

    it('GET /api/rocks', async () => {
      const res = await request(app)
        .get('/api/rocks')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Test Rock')
    })
  }) // end describe('/api/rocks')

  describe('GET api/rocks/:rockId', () => {
    let testRock

    beforeEach(async () => {
      const creatingRock = [
        {
          id: 1,
          name: 'Test Rock',
          summary: 'This is a cute rock',
          description: 'The description should be longer than the summary lol',
          price: 1000,
          category: 'Fear',
          color: 'yellow',
          inventory: 20,
          status: 'outOfStock'
        },
        {
          id: 2,
          name: 'Test Rock 2',
          summary: 'This is another cute rock',
          description: 'The description should also be longer than the summary',
          price: 2000,
          category: 'Fear',
          color: 'red',
          inventory: 100,
          status: 'inStock'
        }
      ].map(data => Rock.create(data))

      const createdRock = await Promise.all(creatingRock)
      testRock = createdRock[0]
    })

    /**
     * This is a proper GET /user/ID request
     * where we search by the ID of the rock created above
     */
    it('returns the JSON of the rock based on the id', async () => {
      const res = await agent.get('/api/rocks/' + testRock.id).expect(200)

      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.name).to.equal('Test Rock')
    })

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', () => {
      return agent.get('/api/rocks/200000').expect(404)
    })
  })

  describe('POST /rocks', () => {
    it('creates a new rock', async () => {
      const res = await agent
        .post('/api/rocks/add')
        .send({
          id: 2,
          name: 'Test Rock 2',
          summary: 'This is another cute rock',
          description: 'The description should also be longer than the summary',
          price: 2000,
          category: 'Fear',
          color: 'red',
          inventory: 100,
          status: 'inStock'
        })
        .expect(200)

      expect(res.body.name).to.equal('Test Rock 2')
      expect(res.body.price).to.equal(2000)
    })

    // This one should fail with a 500 because we don't set the article.content
    it('does not create a new rock without price', () => {
      return agent
        .post('/api/rocks/add')
        .send({
          id: 2,
          name: 'Test Rock 2',
          summary: 'This is another cute rock',
          description: 'The description should also be longer than the summary',
          category: 'Fear',
          color: 'red',
          inventory: 100,
          status: 'inStock'
        })
        .expect(500)
    })

    // Check if the articles were actually saved to the database
    it('saves the rock to the DB', async () => {
      await agent
        .post('/api/rocks/add')
        .send({
          id: 2,
          name: 'Test Rock 2',
          summary: 'This is another cute rock',
          description: 'The description should also be longer than the summary',
          price: 2000,
          category: 'Fear',
          color: 'red',
          inventory: 100,
          status: 'inStock'
        })
        .expect(200)

      const foundRock = await Rock.findOne({
        where: {name: 'Test Rock 2'}
      })

      expect(foundRock).to.exist // eslint-disable-line no-unused-expressions
      expect(foundRock.description).to.equal(
        'The description should also be longer than the summary'
      )
    })
  })

  /**
   * Series of specs to test updating of Articles using a PUT
   * request to /articles/:id
   */
  // describe('PUT /rocks/:rockId', () => {
  //   let rock
  //   let user

  //   beforeEach(async () => {
  //     rock = await Rock.create({
  //       id: 3,
  //       name: 'Test Rock 3',
  //       summary: 'This is another cute rock',
  //       description: 'The description should also be longer than the summary',
  //       price: 3000,
  //       category: 'Fear',
  //       color: 'red',
  //       inventory: 100,
  //       status: 'inStock'
  //     }),
  //     user = await User.create({
  //       id: 1,
  //       firstName: 'Danella',
  //       lastName: 'Trudgion',
  //       email: 'dtrudgion0@oracle.com',
  //       password: 'UDwOGg66W',
  //       salt: '',
  //       address: '648 Lawn Lane',
  //       phone: 3513905363,
  //       isAdmin: true,
  //       googleId: ''
  //     })
  //   })

  //   it('updates a rock', async () => {

  //     const res = await agent
  //     .put('/api/rocks/' + rock.id, user)
  //     .send({
  //       description: 'The description is now updated!!'
  //     })
  //     .expect(200);

  //     expect(res.body.rock.id).to.not.be.an('undefined');
  //     expect(res.body.rock.description).to.equal('The description is now updated!!');
  //     expect(res.body.rock.name).to.equal('Test Rock 3');

  //   });

  //   it('saves updates to the DB', async () => {

  //     await agent
  //     .put('/api/rocks/' + rock.id, user)
  //     .send({
  //       description: 'The description is now updated!!'
  //     });

  //     const foundRock = await Rock.findByPk(rock.id);

  //     expect(foundRock).to.exist; // eslint-disable-line no-unused-expressions
  //     expect(foundRock.description).to.equal('The description is now updated!!');

  //   });

  //   it('gets 500 for invalid update', () => {

  //     return agent
  //     .put('/api/rocks/' + rock.id, user)
  //     .send({ price: "hello" })
  //     .expect(500);

  //   });
  // })
}) // end describe('Rock routes')
