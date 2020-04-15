import React from 'react'
import { Card, CardDeck, Button } from 'react-bootstrap'
import axios from 'axios'

const UsersCard = (props) => {

  const users = props.users

  const handleEditUserClick = (user) => {
    props.setShowUserModal(true)
    props.setUserModalData(user)
    props.setUserModalType('edit')
  }

  const handleDeleteUserClick = (user) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:3050/api/users/${user._id}`)
        .then(response => console.log(response))
    }
  }

  const usersCards = users.map(user => {
    const urlId = `SingleUser/${user._id}`
    return (
      <Card key={user._id}>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>Created By{}</Card.Text>
        <Card.Text>{user._id}</Card.Text>
        <div className='button-row'>
          <Button href={urlId}>View</Button>
          <Button onClick={() => handleEditUserClick(user)}>Edit</Button>
          <Button onClick={() => handleDeleteUserClick(user)}>Delete</Button>
        </div>
      </Card>
    )
  })

  return(
    <div>
      <h1>Users</h1>
      <CardDeck>
        {usersCards}
      </CardDeck>
    </div>
  )
}

export default UsersCard;
