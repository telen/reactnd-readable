import React, { Component } from 'react'
import moment from 'moment'

import { dateFormat } from '../utils'

export default class Comment extends Component {

  render() {
    const { comment } = this.props
    return (
      <div key={comment.id}>
        <p>Comment by --{comment.author} at {moment(comment.timestamp).format(dateFormat)}</p>
        <p>{comment.body}</p>
        <span>voded {comment.voteScore}</span>
      </div>
    )
  }
}
