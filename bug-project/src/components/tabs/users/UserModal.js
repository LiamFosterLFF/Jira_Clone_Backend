import React from 'react'
import { Modal } from 'react-bootstrap'
import UserModalForm from './UserModalForm'

const UserModal = (props) => {

  const handleCreateNewUserHide = () => {
    props.hide(false)
  }

  return (
    <Modal show={props.show} onHide={handleCreateNewUserHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {(props.data.username===undefined)? "Create a New User": "Edit User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserModalForm data={props.data} type={props.type}/>
      </Modal.Body>
    </Modal>
  )
}

export default UserModal;
