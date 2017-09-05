import React from 'react'
import Comment from './Comment'

export default function CommentList({ commentList }) {

  return (
    <ul>
      {commentList.map(comment => {
        return (
          <li>
            <Comment comment={comment} />
          </li>
        )
      })}
    </ul>
  )
}
