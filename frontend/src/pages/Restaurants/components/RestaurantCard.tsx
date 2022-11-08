import { Card, Tag } from 'antd';

import { Post, Location, Timer, View } from 'assets/icons';
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

    const navigateToDetail = () => {
        navigate(`${PATH.RESTAURANTS.path}/${id}`);
    };

    return (
        <StyledRestaurantCard
            cover={
                <img
                    src={image}
                    alt={name}
                    className="restaurant-image"
                    onClick={navigateToDetail}
                />
            }
            // actions={[<View />, <Post />]}
        >
            <Card.Meta
                title={
                    <p onClick={navigateToDetail} title={name}>
                        {name}
                    </p>
                }
                description={description}
            />
            <Tag>{type || 'N/A'}</Tag>
        </StyledRestaurantCard>
    );
};

export default RestaurantCard;
