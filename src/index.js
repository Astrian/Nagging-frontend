import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from 'react-bootstrap'
import ProfileStyleA from './components/ProfileStyleA'
import ProfileStyleB from './components/ProfileStyleB'
import NaggingList from './components/NaggingList'
import SingalNagging from './components/SingalNagging'
import Composebox from './components/Composebox'
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
import Preference from './components/Preference'
import Signup from './components/Signup'
import './index.scss'
import {Helmet} from "react-helmet"

if (typeof window !== "undefined") {
  injectStyle();
}

let frame = (<React.StrictMode>
  <ApolloProvider client={client}>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <Container>
      <Helmet>
        <meta property='og:site_name' content='Nagging' />
      </Helmet>
      <Router>
        <Switch>
          <Route path='/createaccount'> {/* Sign up */}
            <Helmet>
              <title>Create an account</title>
            </Helmet>
            <Signup />
          </Route>
          <Route path='/preference'>
            <Helmet>
              <title>Preference</title>
            </Helmet>
            <Preference />
          </Route> {/* Preference */}
          <Route path='/naggings/:uuid' exact> {/* Nagging Detail */}
            <Helmet>
              <title>Nagging Detail</title>
            </Helmet>
            <SingalNagging />
            <ProfileStyleB />
          </Route>
          <Route path='/Login'> {/* Login page */}
            <Helmet>
              <title>Login</title>
            </Helmet>
            <Login />
          </Route>
          <Route path='/' exact> {/* Homepage */}
            <Helmet>
              <title>Nagging</title>
            </Helmet>
            <ProfileStyleA />
            <Composebox />
            <NaggingList />
          </Route>
        </Switch>
        <Row className='justify-content-md-center'>
          <Col lg="6" className='footer'>
            Powered by <a href='https://github.com/Astrian/Nagging-backend'>Nagging project</a>.
          </Col>
        </Row>
      </Router>
  </Container>
  </ApolloProvider>
</React.StrictMode>)

ReactDOM.render(
  frame,
  document.getElementById('root')
)