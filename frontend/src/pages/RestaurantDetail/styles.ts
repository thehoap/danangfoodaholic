import styled from 'styled-components';

export const StyledRestaurantDetail = styled.div`
    .thumbnail {
        position: relative;
        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100px;
            /* background-color: red; */
            background: rgba(255, 255, 255, 0.6);
            /* Glass Card */

            backdrop-filter: blur(21px);
        }
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
