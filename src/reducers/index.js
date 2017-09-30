import { combineReducers } from 'redux'
import posts from './posts'
import post from './post'
import comment from './comment'

const rootReducer = combineReducers({
  posts,
  post,
  comment,
})

export default rootReducer
