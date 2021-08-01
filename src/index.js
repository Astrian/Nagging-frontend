import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import ProfileStyleA from './components/ProfileStyleA'
import ProfileStyleB from './components/ProfileStyleB'
import NaggingList from './components/NaggingList'
import SingalNagging from './components/SingalNagging'
import Postbox from './components/Postbox'
import Login from './components/Login'
import { injectStyle } from "react-toastify/dist/inject-style"
import { ToastContainer } from "react-toastify"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client'
import client from './extentions/apollo'

if (typeof window !== "undefined") {
  injectStyle();
}

let frame = (<React.StrictMode>
  <ApolloProvider client={client}>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <Container>
      <Router>
        <Switch>
          <Route path='/naggings/:uuid' exact>
            <SingalNagging />
            <ProfileStyleB />
          </Route>
          <Route path='/Login'>
            <Login />
          </Route>
          <Route path='/' exact> {/* Homepage */}
            <ProfileStyleA />
            <Postbox />
            <NaggingList />
          </Route>
        </Switch>
      </Router>
  </Container>
  </ApolloProvider>
</React.StrictMode>)

ReactDOM.render(
  frame,
  document.getElementById('root')
)