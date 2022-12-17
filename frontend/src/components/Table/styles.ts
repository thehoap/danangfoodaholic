import { Table } from 'antd';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
    .ant-pagination-item-link,
    .ant-pagination-item {
        &:hover,
        &-active {
            border-color: ${COLOR.PRIMARY};

            .anticon,
            a {
                color: ${COLOR.PRIMARY};
            }
        }
    }
`;
