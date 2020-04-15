import React from 'react'
import { Modal } from 'react-bootstrap'
import ProjectModalForm from './ProjectModalForm'

const ProjectModal = (props) => {

  const handleCreateNewProjectHide = () => {
    props.hide(false)
  }

  return (
    <Modal show={props.show} onHide={handleCreateNewProjectHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {(props.data.title===undefined)? "Create a New Project": "Edit Project"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectModalForm data={props.data} type={props.type}/>
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModal;
