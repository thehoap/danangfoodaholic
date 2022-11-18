import { flexCenter, rounded } from 'constants/css';
import styled from 'styled-components';

export const StyledProfile = styled.div`
    ${flexCenter}
    display: inline-flex;
    gap: 12px;

    .profile {
        &-image {
            ${rounded(48)}
        }

        &-title {
            font-size: 20px;
            font-weight: bold;
        }

        &-description {
            font-size: 12px;
            opacity: 0.8;
        }
    }
`;
