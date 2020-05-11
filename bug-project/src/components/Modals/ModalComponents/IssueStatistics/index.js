import React from 'react';

const IssueStatistics = props => {
    return (
        <div className="issue-statistics">
            <div className="date-created">Created at {props.issueStatistics} days ago</div>
            <div className="date-updated">Updated at {props.issueStatistics} hours ago</div>
        </div>
    )
}

export default IssueStatistics;