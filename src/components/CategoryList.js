import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

export default class CategoryList extends Component {

  render () {
    const { categories } = this.props
    return (
      <div>
        <ul className="catList">
          {categories.map(cat => {
            return (<li key={cat.name}>
              <Link to={`/${cat.path}`}>{cat.name}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
  }
}
