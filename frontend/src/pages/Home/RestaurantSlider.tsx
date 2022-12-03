import { Rate, Tooltip } from 'antd';
import { PATH } from 'constants/path';
import { Link } from 'react-router-dom';
import { getAverage } from 'utils/calculate';
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
                <h4>
                    <Tooltip title={restaurant?.name}>
                        <Link
                            to={`${PATH.RESTAURANTS.path}/${restaurant?._id}`}
                        >
                            {restaurant?.name}
                        </Link>
                    </Tooltip>
                </h4>
                <Rate
                    value={getAverage(restaurant?.ratings.average || [])}
                    disabled
                />
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
