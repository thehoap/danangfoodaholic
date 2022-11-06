import { StyledPagination } from './styles';
import { PaginationProps } from 'antd';

interface IPagination extends PaginationProps {}

const Pagination = ({ ...props }: IPagination) => {
    return <StyledPagination showSizeChanger={false} {...props} />;
};

export default Pagination;
