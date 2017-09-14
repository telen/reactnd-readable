import { combineReducers } from 'redux'

import {
  LIST_POSTS,
  POST_DETAIL,
  CATEGORY_ALL,
  COMMENTS_OF_POST,
  OPEN_MODAL,
  CLOSE_MODAL,
  EDITING_POST,
  NEW_POST,
  DELETE_POST,
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
  postList: [],
  categories: [],
  currentPost: {
    category: 'react'
  },
}

function posts (state = postInitState, action) {
  const { payload } = action
  switch (action.type) {
    case LIST_POSTS:
      return {
        ...state,
        postList: payload.posts.filter(a => !a.deleted).sort((a, b) => a.timestamp < b.timestamp),
        newPostModalOpen: false,
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
    case EDITING_POST:
      let { currentPost } = state
      currentPost = {
        ...currentPost,
        ...payload,
      }
      return {
        ...state,
        currentPost,
      }
      break;
    case NEW_POST:
      return state
      break;
    case DELETE_POST:
      return state
      break;
    default:
      return state
  }
}

export default posts
