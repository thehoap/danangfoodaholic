import { Tabs } from 'antd';
import Map from 'components/Map';
import Posts from 'components/Posts';
import { TAB } from 'constants/data';
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
                items={[
                    {
                        label: 'Bài đăng',
                        key: TAB.VIEW,
                        children: <Posts restaurantId={id} />,
                    },
                    {
                        label: 'Đăng bài',
                        key: TAB.CREATE,
                        children: <CreatePost />,
                    },
                ]}
            />
            {/* <Map restaurants={[restaurantDetail]} isDetailPage={true} /> */}
        </MainLayout>
    );
};

export default RestaurantDetail;
