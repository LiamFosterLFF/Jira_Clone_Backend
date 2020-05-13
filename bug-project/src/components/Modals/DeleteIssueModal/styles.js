import styled from 'styled-components';

export const DeleteModalBackdrop = styled.div`
    display: ${props => props.modalIsOpen ? "inherit" : "none"};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`;

export const DeleteModalBox = styled.div`
    background-color: #fefefe;
    margin: 8% auto;
    padding: 15px;
    border: 1px solid #888;
    width: 55%;
    height: 65%;
    font-size: 12px;
`;

export const DeleteModalContent = styled.div`
    position: relative;
    top: 0;
    .left-column {
        height: 100%;
        width: 70%;
        display: inline-block;
    }
    .right-column {
        width: 20%;
        display: inline-block;
    }
`;
