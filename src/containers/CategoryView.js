/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostList from '../components/PostList'

import { fetchAllPosts } from '../actions/postListActions'

class App extends Component {
  static propTypes = {
    postList: PropTypes.array.isRequired,
    fetchAllPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchAllPosts, match } = this.props
    fetchAllPosts(match.params.category)
  }

  render () {
    console.log(this.props)
    const { history, postList } = this.props
    return (
      <div>
        <PostList
          history={history}
          list={postList} />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.posts.postList,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: (category) => dispatch(fetchAllPosts(category)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)
