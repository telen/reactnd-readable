import React from 'react'
import Comment from './Comment'

export default function CommentList({ commentList }) {

  return (
    <div>
      <h4>Comments:</h4>
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
