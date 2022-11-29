import MainLayout from 'layouts/MainLayout';
import PostsList from 'components/Posts';
import { useSearchParams } from 'react-router-dom';
import PostCategories from 'components/PostCategories';
import { StyledPosts } from './styles';
import { Col, Row } from 'antd';

const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const hashtag = searchParams.get('hashtag');

    const hashtags = [
        'LO2jZirB',
        'W6JscPdX',
        'MAOCxXW5',
        '7rMIIm2J',
        'h3z5AlqF',
        'EYpufHL2',
        'wle133yg',
        'TKaCHQfZ',
        '2gqXOhNl',
        'TP37AO9A',
        'KElYB9QE',
        '5fJbhK8C',
        'AA11DY6x',
        'ODxRDgnk',
        'RCq4Y17k',
        'x4lOTCvP',
        'Lc0vsq0X',
        '2vIIp7dp',
        'jWOp2EHU',
        '7JZtOxMc',
        '9MHr9au5',
        '38n0A2Bs',
        'zEAhpKkC',
        'SYv2Fd9b',
        'fjG3rzDz',
        'eEdE8Zvz',
        '69bbAf85',
        '46b1L8bX',
        'YhayjvcS',
    ];

    return (
        <MainLayout>
            <StyledPosts>
                <PostsList />
            </StyledPosts>
        </MainLayout>
    );
};

export default Posts;
