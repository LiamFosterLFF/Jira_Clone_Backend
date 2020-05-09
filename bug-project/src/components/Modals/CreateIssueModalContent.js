import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IssueTypes from "./ModalComponents/IssueTypes"
import IssuePriority from './ModalComponents/IssuePriority'
import IssueAssignees from './ModalComponents/IssueAssignees';
import IssueReporter from './ModalComponents/IssueReporter'
import IssueTitle from './ModalComponents/IssueTitle'
import IssueDescription from './ModalComponents/IssueDescription';
import axios from 'axios'

const Text = styled.div `

`;

const ModalContent = (props) => {



    const [ newCard, setNewCard ] = useState({
        issueType: { name: 'Task' },
        issueTitle: { value: "1" },
        issueDescription: { value: "<p></p>" },
        issueEstimatedTime: {value: 0},
        issueStatus: {name: ""},
        issuePriority: { name: "Medium" },
        issueReportingUser: { username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
        issueAssignedUsers: [{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/7JM1P2r/picke-rick.jpg" }]
    })

    const updateCard = (changedParameter, newValue) => {
        const updatedCard = Object.assign({}, newCard)
        updatedCard[changedParameter] = newValue
        console.log(updatedCard);
        
        setNewCard(updatedCard)
    }

    const submitIssue = () => {
        const createMongooseModelCard = {
            issueData: {
                issueType: newCard.issueType.name,
                issueTitle: newCard.issueTitle.value,
                issueDescription: newCard.issueDescription.value,
                issuePriority: newCard.issuePriority.name,
                project: "5eb576c9fa57d3afd5516338",
                issueStatus: "Backlog",
                issueEstimatedTime: 0,
                issueComments: [],

            },

            users: {
                issueReportingUser: newCard.issueReportingUser,
                issueAssignedUsers: newCard.issueAssignedUsers
            }
        }
        axios.post('http://localhost:3050/api/issues', createMongooseModelCard)
    }

    return (
        <Text>
            Create Issue
            <IssueTypes issueType={newCard.issueType.name} updateCard={updateCard}/>
            <IssueTitle issueTitle={newCard.issueTitle.value} updateCard={updateCard} />
            <IssueDescription issueDescription={newCard.issueDescription.value} updateCard={updateCard} />
            <IssueReporter issueReporter={newCard.issueReportingUser} updateCard={updateCard} allUsers={props.allUsers}/> 
            <IssueAssignees assignedUsers={newCard.issueAssignedUsers} updateCard={updateCard} allUsers={props.allUsers}/>
            <IssuePriority priorityType={newCard.issuePriority.name} updateCard={updateCard} />
            <div onClick={() => submitIssue()}>Create Issue</div>
        </Text>
    )
}


export default ModalContent;