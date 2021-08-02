import React, { useState } from 'react'
import { gql, useQuery } from "@apollo/client"
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const FETCH_NAGGINGS = gql`query naggings($pager: Int){
  naggings(pager: $pager) {
    list{
      uuid,
      content,
      time
    },
    next
  }
}`

function NaggingList() {
  const pager = useState(0)
  const next = useState(false)
  const naggings = useState([])
  const fetchNaggings = useQuery(FETCH_NAGGINGS, {variables: {pager: pager[0]},
    onCompleted: e => {
      naggings[1](naggings[0].concat(e.naggings.list))
      next[1](e.naggings.next)
    }})
  if (fetchNaggings.error) {
    toast(`Cannot fetch naggings: ${fetchNaggings.error.message}`)
  }
  const fetchMore = e => {
    pager[1](pager[0] + 1)
  }
  let naggingList = naggings[0].map((nagging) => {
    return (
      <div className='naggingCell' key={nagging.uuid}>
        <Link className='timestamp' to={`/naggings/${nagging.uuid}`}><Moment fromNow>{nagging.time}</Moment></Link>
        <div className='content'>{nagging.content}</div>
      </div>
    )
  })
  let nextCom = (<div></div>)
  if (!fetchNaggings.loading) {
    if (next[0]) {
      nextCom = (<div className='next'><span className='nextTrigger' onClick={fetchMore}>Click here to load more</span></div>)
    } else {
      nextCom = (<div className='next end'>That's all.</div>)
    }
  } else {
    nextCom = (<div className='next loading'>...</div>)
  }
  return (<>
    <Row className='justify-content-md-center'>
      <Col lg="6" className='list'>
        {naggingList}
        {nextCom}
      </Col>
    </Row>
  </>)
}

export default NaggingList