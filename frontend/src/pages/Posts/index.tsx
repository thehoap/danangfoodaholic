import MainLayout from 'layouts/MainLayout';
import PostsList from 'components/Posts';
import { useSearchParams } from 'react-router-dom';
import PostCategories from 'components/PostCategories';
import { StyledPosts } from './styles';
import { Col, Row } from 'antd';

const Posts = () => {
    return (
        <MainLayout>
            <StyledPosts>
                <Row>
                    <Col span={16}>
                        <PostsList />
                    </Col>
                </Row>
            </StyledPosts>
        </MainLayout>
    );
};

export default Posts;
