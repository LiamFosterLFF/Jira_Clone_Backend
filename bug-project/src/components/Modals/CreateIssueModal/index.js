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
            <CreateIssueModalBox ref={modalBoxRef}>
                <CloseButton onClick={() => props.setModalIsOpen(false)}/>

                <IssueTypes issueType={newCard.issueType} updateCard={updateCard}/>
                <IssueTitle issueTitle={newCard.issueTitle} updateCard={updateCard} />
                <IssueDescription issueDescription={newCard.issueDescription} updateCard={updateCard} modalIsOpen={props.modalIsOpen}/>
                <IssueReporter issueReporter={newCard.issueReportingUser} updateCard={updateCard} allUsers={props.allUsers}/> 
                <IssueAssignees assignedUsers={newCard.issueAssignedUsers} updateCard={updateCard} allUsers={props.allUsers}/>
                <IssuePriority priorityType={newCard.issuePriority} updateCard={updateCard} />
                <div onClick={() => submitIssue()}>Create Issue</div>
            </CreateIssueModalBox>
        </CreateIssueModalBackdrop>
    )
}


export default CreateIssueModal;