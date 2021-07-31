import React from 'react'
import { gql } from "@apollo/client"
import apollo from '../../extentions/apollo'
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

class NaggingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [], listNext: false, loading: true, pager: 0 }
  }
  componentDidMount() {
    this.fetchNaggings()
  }
  render() {
    let naggingList = this.state.list.map((nagging) => {
      return (
        <div className='naggingCell' key={nagging.uuid}>
          <Link className='timestamp' to={`/naggings/${nagging.uuid}`}><Moment fromNow>{nagging.time}</Moment></Link>
          <div className='content'>{nagging.content}</div>
        </div>
      )
    })
    let next = (<div></div>)
    if (!this.state.loading) {
      if (this.state.listNext) {
        next = (<div className='next'><span className='nextTrigger' onClick={this.fetchNaggings}>Click here to load more</span></div>)
      } else {
        next = (<div className='next end'>That's all.</div>)
      }
    } else {
      next = (<div className='next loading'>...</div>)
    }
    this.fetchNaggings = () => {
      this.setState({ loading: true })
      let list = this.state.list
      let pager = this.state.pager
      apollo.query({ query: gql`
      query naggings{
        naggings(pager: ${pager}){
          list{
            uuid,
            content,
            time
          },
          next
        }
      }
      `}).then(res => {
        this.setState({ list: list.concat(res.data.naggings.list), listNext: res.data.naggings.next, loading: false, pager: pager + 1 })
      }).catch(e => {
        this.setState({ loading: false })
        toast(`Error occured when fetching naggings: ${e.message}`) 
      })
    }
    return (<>
      <Row className='justify-content-md-center'>
        <Col lg="6" className='list'>
          {naggingList}
          {next}
        </Col>
      </Row>
    </>)
  }
}

export default NaggingList