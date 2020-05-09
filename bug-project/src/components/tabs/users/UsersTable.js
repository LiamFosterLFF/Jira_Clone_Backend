import React from 'react'
import { Table, Button } from 'react-bootstrap'

import UserModal from './UserModal'

const UsersTable = (props) => {


  const handleCreateNewUserClick = () => {
    props.setShowUserModal(true)
    props.setUserModalData({})
    props.setUserModalType('create')
  }

  const users = props.users

  const userEntries = users.map(user => {
    return(
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.password}</td>
      </tr>
    )
  })

  return(
    <div>
      <UserModal data={props.userModalData} show={props.showUserModal} hide={props.setShowUserModal} type={props.userModalType}/>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {userEntries}
          <tr>
            <td>
              <Button onClick={() => handleCreateNewUserClick()}>Create New User</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default UsersTable;
