import { Tabs } from 'antd';
import Map from 'components/Map';
import { TAB } from 'constants/data';
import { PATH } from 'constants/path';
import MainLayout from 'layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLazyGetRestaurantQuery } from 'services/restaurantAPI';
import CreatePost from './components/CreatePost';

const RestaurantDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

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
            id: '',
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
        }
    );
    const { name, image } = restaurantDetail;

    useEffect(() => {
        if (id)
            getRestaurant(id).then(
                (res) => res?.data && setRestaurantDetail(res?.data?.data)
            );
    }, []);

    return (
        <MainLayout>
            <h1>{name}</h1>
            <img src={image} alt="" />
            <Tabs
                defaultActiveKey={defaultTab || TAB.VIEW}
                onChange={(value) => {
                    navigate({
                        search: `?tab=${value}`,
                    });
                }}
            >
                <Tabs.TabPane tab="Bài đăng" key={TAB.VIEW}>
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đăng bài" key={TAB.CREATE}>
                    <CreatePost />
                </Tabs.TabPane>
            </Tabs>
            <Map restaurants={[restaurantDetail]} isDetailPage={true} />
        </MainLayout>
    );
};

export default RestaurantDetail;
