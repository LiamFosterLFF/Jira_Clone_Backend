import React, { useState } from 'react'
import UsersTable from './UsersTable'
import UsersCard from './UsersCard'

const UsersTab = (props) => {

  const [showUserModal, setShowUserModal] = useState(false)
  const [userModalData, setUserModalData] = useState({})
  const [userModalType, setUserModalType] = useState('create')
  
  const childProps = {
    ...props,
    showUserModal,
    setShowUserModal,
    userModalData,
    setUserModalData,
    userModalType,
    setUserModalType
  }

  return(
    <div>
      <UsersCard {...childProps}/>
      <UsersTable {...childProps}/>
    </div>
  )
}

export default UsersTab;
