import React from 'react'
import Post from './Post'

export default function PostList ({ history, list, onViewPost }) {

  return (
    <ul>
      {list.map(p => {
        return (<li key={p.id}>
          <Post post={p} commentList={[]} />
          <a onClick={(e) => {
            onViewPost(p.id)
            history.push(`/post/${p.id}`)
          }}>View Post</a>
        </li>)
      })}
    </ul>
  )
}
