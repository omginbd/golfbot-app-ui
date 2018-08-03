import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = {
  submitButton: {
    marginTop: '16px'
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '16px auto',
    maxWidth: '768px',
    padding: '8px'
  }
}

function View (props) {
  const { classes } = props
  return (
    <Paper className={classes.wrapper}>
      <Typography variant='title'>
        Please enter your first and last name:
      </Typography>
      <TextField
        error={props.error}
        label={props.error}
        placeholder='Rory Mcllroy'
        onChange={props.onChange}
        value={props.name}
      />
      <Button
        className={classes.submitButton}
        variant='contained'
        color='secondary'
        onClick={props.onSubmit}
      >
        Submit
      </Button>
    </Paper>
  )
}

export default withStyles(styles)(View)
