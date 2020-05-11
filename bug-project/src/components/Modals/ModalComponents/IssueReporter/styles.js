import styled from 'styled-components';


export const IssueReporterDropdown = styled.div`
    font-size: 10px;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);
    font-family: CircularStdBold;
    
    .priority-type-icon-box svg {
        &[data-priority-type="Highest"] {
            color: darkred;
        }
        &[data-priority-type="High"] {
            color: red;
        }
        &[data-priority-type="Medium"] {
            color: orange;
        }
        &[data-priority-type="Low"] {
            color: green;
        }
        &[data-priority-type="Lowest"] {
            color: darkgreen;
        }
    }

    .priority-type-text {
        padding: 5px;
        display: inline-block;
        border-radius: 3px;
        margin: 2px;
        
    }

    .current-type {
        display: inline-block;
        border-radius: 3px;
        padding: 2px;
        &:hover {
            background-color: #EBECF0;
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
            display: inline-block;
            cursor: pointer;
            &:hover {
                background-color: #D3E5FE;
            }
        }
    }
`;