import MainLayout from 'layouts/MainLayout';
import PostsList from 'components/Posts';
import { StyledPosts } from './styles';
import { Col, Row } from 'antd';
import { useState } from 'react';

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    return (
        <MainLayout>
            <StyledPosts>
                <Row>
                    <Col span={24}>
                        <PostsList posts={posts} setPosts={setPosts} />
                    </Col>
                </Row>
            </StyledPosts>
        </MainLayout>
    );
};

export default Posts;
