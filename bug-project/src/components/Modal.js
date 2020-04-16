import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faStopwatch, faCheckSquare, faExclamationCircle, faBookmark, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import gaben from './gaben.jpg';

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
    
const Modal = (props) => {
    
    const modalBox = useRef()
    const issuePicker = useRef()
    const statusPicker = useRef()
    const priorityPicker = useRef()
    const [showIssuePicker, setShowIssuePicker] = useState(false)

    const [value, setValue] = useState('Try assigning Pickle Rick to this issue. 🥒 🥒 🥒');
    const [showDescriptionTextEditor, setShowDescriptionTextEditor] = useState(false)
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

    const [title, setTitle] = useState({value: "Each issue has a single reporter but can have multiple assignees."})

    const handleTitleChange = (e) => {
        setTitle({value: e.target.value});
        
    };

    const [estimatedTime, setEstimatedTime] = useState(6)
    

    

    const [currentIssueType, setCurrentIssueType] = useState("Bug")

    const issueTypeRender = (currentIssueType) => {

        const handleOptionClick = (e, type) => {
            setCurrentIssueType(type)
            setShowIssuePicker(false)
        }
        const issueTypes = {
            "Task": faCheckSquare,
            "Bug": faExclamationCircle,
            "Story": faBookmark
        }
        
        const options = Object.keys(issueTypes).filter(type => type !== currentIssueType)
        const optionsJSX = options.map(type => {
            return (
                <div className="option" onClick={(e) => handleOptionClick(e, type)}>
                    <FontAwesomeIcon icon={issueTypes[type]}/>
                    <div className="issue-type-text">{type}</div>
                </div>
            )
        })

        return (
            <div>
                <div className="current-type" onClick={e => setShowIssuePicker(true)}>
                    <FontAwesomeIcon icon={issueTypes[currentIssueType]} />
                    <div className="issue-type-text">{currentIssueType}</div>
                </div>
                <div className="dropdown">
                    {optionsJSX}
                </div>
            </div>
        )
    }


    const [currentStatusType, setCurrentStatusType] = useState("backlog")
    const [showStatusPicker, setShowStatusPicker] = useState(false)
    const statusTypeRender = (currentIssueType) => {

        const handleOptionClick = (e, type) => {
            setCurrentStatusType(type)
            setShowStatusPicker(false)
        }
        const statusTypes = [
            "backlog",
            "in progress",
            "selected for development",
            "done"
        ]
        
        const options = statusTypes.filter(type => type !== currentStatusType)
        const optionsJSX = options.map(type => {
            return (
                <div className="option" onClick={(e) => handleOptionClick(e, type)}>
                    <div className="status-type-text" data-status-type={type}>{type}</div>
                </div>
            )
        })

        return (
            <div>
                <div className="current-type" onClick={e => setShowStatusPicker(true)}>
                    <div className="status-type-text" data-status-type={currentStatusType}>{currentStatusType} ˅</div>
                </div>
                <div className="dropdown">
                    {optionsJSX}
                </div>
            </div>
        )
    }


    const [currentPriorityType, setCurrentPriorityType] = useState("High")
    const [showPriorityPicker, setShowPriorityPicker] = useState(false)
    const priorityTypeRender = (currentIssueType) => {

        const handleOptionClick = (e, type) => {
            setCurrentPriorityType(type)
            setShowPriorityPicker(false)
        }
        const priorityTypes = {
            "Highest": faArrowUp ,
            "High": faArrowUp,
            "Medium": faArrowUp ,
            "Low": faArrowDown ,
            "Lowest": faArrowDown 
        }

        const options = Object.keys(priorityTypes).filter(type => type !== currentPriorityType)
        const optionsJSX = options.map(type => {
            return (
                <div className="option" onClick={(e) => handleOptionClick(e, type)}>
                    <div className="priority-type-icon-box">
                        <FontAwesomeIcon icon={priorityTypes[type]} data-priority-type={type}/>
                        <div className="priority-type-text" >{type}</div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className="current-type" onClick={e => setShowPriorityPicker(true)}>
                    <div className="priority-type-icon-box">
                        <FontAwesomeIcon icon={priorityTypes[currentPriorityType]} data-priority-type={currentPriorityType}/>
                        <div className="priority-type-text" >{currentPriorityType} ˅</div>
                    </div>
                </div>
                <div className="dropdown">
                    {optionsJSX}
                </div>
            </div>
        )
    }
    
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
                            {issueTypeRender(currentIssueType)}
                        </IssueTypePicker>
                        <IssueTitleInput>
                            <TextareaAutosize 
                                key="input" 
                                
                                value={title.value} 
                                onChange={handleTitleChange}
                            />
                        </IssueTitleInput>
                            <IssueDescription show={showDescriptionTextEditor}>Description
                            <ReactQuill 
                                theme="snow" 
                                value={value} 
                                onChange={setValue}
                                onFocus={() => setShowDescriptionTextEditor(true)}
                                modules={quillConfig.modules}
                                formats={quillConfig.formats}
                            />
                            <div className="save-button">Save</div>
                            <div className="cancel-button">Cancel</div>
                        </IssueDescription>
                        <div className="issue-comments">Comments
                            <div className="comments-form">Add a comment
                                <div className="comments-tip">Press m for magic</div>
                            </div>
                            <div className="comments-display">Lord Gaben3 days ago In the moonlight,The color and scent of the wisteria Seems far away. Edit Delete</div>
                        </div>
                    </div>
                    <div className="right-column">
                        <StatusTypePicker
                            showStatusPicker={showStatusPicker}
                            ref={statusPicker}
                        >
                            <div className="status-type-picker-title">Status:</div>
                            {statusTypeRender(currentStatusType)}
                        </StatusTypePicker>
                        <div className="assignees">Assignees: Pickle Rick Baby Yoda Lord Gaben Add More</div>
                        <div className="reporter">
                            <div style={{backgroundImage: `url(${gaben})`, backgroundSize: 'cover', width: '24px', height: '24px', display: 'block'}} />&nbsp;
                            </div>
                                <div>

                                Reporter: Baby Yoda
                        </div>
                        <PriorityTypePicker
                            showPriorityPicker={showPriorityPicker}
                            ref={priorityPicker}
                        >
                            <div className="priority-type-picker-title">Priority:</div>
                            {priorityTypeRender(currentPriorityType)}
                        </PriorityTypePicker>
                        <div className="priority">Priority: High</div>
                        <OriginalEstimate>
                            <div className="original-estimate-text">Original Estimate (hours):</div> 
                            <input value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)}></input>
                        </OriginalEstimate>
                        <TimeTracking logged={1} estimated={estimatedTime}>
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