import React, { Component } from 'react'
import moment from 'moment'
import {
  Link
} from 'react-router-dom'

import { dateFormat } from '../utils'

export default class DigestPost extends Component {

  render() {
    const { history, post } = this.props
    console.log(history.location.pathname)
    return (
      <div>
        <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
        <strong>{post.author}</strong>
        <p>{moment(post.timestamp).format(dateFormat)}</p>
        <article>
          {post.body}
        </article>
        <span>Category: {post.category}</span>
      </div>
    )
  }
}
