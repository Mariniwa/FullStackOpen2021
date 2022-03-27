import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const [timer, setTimer] = useState(null)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.notification

  useEffect(() => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => props.clearNotification(), 5000)
    setTimer(newTimer)
  }, [props]) //eslint-disable-line

  if (notification===null){
    return null
  }
  else return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  clearNotification
}

const NotificationConnected = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default NotificationConnected