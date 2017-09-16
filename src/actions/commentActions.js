import { makeFetch } from '../utils'

export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
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

function createComment (comment) {
  return {
    type: CREATE_COMMENT,
    payload: {
      comment,
    }
  }
}

function delComment() {
  return {
    type: DELETE_COMMENT,
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

function editingComment(comment) {
  return {
    type: EDIT_COMMENT,
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

export const addComments = (comment) => (dispatch, getState) => {
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
  .then(response => {
    if (response.status === 200) {
      dispatch(delComment())
    }
  })
}

export const voteDownComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`, 'POST', 'downVote')
    .then(response => response.json())
    .then(comment => dispatch(voteComment(comment)))
}

export const voteUpComment = (commentId) => (dispatch, getState) => {
  dispatch(requestComment())
  return makeFetch(`http://localhost:5001/comments/${commentId}`, 'POST', 'upVote')
    .then(response => response.json())
    .then(comment => dispatch(voteComment(comment)))
}