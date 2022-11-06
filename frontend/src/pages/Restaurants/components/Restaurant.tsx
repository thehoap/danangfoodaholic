import { Card, Tag } from 'antd';

import { Comment, Location, Timer, View } from 'assets/icons';
import { StyledRestaurant } from './styles';

interface IRestaurantPage {
    restaurant: IRestaurant;
}

const Restaurant = ({ restaurant }: IRestaurantPage) => {
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
        <StyledRestaurant
            cover={<img src={image} alt={name} className="restaurant-image" />}
            actions={[<View />, <Comment />]}
        >
            <Card.Meta title={name} description={description} />
            <Tag>{type || 'N/A'}</Tag>
        </StyledRestaurant>
    );
};

export default Restaurant;
