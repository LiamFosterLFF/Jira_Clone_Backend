import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { IssueStatusDropdown } from './styles'
import { v4 as uuid } from 'uuid';

const IssueStatus = (props) => {
    const [ showDropdown, setShowDropdown ] = useState(false)

    const allOptions = [
        "Backlog",
        "In Progress",
        "Selected For Development",
        "Done"
    ]


    const handleOptionClick = (updatedStatusType) => {
        props.updateCard("issueStatus", updatedStatusType)
        setShowDropdown(false)
    }


    const CurrentSelection= ({statusType}) => {
        
        return (
            <div className="current-type" onClick={e => setShowDropdown(true)}>
                <div className="status-type-text" data-status-type={statusType}>{statusType} ˅</div>
            </div>
        )
    }


    const IndividualOption = ({statusType}) => {
        return (
            <div className="option" onClick={() => handleOptionClick(statusType)}>
                <div className="status-type-text" data-status-type={statusType}>{statusType}</div>
            </div>
        )
    }


    const Options = ({statusType}) => {
        const filteredOptionsArray = allOptions.filter(optionType => optionType !== statusType)
        const optionsJSX = filteredOptionsArray.map((option) => <IndividualOption key={uuid()} statusType={option}/>)
        return  <div className="dropdown"> {optionsJSX} </div>
    } 

    return (
        <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
            <IssueStatusDropdown showDropdown={showDropdown} className="issue-status">
                <CurrentSelection statusType={props.issueStatus} />
                <Options statusType={props.issueStatus} />
            </IssueStatusDropdown>
        </OutsideClickHandler>

    )
}

export default IssueStatus;