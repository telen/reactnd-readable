/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'
import NewPostModal from '../components/NewPostModal'

import { fetchAllPosts } from '../actions/postListActions'
import { editingPost, newPost } from '../actions/postActions'
import { openModal, closeModal } from '../actions/common'

import history from '../utils/history'

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
    const { history, categories, postList, newPostModalOpen,
      openEditModal, currentPost, closeEditModal, onEditingPost, createPost } = this.props
    return (
      <div>
        <h1>Readable</h1>
        <div>
          <button onClick={() => openEditModal() }>new post</button>
        </div>
        <CategoryList categories={categories} />
        <PostList
          history={history}
          list={postList} />
        <NewPostModal
          isOpen={newPostModalOpen}
          categories={categories}
          currentPost={currentPost}
          closeModal={closeEditModal}
          handleEditing={onEditingPost}
          createPost={createPost} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.posts.postList,
    categories: state.posts.categories,
    newPostModalOpen: state.common.newPostModalOpen,
    currentPost: state.post.currentPost,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
  openEditModal: () => dispatch(openModal()),
  closeEditModal: () => dispatch(closeModal()),
  onEditingPost: (post) => dispatch(editingPost(post)),
  createPost: (post) => {
    return dispatch(newPost(post)).then(({ payload }) => {
      console.log(payload.post)
      history.push(`/${payload.post.category}/${payload.post.id}`)
      return dispatch(closeModal())
    })
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)
