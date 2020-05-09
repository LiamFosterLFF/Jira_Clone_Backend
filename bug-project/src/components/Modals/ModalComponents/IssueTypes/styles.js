import React from 'react';
import styled from 'styled-components';


export const IssueTypesDropdown = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgb(94, 108, 132);


    svg {
        &[data-icon='exclamation-circle'] {
            color: red;
        }
        &[data-icon='bookmark'] {
            color: green;
        }
        &[data-icon='check-square'] {
            color: blue;
        }
    }

    .issue-type-text {
        display: inline-block;
        padding: 2px 5px;
    }

    .current-type {
        padding: 5px;
        border-radius: 2px;
        &:hover {
            background-color: #EBECF0;
            cursor: pointer;
        }
    }

    .dropdown {
        display: ${props => props.showDropdown ? "block" : "none"};
        position: absolute;
        border: 1px solid #f1f1f1;
        border-radius: 2px;
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
