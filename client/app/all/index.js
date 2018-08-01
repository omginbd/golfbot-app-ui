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
      participants: []
    }

    axios.get('http://localhost:3000/api/participants').then(({ data }) => {
      this.setState({ loading: false, participants: data })
    })
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
    const { loading, participants } = this.state
    if (loading) return 'loading...'
    return (
      <View
        participants={participants}
        getDisplayName={this.getDisplayName}
        calculateOverall={this.calculateOverall}
        determineStyle={this.determineStyle}
      />
    )
  }
}
