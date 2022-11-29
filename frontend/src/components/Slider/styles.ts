import { Carousel } from 'antd';
import styled from 'styled-components';

export const StyledSlider = styled(Carousel)`
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;
