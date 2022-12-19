import AdminLayout from 'layouts/AdminLayout';
import { StyledManageUsers } from './styles';
import type { ColumnsType } from 'antd/es/table';
import {
    useDeleteUserMutation,
    useLazyGetUsersQuery,
    useUpdateUserMutation,
} from 'services/userAPI';
import { useEffect, useState } from 'react';
import Table from 'components/Table';
import Profile from 'components/Profile';
import { Col, Dropdown, Form, Menu, Modal, Row, Typography } from 'antd';
import { Email, MoreHoriz, Password, User } from 'assets/icons';
import Button from 'components/Button';
import { useFormik } from 'formik';
import { useUploadImagesMutation } from 'services/authAPI';
import ImageUpload from 'components/ImageUpload';
import Input from 'components/Input';

const ManageUsers = () => {
    const [getUsers, { data: users }] = useLazyGetUsersQuery();
    const [updateUser, { isLoading: isLoadingUpdateUser }] =
        useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [
        uploadImages,
        { data: dataImages, isLoading: isLoadingUploadImages },
    ] = useUploadImagesMutation();

    useEffect(() => {
        getUsers({});
    }, []);

    const initialValues = {
        id: '',
        image: '',
        name: '',
        email: '',
        password: '',
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        // validationSchema,
        onSubmit: async (values: IRegister) => {
            if (images) {
                values.image = await uploadImages(images)
                    .then((res: any) => {
                        return res.data[0];
                    })
                    .catch((error: IError) => {
                        setError(error.data.meta.message);
                    });
            }
            updateUser(values);
        },
    });

    const [error, setError] = useState<string>('');
    const [images, setImages] = useState<FormData>();
    const columns: ColumnsType<IUser> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Profile image={record.image} size={52} title={record.name} />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (email) => <p>{email}</p>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            render: (role) => <p>{role}</p>,
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu
                            items={[
                                {
                                    label: (
                                        <span
                                            onClick={() => handleUpdate(record)}
                                        >
                                            Update
                                        </span>
                                    ),
                                    key: 'update',
                                },
                                ...(record.role !== 'ADMIN'
                                    ? [
                                          {
                                              label: (
                                                  <span
                                                      onClick={() =>
                                                          handleDelete(
                                                              record.id
                                                          )
                                                      }
                                                  >
                                                      Delete
                                                  </span>
                                              ),
                                              key: 'delete',
                                          },
                                      ]
                                    : []),
                            ]}
                        />
                    }
                    trigger={['click']}
                    placement="bottomCenter"
                >
                    <MoreHoriz />
                </Dropdown>
            ),
        },
    ];

    const handleUpdate = (record: IUser) => {
        formik.setValues({
            id: record.id,
            image: record.image,
            name: record.name,
            email: record.email,
            password: record.password,
        });
        Modal.confirm({
            title: 'Update User',
            icon: <></>,
            centered: true,
            content: (
                <Form layout="vertical" onFinish={formik.handleSubmit}>
                    <ImageUpload
                        label=""
                        setImages={setImages}
                        imageUrl={record.image}
                    />
                    <Input
                        label="Username"
                        name="name"
                        formik={formik}
                        defaultValue={record.name}
                        onChange={formik.handleChange}
                        prefix={<User />}
                    />

                    <Input
                        label="Email"
                        name="email"
                        formik={formik}
                        defaultValue={record.email}
                        onChange={formik.handleChange}
                        autoComplete="off"
                        prefix={<Email />}
                    />

                    {error && (
                        <Typography.Text type="danger">{error}</Typography.Text>
                    )}
                </Form>
            ),
            onOk: () => {
                formik.submitForm();
            },
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Update User',
            icon: <></>,
            centered: true,
            content: 'Do you want to delete this user?',
            onOk: () => {
                deleteUser(id);
            },
        });
    };

    return (
        <AdminLayout>
            <StyledManageUsers>
                <Table
                    columns={columns}
                    dataSource={users?.data.docs}
                    rowKey={({ id }) => id}
                />
            </StyledManageUsers>
        </AdminLayout>
    );
};

export default ManageUsers;
