export const LIST_POSTS = 'LIST_POSTS'
export const POST_DETAIL = 'POST_DETAIL'
export const CATEGORY_ALL = 'CATEGORY_ALL'
export const CATEGORY_POST = 'CATEGORY_POST'
export const COMMENTS_OF_POST = 'COMMENTS_OF_POST'
export const NEW_POST = 'NEW_POST'
export const EDIT_POST = 'EDIT_POST'
export const NEW_COMMENT = 'NEW_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const EDITING_POST = 'EDITING_POST'
export const DELETE_POST = 'DELETE_POST'


export function listPosts (posts) {

  return {
    type: LIST_POSTS,
    payload: {
      posts,
    }
  }
}

export function newPost ({ title, body, author, category, }) {
  return {
    type: NEW_POST,
    payload: {
      title,
      body,
      author,
      category,
    }
  }
}

export function deletePost (payload) {
  return {
    type: DELETE_POST,
    payload,
  }
}

export function editingPost(payload) {
  return {
    type: EDITING_POST,
    payload,
  }
}

export function viewPost (post) {
  return {
    type: POST_DETAIL,
    payload: {
      post,
    }
  }
}

export function commentsOfPost (comments) {
  return {
    type: COMMENTS_OF_POST,
    payload: {
      comments,
    }
  }
}

export function getAllCategories ({ categories }) {
  return {
    type: CATEGORY_ALL,
    payload: {
      categories,
    }
  }
}

export function getCategoryPosts ({ category }) {
  return {
    type: CATEGORY_POST,
    payload: {
      category,
    }
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL,
    payload: {
      newPostModalOpen: true,
    }
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: {
      newPostModalOpen: false,
    }
  }
}
