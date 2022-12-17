import MainLayout from 'layouts/MainLayout';
import PostsList from 'components/Posts';
import { StyledPosts } from './styles';
import { Col, Row } from 'antd';

const Posts = () => {
    return (
        <MainLayout>
            <StyledPosts>
                <Row>
                    <Col span={24}>
                        <PostsList />
                    </Col>
                </Row>
            </StyledPosts>
        </MainLayout>
    );
};

export default Posts;
