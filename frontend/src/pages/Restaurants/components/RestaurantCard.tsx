import { Card, Skeleton, Tag } from 'antd';

import { Post, Location, Timer, View } from 'assets/icons';
import { TAB } from 'constants/data';
import { PATH } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import { StyledRestaurantCard } from './styles';

interface IRestaurantCard {
    restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: IRestaurantCard) => {
    const navigate = useNavigate();

    const { id, image, name, type, address, time } = restaurant;

    const description = (
        <>
            <p title={address} onClick={(e) => e.stopPropagation()}>
                <Location />
                <span>{address}</span>
            </p>
            <p onClick={(e) => e.stopPropagation()}>
                <Timer />
                <span>{time}</span>
            </p>
        </>
    );

    const navigateToDetail = (tab?: string) => () => {
        navigate({
            pathname: `${PATH.RESTAURANTS.path}/${id}`,
            search: `?tab=${tab || TAB.VIEW}`,
        });
    };

    const actions = [
        <View title="Xem bài đăng" onClick={navigateToDetail(TAB.VIEW)} />,
        <Post title="Tạo bài đăng" onClick={navigateToDetail(TAB.CREATE)} />,
    ];

    return (
        <StyledRestaurantCard
            cover={
                <img
                    src={image}
                    alt={name}
                    className="restaurant-image"
                    onClick={navigateToDetail()}
                />
            }
            actions={actions}
        >
            <Card.Meta
                title={
                    <p onClick={navigateToDetail()} title={name}>
                        {name}
                    </p>
                }
                description={description}
            />
            <Tag>{type || 'N/A'}</Tag>
        </StyledRestaurantCard>
    );
};

export const SkeletonRestaurantCard = () => {
    const actions = [
        <View title="Xem bài đăng" />,
        <Post title="Tạo bài đăng" />,
    ];
    return (
        <StyledRestaurantCard
            cover={Array(6)
                .fill(0)
                .map((item, index) => (
                    <Skeleton.Input block active key={index} />
                ))}
            actions={actions}
        >
            <Skeleton active paragraph={{ rows: 4 }} title={false} />
        </StyledRestaurantCard>
    );
};

export default RestaurantCard;
