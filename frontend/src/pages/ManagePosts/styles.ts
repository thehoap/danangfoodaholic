import { flexSpaceBetween, rounded } from 'constants/css';
import styled from 'styled-components';

export const StyledManagePosts = styled.div`
    .ant-row {
        flex-wrap: nowrap;
        gap: 12px;

        &.user {
            align-items: center;
            img {
                ${rounded(48)}
            }
        }

        &.interactions {
            span {
                ${flexSpaceBetween}
                gap: 4px;
            }
        }
    }
`;
