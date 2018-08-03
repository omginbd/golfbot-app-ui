import axios from 'axios'
import { map, range } from 'lodash'
import React from 'react'

import View from './view'
import course from '../course'

export default class All extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      participants: [],
      timer: null,
      adminMode: false
    }

    this.setupAdminMode()

    this.deletePlayer = this.deletePlayer.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.toggleAdminMode = this.toggleAdminMode.bind(this)
    this.fetchData()
  }

  componentWillUnmount () {
    const { timer } = this.state
    clearTimeout(timer)
  }

  setupAdminMode () {
    window.onkeydown = e => {
      if (e.keyCode === 49) this.toggleAdminMode()
    }
  }

  fetchData () {
    const timer = setTimeout(this.fetchData, 5000)
    axios.get(`${process.env.API_HOST}/api/participants`).then(({ data }) => {
      this.setState({ loading: false, participants: data, timer })
    })
  }

  toggleAdminMode () {
    this.setState({ adminMode: !this.state.adminMode })
  }

  getDisplayName (name) {
    return `${name.split(' ')[1]} ${name.split(' ')[0].slice(0, 1)}.`
  }

  calculateOverall (scores) {
    let score = 0
    map(range(7 * 4), i => {
      if (scores[i]) {
        score += +scores[i]
      } else {
        score += course.holes[i % 7]
      }
    })
    score -= course.par * 4
    return {
      raw: score,
      display:
        score < 0 ? <div style={{ color: 'red' }}>{score}</div> : `+${score}`
    }
  }

  deletePlayer (player) {
    axios
      .delete(`${process.env.API_HOST}/api/participants/${player._id}`)
      .then(this.fetchData)
  }

  determineStyle (score, hole) {
    const diff = parseInt(score) - parseInt(course.holes[hole % 7])
    if (score === 1) {
      return { second: 'ace', first: '' }
    }
    switch (diff) {
      case -2:
        return { second: 'eagle', first: '' }
      case -1:
        return { second: 'birdie', first: '' }
      case 0:
        return { second: 'par', first: '' }
      case 1:
        return { second: 'bogie', first: '' }
      case 2:
        return { second: 'doubleBogie', first: '' }
      case 3:
        return { second: 'doubleBogie', first: 'tripleBogie' }
      case 4:
      case 5:
      case 6:
        return { second: 'par', first: 'extraBogie' }
    }
    return { second: 'par', first: '' }
  }

  render () {
    const { adminMode, loading, participants } = this.state
    const { history } = this.props
    if (loading) return 'loading...'
    return (
      <View
        adminMode={adminMode}
        calculateOverall={this.calculateOverall}
        deletePlayer={this.deletePlayer}
        determineStyle={this.determineStyle}
        getDisplayName={this.getDisplayName}
        goToPlayerScorecard={p => history.push(`/admin/${p._id}`)}
        participants={participants}
      />
    )
  }
}
