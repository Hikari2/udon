import { combineReducers } from 'redux'
import auth from './auth'
import post from './post'
import pet from './pet'

const rootReducer = combineReducers({
  auth,
  post,
  pet
})

export default rootReducer
