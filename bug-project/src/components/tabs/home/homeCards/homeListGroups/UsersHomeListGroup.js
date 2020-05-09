import React from 'react'
import { ListGroup } from 'react-bootstrap'

const UserHomeListGroup = ({users}) => {

  const userListGroupItems = users.map(user => {
    return (
      <ListGroup.Item key={user._id}>
        <div><strong>{user.username}</strong></div>
        <div>{user._id}</div>
      </ListGroup.Item>
    )
  })

  return (
    <ListGroup variant='flush'>
      {userListGroupItems}
    </ListGroup>
  )
}

export default UserHomeListGroup;
