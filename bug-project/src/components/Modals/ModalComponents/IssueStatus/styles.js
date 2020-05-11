import styled from 'styled-components'

export const IssueStatusDropdown = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .status-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        &[data-status-type="selected for development"] {
            background-color: #EBECF0;
            color: rgb(94, 108, 132);
        }
        &[data-status-type="in progress"] {
            background-color: blue;
            color: white;
        }
        &[data-status-type="backlog"] {
            background-color: #EBECF0;
            color: rgb(94, 108, 132);
        }
        &[data-status-type="done"] {
            background-color: green;
            color: white;
        }
    }

    .current-type {
        &:hover {
            transform: scale(1.04);
        }
    }

    .dropdown {
        display: ${props => props.showDropdown ? "block" : "none"};
        position: absolute;
        background-color: #ffffff;
        min-width: 80px;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.15);
        z-index: 1;

        .option {
            width: 100%;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;