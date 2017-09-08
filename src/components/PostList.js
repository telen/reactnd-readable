import React from 'react'
import DigestPost from './DigestPost'

export default function PostList ({ history, list, onViewPost }) {

  return (
    <ul>
      {list.map(p => {
        return (<li key={p.id}>
          <DigestPost
            history={history}
            onViewPost={onViewPost}
            post={p} />
        </li>)
      })}
    </ul>
  )
}
