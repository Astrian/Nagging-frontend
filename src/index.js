import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import ProfileStyleA from './components/ProfileStyleA'
import NaggingList from './components/NaggingList'
import SingalNagging from './components/SingalNagging'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

let frame = (<React.StrictMode>
  <Container>
    <Router>
      <Switch>
        <Route path='/naggings/:uuid'>
          <SingalNagging />
        </Route>
        <Route path='/'> {/* Homepage */}
          <ProfileStyleA />
          <NaggingList />
        </Route>
      </Switch>
    </Router>
 </Container>
</React.StrictMode>)

ReactDOM.render(
  frame,
  document.getElementById('root')
)