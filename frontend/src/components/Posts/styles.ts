import { flexSpaceBetween } from './../../constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledPosts = styled.div``;

const totalWidth = 700;
const padding = 24;

export const StyledPostDetail = styled.div`
    width: ${totalWidth}px;
    background-color: #aaa;
    border-radius: 24px;
    padding: ${padding}px;

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
            div {
                ${flexSpaceBetween}
                gap: 28px;

                span {
                    ${flexSpaceBetween}
                    gap:4px;
                    cursor: pointer;
                }
            }

            .ant-tag {
                font-weight: 700;
            }
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
