import styled from 'styled-components';

export const BigAvatarStyling = styled.div`
    background-image: url(${ props => props.image });
    background-size: cover; 
    width: 24px; 
    height: 24px; 
    display: block;
    border-radius: 100%;
`;