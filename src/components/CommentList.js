import React, { Component } from 'react'
import Comment from './Comment'

export default class CommentList extends Component {

  render() {
    const { commentList } = this.props

    return (
      <div>
        <h4>{commentList.length} comments:</h4>
        <ul>
          {commentList.map(comment => {
            return (
              <li key={comment.id}>
                <Comment comment={comment} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
