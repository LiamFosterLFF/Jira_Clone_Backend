import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { IssuePriorityDropdown } from './styles'



const IssuePriority = (props) => {
    const [ showDropdown, setShowDropdown ] = useState(false)


    const allOptions = {
        "Highest": { icon: faArrowUp },
        "High": { icon: faArrowUp },
        "Medium": { icon: faArrowUp },
        "Low": { icon: faArrowDown },
        "Lowest": { icon: faArrowDown }
    }





    const handleOptionClick = (priorityType) => {
        props.updateCard("issuePriority", {name: priorityType})
        setShowDropdown(false)
    }


    const CurrentSelection= ({priorityType}) => {
        return (

            <div className="current-type" onClick={e => setShowDropdown(true)}>
                <div className="priority-type-icon-box">
                    <FontAwesomeIcon icon={allOptions[priorityType].icon} data-priority-type={priorityType} />
                    <div className="priority-type-text" >{priorityType} ˅</div>
                </div>
            </div>
        )
    }


    const IndividualOption = ({priorityType}) => {

        return (
            <div className="option" onClick={() => handleOptionClick(priorityType)}>
                <div className="priority-type-icon-box">
                    <FontAwesomeIcon icon={allOptions[priorityType].icon} data-priority-type={priorityType}/>
                    <div className="priority-type-text">{priorityType}</div>
                </div>
            </div>
        )
    }


    const Options = ({priorityType}) => {
        const filteredOptionsArray = Object.keys(allOptions).filter(key => key !== priorityType)
        const optionsJSX = filteredOptionsArray.map((option, icon) => <IndividualOption priorityType={option}/>)
        return  <div className="dropdown"> {optionsJSX} </div>
    } 

    return (
        <div>
            <IssuePriorityDropdown showDropdown={showDropdown} className="issue-priority">
                <CurrentSelection priorityType={props.priorityType} />
                <Options priorityType={props.priorityType} />
            </IssuePriorityDropdown>
        </div>

    )
}

export default IssuePriority;