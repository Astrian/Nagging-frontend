import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { gql } from "@apollo/client"
import apollo from '../../extentions/apollo'
import './index.scss'

class ProfileStyleA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.user = {
      avatar: `${process.env.PUBLIC_URL}/defaultavatar.jpg`,
      fullname: `John Appleseed`,
      username: `Username`,
      bio: ``
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
    // Fetch naggings list
    apollo.query({ query: gql`
      query user {
        user {
          uuid,
          username,
          fullname,
          bio,
          avatar
        }
      }
    `}).then(res => this.setState({user: res.data.user}))
  }
  render() {
    console.log(this.state.user.avatar)
    return (
      <Row className='justify-content-md-center'>
        <Col lg="4" className='profile'>
          <img className='avatar' alt='User avatar' src={this.state.user.avatar} />
          <p className='fullname'>{this.state.user.fullname}</p>
          <p className='bio'>{this.state.user.bio || `Yet another new Nagging space.`}</p>
        </Col>
      </Row>  
    )
  }
}

export default ProfileStyleA