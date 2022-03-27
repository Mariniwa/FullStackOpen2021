import React from "react"

const Notification = ({ goodMessage, badMessage }) => {

  if (!badMessage && goodMessage)
  return (
    <div className="success">
      {goodMessage}
    </div>
  )
  else if (!goodMessage && badMessage)
  return (
    <div className="error">
      {badMessage}
    </div>
  )
  else return null
}

export default Notification