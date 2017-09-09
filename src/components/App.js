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
    const { fetchPosts, fetchCategories } = this.props
    fetchPosts()
    fetchCategories()
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
    const { list, categories, post } = this.props

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

const fetchCategories = () => (dispatch, getState) => {
  return fetch('http://localhost:5001/categories',
      { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(categories => dispatch(getAllCategories(categories)))
}

function mapStateToProps({ postList, categories, post }) {
  return {
    list: postList,
    categories,
    post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
