import { hiddenLongText, rounded } from 'constants/css';
import { COLOR } from 'constants/data';
import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';

export const StyledCreatePost = styled.div`
    .ant-form > .ant-row {
        justify-content: center;
        & > .ant-col {
            padding: 24px;
            border-radius: 24px;
            background-color: ${COLOR.WHITE};
        }

        .btns {
            justify-content: center;
            gap: 12px;
            margin-top: 24px;
        }
    }

    textarea {
        height: 160px;
    }
`;

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
            ${hiddenLongText(1)}
        }
    }
`;

export const StyledRadar = styled(Radar)`
    background-color: ${COLOR.WHITE};
    border-radius: 24px;
    margin-bottom: 24px;
    font-size: 16px;
`;
