import React from 'react'

import { Switch, Route } from 'react-router-dom'
import App from './App'
import CategoryView from './CategoryView'
import PostView from './PostView'

const Root = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/:category" component={CategoryView} />
      <Route path="/:category/:postId" component={PostView} />
    </Switch>
  </div>
)

export default Root
