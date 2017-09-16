/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'

import { fetchAllPosts } from '../actions/postListActions'

class App extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    postList: PropTypes.array.isRequired,
    fetchAllPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchAllPosts, match, history } = this.props
    fetchAllPosts()
  }

  render () {
    console.log(this.props)
    const { history, categories, postList } = this.props
    return (
      <div>
        <CategoryList categories={categories} />
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
    categories: state.posts.categories,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)
