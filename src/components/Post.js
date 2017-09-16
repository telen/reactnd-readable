import React, { Component } from 'react'
import moment from 'moment'
import CommentList from './CommentList'

import { dateFormat } from '../utils'

export default class Post extends Component {

  render () {
    const { post, onDelete } = this.props
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
          <button>edit</button>
        </div>
      </div>
    )
  }
}
