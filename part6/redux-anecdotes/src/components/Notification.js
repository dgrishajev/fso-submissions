import React  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 5000)

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification
