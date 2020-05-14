import styled from 'styled-components';

export const CreateIssueModalBackdrop= styled.div`
display: ${props => props.modalIsOpen ? "inherit" : "none"};
position: fixed;
z-index: 1000;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
    .modal-box {
        background-color: #fefefe;
        margin: 8% auto;
        padding: 15px;
        border: 1px solid #888;
        width: 55%;
        height: 65%;
        font-size: 12px;
    }
`;

