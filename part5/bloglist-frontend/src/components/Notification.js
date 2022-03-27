import React, { useEffect, useState } from 'react'
import { clearNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(null)
  const successMessage = useSelector(({ notification }) => notification.good)
  const errorMessage = useSelector(({ notification }) => notification.bad)

  useEffect(() => {
    if (successMessage || errorMessage) {
      clearTimeout(timer)
      const newTimer = setTimeout(() => dispatch(clearNotification()), 5000)
      setTimer(newTimer)
    }
  }, [])

  if (errorMessage && !successMessage) {
    return <Alert severity="error">{errorMessage}</Alert>
  }
  if (successMessage && !errorMessage) {
    return <Alert severity='success'>{successMessage}</Alert>
  }
  else return null
}

export default Notification