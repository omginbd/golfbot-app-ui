import lf from 'localforage'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import styled from 'styled-components'

import routes from './routes'
import Admin from './admin'
import Footer from './footer'

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  icon: {
    color: 'white'
  },
  title: {
    color: 'white'
  }
}

const ClearCacheButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 250px;
  z-index: 1000000;
`

function NavItems (props) {
  return (
    <List>
      {routes.map((route, index) => (
        <ListItem button key={index} onClick={props.closeDrawer}>
          <Link to={route.link || route.path}>
            <ListItemText primary={route.title} />
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4D8741' },
    secondary: { main: '#274488' }
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      drawerOpen: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer () {
    const { drawerOpen } = this.state
    this.setState({ drawerOpen: !drawerOpen })
  }

  clearSession () {
    lf.removeItem('2019-golfbot-user-id')
  }

  render () {
    const { classes } = this.props
    const { drawerOpen } = this.state
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Drawer open={drawerOpen} onClose={this.toggleDrawer}>
              <div className={classes.list}>
                <NavItems closeDrawer={this.toggleDrawer} />
              </div>
            </Drawer>
            {drawerOpen && (
              <ClearCacheButton onClick={this.clearSession}>
                Clear Session
              </ClearCacheButton>
            )}
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  onClick={this.toggleDrawer}
                >
                  <MenuIcon className={classes.icon} />
                </IconButton>
                <Typography className={classes.title} variant='title'>
                  Scorecard
                </Typography>
              </Toolbar>
            </AppBar>
            {routes.map((route, index) => (
              <Route
                component={route.component}
                exact={route.exact}
                key={index}
                path={route.path}
              />
            ))}
            <Route component={Admin} path='/admin/:id' />
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
