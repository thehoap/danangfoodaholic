import {
    flexSpaceBetween,
    highlightText,
    rounded,
    flexCenter,
} from 'constants/css';
import styled from 'styled-components';

import { COLOR } from 'constants/data';

export const StyledFooter = styled.footer`
    background-color: ${COLOR.FOOTER};
    ${flexSpaceBetween}
    padding: 24px 24px;

    .information {
        ${flexSpaceBetween}
        align-items: flex-start;

        .social {
            ${flexCenter}
            gap: 12px;
            width: 100%;

            .facebook {
                ${flexCenter}
                ${rounded(40)}
                background: ${COLOR.LINEAR_PRIMARY};

                svg path {
                    stroke: ${COLOR.WHITE};
                }
            }

            span {
                font-size: 20px;
                font-weight: 600;
                ${highlightText}
            }
        }
    }

    .copyright {
        text-align: center;
        padding: 0;

        &-name {
            font-weight: bold;
            ${highlightText}
        }
    }
`;
