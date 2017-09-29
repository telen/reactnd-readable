import React, { Component } from 'react'
import moment from 'moment'
import CommentList from './CommentList'

import { dateFormat } from '../utils'

export default class Post extends Component {

  render () {
    const { post, onDelete, onEdit, onVoteUp, onVoteDown, onCreateComment } = this.props
    return (
      <div>
        <h3>{post.title}</h3>
        <strong>{post.author}</strong>
        <p>{moment(post.timestamp).format(dateFormat)}</p>
        <article>
          {post.body}
        </article>
        <span>Category: {post.category} </span>
        <p>Vode Score: {post.voteScore}</p>
        <div>
          <button onClick={() => { onDelete(post.id) }}>delete</button>
          <button onClick={() => { onEdit(post) }}>edit</button>
        </div>
        <div>
          <button onClick={() => { onVoteUp(post.id) }}>vote up</button>
          <button onClick={() => { onVoteDown(post.id) }}>vote down</button>
        </div>
        <div>
          <button onClick={() => { onCreateComment(post.id)}}>Add a new comment</button>
        </div>
      </div>
    )
  }
}
