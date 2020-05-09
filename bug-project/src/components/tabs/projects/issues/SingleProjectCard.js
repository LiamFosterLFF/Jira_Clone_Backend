import React from 'react'
import { Card, Button } from 'react-bootstrap'
import IssueModal from './IssueModal'

const SingleProjectCard = (props) => {

  const project = props.singleProjectData

  const handleCreateNewIssueClick = () => {
    props.setShowIssueModal(true)
    props.setIssueModalData({project: project._id})
    props.setIssueModalType('create')
  }

  if (!project) {
    return <div>loading</div>
  } else {
    return(
      <Card>
      <IssueModal
      show={props.showIssueModal}
      hide={props.setShowIssueModal}
      modalData={props.issueModalData}
      type={props.issueModalType}
      users={props.userData}
      />
      <Card.Title>{project.title}</Card.Title>
      <Card.Text>{project.type} Project</Card.Text>
      <Card.Text>{project.description}</Card.Text>
      <div className='button-row'>
      <Button onClick={() => handleCreateNewIssueClick()}>Create New Issue</Button>
      </div>
      </Card>
    )}
}

export default SingleProjectCard;
