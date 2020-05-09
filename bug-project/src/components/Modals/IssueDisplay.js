import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faStopwatch, faCheckSquare, faExclamationCircle, faBookmark, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import gaben from '../gaben.jpg';
import { v4 as uuid } from 'uuid';

const ModalBackdrop = styled.div`
    display: ${props => props.modalIsOpen ? "inherit" : "none"};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`;


const ModalBox = styled.div`
    background-color: #fefefe;
    margin: 8% auto;
    padding: 15px;
    border: 1px solid #888;
    width: 55%;
    height: 65%;
    font-size: 12px;

    .close-button {
        color: #aaa;
        float: right;
        top: 0;
        font - size: 28px;
        font - weight: bold;
        
        &:hover,
        &:focus {
        color: black;
        text-decoration: none;
        cursor: pointer
    }
`;

const ModalContent = styled.div`
    position: relative;
    top: 0;
    .left-column {
        height: 100%;
        width: 70%;
        display: inline-block;
    }
    .right-column {
        width: 20%;
        display: inline-block;
    }
`;





const IssueTitleInput = styled.div`
    textarea {
        width: 100%;
        border: 1px solid transparent;
        border-radius: 2px;
        overflow: hidden;
        outline: none;
        resize: none;

        &:hover {
            background-color: #EBECF0;
        }

        &:focus {
            background-color: #FFFFFF;
            border-color: #0647A6;
        }
    }
`;

const IssueDescription = styled.div`
    
    .save-button {
        display: ${props => props.show? "inline-block": "none"};
        background-color: #0647A6;
        color: white;
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
    }

    .cancel-button {
        display: ${props => props.show ? "inline-block" : "none"};
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }

    .ql-toolbar {
        display: ${props => props.show ? "1px solid #ccc" : "none"};
        border-bottom: none;
    }

    .ql-container {
        border: ${props => props.show ? "1px solid #ccc" : "none"};
        border-top: none;
    }
`;
    
const TimeTracking = styled.div`
    .progress-bar-grey {
        height: 10px;
        width: 100%;
        background-color: #ccc;
        .progress-bar-blue {
            height: 100%; 
            width: ${props => props.logged/props.estimated * 100}%;
            background-color: #0647A6;
        }
    }
`;

const Image = styled.div`
    background-image: url(${props => props.image});
    width: 22px;
    height: 22px;
`;


