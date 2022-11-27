import { flexSpaceBetween } from './../../constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledPosts = styled.div``;

export const StyledPostDetail = styled.div`
    background-color: ${COLOR.WHITE};
    border-radius: 24px;
    padding: 24px;
    margin-bottom: 24px;

    .section {
        ${flexSpaceBetween}
        margin-bottom: 20px;

        &-header {
            & > div {
                ${flexSpaceBetween}
                gap:16px;
            }
        }

        &-image {
            img {
            }
        }

        &-interaction {
            justify-content: flex-start;
            gap: 28px;

            span {
                ${flexSpaceBetween}
                gap:4px;
                cursor: pointer;
            }

            .ant-tag {
                font-weight: 700;
            }
        }

        &-hashtag {
            justify-content: flex-start;
        }
    }

    .like-icon {
        &.active {
            fill: ${COLOR.PRIMARY};
        }
    }

    .comment-box {
        .comment-preview {
            display: block;
            margin-bottom: 12px;
        }

        .profile {
            width: 100%;
            align-items: flex-start;

            &-information {
                width: 100%;
            }
        }

        .ant-comment-content-author-name {
            font-weight: 600;
            font-size: 16px;
        }
    }
`;
