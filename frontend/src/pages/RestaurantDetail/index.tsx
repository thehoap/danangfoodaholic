import { Col, Empty, Row, Tabs } from 'antd';
import Map from 'components/Map';
import Posts from 'components/Posts';
import { TAB } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLazyGetRestaurantQuery } from 'services/restaurantAPI';
import CreatePost from './components/CreatePost';
import Menu from './components/Menu';
import RadarChart from './components/RadarChart';
import { StyledRestaurantDetail } from './styles';
import { getAverage } from 'utils/caculate';

const RestaurantDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, _] = useSearchParams();

    const [
        getRestaurant,
        { data: dataRestaurantDetail, isLoading, isFetching },
    ] = useLazyGetRestaurantQuery();

    const defaultTab = searchParams.get('tab');
    const [restaurantDetail, setRestaurantDetail] = useState<IRestaurantDetail>(
        {
            _id: '',
            link: '',
            image: '',
            name: '',
            type: '',
            address: '',
            districtId: -1,
            wardId: -1,
            menuId: '',
            time: '',
            priceRange: '',
            menu: [],
            coordinates: {
                lat: -1,
                long: -1,
            },
            ratings: {
                space: [],
                food: [],
                hygiene: [],
                service: [],
                price: [],
                average: [],
            },
        }
    );
    const {
        name,
        image,
        menu,
        ratings: { space, food, hygiene, service, price, average },
    } = restaurantDetail;

    useEffect(() => {
        if (id)
            getRestaurant(id).then(
                (res) => res?.data && setRestaurantDetail(res?.data?.data)
            );
    }, []);

    const handleChangeTab = (tab: string) => {
        navigate({
            search: `?tab=${tab}`,
        });
    };

    return (
        <MainLayout>
            <StyledRestaurantDetail>
                <div className="thumbnail">
                    <img src={image} alt="" />
                    <div className="overlay">
                        <h1>{name}</h1>
                    </div>
                </div>
                <Tabs
                    activeKey={defaultTab || TAB.VIEW}
                    onChange={handleChangeTab}
                    items={[
                        {
                            label: 'New feed',
                            key: TAB.VIEW,
                            children: (
                                <Row className="post-view" gutter={24}>
                                    <Col span={16}>
                                        <Posts restaurantId={id} />
                                    </Col>
                                    <Col span={8}>
                                        <RadarChart
                                            stats={[
                                                getAverage(space),
                                                getAverage(food),
                                                getAverage(hygiene),
                                                getAverage(service),
                                                getAverage(price),
                                            ]}
                                        />
                                        <Menu menu={menu} />
                                    </Col>
                                </Row>
                            ),
                        },
                        {
                            label: 'Post your review',
                            key: TAB.CREATE,
                            children: <CreatePost />,
                        },
                    ]}
                />
                {/* <Map restaurants={[restaurantDetail]} isDetailPage={true} /> */}
            </StyledRestaurantDetail>
        </MainLayout>
    );
};

export default RestaurantDetail;
