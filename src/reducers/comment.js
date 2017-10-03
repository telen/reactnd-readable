import {
  REQUEST_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  ON_CREATE_COMMENT,
  ON_EDIT_COMMENT,
  CLOSE_MODAL,
  CREATE_COMMENT,
  EDITING_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
} from '../actions/commentActions'

const initState = {
  comments: [],
  comment: {},
  current: {},
  parentId: '',
  isModalOpen: false,
  modalType: 'create',
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
    case ON_CREATE_COMMENT:
      return {
        ...state,
        parentId: payload.postId,
        isModalOpen: true,
        current: {},
        modalType: 'create',
      }
    case CLOSE_MODAL:
      return {
        ...state,
        current: {},
        isModalOpen: false,
      }
    case CREATE_COMMENT:
      const { comments } = state
      comments.push(payload.comment)
      return {
        ...state,
        comments,
      }
    case ON_EDIT_COMMENT:
      return {
        ...state,
        current: payload.comment,
        isModalOpen: true,
        modalType: 'update',
      }
    case EDITING_COMMENT:
      let { current } = state
      current = {
        ...current,
        ...payload.comment,
      }
      return {
        ...state,
        current,
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
