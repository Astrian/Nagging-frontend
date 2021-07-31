import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../extentions/apollo'

class NaggingList extends React.Component {
  render() {
    apollo.query({ query: gql`
      query naggings{
        naggings {
          list{
            uuid,
            content,
            time
          },
          next
        }
      }
    `}).then(res => this.setState({list: res.data}))
    return (<p>Hello</p>)
  }
}

export default NaggingList