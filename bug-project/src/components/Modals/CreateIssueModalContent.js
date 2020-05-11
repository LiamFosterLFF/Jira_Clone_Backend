import React, { useState } from 'react';
import styled from 'styled-components';
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
        issueType: 'Task',
        issueTitle: "1",
        issueDescription: "<p></p>",
        issueEstimatedTime: 0,
        issueStatus: "",
        issuePriority: "Medium",
        issueReportingUser: { username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
        issueAssignedUsers: [{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/7JM1P2r/picke-rick.jpg" }]
    })

    const updateCard = (changedParameter, newValue) => {
        const updatedCard = Object.assign({}, newCard)
        updatedCard[changedParameter] = newValue
        setNewCard(updatedCard)
    }

    const submitIssue = () => {
        const createMongooseModelCard = {
            issueData: {
                issueType: newCard.issueType,
                issueTitle: newCard.issueTitle,
                issueDescription: newCard.issueDescription,
                issuePriority: newCard.issuePriority,
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
            <IssueTypes issueType={newCard.issueType} updateCard={updateCard}/>
            <IssueTitle issueTitle={newCard.issueTitle} updateCard={updateCard} />
            <IssueDescription issueDescription={newCard.issueDescription} updateCard={updateCard} />
            <IssueReporter issueReporter={newCard.issueReportingUser} updateCard={updateCard} allUsers={props.allUsers}/> 
            <IssueAssignees assignedUsers={newCard.issueAssignedUsers} updateCard={updateCard} allUsers={props.allUsers}/>
            <IssuePriority priorityType={newCard.issuePriority} updateCard={updateCard} />
            <div onClick={() => submitIssue()}>Create Issue</div>
        </Text>
    )
}


export default ModalContent;