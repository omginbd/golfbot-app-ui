import React from 'react'

import Me from '../me'

export default class Admin extends React.Component {
  render () {
    const { match } = this.props
    return <Me admin id={match.params.id} />
  }
}
