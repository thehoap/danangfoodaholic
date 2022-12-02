import styled from 'styled-components';
import error from 'assets/images/404Error.png';
import { COLOR } from 'constants/data';

export const StyledError = styled.div`
    background: url(${error}) center no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: relative;

    .ant-btn {
        position: absolute;
        bottom: 32%;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
    }
`;
