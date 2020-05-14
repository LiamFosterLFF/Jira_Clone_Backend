import React from 'react';

const IssueStatistics = props => {

    const createdMsAgo = (new Date() - Date.parse(props.dateCreated))
    const createdDaysAgo = Math.floor(createdMsAgo / (1000 * 60 * 60 * 24))

    const updatedMsAgo = (new Date() - Date.parse(props.dateCreated))
    const updatedHrAgo = Math.floor(updatedMsAgo / (1000 * 60 * 60))
    
    return (
        <div className="issue-statistics">
            <div className="date-created">Created at {createdDaysAgo} days ago</div>
            <div className="date-updated">Updated at {updatedHrAgo} hours ago</div>
        </div>
    )
}

export default IssueStatistics;