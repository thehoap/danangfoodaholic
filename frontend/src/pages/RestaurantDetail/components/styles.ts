import { flexSpaceBetween, rounded } from 'constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledCreatePost = styled.div``;

export const StyledRecommend = styled.div`
    .ant-form-item-control-input-content {
        display: flex;
        gap: 20px;

        .option {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            width: 100px;
            cursor: pointer;

            span {
                color: ${COLOR.TEXT};
                font-size: 18px;
                font-weight: 500;
            }

            &.active {
                svg {
                    fill: ${COLOR.WHITE};
                    path {
                        stroke: ${COLOR.PRIMARY};
                    }
                }

                span {
                    color: ${COLOR.PRIMARY};
                }
            }
        }

        .ant-radio {
            display: none;
        }
    }
`;

export const StyledMenu = styled.div`
    background-color: ${COLOR.WHITE};
    padding: 24px;
    border-radius: 24px;
`;

export const StyledMenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    margin-bottom: 16px;

    img {
        ${rounded(100)}
        z-index: 1;
    }

    div {
        flex-grow: 1;
        background-color: ${COLOR.SECONDARY};
        padding: 12px;
        border-radius: 0 16px 16px 0;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            right: 100%;
            top: 0;
            bottom: 0;
            width: 25%;
            height: 100%;
            background-color: inherit;
            z-index: 0;
        }

        p {
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }
`;
