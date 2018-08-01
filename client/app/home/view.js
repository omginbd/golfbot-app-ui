import React from 'react'

export default function (props) {
  return (
    <div>
      <input type='text' onChange={props.onChange} value={props.name} />
      <button onClick={props.onSubmit}>Submit</button>
    </div>
  )
}
