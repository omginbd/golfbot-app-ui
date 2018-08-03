import axios from 'axios'
import lf from 'localforage'
import React from 'react'

import View from './view'

const ERR1 = 'Name cannot be blank'
const ERR2 = 'Please enter your first and last name'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      name: '',
      error: false
    }

    lf.getItem('2018-golfbot-user-id').then(userId => {
      if (!userId) {
        this.setState({ loading: false })
      } else {
        props.history.push('/me')
      }
    })

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

    // Validate Name
    if (!name) return this.setState({ error: ERR1 })
    if (name.split(' ').length !== 2) return this.setState({ error: ERR2 })

    axios
      .post(`${process.env.API_HOST}/api/participants`, { name })
      .then(({ data }) => {
        lf.setItem('2018-golfbot-user-id', data._id).then(() => {
          history.push('/me')
        })
      })
  }

  render () {
    const { error, loading, name, userId } = this.state
    if (loading) return 'loading...'
    return (
      <View
        error={error}
        userId={userId}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        name={name}
      />
    )
  }
}
