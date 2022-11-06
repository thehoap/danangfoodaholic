import styled from 'styled-components';
import { Card } from 'antd';

export const StyledRestaurant = styled(Card)`
    display: inline-block;
    position: relative;
    /* width: 300px; */
    cursor: pointer;

    .ant-tag {
        position: absolute;
        top: 8px;
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

    .ant-card-meta-description {
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
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
`;
