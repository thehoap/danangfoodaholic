import { Tabs } from 'antd';
import Map from 'components/Map';
import MainLayout from 'layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetRestaurantQuery } from 'services/restaurantAPI';
import CreatePost from './components/CreatePost';

const RestaurantDetail = () => {
    const { id } = useParams();

    const [
        getRestaurant,
        { data: dataRestaurantDetail, isLoading, isFetching },
    ] = useLazyGetRestaurantQuery();

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
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Bài đăng" key="1">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đăng bài" key="2">
                    <CreatePost />
                </Tabs.TabPane>
            </Tabs>
            <Map restaurants={[restaurantDetail]} isDetailPage={true} />
        </MainLayout>
    );
};

export default RestaurantDetail;
