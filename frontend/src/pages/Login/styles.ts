import { flexCenter } from 'constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledLogin = styled.div`
    ${flexCenter}
    height: 100vh;
    background: center / cover no-repeat
        url('https://images.foody.vn/res/g112/1110895/prof/s640x400/foody-upload-api-foody-mobile-nh-6964f243-211014112458.jpeg');
    text-align: center;

    .logo {
        margin: 0 auto;
        width: 90%;
        margin-bottom: 20px;
    }

    form {
        width: 440px;
        height: 480px;
        background-color: #fff;
        border-radius: 32px;
        margin-left: auto;
        margin-right: 80px;
        padding: 40px;

        p > a {
            color: ${COLOR.PRIMARY};
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .ant-btn {
        display: block;
        margin: 20px auto;
    }
`;
