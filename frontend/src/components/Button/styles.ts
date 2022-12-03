import { Button } from 'antd';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

const conditionalColor = (props: any) =>
    (props.type === 'primary' && COLOR.PRIMARY) ||
    (props.type === 'default' && COLOR.GREY);

export const StyledButton = styled(Button)`
    min-width: 100px;
    background-color: ${(props) => conditionalColor(props)};
    color: ${COLOR.SECONDARY};
    font-weight: 600;
    padding: 0;
    border-radius: 12px;
    border: 1px solid ${(props) => conditionalColor(props)};
    transition: all 0.2s linear;
    padding: 8px 16px;
    height: initial;

    &:focus {
        background-color: ${(props) => conditionalColor(props)};
        border: 1px solid ${(props) => conditionalColor(props)};
    }

    &:not(:disabled):hover,
    &:not(:disabled):active {
        color: ${(props) => conditionalColor(props)} !important;
        border: 1px solid ${(props) => conditionalColor(props)};
        background-color: ${COLOR.WHITE};
    }
`;
