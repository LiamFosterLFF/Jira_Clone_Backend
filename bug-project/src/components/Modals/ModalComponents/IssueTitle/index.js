import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IssueTitleInput } from './styles'




const IssueTitle = (props) => {
    
    const handleTitleChange = (e) => {
        props.updateCard("issueTitle", e.target.value)
    }

    
    return (
        <IssueTitleInput className={(props.className)? (props.className + " issue-title") : "issue-title"}>
            <TextareaAutosize 
                key="input" 
                
                value={props.issueTitle} 
                onChange={(e) => handleTitleChange(e)}
            />
        </IssueTitleInput>
    )
}

export default IssueTitle;