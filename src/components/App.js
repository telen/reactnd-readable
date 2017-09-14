import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { listPosts, newPost, viewPost, commentsOfPost, getAllCategories,
  getCategoryPosts, openModal, closeModal, editingPost, deletePost } from '../actions'
import './App.css';
import PostList from './PostList'
import Post from './Post'
import CategoryList from './CategoryList'

class App extends Component {

  componentDidMount() {
    const { fetchPosts, fetchCategories, fetchPost, fetchPostComments,
      fetchCategoryPosts, fetchCategoriesAndPosts,
       history, match, location } = this.props
       fetchCategoriesAndPosts()

    if (location.pathname.startsWith('/post/')) {
      const postId = location.pathname.replace('/post/', '');
      fetchPost(postId)
      fetchPostComments(postId)
    }

    history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
      // console.log(`The last navigation action was ${action}`)
      // console.log(match)
      if (location.pathname === '/') {
        fetchCategoriesAndPosts()
      }
      if (location.pathname.startsWith('/post/')) {
        const postId = location.pathname.replace('/post/', '');
        fetchPost(postId)
        fetchPostComments(postId)
      }
      if (location.pathname.startsWith('/category/')) {
        const category = location.pathname.replace('/category/', '');
        fetchCategoryPosts(category)
      }
    })
  }

  hanldePostClick = (postId) => {
    console.log('on post id click: ', postId)
  }

  handleTitleChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ title: event.target.value })
  }
  handleAuthorChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ author: event.target.value })
  }
  handleCategoryChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ category: event.target.value })
  }
  handleBodyChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ body: event.target.value })
  }
  handleSubmit = (event) => {
    const { currentPost, createPostAndFetchAllPost } = this.props
    currentPost.timestamp = Date.now()
    currentPost.id = Math.random().toString(36).slice(2)

    createPostAndFetchAllPost(currentPost)
    event.preventDefault()
  }


  render() {

    console.log('App mapStateToProps:', this.props)
    const { list, categories, post, comments, newPostModalOpen, currentPost } = this.props
    const { openModal, closeModal, deletePost } = this.props;

    return (
      <div className="App">
        <h1>MyReadable</h1>

        <Switch>
          <Route exact path="/" render={({ history }) => (
            <div>
              <div>
                <button onClick={() => openModal() }>new post</button>
              </div>
              <CategoryList
                history={history}
                categories={categories} />
              <PostList
                history={history}
                list={list}
                onViewPost={this.hanldePostClick} />
            </div>
          )} />
          <Route path="/post/:id" render={({ match, history  }) => (
            <div>
              Post View
              <p>postId {match.params.id}</p>
              <Post
                post={post || {}}
                commentList={comments || []}
                onDelete={deletePost}
                />
            </div>
          )} />
          <Route path="/category/:cat" render={({ match, history }) => (
            <div>
              <PostList
                history={history}
                list={list}
                onViewPost={this.hanldePostClick} />
            </div>
          )} />
          <Route render={() => (
            <h2>404 Not Found</h2>
          )} />
        </Switch>
        <Modal
          className="modal"
          overlayClassName='overlay'
          isOpen={newPostModalOpen}
          contentLabel='Modal'>
          <div className="modal-close">
            <button onClick={() => closeModal()}>close</button>
          </div>
          <div>new Post</div>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Title:
                <input type="text" onChange={this.handleTitleChange} required/>
              </label>
            </div>
            <div>
              <label>
                Author:
                <input type="text" onChange={this.handleAuthorChange} required/>
              </label>
            </div>
            <div>
              <label>
                Category:
                <select onChange={this.handleCategoryChange}>
                  {categories.map((category) => {
                    return (<option key={category.name} value={category.name}>{category.name}</option>)
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Content:
                <textarea  onChange={this.handleBodyChange} required/>
              </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    )
  }
}

const fetchPosts = () => (dispatch, getState) => {
  // dispatch(fetching)
  return fetch('http://localhost:5001/posts',
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(posts => dispatch(listPosts(posts)))
}

const fetchPost = (postId) => (dispatch, getState) => {
  // dispatch(fetching)
  return fetch(`http://localhost:5001/posts/${postId}`,
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(post => dispatch(viewPost(post)))
}

const createPost = (post) => (dispatch, getState) => {
  // dispatch(fetching)
  return fetch('http://localhost:5001/posts',
      {
        headers: { 'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(post),
      })
      .then(response => response.json())
      .then(resp => dispatch(newPost(resp)))
}
/* combine create post */
const createPostAndFetchAllPost = (post) => (dispatch, getState) => {
  return dispatch(createPost(post)).then(() => {
    return dispatch(fetchCategoriesAndPosts())
  })
}

const doDeletePost = (postId) => (dispatch, getState) => {
  return fetch(`http://localhost:5001/posts/${postId}`,
      {
        headers: { 'Authorization': 'whatever-you-want' },
        method: 'DELETE',
      })
    .then(res => dispatch(deletePost(res)))
}
const fetchPostComments = (postId) => (dispatch, getState) => {
  // dispatch(fetching)
  return fetch(`http://localhost:5001/posts/${postId}/comments`,
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(comments => dispatch(commentsOfPost(comments)))
}

const fetchCategories = () => (dispatch, getState) => {
  return fetch('http://localhost:5001/categories',
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(categories => dispatch(getAllCategories(categories)))
}

/* combine fetch all categories and posts */
const fetchCategoriesAndPosts = () => (dispatch, getState) => {
  return dispatch(fetchCategories()).then(() => {
    return dispatch(fetchPosts())
  })
}

const fetchCategoryPosts = (category) => (dispatch, getState) => {
  return fetch(`http://localhost:5001/${category}/posts`,
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(posts => dispatch(listPosts(posts)))
}

function mapStateToProps({ postList, categories, post, comments, newPostModalOpen = false, currentPost }) {
  return {
    list: postList,
    categories,
    post,
    comments,
    newPostModalOpen,
    currentPost,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()).then(() => {
      console.log('fetched posts.')
    }),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCategoriesAndPosts: () => dispatch(fetchCategoriesAndPosts()),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    handleEditing: (post) => dispatch(editingPost(post)),
    createPost: (post) => dispatch(createPost(post)),
    createPostAndFetchAllPost: (post) => dispatch(createPostAndFetchAllPost(post)),
    deletePost: (postId) => dispatch(doDeletePost(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
