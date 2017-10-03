import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { dateFormat } from '../utils'

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
  }

  render () {
    const { history, post, onDelete, onEdit, onVoteUp, onVoteDown } = this.props
    console.log(history.location.pathname)
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

      </div>
    )
  }
}
