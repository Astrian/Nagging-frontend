import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client"
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import { toast } from "react-toastify"
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

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

const DELETE_NAGGING = gql`mutation deleteNagging($uuid: String!) {
  deleteNagging(uuid: $uuid)
}`

function SingalNagging() {
  const history = useHistory()
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
  const [deleteNaggingOps] = useMutation(DELETE_NAGGING, {
    onError: e => toast(`Cannot delete this nagging: ${e.message}`),
    onCompleted: e => {
      toast(`Nagging deleted.`)
      history.push("/")
    }
  })
  const [cookies] = useCookies(['session'])
  const deleteNagging = e => {
    if (window.confirm(`This operation will distroy the nagging.`)) {
      deleteNaggingOps({ variables: { uuid } })
    }
  }
  let deleteBtn = ''
  if (cookies.session) deleteBtn = (<span>&middot; <span className='deletebtn' onClick={deleteNagging}>Delete this nagging</span></span>)
  return (<Row className='justify-content-md-center'>
    <Col xl="6" className='singalNagging'>
      <p className='content'>{content[0]}</p>
      <div className='secondary'><Moment format='YYYY/MM/DD HH:mm'>{time[0]}</Moment> {deleteBtn}</div>
    </Col>
  </Row>)
}

export default SingalNagging