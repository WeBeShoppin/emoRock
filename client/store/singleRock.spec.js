import {expect} from 'chai'
import {getSingleRock} from './singleRock'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators for single rock', () => {
  let store
  let mockAxios

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getSingleRock', () => {
    it('eventually dispatches the SET_SINGLE_ROCK action', async () => {
      const fakeRock = {
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
      mockAxios.onGet('/api/rocks/1').replyOnce(200, fakeRock)
      await store.dispatch(getSingleRock('1'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_SINGLE_ROCK')
      expect(actions[0].singleRock).to.be.deep.equal(fakeRock)
    })
  })
})
