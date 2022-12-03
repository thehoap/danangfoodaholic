import { rounded } from 'constants/css';
import styled from 'styled-components';

interface IStyledProfile {
    size: number;
}

export const StyledProfile = styled.div<IStyledProfile>`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .profile {
        &-image {
            ${({ size }) => rounded(size)}
        }

        &-information {
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: left;
        }

        &-title {
            font-size: 20px;
            font-weight: bold;
        }

        &-description {
            font-size: 12px;
            opacity: 0.8;
        }
    }
`;
