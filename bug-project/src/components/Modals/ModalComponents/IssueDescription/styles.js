import styled from 'styled-components';


export const IssueDescriptionBox = styled.div`
    
    .save-button {
        display: ${props => props.show? "inline-block": "none"};
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

    .ql-toolbar {
        display: ${props => props.show ? "1px solid #ccc" : "none"};
        border-bottom: none;
    }

    .ql-container {
        border: ${props => props.show ? "1px solid #ccc" : "none"};
        border-top: none;
    }
`;
