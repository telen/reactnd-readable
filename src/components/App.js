import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { listPosts, newPost, viewPost, commentsOfPost, getAllCategories,
  getCategoryPosts, openModal, closeModal } from '../actions'
import './App.css';
import PostList from './PostList'
import Post from './Post'
import CategoryList from './CategoryList'

class App extends Component {

  componentDidMount() {
    const { fetchPosts, fetchCategories, fetchPost, fetchPostComments,
      fetchCategoryPosts,
       history, match, location } = this.props
       fetchPosts()
       fetchCategories()

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
        fetchPosts()
        fetchCategories()
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

  componentDidUpdate(prevProps, prevState) {
    const { fetchPost } = this.props
    if (this.props.location.pathname.startsWith('/post/')) {
      const postId = this.props.location.pathname.replace('/post/', '');
      // fetchPost(postId)
    }
    // console.log('props update', this.props.location.pathname)
  }

  hanldePostClick = (postId) => {
    console.log('on post id click: ', postId)
  }


  render() {

    console.log('App mapStateToProps:', this.props)
    const { list, categories, post, comments, newPostModalOpen } = this.props
    const { openModal, closeModal, } = this.props;

    return (
      <div className="App">
        <h1>MyReadable</h1>
        <div>
          <button onClick={() => openModal() }>new post</button>
        </div>
        <Switch>
          <Route exact path="/" render={({ history }) => (
            <div>
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

          <form>
            <div>
              <label>
                Title:
                <input type="text" />
              </label>
            </div>
            <div>
              <label>
                Author:
                <input type="text" />
              </label>
            </div>
            <div>
              <label>
                Category:
                <select>
                  {categories.map((category) => {
                    return (<option value="{category.name}">{category.name}</option>)
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Content:
                <textarea  />
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

const fetchCategoryPosts = (category) => (dispatch, getState) => {
  return fetch(`http://localhost:5001/${category}/posts`,
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(posts => dispatch(listPosts(posts)))
}

function mapStateToProps({ postList, categories, post, comments, newPostModalOpen = false }) {
  return {
    list: postList,
    categories,
    post,
    comments,
    newPostModalOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
