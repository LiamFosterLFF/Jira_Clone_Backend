import React, { useState } from 'react';
import styled from 'styled-components';
import { AssignedUserDropdown } from './styles'
import { v4 as uuid } from 'uuid';

const SmallAvatar = styled.div`
    background-image: url(${ props => props.image});
    background-size: cover; 
    width: 15px; 
    height: 15px; 
    display: block;
    border-radius: 100%;
`;



const IssueAssignees = (props) => {
    
    const [ showDropdown, setShowDropdown ] = useState(false)

    const handleOptionClick = (userToAdd) => {
        const newAssignedUsers = [ ...props.assignedUsers, userToAdd]
        props.updateCard("issueAssignedUsers", newAssignedUsers)

        setShowDropdown(false)
    } 

    const handleRemoveUserClick = (userToRemove) => {
        const newAssignedUsers = props.assignedUsers.filter((user) => user.username !== userToRemove.username)
        props.updateCard("issueAssignedUsers", newAssignedUsers)
    }
    const currentAssignedUserNames = props.assignedUsers.map(user => user.username)
    const options = props.allUsers.filter(user => !(currentAssignedUserNames.includes(user.username)))

    const optionsJSX = options.map(user => {
        return (
            <div key={uuid()} className="option" onClick={(e) => handleOptionClick(user)}>
                <div className="reporting-user-avatar-box">
                    <SmallAvatar image={user.avatar} />
                    <div className="reporting-user-name" >{user.username}</div>
                </div>
            </div>
        )
    })

    const currentAssignedUsersJSX = props.assignedUsers.map(user => {
        return (
            <div key={uuid()} className="current-assigned-user">
                <div className="assigned-user-avatar-box">
                    <SmallAvatar image={user.avatar} />
                    <div className="assigned-user-name" >{user.username}</div>
                    <div className="remove-assigned-user-btn" onClick={(e) => handleRemoveUserClick(user)}>X</div>
                </div>
            </div>
        )
    })

    return (
        <AssignedUserDropdown showDropdown={showDropdown} className={(props.className)? (props.className + " issue-assignees") : "issue-assignees"}>
            {currentAssignedUsersJSX}
            <div className="add-assigned-user-button" onClick={e => setShowDropdown(true)}>Add more +</div>
            <div className="dropdown">
                {optionsJSX}
            </div>
        </AssignedUserDropdown>
    )
}

export default IssueAssignees;
