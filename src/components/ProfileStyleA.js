import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../extentions/apollo'

class ProfileStyleA extends React.Component {
  componentDidMount() {
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
    `}).then(res => this.setState({ user: res.data.user }))
  }
  render() {
    return (<p>hello</p>)
  }
}

export default ProfileStyleA