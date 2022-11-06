import styled from 'styled-components';

import { flexSpaceBetween, rounded } from 'constants/css';
import { COLOR } from 'constants/data';

export const StyledHeader = styled.header`
    ${flexSpaceBetween}

    .nav {
        background: ${COLOR.LINEAR_PRIMARY};
        ${flexSpaceBetween}
        padding: 12px;
        border-radius: 28px;

        & .nav-link {
            display: inline-block;
            min-width: 120px;
            text-align: center;
            color: ${COLOR.TEXT};
            padding: 8px 12px;
            border-radius: 28px;

            &.active {
                background-color: ${COLOR.WHITE};
            }
        }
    }

    .user {
        ${flexSpaceBetween}
        gap: 20px;
        padding: 6px 12px;
        cursor: pointer;

        &:hover {
            background: ${COLOR.LINEAR_PRIMARY};
        }

        &-image {
            ${rounded(68)};
        }

        &-name {
            font-weight: bold;
            font-size: 24px;
            color: ${COLOR.TEXT};
        }
    }
`;
