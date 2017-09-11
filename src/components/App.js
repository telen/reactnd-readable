import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { listPosts, newPost, viewPost, commentsOfPost, getAllCategories } from '../actions'
import './App.css';
import PostList from './PostList'
import Post from './Post'
import CategoryList from './CategoryList'


class App extends Component {

  componentDidMount() {
    const { fetchPosts, fetchCategories, fetchPost, fetchPostComments, history, match, location } = this.props
    fetchPosts()
    fetchCategories()

    if (location.pathname.startsWith('/post/')) {
      const postId = location.pathname.replace('/post/', '');
      fetchPost(postId)
      fetchPostComments(postId)
    }

    history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
      console.log(`The last navigation action was ${action}`)
      console.log(match)
      if (location.pathname.startsWith('/post/')) {
        const postId = location.pathname.replace('/post/', '');
        fetchPost(postId)
        fetchPostComments(postId)
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
    const { list, categories, post, comments } = this.props
    console.log(comments)
    return (
      <div className="App">
        <h1>MyReadable</h1>
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
          <Route render={() => (
            <h2>404 Not Found</h2>
          )} />
        </Switch>
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

function mapStateToProps({ postList, categories, post, comments }) {
  return {
    list: postList,
    categories,
    post,
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
