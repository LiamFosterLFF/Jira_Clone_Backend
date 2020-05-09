import React from 'react';
import styled from 'styled-components';

export const IssueTitleInput = styled.div`
    textarea {
        width: 100%;
        border: 1px solid transparent;
        border-radius: 2px;
        overflow: hidden;
        outline: none;
        resize: none;

        &:hover {
            background-color: #EBECF0;
        }

        &:focus {
            background-color: #FFFFFF;
            border-color: #0647A6;
        }
    }
`;
