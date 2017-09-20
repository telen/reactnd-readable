import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Post from '../components/Post'
import CommentList from '../components/CommentList'

import history from '../utils/history'

import { fetchPost, deletePostById,
  editPost, voteUpPost, voteDownPost } from '../actions/postActions'
import { fetchComments } from '../actions/commentActions'

class PostView extends Component {

  componentDidMount() {
    const { history, match, fetchPost } = this.props
    fetchPost(match.params.postId)
  }

  render () {
    const { post, deletePost, commentList } = this.props
    return (
      <div>
        Post Detail:
        <Post
          post={post}
          onDelete={deletePost} />
        <CommentList
          commentList={commentList} />
      </div>
    )
  }
}

function mapStateToProps({ post, comment }) {
  return {
    post: post.post,
    commentList: comment.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (postId) => {
      return dispatch(fetchPost(postId)).then(() => {
        return dispatch(fetchComments(postId))
      })
    },
    deletePost: (postId) => {
      return dispatch(deletePostById(postId)).then(() => {
        history.goBack()
      })
    },
    voteUpPost: (postId) => dispatch(voteUpPost(postId)),
    voteDownPost: (postId) => dispatch(voteDownPost(postId)),

    fetchComments: (postId) => dispatch(fetchComments(postId)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostView)
)
