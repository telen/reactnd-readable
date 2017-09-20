import { combineReducers } from 'redux'
import posts from './posts'
import post from './post'
import comment from './comment'

import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/common'

const common = (state = { newPostModalOpen: false }, action) => {
  const { payload } = action
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...payload,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  common,
  posts,
  post,
  comment,
})

export default rootReducer
