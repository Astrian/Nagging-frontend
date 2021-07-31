import React from 'react'
import { withRouter } from "react-router-dom";
import apollo from '../../extentions/apollo'
import { gql } from "@apollo/client"
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import './index.scss'
import { toast } from "react-toastify"

class SingalNagging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: 'Loading this nagging...',
      time: Date.parse(new Date()),
      uuid: this.props.match.params.uuid
    }
  }
  componentDidMount() {
    apollo.query({ query: gql`
    query singalNagging {
      signalNagging(uuid: "${this.props.match.params.uuid}") {
        uuid,
        content,
        time
      }
    }
    ` }).then(res => this.setState({uuid: res.data.signalNagging.uuid, content: res.data.signalNagging.content, time: res.data.signalNagging.time }))
    .catch(e => toast(`Error occured when fetching nagging: ${e.message}`))
  }
  render() {
    return (<Row className='justify-content-md-center'>
      <Col xl="6" className='singalNagging'>
        <p className='content'>{this.state.content}</p>
        <Moment format='YYYY/MM/DD HH:mm'>{this.state.time}</Moment>
      </Col>
    </Row>)
  }
}

export default withRouter(SingalNagging)