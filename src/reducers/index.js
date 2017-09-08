import { combineReducers } from 'redux'

import {
  LIST_POSTS,
  CATEGORY_ALL
} from '../actions'

const postObj = {
  id: '8xf0y6ziyjabvozdd253nd',
  timestamp: 1467166872634,
  title: 'Udacity is the best place to learn React',
  body: 'Everyone says so after all.',
  author: 'thingtwo',
  category: 'react',
  voteScore: 6,
  deleted: false
}

const postInitState = {
  postList: [
    postObj,
  ],
  categories: [],
}

function posts (state = postInitState, action) {
  switch (action.type) {
    case LIST_POSTS:
      const { posts } = action
      return {
        postList: posts,
        categories: [],
      }
      break
    case CATEGORY_ALL:
      const { payload } = action
      console.log(action)
      return {
        ...state,
        categories: payload.categories,
      }
      break;
    default:
      return state
  }
}

export default posts
