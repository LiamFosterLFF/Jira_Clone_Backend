import React from 'react';
import { SmallAvatarStyling } from './styles';

const SmallAvatar = (props) => {
    return (
        <SmallAvatarStyling className="small-avatar" image={props.image}/> 
    )
}

export default SmallAvatar;