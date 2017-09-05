import { combineReducers } from 'redux'

import {
  LIST_POSTS
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
      const { category, sortBy } = action
      return {
        postList: [],
        categories: [],
      }
      break
      
    default:
      return state
  }
}

export default posts
