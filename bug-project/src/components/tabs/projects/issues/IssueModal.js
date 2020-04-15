import React from 'react'
import { Modal } from 'react-bootstrap'
import IssueModalForm from './IssueModalForm'

// Parent Located in SingleProjectCard
const IssueModal = (props) => {

  const handleCreateNewIssueHide = () => {
    props.hide(false)
  }

  return (
    <Modal show={props.show} onHide={handleCreateNewIssueHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {(props.modalData.summary===undefined)? "Create a New Issue": "Edit Issue"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IssueModalForm users={props.users} modalData={props.modalData} type={props.type}/>
      </Modal.Body>
    </Modal>
  )
}

export default IssueModal;
