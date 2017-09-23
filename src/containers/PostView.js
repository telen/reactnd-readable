import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Post from '../components/Post'
import CommentList from '../components/CommentList'
import NewPostModal from '../components/NewPostModal'

import history from '../utils/history'

import { fetchCategories } from '../actions/postListActions'
import { fetchPost, deletePostById,
  editPost, onCreatePost, onCancelCreatePost,
  editingPost, voteUpPost, voteDownPost } from '../actions/postActions'
import { fetchComments } from '../actions/commentActions'

class PostView extends Component {

  componentDidMount() {
    const { history, match, fetchPost, fetchCategories, categories } = this.props
    fetchPost(match.params.postId).then(() => {
      if (categories.length === 0) {
        fetchCategories()
      }
    })
  }

  handleDeletePost(postId) {
    const { history, deletePost } = this.props
    deletePost(postId).then(() => {
      history.goBack()
    })
  }

  handleEditPost(post) {
    const { history, editPost, onCancelCreatePost } = this.props
    editPost(post).then(() => {
      onCancelCreatePost()
    })
  }

  render () {

    const { post, currentPost, deletePost, onEditingPost, categories,
      commentList, onCreatePost, onCancelCreatePost, newPostModalOpen } = this.props
      const currentItem = { ...post, ...currentPost }

    return (
      <div>
        Post Detail:
        <Post
          post={post}
          onDelete={this.handleDeletePost.bind(this)}
          onEdit={onCreatePost} />
        <CommentList
          commentList={commentList} />
        <NewPostModal
          modalType={"update"}
          isOpen={newPostModalOpen}
          categories={categories}
          currentPost={currentItem}
          closeModal={onCancelCreatePost}
          handleEditing={onEditingPost}
          submitPost={this.handleEditPost.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  return {
    post: state.post.post,
    currentPost: state.post.currentPost,
    categories: state.posts.categories,
    newPostModalOpen: state.post.newPostModalOpen,
    commentList: state.comment.comments,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (postId) => {
      return dispatch(fetchPost(postId)).then(() => {
        return dispatch(fetchComments(postId))
      })
    },
    deletePost: (postId) => dispatch(deletePostById(postId)),
    onEditingPost: (post) => dispatch(editingPost(post)),
    editPost: (post) => dispatch(editPost(post)),
    voteUpPost: (postId) => dispatch(voteUpPost(postId)),
    voteDownPost: (postId) => dispatch(voteDownPost(postId)),
    onCreatePost: () => dispatch(onCreatePost()),
    onCancelCreatePost: () => dispatch(onCancelCreatePost()),
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostView)
)
