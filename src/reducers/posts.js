import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
} from '../actions/postListActions'

const postInitState = {
  postList: [],
  categories: [],
  onLoading: false,
}

const posts = (state = postInitState, action) => {
  const { payload } = action
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        onLoading: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        postList: payload.posts.filter(a => !a.deleted).sort((a, b) => a.timestamp < b.timestamp),
        onLoading: false,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: payload.categories,
      }
    default:
      return state
  }
}

export default posts
