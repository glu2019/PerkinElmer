import { combineReducers } from 'redux'
import productReducer from './productReducer'
import createProductReducer from './createProductReducer'
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
  productReducer,
  createProductReducer,
  searchReducer
})

export default rootReducer
