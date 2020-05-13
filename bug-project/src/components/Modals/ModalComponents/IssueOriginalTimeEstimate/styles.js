import styled from 'styled-components';

export const IssueOriginalTimeEstimateInput = styled.div `
    input {
        background: #e8e8e8;
        -webkit-appearance: none;
        border: 1px solid #ccc;
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

