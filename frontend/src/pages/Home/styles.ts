import { flexSpaceBetween, rounded } from 'constants/css';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledHome = styled.div`
    section {
        margin-bottom: 48px;
    }
`;

export const StyledRestaurantSlider = styled.div`
    position: relative;
    width: 272px;
    /* height: 262px; */
    border-radius: 24px;
    z-index: 1;

    .image-wrapper {
        text-align: center;
        background-color: transparent;

        img {
            display: inline-block;
            ${rounded(
                136
            )}/* box-shadow: rgba(17, 12, 46, 0.15) 0px 20px 100px 0px; */
        }
    }

    .information {
        position: relative;
        text-align: left;
        background-color: ${COLOR.WHITE};
        padding: 24px;
        border-radius: 0 0 24px 24px;
        width: 100%;

        & > *:not(:last-child) {
            margin-bottom: 8px;
        }

        h4 {
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        div {
            ${flexSpaceBetween}
            .status {
                ${rounded(12)}

                &.online {
                    background-color: #87d068;
                }
                &.offline {
                    background-color: #cd201f;
                }
            }
        }

        &::before {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            width: 100%;
            height: 68px;
            background-color: ${COLOR.WHITE};
            border-radius: 24px 24px 0 0;
            z-index: -1;
        }
    }
`;
