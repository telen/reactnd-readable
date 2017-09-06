import React from 'react'
import Post from './Post'

export default function PostList ({ list }) {

  return (
    <ul>
      {list.map(p => {
        return (<li key={p.id}>
          <Post post={p} commentList={[]} />
        </li>)
      })}
    </ul>
  )
}
