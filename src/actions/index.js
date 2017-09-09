export const LIST_POSTS = 'LIST_POSTS'
export const POST_DETAIL = 'POST_DETAIL'
export const CATEGORY_ALL = 'CATEGORY_ALL'
export const COMMENTS_OF_POST = 'COMMENTS_OF_POST'
export const NEW_POST = 'NEW_POST'
export const EDIT_POST = 'EDIT_POST'
export const NEW_COMMENT = 'NEW_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'


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

export function viewPost (post) {
  return {
    type: POST_DETAIL,
    payload: {
      post,
    }
  }
}

export function commentsOfPost ({ postId }) {
  return {
    type: COMMENTS_OF_POST,
    payload: {
      postId,
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
