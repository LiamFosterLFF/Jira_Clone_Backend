import React from 'react'
import { ListGroup } from 'react-bootstrap'

const SingleUserListGroup = ({issues}) => {

  let issueListGroupItems
  if (issues) {
    issueListGroupItems = issues.map(issue => {
      return (
        <ListGroup.Item key={issue._id}>
        <div><strong>{issue.summary}</strong></div>
        <div>{issue.description}</div>
        </ListGroup.Item>
      )
    })

  }

  return (
    <ListGroup variant='flush'>
      {issueListGroupItems}
    </ListGroup>
  )
}

export default SingleUserListGroup;
