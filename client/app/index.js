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

import routes from './routes'

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

function NavItems (props) {
  return (
    <List>
      {routes.map((route, index) => (
        <ListItem button key={index} onClick={props.closeDrawer}>
          <Link to={route.path}>
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
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
