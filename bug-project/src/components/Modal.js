import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    .left-column {
        width: 70%;
        display: inline-block;
    }
    .right-column {
        width: 20%;
        display: inline-block;
    }
`;


const IssueTypePicker = styled.div`
    font-size: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);

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
            padding: 5px;
        }
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


    
const Modal = (props) => {
    console.log(props.modalIsOpen);
    
    const modalBox = useRef()

    const issuePicker = useRef()
    const [showIssuePicker, setShowIssuePicker] = useState(false)

    const [value, setValue] = useState('');
    
    const handleOutsideClicks = (e) => {
        if (!modalBox.current.contains(e.target)) {
            props.setModalIsOpen(false)
        }

        if (!issuePicker.current.contains(e.target)) {
            setShowIssuePicker(false)
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
                        <IssueTypePicker showIssuePicker={showIssuePicker} ref={issuePicker} onClick={e => setShowIssuePicker(true)}>
                            <div className="current-type">Story-12345</div>
                            <div className="dropdown">
                                <div className="option">Bug</div> 
                                <div className="option">Task</div>
                            </div>
                        </IssueTypePicker>
                        <IssueTitleInput>
                            <TextareaAutosize 
                                key="input" 
                                
                                value={title.value} 
                                onChange={handleTitleChange}
                            />
                        </IssueTitleInput>
                        <div className="issue-description">Description
                            <ReactQuill 
                                theme="snow" 
                                value={value} 
                                onChange={setValue}
                                modules={quillConfig.modules}
                                formats={quillConfig.formats}
                            />
                            <div className="issue-description-textbox">Try assigning Pickle Rick to this issue. 🥒 🥒 🥒</div>
                        </div>
                        <div className="issue-comments">Comments
                            <div className="comments-form">Add a comment
                                <div className="comments-tip">Press m for magic</div>
                            </div>
                            <div className="comments-display">Lord Gaben3 days ago In the moonlight,The color and scent of the wisteria Seems far away. Edit Delete</div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="status-type-picker">Status: Backlog</div>
                        <div className="assignees">Assignees: Pickle Rick Baby Yoda Lord Gaben Add More</div>
                        <div className="reporter">Reporter: Baby Yoda</div>
                        <div className="priority">Priority: High</div>
                        <div className="original-estimate">Original Estimate (hours): 6</div>
                        <div className="time-tracking">Time Tracking: 3h logged/6h estimated</div>
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