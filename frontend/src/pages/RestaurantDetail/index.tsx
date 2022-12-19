import { Col, Row, Tabs } from 'antd';
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
import { getAverage } from 'utils/calculate';
import { Location, Money, Timer } from 'assets/icons';
import { useAppDispatch } from 'redux/hooks';
import { getReviewedRestaurant } from 'redux/slices/restaurantSlice';
import Alert from 'components/Alert';

const RestaurantDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, _] = useSearchParams();
    const appDispatch = useAppDispatch();

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
        address,
        time,
        priceRange,
        menu,
        ratings: { space, food, hygiene, service, price, average },
    } = restaurantDetail;
    const [amountPosts, setAmoutPosts] = useState<number>(0);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        if (id)
            getRestaurant(id).then((res) => {
                if (res?.data) {
                    setRestaurantDetail(res?.data?.data);
                    appDispatch(getReviewedRestaurant(res?.data?.data));
                }
            });
    }, [posts]);

    const handleChangeTab = (tab: string) => {
        navigate({
            search: `?tab=${tab}`,
        });
    };

    return (
        <MainLayout>
            <Alert />
            <StyledRestaurantDetail>
                <div className="thumbnail">
                    <img src={image} alt="" />
                    <div className="overlay">
                        <Row>
                            <Col span={12}>
                                <p className="heading">{name}</p>
                                <p className="description">
                                    <Location /> {address}
                                </p>
                            </Col>
                            <Col span={6}>
                                <p className="description">
                                    <Timer /> {time}
                                </p>
                                <p className="description">
                                    <Money /> {priceRange}
                                </p>
                            </Col>
                            <Col span={6} className="stats">
                                <div>
                                    <span> {getAverage(average) || 0}</span>
                                    <p>points</p>
                                </div>
                                <div>
                                    <span>{amountPosts}</span>
                                    <p>reviews</p>
                                </div>
                            </Col>
                        </Row>
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
                                        <Posts
                                            restaurantId={id}
                                            setAmoutPosts={setAmoutPosts}
                                            posts={posts}
                                            setPosts={setPosts}
                                        />
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
                            children: <CreatePost setPosts={setPosts} />,
                        },
                    ]}
                />
                <Map restaurants={[restaurantDetail]} isDetailPage={true} />
            </StyledRestaurantDetail>
        </MainLayout>
    );
};

export default RestaurantDetail;
