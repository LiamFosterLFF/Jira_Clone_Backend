import React from 'react'
import { Card } from 'react-bootstrap'
import IssuesHomeListGroup from './homeListGroups/IssuesHomeListGroup'

const IssuesHomeCard = (props) => {

  return(
    <Card>
      <Card.Title>Welcome Back, USER</Card.Title>
      <Card.Text>Issues/Tasks</Card.Text>
      <Card.Text>Tasks Assigned to you</Card.Text>
      <IssuesHomeListGroup {...props}/>
    </Card>
  )
};

export default IssuesHomeCard;
