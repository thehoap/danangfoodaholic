import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledPosts = styled.div``;

export const StyledPostDetail = styled.div`
    width: 100%;

    .like-icon {
        &.active {
            fill: ${COLOR.PRIMARY};
        }
    }
`;
