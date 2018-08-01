import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = {
  rulesWrapper: {
    padding: '12px',
    textAlign: 'left'
  }
}

function Rules ({ classes }) {
  return (
    <Paper style={{ margin: '12px' }}>
      <Card>
        <CardContent>
          <div className={classes.rulesWrapper}>
            <ol>
              <li>No Cheating!</li>
              <li>Must tee off at or behind tennis balls. Not in front.</li>
              <li>Any broken ball can be replaced at any time.</li>
              <li>Anything beyond metal border is Out of Bounds.</li>
              <li>Any ball hit Out of Bounds is a 1 stroke penalty.</li>
              <li>
                Any ball hit Out of Bounds must be dropped no nearer to hole.
              </li>
              <li>
                Ball must be dropped one foot from where it went Out of Bounds.
              </li>
              <li>
                If swing is restricted by plants (not trees) or metal border you
                are allowed to place the ball a foot away no nearer to the hole.
              </li>
              <li>
                Wiffle Ball must touch the plate in order to be counted as "in
                the hole".
              </li>
              <li>Max score per hole is 9. </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default withStyles(styles)(Rules)
