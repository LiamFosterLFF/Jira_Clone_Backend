import React from 'react'
import { Card } from 'react-bootstrap'
import UsersHomeListGroup from './homeListGroups/UsersHomeListGroup'

const UsersHomeCard = (props) => {

  return(
    <Card>
      <Card.Title>All Users</Card.Title>
      <Card.Text>Users that are affiliated to you and the projects you have created</Card.Text>
      <Card.Text>List of Users</Card.Text>
      <UsersHomeListGroup {...props}/>
    </Card>
  )
};

export default UsersHomeCard;
