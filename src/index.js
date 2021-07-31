import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import ProfileStyleA from './components/ProfileStyleA'
import ProfileStyleB from './components/ProfileStyleB'
import NaggingList from './components/NaggingList'
import SingalNagging from './components/SingalNagging'
import { injectStyle } from "react-toastify/dist/inject-style"
import { ToastContainer } from "react-toastify"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

if (typeof window !== "undefined") {
  injectStyle();
}

let frame = (<React.StrictMode>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  <Container>
    <Router>
      <Switch>
        <Route path='/naggings/:uuid'>
          <SingalNagging />
          <ProfileStyleB />
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