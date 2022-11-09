import Map, { Marker, Popup } from 'react-map-gl';
import markerIcon from 'assets/images/marker-icon.webp';
import { useState } from 'react';

const MapGL = () => {
    const [showPopup, setShowPopup] = useState<boolean>(true);

    const mapStyle = 'mapbox://styles/mapbox/streets-v9';
    const latitude = 16.0663227;
    const longitude = 108.2055386;
    const markerSize = 50;

    const togglePopup = (e: any) => {
        e.stopPropagation();
        setShowPopup((prev) => !prev);
    };

    return (
        <Map
            initialViewState={{
                latitude,
                longitude,
                zoom: 16,
            }}
            style={{ width: 'calc(100vw-200px)', height: '1000px' }}
            mapStyle={mapStyle}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
            <Marker longitude={longitude} latitude={latitude} anchor="bottom">
                <img
                    src={markerIcon}
                    alt="marker icon"
                    width={markerSize}
                    height={markerSize}
                    onClick={togglePopup}
                />
            </Marker>
            {showPopup && (
                <Popup
                    longitude={longitude}
                    latitude={latitude}
                    anchor="top"
                    onClose={togglePopup}
                >
                    You are here
                </Popup>
            )}
        </Map>
    );
};

export default MapGL;
