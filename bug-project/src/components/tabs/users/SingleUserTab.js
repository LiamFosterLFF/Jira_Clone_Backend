import React from 'react'
import { Card } from 'react-bootstrap'
import SingleUserListGroup from "./SingleUserListGroup"

// Data comes from Routes, button clicked from UsersCard
const SingleUserTab = (props) => {
  const user = props.singleUserData
  const issues = props.issueData

  if(!user) return null

  return(
    <div>
      <h1>Single User View</h1>
      <Card>
        <Card.Body>
          <Card.Title>Full Name: {user.username}</Card.Title>
          <Card.Text>Admin: {(user.admin)? "true": "false"}</Card.Text>
          <Card>
            <Card.Title>Current Issues</Card.Title>
            <Card.Text>User Issues that are currently in progress</Card.Text>
            <SingleUserListGroup issues={issues}/>
          </Card>
        </Card.Body>
      </Card>
    </div>
  )

}

export default SingleUserTab;
