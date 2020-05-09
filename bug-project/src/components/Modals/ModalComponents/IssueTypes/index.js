import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckSquare, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { IssueTypesDropdown } from './styles'




const IssueTypes = (props) => {
    
    const [ showDropdown, setShowDropdown ] = useState(false)


    const allOptions = {
        "Task": { icon: faCheckSquare },
        "Bug": { icon: faExclamationCircle },
        "Story": { icon: faBookmark }
    }


    const handleOptionClick = (type) => {
        props.updateCard("issueType", {name: type})
        setShowDropdown(false)
    }


    const CurrentSelection= ({issueType}) => {
        
        return (
            <div className="current-type" onClick={e => setShowDropdown(true)}>
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
        const optionsJSX = filteredOptionsArray.map((option, icon) => <IndividualOption issueType={option}/>)
        return  <div className="dropdown"> {optionsJSX} </div>
    } 

    

    return (
        <div>
            <IssueTypesDropdown showDropdown={showDropdown} className="issue-type">
                <CurrentSelection issueType={props.issueType} />
                <Options issueType={props.issueType} />
            </IssueTypesDropdown>
        </div>

    )
}

export default IssueTypes;