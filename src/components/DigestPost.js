import React from 'react'
import moment from 'moment'
import {
  Link
} from 'react-router-dom'

import { dateFormat } from '../utils'

export default function DigestPost ({ post }) {

  return (
    <div>
      <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
      <strong>{post.author}</strong>
      <p>{moment(post.timestamp).format(dateFormat)}</p>
      <article>
        {post.body}
      </article>
      <span>Category: {post.category}</span>
    </div>
  )
}
