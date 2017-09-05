import React, { Component } from 'react';
import { connect } from 'react-redux'
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

  render() {
    const { postList, commentList } = this.state

    return (
      <div className="App">
        <h1>MyReadable</h1>
        <PostList list={postList} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.postList,
  }
}

export default connect(mapStateToProps)(App);
