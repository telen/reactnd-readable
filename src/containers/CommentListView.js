/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Comment from '../components/Comment'

import CommentModal from '../components/CommentModal'

import { fetchComments, openCommentModal, closeCommentModal, onEditComment,
  editingComment, addComment, editComment, deleteComment, voteUpComment, voteDownComment } from '../actions/commentActions'


class CommentListView extends Component {
  componentDidMount() {
    const { parentId, fetchComments } = this.props
    fetchComments(parentId)
  }

  handleAddComment(comment) {
    const { addComment, closeCommentModal, fetchComments } = this.props
    addComment(comment).then(() => {
      closeCommentModal()
      fetchComments(comment.parentId)
    })
  }

  render() {
    console.log(this.props)
    const { parentId, isCommentModalOpen, commentModalType, commentList, currentComment } = this.props
    const { openCommentModal, closeCommentModal, onEditComment, onEditingComment,
      deleteComment, voteUpComment, voteDownComment } = this.props

    return (
      <div>
        <h4>{commentList.length} comments:</h4>
        <ul>
          {commentList.map(comment => {
            return (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  onDelete={deleteComment}
                  onEdit={onEditComment}
                  onVoteUp={voteUpComment}
                  onVoteDown={voteDownComment} />
              </li>
            )
          })}
        </ul>
        <div>
          <button onClick={() => { openCommentModal(parentId)}}>Add a new comment</button>
        </div>
        <CommentModal
          modalType={commentModalType}
          isOpen={isCommentModalOpen}
          parentId={parentId}
          currentComment={currentComment}
          closeModal={closeCommentModal}
          handleEditing={onEditingComment}
          submitComment={this.handleAddComment.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    commentList: state.comment.comments,
    isCommentModalOpen: state.comment.isModalOpen,
    commentModalType: state.comment.modalType,
    currentComment: state.comment.current,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    openCommentModal: (postId) => dispatch(openCommentModal(postId)),
    closeCommentModal: () => dispatch(closeCommentModal()),
    onEditingComment: (comment) => dispatch(editingComment(comment)),
    addComment: (comment) => dispatch(addComment(comment)),
    onEditComment: (comment) => dispatch(onEditComment(comment)),
    deleteComment: (commentId) => {
      return dispatch(deleteComment(commentId)).then(({ payload }) => {
        return dispatch(fetchComments(payload.comment.parentId))
      })
    },
    voteUpComment: (commentId) => {
      return dispatch(voteUpComment(commentId)).then(({ payload }) => {
        return dispatch(fetchComments(payload.comment.parentId))
      })
    },
    voteDownComment: (commentId) => {
      return dispatch(voteDownComment(commentId)).then(({ payload }) => {
        return dispatch(fetchComments(payload.comment.parentId))
      })
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentListView)
)
