import { combineReducers } from 'redux'

import {
  LIST_POSTS,
  POST_DETAIL,
  CATEGORY_ALL,
  COMMENTS_OF_POST,
  OPEN_MODAL,
  CLOSE_MODAL
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
  const { payload } = action
  switch (action.type) {
    case LIST_POSTS:
      return {
        postList: payload.posts,
        categories: [],
      }
      break
    case CATEGORY_ALL:
      return {
        ...state,
        categories: payload.categories,
      }
      break;
    case POST_DETAIL:
      return {
        ...state,
        post: payload.post,
      }
      break;
    case COMMENTS_OF_POST:
      return {
        ...state,
        comments: payload.comments.sort((a, b) => a.score > b.score),
      }
      break;
    case OPEN_MODAL:
      console.log(payload)
      return {
        ...state,
        newPostModalOpen: true,
      }
      break;
    case CLOSE_MODAL:
      return {
        ...state,
        newPostModalOpen: false,
      }
      break;
    default:
      return state
  }
}

export default posts
