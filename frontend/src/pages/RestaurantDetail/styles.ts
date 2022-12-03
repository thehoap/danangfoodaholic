import { flexCenter, flexSpaceBetween } from 'constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledRestaurantDetail = styled.div`
    .thumbnail {
        position: relative;
        border-radius: 32px;
        overflow: hidden;

        img {
            width: 100%;
            height: 360px;
            object-fit: cover;
        }

        .overlay {
            ${flexCenter}
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 120px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            padding: 0 32px;

            .ant-row {
                width: 100%;
                align-items: center;
            }

            .heading {
                font-size: 24px;
                font-weight: 500;
                color: ${COLOR.PRIMARY};
            }

            .description {
                display: flex;
                align-items: center;
                gap: 8px;

                &:not(:first-child) {
                    margin-top: 8px;
                }
            }

            .stats {
                ${flexCenter}
                justify-content: flex-end;
                gap: 32px;

                & > * {
                    ${flexCenter}
                    flex-direction: column;
                    width: 88px;
                    height: 88px;
                    background-color: ${COLOR.PRIMARY};
                    color: ${COLOR.WHITE};
                    font-size: 24px;
                    font-weight: 600;
                    border-radius: 12px;

                    & p {
                        font-size: 16px;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .ant-tabs-top > .ant-tabs-nav:before {
        border-color: #ddd;
    }
    .ant-tabs-nav {
        .ant-tabs-nav-wrap {
            justify-content: center;
        }
    }

    .post-view {
        display: flex;
    }
`;
