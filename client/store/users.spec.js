import {expect} from 'chai'
import {getAllUsers} from './users'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators for all users', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllUsers', () => {
    it('eventually dispatches the GET_ROCKS action', async () => {
      const fakeUser = [
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
        }
      ]
      mockAxios.onGet('/api/users').replyOnce(200, fakeUser)
      await store.dispatch(getAllUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USERS')
      expect(actions[0].users).to.be.deep.equal(fakeUser)
    })
  })
})
