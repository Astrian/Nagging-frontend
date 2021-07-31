import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../../extentions/apollo'
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class NaggingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [], listNext: false, loading: true }
  }
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
    `}).then(res => this.setState({ list: res.data.naggings.list, listNext: res.data.naggings.next, loading: false }))
  }
  render() {
    let naggingList = this.state.list.map((nagging) => {
      return (
        <div className='naggingCell'>
          <Link className='timestamp' to={`/naggings/${nagging.uuid}`}><Moment fromNow>{nagging.time}</Moment></Link>
          <div className='content'>{nagging.content}</div>
        </div>
      )
    })
    let next = (<div></div>)
    if (!this.state.loading) {
      if (this.state.listNext) {
        next = (<div className='next'>Load more</div>)
      } else {
        next = (<div className='next end'>That's all naggings.</div>)
      }
    } else {
      next = (<div className='next'>...</div>)
    }
    return (
      <Router>
        <Row className='justify-content-md-center'>
          <Col lg="6" className='list'>
            {naggingList}
            {next}
          </Col>
        </Row>  
      </Router> 
    )
  }
}

export default NaggingList