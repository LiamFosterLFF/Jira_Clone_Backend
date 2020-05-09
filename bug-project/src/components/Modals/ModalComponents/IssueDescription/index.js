import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IssueDescriptionBox } from './styles'



const IssueDescription = (props) => {
    console.log(props);
    
    const [ showEditor, setShowEditor ] = useState(false)

    const handleDescriptionChange = value => {
        props.updateCard("issueDescription", {"value": value})
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

    return (
        <IssueDescriptionBox show={showEditor}>
            <ReactQuill 
                theme="snow" 
                value={props.issueDescription} 
                onChange={handleDescriptionChange}
                onFocus={() => setShowEditor(true)}
                modules={quillConfig.modules}
                formats={quillConfig.formats}
            />
            <div className="save-button">Save</div>
            <div className="cancel-button" onClick={() => setShowEditor(false)}>Cancel</div>
        </IssueDescriptionBox>
    )
}

export default IssueDescription;