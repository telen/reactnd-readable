import React, { Component } from 'react';
import { connect } from 'react-redux'
import { listPosts } from '../actions'
import './App.css';
import PostList from './PostList'

class App extends Component {
  state = {
    postList: [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
      },
    ],
    commentList: [
      {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false,
      },
    ]
  }

  componentDidMount() {
    const { fetchPosts } = this.props
    console.log('did mount')
    fetchPosts()
  }


  render() {
    const { list } = this.props
    const { postList, commentList } = this.state

    return (
      <div className="App">
        <h1>MyReadable</h1>
        <PostList list={list} />
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
