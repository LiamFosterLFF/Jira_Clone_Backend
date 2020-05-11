import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IssueDescriptionBox } from './styles'


const IssueDescription = (props) => {
    const [description, setDescription] = useState(props.issueDescription)
    const [showEditor, setShowEditor] = useState(false)

    const handleUpdate = () => {
        props.updateCard("issueDescription", description)
        setShowEditor(false)
    }

    const handleCancel = () => {
        setDescription(props.issueDescription)
        setShowEditor(false)
    }

    useEffect(() => {
        setDescription(props.issueDescription)
        setShowEditor(false)
    }, [props.modalIsOpen])
    
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
                value={description} 
                onChange={setDescription}
                onFocus={() => setShowEditor(true)}
                modules={quillConfig.modules}
                formats={quillConfig.formats}
            />
            <div className="save-button" onClick={() => handleUpdate()}>Save</div>
            <div className="cancel-button" onClick={() => handleCancel()}>Cancel</div>
        </IssueDescriptionBox>
    )
}

export default IssueDescription;