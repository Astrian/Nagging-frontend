import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../../extentions/apollo'

class ProfileStyleA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.user = {
      avatar: ''
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
      <div className='profile'>
        <img className='avatar' alt='User avatar' src={this.state.user ? this.state.user.avatar : ''} />
      </div>  
    )
  }
}

export default ProfileStyleA