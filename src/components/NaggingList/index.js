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
  const loading = useState(true)
  const next = useState(false)
  const naggings = useState([])
  const fetchNaggings = useQuery(FETCH_NAGGINGS, {variables: {pager: pager[0]},
    onCompleted: e => {
      naggings[1](naggings[0].concat(e.naggings.list))
      loading[1](false)
      next[1](e.naggings.next)
    }, onError: e => {
      toast(`Cannot fetch naggings: ${e.message}`)
    }})
  const fetchMore = e => {
    loading[1](true)
    pager[1](pager[0] + 1)
    fetchNaggings.fetchMore({ variables: {pager: pager[0]} }).catch(e => {
      toast(`Cannot fetch naggings: ${e.message}`)
      loading[1](false)
    })
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
  if (!loading[0]) {
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