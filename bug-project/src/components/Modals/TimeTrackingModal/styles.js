import styled from 'styled-components';

export const TimeTrackingModalBackdrop = styled.div`
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

export const TimeTrackingModalBox = styled.div`
    background-color: #fefefe;
    margin: 8% auto;
    padding: 15px;
    border: 1px solid #888;
    width: 55%;
    height: 65%;
    font-size: 12px;
`;

// export const TimeTrackingModalContent = styled.div`
//     position: relative;
//     top: 0;
//     .left-column {
//         height: 100%;
//         width: 70%;
//         display: inline-block;
//     }
//     .right-column {
//         width: 20%;
//         display: inline-block;
//     }
// `;


export const TimeInput = styled.div `
    input {
        background: #e8e8e8;
        -webkit-appearance: none;
        border: 1px solid #ccc;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &:hover {
            background: #fff;
            border: 1px solid #0647A6;
        }
    }
`;

export const TimeTracking = styled.div`
    .progress-bar-grey {
        height: 10px;
        width: 100%;
        background-color: #ccc;
        .progress-bar-blue {
            height: 100%; 
            width: ${props => props.logged/props.estimated * 100}%;
            background-color: #0647A6;
        }
    }
`;