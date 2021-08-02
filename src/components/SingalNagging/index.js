import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client"
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import { toast } from "react-toastify"

const FETCH_NAGGING = gql`query singalNagging($uuid: String!) {
  signalNagging(uuid: $uuid) {
    uuid,
    content,
    time,
    author {
      uuid,
      fullname
    }
  }
}`

function SingalNagging() {
  const content = useState('Loading this nagging...')
  const time = useState(Date.parse(new Date()))
  let uuid = useParams().uuid
  useQuery(FETCH_NAGGING, {
    variables: {
      uuid
    },
    onCompleted: e => {
      content[1](e.signalNagging.content)
      time[1](e.signalNagging.time)
    },
    onError: e => {
      toast(`Cannot fetch the nagging: ${e.message}`)
    }
  })
  return (<Row className='justify-content-md-center'>
    <Col xl="6" className='singalNagging'>
      <p className='content'>{content[0]}</p>
      <Moment format='YYYY/MM/DD HH:mm'>{time[0]}</Moment>
    </Col>
  </Row>)
}

export default SingalNagging