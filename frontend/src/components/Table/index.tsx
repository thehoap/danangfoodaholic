import { TableProps } from 'antd';
import { StyledTable } from './styles';

const Table = ({ ...props }: TableProps<any>) => {
    return (
        <StyledTable {...props} pagination={{ position: ['bottomCenter'] }} />
    );
};

export default Table;
