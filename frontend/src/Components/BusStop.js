import React, { useState, useEffect, useCallback } from 'react';
import ReactMapGL, {  NavigationControl } from '@goongmaps/goong-map-react';
import { Marker} from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';
import axios from 'axios';
import debounce from 'lodash.debounce';
import bus from "../Image/image.png";
const GOONG_MAPTILES_KEY = 'zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG';

const fetchOSMBusStops = async (latitude, longitude, radius) => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[highway=bus_stop];out;`;
    
    try {
        const response = await axios.get(overpassUrl);
        console.log("Response: ", response.data.elements);
        return response.data.elements;
        
    } catch (error) {
        console.error('Error fetching bus stops from OSM:', error);
        return [];
    }
};

export default function MapComponent() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '1000px',
        latitude: 10.8813279,
        longitude: 106.8060503,
        zoom: 12
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [busStops, setBusStops] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                
                setViewport((prevState) => ({
                    ...prevState,
                    latitude,
                    longitude,
                }));

                const stops = await fetchOSMBusStops(latitude, longitude, 1000);
                setBusStops(stops);
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);
    console.log(busStops);
    // eslint-disable-next-line
    const handleViewportChange = useCallback(
        debounce(async (newViewport) => {
            setViewport(newViewport);
            const stops = await fetchOSMBusStops(newViewport.latitude, newViewport.longitude, 1000);
            setBusStops(stops);
        }, 10),
        []
    );
    const displayBusStops = busStops.slice(0, 100);
    return (
        <div style={{ position: 'relative', width: '100%' }} >
            <ReactMapGL
                {...viewport}
                onViewportChange={handleViewportChange}
                goongApiAccessToken={GOONG_MAPTILES_KEY}
            >
                <div style={{ position: 'absolute', left: '21%', top: "5%" }}>
                    <NavigationControl />
                </div>
                {currentLocation && (
                    <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
                        <div style={{ background: 'red', borderRadius: '50%', width: '10px', height: '10px' }}></div>
                    </Marker>
                )}

                {displayBusStops  && (
                    displayBusStops.map ( busStop => 
                        <Marker latitude={busStop.lat} longitude={busStop.lon}>
                        <div>
                            <img src={bus} alt="bus" style = {{height: 30, width: 30}}/>
                        </div>
                        </Marker>
                    )
                )}
            </ReactMapGL>
        </div>
    );
}