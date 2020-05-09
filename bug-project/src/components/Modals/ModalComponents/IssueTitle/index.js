import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import { IssueTitleInput } from './styles'




const IssueTitle = (props) => {
    
    
    const handleTitleChange = (e) => {
        props.updateCard("issueTitle", {value: e.target.value})
    }

    
    return (
        <IssueTitleInput>
            <TextareaAutosize 
                key="input" 
                
                value={props.issueTitle} 
                onChange={(e) => handleTitleChange(e)}
            />
        </IssueTitleInput>
    )
}

export default IssueTitle;