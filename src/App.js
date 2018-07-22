import React from 'react'
import { Container } from '../node_modules/semantic-ui-react'
import MessageBuilder from './MessageBuilder'

const App = () => (
  <Container text style={{ padding: '2rem' }}>
    <h1>Conventional Commit Message Builder</h1>
    <p>
      This tool helps you build a good commit message for your Pull Requests
      that provides meaningful message. You can read more about the{' '}
      <a href="https://conventionalcommits.org/">
        Conventional Commits standard here
      </a>. Simply fill out the fields and copy the information over to your PR.
    </p>
    <MessageBuilder />
  </Container>
)

export default App
