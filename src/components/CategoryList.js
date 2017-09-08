import React from 'react'
import './App.css';
import {
  Link
} from 'react-router-dom'

export default function CategoryList ({ categories }) {

  return (
    <div>
      <ul className="catList">
        {categories.map(cat => {
          return (<li key={cat.name}>
            <Link to={`/category/${cat.path}`}>{cat.name}</Link>
          </li>)
        })}
      </ul>
    </div>
  )
}
