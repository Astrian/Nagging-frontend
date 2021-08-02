import React from 'react'
import './index.scss'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const SIGNUP = gql`mutation createUser($username: String!, $password: String!, $email: String!, $bio: String) {
  createUser(username: $username, password: $password, email: $email, bio: $bio)
}`

function Signup() {
  let history = useHistory()
  const [signupops] = useMutation(SIGNUP, {
    onError: e => toast(`Cannot create account: ${e.message}`),
    onCompleted: e => {
      toast(`🎉 Great! Your account is created. Let's try login!`)
      history.push("/")
    }
  })
  const submitForm = e => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    const email = e.target[2].value
    const bio = e.target[3].value
    if (!username || !password || !email) return toast('You need to fill username, password and bio.')
    signupops({ variables: { username, password, email, bio } })
  }

  return (<>
    <Row className='justify-content-md-center signup'>
      <Col lg="4" className='signupbox'>
        <p className='head'>Create Account</p>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="signupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="JohnAppleseed" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="johnappleseed@mailservice.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="23 yo designer in San Fransokyo." />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Col>
    </Row>
  </>)
}

export default Signup