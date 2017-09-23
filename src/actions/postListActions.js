import { makeFetch } from '../utils'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      posts,
    }
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: {
      categories: json.categories,
    }
  }
}

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts())
    const url = category ? `http://localhost:5001/${category}/posts`
                        : 'http://localhost:5001/posts'
    return makeFetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

export function fetchCategories() {
  return dispatch => {
    return makeFetch('http://localhost:5001/categories')
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}

export function fetchAllPosts(category) {
  return (dispatch, getState) => {
    if (getState().posts.categories.length) {
      return dispatch(fetchPosts(category))
    } else {
      return dispatch(fetchCategories())
        .then(() => {
          return dispatch(fetchPosts(category))
        })
    }
  }
}
