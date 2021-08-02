import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import './index.scss'
import { toast } from "react-toastify"

const FETCH_USER = gql`query user {
  user {
    uuid,
    username,
    fullname,
    bio,
    avatar,
    naggingCount
  }
}`

function ProfileStyleB() {
  const user = useState({
    avatar: `${process.env.PUBLIC_URL}/defaultavatar.jpg`,
    fullname: `John Appleseed`,
    username: `Username`,
    bio: ``,
    naggingCount: 0
  })
  useQuery(FETCH_USER, {
    onCompleted: e => {
      user[1](e.user)
    }, onError: e => {
      toast(`Cannot fetch user profile: ${e.message}`)
    }})
  return (
    <Row className='justify-content-md-center'>
      <Col lg="6" className='profileStyleB'>
        <img className='avatar' alt='User avatar' src={user[0].avatar} />
        <p className='authorTag'>Author</p>
        <p className='primary'>{user[0].fullname}</p>
        <p className='secondary'>{user[0].bio || `Yet another new Nagging space.`}<br /><Link to='/'>Checkout all naggings</Link></p>
      </Col>
    </Row>  
  )
}

export default ProfileStyleB