import { highlightText } from 'constants/css';
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
