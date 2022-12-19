import { Tooltip } from 'antd';
import Rate from 'components/Rate';
import { PATH } from 'constants/path';
import { Link } from 'react-router-dom';
import { getAverage, roundToHalf } from 'utils/calculate';
import { checkTimeBetween } from 'utils/dateFormat';
import { StyledRestaurantSlider } from './styles';

interface IRestaurantSlider {
    restaurant?: IRestaurant;
}

const RestaurantSlider = ({ restaurant }: IRestaurantSlider) => {
    const dateObj = new Date();
    const timeNow = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
    const isOnline = checkTimeBetween(timeNow, restaurant?.time);

    const rating = getAverage(restaurant?.ratings?.average || []);
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
                    value={
                        Number.isInteger(rating) ? rating : roundToHalf(rating)
                    }
                    exactValue={rating}
                    disabled
                    allowHalf
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
