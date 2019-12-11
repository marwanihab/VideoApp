import React from 'react'
import VideosList from '../Videos'
import MainPage from '../MainPage'
import SharePage from '../shareURL'


import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/videos" component={VideosList} />
          <Route exact path="/shareURL" component={SharePage} />


        </Switch>
    </BrowserRouter>
  )
}
