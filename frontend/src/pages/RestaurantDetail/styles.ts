import styled from 'styled-components';

export const StyledRestaurantDetail = styled.div`
    .thumbnail {
        position: relative;
        img {
            width: 100%;
            height: 240px;
            object-fit: cover;
        }

        .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            padding: 16px;
        }
    }

    .ant-tabs-top > .ant-tabs-nav:before {
        border-color: #ddd;
    }
    .ant-tabs-nav {
        .ant-tabs-nav-wrap {
            justify-content: center;
        }
    }

    .post-view {
        display: flex;
    }
`;
