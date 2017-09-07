import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { listPosts } from '../actions'
import './App.css';
import PostList from './PostList'

class App extends Component {

  componentDidMount() {
    const { fetchPosts } = this.props
    console.log('did mount')
    fetchPosts()
  }

  render() {
    const { list } = this.props

    return (
      <div className="App">
        <h1>MyReadable</h1>
        <Switch>
          <Route exact path="/" render={({ history }) => (
            <PostList
              history={history}
              list={list}
            />
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

function mapStateToProps({ postList }) {
  return {
    list: postList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
