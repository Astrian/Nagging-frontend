import React from 'react'
import './index.scss'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {useCookies} from 'react-cookie'
import autosize from 'autosize'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { toast } from "react-toastify"

const POST = gql`mutation newNagging($content: String!){
  postNagging(content: $content) {
    uuid
  }
}`

function Composebox() {
  const [cookies] = useCookies(['session'])
  const text = React.useState(0)
  const focusOn = e => {
    autosize(e.target)
  }
  const history = useHistory()
  const [newNagging] = useMutation(POST, {
    onError: e => toast(`Cannot login: ${e.message}`),
    onCompleted: e => {
      toast(`Posted.`)
      history.go(0)
    }
  })
  const submitOn = async e => {
    e.preventDefault()
    await newNagging({ variables: { content: text[0] } })
    e.target.reset()
  }
  let postBtn = text[0] ? <Button type='submit'>Post</Button> : ''
  if (cookies.session) return (<>
    <Row className='justify-content-md-center'>
      <Col lg="6" className='Postbox'>
        <Form onSubmit={submitOn}>
          <Form.Group className="mb-3" controlId="postboxform">
            <Form.Label className="sr-only">Write a new nagging</Form.Label>
            <Form.Control as="textarea" rows={1} placeholder="Write a new nagging..." onFocus={focusOn} onChange={e => text[1](e.target.value)} />
            {postBtn}
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </>)
  else return ''
}

export default Composebox