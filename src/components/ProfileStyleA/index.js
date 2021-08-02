import React, { useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import { gql, useQuery } from "@apollo/client"
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

function ProfileStyleA() {
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
      <Col lg="4" className='profile'>
        <img className='avatar' alt='User avatar' src={user[0].avatar} />
        <p className='primary'>{user[0].fullname}</p>
        <p className='secondary'>{user[0].bio || `Yet another new Nagging space.`}</p>
        <p className='secondary'>{user[0].naggingCount ? user[0].naggingCount : 'Loading'} naggings</p>
      </Col>
    </Row>  
  )
}

export default ProfileStyleA