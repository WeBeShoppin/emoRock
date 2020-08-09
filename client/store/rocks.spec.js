import {expect} from 'chai'
import {getAllRocks} from './rocks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators for all rocks', () => {
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

  describe('getAllRocks', () => {
    it('eventually dispatches the GET_ROCKS action', async () => {
      const fakeRock = [
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
        }
      ]
      mockAxios.onGet('/api/rocks').replyOnce(200, fakeRock)
      await store.dispatch(getAllRocks())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ROCKS')
      expect(actions[0].rocks).to.be.deep.equal(fakeRock)
    })
  })
})
