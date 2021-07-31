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
      bio: ``,
      naggingCount: 0
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
          avatar,
          naggingCount
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
          <p className='primary'>{this.state.user.fullname}</p>
          <p className='secondary'>{this.state.user.bio || `Yet another new Nagging space.`}</p>
          <p className='secondary'>{this.state.user.naggingCount} naggings</p>
        </Col>
      </Row>  
    )
  }
}

export default ProfileStyleA