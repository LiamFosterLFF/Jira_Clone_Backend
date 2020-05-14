import React, {useRef, useState} from 'react';
import IssueTypes from "../ModalComponents/IssueTypes"
import IssuePriority from '../ModalComponents/IssuePriority'
import IssueAssignees from '../ModalComponents/IssueAssignees';
import IssueReporter from '../ModalComponents/IssueReporter'
import IssueTitle from '../ModalComponents/IssueTitle'
import IssueDescription from '../ModalComponents/IssueDescription';
import CloseButton from '../ModalComponents/Shared/CloseButton';
import axios from 'axios';
import { CreateIssueModalBackdrop, CreateIssueModalBox } from './styles';
import styled from 'styled-components';

const IssueTypesCreateIssue = styled(IssueTypes)`
    background-color: #F4F5F7;
    & .current-type:hover {
        background-color: #EBECF0;
    }

    & .current-type:focus {
        background-color: #ffffff;
    }
  
`;

const IssuePriorityCreateIssue = styled(IssuePriority)`
    background-color: #F4F5F7;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    margin: 10px 0px;

    &:hover {
        background-color: #EBECF0;
    }
`;

const IssueAssigneesCreateIssue = styled(IssueAssignees)`
    background-color: #F4F5F7;
    border: 1px solid #d6d6d6;
    border-radius: 2px;

    &:hover {
        background-color: #EBECF0;
    }
`;

const IssueReporterCreateIssue = styled(IssueReporter)`
    background-color: #F4F5F7;
    border: 1px solid #d6d6d6;
    border-radius: 2px;

    &:hover {
        background-color: #EBECF0;
    }
`;

const IssueTitleCreateIssue = styled(IssueTitle)`
    textarea {
        background-color: #F4F5F7;
        border: 1px solid #d6d6d6;
        border-radius: 2px;
        width: 98%;

        &:hover {
            background-color: #EBECF0;
        }
    }
`;

const IssueDescriptionCreateIssue = styled(IssueDescription)`
    background-color: #F4F5F7;
    border: 1px solid #d6d6d6;
    border-radius: 2px;

    &:hover {
        background-color: #EBECF0;
    }
`;


const Button = styled.div`

`;

const SaveButton = styled((Button))`

`;

const CancelButton = styled(Button)`

`;

const CreateIssueModal = (props) => {
    
    const modalBoxRef = useRef()

    const defaultCard = {
        issueType: 'Task',
        issueTitle: "",
        issueDescription: "<p></p>",
        issueEstimatedTime: 0,
        issueStatus: "",
        issuePriority: "Medium",
        issueReportingUser: { username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
        issueAssignedUsers: [{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/7JM1P2r/picke-rick.jpg" }]
    }
    
    
    const [ newCard, setNewCard ] = useState(defaultCard)


    const handleOutsideClick = (e) => {
        if (!modalBoxRef.current.contains(e.target)) {
            setNewCard(defaultCard)
            props.setModalIsOpen(false)
        }
    }

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
                issueTimeLogged: 0,
                issueComments: [],
                dateCreated: new Date(),
                dateUpdated: new Date()
            },

            users: {
                issueReportingUser: newCard.issueReportingUser,
                issueAssignedUsers: newCard.issueAssignedUsers
            }
        }
        axios.post('http://localhost:3050/api/issues', createMongooseModelCard)

        setNewCard(defaultCard)
        props.setModalIsOpen(false)
    }

    
    return (
        <CreateIssueModalBackdrop modalIsOpen={props.modalIsOpen} onMouseDown={(e) => handleOutsideClick(e)}>
            <div className="modal-box" ref={modalBoxRef}>
                <div className="modal-content">
                    <h1>Create Issue</h1>
                    <div className="label">
                        Issue Type
                        <IssueTypesCreateIssue issueType={newCard.issueType} updateCard={updateCard} className="scooby-doo"/>
                    </div>
                    <div className="label">
                        ShortSummary
                        <IssueTitleCreateIssue issueTitle={newCard.issueTitle} updateCard={updateCard} />
                    </div>
                    <div className="label">
                        Description
                        <IssueDescriptionCreateIssue issueDescription={newCard.issueDescription} updateCard={updateCard} modalIsOpen={props.modalIsOpen}/>
                    </div>
                    <div className="label">
                        Reporter
                        <IssueReporterCreateIssue issueReporter={newCard.issueReportingUser} updateCard={updateCard} allUsers={props.allUsers}/> 
                    </div>
                    <div className="label">
                        Assignees
                        <IssueAssigneesCreateIssue assignedUsers={newCard.issueAssignedUsers} updateCard={updateCard} allUsers={props.allUsers}/>
                    </div>
                    <div className="label">
                        Priority
                        <IssuePriorityCreateIssue priorityType={newCard.issuePriority} updateCard={updateCard} />
                    </div>
                    <div className="buttons">
                        <SaveButton onClick={() => submitIssue()}>Create Issue</SaveButton>
                        <CancelButton onClick={() => props.setModalIsOpen(false)}>Cancel</CancelButton>
                    </div>
                </div>
                
                

            </div>
        </CreateIssueModalBackdrop>
    )
}


export default CreateIssueModal;