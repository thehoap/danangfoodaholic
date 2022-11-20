import { rounded } from 'constants/css';
import styled from 'styled-components';

export const StyledProfile = styled.div`
    display: inline-flex;
    align-items: flex-start;
    justify-content: space-between;
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
