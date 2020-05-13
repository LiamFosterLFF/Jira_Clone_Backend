import React, { useRef, useState } from 'react';
import DeleteButton from '../ModalComponents/Shared/DeleteButton';

import CloseButton from '../ModalComponents/Shared/CloseButton';
import IssueTypes from "../ModalComponents/IssueTypes";
import IssuePriority from '../ModalComponents/IssuePriority';
import IssueAssignees from '../ModalComponents/IssueAssignees';
import IssueReporter from '../ModalComponents/IssueReporter';
import IssueTitle from '../ModalComponents/IssueTitle';
import IssueDescription from '../ModalComponents/IssueDescription';
import IssueStatus from '../ModalComponents/IssueStatus';
import IssueOriginalTimeEstimate from '../ModalComponents/IssueOriginalTimeEstimate';
import IssueAddComments from '../ModalComponents/IssueAddComments';
import { ModalBackdrop, ModalBox, ModalContent } from "./styles";
import IssueStatistics from '../ModalComponents/IssueStatistics';
import OutsideClickHandler from 'react-outside-click-handler';
import DeleteModal from '../DeleteIssueModal';
import styled from 'styled-components';
import axios from 'axios';

const TopBar = styled.div`
    padding: 10px 5px 0px;
    width: 100%;
    overflow: auto;
`;
const TopBarLeftSide = styled.div`
    float: left;
`;
const TopBarRightSide = styled.div`
    float: right;
    width: 40%;
`;



const DisplayIssueModal = (props) => {
    const modalBox = useRef()

    const updateCard = (dataType, changedValue) => {
        let updatedCard = Object.assign({}, props.card)
        updatedCard[dataType] = changedValue
        props.setCard(updatedCard)
    }
    
    const handleCloseModal = () => {
        props.setModalIsOpen(false)
        props.updateIssue(props.issueId, props.card)
    }


    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

    const handleDeleteIssue = () => {
        props.deleteIssue(props.card._id)
        setDeleteModalIsOpen(false)
        props.setModalIsOpen(false)
    }

    const handleOutsideClick = (e) => {
        if (!modalBox.current.contains(e.target)) {
            handleCloseModal()
            
        }
    }

    
    return (
        <div>
        <ModalBackdrop modalIsOpen={props.modalIsOpen} onMouseDown={(e) => handleOutsideClick(e)}>
            <ModalBox ref={modalBox}>
                <DeleteModal closeModal={() => setDeleteModalIsOpen(false)}  modalIsOpen={deleteModalIsOpen} deleteIssue={() => handleDeleteIssue()}/>
                <TopBar>
                    <TopBarLeftSide className="left-side">
                        <IssueTypes issueType={props.card.issueType} updateCard={updateCard}/>
                    </TopBarLeftSide>
                    <TopBarRightSide className="right-side">
                        <CloseButton onClick={() => handleCloseModal()}/>
                        <DeleteButton onClick={() => setDeleteModalIsOpen(true)} />
                    </TopBarRightSide>
                </TopBar>
                <ModalContent>
                    <div className="left-column">
                        <IssueTitle issueTitle={props.card.issueTitle} updateCard={updateCard} />
                        <IssueDescription issueDescription={props.card.issueDescription} updateCard={updateCard} modalIsOpen={props.modalIsOpen}/>
                        <IssueAddComments issueComments={props.card.issueComments} updateCard={updateCard}/>
                    </div>
                    <div className="right-column">
                        <IssueStatus issueStatus={props.card.issueStatus} updateCard={updateCard} />
                        <IssueAssignees assignedUsers={props.card.issueAssignedUsers} updateCard={updateCard} allUsers={props.allUsers} />
                        <IssueReporter issueReporter={props.card.issueReportingUser} updateCard={updateCard} allUsers={props.allUsers} /> 
                        <IssuePriority priorityType={props.card.issuePriority} updateCard={updateCard} />
                        <IssueOriginalTimeEstimate estimatedTime={props.card.issueEstimatedTime} updateCard={updateCard} />
                        <IssueStatistics issueStatistics={"ADD ISSUE STATS TO CARD"} />
                    </div>
                </ModalContent>
            </ModalBox>
        </ModalBackdrop>
        </div>
    )
}

export default DisplayIssueModal;