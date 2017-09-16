import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DigestPost from './DigestPost'

export default class PostList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    // onViewPost: PropTypes.func.isRequired,
  }

  render () {
    const { history, list, onViewPost } = this.props

    return (
      <ul>
        {list.map(p => {
          return (<li key={p.id}>
            <DigestPost
              history={history}
              post={p} />
          </li>)
        })}
      </ul>
    )
  }
}
