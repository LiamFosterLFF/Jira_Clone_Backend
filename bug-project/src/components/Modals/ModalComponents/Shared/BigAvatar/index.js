import React from 'react';
import { BigAvatarStyling } from './styles';

const BigAvatar = (props) => {
    return (
        <BigAvatarStyling className="big-avatar" image={props.image}/> 
    )
}

export default BigAvatar;