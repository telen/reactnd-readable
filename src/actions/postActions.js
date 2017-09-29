import { makeFetch } from '../utils'

export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ON_CREATE_POST = 'ON_CREATE_POST'
export const CANCEL_CREATE_POST = 'CANCEL_CREATE_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDITING_POST = 'EDITING_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

function requestPost() {
  return {
    type: REQUEST_POST,
  }
}

export function onCreatePost() {
  return {
    type: ON_CREATE_POST,
  }
}

export function onCancelCreatePost() {
  return {
    type: CANCEL_CREATE_POST,
  }
}

function receivePost(post) {
  return {
    type: RECEIVE_POST,
    payload: {
      post,
    }
  }
}

function deletePost() {
  return {
    type: DELETE_POST,
  }
}

function createPost(post) {
  return {
    type: CREATE_POST,
    payload: {
      post,
    }
  }
}

export function editingPost(post) {
  return {
    type: EDITING_POST,
    payload: {
      ...post,
    }
  }
}

function updatePost(post) {
  return {

  }
}

function votePost(post) {
  return {
    type: VOTE_POST,
    payload: {
      post,
    }
  }
}


export const fetchPost = (postId) => (dispatch, getState) => {
  dispatch(requestPost())
  return makeFetch(`http://localhost:5001/posts/${postId}`)
    .then(response => response.json())
    .then(post => dispatch(receivePost(post)))
}

export const voteDownPost = (postId) => (dispatch, getState) => {
  dispatch(requestPost())
  return makeFetch(`http://localhost:5001/posts/${postId}`, 'POST', { option: 'downVote' })
    .then(response => response.json())
    .then(post => dispatch(votePost(post)))
}

export const voteUpPost = (postId) => (dispatch, getState) => {
  dispatch(requestPost())
  return makeFetch(`http://localhost:5001/posts/${postId}`, 'POST', { option: 'upVote' })
    .then(response => response.json())
    .then(post => dispatch(votePost(post)))
}

export const deletePostById = (postId) => (dispatch, getState) => {
  dispatch(requestPost())
  return makeFetch(`http://localhost:5001/posts/${postId}`, 'DELETE')
    .then(response => {
      if (response.status === 200) {
        dispatch(deletePost())
      }
    })
}

export const newPost = (post) => (dispatch, getState) => {
  dispatch(onCreatePost())
  return makeFetch('http://localhost:5001/posts', 'POST', post)
    .then(response => response.json())
    .then(post => dispatch(createPost(post)))
}

export const editPost = (post) => (dispatch, getState) => {
  dispatch(requestPost())
  return makeFetch(`http://localhost:5001/posts/${post.id}`, 'PUT', { title: post.title, body: post.body })
  .then(response => response.json())
  .then(post => dispatch(receivePost(post)))
}
