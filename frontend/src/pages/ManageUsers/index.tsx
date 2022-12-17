import AdminLayout from 'layouts/AdminLayout';
import { StyledManageUsers } from './styles';
import type { ColumnsType } from 'antd/es/table';

const ManageUsers = () => {
    // const []
    const columns: ColumnsType<IUser> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <AdminLayout>
            <StyledManageUsers>StyledManageUsers</StyledManageUsers>
        </AdminLayout>
    );
};

export default ManageUsers;
