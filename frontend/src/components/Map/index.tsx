import ReactMapGL, { Marker, Popup, LineLayer } from 'react-map-gl';
import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'antd';

import markerIcon from 'assets/images/marker-icon.webp';
import position from 'assets/images/position.webp';
import { useLazyGetDistanceQuery } from 'services/mapAPI';

import mapboxgl from 'mapbox-gl';
// @ts-ignore
mapboxgl.workerClass =
    require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

interface IMap {
    restaurants?: IRestaurant[];
    isDetailPage?: boolean;
}

const mapStyle = 'mapbox://styles/mapbox/streets-v9';
const markerSize = 30;

const Map = ({ restaurants, isDetailPage }: IMap) => {
    const [getDistance] = useLazyGetDistanceQuery();

    // Get user's location at the moment
    const [currentLocation, setCurrentLocation] = useState<ICoordinates>(() => {
        const coordinates: ICoordinates = {
            lat: 16.0663227,
            long: 108.2055386,
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                coordinates.lat = position.coords.latitude;
                coordinates.long = position.coords.longitude;
            },
            (err) => console.log(err)
        );
        return coordinates;
    });

    /* 
        Map's center is user's location if user is at home page. 
        If user is at restaurant detail page, it will be the restaurant's location.
    */
    const initialCoordinate: ICoordinates = useMemo(() => {
        if (restaurants && isDetailPage) {
            return {
                lat: Number(restaurants[0].coordinates.lat),
                long: Number(restaurants[0].coordinates.long),
            };
        }
        return currentLocation;
    }, [restaurants, currentLocation]);

    const [showPopups, setShowPopups] = useState<boolean[]>([]);
    const [showPopupUser, setShowPopupUser] = useState<boolean>(true);
    const [distance, setDistance] = useState<number>();

    const togglePopup = (
        e: MouseEventType<HTMLImageElement>,
        index: number
    ) => {
        e.stopPropagation();
        setShowPopups((popups) =>
            popups.map((popup, i) => {
                if (i === index) return !popup;
                return false;
            })
        );
    };

    useEffect(() => {
        if (restaurants) {
            setShowPopups(Array(restaurants?.length).fill(false));
        }
        if (restaurants && isDetailPage) {
            getDistance({
                from: currentLocation,
                to: restaurants[0].coordinates,
            }).then((res: any) => {
                const distance: number = Number(
                    (res?.data?.routes[0].distance / 1000).toFixed(2)
                );
                setDistance(distance);
            });
        }
    }, [restaurants, currentLocation]);

    return initialCoordinate &&
        initialCoordinate.lat > 0 &&
        initialCoordinate.long > 0 ? (
        <ReactMapGL
            initialViewState={{
                latitude: initialCoordinate.lat,
                longitude: initialCoordinate.long,
                zoom: 16,
            }}
            style={{ width: 'calc(100vw-200px)', height: '1000px' }}
            mapStyle={mapStyle}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
            <Marker
                longitude={currentLocation.long}
                latitude={currentLocation.lat}
                anchor="bottom"
            >
                <img
                    src={position}
                    alt="Vị trí của bạn"
                    width={markerSize}
                    height={markerSize}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowPopupUser((vis) => !vis);
                    }}
                />
            </Marker>
            {showPopupUser && (
                <Popup
                    longitude={currentLocation.long}
                    latitude={currentLocation.lat}
                    anchor="top"
                    closeButton={false}
                >
                    You are here.
                    {isDetailPage && restaurants
                        ? ` ${restaurants[0].name} cách bạn ${distance} km.`
                        : ''}
                </Popup>
            )}

            {restaurants?.map((restaurant: IRestaurant, index: number) => {
                const {
                    _id,
                    coordinates: { lat, long },
                    name,
                    address,
                    image,
                } = restaurant;
                return (
                    <React.Fragment key={_id}>
                        <Marker longitude={long} latitude={lat} anchor="bottom">
                            <img
                                src={markerIcon}
                                alt={name}
                                width={markerSize}
                                height={markerSize}
                                onClick={(e) => togglePopup(e, index)}
                            />
                        </Marker>
                        {showPopups[index] && (
                            <Popup
                                // maxWidth="fit-content"
                                longitude={long || 0}
                                latitude={lat || 0}
                                anchor="top"
                                closeButton={false}
                            >
                                <Card
                                    cover={
                                        <img
                                            src={image}
                                            alt={name}
                                            className="restaurant-image"
                                            // onClick={navigateToDetail}
                                        />
                                    }
                                >
                                    <Card.Meta
                                        title={name}
                                        description={<p>{address}</p>}
                                    />
                                </Card>
                                {/* <img src={image} alt="" />
                                {name} */}
                                {/* <RestaurantCard restaurant={restaurant} /> */}
                            </Popup>
                        )}
                    </React.Fragment>
                );
            })}
        </ReactMapGL>
    ) : (
        <></>
    );
};

export default Map;
