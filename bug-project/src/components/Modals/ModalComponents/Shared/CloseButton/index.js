import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CloseButtonStyling } from './styles';
const CloseButton = props => {
    return (
        <CloseButtonStyling onClick={props.onClick} className="close-button">
            <FontAwesomeIcon icon={faTimesCircle} />
        </CloseButtonStyling>
    )
}

export default CloseButton;