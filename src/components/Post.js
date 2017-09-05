import React from 'react'
import moment from 'moment'
import CommentList from './CommentList'

import { dateFormat } from '../utils'

export default function Post ({ post, commentList }) {

  return (
    <div>
      <h3>{post.title}</h3>
      <h6>{post.author}</h6>
      <p>{moment(post.timestamp).format(dateFormat)}</p>
      <article>
        {post.body}
      </article>
      <span>Category: {post.category}</span>
      <p>Vode Score: {post.voteScore}</p>
      <h4>Comments:</h4>
      <CommentList commentList={commentList} />
    </div>
  )
}
