import React from 'react'
import Comment from './Comment'

export default function CommentList({ commentList }) {

  return (
    <div>
      <h4>{commentList.length} comments:</h4>
      <ul>
        {commentList.map(comment => {
          return (
            <li>
              <Comment comment={comment} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
