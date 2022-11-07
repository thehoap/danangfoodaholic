import { Card, Tag } from 'antd';

import { Comment, Location, Timer, View } from 'assets/icons';
import { StyledRestaurantCard } from './styles';

interface IRestaurantCard {
    restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: IRestaurantCard) => {
    const { image, name, type, address, time } = restaurant;

    const description = (
        <>
            <p title={address}>
                <Location />
                <span>{address}</span>
            </p>
            <p>
                <Timer />
                <span>{time}</span>
            </p>
        </>
    );

    return (
        <StyledRestaurantCard
            cover={<img src={image} alt={name} className="restaurant-image" />}
            actions={[<View />, <Comment />]}
        >
            <Card.Meta title={name} description={description} />
            <Tag>{type || 'N/A'}</Tag>
        </StyledRestaurantCard>
    );
};

export default RestaurantCard;
