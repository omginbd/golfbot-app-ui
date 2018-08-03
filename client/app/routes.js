import All from './all'
import Home from './home'
import Me from './me'
import Rules from './rules'

export default [
  {
    path: '/',
    exact: true,
    title: 'Home',
    component: Home
  },
  {
    path: '/me/:id',
    title: 'My Scorecard',
    component: Me
  },
  {
    path: '/rules',
    title: 'Rules',
    component: Rules
  },
  {
    path: '/all',
    title: 'All Scores',
    component: All
  }
]
