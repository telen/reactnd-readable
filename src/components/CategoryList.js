import React from 'react'
import './App.css';


export default function CategoryList ({ categories }) {

  return (
    <div>
      <ul className="catList">
        {categories.map(cat => {
          return (<li key={cat.name}>
            <a>{cat.name}</a>
          </li>)
        })}
      </ul>
    </div>
  )
}
