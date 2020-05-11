import styled from 'styled-components';

export const IssueAddCommentsForm = styled.div `
    postion: relative;

    textarea {
        padding-left: 44px;
        border: 1px solid #e3e3e5;
        border-radius: 2px;
        overflow: hidden;
        outline: none;
        resize: none;
        background-color: #F4F5F7;
        

        &:focus {
            background-color: #FFFFFF;
            border-color: #0647A6;
        }
    }

    .save-button {
        display: ${props => props.show ? "inline-block" : "none"};
        background-color: #0647A6;
        color: white;
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
    }

    .cancel-button {
        display: ${props => props.show ? "inline-block" : "none"};
        padding: 6px;
        margin: 2px;
        border-radius: 2px;
        &:hover {
            background-color: #EBECF0;
        }
    }
`;


export const CommentsDisplay = styled.div`

`;