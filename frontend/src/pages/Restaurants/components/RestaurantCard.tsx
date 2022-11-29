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

    const { _id, image, name, type, address, time } = restaurant;

    const description = (
        <>
            <p title={address} onClick={(e) => e.stopPropagation()}>
                <Location />
                <span>{address}</span>
            </p>
            <p onClick={(e) => e.stopPropagation()}>
                <Timer />
                <span title={time} className="time">
                    {time}
                </span>
            </p>
        </>
    );

    const navigateToDetail = (tab?: string) => () => {
        navigate({
            pathname: `${PATH.RESTAURANTS.path}/${_id}`,
            search: `?tab=${tab || TAB.VIEW}`,
        });
    };

    const actions = [
        <a className="action" onClick={navigateToDetail(TAB.VIEW)}>
            <View />
            <p>View</p>
        </a>,
        <a className="action" onClick={navigateToDetail(TAB.CREATE)}>
            <Post />
            <p>Create</p>
        </a>,
    ];

    return (
        <StyledRestaurantCard
            cover={
                <div className="restaurant-image">
                    <img src={image} alt={name} onClick={navigateToDetail()} />
                </div>
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
