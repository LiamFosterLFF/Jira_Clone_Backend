import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckSquare, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { IssueTypesDropdown } from './styles'
import OutsideClickHandler from 'react-outside-click-handler';
import { v4 as uuid } from 'uuid';
const IssueTypes = (props) => {
    
    const [ showDropdown, setShowDropdown ] = useState(false)

    const allOptions = {
        "Task": { icon: faCheckSquare },
        "Bug": { icon: faExclamationCircle },
        "Story": { icon: faBookmark }
    }

    const handleOptionClick = (type) => {
        props.updateCard("issueType", type)
        setShowDropdown((showDropdown) => !showDropdown)
    }

    const CurrentSelection = ({issueType}) => {
        return (
            <div className="current-type" onClick={() => setShowDropdown(true)}>
                <FontAwesomeIcon icon={allOptions[issueType].icon} />
                <div className="issue-type-text">{issueType}</div>
            </div>
        )
    }

    const IndividualOption = ({issueType}) => {
        return (
            <div className="option" onClick={() => handleOptionClick(issueType)}>
                <FontAwesomeIcon icon={allOptions[issueType].icon} />
                <div className="issue-type-text">{issueType}</div>
            </div>
        )
    }


    const Options = ({issueType}) => {
        const filteredOptionsArray = Object.keys(allOptions).filter(key => key !== issueType)
        const optionsJSX = filteredOptionsArray.map((option, icon) => <IndividualOption key={uuid()} issueType={option}/>)
        return  <div className="dropdown"> {optionsJSX} </div>
    } 

    return (
        <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
            <IssueTypesDropdown showDropdown={showDropdown} className={(props.className)? (props.className + " issue-types") : "issue-types"}>
                <CurrentSelection issueType={props.issueType} />
                <Options issueType={props.issueType} />
            </IssueTypesDropdown>
        </OutsideClickHandler>

    )
}

export default IssueTypes;