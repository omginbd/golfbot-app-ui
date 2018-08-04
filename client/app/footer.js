import React from 'react'

const style = {
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '8px',
    justifyContent: 'space-around',
    marginBottom: '8px',
    width: '100%'
  },
  name: {
    fontSize: '10px',
    width: '138px'
  }
}

export default () => {
  return (
    <div style={style.wrapper}>
      <div style={style.row}>© 2018 Poulton Golfers' Association</div>
    </div>
  )
}
