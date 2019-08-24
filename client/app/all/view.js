import cx from 'classnames'
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
    fontSize: '1em',
    fontWeight: 'bold',
    padding: '2px',
    width: '25px'
  },
  headerCell: {
    paddingLeft: '16px'
  },
  totalCell: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid black',
    display: 'table-cell',
    fontWeight: '900',
    height: '35px',
    textAlign: 'center'
  },
  endCell: {
    borderRight: '1px solid black'
  },
  nameCell: {
    fontWeight: 'bold',
    width: '125px'
  },
  overallCell: {
    textAlign: 'center',
    width: '52px'
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
    backgroundColor: '#a80000',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  eagle: {
    borderRadius: '50%',
    border: '4px solid #a80000',
    color: '#a80000',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  birdie: {
    border: '2px solid #a80000',
    borderRadius: '50%',
    color: '#a80000',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  par: {
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  bogie: {
    border: '2px solid black',
    color: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  doubleBogie: {
    border: '4px solid black',
    color: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  tripleBogie: {
    border: '6px solid black',
    color: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
  },
  extraBogie: {
    color: 'white',
    borderRadius: '50%',
    backgroundColor: 'black',
    display: 'block',
    height: '5px',
    lineHeight: '24px',
    paddingBottom: '20px',
    textAlign: 'center',
    width: '25px'
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
    getPlayerPlace,
    goToPlayerScorecard
  } = props
  const sorted = props.participants.sort(
    (a, b) => calculateOverall(a.scores).raw - calculateOverall(b.scores).raw
  )
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
                className={[classes.cell, classes.overallCell].join(' ')}
                style={{ textAlign: 'center' }}
              >
                Overall
              </TableCell>
              <TableCell
                className={[
                  classes.cell,
                  classes.overallCell,
                  classes.endCell
                ].join(' ')}
              >
                Total
              </TableCell>
              {map(range(4), i => (
                <th
                  colspan='7'
                  className={cx([classes.cell, classes.endCell])}
                  style={{
                    width: '300px',
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    color: 'rgba(0, 0, 0, 0.54)'
                  }}
                >
                  <div style={{ marginBottom: '8px', fontSize: '16px' }}>
                    Round {i + 1}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '96%'
                    }}
                  >
                    {map(range(7), j => (
                      <span style={{ width: '25px' }}>{j + 1}</span>
                    ))}
                  </div>
                </th>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {map(sorted, (p, i, allPlayers) => (
              <TableRow key={i}>
                {adminMode && (
                  <TableCell onClick={() => deletePlayer(p)}> X</TableCell>
                )}
                <TableCell
                  className={[classes.cell, classes.nameCell].join(' ')}
                  onClick={() => adminMode && goToPlayerScorecard(p)}
                >
                  {getPlayerPlace(i, allPlayers)} {getDisplayName(p.name)}
                </TableCell>
                {calculateOverall(p.scores).display}
                <td
                  className={classes.totalCell}
                  style={{ verticalAlign: 'middle' }}
                >
                  {sum(p.scores)}
                </td>
                {map(range(28), hole => {
                  const { first, second } = determineStyle(p.scores[hole], hole)
                  return (
                    <TableCell
                      className={cx(classes.cell, {
                        [classes.endCell]: (hole + 1) % 7 === 0
                      })}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default withStyles(styles)(view)
