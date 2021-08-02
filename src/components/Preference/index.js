import React, {useState, useEffect} from 'react'
import './index.scss'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const CHANGE_PASSWORD = gql`mutation changePassword($oriPwd: String!, $newPwd: String!){
  changePassword(oriPwd: $oriPwd, newPwd: $newPwd)
}`

const LOGOUT = gql`mutation logout{
  logout
}`
const LOGOUT_FROM_ANYHWHERE = gql`mutation logoutFromAnywhere{
  logoutFromAnywhere
}`

function Preference() {
  let history = useHistory()
  const session = window.sessionStorage.getItem('session')
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

  const [editProfile] = useMutation(EDIT_PROFILE, {
    onError: e => toast(`Cannot edit your profile: ${e.message}`),
    onCompleted: e => {
      toast(`Profile edited`)
    }
  })
  const [changePasswordOps] = useMutation(CHANGE_PASSWORD, {
    onError: e => toast(`Cannot change your password: ${e.message}`),
    onCompleted: e => {
      toast(`Password changed.`)
    }
  })
  const [logoutOps] = useMutation(LOGOUT, {
    onError: e => toast(`Cannot logout: ${e.message}`),
    onCompleted: e => {
      toast(`Logged out safely.`)
      window.sessionStorage.removeItem('session')
      history.push("/")
    }
  })
  const [logoutFromAnywhere] = useMutation(LOGOUT_FROM_ANYHWHERE, {
    onError: e => toast(`Cannot logout: ${e.message}`),
    onCompleted: e => {
      toast(`Logged out safely. If necessery, change your password asap.`)
      window.sessionStorage.removeItem('session')
      history.push("/")
    }
  })

  const submitProfile = e => {
    e.preventDefault()
    const variables ={
      username: e.target[0].value,
      fullname: e.target[1].value,
      bio: e.target[2].value,
    }
    editProfile({ variables })
  }
  const changePassword = e => {
    e.preventDefault()
    const variables ={
      oriPwd: e.target[0].value,
      newPwd: e.target[1].value
    }
    if (!variables.oriPwd || !variables.newPwd) return toast(`You must confirm your original password, and set a new password to continue.`)
    changePasswordOps({ variables })
  }
  const logout = e => {
    e.preventDefault()
    const isRevokeAll = e.target[0].checked
    if(isRevokeAll) logoutFromAnywhere()
    else logoutOps()
  }

  if (session) {
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
            <Form onSubmit={changePassword}>
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
            <p className='description'>Logout from this browser or all of your sessions.</p>
            <p>You can logout from this browser here. If you are using a sharing computer, please logout from here after complete your operation.</p>
            <p>If you are suspecting that someone has hacked into your account, please revoke all of your login sessions. Changing password is also recommanded.</p>
            <Form onSubmit={logout}>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Also revoke my all session." />
              </Form.Group>
              <Button type='submit'>Logout From this browser</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>)
  } else {
    history.push("/login")
    toast('You must login first.')
  }
}

export default Preference