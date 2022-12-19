import { flexCenter, flexSpaceBetween, rounded } from 'constants/css';
import styled from 'styled-components';

export const StyledManageUsers = styled.div`
    td:not(:first-child) {
        p {
            transform: translateY(-28px);
        }

        svg {
            transform: translateY(-24px);
        }
    }
`;
