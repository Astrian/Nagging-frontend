import React, {useState, useEffect} from 'react'
import './index.scss'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { gql, useMutation, useQuery } from '@apollo/client'

const EDIT_PROFILE = gql`mutation editProfile($username: String, $fullname: String, $bio: String){
  editProfile(username: $username, fullname: $fullname, bio: $bio)
}`

const GET_PROFILE = gql`query user {
  user {
    uuid,
    username,
    fullname,
    bio,
    avatar,
    naggingCount
  }
}`

function Preference() {
  let history = useHistory()
  const [cookies] = useCookies(['session'])
  let profileQuery = useQuery(GET_PROFILE)
  const profile = useState({
    username: '',
    fullname: '',
    bio: ''
  })

  useEffect(e => {
    if (profileQuery.data) {
      let res = profileQuery.data.user
      profile[1](res)
    }
  })

  const submitProfile = e => {
    e.preventDefault()
  }

  if (cookies.session) {
    return (<>
      <Row className='justify-content-md-center preference'>
        <Col lg="6">
          <p className='head'>Preference</p>
          <div className='section'> {/* Profile update */}
            <p className='title'>Update your profile</p>
            <p className='description'>Change your profile in this website.</p>
            <Form onSubmit={submitProfile}>
              <Form.Group className="mb-3" controlId="profileUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="JohnAppleseed" defaultValue={profile[0].username}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="profileFullname">
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="text" placeholder="John Appleseed" defaultValue={profile[0].fullname} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="profileBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Introduce your self here. For example: “23 yo designer in San Fransokyo.”" defaultValue={profile[0].bio} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>

          <div className='section'> { /* Change password */}
            <p className='title'>Change password</p>
            <p className='description'>Keep your account safe by change your password frequently.</p>
            <Form onSubmit={e => {}}>
              <Form.Group className="mb-3" controlId="passwordOld">
                <Form.Label>Original password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="passwordNew">
                <Form.Label>New password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Change password
              </Button>
            </Form>
          </div>
          
          <div className='section'> { /* Logout */}
            <p className='title'>Session management</p>
            <p className='description'>Logout from this browser or all of your session.</p>
            <p>You can logout from this browser here. If you are using a sharing computer, please logout from here after completed your operation.</p>
            <Button>Logout From this browser</Button>
            <p>If you are suspecting that someone has hacked into your account, please revoke all of your login session. Re-login is required in this browser after revoke.</p>
            <Button>Revoke all session, and logout from this browser</Button>
          </div>
        </Col>
      </Row>
    </>)
  } else {
    history.go('/login')
    toast('You must login first.')
  }
}

export default Preference