import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../extentions/apollo'

class NaggingList extends React.Component {
  componentDidMount() {
    // Fetch naggings list
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
    `}).then(res => this.setState({ list: res.data.naggings.list, listNext: res.data.naggings.next }))
  }
  render() {
    return (<p>Hello</p>)
  }
}

export default NaggingList