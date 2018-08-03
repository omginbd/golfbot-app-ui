import { map, range, sum } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

const styles = {
  cell: {
    padding: '6px',
    width: '20px'
  },
  headerCell: {
    paddingLeft: '16px'
  },
  endCell: {
    borderRight: '1px solid black'
  },
  nameCell: {
    width: '75px'
  },
  overallCell: {
    width: '36px'
  },
  table: {
    tableLayout: 'fixed'
  },
  tableRow: {
    height: '20px'
  },
  wrapper: {
    backgroundColor: 'white',
    overflowY: 'scroll',
    margin: '8px'
  },
  ace: {
    color: 'white',
    borderRadius: '50%',
    backgroundColor: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  eagle: {
    borderRadius: '50%',
    border: '4px double red',
    color: 'red',
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  birdie: {
    border: '2px solid red',
    borderRadius: '50%',
    color: 'red',
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  par: {
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  bogie: {
    border: '2px solid black',
    color: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  doubleBogie: {
    border: '4px double black',
    color: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  tripleBogie: {
    border: '1px solid black',
    color: 'black',
    display: 'block',
    padding: '1px',
    width: '33px'
  },
  extraBogie: {
    color: 'black'
  }
}

function view (props) {
  const {
    adminMode,
    calculateOverall,
    classes,
    deletePlayer,
    determineStyle,
    getDisplayName,
    goToPlayerScorecard
  } = props
  return (
    <div className={classes.wrapper}>
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              {adminMode && <TableCell>X</TableCell>}
              <TableCell className={[classes.cell, classes.nameCell].join(' ')}>
                Name
              </TableCell>
              <TableCell
                className={[
                  classes.cell,
                  classes.overallCell,
                  classes.endCell
                ].join(' ')}
              >
                Overall
              </TableCell>
              {map(range(28), i => (
                <TableCell
                  className={[
                    classes.cell,
                    classes.headerCell,
                    i % 7 + 1 === 7 ? classes.endCell : ''
                  ].join(' ')}
                  key={i}
                >
                  {i % 7 + 1}
                </TableCell>
              ))}
              <TableCell className={classes.cell}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(props.participants, (p, i) => (
              <TableRow key={i}>
                {adminMode && (
                  <TableCell onClick={() => deletePlayer(p)}> X</TableCell>
                )}
                <TableCell
                  className={[classes.cell, classes.nameCell].join(' ')}
                  onClick={() => adminMode && goToPlayerScorecard(p)}
                >
                  {getDisplayName(p.name)}
                </TableCell>
                <TableCell
                  className={[
                    classes.cell,
                    classes.overallCell,
                    classes.endCell
                  ].join(' ')}
                >
                  {calculateOverall(p.scores).display}
                </TableCell>
                {map(range(28), hole => {
                  const { first, second } = determineStyle(p.scores[hole], hole)
                  return (
                    <TableCell
                      className={[
                        classes.cell,
                        hole % 7 + 1 === 7 ? classes.endCell : ''
                      ].join(' ')}
                      key={hole}
                    >
                      <span className={classes[first] || ''}>
                        <span className={classes[second] || ''}>
                          {p.scores[hole] || ''}
                        </span>
                      </span>
                    </TableCell>
                  )
                })}
                <TableCell className={classes.cell}>{sum(p.scores)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default withStyles(styles)(view)
