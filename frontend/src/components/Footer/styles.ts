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
    padding-bottom: 24px;

    .information {
        padding: 48px 150px 0;
        ${flexSpaceBetween}
        align-items: flex-start;

        .social {
            max-width: 286px;
            width: 100%;
            text-align: center;

            .facebook {
                ${flexCenter}
                ${rounded(50)}
                background: ${COLOR.LINEAR_PRIMARY};

                svg path {
                    stroke: ${COLOR.WHITE};
                }
            }
        }
    }

    .services {
        ${flexSpaceBetween}
        align-items: flex-start;
        flex-direction: column;

        &-heading {
            text-transform: uppercase;
            font-weight: bold;
        }

        &-list {
            & li a {
                color: ${COLOR.TEXT};

                &:hover {
                    ${highlightText}
                }
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
