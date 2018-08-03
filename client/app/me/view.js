import { map, range } from 'lodash'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'

import course from '../course'

const styles = {
  table: {
    tableLayout: 'fixed'
  },
  cell: {
    padding: '6px',
    width: '16px'
  },
  inputCell: {
    padding: '6px'
  }
}

const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 24px;
  height: 40px;
  justify-content: space-between;
`

const Title = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Subtitle = styled.div`
  font-size: 12px;
`

const Wrapper = styled.div`
  background-color: white;
  padding-top: 16px;
  padding-bottom: 8px;
`

const Saving = styled.div`
  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1000ms linear infinite;
  color: white;
  position: absolute;
  right: 1em;
  top: ${props => (props.show ? '1em' : '-100px')};
  transition: top 0.25s;
`

function view (props) {
  const {
    adminMode,
    calculateCurrentRound,
    classes,
    onNameChange,
    round,
    saving,
    user
  } = props
  return (
    <Wrapper>
      <Saving show={saving}>
        <Icon>autorenew</Icon>
      </Saving>
      <Header>
        <IconButton onClick={props.navigatePrevious} disabled={round === 0}>
          <Icon>navigate_before</Icon>
        </IconButton>
        <Title>
          {!adminMode && <div>{user.name}</div>}
          {adminMode && <TextField onChange={onNameChange} value={user.name} />}
          <Subtitle>Round {round + 1}</Subtitle>
          <Subtitle>{calculateCurrentRound()}</Subtitle>
        </Title>
        <IconButton onClick={props.navigateNext} disabled={round === 3}>
          <Icon>navigate_next</Icon>
        </IconButton>
      </Header>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Hole</TableCell>
            <TableCell className={classes.cell}>Dist</TableCell>
            <TableCell className={classes.cell}>Par</TableCell>
            <TableCell className={classes.cell}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(range(7), i => (
            <TableRow key={i}>
              <TableCell className={classes.cell}>{i % 7 + 1}</TableCell>
              <TableCell className={classes.cell}>150</TableCell>
              <TableCell className={classes.cell}>{course.holes[i]}</TableCell>
              <TableCell className={classes.inputCell}>
                <TextField
                  type='tel'
                  fullWidth
                  onChange={e => props.onChangeScore(e, i + 7 * round)}
                  value={user.scores[i + 7 * round] || ''}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  )
}

export default withStyles(styles)(view)
