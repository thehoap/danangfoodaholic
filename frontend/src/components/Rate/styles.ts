import styled from 'styled-components';
import { getDecimal } from 'utils/caculate';

interface IStyledRate {
    exactValue: number;
}

export const StyledRate = styled.div<IStyledRate>`
    .ant-rate-star-first {
        width: ${(props) => getDecimal(props.exactValue || 0)}%;
    }
`;
