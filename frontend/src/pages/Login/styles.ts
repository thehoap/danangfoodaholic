import { flexCenter } from 'constants/css';
import styled from 'styled-components';

export const StyledLogin = styled.div`
    ${flexCenter}
    height: 100vh;

    form {
        width: 536px;
        height: 500px;
        background-color: #e7d2d2;
        border-radius: 60px;
    }

    .ant-btn {
        display: block;
    }
`;
