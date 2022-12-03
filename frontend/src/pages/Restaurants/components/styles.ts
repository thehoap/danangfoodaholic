import { flexCenter, hiddenLongText } from 'constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';
import { Card } from 'antd';

export const StyledRestaurantCard = styled(Card)`
    display: inline-block;
    position: relative;
    border-radius: 20px !important;
    overflow: hidden;

    .ant-tag {
        position: absolute;
        top: 20px;
        right: -12px;

        &::before {
            content: '';
            position: absolute;
            bottom: 100%;
            right: -1px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 8px 0 0 8px;
            border-color: transparent transparent transparent #d9d9d9;
            z-index: -1;
        }
    }

    .ant-card-cover {
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    .ant-card-meta {
        &-title {
            p {
                width: 100%;
                ${hiddenLongText(1)}
            }
            cursor: pointer;
        }

        &-description {
            & > p {
                display: flex;
                align-items: flex-start;
                gap: 8px;

                &:not(:last-child) {
                    margin-bottom: 4px;
                }

                svg {
                    /* width: 32px; */
                    flex-grow: 1;
                }

                span {
                    display: inline-block;
                    width: 85%;
                    line-height: 24px;
                    overflow: hidden;
                    ${hiddenLongText(2)}

                    &.time {
                        -webkit-line-clamp: 1;
                        line-clamp: 1;
                    }
                }
            }
        }
    }

    .ant-card-actions {
        & li {
            margin: 0;
        }

        & span {
            line-height: 0;
        }

        & svg {
            padding: 4px 0;
            height: 32px;
            /* width: 100%; */
        }

        .action {
            ${flexCenter}
            gap:8px;
            padding: 4px 0;

            &:hover > * {
                color: ${COLOR.PRIMARY};
                path {
                    stroke: ${COLOR.PRIMARY};
                }
            }
        }
    }

    .ant-skeleton {
        .ant-skeleton-image {
            width: 100%;
        }
    }
`;

export const StyledRestaurantFilter = styled.div`
    .ant-select .ant-select-selector,
    .ant-select-dropdown,
    .ant-input {
        border-radius: 12px;
    }

    .ant-row {
        align-items: center;

        .ant-form-item {
            margin-bottom: 0;
        }
    }
`;
