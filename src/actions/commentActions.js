import { makeFetch } from '../utils'

export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const ON_CREATE_COMMENT = 'ON_CREATE_COMMENT'
export const ON_EDIT_COMMENT = 'ON_EDIT_COMMENT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDITING_COMMENT = 'EDITING_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VODE_COMMENT'

function requestComment() {
  return {
    type: REQUEST_COMMENT,
  }
}

function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    payload: {
      comments,
    }
  }
}

function receiveComment (comment) {
  return {
    type: RECEIVE_COMMENT,
    payload: {
      comment,
    }
  }
}

export function openCommentModal(postId) {
  return {
    type: ON_CREATE_COMMENT,
    payload: {
      postId,
    }
  }
}
export function onEditComment(comment) {
  return {
    type: ON_EDIT_COMMENT,
    payload: {
      comment,
    }
  }
}
export function closeCommentModal() {
  return {
    type: CLOSE_MODAL,
  }
}

function createComment (comment) {
  return {
    type: CREATE_COMMENT,
    payload: {
      comment,
    }
  }
}

function delComment(comment) {
  return {
    type: DELETE_COMMENT,
    payload: {
      comment,
    }
  }
}

function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    payload: {
      comment,
    }
  }
}

export function editingComment(comment) {
  return {
    type: EDITING_COMMENT,
    payload: {
      comment,
    }
  }
}

export const fetchComments = (postId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => dispatch(receiveComments(comments)))
}

export const fetchComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`)
    .then(response => response.json())
    .then(comment => dispatch(receiveComment(comment)))
}

export const addComment = (comment) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch('http://localhost:5001/comments', 'POST', comment)
    .then(response => response.json())
    .then(comment => dispatch(createComment(comment)))
}

export const editComment = (comment) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${comment.id}`, 'PUT', comment)
    .then(response => response.json())
    .then(comment => dispatch(editingComment(comment)))
}

export const deleteComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`, 'DELETE')
  .then(response => response.json())
  .then(comment => dispatch(delComment(comment)))
}

export const voteDownComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`, 'POST', { option: 'downVote' })
    .then(response => response.json())
    .then(comment => dispatch(voteComment(comment)))
}

export const voteUpComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`, 'POST', { option: 'upVote' })
    .then(response => response.json())
    .then(comment => dispatch(voteComment(comment)))
}
