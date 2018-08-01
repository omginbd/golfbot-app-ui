import axios from 'axios'
import lf from 'localforage'
import React from 'react'

import View from './view'

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      name: ''
    }

    lf.getItem('2018-golfbot-user-id').then(userId => {
      if (!userId) {
        this.setState({ loading: false, userId: null })
      } else {
        this.setState({ loading: false, userId })
      }
    })

    // this.fetchUser = this.fetchUser.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (event) {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }

  onSubmit (event) {
    event.preventDefault()
    const { name } = this.state
    const { history } = this.props
    axios
      .post('http://localhost:3000/api/participants', { name })
      .then(({ data }) => {
        lf.setItem('2018-golfbot-user-id', data._id).then(() => {
          history.push('/me', { user: data })
        })
      })
  }

  render () {
    const { loading, name, userId } = this.state
    if (loading) return 'loading...'
    return (
      <View
        userId={userId}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        name={name}
      />
    )
  }
}
