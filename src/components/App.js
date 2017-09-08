import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { listPosts, newPost, viewPost, commentsOfPost, getAllCategories } from '../actions'
import './App.css';
import PostList from './PostList'
import Post from './Post'
import CategoryList from './CategoryList'


class App extends Component {

  componentDidMount() {
    const { fetchPosts, fetchCategories } = this.props
    console.log('did mount')
    fetchPosts()
    fetchCategories()
  }

  hanldePostClick = (postId) => {
    console.log('on post id click: ', postId)
  }

  render() {
    console.log('App mapStateToProps:', this.props)
    const { list, categories } = this.props

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
  return fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(posts => dispatch(listPosts(posts)))
}

const fetchCategories = () => (dispatch, getState) => {
  return fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(response => response.json())
    .then(categories => dispatch(getAllCategories(categories)))
}

function mapStateToProps({ postList, categories }) {
  return {
    list: postList,
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
