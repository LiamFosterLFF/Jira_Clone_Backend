import React from "react";


const renderDropdownMenu = (dataType) => {


    const updateDropdownVisibility = (updatedBoolean) => {
        switch (dataType) {
            case "issueType":
                setShowIssuePicker(updatedBoolean)
                break;
            case "issueStatus":
                setShowStatusPicker(updatedBoolean)
                break;
            case "issuePriority":
                setShowPriorityPicker(updatedBoolean)
                break;
            case "issueReportingUser":
                setShowReportingUserPicker(updatedBoolean)
                break;
            case "issueAssignedUsers":
                setShowAssignedUserPicker(updatedBoolean)
                break;
        }
    }

    const handleOptionClick = (e, changedValue, dataType) => {
        updateCard(changedValue, dataType)
        updateDropdownVisibility(false)
    }

    const getOptionsFor = (dataType) => {
        const options = {
            issueType: [
                { name: "Task" },
                { name: "Bug" },
                { name: "Story" }
            ],
        
            issueStatus: [
                { name: "backlog" },
                { name: "in progress" },
                { name: "selected for development" },
                { name: "done" }
            ],

            issuePriority: [
                { name: "Highest" },
                { name: "High" },
                { name: "Medium" },
                { name: "Low" },
                { name: "Lowest" }
            ],

            issueAssignedUsers: props.allUsers,

            issueReportingUser: props.allUsers
        }

        return options[dataType]
    }

    
    
    const renderIndividualOptionJSX = (optionData, dataType) => {
        switch(dataType) {
            case "issueType": 
                const issueTypeIcons = { 
                    Task: faCheckSquare,
                    Bug: faExclamationCircle,
                    Story: faBookmark 
                }
                return (
                    <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                        <FontAwesomeIcon icon={issueTypeIcons[optionData.name]} />
                        <div className="issue-type-text">{optionData.name}</div>
                    </div>
                )

            case "issueStatus":
                return (
                    <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                        <div className="status-type-text" data-status-type={optionData.name}>{optionData.name}</div>
                    </div>
                )

            case "issuePriority":
                const priorityTypeIcons = {
                    "Highest": faArrowUp,
                    "High": faArrowUp,
                    "Medium": faArrowUp,
                    "Low": faArrowDown,
                    "Lowest": faArrowDown
                }
                return (
                    <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                        <div className="priority-type-icon-box">
                            <FontAwesomeIcon icon={priorityTypeIcons[optionData.name]} data-priority-type={optionData.name} />
                            <div className="priority-type-text" >{optionData.name}</div>
                        </div>
                    </div>
                )

            case "issueReportingUser":
                return (
                    <div className="option" onClick={(e) => handleOptionClick(e, optionData.name, dataType)}>
                        <div className="reporting-user-avatar-box">
                            <SmallAvatar image={getUserAvatar(optionData.name)} />
                            <div className="reporting-user-name" >{optionData.name}</div>
                        </div>
                    </div>
                )
        }
    }


    const getFilterMethod = (dataType) => {
        switch (dataType) {
            case "issueType":
                return type => type.name !== props.card[dataType].name
            case "issueStatus":
                return type => type.name !== props.card[dataType].name
            case "issuePriority":
                return type => type.name !== props.card[dataType].name
            case "issueReportingUser":
                return type => type.name !== props.card[dataType].name

            default: 
                return type => type
        
        }
    }

    const renderOptionsJSX = (dataType) => {
        const allOptions = getOptionsFor(dataType)
        const filterMethod = getFilterMethod(dataType)
        const options = allOptions.filter(filterMethod)
        const optionsJSX = options.map(type => renderIndividualOptionJSX(type, dataType))
        return optionsJSX
    }

    const renderCurrentSelectionJSX = (dataType) => {
        switch (dataType) {
            case "issueType":
                const issueTypeIcons = {
                    Task: faCheckSquare,
                    Bug: faExclamationCircle,
                    Story: faBookmark
                } 
                return (
                    <div className="current-type" onClick={e => setShowIssuePicker(true)}>
                        <FontAwesomeIcon icon={issueTypeIcons[props.card[dataType].name]} />
                        <div className="issue-type-text">{props.card[dataType].name}</div>
                    </div>
                )

            case "issueStatus":
                return (
                    <div className="current-type" onClick={e => updateDropdownVisibility(true)}>
                        <div className="status-type-text" data-status-type={props.card[dataType].name}>{props.card[dataType].name} ˅</div>
                    </div>
                )

            case "issuePriority":
                const priorityTypeIcons = {
                    "Highest": faArrowUp,
                    "High": faArrowUp,
                    "Medium": faArrowUp,
                    "Low": faArrowDown,
                    "Lowest": faArrowDown
                }
                return (
                    <div className="current-type" onClick={e => updateDropdownVisibility(true)}>
                        <div className="priority-type-icon-box">
                            <FontAwesomeIcon icon={priorityTypeIcons[props.card[dataType].name]} data-priority-type={props.card[dataType].name} />
                            <div className="priority-type-text" >{props.card[dataType].name} ˅</div>
                        </div>
                    </div>
                )

            case "issueReportingUser":
                return (
                    <div className="current-reporting-user" onClick={e => updateDropdownVisibility(true)}>
                        <div className="reporting-user-avatar-box">
                            <SmallAvatar image={getUserAvatar(props.card[dataType].name)} />
                            <div className="reporting-user-name" >{props.card[dataType].name}</div>
                        </div>
                    </div>
                )       
        }
    }

   

    const renderFullDropdown = (dataType) => {
        return (
            <div className={dataType}>
                {renderCurrentSelectionJSX(dataType)}
                <div className="dropdown">
                    {renderOptionsJSX(dataType)}
                </div>
            </div>
        )
    }

    const fullDropdownMenu = renderFullDropdown(dataType)
    return fullDropdownMenu
}

export default renderDropdownMenu;