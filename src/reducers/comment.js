import {
  REQUEST_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
} from '../actions/commentActions'

const initState = {
  comments: [],
  comment: {},
}

const comment = (state = initState, action) => {
  const { payload } = action
  switch(action.type) {
    case REQUEST_COMMENT:
      return {
        ...state,
        onLoading: true,
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: payload.comments,
      }
    case RECEIVE_COMMENT:
      return {
        ...state,
        comment: payload.comment,
      }
    case CREATE_COMMENT:
      const { comments } = state

      return {
        ...state,
        comments: comments.push(payload.comment),
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comment: payload.comment,
      }
    case DELETE_COMMENT:
      return state
    case VOTE_COMMENT:
      return {
        ...state,
        comment: payload.comment,
      }
    default:
      return state
  }
}

export default comment
