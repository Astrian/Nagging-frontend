import React from 'react'
import './index.scss'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const LOGIN = gql`mutation login($username: String!, $password: String!){
  login(username: $username, password: $password) {
    key,
    uuid
  }
}`

function Login() {
  let history = useHistory()
  const [login] = useMutation(LOGIN, {
    onError: e => toast(`Cannot login: ${e.message}`),
    onCompleted: e => {
      toast(`Logged in.`)
      window.localStorage.setItem("session", `${e.login.uuid}, ${e.login.key}`)
      history.push("/")
    }
  })
  const submitForm = e => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    if (!username || !password) return toast('You need to fill both username and password.')
    login({ variables: { username, password } })
  }

  return (<>
    <Row className='justify-content-md-center login'>
      <Col lg="4" className='loginbox'>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="loginFormUsername">
            <Form.Label className='sr-only'>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginFormPassword">
            <Form.Label className='sr-only'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  </>)
}

export default Login