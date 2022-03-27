import React, { useState, useImperativeHandle } from 'react'
import {
  Button
} from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showVisibility = { display: visible ? '' : 'none' }
  const hideVisibility = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideVisibility}>
        <Button variant='contained' color='primary' id='showFormButton' onClick={toggleVisibility}>create a new blog</Button>
      </div>
      <div style={showVisibility}>
        {props.children}
        <br></br>
        <Button variant='contained' color='primary' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable