import axios from 'axios'
import lf from 'localforage'
import { clamp, map, range } from 'lodash'
import React from 'react'

import View from './view'
import course from '../course'

export default class Me extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      adminMode: false,
      loading: true,
      saving: false,
      user: {},
      round: 0
    }

    if (!props.match.params.id) {
      lf
        .getItem('2018-golfbot-user-id')
        .then(userId => {
          return axios.get(`${process.env.API_HOST}/api/participants/${userId}`)
        })
        .then(({ data: user }) => {
          this.setState({ user, loading: false })
        })
        .catch(() => props.history.push('/home'))
    } else {
      axios
        .get(`${process.env.API_HOST}/api/participants/${props.match.params.id}`)
        .then(({ data: user }) => this.setState({ user, loading: false }))
    }

    this.setupAdminMode()

    this.calculateCurrentRound = this.calculateCurrentRound.bind(this)
    this.navigateNext = this.navigateNext.bind(this)
    this.navigatePrevious = this.navigatePrevious.bind(this)
    this.onChangeScore = this.onChangeScore.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.toggleAdminMode = this.toggleAdminMode.bind(this)
  }

  onChangeScore (e, hole) {
    e.preventDefault()
    const { user } = this.state
    user.scores[hole] = clamp(+e.target.value, 0, 9)
    axios
      .put(`${process.env.API_HOST}/api/participants/${user._id}`, user)
      .then(() => this.setState({ saving: false }))
    this.setState({ user, saving: true })
  }

  onNameChange (e) {
    e.preventDefault()
    const { user } = this.state
    user.name = e.target.value
    axios
      .put(`${process.env.API_HOST}/api/participants/${user._id}`, user)
      .then(() => this.setState({ saving: false }))
    this.setState({ user, saving: true })
  }

  setupAdminMode () {
    window.onkeydown = e => {
      if (e.keyCode === 49) this.toggleAdminMode()
    }
  }

  toggleAdminMode () {
    this.setState({ adminMode: !this.state.adminMode })
  }

  calculateCurrentRound () {
    const { user, round } = this.state
    let score = 0
    map(range(7), i => {
      i = i + 7 * round
      if (user.scores[i]) {
        score += +user.scores[i]
      } else {
        score += course.holes[i - 7 * round]
      }
    })
    score -= course.par
    return score < 0 ? `${score}` : `+${score}`
  }

  navigateNext () {
    const { round } = this.state
    this.setState({ round: clamp(round + 1, 0, 3) })
  }

  navigatePrevious () {
    const { round } = this.state
    this.setState({ round: clamp(round - 1, 0, 3) })
  }

  render () {
    const { adminMode, loading, round, saving, user } = this.state
    if (loading) return 'loading'
    return (
      <View
        adminMode={adminMode}
        calculateCurrentRound={this.calculateCurrentRound}
        navigateNext={this.navigateNext}
        navigatePrevious={this.navigatePrevious}
        onChangeScore={this.onChangeScore}
        onNameChange={this.onNameChange}
        round={round}
        user={user}
        saving={saving}
      />
    )
  }
}
