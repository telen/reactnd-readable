import React, { Component } from 'react'
import moment from 'moment'

import { dateFormat } from '../utils'

export default class Comment extends Component {

  render() {
    const { comment, onDelete, onEdit, onVoteUp, onVoteDown  } = this.props
    return (
      <div key={comment.id}>
        <p>Comment by --{comment.author} at {moment(comment.timestamp).format(dateFormat)}</p>
        <p>{comment.body}</p>
        <span>voded {comment.voteScore}</span>
        <div>
          <button onClick={() => { onDelete(comment.id) }}>delete</button>
          <button onClick={() => { onEdit(comment) }}>edit</button>
        </div>
        <div>
          <button onClick={() => { onVoteUp(comment.id) }}>vote up</button>
          <button onClick={() => { onVoteDown(comment.id) }}>vote down</button>
        </div>
      </div>
    )
  }
}
