import {
    flexCenter,
    flexSpaceBetween,
    hiddenLongText,
    rounded,
} from 'constants/css';
import { COLOR } from 'constants/data';
import styled, { css } from 'styled-components';

export const StyledHome = styled.div`
    section {
        margin-bottom: 48px;
    }
`;

const sliderItemCSS = css`
    position: relative;
    width: 272px;
    /* height: 262px; */
    border-radius: 24px;
    z-index: 1;

    * {
        user-select: none;
    }

    .information {
        position: relative;
        text-align: left;
        background-color: ${COLOR.WHITE};
        padding: 24px;
        border-radius: 0 0 24px 24px;
        width: 100%;

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

export const StyledRestaurantSlider = styled.div`
    ${sliderItemCSS}

    .image-wrapper {
        text-align: center;
        background-color: transparent;

        img {
            display: inline-block;
            ${rounded(136)}
        }
    }

    .information {
        & > *:not(:last-child) {
            margin-bottom: 8px;
        }

        h4 {
            width: 100%;
            ${hiddenLongText(1)}

            a {
                color: ${COLOR.PRIMARY};
                font-weight: 600;
                font-size: 16px;
            }
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
    }
`;

export const StyledPostSlider = styled.div`
    ${sliderItemCSS}

    .image-wrapper {
        background-color: transparent;
        ${flexSpaceBetween}

        img {
            margin-left: 20px;
            display: inline-block;
            ${rounded(136)}
        }

        & > span {
            ${flexSpaceBetween}
            gap:8px;
            transform: translate(-100%, 200%);
            z-index: 1;
        }
    }

    .information {
        & > p {
            margin: 16px 0;
            height: 72px;
            width: 100%;
            ${hiddenLongText(3)}
        }

        & > div {
            display: flex;
            align-items: center;
            justify-content: right;
            gap: 20px;

            & > span {
                ${flexSpaceBetween}
                gap: 8px;
            }
        }
    }
`;
