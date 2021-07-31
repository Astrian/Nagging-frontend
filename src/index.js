import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import ProfileStyleA from './components/ProfileStyleA'
import NaggingList from './components/NaggingList'

let frame = (<React.StrictMode>
  <Container>
    <ProfileStyleA />
    <NaggingList />
 </Container>
</React.StrictMode>)

ReactDOM.render(
  frame,
  document.getElementById('root')
)