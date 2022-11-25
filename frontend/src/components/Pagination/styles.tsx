import { Pagination } from 'antd';
import { COLOR } from 'constants/data';
import styled from 'styled-components';

export const StyledPagination = styled(Pagination)`
    /* width: 100%; */
    text-align: center;
    margin-top: 40px;
    font-size: 16px;

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