const OriginalEstimate = styled.div`
    input {
        background: #e8e8e8;
        -webkit-appearance: none;
        border: 1px solid #ccc;
        &:hover {
            background: #fff;
            border: 1px solid #0647A6;
        }
    }
`;
const IssueTypePicker = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);


    svg {
        &[data-icon='exclamation-circle'] {
            color: red;
        }
        &[data-icon='bookmark'] {
            color: green;
        }
        &[data-icon='check-square'] {
            color: blue;
        }
    }

    .issue-type-text {
        display: inline-block;
        padding: 2px 5px;
    }

    .current-type {
        padding: 5px;
        border-radius: 2px;
        &:hover {
            background-color: #EBECF0;
            cursor: pointer;
        }
    }

    .dropdown {
        display: ${props => props.showIssuePicker ? "block" : "none"};
        position: absolute;
        border: 1px solid #f1f1f1;
        border-radius: 2px;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
    
`;


const StatusTypePicker = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .status-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        &[data-status-type="selected for development"] {
            background-color: #EBECF0;
            color: rgb(94, 108, 132);
        }
        &[data-status-type="in progress"] {
            background-color: blue;
            color: white;
        }
        &[data-status-type="backlog"] {
            background-color: #EBECF0;
            color: rgb(94, 108, 132);
        }
        &[data-status-type="done"] {
            background-color: green;
            color: white;
        }
    }

    .current-type {
        &:hover {
            transform: scale(1.04);
        }
    }

    .dropdown {
        display: ${props => props.showStatusPicker ? "block" : "none"};
        position: absolute;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;


const PriorityTypePicker = styled.div`
    font-size: 10px;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .priority-type-icon-box svg {
        &[data-priority-type="Highest"] {
            color: darkred;
        }
        &[data-priority-type="High"] {
            color: red;
        }
        &[data-priority-type="Medium"] {
            color: orange;
        }
        &[data-priority-type="Low"] {
            color: green;
        }
        &[data-priority-type="Lowest"] {
            color: darkgreen;
        }
    }

    .priority-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        
    }

    .current-type {
        display: inline-block;
        border-radius: 3px;
        padding: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }

    .dropdown {
        display: ${props => props.showPriorityPicker ? "block" : "none"};
        position: absolute;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;
    
const ReportingUserPicker = styled.div`
    font-size: 10px;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .priority-type-icon-box svg {
        &[data-priority-type="Highest"] {
            color: darkred;
        }
        &[data-priority-type="High"] {
            color: red;
        }
        &[data-priority-type="Medium"] {
            color: orange;
        }
        &[data-priority-type="Low"] {
            color: green;
        }
        &[data-priority-type="Lowest"] {
            color: darkgreen;
        }
    }

    .priority-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        
    }

    .current-type {
        display: inline-block;
        border-radius: 3px;
        padding: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }

    .dropdown {
        display: ${props => props.showReportingUserPicker ? "block" : "none"};
        position: absolute;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            display: inline-block;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;

const AssignedUsersPicker = styled.div`
    font-size: 10px;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .priority-type-icon-box svg {
        &[data-priority-type="Highest"] {
            color: darkred;
        }
        &[data-priority-type="High"] {
            color: red;
        }
        &[data-priority-type="Medium"] {
            color: orange;
        }
        &[data-priority-type="Low"] {
            color: green;
        }
        &[data-priority-type="Lowest"] {
            color: darkgreen;
        }
    }

    .priority-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        
    }

    .current-type {
        display: inline-block;
        border-radius: 3px;
        padding: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }

    .dropdown {
        display: ${props => props.showAssignedUserPicker ? "block" : "none"};
        position: absolute;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            display: inline-block;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;


const BigAvatar = styled.div`
    background-image: url(${ props => props.image });
    background-size: cover; 
    width: 24px; 
    height: 24px; 
    display: block;
    border-radius: 100%;
`;

const SmallAvatar = styled.div`
    background-image: url(${ props => props.image});
    background-size: cover; 
    width: 15px; 
    height: 15px; 
    display: block;
    border-radius: 100%;
`;

const AddCommentsForm = styled.div`
    postion: relative;



    textarea {
        padding-left: 44px;
        border: 1px solid #e3e3e5;
        border-radius: 2px;
        overflow: hidden;
        outline: none;
        resize: none;
        background-color: #F4F5F7;
        

        &:focus {
            background-color: #FFFFFF;
            border-color: #0647A6;
        }
    }

    .save-button {
        display: ${props => props.show ? "inline-block" : "none"};
        background-color: #0647A6;
        color: white;
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
    }

    .cancel-button {
        display: ${props => props.show ? "inline-block" : "none"};
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }
`;


const CommentsDisplay = styled.div`

`;

const Modal = (props) => {
    
    const [showIssuePicker, setShowIssuePicker] = useState(false)
    const [showCommentsButtons, setShowCommentsButtons] = useState(false)
    const [showDescriptionTextEditor, setShowDescriptionTextEditor] = useState(false)
    const [showStatusPicker, setShowStatusPicker] = useState(false)
    const [showPriorityPicker, setShowPriorityPicker] = useState(false)
    const [showReportingUserPicker, setShowReportingUserPicker] = useState(false)
    const [showAssignedUserPicker, setShowAssignedUserPicker] = useState(false)


    


    const [currentIssueType, setCurrentIssueType] = useState(props.card.currentIssueType)
    const [title, setTitle] = useState(props.card.title)
    const [value, setValue] = useState(props.card.value);
    const [addCommentText, setAddCommentText] = useState({ value: "" })
    const [commentsText, setCommentsText] = useState(props.card.commentsText)
    const [estimatedTime, setEstimatedTime] = useState(props.card.estimatedTime)
    const [currentStatusType, setCurrentStatusType] = useState(props.card.currentStatusType)
    const [currentPriorityType, setCurrentPriorityType] = useState(props.card.currentPriorityType)
    const [currentReportingUser, setCurrentReportingUser] = useState(props.card.currentReportingUser)
    const [currentAssignedUsers, setCurrentAssignedUsers] = useState(props.card.issueAssignedUsers)
    
    useEffect(() => {
        setCurrentIssueType(props.card.currentIssueType)
         setCurrentIssueType(props.card.currentIssueType)
         setTitle(props.card.title)
         setValue(props.card.value);
         setAddCommentText({ value: "" })
         setCommentsText(props.card.commentsText)
         setEstimatedTime(props.card.estimatedTime)
         setCurrentStatusType(props.card.currentStatusType)
         setCurrentPriorityType(props.card.currentPriorityType)
         setCurrentReportingUser(props.card.currentReportingUser)
         setCurrentAssignedUsers(props.card.issueAssignedUsers)
    }, [props.card])

    const modalBox = useRef()
    const issuePicker = useRef()
    const statusPicker = useRef()
    const priorityPicker = useRef()
    const reportingUserPicker = useRef()
    const assignedUserPicker = useRef()
    
    
    
    const handleOutsideClicks = (e) => { //Handles all outside clicks for entire modal, since backdrop covers entire screen
        if (!modalBox.current.contains(e.target)) {
            props.setModalIsOpen(false)
        }

        if (!issuePicker.current.contains(e.target)) {
            setShowIssuePicker(false)
        }

        if (!statusPicker.current.contains(e.target)) {
            setShowStatusPicker(false)
        }

        if (!priorityPicker.current.contains(e.target)) {
            setShowPriorityPicker(false)
        }

        if (!reportingUserPicker.current.contains(e.target)) {
            setShowReportingUserPicker(false)
        }

        if (!assignedUserPicker.current.contains(e.target)) {
            setShowAssignedUserPicker(false)
        }
    }
     


    const quillConfig = {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline','strike'],
                [ 'blockquote', "code-block"],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                // [{ color: [] }, { background: [] }],
                ['clean']
            ]
        },
        
    }

    
    

    

    const updateCard = (changedValue, dataType) => {
        let updatedCard = Object.assign({}, props.card)
        updatedCard[dataType].name = changedValue
        props.setCard(updatedCard)
    }
    

    const handleTitleChange = (e) => {
        updateCard({ value: e.target.value }, "issueTitle");

    };

    const getUserAvatar = (userName) => {
        const selectedUser = props.allUsers.find(user => user.name === userName)
        return (selectedUser) ? selectedUser.avatar : ""
    }

    const renderDropdownMenu = (dataType) => {



        


        const updateDropdownVisibility = (updatedBoolean) => {
            switch (dataType) {
                case "issueType":
                    setShowIssuePicker(updatedBoolean)
                    break;
                case "issueStatus":
                    setShowStatusPicker(updatedBoolean)
                    break;
                case "issuePriority":
                    setShowPriorityPicker(updatedBoolean)
                    break;
                case "issueReportingUser":
                    setShowReportingUserPicker(updatedBoolean)
                    break;
                case "issueAssignedUsers":
                    setShowAssignedUserPicker(updatedBoolean)
                    break;
            }
        }

        const handleOptionClick = (e, changedValue, dataType) => {
            updateCard(changedValue, dataType)
            updateDropdownVisibility(false)
        }

        const getOptionsFor = (dataType) => {
            const options = {
                issueType: [
                    { name: "Task" },
                    { name: "Bug" },
                    { name: "Story" }
                ],
            
                issueStatus: [
                    { name: "backlog" },
                    { name: "in progress" },
                    { name: "selected for development" },
                    { name: "done" }
                ],

                issuePriority: [
                    { name: "Highest" },
                    { name: "High" },
                    { name: "Medium" },
                    { name: "Low" },
                    { name: "Lowest" }
                ],

                issueAssignedUsers: props.allUsers,

                issueReportingUser: props.allUsers
            }

            return options[dataType]
        }

        
        
        const renderIndividualOptionJSX = (optionData, dataType) => {
            switch(dataType) {
                case "issueType": 
                    const issueTypeIcons = { 
                        Task: faCheckSquare,
                        Bug: faExclamationCircle,
                        Story: faBookmark 
                    }
                    return (
                        <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                            <FontAwesomeIcon icon={issueTypeIcons[optionData.name]} />
                            <div className="issue-type-text">{optionData.name}</div>
                        </div>
                    )

                case "issueStatus":
                    return (
                        <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                            <div className="status-type-text" data-status-type={optionData.name}>{optionData.name}</div>
                        </div>
                    )

                case "issuePriority":
                    const priorityTypeIcons = {
                        "Highest": faArrowUp,
                        "High": faArrowUp,
                        "Medium": faArrowUp,
                        "Low": faArrowDown,
                        "Lowest": faArrowDown
                    }
                    return (
                        <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                            <div className="priority-type-icon-box">
                                <FontAwesomeIcon icon={priorityTypeIcons[optionData.name]} data-priority-type={optionData.name} />
                                <div className="priority-type-text" >{optionData.name}</div>
                            </div>
                        </div>
                    )

                case "issueReportingUser":
                    return (
                        <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                            <div className="reporting-user-avatar-box">
                                <SmallAvatar image={getUserAvatar(optionData.name)} />
                                <div className="reporting-user-name" >{optionData.name}</div>
                            </div>
                        </div>
                    )
            }
        }


        const getFilterMethod = (dataType) => {
            switch (dataType) {
                case "issueType":
                    return type => type.name !== props.card[dataType].name
                case "issueStatus":
                    return type => type.name !== props.card[dataType].name
                case "issuePriority":
                    return type => type.name !== props.card[dataType].name
                case "issueReportingUser":
                    return type => type.name !== props.card[dataType].name

                default: 
                    return type => type
            
            }
        }

        const renderOptionsJSX = (dataType) => {
            const allOptions = getOptionsFor(dataType)
            const filterMethod = getFilterMethod(dataType)
            const options = allOptions.filter(filterMethod)
            const optionsJSX = options.map(type => renderIndividualOptionJSX(type, dataType))
            return optionsJSX
        }

        const renderCurrentSelectionJSX = (dataType) => {
            switch (dataType) {
                case "issueType":
                    const issueTypeIcons = {
                        Task: faCheckSquare,
                        Bug: faExclamationCircle,
                        Story: faBookmark
                    } 
                    return (
                        <div className="current-type" onClick={e => setShowIssuePicker(true)}>
                            <FontAwesomeIcon icon={issueTypeIcons[props.card[dataType].name]} />
                            <div className="issue-type-text">{props.card[dataType].name}</div>
                        </div>
                    )

                case "issueStatus":
                    return (
                        <div className="current-type" onClick={e => updateDropdownVisibility(true)}>
                            <div className="status-type-text" data-status-type={props.card[dataType].name}>{props.card[dataType].name} ˅</div>
                        </div>
                    )

                case "issuePriority":
                    const priorityTypeIcons = {
                        "Highest": faArrowUp,
                        "High": faArrowUp,
                        "Medium": faArrowUp,
                        "Low": faArrowDown,
                        "Lowest": faArrowDown
                    }
                    return (
                        <div className="current-type" onClick={e => updateDropdownVisibility(true)}>
                            <div className="priority-type-icon-box">
                                <FontAwesomeIcon icon={priorityTypeIcons[props.card[dataType].name]} data-priority-type={props.card[dataType].name} />
                                <div className="priority-type-text" >{props.card[dataType].name} ˅</div>
                            </div>
                        </div>
                    )

                case "issueReportingUser":
                    return (
                        <div className="current-reporting-user" onClick={e => updateDropdownVisibility(true)}>
                            <div className="reporting-user-avatar-box">
                                <SmallAvatar image={getUserAvatar(props.card[dataType].name)} />
                                <div className="reporting-user-name" >{props.card[dataType].name}</div>
                            </div>
                        </div>
                    )       
            }
        }

       

        const renderFullDropdown = (dataType) => {
            return (
                <div className={dataType}>
                    {renderCurrentSelectionJSX(dataType)}
                    <div className="dropdown">
                        {renderOptionsJSX(dataType)}
                    </div>
                </div>
            )
        }

        const fullDropdownMenu = renderFullDropdown(dataType)
        return fullDropdownMenu
    }


    

    
    const assignedUserRender = () => {

        const handleOptionClick = (e, userNameToAdd) => {
            let newCard = Object.assign({}, props.card)
            newCard["issueAssignedUsers"].names = [...props.card.issueAssignedUsers.names, userNameToAdd]
            props.setCard(newCard)
            setShowAssignedUserPicker(false)
        } 

        const handleRemoveUserClick = (e, userNameToRemove) => {
            let newCard = Object.assign({}, props.card)
            const copiedIssueAssignedUsers = [...newCard.issueAssignedUsers.names];
            const newIssueAssignedUsers = copiedIssueAssignedUsers.filter((userName) => userName !== userNameToRemove)
            newCard["issueAssignedUsers"].names = newIssueAssignedUsers
            props.setCard(newCard)
        }


        const options = props.allUsers.filter(user => {
            console.log("1", props.card.issueAssignedUsers);
            
            const currentlyAssignedUserNames = props.card.issueAssignedUsers.map(user => user.name)
            return !(currentlyAssignedUserNames.includes(user.name))
        })

        const optionsJSX = options.map(user => {
            return (
                <div className="option" onClick={(e) => handleOptionClick(e, user.name)}>
                    <div className="reporting-user-avatar-box">
                        <SmallAvatar image={user.avatar} />
                        <div className="reporting-user-name" >{user.name}</div>
                    </div>
                </div>
            )
        })

        const currentAssignedUsersJSX = props.card.issueAssignedUsers.map(user => {
            return (
                <div className="current-assigned-user">
                    <div className="assigned-user-avatar-box">
                        <SmallAvatar image={getUserAvatar(user.name)} />
                        <div className="assigned-user-name" >{user.name}</div>
                        <div className="remove-assigned-user-btn" onClick={(e) => handleRemoveUserClick(e, user.name)}>X</div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                {currentAssignedUsersJSX}
                <div className="add-assigned-user-button" onClick={e => setShowAssignedUserPicker(true)}>Add more +</div>
                <div className="dropdown">
                    {optionsJSX}
                </div>
            </div>
        )
    }


    const commentsContentRender = props.card.issueComments.map((comment) => {
        return (
            <div>
                <div className="avatar-icon-box">
                    <BigAvatar image={comment.user.avatar} />
                    <div className="username">{comment.user.username}</div>
                </div>
                <div className="comment-content">
                    <div className="comment-date">{comment.date}</div>
                    <div className="comment-text">{comment.text}</div>
                    <div className="edit-btn">Edit</div>
                    <div className="delete-btn">Delete</div>
                </div>
            </div>
        )
    })
    


    return (
        <div>
        <ModalBackdrop modalIsOpen={props.modalIsOpen} onMouseDown={(e) => handleOutsideClicks(e)}>
            <ModalBox ref={modalBox}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="close-button"
                    onClick={() => props.setModalIsOpen(false)}
                />
                <ModalContent>
                    <div className="left-column">
                        <IssueTypePicker 
                            showIssuePicker={showIssuePicker} 
                            ref={issuePicker} 
                        >
                            {renderDropdownMenu("issueType")}
                        </IssueTypePicker>
                        <IssueTitleInput>
                            <TextareaAutosize 
                                key="input" 
                                
                                value={props.card.issueTitle.value} 
                                onChange={handleTitleChange}
                            />
                        </IssueTitleInput>
                        <IssueDescription show={showDescriptionTextEditor}>Description
                            <ReactQuill 
                                theme="snow" 
                                value={props.card.issueDescription.value} 
                                onChange={setValue}
                                onFocus={() => setShowDescriptionTextEditor(true)}
                                modules={quillConfig.modules}
                                formats={quillConfig.formats}
                            />
                            <div className="save-button">Save</div>
                            <div className="cancel-button">Cancel</div>
                        </IssueDescription>
                        <div className="issue-comments">Comments
                            <AddCommentsForm show={showCommentsButtons}>
                                <BigAvatar className="big-avatar" image={gaben} />
                                <TextareaAutosize
                                    key="input"
                                    placeholder="Add a comment"
                                    value={addCommentText.value}
                                    onChange={e => setAddCommentText(e.target.value)}
                                    onFocus={() => setShowCommentsButtons(true)}
                                />
                                <div className="save-button">Save</div>
                                <div className="cancel-button">Cancel</div>
                            </AddCommentsForm>
                                    <div className="comments-tip">Press m for magic</div>
                            <CommentsDisplay>
                                {commentsContentRender}
                            </CommentsDisplay>
                        </div>
                    </div>
                    <div className="right-column">
                        <StatusTypePicker
                            showStatusPicker={showStatusPicker}
                            ref={statusPicker}
                        >
                            <div className="status-type-picker-title">Status:</div>
                            {renderDropdownMenu("issueStatus")}
                        </StatusTypePicker>

                        <AssignedUsersPicker
                            showAssignedUserPicker={showAssignedUserPicker}
                            ref={assignedUserPicker}
                        >
                                <div className="assigned-picker-title">Assignees:</div>
                                {assignedUserRender(currentAssignedUsers)}
                        </AssignedUsersPicker>

                        <ReportingUserPicker 
                            showReportingUserPicker={showReportingUserPicker}
                            ref={reportingUserPicker}
                        >
                            <div className="reporting-user-picker-title">Reporter:</div>
                            {renderDropdownMenu("issueReportingUser")}
                        </ReportingUserPicker>

                        <PriorityTypePicker
                            showPriorityPicker={showPriorityPicker}
                            ref={priorityPicker}
                        >
                            <div className="priority-type-picker-title">Priority:</div>
                            {renderDropdownMenu("issuePriority")}
                        </PriorityTypePicker>
                        <OriginalEstimate>
                            <div className="original-estimate-text">Original Estimate (hours):</div> 
                            <input value={props.card.issueEstimatedTime.value} onChange={e => updateCard({ value: e.target.value }, "issueEstimatedTime")}></input>
                        </OriginalEstimate>
                        <TimeTracking logged={1} estimated={props.card.issueEstimatedTime.value}>
                            <FontAwesomeIcon icon={faStopwatch} />
                            <div className="progress-bar-grey">
                                <div className="progress-bar-blue"></div>
                            </div>
                            Time Tracking: 1h logged/6h estimated</TimeTracking>
                        <div className="issue-stats">
                            <div className="date-created">Created at 3 days ago</div>
                            <div className="date-updated">Updated at 19 hours ago</div>
                        </div>
                    </div>
            </ModalContent>

            </ModalBox>
        </ModalBackdrop>
        </div>
    )
}

export default Modal;