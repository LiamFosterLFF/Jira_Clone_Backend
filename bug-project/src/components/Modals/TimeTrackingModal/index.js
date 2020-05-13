import React, {useState, useEffect, useRef} from 'react';
import { TimeTrackingModalBackdrop, TimeTrackingModalBox, TimeInput, TimeTracking } from './styles';
import CloseButton from '../ModalComponents/Shared/CloseButton';

const TimeTrackingModal = (props) => {
    const [timeLogged, setTimeLogged] = useState(props.timeLogged)
    const [timeRemaining, setTimeRemaining] = useState((props.estimatedTime > 0) ? (props.estimatedTime - timeLogged): 0)

    const modalBox = useRef()
    const handleOutsideClick = (e) => {
        if (!modalBox.current.contains(e.target)) {
            props.closeModal()
        }
    }

    useEffect(() => {
        setTimeRemaining((props.estimatedTime > 0) ? (props.estimatedTime - timeLogged): 0)
    }, [props.estimatedTime])

    const validateLoggedNumber = (e) => {
        if (e.target.value < 10000 && e.target.value > 0 && e.target.value < props.estimatedTime) {
            props.updateCard("issueTimeLogged", (e.target.value))
            setTimeLogged(e.target.value)
        }
    }

    const validateRemainingNumber = (e) => {
        if (e.target.value < 10000 && e.target.value > 0) {
            props.updateCard("issueEstimatedTime", (Number(timeLogged) + Number(e.target.value)))
        }
    }

    return (
        <TimeTrackingModalBackdrop modalIsOpen={props.modalIsOpen} onMouseDown={(e) => handleOutsideClick(e)}>
            <TimeTrackingModalBox ref={modalBox} >
                <CloseButton onClick={props.closeModal} /> 
                <TimeTracking logged={timeLogged} estimated={props.estimatedTime} >
                    <div className="progress-bar-grey">
                        <div className="progress-bar-blue"></div>
                    </div>
                    <div className="time-tracking-text">
                        Time Tracking: 1h logged/6h estimated
                    </div>
                </TimeTracking>
                <TimeInput>
                    <div className="time-spent">Time Spent (hours):</div> 
                    <input value={timeLogged} type="number" onChange={e => validateLoggedNumber(e)}></input>
                </TimeInput>
                <TimeInput>
                    <div className="time-remaining">Time Remaining (hours):</div> 
                    <input defaultValue="Number" value={timeRemaining} type="number" onChange={e => validateRemainingNumber(e)}></input>
                </TimeInput>
            </TimeTrackingModalBox>
        </TimeTrackingModalBackdrop>
    )
}

export default TimeTrackingModal;