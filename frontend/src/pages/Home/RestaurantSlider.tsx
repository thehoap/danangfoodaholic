import { Rate, Tooltip } from 'antd';
import { checkTimeBetween } from 'utils/dateFormat';
import { StyledRestaurantSlider } from './styles';

interface IRestaurantSlider {
    restaurant?: IRestaurant;
}

const RestaurantSlider = ({ restaurant }: IRestaurantSlider) => {
    const dateObj = new Date();
    const timeNow = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
    const isOnline = checkTimeBetween(timeNow, restaurant?.time);

    return (
        <StyledRestaurantSlider>
            <div className="image-wrapper">
                <img src={restaurant?.image} alt="" />
            </div>
            <div className="information">
                <h4>{restaurant?.name}</h4>
                <Rate value={3} disabled />
                <div>
                    <span>{restaurant?.priceRange}</span>
                    <Tooltip title={isOnline ? 'Online' : 'Offline'}>
                        <div
                            className={`status ${
                                isOnline ? 'online' : 'offline'
                            }`}
                        />
                    </Tooltip>
                </div>
            </div>
        </StyledRestaurantSlider>
    );
};

export default RestaurantSlider;
