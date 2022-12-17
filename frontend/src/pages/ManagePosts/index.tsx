import type { ColumnsType } from 'antd/es/table';
import { Dropdown, Menu, Row, Typography } from 'antd';
import AdminLayout from 'layouts/AdminLayout';
import { StyledManagePosts } from './styles';
import { useLazyGetPostsQuery } from 'services/postAPI';
import { useEffect, useState } from 'react';
import { ImagesPreview1 } from 'components/ImagesPreview';
import { Comment, Heart, More } from 'assets/icons';
import Table from 'components/Table';
import dayjs from 'dayjs';
import useUploadFacebook from 'hooks/useUploadFacebook';
import { getReviewedRestaurant } from 'redux/slices/restaurantSlice';
import { useAppDispatch } from 'redux/hooks';

const ManagePosts = () => {
    const appDispatch = useAppDispatch();

    const [getPosts, { data: posts }] = useLazyGetPostsQuery();

    const [postFacebook, setPostFacebook] = useState<IPost>();
    const [isReady, setIsReady] = useState<boolean>(false);

    useUploadFacebook(postFacebook, postFacebook?.images || [], isReady);

    const columns: ColumnsType<IPost> = [
        {
            title: 'Content',
            key: 'content',
            render: (_, record) => {
                const { images, content } = record;
                return (
                    <Row className="content">
                        <div>
                            <ImagesPreview1 images={images} width={200} />
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: content }} />
                    </Row>
                );
            },
        },
        {
            title: 'User',
            dataIndex: '_user',
            key: 'user',
            render: (_: any, record: IPost) => (
                <Row className="user">
                    <img src={record?.user?.image} alt="" />
                    <p>{record?.user?.name}</p>
                </Row>
            ),
        },
        {
            title: 'Restaurant',
            key: 'restaurant',
            render: (_, record: any) => <p>{record?.restaurantId?.name}</p>,
        },
        {
            title: 'Rating',
            key: 'restaurant',
            render: (_, record) => <>{record?.ratings?.average}</>,
        },
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'createAt',
            render: (_, record) => {
                const dateObj = new Date(record?.createdAt ?? '');
                return <>{dayjs(dateObj).format('DD/MM/YYYY')}</>;
            },
        },
        {
            title: 'Interations',
            key: 'interations',
            render: (_, record) => (
                <Row className="interactions">
                    <span>
                        {record?.likes?.length} <Heart />
                    </span>
                    <span>
                        {record?.comments?.length} <Comment />{' '}
                    </span>
                </Row>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu
                            items={[
                                {
                                    label: (
                                        <span
                                            onClick={() => {
                                                setIsReady(true);
                                                setPostFacebook(record);
                                                appDispatch(
                                                    getReviewedRestaurant(
                                                        record.restaurantId
                                                    )
                                                );
                                            }}
                                        >
                                            Upload to Facebook
                                        </span>
                                    ),
                                    key: 'upload-facebook',
                                },
                                {
                                    label: <span>Delete</span>,
                                    key: 'delete',
                                },
                            ]}
                        />
                    }
                    trigger={['click']}
                    placement="bottomCenter"
                >
                    <More />
                </Dropdown>
            ),
        },
    ];

    useEffect(() => {
        getPosts({ page: 1, limit: 20 });
    }, []);
    return (
        <AdminLayout>
            <StyledManagePosts>
                <Table
                    columns={columns}
                    dataSource={posts?.data.docs}
                    rowKey={({ id }) => id}
                />
            </StyledManagePosts>
        </AdminLayout>
    );
};

export default ManagePosts;
