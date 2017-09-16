import {
  REQUEST_POST,
  RECEIVE_POST,
  ON_CREATE_POST,
  CANCEL_CREATE_POST,
  CREATE_POST,
  EDITING_POST,
  DELETE_POST,
  VOTE_POST,
} from '../actions/postActions'

const initState = {
  post: {},
  postList: [],
}
const post = (state = initState, action) => {
  const { payload } = action
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        onLoading: true,
      }
    case RECEIVE_POST:
      return {
        ...state,
        post: payload.post,
      }
    case ON_CREATE_POST:
      return {
        ...state,
        newPostModalOpen: true,
      }
    case CANCEL_CREATE_POST:
      return {
        ...state,
        newPostModalOpen: false,
      }
    case CREATE_POST:
      const { postList } = action
      return {
        ...state,
        postList: postList.push(payload.post),
        newPostModalOpen: false,
      }
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
    case DELETE_POST:
      return state
    case VOTE_POST:
      return {
        ...state,
        post: payload.post,
      }
    default:
      return state
  }
}

export default post
