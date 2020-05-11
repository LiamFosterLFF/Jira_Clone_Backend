import React, { useRef } from 'react';
import CloseButton from '../ModalComponents/Shared/CloseButton';
import IssueTypes from "../ModalComponents/IssueTypes";
import IssuePriority from '../ModalComponents/IssuePriority';
import IssueAssignees from '../ModalComponents/IssueAssignees';
import IssueReporter from '../ModalComponents/IssueReporter';
import IssueTitle from '../ModalComponents/IssueTitle';
import IssueDescription from '../ModalComponents/IssueDescription';
import IssueStatus from '../ModalComponents/IssueStatus';
import IssueOriginalTimeEstimate from '../ModalComponents/IssueOriginalTimeEstimate';
import IssueAddCommentsForm from '../ModalComponents/IssueAddComments';
import { ModalBackdrop, ModalBox, ModalContent } from "./styles";
import IssueStatistics from '../ModalComponents/IssueStatistics';
import OutsideClickHandler from 'react-outside-click-handler';

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


    
    return (
        <div>
        <ModalBackdrop modalIsOpen={props.modalIsOpen} >
            <ModalBox ref={modalBox}>
                <CloseButton onClick={() => handleCloseModal()}/>
                <OutsideClickHandler onOutsideClick={() => handleCloseModal()}>
                    <ModalContent>
                        <div className="left-column">
                            <IssueTypes issueType={props.card.issueType} updateCard={updateCard}/>
                            <IssueTitle issueTitle={props.card.issueTitle} updateCard={updateCard} />
                            <IssueDescription issueDescription={props.card.issueDescription} updateCard={updateCard} modalIsOpen={props.modalIsOpen}/>
                            <IssueAddCommentsForm issueComments={props.card.issueComments} updateCard={updateCard}/>
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
                </OutsideClickHandler>
            </ModalBox>
        </ModalBackdrop>
        </div>
    )
}

export default DisplayIssueModal;