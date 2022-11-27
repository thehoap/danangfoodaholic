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
    text-transform: capitalize;
    padding: 0;
    border-radius: 12px;
    border: 1px solid ${(props) => conditionalColor(props)};
    transition: all 0.2s linear;

    &:hover,
    &:active {
        color: ${(props) => conditionalColor(props)} !important;
        border: 1px solid ${(props) => conditionalColor(props)};
        background-color: ${COLOR.WHITE};
    }
`;
