import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IssueReporterDropdown } from './styles'



const SmallAvatar = styled.div`
    background-image: url(${ props => props.image});
    background-size: cover; 
    width: 15px; 
    height: 15px; 
    display: block;
    border-radius: 100%;
`;



const IssueReporter = (props) => {
    const [ showDropdown, setShowDropdown ] = useState(false)

    const allOptions = props.allUsers


    const handleOptionClick = (user) => {
        props.updateCard("issueReportingUser", user)
        setShowDropdown(false)
    }


    const CurrentSelection= ({reportingUser}) => {
        return (
            <div className="current-reporting-user" onClick={e => setShowDropdown(true)}>
                <div className="reporting-user-avatar-box">
                    <SmallAvatar image={reportingUser.avatar} />
                    <div className="reporting-user-name" >{reportingUser.username}</div>
                </div>
            </div>
        )   
        
    }


    const IndividualOption = ({user}) => {
        return (
            <div className="option" onClick={(e) => handleOptionClick(user)}>
                <div className="reporting-user-avatar-box">
                    <SmallAvatar image={user.avatar} />
                    <div className="reporting-user-name" >{user.username}</div>
                </div>
            </div>
        )
    }


    const Options = ({reportingUser}) => {
        console.log(reportingUser);
        
        const filteredOptionsArray = allOptions.filter(user => user.username !== reportingUser.username)
        const optionsJSX = filteredOptionsArray.map(option => <IndividualOption user={option}/>)
        return  <div className="dropdown"> {optionsJSX} </div>
    } 

    

    return (
        <div>
            <IssueReporterDropdown showDropdown={showDropdown} className="issue-reporter">
                <CurrentSelection reportingUser={props.issueReporter} />
                <Options reportingUser={props.issueReporter} />
            </IssueReporterDropdown>
        </div>

    )
}

export default IssueReporter;