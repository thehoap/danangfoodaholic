import { css } from 'styled-components';
import { COLOR } from './data';

export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const flexSpaceBetween = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const rounded = (size: number) =>
    css`
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        object-fit: cover;
    `;

export const highlightText = css`
    background: ${COLOR.LINEAR_PRIMARY};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const hiddenLongText = (line: number) => css`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: ${line};
    line-clamp: ${line};
    -webkit-box-orient: vertical;
`;
