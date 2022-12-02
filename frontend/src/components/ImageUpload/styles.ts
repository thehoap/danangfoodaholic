import { rounded } from './../../constants/css';
import styled from 'styled-components';

const size = 100;
export const StyledImageUpload = styled.div`
    text-align: center;

    img {
        display: inline-block;
        ${rounded(size)}
        cursor: pointer;
    }
    button {
        text-align: center;
    }
`;
