import React from 'react'
import { withRouter } from "react-router-dom";

class SingalNagging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: this.props.match.params.uuid,
      nagging: {
        content: 'This is a nagging.',
        time: Date.parse(new Date()),
        uuid: this.props.match.params.uuid
      }
    }
  }
  componentDidMount() {
    console.log(this.props.match.params)
  }
  render() {
    return (<p>The uuid is: {this.state.uuid}</p>)
  }
}

export default withRouter(SingalNagging)