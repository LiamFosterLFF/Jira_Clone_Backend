import React from 'react'
import { ListGroup } from 'react-bootstrap'

const IssueHomeListGroup = ({issues}) => {

  const issueListGroupItems = issues.map(issue => {
    return (
      <ListGroup.Item key={issue._id}>
        <div><strong>{issue.summary}</strong></div>
        <div>{issue.description}</div>
      </ListGroup.Item>
    )
  })

  return (
    <ListGroup variant='flush'>
      {issueListGroupItems}
    </ListGroup>
  )
}

export default IssueHomeListGroup;
