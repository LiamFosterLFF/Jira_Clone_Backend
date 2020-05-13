import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IssueOriginalTimeEstimateInput, TimeTracking} from './styles';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

const IssueOriginalTimeEstimate = (props) => {
    return (
        <div >
            <IssueOriginalTimeEstimateInput >
                <div className="original-estimate-text">Original Estimate (hours):</div> 
                <input value={props.estimatedTime} onChange={e => props.updateCard("issueEstimatedTime", e.target.value)}></input>
            </IssueOriginalTimeEstimateInput>
            <TimeTracking logged={1} estimated={props.estimatedTime} >
                <FontAwesomeIcon icon={faStopwatch} />
                <div className="progress-bar-grey" onClick={props.onClick}>
                    <div className="progress-bar-blue"></div>
                </div>
                <div className="time-tracking-text">
                    Time Tracking: 1h logged/6h estimated
                </div>
            </TimeTracking>
        </div>
    )
}

export default IssueOriginalTimeEstimate;