import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledPostCategories = styled.div`
    background-color: ${COLOR.WHITE};
    padding: 24px;
    border-radius: 24px;
`;

export const StyledPostCategory = styled.div`
    display: inline-block;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 16px;
    margin-right: 16px;
    margin-bottom: 16px;
    color: ${COLOR.PRIMARY};
    border: 1px solid ${COLOR.PRIMARY};
    cursor: pointer;
    transition: all 0.2s linear;

    &.active,
    &:hover {
        background-color: ${COLOR.PRIMARY};
        color: ${COLOR.WHITE};
    }

    &.active {
    }
`;
