import styled from 'styled-components';

import { flexCenter, flexSpaceBetween, rounded } from 'constants/css';
import { COLOR } from 'constants/data';

export const StyledHeader = styled.header`
    ${flexSpaceBetween}
    padding: 8px 20px;

    .nav {
        background-color: ${COLOR.PRIMARY};
        ${flexSpaceBetween}
        padding: 12px 20px;
        gap: 20px;
        border-radius: 28px;

        & .nav-link {
            display: inline-block;
            min-width: 120px;
            text-align: center;
            color: ${COLOR.WHITE};
            font-size: 20px;
            font-weight: 600;
            padding: 8px 12px;
            border-radius: 28px;

            &.active {
                color: ${COLOR.PRIMARY};
                background-color: ${COLOR.WHITE};
            }
        }
    }

    .user {
        position: relative;
        ${flexSpaceBetween}
        gap: 20px;
        padding: 6px 12px;

        &-image {
            ${rounded(60)};
        }

        &-name {
            font-weight: bold;
            font-size: 24px;
            color: ${COLOR.TEXT};
        }

        &-arrow {
            ${flexCenter}
            background-color: ${COLOR.PRIMARY};
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-left: 16px;
            border: 1px solid ${COLOR.PRIMARY};
            transition: all 0.2s linear;
            cursor: pointer;

            svg {
                width: 28px;
                height: 28px;

                path {
                    stroke: ${COLOR.WHITE};
                    stroke-width: 2.5;
                }
            }

            &:hover {
                background-color: ${COLOR.WHITE};
                path {
                    stroke: ${COLOR.PRIMARY};
                }
            }
        }

        & .ant-dropdown {
            left: 60px !important;
            top: 72px !important;

            &-menu {
                border-radius: 12px;
                min-width: 200px;
                padding: 8px 12px;

                &-item {
                    padding: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    border-radius: 12px;
                    transition: all 0.2s linear;
                    color: ${COLOR.TEXT};

                    &:not(:last-child) {
                        margin-bottom: 4px;
                    }

                    &:hover {
                        background-color: ${COLOR.PRIMARY};
                        color: ${COLOR.WHITE};

                        svg path {
                            stroke: ${COLOR.WHITE};
                        }
                    }
                }

                &-title-content a,
                p {
                    ${flexCenter}
                    justify-content: flex-start;
                    gap: 8px;
                }
            }
        }
    }
`;
