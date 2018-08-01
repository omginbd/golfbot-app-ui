import All from './all'
import Home from './home'
import Me from './me'

export default [
  {
    path: '/',
    exact: true,
    title: 'Home',
    component: Home
  },
  {
    path: '/me',
    title: 'My Scorecard',
    component: Me
  },
  {
    path: '/all',
    title: 'All Scores',
    component: All
  }
]
