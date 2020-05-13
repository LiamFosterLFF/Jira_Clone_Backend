import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteButtonStyling } from './styles';

const DeleteButton = (props) => {
    return (
        <DeleteButtonStyling onClick={props.onClick}>
            <FontAwesomeIcon 
                icon={faTrashAlt}
                className="close-button"
            />
        </DeleteButtonStyling>
    )
}

export default DeleteButton;

